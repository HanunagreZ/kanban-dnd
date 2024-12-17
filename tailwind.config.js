/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      manrope: 'Manrope',
      helvetica: 'Helvetica',
    },
    extend: {
      boxShadow: {
        custom: '0 0 10px 0 #D5E1F5',  
      },
      colors: {
        mainBackgroundColor: '#0D1117',
        columnBackgroundColor: '#161C22',
        baseBW: '#FFF',
        primaryBlue: '#5A87D6',
        secondaryGray020: "#F9FAFB",
        secondaryGray050: "#F1F2F4",
        secondaryGray200: '#C7CBD1',
        secondaryGray400: '#8F96A3',
        secondaryGray600: '#5C6370',
        secondaryGray800: '#1E2329',
        textGreen: "#61C347",
        backgroundGreen: "#61C34726",
        textRed: "#F63F50",
        backgroundRed: "#F63F5026",
        textOrange: "#F1961A",
        backgroundOrange: "#F1961A26", 
        cardStroke: "#E3E5E8",
        cardShadow: "#D5E1F5"
      },
    },
  },
  plugins: [
    // function({ addComponents }) {
    //   addComponents({
    //     '[data-rbd-placeholder-context-id]': {
    //       margin: '10px 0',
    //       minHeight: '50px',
    //       background: 'rgba(0, 0, 0, 0.1)',
    //     },
    //   })
    // },
  ],
};
