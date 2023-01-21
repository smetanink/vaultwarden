#!bin/bash

curl --location --request POST "$BOT_URL/message" \
--header 'Content-Type: application/json' \
--data @<(cat <<EOF
{
  "message": "$1"
  }
EOF
)