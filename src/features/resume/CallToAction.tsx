'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import {
  Button,
  Container,
  Eyebrow,
  Heading,
  Reveal,
  Section,
  Stack,
  Subheading,
} from '@/components';
import { callToAction } from '@/content/resume';
import { DownloadButton } from '@/features/resume/DownloadButton';

/**
 * §13 CTA & closing — download, or get in touch (Sprint 11 §13).
 *
 * The page closes by making the two most likely actions obvious — download the
 * résumé (reinforced) and get in touch. The contact facts surfaced are the fixed
 * ones in Book A (`siteConfig.links`), never edited here (S11 §13 RULE). Interim
 * microcopy until the final CTA strings are frozen (C-cta). Reads into the Sprint
 * 03 SiteFooter below `main` and does not rebuild it.
 */
export function CallToAction() {
  return (
    <Section spacing="lg" aria-labelledby="resume-cta-heading">
      <Container width="measure">
        <Reveal>
          <Stack gap={8}>
            <Eyebrow as="p">{callToAction.eyebrow}</Eyebrow>
            <Heading
              as="h2"
              size="h1"
              id="resume-cta-heading"
              className="max-w-[18ch]"
            >
              {callToAction.title}
            </Heading>
            <Subheading className="max-w-[42ch]">
              {callToAction.lead}
            </Subheading>

            <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
              <DownloadButton size="lg" />
              <Button asChild variant="link" trailingIcon={ArrowUpRight}>
                <Link href={callToAction.contactHref}>
                  {callToAction.contactLabel}
                </Link>
              </Button>
            </div>

            <Stack gap={2} aria-label="Contact details">
              {callToAction.contacts.map((contact) => (
                <div
                  key={contact.label}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className="text-mute text-label w-20 font-mono tracking-[0.08em] uppercase">
                    {contact.label}
                  </span>
                  <Link
                    href={contact.href}
                    className="text-signal text-small hover:underline"
                  >
                    {contact.value}
                  </Link>
                </div>
              ))}
            </Stack>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
