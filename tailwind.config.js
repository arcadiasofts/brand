/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#FFFFFFF",
        foreground: "#000000",
        border: "#e5e5e5",
        purple: {
          10: "#9f37ff",
        },
      },
    },
  },
  plugins: [],
};
