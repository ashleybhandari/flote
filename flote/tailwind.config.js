const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      header: ['"Kulim Park"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        "primary": "#116682",
        "secondary": "#4d616c",
        "tertiary": "#5d5b7d",
        "error": "#ba1a1a",
        "primary-container": "#bde9ff",
        "secondary-container": "#d0e6f2",
        "tertiary-container": "#e3dfff",
        "error-container": "#ffdad6",
        "on-primary-container": "#001f2a",
        "on-secondary-container": "#081e27",
        "on-tertiary-container": "#191836",
        "on-error-container": "#410002",
        "surface": "#f6fafd",
        "surface-dim": "#d6dbde",
        "surface-bright": "#f6fafd",
        "on-surface": "#171c1f",
        "on-surface-variant": "#40484c",
        "outline": "#70787d",
        "outline-variant": "#c0c8cd",
        "link": "#008BEE",
      },
      backgroundImage: {
        "landing":
          "linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, 0)), url('src/assets/landing.jpg')",
      },
    },
  },
  plugins: [],
};
