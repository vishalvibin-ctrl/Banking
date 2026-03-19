/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#F0C850',
        navy: { 900: '#080E1A', 800: '#0B1120', 700: '#0F1A2E', 600: '#162440', 500: '#1A2D4A' },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
