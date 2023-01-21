### BASE
FROM node:18-alpine AS base

RUN \
  # Add our own user and group to avoid permission problems
  addgroup -g 131337 app \
  && adduser -u 131337 -G app -s /bin/sh -h /app -D app \
  # Create directories for application
  && mkdir -p /app/src
# Set the working directory
WORKDIR /app/src
# Copy project specification and dependencies lock files
COPY package*.json ./


### DEPENDENCIES
FROM base AS dependencies
ARG NPM_TOKEN
RUN \
  # Configure NPM for private repositories
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc \
  # Install Node.js dependencies (only production)
  && npm ci --only=production --ignore-scripts \
  # Backup production dependencies aside
  && cp -R ./node_modules /tmp \
  # Install ALL Node.js dependencies
  && npm ci --ignore-scripts \
  # Delete the NPM token
  && rm -f .npmrc \
  # Backup development dependencies aside
  && mv ./node_modules /tmp/node_modules_dev


### Build
FROM base AS builder
ARG NPM_TOKEN
COPY --from=dependencies /tmp/node_modules_dev ./node_modules
# Copy app sources
COPY . .
RUN \
  # Build app
  npm run build \
  # Backup development dependencies aside
  && mv ./dist /tmp/dist


### RELEASE
FROM base AS release
# Install for healthcheck
RUN apk add --update --no-cache curl
# Copy development dependencies if --build-arg DEBUG=1, or production dependencies
ARG DEBUG
COPY --from=dependencies /tmp/node_modules${DEBUG:+_dev} ./node_modules
COPY --from=builder /tmp/dist ./dist
# Copy app sources
COPY . .
# Change permissions for files and directories
RUN chown -R app:app /app && chmod g+s /app
# Expose application port
ENV HTTP_PORT 3000
EXPOSE ${HTTP_PORT}
# Set NODE_ENV to 'development' if --build-arg DEBUG=1, or 'production'
ENV NODE_ENV=${DEBUG:+development}
ENV NODE_ENV=${NODE_ENV:-production}
# Use non-root user
USER app:app
# Run
CMD [ "node", "dist/index" ]