import { type ComponentPropsWithRef, type ElementType } from 'react';

/**
 * Types for polymorphic components — a primitive that can render as a
 * different element via an `as` prop (e.g. `<Text as="span">`).
 *
 * This keeps primitives semantic (Blueprint §04: semantic HTML first) without
 * multiplying components: a Heading can be an h1–h6, a Text can be a p/span/li.
 */

/** Props for a component rendered as element `E`, plus its own props `P`. */
export type PolymorphicProps<E extends ElementType, P = object> = P & {
  /** Element or component to render as. */
  as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof P | 'as'>;
