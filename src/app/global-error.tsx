'use client';

import { useEffect } from 'react';

/**
 * Global error boundary (Sprint 01 §06).
 *
 * The last-resort boundary for errors thrown in the root layout itself. It
 * must render its own <html>/<body> because the layout failed. Kept minimal
 * and self-contained — it cannot rely on providers or tokens being mounted.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: '#FAF8F4',
          color: '#17150F',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: 480, padding: 24, textAlign: 'center' }}>
          <h1 style={{ fontSize: 30, fontWeight: 400, marginBottom: 12 }}>
            Something went wrong
          </h1>
          <p style={{ color: '#55514A', marginBottom: 24, lineHeight: 1.6 }}>
            A critical error interrupted the application. Reloading usually
            resolves it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: '2px solid #17150F',
              background: 'transparent',
              padding: '8px 16px',
              borderRadius: 2,
              cursor: 'pointer',
              font: 'inherit',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
