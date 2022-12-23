/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  presets: [
    require('./tailwind.preset.cjs')
  ],
  corePlugins: {
    preflight: false
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    '@tailwindcss/aspect-ratio',
  ],
}
