import { Card, Grid, Stack, Text, Timeline } from '@/components';
import { journeys } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §08 User journey — from upload to offer, both sides (Sprint 07 §08).
 *
 * The candidate path and the recruiter path as ordered timelines, tracing the
 * real state machines (12-state job lifecycle, 8-state application pipeline).
 * Each step is a text list item — reachable without motion or hover (S07 §08
 * RULE): the Timeline renders as an accessible ordered list.
 */
export function UserJourney() {
  const sides = [journeys.candidate, journeys.recruiter];
  return (
    <CaseStudySection
      id="journey"
      index="06"
      kicker="User journey"
      title="From upload to offer, both sides."
      lead="A concrete story of how a real match happens — grounding the abstract architecture that follows."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        {sides.map((side) => (
          <Card key={side.label}>
            <Stack gap={4}>
              <Text variant="label" tone="signal" as="h3">
                {side.label}
              </Text>
              <Timeline>
                {side.steps.map((step, i) => (
                  <Timeline.Item
                    key={step}
                    time={`Step ${i + 1}`}
                    title={step}
                  />
                ))}
              </Timeline>
            </Stack>
          </Card>
        ))}
      </Grid>
    </CaseStudySection>
  );
}
