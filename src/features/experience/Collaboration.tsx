import { Callout, Card, Grid, Stack, Text } from '@/components';
import { collaboration } from '@/content/experience';
import { ExperienceSection } from '@/features/experience/ExperienceSection';

/**
 * §10 Collaboration & ownership — professional maturity, shown (Sprint 09 §10).
 *
 * Maturity shown through concrete acts anchored to a role — writing adoption docs
 * so a framework is actually used, owning the API contract others depend on — not
 * adjectives (S09 §10). Where Book A records no specific detail (team size,
 * mentorship, stakeholder cadence) it is NOT manufactured; those gaps are Content
 * Required (blocker C3) and the section never pads with generic teamwork language
 * (S09 §10 HONEST).
 */
export function Collaboration() {
  return (
    <ExperienceSection
      id="collaboration"
      index="10"
      kicker={collaboration.eyebrow}
      title={collaboration.title}
      lead={collaboration.lead}
    >
      <Stack gap={6}>
        <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
          {collaboration.points.map((point) => (
            <Card key={point.title}>
              <Stack gap={2}>
                <Text variant="label" tone="mute" as="h3">
                  {point.title}
                </Text>
                <Text variant="small" tone="graphite" className="leading-[1.6]">
                  {point.body}
                </Text>
              </Stack>
            </Card>
          ))}
        </Grid>
        <Callout title="How it reads" className="max-w-[60ch]">
          {collaboration.note}
        </Callout>
      </Stack>
    </ExperienceSection>
  );
}
