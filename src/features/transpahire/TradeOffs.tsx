import { Card, Grid, Stack, Text } from '@/components';
import { tradeOffs } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §18 Engineering challenges & trade-offs — the hard choices, named plainly
 * (Sprint 07 §18).
 *
 * The section that most demonstrates engineering judgment: every entry a
 * specific, documented decision with its reasoning AND its cost. No decision is
 * presented as free; the dead CASL factory and deleted endpoint are named as
 * real history, matching the book's "deprecated code named plainly" rule.
 */
export function TradeOffs() {
  return (
    <CaseStudySection
      id="tradeoffs"
      index="15"
      kicker="Challenges & trade-offs"
      title="The hard choices, named plainly."
      lead="Every entry is a specific decision with both sides stated — the choice and what it cost."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {tradeOffs.map((item) => (
          <Card key={item.title}>
            <Stack gap={2}>
              <Text as="h3" className="text-body leading-snug font-semibold">
                {item.title}
              </Text>
              <Text variant="small">{item.body}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </CaseStudySection>
  );
}
