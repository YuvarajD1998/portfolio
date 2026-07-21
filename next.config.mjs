import nextBundleAnalyzer from '@next/bundle-analyzer';

/**
 * Next.js configuration — Datum portfolio.
 *
 * Static-first: every route is content-frozen and prerendered (§09). This file
 * carries the framework-level performance tuning audited in Sprint 16 — image
 * formats, package-import optimisation and the bundle analyser — and nothing
 * that alters an approved design decision (S16 §09, §13).
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
  experimental: {
    // Rewrite barrel imports to per-module paths so only the icons/primitives
    // actually used are bundled — keeps the client boundary lean (S16 §03).
    // lucide-react is optimised by Next's defaults; the Radix packages and the
    // motion library are named explicitly so their tree-shaking is guaranteed.
    optimizePackageImports: [
      'lucide-react',
      'motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tooltip',
    ],
  },
};

const withBundleAnalyzer = nextBundleAnalyzer({
  // Opt-in: `ANALYZE=true pnpm build` writes the treemap under .next/analyze
  // (S16 §13). Off by default so ordinary builds stay fast and side-effect-free.
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);

import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev());
