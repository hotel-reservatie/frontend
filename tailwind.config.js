// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // mode: 'jit',

  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'media', // or 'class'

  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
}
