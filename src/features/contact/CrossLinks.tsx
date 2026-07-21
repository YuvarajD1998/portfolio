import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Grid, Icon, Stack, Text } from '@/components';
import { crossLinks } from '@/content/contact';
import { ContactSection } from '@/features/contact/ContactSection';

/**
 * §12 Cross-linking — a way back in for the undecided (Sprint 12 §12).
 *
 * Navigation back to the pages that own the depth — Projects, Transpahire, About,
 * Experience, Skills, Resume — for a reader not yet ready to write. The Contact
 * page ROUTES; it never re-tells those pages (S12 §12 RULE). Every destination
 * resolves to a canonical, approved-IA route. Footer navigation is the S03
 * shell's and is not re-implemented here.
 */
export function CrossLinks() {
  return (
    <ContactSection
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
    </ContactSection>
  );
}
