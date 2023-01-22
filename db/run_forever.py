from subprocess import Popen
import sys


filename = sys.argv[1]
while True:
    print("\nStarting " + filename)
    p = Popen(r"/Users/wboughattas/miniconda3/envs/test_mysql/bin/python " + filename, shell=True)
    p.wait()
