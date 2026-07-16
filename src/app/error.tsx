'use client';

import { useEffect } from 'react';

import {
  Container,
  Heading,
  Section,
  Stack,
  Text,
} from '@/components/primitives';

/**
 * Route error boundary placeholder (Sprint 01 §06).
 *
 * Catches render errors in a route segment and offers a retry. In-voice
 * (Bible §02 error copy: what happened + the way out, no blame). Real error
 * reporting (Sentry, prod-only) is wired in a later sprint (Blueprint §18).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced to the console in Sprint 01; replaced by error tracking later.
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container width="measure">
        <Stack gap={4}>
          <Text variant="label" tone="mute" as="p">
            Error
          </Text>
          <Heading as="h1" size="h2">
            Something went wrong
          </Heading>
          <Text variant="body" tone="graphite">
            An unexpected error interrupted this page. Try again — if it
            persists, the issue is on our side.
          </Text>
          <button
            type="button"
            onClick={reset}
            className="border-ink text-ink hover:bg-ink hover:text-paper text-button w-fit rounded-sm border px-4 py-2 font-sans font-semibold transition-colors duration-[var(--dur-instant)]"
          >
            Try again
          </button>
        </Stack>
      </Container>
    </Section>
  );
}
