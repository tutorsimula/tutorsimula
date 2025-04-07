/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'glow-white': '0 0 15px rgba(255, 255, 255, 0.5)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.5)',
        'glow-gray': '0 0 15px rgba(75, 85, 99, 0.5)'
      },
      minHeight: {
        screen: '100vh'
      },
      width: {
        screen: '100vw'
      }
    },
  },
  plugins: [],
}
