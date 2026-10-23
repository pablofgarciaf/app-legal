import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ─── SLATE (Dark surfaces) ───────────────────────────────────────────
        slate: {
          950: "#0A0A0F",  // deepest bg - Linear dark
          900: "#111118",  // page bg dark
          850: "#18181F",  // card dark
          800: "#1E1E2A",  // elevated card
          750: "#252532",  // hover state
          700: "#2E2E3D",  // border dark
          600: "#3F3F52",  // muted border
          500: "#6B6B85",  // placeholder
          400: "#9898B3",  // secondary text
          300: "#BEBEDE",  // muted text
          200: "#E2E2EE",  // body text
          100: "#F0F0F8",  // near white
          50:  "#F7F7FD",  // white surface
        },

        // ─── BLUE (Primary brand) ─────────────────────────────────────────────
        // Inspired by: Linear blue, Vercel blue
        blue: {
          50:  "#EFF4FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",  // Vercel blue
          600: "#2563EB",  // Linear brand
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },

        // ─── VIOLET (AI / Gemini accent) ────────────────────────────────────
        // Inspired by: Vercel AI gradient, Linear purple
        violet: {
          50:  "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },

        // ─── EMERALD (Success / Live status) ────────────────────────────────
        emerald: {
          50:  "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },

        // ─── AMBER (Warning / Lawyer accent) ────────────────────────────────
        amber: {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },

        // ─── ROSE (Danger / Urgent) ──────────────────────────────────────────
        rose: {
          50:  "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },

        // ─── SEMANTIC TOKENS (light/dark via CSS vars) ───────────────────────
        // Used as: bg-surface, text-primary, border-default, etc.
        surface: "var(--color-surface)",
        "surface-1": "var(--color-surface-1)",
        "surface-2": "var(--color-surface-2)",
        "surface-3": "var(--color-surface-3)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        "border-default": "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        "brand": "var(--color-brand)",
        "brand-subtle": "var(--color-brand-subtle)",
      },

      // ─── TYPOGRAPHY ──────────────────────────────────────────────────────────
      fontFamily: {
        sans:  ["var(--font-plus-jakarta)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono:  ["'SF Mono'", "'Fira Code'", "'JetBrains Mono'", "monospace"],
      },

      // ─── BORDER RADIUS ───────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ─── SHADOWS ─────────────────────────────────────────────────────────────
      boxShadow: {
        // Linear-style shadow system
        "xs":     "0 1px 2px 0 rgba(0,0,0,0.05)",
        "sm":     "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        "md":     "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        "lg":     "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        "xl":     "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
        "card-dark":   "0 0 0 1px rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)",
        "card-light":  "0 0 0 1px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "brand-glow":  "0 0 20px -4px rgba(37,99,235,0.5)",
        "violet-glow": "0 0 20px -4px rgba(139,92,246,0.5)",
        "inset-t": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },

      // ─── ANIMATIONS ──────────────────────────────────────────────────────────
      keyframes: {
        "fade-in":     { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-up":    { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "slide-in-left": { "0%": { opacity: "0", transform: "translateX(-12px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "scale-in":    { "0%": { opacity: "0", transform: "scale(0.96)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        "pulse-soft":  { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
        "shine":       { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
      },
      animation: {
        "fade-in":       "fade-in 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
        "slide-up":      "slide-up 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
        "slide-in-left": "slide-in-left 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
        "scale-in":      "scale-in 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
        "pulse-soft":    "pulse-soft 2s ease-in-out infinite",
        "shine":         "shine 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
