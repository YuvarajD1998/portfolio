'use client';

import { RouteError } from '@/layouts/RouteError';

/**
 * Projects segment error boundary (Sprint 03 §12).
 *
 * Isolates failures in the projects segment (including dynamic `[slug]` and
 * case-study children) so a broken project does not take down the whole app —
 * the shell and the rest of the site stay navigable.
 */
export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="This project couldn’t load"
      description="Something went wrong loading this project. Try again, or head back to all projects."
    />
  );
}
