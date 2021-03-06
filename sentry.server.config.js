// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
const isDev = process.env.NODE_ENV === 'development'

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://3c17586fe9d94c1f9cb656fefb1f16e9@o1091498.ingest.sentry.io/6108506',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  tunnel: '/api/tunnel',
  debug: false,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
