import {
  Container,
  FeatureCard,
  Section,
  Stack,
  Stagger,
  StaggerItem,
} from '@/components';
import { product } from '@/content/about';

import { SectionIntro } from './SectionIntro';

/**
 * Product thinking — engineering in service of users (Sprint 05 §06).
 *
 * Purpose:      Show that this engineer weighs users and business alongside
 *               code. Each point is a concrete stance grounded in the real
 *               recruitment-workflow work, not a platitude (Sprint 05 §06 RULE).
 * A11y:         Each point is a FeatureCard with its own <h3>; section labelled
 *               by its heading.
 * Composition:  Section → Container → intro + Stagger(FeatureCard grid).
 */
export function ProductThinking() {
  return (
    <Section spacing="sm" aria-labelledby="product-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="product-heading"
            eyebrow={product.eyebrow}
            title={product.title}
            lead={product.lead}
          />
          <Stagger>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.points.map((point) => (
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
