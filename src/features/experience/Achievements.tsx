import { Badge, Card, Grid, Stack, Text } from '@/components';
import { achievements } from '@/content/experience';
import { ExperienceSection } from '@/features/experience/ExperienceSection';

/**
 * §08 Achievements — impact, stated with credibility (Sprint 09 §08).
 *
 * Each achievement is one specific sentence drawn verbatim from the career record
 * (P10A), tied to the role that produced it and tagged by kind (launch,
 * engineering, ownership, leadership). Quantified only where Book A supplies the
 * number — no percentage, user count or performance figure is claimed unless an
 * approved source supplies it; unbacked metrics are Content Required, never
 * estimated (S09 §08 RULE, HONEST → blocker C1).
 */
export function Achievements() {
  return (
    <ExperienceSection
      id="achievements"
      index="08"
      kicker={achievements.eyebrow}
      title={achievements.title}
      lead={achievements.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {achievements.items.map((item) => (
          <Card key={item.title}>
            <Stack gap={3}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="signal">{item.kind}</Badge>
                <Text variant="label" tone="mute">
                  {item.role}
                </Text>
              </div>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {item.title}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </ExperienceSection>
  );
}
