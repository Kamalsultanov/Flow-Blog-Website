/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aqua: '#58bcb3',
      },
      fontFamily: {
        'comfortaa': ['Comfortaa', 'cursive']
      }
    },
  },
  plugins: [],
}

