/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080b0d',
        void: '#11161b',
        mist: '#ebe6da',
        stone: '#8f9691',
        river: '#6d8a92',
        gold: '#b18b54',
      },
      fontFamily: {
        sans: ['"Manrope"', '"Noto Sans SC"', 'sans-serif'],
        display: ['"Cormorant Garamond"', '"Noto Serif SC"', 'serif'],
      },
      boxShadow: {
        panel: '0 24px 80px rgba(0, 0, 0, 0.34)',
        glow: '0 0 36px rgba(177, 139, 84, 0.12)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)', opacity: '0.88' },
          '50%': { transform: 'translate3d(0, -6px, 0)', opacity: '1' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
      },
      animation: {
        breathe: 'breathe 8s ease-in-out infinite',
        sheen: 'sheen 5.4s linear infinite',
        'float-slow': 'floatSlow 16s ease-in-out infinite',
      },
      backgroundImage: {
        'panel-fade':
          'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
      },
    },
  },
  plugins: [],
}
