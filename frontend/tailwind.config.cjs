/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#1E1E2F",
        "light-white": "#F9F9F9"
      },
    },
  },
  plugins: [],
}
