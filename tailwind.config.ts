import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'lobster': ['Lobster Two', 'cursive'],
      },
    },
  },
  plugins: [],
}
export default config
