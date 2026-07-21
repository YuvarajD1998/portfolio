import {
  Container,
  Eyebrow,
  Heading,
  Reveal,
  Section,
  Stack,
  Subheading,
} from '@/components';
import { hero } from '@/content/projects';

/**
 * Projects hero & introduction — name the collection, then step aside
 * (Sprint 06 §03; P07/P08).
 *
 * Purpose:      Orient the visitor and hand them straight to the featured band.
 *               A light touch, not a second homepage.
 * Public API:   No props — reads all copy from `@/content/projects`.
 * A11y:         Holds the page's single <h1> (S06 §03 RULE); the enclosing
 *               <section> is labelled by that heading's id.
 * Responsive:   Single measure-width column at every width; no layout shift.
 * Composition:  Section → Container → Reveal → Eyebrow + h1 + lead.
 */
export function Hero() {
  return (
    <Section spacing="lg" aria-labelledby="projects-heading">
      <Container>
        <Reveal>
          <Stack gap={5} className="max-w-[42ch]">
            <Eyebrow as="p">{hero.eyebrow}</Eyebrow>
            <Heading as="h1" size="h1" id="projects-heading">
              {hero.title}
            </Heading>
            <Subheading>{hero.lead}</Subheading>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
