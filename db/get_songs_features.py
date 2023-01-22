from __init__ import ROOT_DIR

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import time
import os
from dotenv import load_dotenv
from pymysqlpool.pool import Pool

from helpers import normalize_db_scale, normalize_float
from queries import get_available_tracks, update_track_metrics, get_table_size, list_columns, \
    add_music_features_empty_columns, get_available_tracks_count

load_dotenv(os.path.join(ROOT_DIR, 'react-flask-sqlite', 'client', 'node_modules', '.env'))

SPOTIPY_CLIENT = spotipy.Spotify(
    auth_manager=SpotifyClientCredentials(
        client_id=os.environ.get('SPOTIPY_CLIENT_ID'),
        client_secret=os.environ.get('SPOTIPY_CLIENT_SECRET')
    )
)

pool = Pool(
    host=os.environ.get('MYSQL_HOST'),
    user=os.environ.get('MYSQL_USER'),
    password=os.environ.get('MYSQL_PASSWORD'),
    db=os.environ.get('MYSQL_DB'),
    autocommit=True
)
pool.init()

MYSQL_CLIENT = pool.get_conn()
CURSOR = MYSQL_CLIENT.cursor()

MAX_TRACKS_COUNT = 10000
API_LIMIT = 100
TABLE_NAME = 'track'
CURSOR.execute(get_table_size(TABLE_NAME))
TABLE_SIZE = CURSOR.fetchone()['count']
FEATURES = ['id', 'tempo', 'danceability', 'energy', 'loudness', 'mode', 'speechiness', 'acousticness',
            'instrumentalness', 'liveness', 'valence']
CURSOR.execute(list_columns(TABLE_NAME))
table_columns = CURSOR.fetchall()
if not set(FEATURES).issubset(tuple(column['Field'] for column in table_columns)):
    CURSOR.execute(add_music_features_empty_columns(TABLE_NAME))


def get_remaining_percentage():
    CURSOR.execute(get_available_tracks_count(TABLE_NAME, TABLE_SIZE))
    percentage = int(CURSOR.fetchone()['count'] / TABLE_SIZE * 100)
    print('{}% remaining'.format(percentage))


def run_job():
    counter = 0
    skip_track_ids = []
    while True:
        if counter % 25 == 0:
            get_remaining_percentage()
        start_time = time.time()
        CURSOR.execute(get_available_tracks(TABLE_NAME, MAX_TRACKS_COUNT, skip_track_ids))
        response = CURSOR.fetchall()
        if not response:
            break
        response = [dict_['id'] for dict_ in response]

        n_iter = int(MAX_TRACKS_COUNT / API_LIMIT)
        for i in range(n_iter):
            tracks_ids = response[i * API_LIMIT:i * API_LIMIT + API_LIMIT]
            results = SPOTIPY_CLIENT.audio_features(tracks=tracks_ids)
            if results == [None]:
                continue

            for idx, key_features in enumerate(results):
                if not isinstance(key_features, dict):
                    skip_track_ids.append(tracks_ids[idx])
                    # print(tracks_ids[idx], 'not found in API')
                    continue
                loudness = results[idx]['loudness']
                tempo = results[idx]['tempo']
                results[idx]['loudness'] = normalize_db_scale(loudness)
                results[idx]['tempo'] = normalize_float(tempo, 40, 200)
            results = [tuple({key: track_features[key] for key in FEATURES}.values()) for track_features in
                       results if isinstance(track_features, dict)]

            CURSOR.executemany(update_track_metrics(TABLE_NAME), results)
        counter += 1
        print(len(skip_track_ids), 'tracks not found in total')
        print(counter, time.time() - start_time)


if __name__ == '__main__':
    try:
        run_job()
        pool.release(MYSQL_CLIENT)
    except (Exception,):
        os._exit(0)
