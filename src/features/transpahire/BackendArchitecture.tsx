import { Card, Disclosure, Grid, List, Stack, Text } from '@/components';
import { backendArchitecture } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §12 Backend architecture — controllers, services, queues, guards
 * (Sprint 07 §12).
 *
 * Summary layer: the ~30 NestJS modules, their controller → service → Prisma
 * pattern, background jobs and the email chokepoint. Depth layer (Disclosure):
 * the HONEST guard gap — per-controller not global, and a dead CASL factory —
 * named as engineering reality, not concealed (S07 §12 HONEST).
 */
export function BackendArchitecture() {
  return (
    <CaseStudySection
      id="backend"
      index="09"
      kicker="Backend architecture"
      title="Controllers, services, queues, guards."
      lead="The strict controller → service → Prisma pattern, background jobs and the email chokepoint — at true status, including the honest guard gap."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              Structure & jobs
            </Text>
            <List>
              {backendArchitecture.structure.map((item) => (
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
              Guards & email
            </Text>
            <List>
              {backendArchitecture.guardsEmail.map((item) => (
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
      <Disclosure id="backend-honest" summary="The honest guard gap">
        {backendArchitecture.honest}
      </Disclosure>
    </CaseStudySection>
  );
}
