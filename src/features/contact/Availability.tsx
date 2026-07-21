import { Card, Grid, Stack, Text } from '@/components';
import { availability } from '@/content/contact';
import { ContactSection } from '@/features/contact/ContactSection';

/**
 * §07 Professional availability — what fits, stated honestly (Sprint 12 §07).
 *
 * The frozen statement of which opportunities are appropriate, so a reader can
 * self-qualify before writing. Availability is a factual claim about the person;
 * the exact wording is Content Required (C1), so the copy is deliberately
 * conservative — it states openness to a conversation without promising a
 * commitment, rate, start date or response time the record does not carry (S12
 * §07 HONEST). Location (Bengaluru) is the only frozen geographic fact.
 */
export function Availability() {
  return (
    <ContactSection
      id="availability"
      index="07"
      kicker={availability.eyebrow}
      title={availability.title}
      lead={availability.lead}
    >
      <Stack gap={4}>
        <Grid cols={{ base: 1, md: 3, lg: 3 }} gap={4}>
          {availability.points.map((point) => (
            <Card key={point.id}>
              <Stack gap={2}>
                <Text
                  variant="small"
                  tone="mute"
                  as="h3"
                  className="text-label font-mono tracking-[0.12em] uppercase"
                >
                  {point.label}
                </Text>
                <Text tone="graphite" className="leading-[1.6]">
                  {point.body}
                </Text>
              </Stack>
            </Card>
          ))}
        </Grid>
        <Text variant="small" tone="mute">
          {availability.note}
        </Text>
      </Stack>
    </ContactSection>
  );
}
