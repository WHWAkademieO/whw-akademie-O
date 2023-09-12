/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./wp-templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        xl: "1200px",
      },
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, bottom: 50 },
          "100%": { opacity: 1, bottom: '2.5rem' },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forward",
      },
      backgroundImage: {
        "gradient-green-full":
          "linear-gradient(90deg, #45BC00 0%, #BEEA00 100%)",
        "gradient-green":
          "linear-gradient(90deg, #3AAA35 0%, rgba(58, 170, 53, 0.00) 100%)",
        "gradient-green-reverse":
          "linear-gradient(90deg,rgba(0,0,0,0.00) 0%, rgba(58, 170, 53, 1) 100%)",
        "gradient-conic": "linear-gradient(180deg, #32754A 0%, #CCD444 100%)",
      },
      boxShadow: {
        large_shadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      },
      colors: {
        main_green: "#007138",
        dark_green: "#0b733b",
        "dartmouth-green": "#007138",
        "bitter-lemon": "#c7d301",
        "rich-black": "#020202",
      },
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        montserratItalic: [
          "Montserrat-Italic",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
