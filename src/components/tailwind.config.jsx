/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        boxShadow: {
          'glow-green': '0 0 10px rgba(0, 255, 0, 0.5)', // Green glow for Sign Up and Explore Programs
          'glow-blue': '0 0 10px rgba(0, 0, 255, 0.5)',   // Blue glow for Sign In and CTA
          'glow-gray': '0 0 10px rgba(255, 255, 255, 0.2)', // Subtle gray glow for Cancel
          'glow-red': '0 0 10px rgba(255, 0, 0, 0.5)',    // Red glow for Sign Out
        },
      },
    },
    plugins: [],
  };