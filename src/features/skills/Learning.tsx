import { Card, Grid, Stack, Text } from '@/components';
import { learning } from '@/content/skills';
import { SkillsSection } from '@/features/skills/SkillsSection';

/**
 * §13 Currently learning & growth — continuous learning, stated plainly
 * (Sprint 10 §13).
 *
 * Book A records "continuous learning" as a principle but does NOT enumerate a
 * specific currently-learning technology list. This ships the learning
 * philosophy VERBATIM and shows the explicit list as pending (blocker C4) — it
 * never fabricates trendy technology names to fill the section (S10 §13
 * HONEST). The pending status is real, honest copy, not a placeholder string.
 */
export function Learning() {
  return (
    <SkillsSection
      id="learning"
      index="13"
      kicker={learning.eyebrow}
      title={learning.title}
      lead={learning.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              {learning.philosophy.label}
            </Text>
            <Text variant="small" tone="graphite" className="leading-[1.6]">
              {learning.philosophy.body}
            </Text>
          </Stack>
        </Card>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              {learning.currentlyExploring.label}
            </Text>
            <Text variant="small" tone="graphite" className="leading-[1.6]">
              {learning.currentlyExploring.pending}
            </Text>
          </Stack>
        </Card>
      </Grid>
    </SkillsSection>
  );
}
