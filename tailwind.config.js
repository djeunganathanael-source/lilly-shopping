export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#fbf9f5',
        'surface-container': '#efeeea',
        'surface-container-high': '#eae8e4',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f3ef',
        primary: '#000000',
        'on-primary': '#ffffff',
        'primary-container': '#0d1c32',
        'on-primary-container': '#76849f',
        'tertiary-fixed': '#ffdea5',
        'tertiary-fixed-dim': '#e9c176',
        'on-tertiary-fixed': '#261900',
        'outline-variant': '#c5c6cd',
        'on-surface': '#1b1c1a',
        'on-surface-variant': '#44474e',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'surface-dark': '#0a0a0a',
        'on-surface-dark': '#e2e2e2',
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(0, 0, 0, 0.1)',
        'ambient-dark': '0 20px 40px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
