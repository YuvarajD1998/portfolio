/**
 * ============================================================================
 * Datum — Component library barrel (Sprint 02 §03)
 * ============================================================================
 * The single tree-shakeable entry point. Named exports only — no side effects,
 * no default export — so importing one component never pulls in the rest
 * (Sprint 02 §11 performance). A component lives in exactly one category folder;
 * this barrel re-exports each category so consumers write `@/components`.
 *
 * Naming note: two categories define a "Label". They are different things:
 *   - forms/Label       — a real <label> bound to a control (the common one).
 *   - typography/Label  — a mono, uppercase spec-sheet kicker (an eyebrow).
 * To keep both reachable without a clash, the typography kicker is re-exported
 * here as `Eyebrow`; import it as `Label` from '@/components/typography' if the
 * kicker is what you mean.
 * ============================================================================
 */

export * from './layout';
export {
  Display,
  Heading,
  type HeadingSize,
  Subheading,
  Text,
  type TextVariant,
  type TextTone,
  Caption,
  Label as Eyebrow,
  Code,
  InlineCode,
  Quote,
  List,
  Link,
} from './typography';
export * from './icons';
export * from './ui';
export * from './forms';
export * from './data-display';
export * from './feedback';
export * from './overlays';
export * from './navigation';
export * from './utility';
export * from './motion';
