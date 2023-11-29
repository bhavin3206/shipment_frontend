/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        baseColor: "#77BC3F",
        baseFocusColor: "#66AB2E",
        baseFocusColor1: "#A4DF73",
        baseDisabled: "#77BC3FAA",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
