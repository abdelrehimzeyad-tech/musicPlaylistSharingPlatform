/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 🌞 Light mode glowing blobs
        "hero-light":
          "radial-gradient(circle at 50% 30%, rgba(255,180,255,0.45), transparent 60%), radial-gradient(circle at 80% 70%, rgba(180,220,255,0.45), transparent 60%)",

        // 🌚 Dark mode neon blobs
        "hero-dark":
          "radial-gradient(circle at 50% 30%, rgba(168,55,255,0.25), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,70,180,0.20), transparent 60%)",
      },

      blur: {
        xl: "30px",
        "2xl": "50px",
        "3xl": "80px",
      },
    },
  },
  plugins: [],
};
