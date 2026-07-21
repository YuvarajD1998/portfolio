import {
  Container,
  FeatureCard,
  Grid,
  Section,
  Stack,
  Stagger,
  StaggerItem,
} from '@/components';
import { platform } from '@/content/home';

import { SectionIntro } from './SectionIntro';

/**
 * Platform — three portals, one system (Sprint 04 §04 teaser; P03 §03).
 *
 * Shows breadth of ownership — Recruiter, Candidate, Admin — as a triptych of
 * feature cards. A high-level hint at the product surface, not the product;
 * each portal's depth lives in the case study.
 *
 * A11y:  Labelled section; cards are non-interactive here (they describe, they
 *        don't link) so no keyboard target is implied.
 */
export function Platform() {
  return (
    <Section spacing="sm" aria-labelledby="platform-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="platform-heading"
            eyebrow={platform.eyebrow}
            title={platform.title}
            lead={platform.lead}
          />
          <Stagger>
            <Grid cols={{ base: 1, md: 3 }} gap={6}>
              {platform.portals.map((portal) => (
                <StaggerItem key={portal.name}>
                  <FeatureCard title={portal.name}>
                    {portal.description}
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
