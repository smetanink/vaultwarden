#!/bin/sh

openssl enc -d -aes256 -salt -pbkdf2 -pass pass:BACKUP_ENCRYPTION_KEY -in /backups/DESIRED_BACKUP_NAME.tar.gz | tar xz -C /backups