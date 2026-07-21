import {
  Container,
  FeatureCard,
  Grid,
  Section,
  Stack,
  Stagger,
  StaggerItem,
} from '@/components';
import { philosophy } from '@/content/home';

import { SectionIntro } from './SectionIntro';

/**
 * Engineering philosophy — capability as principles (Sprint 04 §05; P03 §06).
 *
 * How the work gets made, stated as defaults not slogans. Readability governs:
 * a measured intro and four principle cards, generous rhythm, no wall of text
 * (Sprint 04 §05 note).
 *
 * A11y:  Each principle is a FeatureCard with an <h3> title; section labelled
 *        by its heading.
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
            lead={philosophy.lead}
          />
          <Stagger>
            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              {philosophy.principles.map((principle) => (
                <StaggerItem key={principle.title}>
                  <FeatureCard title={principle.title}>
                    {principle.body}
                  </FeatureCard>
                </StaggerItem>
              ))}
            </Grid>
          </Stagger>
        </Stack>
      </Container>
    </Section>
  );
}
