import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        surface: '#111113',
        surfaceHover: '#1A1A1D',
        border: '#1F1F23',
        borderSecondary: '#2A2A2E',
        primary: '#FF5C00',
        primaryLight: '#FF8A4C',
        textPrimary: '#FFFFFF',
        textMuted: '#FFFFFFCC',
        textSecondary: '#ADADB0',
        textTertiary: '#8B8B90',
        textDisabled: '#6B6B70',
        textPlaceholder: '#4A4A4E',
        success: '#22C55E',
        successTint: '#22C55E18',
        error: '#EF4444',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        mono: ['DM Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
export default config
