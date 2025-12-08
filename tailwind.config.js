/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    // Set SF Pro Display Regular as default
    fontFamily: {
      sans: ["Poppins-Regular", "sans-serif"],
      serif: ["Georgia", "serif"],
      rounded: ["Poppins-Regular", "sans-serif"],
      mono: ["SFMono-Regular", "monospace"],
    },
    extend: {
      colors: {
        primary: {
          // colorname:FUSCHIA
          //CTAs
          //Focused/Active states
          400: "#ED4B9E",
          300: "#F278B6",
          200: "#F6A5CF",
          100: "#FAD2E6",
        },
        secondary: {
          // colorname: IRIS
          // Links
          400: "#4B4DED  ",
          300: "#787AF2",
          200: "#A5A6F6",
          100: "#EFEFFD",
        },
        tertiary: {
          // colorname: PEACH
          // Accenting Illustrations
          400: "#F3D9DA",
          300: "#F6E3E3",
          200: "#F9ECED",
          100: "#FCF5F5",
        },
        // colorname: ONYX
        // Overlays, Shadows, Headings
        dark: "#272742",
        //colorname: EVERGREEN
        //Valid fields, Success messages
        success: {
          400: "#1ABB68",
          300: "#64DC88",
          200: "#98E8B3",
          100: "#DEFFDD",
        },
        danger: {
          // Valid fields
          // Danger messages
          400: "#F11B1E",
          300: "#DD2C2F",
          200: "#F3B0B1",
          100: "#FFEAEB",
        },
        //colorname: SLATE
        // Body Text
        textcolor: "#5C5C77",
        //colorname: LIGHT SLATE
        //Helper text
        //Deemphasized text
        subtext: "#9898AB",
        //colorname: DORIAN
        //Accent color
        //Hairlines
        //Subtle backgrounds
        accent: "#EEF2F5",
        //colorname: CLOUD
        //Light mode backgrounds
        //Light mode Dialogs/alerts
        light: "#FAFCFE",
      },
      fontSize: {
        displaylarge: [
          "57px",
          { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        displaymedium: [
          "52px",
          { lineHeight: "45px", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        displaysmall: ["36px", { lineHeight: "44px", fontWeight: "400" }],
        headlinelarge: ["32px", { lineHeight: "40px", fontWeight: "400" }],
        headlinemedium: ["28px", { lineHeight: "32px", fontWeight: "400" }],
        headlinesmall: ["24px", { lineHeight: "32px", fontWeight: "400" }],
        titlelarge: ["22px", { lineHeight: "28px", fontWeight: "500" }],
        titlemedium: ["16px", { lineHeight: "24px", fontWeight: "500" }],
        titlesmall: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        labellarge: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        labelmedium: ["12px", { lineHeight: "14px", fontWeight: "500" }],
        labelsmall: ["11px", { lineHeight: "12px", fontWeight: "500" }],
        bodylarge: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        bodymedium: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        bodysmall: ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".font-thin": { fontFamily: "Poppins-Thin" },
        ".font-extralight": { fontFamily: "Poppins-ExtraLight" },
        ".font-light": { fontFamily: "Poppins-Light" },
        ".font-normal": { fontFamily: "Poppins-Regular" },
        ".font-medium": { fontFamily: "Poppins-Medium" },
        ".font-semibold": { fontFamily: "Poppins-SemiBold" },
        ".font-bold": { fontFamily: "Poppins-Bold" },
        ".font-extrabold": { fontFamily: "Poppins-ExtraBold" },
        ".font-black": { fontFamily: "Poppins-Black" },
      });
    },
  ],
};
