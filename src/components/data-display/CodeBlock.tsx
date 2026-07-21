import { CopyButton } from '@/components/utility/CopyButton';
import { cn } from '@/lib/cn';

/**
 * CodeBlock — a titled, copyable code panel (Bible §04, Sprint 02 §07).
 *
 * Purpose:      Present a code sample with an optional filename/language chip
 *               and a copy button — the presentation layer over raw <pre><code>.
 * Public API:   `code`, `language`, `filename`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one panel; the header slots are optional.
 * States:       Static; the CopyButton owns its idle/copied state.
 * A11y:         Real `<pre><code>`; the copy button is a labelled control; the
 *               code scrolls horizontally so long lines stay reachable.
 * Responsive:   Header wraps; code scrolls on the x-axis, never widening the page.
 * Composition:  Pass the code as a string (so it is copyable); use typography/
 *               Code for an uncopyable inline block.
 */
interface CodeBlockProps {
  code: string;
  /** Language chip label, e.g. "tsx". */
  language?: string;
  /** Filename shown in the header, e.g. "Button.tsx". */
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  filename,
  className,
}: CodeBlockProps) {
  const hasHeader = Boolean(filename || language);
  return (
    <div
      className={cn(
        'border-hairline overflow-hidden rounded-md border',
        className,
      )}
    >
      {hasHeader ? (
        <div className="border-hairline bg-surface flex items-center justify-between gap-3 border-b px-3 py-1.5">
          <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
            {filename ?? language}
          </span>
          <div className="flex items-center gap-2">
            {filename && language ? (
              <span className="text-mute text-label font-mono">{language}</span>
            ) : null}
            <CopyButton value={code} label="Copy code" />
          </div>
        </div>
      ) : null}
      <div className="relative">
        {!hasHeader ? (
          <div className="absolute top-1 right-1 z-10">
            <CopyButton value={code} label="Copy code" />
          </div>
        ) : null}
        <pre className="bg-surface text-code text-ink overflow-x-auto p-4 font-mono leading-[1.6]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
