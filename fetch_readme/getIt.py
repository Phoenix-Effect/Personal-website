from os import walk
from pathlib import Path
import urllib3
import yaml
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

PROJECTS_DIR = "/Volumes/Extended/Projects/personal/content/projects/"
DATA_DIR = "/Volumes/Extended/Projects/personal/readme/projects/"


# Get all files that we need to edit
def get_files():
    f = []
    for (dirpath, dirnames, filenames) in walk(PROJECTS_DIR):
        f.extend(filenames)
        break
    return f


# given a filename and url, generates a data file
def make_file(filename, url):
    check_file = Path(DATA_DIR + filename)
    if not check_file.is_file():
        http = urllib3.PoolManager()
        response = http.request('GET', url)
        write_file = open(DATA_DIR + filename, 'w')
        write_file.write(response.data.decode('utf-8'))
        write_file.close()
        print(write_file.name + " created")
    else:
        print(check_file.name + " already exists")


# main program starts
files = get_files()
for file in files:
    file_object = open(PROJECTS_DIR + file, "r")
    ymlObj = list(yaml.load_all(file_object.read()))[0]
    if "readme" in ymlObj:
        make_file(file, ymlObj['readme'])

