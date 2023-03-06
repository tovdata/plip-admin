/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts.tsx}"
  ],
  corePlugins: {
    preflight: false
  },
  important: true,
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.5rem"
      }
    },
  },
  plugins: [],
}
