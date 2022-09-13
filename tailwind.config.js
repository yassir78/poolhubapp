/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/main/webapp/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#00ADB5',
      secondary: '#A6E3E9',
      tertiary: '#393E46',
      quaternary: '#CBF1F5',
      quinary: '#222831',
      senary: '#393E46',
      septenary: '#E3FDFD',
      octonary: '#EEEEEE',
      white: '#FFFFFF',
      'gray-100': '#D3D3D3',
      transparent: 'transparent',
      'gray-border': '#CFD2CF',
      extend: {
        fontFamily: {
          rubik: ['"Kaushan Script"', ...defaultTheme.fontFamily.sans],
        },
      },
    },

    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/custom-forms')],
};
