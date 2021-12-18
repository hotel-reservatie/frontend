/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')
const { withSentryConfig } = require('@sentry/nextjs')

const isDev = process.env.NODE_ENV === 'development'

const moduleExports = {
  reactStrictMode: true,
  distDir: 'dist',
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  i18n,
  // i18n: {
  //   locales: ['en', 'nl'],
  //   defaultLocale: 'en',
  //   localeDetection: true,
  // },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: isDev,
  },
  async rewrites() {
    return [
      { source: '/nl', destination: '/', locale: false },
      { source: '/nl/over-ons', destination: '/about', locale: false },
      { source: '/nl/kamers', destination: '/rooms', locale: false },
      { source: '/nl/contact', destination: '/contact', locale: false },
      { source: '/nl/login', destination: '/login', locale: false },
      { source: '/nl/registreer', destination: '/register', locale: false },
      {
        source: '/nl/nieuwereservatie',
        destination: '/newreservation',
        locale: false,
      },
      {
        source: '/nl/profiel/favorieten',
        destination: '/profile/favorites',
        locale: false,
      },
      {
        source: '/nl/profiel/info',
        destination: '/profile/info',
        locale: false,
      },
      {
        source: '/nl/profiel/reservaties',
        destination: '/profile/reservations',
        locale: false,
      },
      {
        source: '/nl/reservatie/:reservationId',
        destination: '/reservations/:reservationId',
        locale: false,
      },
      {
        source: '/nl/kamer/:roomId',
        destination: '/room/:roomId',
        locale: false,
      },
    ]
  },
}
// https://stackoverflow.com/questions/68723485/how-to-setup-i18n-translated-url-routes-in-next-js

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

module.exports = isDev
  ? withPWA(moduleExports)
  : withPWA(withSentryConfig(moduleExports, sentryWebpackPluginOptions))
