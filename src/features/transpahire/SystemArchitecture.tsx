import { Callout, Card, Grid, Stack, StatisticBlock, Text } from '@/components';
import { systemArchitecture } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';
import { SystemDiagram } from '@/features/transpahire/SystemDiagram';

/**
 * §09 System architecture — four repos, one database, clear authority
 * (Sprint 07 §09).
 *
 * The summary layer (recruiter-readable): the four repos and the one
 * load-bearing rule — NestJS owns all authority; FastAPI is stateless AI
 * compute. The depth layer: the inline SVG diagram (a genuine contribution, the
 * source repos have none), the shared-Postgres subtlety, and the verbatim scale
 * snapshot.
 */
export function SystemArchitecture() {
  return (
    <CaseStudySection
      id="system"
      index="07"
      kicker="System architecture"
      title="Four repos, one database, clear authority."
      lead="Four independently deployed repositories, and the single rule that holds them together: NestJS owns all authority; FastAPI is stateless AI compute."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {systemArchitecture.repos.map((repo) => (
          <Card key={repo.name}>
            <Stack gap={2}>
              <Text as="h3" className="text-small font-mono font-semibold">
                {repo.name} · {repo.tech}
              </Text>
              <Text variant="small">{repo.body}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>

      <SystemDiagram />

      <Callout title="The subtle bit">{systemArchitecture.sharedDb}</Callout>

      <Stack gap={3}>
        <Text variant="label" tone="mute" as="h3">
          Scale snapshot
        </Text>
        <Grid cols={{ base: 2, md: 3, lg: 3 }} gap={6}>
          {systemArchitecture.scale.map((stat) => (
            <StatisticBlock
              key={stat.caption}
              value={stat.value}
              caption={stat.caption}
            />
          ))}
        </Grid>
      </Stack>
    </CaseStudySection>
  );
}
