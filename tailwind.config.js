module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        modalPop: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
      colors: {
        purple: "#9E77ED",
        "deep-purple": "#53389E",
        "blue-purple": "#42307D;",
      },
    },
  },
  plugins: [],
};
