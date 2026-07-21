import { Callout, Card, Grid, Stack, Text } from '@/components';
import { arc } from '@/content/experience';
import { ExperienceSection } from '@/features/experience/ExperienceSection';

/**
 * §04 The career-arc through-line — one arc, not two entries (Sprint 09 §04).
 *
 * Renders the frozen through-line (reused verbatim from the About copy, P10A §05)
 * so the two roles read as a single progression. The arc is stated ONCE here and
 * reinforced by the timeline's visual progression — never re-argued, never
 * dramatized beyond what Book A records (S09 §04 RULE). The 45-day migration is a
 * frozen fact carried in the through-line string, not restated with a new number.
 */
export function Arc() {
  return (
    <ExperienceSection
      id="arc"
      index="04"
      kicker={arc.eyebrow}
      title={arc.title}
      lead="The two roles are a single line of growth — front-end specialist to full-stack engineer — not two disconnected jobs."
    >
      <Stack gap={6}>
        <Callout title="The through-line" className="max-w-[60ch]">
          {arc.throughLine}
        </Callout>
        <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
          {arc.movements.map((movement) => (
            <Card key={movement.title}>
              <Stack gap={2}>
                <Text variant="label" tone="mute" as="h3">
                  {movement.title}
                </Text>
                <Text variant="small" tone="graphite" className="leading-[1.6]">
                  {movement.body}
                </Text>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Stack>
    </ExperienceSection>
  );
}
