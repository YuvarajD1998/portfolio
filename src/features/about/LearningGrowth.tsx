import {
  Container,
  FeatureCard,
  Section,
  Stack,
  Stagger,
  StaggerItem,
} from '@/components';
import { learning } from '@/content/about';

import { SectionIntro } from './SectionIntro';

/**
 * Learning & growth — staying sharp on purpose (Sprint 05 §09).
 *
 * Purpose:      Read as how the engineer keeps learning and where the craft is
 *               heading — a point of view, not a second résumé. No cert dumps or
 *               course lists; the full credentials live on Resume (Sprint 05 §09
 *               RULE).
 * A11y:         Each point is a FeatureCard with its own <h3>; section labelled
 *               by its heading.
 * Composition:  Section → Container → intro + Stagger(FeatureCard grid).
 */
export function LearningGrowth() {
  return (
    <Section spacing="sm" aria-labelledby="learning-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="learning-heading"
            eyebrow={learning.eyebrow}
            title={learning.title}
            lead={learning.lead}
          />
          <Stagger>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {learning.points.map((point) => (
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
