/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: { extend: { colors: { ink: "#080A12", panel: "#111522", panel2: "#171B2B", lilac: "#B9A6FF", rose: "#F2A6CE", champagne: "#E5CB91", muted: "#9298AD" } } },
  plugins: []
};