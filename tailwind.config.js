/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        mustard: "#FEE051",
        "rose-pink": "#FF65C3",
        bluebonnet: "#2708E4",
        "crayola-sky-blue": "#5CE1E6",
        "dark-orange-20": "#FF8E00CC",
        "dark-orange": "#FF8E00",
        "alice-blue": "#FDF7F2",
        cultured: "#F6F6F6",

      },
      colors: {
        mustard: "#FEE051",
        "rose-pink": "#FF65C3",
        bluebonnet: "#2708E4",
        "crayola-sky-blue": "#5CE1E6",
        "dark-orange-20": "#FF8E00CC",
        "dark-orange": "#FF8E00",
      },
      boxShadow: {
        sm: " 0px 4px 12px 0px #0000001F",
      },
    },
  },
  plugins: [],
};
