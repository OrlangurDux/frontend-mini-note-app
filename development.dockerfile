FROM node:20-bookworm-slim AS development
ENV NODE_ENV development
ARG USER
ARG GROUP
# Add a work directory
WORKDIR /app
RUN chown "${USER}:${GROUP}" -R ../app
# Cache and Install dependencies
COPY src/package.json .
COPY src/yarn.lock? .
# Copy app files
COPY src/ .
USER "${USER}:${GROUP}"
# Expose port
EXPOSE 3000
