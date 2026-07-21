import { Callout, Card, Grid, List, Stack, Text } from '@/components';
import { decisionFramework } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';

/**
 * §18 Technical decision framework — how the calls actually get made
 * (Sprint 08 §18).
 *
 * The payoff of the page: how framework/library/tool choices are evaluated, and
 * the worked trade-offs this engineer actually made (P10/P10B) — never generic
 * "it depends" filler (S08 §18 RULE). The tie-breaker is maintainability &
 * predictable state (P10).
 */
export function DecisionFramework() {
  return (
    <EngineeringSection
      id="decisions"
      index="18"
      kicker="Technical decision framework"
      title="How the calls actually get made."
      lead="How framework, library and build-tool choices are evaluated, and how trade-offs are weighed."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              What gets weighed
            </Text>
            <List>
              {decisionFramework.weighed.map((point) => (
                <li key={point}>
                  <Text as="span" variant="small">
                    {point}
                  </Text>
                </li>
              ))}
            </List>
          </Stack>
        </Card>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              Worked trade-offs (real, cited)
            </Text>
            <Stack gap={3}>
              {decisionFramework.tradeoffs.map((t) => (
                <Stack key={t.choice} gap={1}>
                  <Text variant="small" tone="ink" className="font-medium">
                    {t.choice}
                  </Text>
                  <Text
                    variant="small"
                    tone="graphite"
                    className="leading-[1.55]"
                  >
                    {t.why}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Callout title="The governing rule">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {decisionFramework.rule}
        </Text>
      </Callout>
    </EngineeringSection>
  );
}
