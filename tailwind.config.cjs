/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,json}",
    "./components/**/*.{js,ts,jsx,tsx,json}",
    "./intro-template/**/*.{js,ts,jsx,tsx,json}",
  ],
  theme: {
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      sans: ["Inter var", "sans-serif"],
    },
  },
  plugins: [require("autoprefixer"), require("@tailwindcss/typography")],
};
