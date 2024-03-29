/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        nav: "#22333a", 
        page: "#000000", 
        card: "#10B981", 
        "card-hover": "#2b3441", 
        "default-text": "#f1f3f5", 
        "blue-accent": "#0084d4", 
        "blue-accent-hover": "#009fff"
      },
    },
  },
  plugins: [],
}