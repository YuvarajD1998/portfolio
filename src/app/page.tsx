import {
  Container,
  Divider,
  Heading,
  Section,
  Stack,
  Text,
} from '@/components/primitives';

/**
 * Foundation placeholder (Sprint 01).
 *
 * NOT a portfolio page. Sprint 01 ships zero features; the App Router still
 * needs a root route so the shell can render and the Definition of Done — "a
 * blank page renders in both themes" — is observable. This route states, in
 * plain terms, that the foundation is in place and the first real page arrives
 * in a later sprint. It is replaced wholesale by the Homepage sprint (S04).
 */
export default function FoundationPage() {
  return (
    <Section>
      <Container width="measure">
        <Stack gap={6}>
          <Text variant="label" tone="mute" as="p">
            Datum v1.0 · Sprint 01
          </Text>
          <Heading as="h1" size="h1">
            Project foundation
          </Heading>
          <Divider />
          <Text variant="body" tone="graphite">
            The engineering foundation is in place — architecture, tokens,
            theme, shell, primitives and standards. No portfolio page has been
            built yet. Feature work begins in the next sprint.
          </Text>
        </Stack>
      </Container>
    </Section>
  );
}
