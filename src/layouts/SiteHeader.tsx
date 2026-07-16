import { Container } from '@/components/primitives';
import { ThemeToggle } from '@/components/ThemeToggle';
import { siteConfig } from '@/config/site';

/**
 * SiteHeader — the slim top bar shell (Bible §09 Navigation).
 *
 * A structural placeholder for Sprint 01: it renders the wordmark and the theme
 * toggle on a hairline-underlined Paper bar. Navigation links are intentionally
 * absent — no page exists to link to yet (Sprint 01 ships no portfolio page).
 * Sprint 03 composes the real navigation into this region.
 */
export function SiteHeader() {
  return (
    <header className="border-hairline bg-paper/80 z-nav sticky top-0 w-full border-b backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <span className="text-label text-ink font-mono tracking-[0.14em] uppercase">
            {siteConfig.name}
          </span>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
