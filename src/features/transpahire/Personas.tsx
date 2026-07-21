import { Callout, Card, Grid, Stack, Text } from '@/components';
import { identityDecision, personas } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §05 User personas & product goals — eight roles, one identity model
 * (Sprint 07 §05).
 *
 * The candidate, the six organization sub-roles and the platform admin, backed
 * by the real Role / OrgRole enums — not an invented taxonomy. Closes on the
 * locked single-global-identity decision, surfaced as a product-thinking point.
 */
export function Personas() {
  return (
    <CaseStudySection
      id="users"
      index="03"
      kicker="User personas & product goals"
      title="Eight roles, one identity model."
      lead="Who the product serves, and the permission model behind them."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {personas.map((persona) => (
          <Card key={persona.role} padding="sm">
            <Stack gap={2}>
              <Text
                variant="label"
                tone="ink"
                as="h3"
                className="font-semibold"
              >
                {persona.role}
              </Text>
              <Text variant="small">{persona.body}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>
      <Callout title={identityDecision.label}>{identityDecision.body}</Callout>
    </CaseStudySection>
  );
}
