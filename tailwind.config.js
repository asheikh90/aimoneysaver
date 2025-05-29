/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        accent: "#F59E0B",
        neutral: "#111827",
        "base-100": "#F3F4F6",
        "base-200": "#E5E7EB",
        "base-300": "#D1D5DB",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4F46E5",
          "secondary": "#10B981",
          "accent": "#F59E0B",
          "neutral": "#111827",
          "base-100": "#F3F4F6",
        },
      },
    ],
  },
}
