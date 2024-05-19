/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    'node_modules/preline/dist/*.js',
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors:{
        'main-color' : '#E5561E',
        'main-down-color' : '#FFA380',
        'main-action-color': '#C9420E',
        'naver' : '#03C75A',
        'kakao' : '#FEE500'
      },
      height:{
        '128': '32rem',
        '256': '40rem'
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

