/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "inter",
      },
      colors: {
        blue: {
          100: "#E3EAEF",
          500: "#2188FF",
          900: "#023B78",
          950: "#17192D",
        },
        gray: {
          950: "#24292F",
          900: "#363C44",
          600: "#77818C",
          500: "#88929C",
          400: "#C1C9D2",
        },
      },
    },
  },
  plugins: [],
};
