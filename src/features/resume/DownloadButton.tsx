'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';

import { Alert, Button, Stack, Text } from '@/components';
import { download } from '@/content/resume';

/**
 * DownloadButton — the résumé download control (Sprint 11 §11).
 *
 * Purpose:      The single most important function on the page — it must never
 *               silently fail (S11 §11). Renders a REAL anchor with the
 *               `download` attribute and an explicit file name so it works
 *               without JS (progressive enhancement); JS only ENHANCES it with a
 *               graceful error if the file is unavailable at click time. When the
 *               asset is Content Required (C3, `download.available === false`) it
 *               renders the honest "not yet available" state instead of a dead
 *               link — no placeholder file, no invented version (S11 §11 HONEST).
 * Public API:   `size`, `variant` — presentation only; all copy & the href come
 *               from the frozen `download` content.
 * Props:        Typed; ≤ 7 total.
 * Variants:     size sm|md|lg, variant primary|secondary — reused button system.
 * States:       available (real link) · probing (aria-busy) · error (Alert) ·
 *               unavailable (disabled control + pending Alert). Feedback reads
 *               beyond colour (icon + text) and never blocks the download path.
 * A11y:         Keyboard-operable; accessible name states the format ("Download
 *               résumé (PDF)"); visible focus from the global ring; the error is
 *               an assertive Alert. The unavailable control is `aria-disabled`.
 * Responsive:   Size-agnostic; stretches to the container on narrow layouts.
 * Composition:  Used in the hero and the dedicated download section (S11 §02 —
 *               the CTA appears twice by design).
 */
interface DownloadButtonProps {
  size?: 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export function DownloadButton({
  size = 'md',
  variant = 'primary',
  fullWidth = false,
}: DownloadButtonProps) {
  // `error` shows the graceful failure; `probing` marks the control busy while
  // we verify the file exists. Neither blocks the native anchor navigation.
  const [error, setError] = useState(false);
  const [probing, setProbing] = useState(false);

  // C3 — the asset is not yet supplied. Render the honest pending state, never a
  // dead link to a missing file (S11 §11 HONEST).
  if (!download.available) {
    return (
      <Stack gap={3}>
        <Button
          variant={variant}
          size={size}
          leadingIcon={Download}
          fullWidth={fullWidth}
          disabled
          aria-disabled="true"
        >
          {download.cta}
        </Button>
        <Alert status="warning" title="Résumé not yet available">
          {download.pending}
        </Alert>
      </Stack>
    );
  }

  /**
   * Enhance the real link: on activation, verify the file is reachable before
   * letting the browser navigate. If the HEAD probe fails or 404s, prevent the
   * dead navigation and surface a graceful error instead of a broken download.
   * Without JS this handler never runs and the plain anchor downloads directly.
   */
  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (open-in-new-tab, etc.) use native behaviour.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    setError(false);
    setProbing(true);
    try {
      const res = await fetch(download.href, { method: 'HEAD' });
      if (!res.ok) throw new Error(`status ${res.status}`);
      // File confirmed — trigger the download via a transient anchor so the
      // `download` attribute and file name are honoured.
      const link = document.createElement('a');
      link.href = download.href;
      link.download = download.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setError(true);
    } finally {
      setProbing(false);
    }
  };

  return (
    <Stack gap={3}>
      <Button
        asChild
        variant={variant}
        size={size}
        leadingIcon={Download}
        fullWidth={fullWidth}
        loading={probing}
      >
        {/* A real, crawlable anchor: works with JS disabled (native download),
            enhanced by the probe when JS is available (S11 §11). */}
        <a
          href={download.href}
          download={download.fileName}
          type="application/pdf"
          aria-label={download.cta}
          onClick={handleClick}
        >
          {download.cta}
        </a>
      </Button>
      {download.version ? (
        <Text
          variant="small"
          tone="mute"
          className="text-label font-mono tracking-[0.08em] uppercase"
        >
          {download.fileName} · {download.version}
        </Text>
      ) : null}
      {error ? (
        <Alert status="error" title="Download unavailable">
          The résumé could not be downloaded right now. Please try again, or
          reach out and I’ll send it directly.
        </Alert>
      ) : null}
    </Stack>
  );
}
