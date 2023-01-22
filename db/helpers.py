import math


def normalize_float(value, min_val, max_val):
    try:
        return (value - min_val) / (max_val - min_val)
    except (Exception,):
        return 0


def normalize_db_scale(value):
    try:
        return math.log10(abs(value) / 20)
    except (Exception,):
        return 0
