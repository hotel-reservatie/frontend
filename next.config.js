/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const isDev = process.env.NODE_ENV === 'development'

module.exports = withPWA({
  reactStrictMode: true,
  distDir: 'dist',
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: isDev,
  },
})
