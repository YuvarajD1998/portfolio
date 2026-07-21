import { Card, Flex, Grid, Stack, Text } from '@/components';
import { featureHonesty, features } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';
import { StatusBadge } from '@/features/transpahire/StatusBadge';

/**
 * §06 Solution overview & core features — what the product actually does
 * (Sprint 07 §06).
 *
 * Feature cards, each carrying its Product-Book status glyph. Two facts survive
 * verbatim rather than being smoothed over: Job.qualityScore is Partial (a
 * column with no scorer) and the Revenue tab is a Planned stub. No mocked-up
 * screenshot stands in for a feature that does not exist (C5) — text-only cards
 * at true status.
 */
export function Features() {
  return (
    <CaseStudySection
      id="solution"
      index="04"
      kicker="Solution overview & core features"
      title="What the product actually does."
      lead="Approved features at their true status — nothing invented, nothing rounded up."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {features.map((feature) => (
          <Card key={feature.title}>
            <Stack gap={2}>
              <Flex justify="between" align="center" gap={3}>
                <Text as="h3" className="text-h3 leading-snug font-semibold">
                  {feature.title}
                </Text>
                <StatusBadge status={feature.status} />
              </Flex>
              <Text variant="small">{feature.body}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>

      <Stack gap={3}>
        <Text variant="label" tone="mute" as="h3">
          Named honestly, not smoothed over
        </Text>
        <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
          {featureHonesty.map((item) => (
            <Card key={item.subject} level="sunken">
              <Stack gap={2}>
                <Flex justify="between" align="center" gap={3}>
                  <Text as="h4" className="text-small font-mono font-semibold">
                    {item.subject}
                  </Text>
                  <StatusBadge status={item.status} />
                </Flex>
                <Text variant="small">{item.body}</Text>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Stack>
    </CaseStudySection>
  );
}
