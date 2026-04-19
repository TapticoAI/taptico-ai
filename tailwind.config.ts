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
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#0A0A0A',
          white: '#FFFFFF',
          navy: '#0D2B6B',
          // Utility tones derived from the core palette
          bg: '#0A0A0A',
          text: '#FFFFFF',
          surface: '#111111',
          border: '#1F2A44',
          muted: '#8A93A6',
          accent: '#0D2B6B',
          accentHover: '#12378a',
        },
      },
    },
  },
  plugins: [],
};
export default config;
