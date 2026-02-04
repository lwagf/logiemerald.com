import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          light: '#87CEEB',
          DEFAULT: '#1e90d6',
          dark: '#004080',
        },
        glass: {
          bg: 'rgba(15,25,45,0.95)',
          border: 'rgba(100,150,200,0.2)',
        },
        accent: {
          green: '#4a9a6a',
          'green-dark': '#2a7a4a',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      animation: {
        'wave': 'wave 8s linear infinite',
        'wave-reverse': 'wave 12s linear infinite reverse',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          'from': { backgroundPositionX: '0' },
          'to': { backgroundPositionX: '1200px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '0.8', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
