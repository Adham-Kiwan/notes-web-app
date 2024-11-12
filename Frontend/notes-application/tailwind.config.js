const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/toggle.js"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // Extra small screens (e.g., phones)
        '3xl': '1600px', // Larger screens (e.g., large desktops)
        // You can add more custom breakpoints as needed
      },
    },
  },
  plugins: [nextui()],
}