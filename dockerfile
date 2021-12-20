

# Install dependencies only when needed
FROM node:alpine AS deps
RUN echo 'Installing dependencies...'
ENV NODE_OPTIONS=--openssl-legacy-provider
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only-production

# Rebuild the source code only when needed
FROM node:alpine AS builder
RUN echo 'Building...'
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build && npm ci --only-production

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app
RUN echo 'Copy files and run next...'
ENV NODE_ENV production
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-i18next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json


USER nextjs

EXPOSE 3001

ENV PORT 3001

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]