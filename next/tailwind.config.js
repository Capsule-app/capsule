module.exports = {
  purge: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      serif: ["Poppins", "ui-serif"],
    },
    fontSize: {
      tiny: "0.625rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    colors: {
      button: "var(--color-button-text)",
      transparent: "transparent",
      primary: {
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        900: "var(--color-primary-900)",
      },
      accent: {
        DEFAULT: "var(--color-accent)",
        hover: "var(--color-accent-hover)",
        disabled: "var(--color-accent-disabled)",
      },
      secondary: {
        100: {
          DEFAULT: "var(--color-secondary-100)",
          hover: "var(--color-secondary-100-hover)",
        },
        200: {
          DEFAULT: "var(--color-secondary-200)",
          hover: "var(--color-secondary-200-hover)",
        },
        300: "var(--color-secondary-300)",
        ring: "var(--color-secondary-ring)",
      },
      black: "#000",
      white: "#fff",
      green: {
        100: "var(--color-green-100)",
        200: "var(--color-green-200)",
        300: "var(--color-green-300)",
        400: "var(--color-green-400)",
      },
      red: {
        100: "var(--color-red-100)",
        200: "var(--color-red-200)",
        300: "var(--color-red-300)",
        400: "var(--color-red-400)",
      },
      gray: {
        100: "var(--color-gray-100)",
        200: "#9CA3AF",
        300: "#6B7280",
      },
      blue: "#2F4AF7",
      purple: "#C661F4",
    },
    screens: {
      m: "1050px",
    },
    spacing: {
      0: "0px",
      1: "5px",
      1.5: "6px",
      2: "10px",
      3: "15px",
      4: "20px",
      4.5: "25px",
      5: "30px",
      5.5: "35px",
      6: "40px",
      6.5: "50px",
      7: "60px",
      7.5: "65px",
      8: "75px",
      9: "80px",
      10: "90px",
      11: "100px",
      15: "150px",
      "5l": "10rem",
      "n1/2": "-50%",
      24: "24rem",
      400: "400px",
    },
    gridTemplateColumns: {
      xl: "275px 600px 350px",
      lg: "60px 600px 360px",
      md: "644px 360px",
      3: "repeat(3, minmax(0, 1fr))",
    },
    gridTemplateRows: {
      fr: "1fr auto 1fr",
    },
    extend: {
      borderRadius: {
        5: "5px",
        8: "8px",
        20: "20px",
        40: "40px",
      },
      borderColor: {
        "color-800": "var(--color-primary-800)",
      },
      outline: {
        "no-chrome": "none",
      },
      transitionTimingFunction: {
        "in-out-hard": "cubic-bezier(.77, 0, .175, 1)",
      },
      transitionDuration: {
        400: "400ms",
      },
      keyframes: {
        breathe: {
          "0%, 100%": {
            boxShadow: "0 0 20px 2px var(--color-primary-100-translucent)",
            borderColor: "var(--color-primary-300)",
          },
          "50%": {
            boxShadow: "0 0 20px 2px transparent",
            borderColor: "var(--color-primary-700)",
          },
        },
      },
      animation: {
        "breathe-slow": "breathe 5s infinite ease-in-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
