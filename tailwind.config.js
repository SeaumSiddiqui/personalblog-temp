import { colors } from './src/config/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        dark: {
          bg: colors.dark.bg,
          card: colors.dark.card,
          border: colors.dark.border,
          text: colors.dark.text,
          'text-secondary': colors.dark.textSecondary,
        },
        light: {
          bg: colors.light.bg,
          card: colors.light.card,
          border: colors.light.border,
          text: colors.light.text,
          'text-secondary': colors.light.textSecondary,
        },
      },
    },
  },
  plugins: [],
};