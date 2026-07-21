import Link from 'next/link';

import { Badge, Card, Stack, Text } from '@/components';
import { skillsSnapshot } from '@/content/resume';
import { ResumeSection } from '@/features/resume/ResumeSection';

/**
 * §10 Skills snapshot — primary strengths, then a link (Sprint 11 §10).
 *
 * A compact snapshot of the primary technical strengths — names only, no
 * proficiency bars or scores — the smaller sibling of the Skills page, never a
 * copy of it (S11 §10 RULE). The link to /skills does the work of "more detail".
 * Every technology is one the frozen Skills record carries.
 */
export function SkillsSnapshot() {
  return (
    <ResumeSection
      id="skills"
      index="10"
      kicker={skillsSnapshot.eyebrow}
      title={skillsSnapshot.title}
      lead={skillsSnapshot.lead}
    >
      <Card>
        <Stack gap={4}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Text variant="label" tone="ink" as="h3">
              Primary technical strengths
            </Text>
            <Link
              href={skillsSnapshot.fullBreakdown.href}
              className="text-signal text-label font-mono tracking-[0.08em] uppercase hover:underline"
            >
              {skillsSnapshot.fullBreakdown.label}
            </Link>
          </div>
          <ul
            className="flex flex-wrap gap-2"
            aria-label="Primary technical strengths"
          >
            {skillsSnapshot.technologies.map((tech) => (
              <li key={tech}>
                <Badge tone="neutral">{tech}</Badge>
              </li>
            ))}
          </ul>
        </Stack>
      </Card>
    </ResumeSection>
  );
}
