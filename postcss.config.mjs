/**
 * PostCSS configuration — Tailwind CSS v4.
 *
 * Tailwind v4 ships its own PostCSS plugin; no autoprefixer or nesting plugin
 * is required (both are built in).
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
