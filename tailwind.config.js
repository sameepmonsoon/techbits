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
        purple: "#292f34",
        "deep-purple": "#000000",
        "blue-purple": " #0a0a0a",
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
