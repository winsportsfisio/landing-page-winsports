/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1128',
          900: '#0A1128',
          800: '#10193d',
          700: '#1E3A8A',
        },
        royal: {
          DEFAULT: '#1D4ED8',
          500: '#3B82F6',
          400: '#60A5FA',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          '2xl': '1200px',
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 0 3px rgba(6, 182, 212, 0.35)',
      },
    },
  },
  plugins: [],
};
