/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')

const isDev = process.env.NODE_ENV === 'development'

module.exports = withPWA({
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
      { source: '/over-ons', destination: '/about' },
      { source: '/kamers', destination: '/rooms' },
    ]
  },
})
// https://stackoverflow.com/questions/68723485/how-to-setup-i18n-translated-url-routes-in-next-js
