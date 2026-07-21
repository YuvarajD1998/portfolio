import { download } from '@/content/resume';
import { DownloadButton } from '@/features/resume/DownloadButton';
import { ResumeSection } from '@/features/resume/ResumeSection';

/**
 * §11 Résumé download section — the download, reinforced (Sprint 11 §11).
 *
 * The dedicated download section. The CTA appears twice on the page by design —
 * once in the hero, once here — because the reader may decide to download at
 * either moment (S11 §02). The control is the same robust `DownloadButton`: a
 * real link that works without JS, an accessible name stating the format, the
 * correct MIME type, and a graceful failure / honest "not yet available" state
 * (S11 §11).
 */
export function DownloadSection() {
  return (
    <ResumeSection
      id="download"
      index="11"
      kicker={download.eyebrow}
      title={download.title}
      lead={download.lead}
    >
      <div className="max-w-[42ch]">
        <DownloadButton size="lg" />
      </div>
    </ResumeSection>
  );
}
