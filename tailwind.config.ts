import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#582B0C",
        secondary: "#3E5902",
        tertiary: "#8C8C8C",
        background: "#F2F2F2",
      },
    },
  },
  plugins: [
    nextui(),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
  ],
};
export default config;
