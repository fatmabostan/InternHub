/** @type {import('tailwindcss').Config} */
    module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary:  { background: "#f9f2e0",
            pink: "#d46490",
            green: "#4e9758",
            purple: "#5C2458"

        },
        // Extend border radius
          borderRadius: {
            base: '9999px',
            container: '12px',
          },
        
          // Extend border width
          borderWidth: {
            base: '1px',
          },
      },
        fontFamily: {
          pthin: ["Poppins-Thin", "sans-serif"],
          pextralight: ["Poppins-ExtraLight", "sans-serif"],
          plight: ["Poppins-Light", "sans-serif"],
          pregular: ["Poppins-Regular", "sans-serif"],
          pmedium: ["Poppins-Medium", "sans-serif"],
          psemibold: ["Poppins-SemiBold", "sans-serif"],
          pbold: ["Poppins-Bold", "sans-serif"],
          pextrabold: ["Poppins-ExtraBold", "sans-serif"],
          pblack: ["Poppins-Black", "sans-serif"],
        },
      },
    },
    plugins: [],
  };