#!/bin/sh

# run backup once on container start to ensure it works
/backup.sh 

# start crond in foreground
echo "$BACKUP_CRONED /backup.sh" > /etc/crontabs/root
exec crond -f