import { Callout, Card, Grid, List, Stack, Text } from '@/components';
import { results } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §19 Results & lessons learned — what it became, what it taught
 * (Sprint 07 §19).
 *
 * Outcomes and product maturity stated in terms the sources support, plus the
 * honest learnings. The through-line is the engineer's own growth. Closes on
 * the BLOCKER: any quantitative metric marked Content Required stays qualitative
 * rather than fabricated (C6).
 */
export function Results() {
  return (
    <CaseStudySection
      id="results"
      index="16"
      kicker="Results & lessons learned"
      title="What it became, what it taught."
      lead="Outcomes and maturity, stated honestly — and the lessons that outlast the code."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="signal" as="h3">
              Outcomes & maturity
            </Text>
            <List>
              {results.outcomes.map((item) => (
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
            <Text variant="label" tone="signal" as="h3">
              Lessons
            </Text>
            <List>
              {results.lessons.map((item) => (
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
      <Callout title="No fabricated numbers">{results.note}</Callout>
    </CaseStudySection>
  );
}
