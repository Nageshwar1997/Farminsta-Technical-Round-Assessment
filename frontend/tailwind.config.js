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
        "2xl": "1536px",
      },
      colors: {
        darkBackground: "#1a1a1a",
        darkText: "#e0e0e0",
        whiteBackground: "#ffffff",
        whiteText: "#333333",
        borderLight: "#dcdcdc", // Custom light border color
        borderDark: "#444444", // Custom dark border color
      },
      borderColor: {
        DEFAULT: "#dcdcdc", // Default border color
        dark: "#444444", // Dark mode border color
      },
      borderWidth: {
        1: "1px", // Custom 1px border width
        2: "2px", // Custom 2px border width
        4: "4px", // Custom 4px border width
        8: "8px", // Custom 8px border width
      },
      borderRadius: {
        sm: "0.125rem", // Small border radius
        md: "0.375rem", // Medium border radius
        lg: "0.5rem", // Large border radius
        xl: "0.75rem", // Extra large border radius
        full: "9999px", // Full border radius for circular elements
      },
    },
  },
  plugins: [],
};
