import itertools
from waitress import serve
from flask import Flask, jsonify, request, redirect
from flask_mysqldb import MySQL
from flasgger import Swagger
import os
from dotenv import load_dotenv
import string
import secrets
import requests
import base64
from flask_cors import CORS
import random

load_dotenv('./.env')

app = Flask(__name__)
app.config['SWAGGER'] = {'ui_params': {'displayRequestDuration': 'true'}, }

swagger = Swagger(app)

# Database info
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')

mysql = MySQL(app)

TABLE_NAME = 'track'

# API routes
REDIRECT_URI = 'http://localhost:5001/callback'
SPOTIFY_CLIENT_ID = os.environ.get("SPOTIPY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.environ.get('SPOTIPY_CLIENT_SECRET')
CLIENT_REDIRECT = 'http://localhost:5173/recommender'




@app.route("/")
def index():
    return "Hello"

CORS(app)
@app.route("/spotify_login")
def spotify_login():
    auth_endpoint = 'https://accounts.spotify.com/authorize?'

    scope = "playlist-modify-private+playlist-modify-public"
    choices = string.ascii_letters + string.digits
    state = ''.join(random.choice(choices) for i in range(16))

    return redirect(f'{auth_endpoint}response_type=code&client_id={SPOTIFY_CLIENT_ID}&scope={scope}&state={state}&redirect_uri={REDIRECT_URI}')


@app.route("/callback")
def callback():
    code = request.args.get('code')
    state = request.args.get('state')

    if state is None:
        return redirect('/#?error=state_mismatch')
    else:
        url = 'https://accounts.spotify.com/api/token'
        headers = {
            'Authorization': 'Basic ' + base64.b64encode(bytes(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}", 'utf-8')).decode('utf-8')
        }
        data = {
            'code': code,
            'redirect_uri': REDIRECT_URI,
            'grant_type': 'authorization_code'
        }

        res = requests.post(url, data=data, headers=headers)

        if res.ok:
            data = res.json()
            access_token = data['access_token']
            refresh_token = data['refresh_token']

            return redirect(f'{CLIENT_REDIRECT}?access_token={access_token}&refresh_token={refresh_token}')
        else:
            return redirect(f'{CLIENT_REDIRECT}?error=invalid_token')


@app.route('/refresh_token')
def refresh_token():
    refresh_token = request.args.get('refresh_token')

    url = 'https://accounts.spotify.com/api/token',
    headers = {'Authorization': 'Basic ' + base64.b64encode(
        bytes(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}", 'utf-8')).decode('utf-8')},
    data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    }

    response = requests.post(
        url, headers=headers, data=data)
    if response.ok:
        access_token = response.json().get('access_token')
        return jsonify({'access_token': access_token})
    else:
        return jsonify({'error': 'invalid_token'}), 401


@ app.route("/recommend_tracks/")
def playlists():
    """
    return list of recommended tracks based on user input
    ---
    parameters:
       - name: tempo
         in: query
         type: number
         required: false
         default: 0.4185
       - name: danceability
         in: query
         type: number
         required: false
         default: 0.724
       - name: energy
         in: query
         type: number
         required: false
         default: 0.647
       - name: loudness
         in: query
         type: number
         required: false
         default: -0.5496
       - name: mode
         in: query
         type: number
         enum: [0, 1]
         required: false
         default: 1
       - name: speechiness
         in: query
         type: number
         required: false
         default: 0.0658
       - name: acousticness
         in: query
         type: number
         required: false
         default: 0.28
       - name: instrumentalness
         in: query
         type: number
         required: false
         default: 0.0001
       - name: liveness
         in: query
         type: number
         required: false
         default: 0.102
       - name: valence
         in: query
         type: number
         required: false
         default: 0.435
       - name: popularity
         in: query
         type: number
         required: false
         default: 80
       - name: min_follower_count
         in: query
         type: number
         required: false
         default: 10000
       - name: accuracy
         in: query
         type: number
         required: false
         default: 0.001
       - name: top_n
         in: query
         type: number
         required: false
         default: 1000
       - name: min_year
         in: query
         type: number
         required: false
         default: 1900
       - name: max_year
         in: query
         type: number
         required: false
         default: 2023
    responses:
        200:
            description : a list of track spotify ids
    """
    # sliders
    tempo = request.args.get('tempo')
    danceability = request.args.get('danceability')
    energy = request.args.get('energy')
    loudness = request.args.get('loudness')
    mode = request.args.get('mode')
    speechiness = request.args.get('speechiness')
    acousticness = request.args.get('acousticness')
    instrumentalness = request.args.get('instrumentalness')
    liveness = request.args.get('liveness')
    valence = request.args.get('valence')

    popularity = request.args.get('popularity')
    min_follower_count = request.args.get('min_follower_count')
    accuracy = request.args.get('accuracy', type=float)
    top_n = request.args.get('top_n')

    # range
    min_year = request.args.get('min_year')
    max_year = request.args.get('max_year')

    # mysql
    cursor = mysql.connection.cursor()
    query = f'''
        SELECT t.id
        FROM (SELECT t.id,
                     100 - 100 * SQRT(0
                                      {f' + (tempo - {tempo}) * (tempo - {tempo})' if tempo else ''}
                                      {f' + (danceability - {danceability}) * (danceability - {danceability})' if danceability else ''}
                                      {f' + (energy - {energy}) * (energy - {energy})' if energy else ''}
                                      {f' + (loudness - {loudness}) * (loudness - {loudness})' if loudness else ''}
                                      {f' + (mode - {mode}) * (mode - {mode})' if mode else ''}
                                      {f' + (speechiness - {speechiness}) * (speechiness - {speechiness})' if speechiness else ''}
                                      {f' + (acousticness - {acousticness}) * (acousticness - {acousticness})' if acousticness else ''}
                                      {f' + (instrumentalness - {instrumentalness}) * (instrumentalness - {instrumentalness})' if instrumentalness else ''}
                                      {f' + (liveness - {liveness}) * (liveness - {liveness})' if liveness else ''}
                                      {f' + (valence - {valence}) * (valence - {valence})' if valence else ''}) as score
              FROM track t
              {f'LEFT JOIN album a on album_id = a.id' if max_year and min_year else ''}
              {f' WHERE popularity > {popularity}' if popularity else ''}
                AND t.name NOT REGEXP '.*[?].*$'
                AND t.id != ''
                {f' AND a.release_date < {max_year} AND a.release_date > {min_year}' if max_year and min_year else ''}
              ORDER BY score DESC
              {f'LIMIT {int(accuracy * (10 ** 7))} ' if accuracy else ''}) t
                 LEFT JOIN track_playlist1 t_p on t.id = t_p.track_id
                 LEFT JOIN playlist p on p.id = t_p.playlist_id
        GROUP BY t.id
        {f'HAVING SUM(p.followers) > {min_follower_count}' if min_follower_count else ''}
        ORDER BY score DESC
        {f'LIMIT {top_n}' if top_n else ''}
    '''
    cursor.execute(query)
    response = cursor.fetchall()
    response = list(itertools.chain(*response))
    return jsonify({
        'res': response,
        'status': 200,
        'msg': 'Success'
    })


if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5001)