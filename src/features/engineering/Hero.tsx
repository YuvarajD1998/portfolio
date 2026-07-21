import {
  Badge,
  Container,
  Eyebrow,
  Heading,
  Reveal,
  Section,
  Stack,
  Subheading,
  Text,
} from '@/components';
import { overview } from '@/content/engineering';

/**
 * Engineering overview — frame the engineer, invite the read (Sprint 08 §03).
 *
 * Purpose:      Set the frame — a senior frontend / full-stack engineer with 4+
 *               years who owns production systems end to end — and hand the
 *               reader into the philosophy. Page title (the single <h1>), the
 *               through-line positioning, an introduction, an engineering
 *               summary, and the frozen positioning chips (S08 §03).
 * Public API:   No props — reads frozen copy from `@/content/engineering`.
 * A11y:         Holds the page's single <h1> (S08 §03 RULE); the enclosing
 *               <section> is labelled by that heading's id. Chips are a labelled
 *               list. No overstated seniority or unverifiable scale claim.
 * Responsive:   Single measure-width column; chips wrap; no layout shift.
 * Composition:  Section → Container → Reveal → Eyebrow + h1 + positioning +
 *               intro + summary + chips. No supporting visual ships — that asset
 *               is content-blocker C6 (overview is text-only until one is
 *               approved).
 */
export function Hero() {
  return (
    <Section spacing="lg" aria-labelledby="engineering-heading">
      <Container>
        <Reveal>
          <Stack gap={6} className="max-w-[46ch]">
            <Eyebrow as="p">{overview.eyebrow}</Eyebrow>
            <Stack gap={3}>
              <Heading as="h1" size="display" id="engineering-heading">
                {overview.title}
              </Heading>
              <Eyebrow as="p" className="text-signal">
                {overview.positioning}
              </Eyebrow>
            </Stack>
            <Subheading>{overview.intro}</Subheading>
            <Text tone="graphite" className="max-w-[46ch] leading-[1.6]">
              {overview.summary}
            </Text>
          </Stack>
        </Reveal>
        <Reveal delay={0.05}>
          <Stack gap={3} className="mt-10">
            <Eyebrow as="p">Positioning</Eyebrow>
            <ul
              className="flex flex-wrap gap-2"
              aria-label="Engineering positioning"
            >
              {overview.chips.map((chip) => (
                <li key={chip}>
                  <Badge tone="neutral">{chip}</Badge>
                </li>
              ))}
            </ul>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
