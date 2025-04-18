import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
extend: {
    animation: {
      gradient: 'gradient 4s ease infinite',
    },
    keyframes: {
      gradient: {
        '0%, 100%': {
          'background-position': '0% 50%',
        },
        '50%': {
          'background-position': '100% 50%',
        },
      },
    },
  }
},
  plugins: []
  } satisfies Config;