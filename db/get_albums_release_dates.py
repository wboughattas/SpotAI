from __init__ import ROOT_DIR

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import time
import os
from dotenv import load_dotenv
from pymysqlpool.pool import Pool

from helpers import normalize_db_scale, normalize_float
from queries import get_available_tracks, update_track_metrics, get_table_size, list_columns, \
    add_music_features_empty_columns, get_available_tracks_count, add_release_date_empty_columns, \
    get_available_albums_count, get_available_albums, update_album_metrics

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
API_LIMIT = 20
TABLE_NAME = 'album'
CURSOR.execute(get_table_size(TABLE_NAME))
TABLE_SIZE = CURSOR.fetchone()['count']
FEATURES = ['id', 'release_date']
CURSOR.execute(list_columns(TABLE_NAME))
table_columns = CURSOR.fetchall()
if not set(FEATURES).issubset(tuple(column['Field'] for column in table_columns)):
    CURSOR.execute(add_release_date_empty_columns(TABLE_NAME))


def get_remaining_percentage():
    CURSOR.execute(get_available_albums_count(TABLE_NAME, TABLE_SIZE))
    percentage = int(CURSOR.fetchone()['count'] / TABLE_SIZE * 100)
    print('{}% remaining'.format(percentage))


def run_job():
    counter = 0
    skip_album_ids = []
    while True:
        if counter % 25 == 0:
            get_remaining_percentage()
        start_time = time.time()
        CURSOR.execute(get_available_albums(TABLE_NAME, MAX_TRACKS_COUNT, skip_album_ids))
        response = CURSOR.fetchall()
        if not response:
            break
        response = [dict_['id'] for dict_ in response]

        n_iter = int(MAX_TRACKS_COUNT / API_LIMIT)
        for i in range(n_iter):
            albums_ids = response[i * API_LIMIT:i * API_LIMIT + API_LIMIT]
            results = SPOTIPY_CLIENT.albums(albums=albums_ids)
            if results == [None]:
                continue

            for idx, key_features in enumerate(results['albums']):
                if not isinstance(key_features, dict):
                    skip_album_ids.append(albums_ids[idx])
                    # print(albums_ids[idx], 'not found in API')
                    continue
                release_date = results['albums'][idx]['release_date']
                results['albums'][idx]['release_date'] = release_date[:4]
            results = [tuple({key: album_features[key] for key in FEATURES}.values()) for album_features in
                       results['albums'] if isinstance(album_features, dict)]

            CURSOR.executemany(update_album_metrics(TABLE_NAME), results)
        counter += 1
        print(len(skip_album_ids), 'albums not found in total')
        print(counter, time.time() - start_time)


if __name__ == '__main__':
    try:
        run_job()
        pool.release(MYSQL_CLIENT)
    except (Exception,) as e:
        print(e)
        os._exit(0)
