import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-jetbrains)"],
      },
      colors: {
        bg: "#0d0d12",
        surface: "#111118",
        border: "#1e1e2a",
        primary: "#e8e8f0",
        muted: "#666677",
        dim: "#3a3a4a",
        solana: "#14F195",
        purple: "#9945FF",
        amber: "#f0a435",
        header: "#16161e",
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;