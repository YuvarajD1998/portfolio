import { Card, Grid, Stack, Text } from '@/components';
import { certifications } from '@/content/skills';
import { SkillsSection } from '@/features/skills/SkillsSection';

/**
 * §14 Certifications — only what's on the record (Sprint 10 §14).
 *
 * The two certification NAMES are frozen in Book A §06, verified vs. the
 * Résumé. Their issuers, dates and verification links are NOT in Book A —
 * Content Required (blocker C2). Each card renders the name and shows the
 * missing fields as pending, never inventing an issuer or a date (S10 §14
 * HONEST).
 */
export function Certifications() {
  return (
    <SkillsSection
      id="certifications"
      index="14"
      kicker={certifications.eyebrow}
      title={certifications.title}
      lead={certifications.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {certifications.items.map((cert) => (
          <Card key={cert.name}>
            <Stack gap={2}>
              <Text variant="label" tone="ink" as="h3">
                {cert.name}
              </Text>
              <Text
                variant="small"
                tone="mute"
                className="text-label font-mono tracking-[0.08em] uppercase"
              >
                {cert.pending}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </SkillsSection>
  );
}
