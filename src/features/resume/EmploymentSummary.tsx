import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Grid, Heading, Icon, Stack, Text } from '@/components';
import { employment } from '@/content/resume';
import { ResumeSection } from '@/features/resume/ResumeSection';

/**
 * §06 Employment summary — each role, in a few lines (Sprint 11 §06).
 *
 * A concise overview of each role — company, position, duration and one
 * high-level responsibility line — deliberately shorter than the Experience
 * page (S09), which owns the full chronology. Company names, titles and dates
 * are re-used verbatim from the frozen career record so the two pages can never
 * diverge; the summary line adds no new responsibility. The detail links out
 * (S11 §06 HONEST).
 */
export function EmploymentSummary() {
  return (
    <ResumeSection
      id="employment"
      index="06"
      kicker={employment.eyebrow}
      title={employment.title}
      lead={employment.lead}
    >
      <Grid cols={{ base: 1, md: 1, lg: 1 }} gap={4}>
        {employment.roles.map((role) => (
          <Card key={role.id}>
            <Stack gap={2}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <Heading as="h3" size="h3">
                  {role.company}
                  <span className="text-graphite font-normal">
                    {' — '}
                    {role.position}
                  </span>
                </Heading>
                <Text
                  variant="small"
                  tone="mute"
                  className="text-label font-mono"
                >
                  {role.location} · {role.duration}
                </Text>
              </div>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {role.summary}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>
      <Link
        href={employment.detailHref}
        className="text-signal text-label inline-flex items-center gap-1 font-mono tracking-[0.08em] uppercase hover:underline"
      >
        {employment.detailLabel}
        <Icon icon={ArrowUpRight} size="sm" />
      </Link>
    </ResumeSection>
  );
}
