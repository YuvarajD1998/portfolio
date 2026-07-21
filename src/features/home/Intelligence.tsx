import {
  Card,
  Container,
  Grid,
  Heading,
  Section,
  Stack,
  Stagger,
  StaggerItem,
  Text,
} from '@/components';
import { intelligence } from '@/content/home';

import { SectionIntro } from './SectionIntro';

/**
 * Intelligence — AI as engineered judgement (Sprint 04 §04 teaser; P03 §05).
 *
 * The four-stage pipeline (parse → embed → rank → explain) shown as an ordered
 * set of stage cards. A teaser of the mechanism; the live re-rank demo belongs
 * to the case study, so nothing here auto-plays or fetches.
 *
 * A11y:  A semantic ordered list conveys sequence; step numbers are visible
 *        and not the only cue (each stage carries a label + detail). Section
 *        labelled by its heading.
 */
export function Intelligence() {
  return (
    <Section spacing="sm" aria-labelledby="intelligence-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="intelligence-heading"
            eyebrow={intelligence.eyebrow}
            title={intelligence.title}
            lead={intelligence.lead}
          />
          <Stagger>
            <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={6}>
              {intelligence.stages.map((stage) => (
                <StaggerItem key={stage.step}>
                  <Card padding="md" className="h-full">
                    <Stack gap={3}>
                      <Text
                        variant="label"
                        tone="signal"
                        as="span"
                        className="font-mono"
                      >
                        {stage.step}
                      </Text>
                      <Heading as="h3" size="h3">
                        {stage.label}
                      </Heading>
                      <Text variant="small" tone="graphite">
                        {stage.detail}
                      </Text>
                    </Stack>
                  </Card>
                </StaggerItem>
              ))}
            </Grid>
          </Stagger>
        </Stack>
      </Container>
    </Section>
  );
}
