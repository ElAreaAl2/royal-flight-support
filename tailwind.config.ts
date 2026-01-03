import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // We will add Royal Flight specific colors here later
        'royal-gold': '#C5A059',
        'royal-dark': '#0F172A',
        'gold': '#D4AF37',
      },
    },
  },
  plugins: [],
}
export default config
