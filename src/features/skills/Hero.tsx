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
import { overview } from '@/content/skills';

/**
 * Skills hero — frame the range, then prove it (Sprint 10 §03).
 *
 * Purpose:      Frame the technical range — full-stack across React/TypeScript
 *               frontends and NestJS/FastAPI backends, with AI and real-time
 *               work — and hand the reader into core expertise (S10 §03). Page
 *               title (the single <h1>), the positioning line, an introduction,
 *               a technical overview, and the frozen positioning chips. The
 *               overview states range without overstating seniority: no invented
 *               technology, no "expert in everything", no buzzword stacking (S10
 *               §03 RULE, P10A tone).
 * Public API:   No props — reads frozen copy from `@/content/skills`.
 * A11y:         Holds the page's single <h1> (S10 §03 RULE); the enclosing
 *               <section> is labelled by that heading's id. Chips are a labelled
 *               list; icons never carry meaning alone.
 * Responsive:   Single measure-width column; chips wrap; no layout shift.
 * Composition:  Section → Container → Reveal → Eyebrow + h1 + positioning +
 *               intro + summary + chips. Text-only — no logo wall (S10 §05).
 */
export function Hero() {
  return (
    <Section spacing="lg" aria-labelledby="skills-heading">
      <Container>
        <Reveal>
          <Stack gap={6} className="max-w-[46ch]">
            <Eyebrow as="p">{overview.eyebrow}</Eyebrow>
            <Stack gap={3}>
              <Heading as="h1" size="display" id="skills-heading">
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
            <Eyebrow as="h2">Positioning</Eyebrow>
            <ul
              className="flex flex-wrap gap-2"
              aria-label="Technical positioning"
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
