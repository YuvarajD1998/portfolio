import {
  Container,
  FeatureCard,
  Quote,
  Reveal,
  Section,
  Stack,
  Stagger,
  StaggerItem,
} from '@/components';
import { philosophy } from '@/content/about';

import { SectionIntro } from './SectionIntro';

/**
 * Engineering philosophy — how the work gets made (Sprint 05 §05; P07/P08).
 *
 * Purpose:      Communicate how the engineer thinks about the craft. P07 §04
 *               frames philosophy as "a position, not a list", so the section
 *               leads with one quotable position, then supports it with the
 *               principle set — the four already frozen on the homepage plus the
 *               remaining approved facets, all in the same voice.
 * A11y:         The position renders as a real <blockquote> (typography/Quote);
 *               each principle is a FeatureCard with its own <h3>. Section
 *               labelled by its heading. Readability governs — measured widths,
 *               generous rhythm, no wall of text (Sprint 05 §05 note).
 * Composition:  Section → Container → intro + Quote + Stagger(FeatureCard grid).
 */
export function Philosophy() {
  return (
    <Section aria-labelledby="philosophy-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="philosophy-heading"
            eyebrow={philosophy.eyebrow}
            title={philosophy.title}
          />

          <Reveal>
            <Quote className="max-w-[40ch]">{philosophy.position}</Quote>
          </Reveal>

          <Stagger>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {philosophy.principles.map((principle) => (
                <StaggerItem key={principle.title} className="h-full">
                  <FeatureCard title={principle.title} className="h-full">
                    {principle.body}
                  </FeatureCard>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Stack>
      </Container>
    </Section>
  );
}
