import {
  Container,
  FeatureCard,
  Section,
  Stack,
  Stagger,
  StaggerItem,
} from '@/components';
import { values } from '@/content/about';

import { SectionIntro } from './SectionIntro';

/**
 * Core values — what holds under pressure (Sprint 05 §07; P07/P08).
 *
 * Purpose:      Present the professional values through the shared design system
 *               (reusing the S02 FeatureCard, not an About-only variant), each a
 *               short statement tied to how the work happens — never a generic
 *               virtue (Sprint 05 §07 RULE; P07 §04).
 * A11y:         Each value is a FeatureCard with its own <h3>; section labelled
 *               by its heading.
 * Composition:  Section → Container → intro + Stagger(FeatureCard grid).
 */
export function CoreValues() {
  return (
    <Section spacing="sm" aria-labelledby="values-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="values-heading"
            eyebrow={values.eyebrow}
            title={values.title}
          />
          <Stagger>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.items.map((value) => (
                <StaggerItem key={value.title} className="h-full">
                  <FeatureCard title={value.title} className="h-full">
                    {value.body}
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
