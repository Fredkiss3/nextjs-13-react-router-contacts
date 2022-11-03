##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY ./webapp/package.json  .

RUN yarn global add pnpm && pnpm install --strict-peer-dependencies=false

##### BUILDER & RUNNER

FROM --platform=linux/amd64 node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./webapp .

ENV NEXT_PUBLIC_API_SERVER https://fredkiss.dev/contacts-api
ENV NEXT_TELEMETRY_DISABLED 1


RUN yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["pnpm", "run", "start"]
