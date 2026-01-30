import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        premium: {
          dark: "#0a0a0f",
          card: "rgba(18, 18, 28, 0.85)",
          border: "rgba(139, 92, 246, 0.3)",
          accent: "#8b5cf6",
          "accent-light": "#a78bfa",
          "accent-dim": "rgba(139, 92, 246, 0.5)",
        },
      },
      backdropBlur: {
        card: "16px",
      },
      boxShadow: {
        card: "0 0 40px rgba(139, 92, 246, 0.08), 0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
