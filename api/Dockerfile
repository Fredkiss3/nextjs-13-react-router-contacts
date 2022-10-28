FROM node:16-alpine

# should be specified
WORKDIR /server

RUN apk add --update curl && rm -rf /var/cache/apk/*
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@7

COPY ./package.json ./
COPY ./db.json ./

RUN pnpm install

CMD [ "pnpm", "run", "start" ]