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
      textGray: '#989898',
      transparent: 'transparent',
      'red-500': '#D2001A',
      'blue-600': '#44576B',
      'gray-400': '#99A4AE',
      'gray-border': '#CFD2CF',
      extend: {
        fontFamily: {
          rubik: ['"Kaushan Script"', ...defaultTheme.fontFamily.sans],
        },
      },
    },

    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
