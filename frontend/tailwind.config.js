/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Using class strategy for dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        base: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        darkBackground: "#1a1a1a",
        darkText: "#e0e0e0",
        whiteBackground: "#ffffff",
        whiteText: "#333333",
      },
    },
  },
  plugins: [],
};
