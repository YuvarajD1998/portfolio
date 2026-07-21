import { Container, Section, Stack } from '@/components';

/**
 * Loading placeholder (Sprint 01 §06).
 *
 * A route-level skeleton that mirrors the foundation layout in Sunken blocks
 * with a gentle shimmer (Bible §09 Skeleton). Never a full-page spinner.
 * Marked aria-hidden with a polite status for assistive tech.
 */
export default function Loading() {
  return (
    <Section aria-hidden>
      <Container width="measure">
        <Stack gap={6}>
          <div className="bg-sunken h-3 w-32 animate-pulse rounded-sm" />
          <div className="bg-sunken h-10 w-3/4 animate-pulse rounded-sm" />
          <div className="border-hairline border-t" />
          <div className="bg-sunken h-24 w-full animate-pulse rounded-sm" />
        </Stack>
        <span className="sr-only" role="status">
          Loading
        </span>
      </Container>
    </Section>
  );
}
