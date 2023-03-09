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
        "2xs": "0.5rem",
        "table-sm": "0.813rem"
      },
      maxHeight: {
        "144.5": "578px"
      },
      maxWidth: {
        "8xl": "90rem"
      }
    },
  },
  plugins: [],
}
