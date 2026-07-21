import { Card, Grid, List, Stack, Text } from '@/components';
import { toolsAndLearning } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';

/**
 * §19 Tools, workflows & continuous learning (Sprint 08 §19).
 *
 * The everyday toolchain and how the engineer keeps growing — the "continuous
 * learning" pillar made concrete. Each tool earns a sentence on how it is used,
 * never a bare logo wall (P10A rule). The closing CTA is a separate component
 * that reads into the shell footer.
 */
export function ToolsAndLearning() {
  return (
    <EngineeringSection
      id="tools"
      index="19"
      kicker="Tools, workflows & future learning"
      title="The daily craft, and what’s next."
      lead="The everyday toolchain, and how the standard keeps rising — depth chosen deliberately, not framework-chasing."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              Tools & workflow
            </Text>
            <Stack gap={3}>
              {toolsAndLearning.tools.map((tool) => (
                <Stack key={tool.name} gap={1}>
                  <Text
                    variant="small"
                    tone="ink"
                    className="font-mono font-medium"
                  >
                    {tool.name}
                  </Text>
                  <Text
                    variant="small"
                    tone="graphite"
                    className="leading-[1.55]"
                  >
                    {tool.use}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Card>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              Continuous learning
            </Text>
            <List>
              {toolsAndLearning.learning.map((point) => (
                <li key={point}>
                  <Text as="span" variant="small">
                    {point}
                  </Text>
                </li>
              ))}
            </List>
          </Stack>
        </Card>
      </Grid>
    </EngineeringSection>
  );
}
