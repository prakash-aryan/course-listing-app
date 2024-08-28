module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        gray: {
          300: '#D1D5DB',
          400: '#9CA3AF',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        green: {
          500: '#10B981',
        },
        red: {
          500: '#EF4444',
        },
        yellow: {
          500: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
}