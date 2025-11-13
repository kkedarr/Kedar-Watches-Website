export default {
  darkMode: "class", // enables dark mode using a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#b5853a",
          lightgold: "#ad8f50",
          darkgold: "#b45309",
          dark: "#1a1a1a",
          lightdark: "#222222",
          light: "#FDFBF8",
          darklight: "#F8F5F0",
        },
      },
    },
  },
  plugins: [],
};
