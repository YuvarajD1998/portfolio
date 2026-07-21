import { Callout, Card, Grid, List, Stack, Text } from '@/components';
import { scalabilitySecurity } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §17 Scalability, performance & security — built to hold, built to degrade
 * well (Sprint 07 §17).
 *
 * The choices that let the product scale reads, keep AI cost visible, and
 * protect candidate data — as engineering judgment, not generic reassurances.
 * Closes on the RULE that these are Transpahire's product metrics, distinct
 * from the Datum page's own a11y/perf/SEO obligations; no invented SLAs.
 */
const COLUMNS = [
  { heading: 'Scalability', key: 'scalability' as const },
  { heading: 'Performance', key: 'performance' as const },
  { heading: 'Security & privacy', key: 'security' as const },
];

export function ScalabilitySecurity() {
  return (
    <CaseStudySection
      id="scale"
      index="14"
      kicker="Scalability, performance & security"
      title="Built to hold, built to degrade well."
      lead="How the product scales reads, keeps AI cost visible, and protects candidate data."
    >
      <Grid cols={{ base: 1, md: 3, lg: 3 }} gap={4}>
        {COLUMNS.map((col) => (
          <Card key={col.heading}>
            <Stack gap={3}>
              <Text variant="label" tone="mute" as="h3">
                {col.heading}
              </Text>
              <List>
                {scalabilitySecurity[col.key].map((item) => (
                  <li key={item}>
                    <Text as="span" variant="small">
                      {item}
                    </Text>
                  </li>
                ))}
              </List>
            </Stack>
          </Card>
        ))}
      </Grid>
      <Callout title="Product metrics, not page metrics">
        {scalabilitySecurity.note}
      </Callout>
    </CaseStudySection>
  );
}
