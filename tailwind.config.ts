import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#fffaf0",
        ink: "#0a0a0a",
        "body-strong": "#1a1a1a",
        body: "#3a3a3a",
        muted: "#6a6a6a",
        hairline: "#e5e5e5",
        "surface-soft": "#faf5e8",
        "surface-card": "#f5f0e0",
        "surface-strong": "#ebe6d6",
        "surface-dark": "#0a1a1a",
        "surface-dark-elev": "#1a2a2a",
        "brand-pink": "#ff4d8b",
        "brand-lavender": "#b8a4ed",
        "brand-peach": "#ffb084",
        "brand-ochre": "#e8b94a",
        "brand-sky": "#4ea8e0",
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "JetBrains Mono", "Menlo", "monospace"],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
