/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Mode - Soft Pastels
        'pastel-aqua': '#A8DADC',
        'pastel-pink': '#FFB5C5',
        'pastel-lavender': '#C9A9E9',
        'pastel-peach': '#FFE5B4',
        'pastel-mint': '#B4E7CE',
        'pastel-bubblegum': '#FFC8DD',
        'pastel-sky': '#E3F2FD',      // Very light blue
        'pastel-cloud': '#F0F8FF',    // Alice blue (almost white with blue tint)

        // Dark Mode - Muted Pastels
        'dark-teal': '#5A8C8E',
        'dark-rose': '#C77B8B',
        'dark-purple': '#9B7BB5',
        'dark-gold': '#C4A57B',
        'dark-sage': '#7AB89B',
        'dark-mauve': '#CC93A8',
        'charcoal': '#1A1A1D',
        'charcoal-secondary': '#2D2D30',

        // Party Mode (vibrant)
        'party-pink': '#FF6B9D',
        'party-purple': '#C77DFF',
        'party-blue': '#00B4D8',
        'party-yellow': '#FFD60A',
        'party-green': '#06FFA5',
      },
      fontFamily: {
        'bubbly': ['Quicksand', 'Comfortaa', 'Nunito', 'sans-serif'],
        'display': ['Fredoka', 'Poppins', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in',
        'fade-up': 'fadeUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'sparkle': 'sparkle 0.6s ease-out',
        'confetti': 'confetti 1s ease-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        sparkle: {
          '0%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
          '100%': { opacity: '0', transform: 'scale(0) rotate(360deg)' },
        },
        confetti: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      borderRadius: {
        'soft': '24px',
        'extra-soft': '28px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'polaroid': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'float': '0 8px 30px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
