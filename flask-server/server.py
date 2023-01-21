from flask import Flask, request
from flask_mysqldb import MySQL
from flasgger import Swagger
import os
from dotenv import load_dotenv
from __init__ import ROOT_DIR

load_dotenv(os.path.join(ROOT_DIR, 'react-flask-sqlite', 'client', 'node_modules', '.env'))

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
@app.route("/")
def index():
    return "Hello"


@app.route("/recommend_tracks/")
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

    # textbox
    min_year = request.args.get('min_year')
    max_year = request.args.get('max_year')

    # mysql
    print('test')


if __name__ == "__main__":
    app.run()
