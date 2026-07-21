import { Container, Heading, Link, Section, Stack, Text } from '@/components';

/**
 * 404 — branded not-found placeholder (Sprint 01 §06, Blueprint §09).
 *
 * Restrained, in-voice, and a clear way back. No illustration (Bible §13
 * empty-state rule: one line + one action).
 */
export default function NotFound() {
  return (
    <Section>
      <Container width="measure">
        <Stack gap={4}>
          <Text variant="label" tone="mute" as="p">
            Error · 404
          </Text>
          <Heading as="h1" size="h2">
            That page doesn&rsquo;t exist
          </Heading>
          <Text variant="body" tone="graphite">
            The address may be mistyped, or the page has moved.
          </Text>
          <Link href="/" variant="inline">
            Back to the start &rarr;
          </Link>
        </Stack>
      </Container>
    </Section>
  );
}
