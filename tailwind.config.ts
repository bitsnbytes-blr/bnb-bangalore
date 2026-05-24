import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "grid": "grid 15s linear infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "grid": {
          "0%": { transform: "rotateX(60deg) translateY(0)" },
          "100%": { transform: "rotateX(60deg) translateY(4rem)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        }
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        void: "#050505",
        blood: {
          DEFAULT: "#DC2626",
          deep: "#991B1B",
        },
        cyber: "#00f0ff", // Neon volt/cyber blue
        ash: "#A1A1AA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        heading: ["Clash Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
