#!/bin/bash
set -a
source ../../.env
set +a
/usr/local/bin/npm run build
ftp -n $DEPLOY_HOST <<SCRIPT
user $USER $PASSWD
cd web/corona_tracker/
lcd ../../build
mput *
a
cd static/css
lcd static/css
mput *
a
cd ../js
lcd ../js
mput *
a
quit
SCRIPT.
