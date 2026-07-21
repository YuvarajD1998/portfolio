import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Grid, Icon, Stack, Text } from '@/components';
import { crossLinks } from '@/content/resume';
import { ResumeSection } from '@/features/resume/ResumeSection';

/**
 * §12 Cross-linking — the depth lives one click away (Sprint 11 §12).
 *
 * Contextual navigation to the pages that own the full detail — About,
 * Experience, Skills, Projects, Engineering, Contact. The Resume page summarizes
 * and routes; it adds no information already available elsewhere (S11 §12 RULE).
 * Every destination resolves to a canonical, approved-IA route.
 */
export function CrossLinks() {
  return (
    <ResumeSection
      id="cross-links"
      index="12"
      kicker={crossLinks.eyebrow}
      title={crossLinks.title}
      lead={crossLinks.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {crossLinks.links.map((link) => (
          <Card key={link.href} as={Link} href={link.href} interactive>
            <Stack gap={1}>
              <div className="flex items-center justify-between gap-2">
                <Text variant="label" tone="ink" as="h3">
                  {link.label}
                </Text>
                <Icon icon={ArrowUpRight} size="sm" className="text-signal" />
              </div>
              <Text variant="small" tone="graphite">
                {link.blurb}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </ResumeSection>
  );
}
