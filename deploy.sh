#!/bin/sh
USER=saghafoo
HOST=general.asu.edu
DIR=www   # might sometimes be empty!

hugo && rsync -avz --delete public/ ${USER}@${HOST}:~/${DIR}

exit 0