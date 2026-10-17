/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#050811',
          card: '#0a0f1d',
          cardBorder: 'rgba(56, 189, 248, 0.15)',
          neonCyan: '#00f0ff',
          neonEmerald: '#10b981',
          neonAmber: '#f59e0b',
          neonRed: '#ef4444'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.25)',
        'glow-red': '0 0 30px rgba(239, 68, 68, 0.3)',
        'glow-amber': '0 0 25px rgba(245, 158, 11, 0.25)',
        'glow-green': '0 0 25px rgba(16, 185, 129, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
