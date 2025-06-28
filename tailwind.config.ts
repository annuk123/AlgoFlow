import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
export default {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
extend: {
screens: {
        xs: "480px",
      },

    animation: {
      gradient: 'gradient 4s ease infinite',
    },
    colors: {
      'pale-yellow': '#f7f7d5',
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
 plugins: [require("tailwind-scrollbar-hide"), typography],
  } satisfies Config;