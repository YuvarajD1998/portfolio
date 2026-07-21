import { Callout, Card, Grid, List, Stack, Text } from '@/components';
import { designProcess } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §07 UX & design process — product thinking, not just UI (Sprint 07 §07).
 *
 * The design decisions that made the complexity usable, framed as trade-offs
 * rather than features. Closes on the template-lineage NOTE: this describes
 * Transpahire's design reasoning, distinct from the Datum portfolio's own
 * design system (research & wireframe narrative slots are C3).
 */
export function DesignProcess() {
  return (
    <CaseStudySection
      id="design"
      index="05"
      kicker="UX & design process"
      title="Product thinking, not just UI."
      lead="How the product was reasoned into shape — the decisions that made the complexity usable."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              Design decisions
            </Text>
            <List>
              {designProcess.decisions.map((item) => (
                <li key={item}>
                  <Text as="span" variant="small">
                    {item}
                  </Text>
                </li>
              ))}
            </List>
          </Stack>
        </Card>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              Ensures
            </Text>
            <List>
              {designProcess.ensures.map((item) => (
                <li key={item}>
                  <Text as="span" variant="small">
                    {item}
                  </Text>
                </li>
              ))}
            </List>
          </Stack>
        </Card>
      </Grid>
      <Callout title="Whose design system">{designProcess.note}</Callout>
    </CaseStudySection>
  );
}
