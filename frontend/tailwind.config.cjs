/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#344E41",
        "cream": "#dad7cd",
        "light-green": "#588157",
        "faded-green": "#A3B18A",
        "green": "#3a5a40"
      },
    },
  },
  plugins: [],
}
