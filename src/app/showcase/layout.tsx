import { type Metadata } from 'next';

/**
 * Showcase layout — metadata for the isolated development surface (S02 §12).
 *
 * `noindex, nofollow` keeps the showcase out of search even if it were ever
 * reachable in production (middleware already 404s it there). It is a
 * validation surface, not a portfolio page.
 */
export const metadata: Metadata = {
  title: 'Component Showcase — Datum (dev)',
  robots: { index: false, follow: false },
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
