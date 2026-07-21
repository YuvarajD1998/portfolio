import {
  Container,
  FeatureCard,
  Section,
  Stack,
  Stagger,
  StaggerItem,
} from '@/components';
import { workingStyle } from '@/content/about';

import { SectionIntro } from './SectionIntro';

/**
 * Working style — how the work happens with others (Sprint 05 §08).
 *
 * Purpose:      Explain how this engineer collaborates, communicates, reviews
 *               code and owns delivery — through reusable S02 components, no
 *               bespoke layout. Claims stay at the level the frozen sources
 *               support; lead/mentoring scope is never inflated (Sprint 05 §08
 *               RULE).
 * A11y:         Each point is a FeatureCard with its own <h3>; section labelled
 *               by its heading.
 * Composition:  Section → Container → intro + Stagger(FeatureCard grid).
 */
export function WorkingStyle() {
  return (
    <Section spacing="sm" aria-labelledby="working-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="working-heading"
            eyebrow={workingStyle.eyebrow}
            title={workingStyle.title}
            lead={workingStyle.lead}
          />
          <Stagger>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workingStyle.points.map((point) => (
                <StaggerItem key={point.title} className="h-full">
                  <FeatureCard title={point.title} className="h-full">
                    {point.body}
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
