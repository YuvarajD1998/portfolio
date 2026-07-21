import { Card, Grid, Stack, Text } from '@/components';
import { workflow } from '@/content/skills';
import { SkillsSection } from '@/features/skills/SkillsSection';

/**
 * §12 Development workflow — how the delivery actually happens (Sprint 10 §12).
 *
 * Four concise, practical statements — version control & review, CI/CD
 * awareness, documentation and agile collaboration — drawn from what Book A and
 * the Résumé record. No tool or ceremony added for effect; kept short so it does
 * not compete with the Engineering page's process narrative (S10 §12 RULE).
 */
export function Workflow() {
  return (
    <SkillsSection
      id="workflow"
      index="12"
      kicker={workflow.eyebrow}
      title={workflow.title}
      lead={workflow.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {workflow.items.map((item) => (
          <Card key={item.title}>
            <Stack gap={2}>
              <Text variant="label" tone="mute" as="h3">
                {item.title}
              </Text>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {item.body}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </SkillsSection>
  );
}
