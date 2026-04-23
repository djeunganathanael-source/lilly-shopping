export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#F5F7FA',
        'surface-container': '#EAECEF',
        'surface-container-high': '#E2E5E9',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F0F2F5',
        primary: '#0B2447', // Trust Navy Blue
        'on-primary': '#FFFFFF',
        'primary-container': '#19376D', // Lighter Navy
        'on-primary-container': '#A5D7E8',
        'tertiary-fixed': '#CCFF00', // Action Lime Green
        'tertiary-fixed-dim': '#B2DF00',
        'on-tertiary-fixed': '#0A192F', // Deep navy for text on lime
        'outline-variant': '#CBD5E1',
        'on-surface': '#0A192F',
        'on-surface-variant': '#334155',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'surface-dark': '#0B2447', // Ensuring dark modes fallback into Navy
        'on-surface-dark': '#F5F7FA',
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
