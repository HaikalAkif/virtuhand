/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        iRec: ['Recoreta', 'sans-serif'],
        iGen: ['General Sans', 'sans-serif'],
      }
    }
  },
  plugins: []
}

