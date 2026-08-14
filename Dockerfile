# ---- deps: install once, cached and reused by the builder stage ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY src/package.json src/yarn.lock? ./
RUN yarn install --frozen-lockfile

# ---- builder: full source + `next build` ----
# Needs the full node_modules (incl. devDependencies) because `next build`
# runs ESLint as part of the build.
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src/ .

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_SIGNUP_CONFIRMATION_MODE
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} \
    NEXT_PUBLIC_SIGNUP_CONFIRMATION_MODE=${NEXT_PUBLIC_SIGNUP_CONFIRMATION_MODE} \
    NEXT_TELEMETRY_DISABLED=1

RUN yarn build

# ---- production: only the standalone server output ----
# `output: 'standalone'` (next.config.js) traces the minimal files/deps
# next needed at runtime into .next/standalone — no full node_modules, no
# source tree, no build cache in the final image.
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# node:*-alpine ships a non-root `node` user (uid/gid 1000) for exactly
# this purpose. Production has no bind mounts, so there's no host uid to
# match — no need for the custom USER/GROUP build args the dev image uses.
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
# `output: 'standalone'` produces its own minimal server entrypoint —
# `yarn start` (next start) would fail here since node_modules/.bin isn't
# copied into this stage.
CMD ["node", "server.js"]
