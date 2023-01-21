/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            'spotai-black': '#000000',
            'spotai-gray': '#1D1B1B',
            'spotai-green': '#04aa6d',
            'spotai-green-dark': '#026943',
            'spotai-military': '#495241',
            'spotai-military-dark': '#31382b',
            'spotai-tooltip': '#D9D9D9',
         },
         backgroundImage: {
            audio: "url('./src/assets/audio.png')",
         },
      },
   },
   plugins: [],
}
