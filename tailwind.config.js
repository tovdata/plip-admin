/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts.tsx}"
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {},
  },
  plugins: [],
}