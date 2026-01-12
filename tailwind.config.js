export default { 
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Text",
          "SF Pro Display",
          "Segoe UI Variable",
          "Segoe UI",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
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
