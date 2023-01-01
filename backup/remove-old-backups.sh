#!/bin/sh

find $BACKUP_FOLDER -maxdepth 1 -name '*.tar.gz' -type f -mtime +$BACKUP_STORE_DATES -delete 