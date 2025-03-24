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
        onyx: '#353935',
        jet: '#343434',
        matte: '#28282B',
        halfwhite: '#f6f6f6',
        grey: '#606060',
        lightgrey: '#f1f1f2'
      },
      fontFamily: {
        'comfortaa': ['Comfortaa', 'cursive']
      }
    },
  },
  plugins: [],
}

