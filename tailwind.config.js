/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-1': '#00A651',
        'primary-2': '#41B743',
        'secondary': '#D7DF23',
        'dark': '#13372F',
        'page': '#FAF9F9',
      }
    },
  },
  plugins: [],
}

