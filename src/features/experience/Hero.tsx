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
import { overview } from '@/content/experience';

/**
 * Experience hero — frame the professional, state the arc (Sprint 09 §03).
 *
 * Purpose:      Set the frame — four-plus years, front-end specialist to
 *               full-stack engineer — and hand the reader into the timeline. Page
 *               title (the single <h1>), the through-line positioning, an
 *               introduction, a professional summary, and the frozen positioning
 *               chips (S09 §03). The summary states the through-line confidently
 *               but honestly: no overstated seniority, no unverifiable scale
 *               claim, no buzzwords (S09 §03 RULE, P10A tone).
 * Public API:   No props — reads frozen copy from `@/content/experience`.
 * A11y:         Holds the page's single <h1> (S09 §03 RULE); the enclosing
 *               <section> is labelled by that heading's id. Chips are a labelled
 *               list.
 * Responsive:   Single measure-width column; chips wrap; no layout shift.
 * Composition:  Section → Container → Reveal → Eyebrow + h1 + positioning +
 *               intro + summary + chips. No company logos ship — that asset is
 *               content-blocker C7 (the hero is text-only).
 */
export function Hero() {
  return (
    <Section spacing="lg" aria-labelledby="experience-heading">
      <Container>
        <Reveal>
          <Stack gap={6} className="max-w-[46ch]">
            <Eyebrow as="p">{overview.eyebrow}</Eyebrow>
            <Stack gap={3}>
              <Heading as="h1" size="display" id="experience-heading">
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
              aria-label="Career positioning"
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
