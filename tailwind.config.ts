import svgToDataUri from "mini-svg-data-uri";
import type { Config } from "tailwindcss";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: "class",
  safelist: ["step"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary-color)",
      },
      animation: {
        "background-position-spin":
          "background-position-spin 3s ease-in-out infinite alternate",
        rotate: "rotate 5s linear infinite",
        gradient: "gradient 5s linear infinite",
        shine: "shine 4s linear infinite",
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-vertical":
          "marquee-vertical var(--duration, 40s) linear infinite",
        float: "float 3s ease-in-out infinite",
        move: "move 5s linear infinite",
        pulse: "pulse var(--duration) ease-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "background-position-spin": {
          "0%": {
            backgroundPosition: "top center",
          },
          "100%": {
            backgroundPosition: "bottom center",
          },
        },
        shine: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
        gradient: {
          to: {
            "background-position": "200% center",
          },
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-40px)" },
        },
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.1rem",
        sm: "1.1rem",
        md: "1.3rem",
        lg: "1.5rem",
        xl: "1.2rem",
        "2xl": "1rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1000px",
        xl: "1280px",
        "2xl": "1520px",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")) as Record<
            string,
            string
          >,
          type: "color",
        },
      );
    }),
  ],
} satisfies Config;
