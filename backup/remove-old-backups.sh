#!/bin/sh

find $BACKUP_FOLDER -maxdepth 1 -name '*.tar.gz' -type f -mtime +$BACKUP_STORE_DATES -delete 
[ $? -eq 0 ] && STATUS_MESSAGE="\u2705 Old local backups was deleted" || STATUS_MESSAGE="\u274c Clearing local backups error"

# send TG message
./tg-bot.sh "$STATUS_MESSAGE" 