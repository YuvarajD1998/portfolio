/**
 * Next.js configuration — Datum portfolio.
 *
 * Foundation-only: no page-level rewrites or feature config lives here yet.
 * Later sprints add redirects for legacy paths (blueprint §09) and image
 * remote patterns as real assets arrive.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fail the build on any type or lint error — the sprint closes with zero
  // warnings or errors (Sprint 01 §12, Definition of Done).
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    // Modern formats first — protects LCP/CLS (Design Bible §12).
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
