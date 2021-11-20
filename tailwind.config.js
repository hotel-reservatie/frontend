// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',

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
      colors: {
        blue: {
          50: '#F7FAFF',
          100: '#F2F6FF',
          200: '#D9E3FC',
          300: '#B7C9F7',
          400: '#8FACF7',
          500: '#527FF7',
          600: '#2A5EE8',
          700: '#0839BC',
          800: '#062782',
          900: '#03123D',
        },
      },
      borderRadius: {
        xl: '32px',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(9rem, 1fr))'
      },
      gridTemplateRows: {
        'fixheight': " repeat(400px)"
      },
      width: {
        "100": "100px",
        "80": "80px"
      },
      height: {
        "100": "100px",
        // "80": "80px"
      },
      minHeight: {
        "100": "100px"
      }
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
}
