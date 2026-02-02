import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: '#0a0a0f',
          surface: '#12121a',
          primary: '#00f0ff',
          secondary: '#7000ff',
          accent: '#ff006e',
          success: '#00ff9f',
          warning: '#ffb800',
        },
      },
      boxShadow: {
        'glow': '0 0 40px rgba(0, 240, 255, 0.15)',
        'glow-hover': '0 0 60px rgba(0, 240, 255, 0.25)',
        'purple-glow': '0 0 30px rgba(112, 0, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;