import { Card, Grid, Heading, List, Stack, Text } from '@/components';
import { education } from '@/content/experience';
import { ExperienceSection } from '@/features/experience/ExperienceSection';

/**
 * §12 Education & certifications — the foundation, stated plainly (Sprint 09 §12).
 *
 * Rendered verbatim from Book A, verified vs. the Résumé, presented factually and
 * without inflation. The degree is in Mechanical Engineering; the page states it
 * as recorded and lets the self-taught-to-software arc speak for itself — it is
 * not disguised or reframed (S09 §12 HONEST). Certification issuers/dates are not
 * in Book A and are Content Required (blocker C2), not invented. The degree card
 * carries the id the timeline's education node links to.
 */
export function Education() {
  const { degree, certifications } = education;

  return (
    <ExperienceSection
      id={degree.id}
      index="12"
      kicker={education.eyebrow}
      title={education.title}
      lead={education.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        <Card>
          <Stack gap={2}>
            <Text variant="label" tone="mute" as="h3">
              Education
            </Text>
            <Heading as="h4" size="h3">
              {degree.title}
            </Heading>
            <Text variant="small" tone="graphite" className="leading-[1.6]">
              {degree.institution}
              <br />
              {degree.duration} · {degree.detail}
            </Text>
          </Stack>
        </Card>
        <Card>
          <Stack gap={2}>
            <Text variant="label" tone="mute" as="h3">
              Certifications
            </Text>
            <List>
              {certifications.map((cert) => (
                <li key={cert}>
                  <Text as="span" variant="small">
                    {cert}
                  </Text>
                </li>
              ))}
            </List>
          </Stack>
        </Card>
      </Grid>
    </ExperienceSection>
  );
}
