/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          300: '#C084FC',
          400: '#A855F7',
          500: '#9333EA',
        },
        gray: {
          100: '#F9FAFB',
          200: '#E4E4E7',
          300: '#A1A1AA',
          400: '#3F3F46',
          500: '#18181B',
        },
      },
      keyframes: {
        openModal: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        closeModal: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
    },
    plugins: [],
  },
}
