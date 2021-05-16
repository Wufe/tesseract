FROM node:14 AS builder
WORKDIR /app
COPY . /app
RUN npm install && \
    npm run build:prod

FROM node:14
LABEL maintainer="simone.bembi@gmail.com"
WORKDIR /app
COPY --from=builder /app/dist/backend.js /app/backend.js
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/.env /app/.env
RUN npm install --production

ENTRYPOINT node ./backend.js