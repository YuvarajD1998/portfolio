import { Card, Heading, Stack, Text } from '@/components';
import { education } from '@/content/resume';
import { ResumeSection } from '@/features/resume/ResumeSection';

/**
 * §07 Education — the degree, as recorded (Sprint 11 §07).
 *
 * Institution, degree, dates and CGPA rendered exactly as the frozen record
 * carries them — re-used from the career record's education node so the Resume
 * and Experience pages state the identical degree (S11 §07 RULE). No distinction
 * is added that the résumé does not list.
 */
export function Education() {
  const { degree } = education;
  return (
    <ResumeSection
      id="education"
      index="07"
      kicker={education.eyebrow}
      title={education.title}
      lead={education.lead}
    >
      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <Stack gap={1}>
            <Heading as="h3" size="h3">
              {degree.title}
            </Heading>
            <Text variant="small" tone="graphite">
              {degree.institution}
            </Text>
          </Stack>
          <Stack gap={1} className="text-right">
            <Text variant="small" tone="mute" className="text-label font-mono">
              {degree.duration}
            </Text>
            <Text
              variant="small"
              tone="graphite"
              className="text-label font-mono"
            >
              {degree.detail}
            </Text>
          </Stack>
        </div>
      </Card>
    </ResumeSection>
  );
}
