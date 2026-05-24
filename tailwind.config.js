/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030508',
        mist: '#cfd6df',
        glow: '#6fcfff',
        aurora: '#102337',
        gold: '#8f7a42',
      },
      fontFamily: {
        sans: ['"Sora"', '"Noto Sans SC"', 'sans-serif'],
        display: ['"Cormorant Garamond"', '"Noto Serif SC"', 'serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(111, 207, 255, 0.18)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
      animation: {
        drift: 'drift 10s ease-in-out infinite',
        shimmer: 'shimmer 4.8s linear infinite',
      },
    },
  },
  plugins: [],
}
