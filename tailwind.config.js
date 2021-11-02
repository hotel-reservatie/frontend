// tailwind.config.js
module.exports = {
  // mode: 'jit',

  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'media', // or 'class'

  theme: {
    extend: {},
  },

  variants: {
    extend: {},
  },

  plugins: [],
}
