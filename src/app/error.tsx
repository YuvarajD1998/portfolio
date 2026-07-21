'use client';

import { RouteError } from '@/layouts/RouteError';

/**
 * Root route error boundary (Sprint 03 §12).
 *
 * Catches render errors in a route segment and offers a retry, rendered inside
 * the shell via the shared RouteError body so header, footer and theme stay
 * intact. Real error reporting (Sentry, prod-only) is wired later (Blueprint §18).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <RouteError error={error} reset={reset} />;
}
