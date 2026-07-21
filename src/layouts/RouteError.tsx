'use client';

import { useEffect } from 'react';

import { ErrorState } from '@/components/feedback';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';

/**
 * RouteError — the shared route error boundary body (Sprint 03 §12).
 *
 * The one place the failure surface is defined, built on the Sprint 02
 * ErrorState so every route degrades the same way, inside the shell (header,
 * footer and theme intact — S03 §12 RULE). Route `error.tsx` files are thin
 * wrappers that pass Next.js's `error`/`reset` here. In-voice copy: what
 * happened + the way out, no blame (Bible §02).
 */
export function RouteError({
  error,
  reset,
  title = 'Something went wrong',
  description = 'An unexpected error interrupted this page. Try again — if it persists, the issue is on our side.',
}: {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
}) {
  useEffect(() => {
    // Surfaced to the console for now; real error tracking arrives later
    // (Blueprint §18).
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container width="measure">
        <ErrorState
          title={title}
          description={description}
          action={
            <Button variant="secondary" onClick={reset}>
              Try again
            </Button>
          }
        />
      </Container>
    </Section>
  );
}
