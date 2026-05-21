/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        fabula: {
          bg: '#fafafa',
          'bg-dark': '#0a0a0a',
          surface: '#ffffff',
          'surface-dark': '#111111',
          border: '#e5e5e5',
          'border-dark': '#1a1a1a',
          text: '#171717',
          'text-secondary': '#737373',
          'text-dark': '#f5f5f5',
          'text-dark-secondary': '#a3a3a3',
          accent: '#2563eb',
          'accent-subtle': 'rgba(37, 99, 235, 0.08)',
        }
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'float': '0 4px 24px rgba(0,0,0,0.06)',
        'float-dark': '0 4px 24px rgba(0,0,0,0.3)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
