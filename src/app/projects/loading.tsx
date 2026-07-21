import { Skeleton } from '@/components/feedback';
import { Container, Section, Stack } from '@/components/layout';

/**
 * Projects loading UI (Sprint 03 §02, §11).
 *
 * A route-level skeleton for the projects segment — including its dynamic
 * `[slug]` and case-study children. Mirrors the template's header + content
 * shape in Sunken blocks; renders inside the shell so header, footer and theme
 * stay intact (S03 §12 RULE). Marked aria-hidden with a polite status.
 */
export default function ProjectsLoading() {
  return (
    <Section aria-hidden>
      <Container>
        <Stack gap={12}>
          <Stack gap={4}>
            <Skeleton variant="text" width="6rem" />
            <Skeleton variant="rect" height="3rem" width="60%" />
            <Skeleton variant="text" width="80%" />
          </Stack>
          <Stack gap={6}>
            <Skeleton variant="rect" height="10rem" />
            <Skeleton variant="rect" height="10rem" />
          </Stack>
        </Stack>
        <span className="sr-only" role="status">
          Loading
        </span>
      </Container>
    </Section>
  );
}
