def list_columns(table_name):
    return f"""
        SHOW COLUMNS FROM {table_name}
    """


def add_release_date_empty_columns(table_name):
    return f"""
        ALTER TABLE {table_name}
            ADD COLUMN release_date     SMALLINT(4)
            AFTER uri
    """


def add_music_features_empty_columns(table_name):
    return f"""
        ALTER TABLE {table_name}
            ADD COLUMN danceability     FLOAT(6, 5),
            ADD COLUMN energy           FLOAT(6, 5),
            ADD COLUMN loudness         FLOAT(6, 5),
            ADD COLUMN mode             INT(1),
            ADD COLUMN speechiness      FLOAT(6, 5),
            ADD COLUMN acousticness     FLOAT(6, 5),
            ADD COLUMN instrumentalness FLOAT(6, 5),
            ADD COLUMN liveness         FLOAT(6, 5),
            ADD COLUMN valence          FLOAT(6, 5),
            ADD COLUMN tempo            FLOAT(6, 5)
            AFTER album_id
    """


def get_table_size(table_name):
    return f"""
        SELECT COUNT(id) as count
        FROM {table_name} 
        WHERE id != ''
    """


def get_available_tracks_count(table_name, count):
    return f"""
        SELECT count(id) as count
        FROM {table_name}
        WHERE tempo IS NULL
          AND danceability IS NULL
          AND energy IS NULL
          AND loudness IS NULL
          AND id != ''
        LIMIT {count}
    """


def get_available_albums_count(table_name, count):
    return f"""
        SELECT count(id) as count
        FROM {table_name}
        WHERE release_date IS NULL
          AND id != ''
        LIMIT {count}
    """


def get_available_albums(table_name, count, skip_ids):
    if len(skip_ids) == 0:
        return f"""
            SELECT id
            FROM {table_name}
            WHERE release_date IS NULL
              AND id != ''
            LIMIT {count}
        """
    else:
        return f"""
                    SELECT id
                    FROM {table_name}
                    WHERE release_date IS NULL
                      AND id != ''
                      AND {' AND '.join(["id != '{}'".format(i) for i in skip_ids])}
                    LIMIT {count}
                """


def get_available_tracks(table_name, count, skip_ids):
    if len(skip_ids) == 0:
        return f"""
            SELECT id
            FROM {table_name}
            WHERE tempo IS NULL
              AND danceability IS NULL
              AND energy IS NULL
              AND loudness IS NULL
              AND id != ''
            LIMIT {count}
        """
    else:
        return f"""
            SELECT id
            FROM {table_name}
            WHERE tempo IS NULL
              AND danceability IS NULL
              AND energy IS NULL
              AND loudness IS NULL
              AND id != '' 
              AND {' AND '.join(["id != '{}'".format(i) for i in skip_ids])}
            LIMIT {count}
        """


def update_album_metrics(table_name):
    return f"""
        INSERT INTO {table_name} (`id`, `release_date`)
            VALUES (%s, %s) as val
        ON DUPLICATE KEY UPDATE id=val.id,
                                release_date=val.release_date
    """


def update_track_metrics(table_name):
    return f"""
        INSERT INTO {table_name} (`id`, `tempo`, `danceability`, `energy`, `loudness`, `mode`, `speechiness`, `acousticness`,
                                 `instrumentalness`, `liveness`, `valence`)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) as val
        ON DUPLICATE KEY UPDATE id=val.id,
                                tempo=val.tempo,
                                danceability=val.danceability,
                                energy=val.energy,
                                loudness=val.loudness,
                                mode=val.mode,
                                speechiness=val.speechiness,
                                acousticness=val.acousticness,
                                instrumentalness=val.instrumentalness,
                                liveness=val.liveness,
                                valence=val.valence
    """
