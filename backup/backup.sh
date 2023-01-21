#!/bin/sh

# Setup backup
TIMESTAMP=$(date "+%Y%m%d%H%M%S")
BACKUP_ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY:-$(openssl rand -base64 48)}"

DATA_FOLDER="/data"
TEMP_FOLDER="/tmp"
BACKUP_FOLDER="/backup"

BACKUP_DB="db_$TIMESTAMP.sqlite3"

# Set Status Message
STATUS_MESSAGE="Backup $TIMESTAMP"

# Create Temp folder
mkdir -p $TEMP_FOLDER/$TIMESTAMP

# Create backup
sqlite3 $DATA_FOLDER/db.sqlite3 ".backup '$TEMP_FOLDER/$TIMESTAMP/$BACKUP_DB'"
cp -R $DATA_FOLDER/attachments $TEMP_FOLDER/$TIMESTAMP/attachments
cp -R $DATA_FOLDER/sends $TEMP_FOLDER/$TIMESTAMP/sends
cp $DATA_FOLDER/config.json $TEMP_FOLDER/$TIMESTAMP/config.json

# Create archive
tar -czvf - --directory=$TEMP_FOLDER/ $TIMESTAMP | openssl enc -e -aes256 -salt -pbkdf2 -pass pass:${BACKUP_ENCRYPTION_KEY} -out $BACKUP_FOLDER/$TIMESTAMP.tar.gz
[ $? -eq 0 ] && STATUS_MESSAGE="$STATUS_MESSAGE created" || STATUS_MESSAGE="$STATUS_MESSAGE failed" 

# Put on S3
aws --endpoint-url="$S3_CUSTOM_ENDPOINT" s3 cp $BACKUP_FOLDER/$TIMESTAMP.tar.gz $S3_BUCKET/$TIMESTAMP.tar.gz
[ $? -eq 0 ] && STATUS_MESSAGE="\u2705 $STATUS_MESSAGE. Loaded to S3" || STATUS_MESSAGE="\u274c $STATUS_MESSAGE. Saved locally" 

# clear temp files
rm -R $TEMP_FOLDER

# send TG message
./tg-bot.sh "$STATUS_MESSAGE"