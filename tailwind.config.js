/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather_400Regular", "serif"],
        sans: ["Inter_400Regular", "sans-serif"],
      },
      colors: {
        crema: "#F5F5DC", // Color papel/crema para compartir
      },
    },
  },
  plugins: [],
};
