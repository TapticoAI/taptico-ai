import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#030303',
          text: '#f8f8f8',
          gray: '#9e9e9e',
          dim: '#666',
          blue: '#155dfc',
          lightblue: '#50a2ff',
          card: '#0b0b0b',
          border: '#1a1a1a',
          borderlight: '#282828',
        },
      },
    },
  },
  plugins: [],
};
export default config;
