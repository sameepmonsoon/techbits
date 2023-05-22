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
      screens: {
        sm: "576px",
        md: "960px",
        midmd: "1150px",
        bigmd: "1250px",
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
