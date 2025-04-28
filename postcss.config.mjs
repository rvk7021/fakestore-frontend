const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      animation: {
        'delay-150': 'spin 1s linear infinite -150ms',
      },
    },
  },
};

export default config;
