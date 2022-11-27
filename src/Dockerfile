FROM alpine:latest

RUN apk add --no-cache \
    sqlite \
    curl \
    bash \
    openssl \
    aws-cli

# Copy scripts
COPY entrypoint.sh /
COPY backup.sh /
COPY restore-backup.sh /

# Give execution permission to scripts
RUN chmod +x /entrypoint.sh && \
    chmod +x /backup.sh && \
    chmod +x /restore-backup.sh

ENV BACKUP_CRONED="0 */12 * * *"

ENTRYPOINT ["/entrypoint.sh"]