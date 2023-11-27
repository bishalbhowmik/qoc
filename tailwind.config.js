/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#f7e8e9",
        lightH: "#f3dcde",
        lightA: "#e5b7bb",
        normal: "#9b1620",
        normalH: "#751A22",
        normalA: "#8a131c",
        dark: "#81121a",
        darkH: "#670e15",
        darkA: "#4d0b10",
        darker: "#3c080c",
        navInactive: "#393939",
        // ...
      },
    },
  },
  plugins: [require("daisyui")],
};
