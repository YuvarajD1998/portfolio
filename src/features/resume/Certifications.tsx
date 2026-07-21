import { Card, Grid, Stack, Text } from '@/components';
import { certifications } from '@/content/resume';
import { ResumeSection } from '@/features/resume/ResumeSection';

/**
 * §09 Certifications — only what's on the record (Sprint 11 §09).
 *
 * The two certification NAMES are frozen; their issuers, dates and verification
 * links are NOT on the record — Content Required (C2). Each card renders the name
 * and shows the missing fields as pending, never inventing an issuer or a date.
 * The Resume and Skills pages render the IDENTICAL frozen certification data so
 * the two never diverge (S11 §09 HONEST).
 */
export function Certifications() {
  return (
    <ResumeSection
      id="certifications"
      index="09"
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
    </ResumeSection>
  );
}
