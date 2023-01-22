# SpotAI

With over 15 million of tracks’ metadata, SpotAI recommends songs based on your music taste and custom preferences

-----

## Installation

2 choices are offered to user:

- SpotAI has access to the small dataset (few MBs); the sql sump script is provided: **init.sql**
- SpotAI has access to the large dataset (35GBs); download the open-sourced data sql dump
  from [here](https://zenodo.org/record/5002584#.Y8xpni_73Bs), and run the following commands to populate the database
  (this requires spotify dev id and token) and takes few hours:

  ```bash
  python run_forever.py get_songs_features.py
  ```

  and

  ```bash
  python run_forever.py get_albums_release_dates.py
  ```

  > Use the 35Gbs database for dev only

### Project environment

#### ARM-OSX

Conda is mandatory due to compatibility issues of some dependencies (i.e. flask-mysqldb and pymysql-pool outside of
conda do not run on arm-osx).

To create conda environment from ENV.yml

```bash
conda env create -n <ENVNAME> --file ENV.yml
```

To activate conda environment:

```bash
conda create --name <ENVNAME>
```

To create/update ENV.yml

```bash
conda env export > ENV.yml
```

#### x64/86

If virtualenv is not installed, run

```bash
pip install virtualenv
```

to create your new environment

```bash
virtualenv venv
```

to activate venv

```bash
source venv-name/bin/activate
```

to install the requirements in the current environment

```bash
pip install -r requirements.txt
```

-----

### Environment variables (secrets)

create .env file and place in the venv folder

```dotenv
#SPOTIFY
SPOTIPY_CLIENT_ID=id
SPOTIPY_CLIENT_SECRET=secret

#MYSQL
MYSQL_HOST=localhost
MYSQL_USER=username
MYSQL_PASSWORD=password
MYSQL_DB=database
```

-------

### MySQL

Open a mysql console

```bash
mysql -u username -p
```

and run

```mysql
CREATE SCHEMA database_name
```

exit the mysql console, and run

```bash
mysql -u username -p database_name < init.sql
```

----

### Flask

To start the Flask application, run server.py.

To test the api using swagger, go to
http://127.0.0.1:5000/apidocs

------------

### React

To change to the client directory

```bash
cd react-flask-sqlite/client/
```

then create node_modules

```bash
npm install
```

and start the SpotAI application

```bash
npm run dev
```
