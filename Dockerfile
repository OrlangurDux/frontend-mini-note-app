FROM node:20-alpine AS production
ENV NODE_ENV production
ARG USER
ARG GROUP
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_SIGNUP_CONFIRMATION_MODE
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_SIGNUP_CONFIRMATION_MODE=${NEXT_PUBLIC_SIGNUP_CONFIRMATION_MODE}
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY src/package.json .
COPY src/yarn.lock? .
RUN yarn install
# Copy app files
COPY src/ .
RUN find . -type d \( -path ./node_modules \) -prune -o -exec chown "${USER}:${GROUP}" {} \;
USER "${USER}:${GROUP}"
RUN yarn build
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]
