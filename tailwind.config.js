/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "400px",
        sm: "640px",
        md: "768px",
        lg: "1124px",
        "2xl": "1400px",
        "3xl": "1600px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#000",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#EE7838",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: {
          100: "border-gray-100",
          DEFAULT: "#eee",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideInRight: "slideInRight 0.7s ease-out forwards",
        scroll: "scroll 2.2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite",
      },

      keyframes: {
        slideInRight: {
          "0%": { opacity: 0, transform: "translateX(100px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        scroll: {
          "0%": { opacity: 0 },
          "10%": { transform: "translateY(0)", opacity: 1 },
          "100%": { transform: "translateY(50px)", opacity: 0 },
        },
      },
      //   animation: {
      //     slideInRight: "slideInRight 0.7s ease-out forwards",
      //   },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
