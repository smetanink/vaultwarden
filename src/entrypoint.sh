#!/bin/sh

# run backup once on container start
/backup.sh
/remove-old-backups.sh

# start crond in foreground
echo "$BACKUP_CRONED /backup.sh" > /etc/crontabs/root
echo "$REMOVE_BACKUPS_CRONED /remove-old-backups.sh" >> /etc/crontabs/root
exec crond -f