import { Card, Disclosure, Grid, List, Stack, Text } from '@/components';
import { frontendArchitecture } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §10 Frontend architecture — one SPA, three audiences, role-gated
 * (Sprint 07 §10).
 *
 * Summary layer: the stack and the state model that let one codebase serve
 * candidates, six org roles and platform admins. Depth layer (Disclosure): the
 * HONEST template-lineage leftovers — named, not hidden (S07 §10 HONEST, §11
 * progressive disclosure).
 */
export function FrontendArchitecture() {
  return (
    <CaseStudySection
      id="frontend"
      index="08"
      kicker="Frontend architecture"
      title="One SPA, three audiences, role-gated."
      lead="The routing, state, forms and styling decisions that let one codebase serve every role."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              Stack & structure
            </Text>
            <List>
              {frontendArchitecture.stack.map((item) => (
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
              State & data
            </Text>
            <List>
              {frontendArchitecture.state.map((item) => (
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
      <Disclosure
        id="frontend-honest"
        summary="Template-lineage leftovers, named"
      >
        {frontendArchitecture.honest}
      </Disclosure>
    </CaseStudySection>
  );
}
