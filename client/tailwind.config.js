/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use Inter as the default sans-serif font
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        // Custom dark background shades
        gray: {
          950: "#09090f",
          900: "#0f1117",
          800: "#1a1d27",
          700: "#252838",
          600: "#353849",
          500: "#6b7280",
          400: "#9ca3af",
          300: "#d1d5db",
        },
      },
      animation: {
        "gradient":    "gradientShift 4s ease infinite",
        "fadeInUp":    "fadeInUp 0.4s ease-out both",
        "pulse-slow":  "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
