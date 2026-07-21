import {
  Badge,
  Container,
  Eyebrow,
  Heading,
  Reveal,
  Section,
  Stack,
  Subheading,
} from '@/components';
import { hero } from '@/content/resume';
import { DownloadButton } from '@/features/resume/DownloadButton';

/**
 * Resume hero — name, role, and the download (Sprint 11 §03).
 *
 * Purpose:      Name the person and offer the download immediately, so a hurried
 *               reader never has to scroll to find it (S11 §03). Holds the page
 *               title (the single <h1>), the frozen identity line, a supporting
 *               introduction framing the page as a quick, downloadable summary,
 *               the identity chips, and the primary download CTA. Copy is
 *               confident but honest — the frozen title and 4+ years figure, no
 *               inflation (S11 §03 RULE, P10A tone).
 * Public API:   No props — reads frozen copy from `@/content/resume`.
 * A11y:         Holds the page's single <h1> (S11 §03 RULE); the <section> is
 *               labelled by that heading's id. Chips are a labelled list; the
 *               download CTA is a real, keyboard-operable control with an
 *               accessible name that states the format.
 * Responsive:   Single measure-width column; chips wrap; the CTA stays reachable.
 * Composition:  Section → Container → Reveal → Eyebrow + h1 + positioning +
 *               intro + chips + DownloadButton. Text-only — no logo wall.
 */
export function Hero() {
  return (
    <Section spacing="lg" aria-labelledby="resume-heading">
      <Container>
        <Reveal>
          <Stack gap={6} className="max-w-[46ch]">
            <Eyebrow as="p">{hero.eyebrow}</Eyebrow>
            <Stack gap={3}>
              <Heading as="h1" size="display" id="resume-heading">
                {hero.title}
              </Heading>
              <Eyebrow as="p" className="text-signal">
                {hero.positioning}
              </Eyebrow>
            </Stack>
            <Subheading>{hero.intro}</Subheading>
            <ul className="flex flex-wrap gap-2" aria-label="Profile summary">
              {hero.chips.map((chip) => (
                <li key={chip}>
                  <Badge tone="neutral">{chip}</Badge>
                </li>
              ))}
            </ul>
          </Stack>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-10">
            <DownloadButton size="lg" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
