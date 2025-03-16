/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        aqua: '#58bcb3',
        light: '#f6f6f6',
      },
      fontFamily: {
        'comfortaa': ['Comfortaa', 'cursive']
      }
    },
  },
  plugins: [],
}

