/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        mainBackgroundColor: '#0D1117',
        columnBackgroundColor: '#161C22',
        baseBW: '#FFF',
        primaryBlue: '#5A87D6',
        secondaryGray200: '#C7CBD1',
        secondaryGray400: '#8F96A3',
        secondaryGray600: '#5C6370',
        secondaryGray800: '#1E2329',
      },
    },
  },
  plugins: [],
};
