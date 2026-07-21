import { Callout, Card, Grid, List, Stack, Text } from '@/components';
import { apiAuth } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §16 API ecosystem & authentication — REST, JWT, and a re-grounding boundary
 * (Sprint 07 §16).
 *
 * The service boundary, the auth/refresh flow and impersonation — the
 * security-shaped decisions that hold the three-sided marketplace together.
 * Closes on the RULE: the "nine API services" phrasing is the NestJS service
 * surface, no public API is invented, and isSuperAdmin was removed.
 */
export function ApiAuth() {
  return (
    <CaseStudySection
      id="api"
      index="13"
      kicker="API ecosystem & auth"
      title="REST, JWT, and a re-grounding boundary."
      lead="The service boundary, the refresh flow and time-boxed impersonation."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              Authentication flow
            </Text>
            <List>
              {apiAuth.authentication.map((item) => (
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
              API boundary & impersonation
            </Text>
            <List>
              {apiAuth.boundary.map((item) => (
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
      <Callout title="What the boundary is — and isn't">{apiAuth.note}</Callout>
    </CaseStudySection>
  );
}
