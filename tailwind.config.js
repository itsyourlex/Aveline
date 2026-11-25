/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#090B1A",
        violetNight: "#17132E",
        lavender: "#B9A5FF",
        blush: "#F3A6C8",
        warmWhite: "#FFF8F2",
        gold: "#E8CB91",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};
