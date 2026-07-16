/**
 * Layout & text primitives (Sprint 01 §07).
 *
 * Size-agnostic, theme-aware, styled entirely from tokens. They ship no client
 * JS. Sprint 02 hardens these into the full design-system library; no page
 * imports them yet.
 */
export { Container, type ContainerWidth } from './Container';
export { Section, type SectionSpacing } from './Section';
export { Stack, type SpaceStep } from './Stack';
export { Flex } from './Flex';
export { Grid } from './Grid';
export { Spacer } from './Spacer';
export { Heading, type HeadingSize } from './Heading';
export { Text, type TextVariant, type TextTone } from './Text';
export { Link } from './Link';
export { Divider } from './Divider';
export { Surface, type SurfaceLevel } from './Surface';
