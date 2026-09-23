import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F4F0E8",
          light: "#FAF8F4",
          dark: "#E8E2D5",
          border: "#DED6C7",
        },
        dark: {
          DEFAULT: "#101010",
          surface: "#181818",
          card: "#1E1E1E",
          border: "#2A2A2A",
          muted: "#888888",
        },
        lime: {
          DEFAULT: "#C9FF35",
          hover: "#B6F020",
        },
        cobalt: {
          DEFAULT: "#315BFF",
          hover: "#2247E5",
        },
        coral: {
          DEFAULT: "#FF5A4F",
          hover: "#E84338",
        },
      },
      fontFamily: {
        sans: ["var(--font-grotesk)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        offset: "4px 4px 0px #101010",
        "offset-sm": "2px 2px 0px #101010",
        "offset-lg": "6px 6px 0px #101010",
        "offset-lime": "4px 4px 0px #C9FF35",
        "offset-cream": "4px 4px 0px #F4F0E8",
      },
      borderRadius: {
        agency: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
