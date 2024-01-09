FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
RUN yarn global add dotenv-cli
COPY . .
RUN turbo prune @ark/web --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
RUN yarn dotenv -- yarn turbo build --filter=@ark/web...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=installer /app/apps/web/package.json .

COPY --from=installer --chown=nodejs:nodejs  /app/apps/web/dist ./apps/web/dist

CMD npx serve apps/web/dist/
