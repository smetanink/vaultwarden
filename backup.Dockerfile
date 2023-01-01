FROM alpine:latest

RUN apk add --no-cache \
    sqlite \
    curl \
    bash \
    openssl \
    aws-cli

# Copy scripts
COPY backup/*.sh /

# Give execution permission to scripts
RUN chmod +x /*.sh

ENV BACKUP_CRONED="0 */12 * * *"
ENV REMOVE_BACKUPS_CRONED="10 0 * * *"

ENTRYPOINT ["/entrypoint.sh"]