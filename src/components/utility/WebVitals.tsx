'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Web Vitals reporter — the field-data hook, left ready (Sprint 16 §15, P5).
 *
 * Purpose:      Surface Core Web Vitals (LCP, INP, CLS) plus FCP/TTFB from the
 *               real page as they finalise, so S16 can be verified with lab
 *               data now and wired to a RUM endpoint in S17 without touching
 *               any page. Uses Next's built-in `useReportWebVitals` — no new
 *               dependency, no third-party script on the critical path.
 * Public API:   `<WebVitals />` — render once, high in the tree.
 * Props:        none.
 * Variants:     none.
 * States:       Inert in production unless a reporting endpoint is configured
 *               via `NEXT_PUBLIC_VITALS_ENDPOINT`; logs to the console in dev.
 * A11y:         Renders nothing — no visual, no focus, no announcement.
 * Responsive:   N/A (no output).
 * Composition:  Mounted once in the root layout, alongside the app shell.
 *
 * This ships zero analytics payload by default: with no endpoint set it only
 * console-logs during development. Turning on RUM is a one-line env change in
 * S17, keeping S16's promise of "hook left ready, lab data assumed".
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    const endpoint = process.env.NEXT_PUBLIC_VITALS_ENDPOINT;

    if (endpoint) {
      // Beacon so the report never blocks unload or the main thread.
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        navigationType: metric.navigationType,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, body);
      } else {
        void fetch(endpoint, { body, method: 'POST', keepalive: true });
      }
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[web-vitals] ${metric.name}`,
        Math.round(metric.value),
        metric.rating,
      );
    }
  });

  return null;
}
