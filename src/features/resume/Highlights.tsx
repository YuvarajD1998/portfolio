import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Grid, Heading, Icon, Stack, Text } from '@/components';
import { highlights } from '@/content/resume';
import { ResumeSection } from '@/features/resume/ResumeSection';

/**
 * §05 Résumé highlights — the headline facts, scannable (Sprint 11 §05).
 *
 * The qualifications made scannable as compact highlight tiles — years of
 * experience, specialization, industries, core competencies — plus one notable
 * accomplishment. Only facts already on the record appear; the accomplishment
 * stays qualitative and links out to the pages that own the detail. No metric is
 * expanded or invented (S11 §05 RULE).
 */
export function Highlights() {
  return (
    <ResumeSection
      id="highlights"
      index="05"
      kicker={highlights.eyebrow}
      title={highlights.title}
      lead={highlights.lead}
    >
      <Grid cols={{ base: 1, md: 3, lg: 3 }} gap={4}>
        {highlights.items.map((item) => (
          <Card key={item.id}>
            <Stack gap={2}>
              <Text
                variant="small"
                tone="mute"
                as="h3"
                className="text-label font-mono tracking-[0.12em] uppercase"
              >
                {item.label}
              </Text>
              <Heading as="p" size="h3" className="leading-tight">
                {item.value}
              </Heading>
              {'detail' in item && item.detail ? (
                <Text variant="small" tone="graphite">
                  {item.detail}
                </Text>
              ) : null}
            </Stack>
          </Card>
        ))}
        <Card className="md:col-span-2 lg:col-span-3">
          <Stack gap={3}>
            <Text
              variant="small"
              tone="mute"
              as="h3"
              className="text-label font-mono tracking-[0.12em] uppercase"
            >
              {highlights.accomplishment.label}
            </Text>
            <Text tone="graphite" className="leading-[1.6]">
              {highlights.accomplishment.body}
            </Text>
            <Link
              href={highlights.accomplishment.href}
              className="text-signal text-label inline-flex items-center gap-1 font-mono tracking-[0.08em] uppercase hover:underline"
            >
              {highlights.accomplishment.linkLabel}
              <Icon icon={ArrowUpRight} size="sm" />
            </Link>
          </Stack>
        </Card>
      </Grid>
    </ResumeSection>
  );
}
