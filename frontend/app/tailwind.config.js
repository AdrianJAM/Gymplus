/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C3E50",
        secondary: {
          1: "#ECF0F1",
          2: "#E67E22",
          3: "#3498DB",
        },
        alert: {
          success: "#2ECC71",
          error: "#E74C3C",
          warning: "#F39C12",
        },
      },
    },
  },
  plugins: [],
};
