/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        horizon: '#244568',
        royal: '#2864DC',
        steel: '#4F83CC',
        mist: '#DCEBFA',
        ice: '#EAF2FC',
        cloud: '#F5F8FC',
        fresh: '#22B8A5',
        ink: '#334E68',
        danger: '#DC2626',
        warn: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
