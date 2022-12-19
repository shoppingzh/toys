/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  presets: [
    require('./tailwind.preset.cjs')
  ],
  plugins: [
    require('@tailwindcss/line-clamp'),
    '@tailwindcss/aspect-ratio',
  ],
}
