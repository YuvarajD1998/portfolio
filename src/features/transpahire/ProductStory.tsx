import { Callout, Card, Grid, Stack, Text } from '@/components';
import { productStory } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §04 Product story & problem — why the product exists (Sprint 07 §04).
 *
 * The "why" before the "how": the central bet and the market shape, rendered
 * from the Product Book verbatim, closing on the honesty guard (built solo,
 * portfolio-scale — no invented team, funding or market statistics).
 */
export function ProductStory() {
  return (
    <CaseStudySection
      id="problem"
      index="02"
      kicker="Product story & problem"
      title="Why the product exists."
      lead="The bet behind Transpahire, and the three-sided market it is shaped for."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="signal" as="h3">
              {productStory.centralBet.label}
            </Text>
            <Text>{productStory.centralBet.body}</Text>
          </Stack>
        </Card>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="signal" as="h3">
              {productStory.marketShape.label}
            </Text>
            <Text>{productStory.marketShape.body}</Text>
          </Stack>
        </Card>
      </Grid>
      <Callout title="Honest scope">{productStory.note}</Callout>
    </CaseStudySection>
  );
}
