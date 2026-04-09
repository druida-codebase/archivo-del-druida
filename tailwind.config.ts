import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0f110c',
        'bg-surface': '#1c1f18',
        'accent': '#c5a059',
        'accent-soft': '#8e916d',
        'border-subtle': '#2d3128',
        'primary-text': '#f1f1f1',
        'secondary-text': '#a0a08b',
      },
    },
  },
  plugins: [],
};
export default config;