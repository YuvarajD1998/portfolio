'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Button, Stack } from '@/components';
import { resumeAccess } from '@/content/contact';
import { ContactSection } from '@/features/contact/ContactSection';
import { DownloadButton } from '@/features/resume';

/**
 * §09 Résumé access — reuse the download, don't rebuild it (Sprint 12 §09).
 *
 * The Contact page offers the résumé by REUSING the Sprint 11 `DownloadButton`
 * and the single canonical asset — same control, same accessible name (states
 * PDF), same graceful-failure / honest "not yet available" path (shared C5). No
 * second implementation, no second file (S12 §09 RULE). It also links out to the
 * owning Resume page for the full summary.
 */
export function ResumeAccess() {
  return (
    <ContactSection
      id="resume-access"
      index="09"
      kicker={resumeAccess.eyebrow}
      title={resumeAccess.title}
      lead={resumeAccess.lead}
    >
      <div className="max-w-[42ch]">
        <Stack gap={4}>
          <DownloadButton size="lg" />
          <Button asChild variant="link" trailingIcon={ArrowUpRight}>
            <Link href={resumeAccess.fullPage.href}>
              {resumeAccess.fullPage.label}
            </Link>
          </Button>
        </Stack>
      </div>
    </ContactSection>
  );
}
