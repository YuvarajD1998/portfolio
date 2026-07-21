import { Container, Heading, Link, Section, Stack, Text } from '@/components';
import { routes } from '@/config/navigation';

/**
 * Project not-found (Sprint 03 §12).
 *
 * Rendered when a `/projects/[slug]` slug has no case study. A segment-scoped
 * boundary so the 404 lands with the right status and in-voice copy, offering a
 * way back to all projects. Real studies are added in a later sprint.
 */
export default function ProjectNotFound() {
  return (
    <Section>
      <Container width="measure">
        <Stack gap={4}>
          <Text variant="label" tone="mute" as="p">
            Error · 404
          </Text>
          <Heading as="h1" size="h2">
            That project doesn&rsquo;t exist
          </Heading>
          <Text variant="body" tone="graphite">
            No case study lives at this address — it may be mistyped, or not
            published yet.
          </Text>
          <Link href={routes.projects.href} variant="inline">
            Back to all projects &rarr;
          </Link>
        </Stack>
      </Container>
    </Section>
  );
}
