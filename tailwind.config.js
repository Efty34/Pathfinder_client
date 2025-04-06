import tailwindcssAnimate from 'tailwindcss-animate';
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Blue and Teal color palette
        "blue-light": "#00c3ff",
        "blue-primary": "#0077ff",
        "blue-dark": "#0055cc",
        "teal-light": "#00ffea",
        "teal-primary": "#00d4c4",
        "teal-dark": "#00a99e",

        ocean: {
          900: '#0F2942',
          800: '#1B3D5F',
          700: '#20597C',
          600: '#267599',
          500: '#2C91B5',
          400: '#33ACC8',
          300: '#40C7D7',
          200: '#52E2E7',
        },
        
      },
      boxShadow: {
        "glow-blue": "0 0 10px rgba(0, 119, 255, 0.5), 0 0 20px rgba(0, 119, 255, 0.3)",
        "glow-teal": "0 0 10px rgba(0, 212, 196, 0.5), 0 0 20px rgba(0, 212, 196, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-down": "fadeInDown 0.5s ease-in-out",
        "fade-in-left": "fadeInLeft 0.5s ease-in-out",
        "fade-in-right": "fadeInRight 0.5s ease-in-out",
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
}






