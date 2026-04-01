/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#050505",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'reveal': 'reveal 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'typewriter': 'typewriter 2s steps(40) 1s 1 normal both, blinkCursor 500ms steps(40) infinite normal',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.92)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blinkCursor: {
          'from': { borderRightColor: 'rgba(255,255,255,0.75)' },
          'to': { borderRightColor: 'transparent' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
