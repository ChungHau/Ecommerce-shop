/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#111",
        "main-gray": "#1a1c1e",
      },
      // gridTemplateColumns: {
      //   18: "fit-content(20%) fit-content(20%) 1fr",
      // },
    },
  },
  plugins: [],
};
