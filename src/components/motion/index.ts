/**
 * Motion — reusable animation wrappers on the S01 presets (Sprint 02 §09).
 *
 * Every wrapper honours `prefers-reduced-motion` (swaps to instant opacity) and
 * animates transform + opacity only. Motion routes through these — an ad-hoc
 * animation in a component is a review reject (Bible §10).
 */
export {
  Fade,
  Slide,
  Scale,
  Reveal,
  Stagger,
  StaggerItem,
  Hover,
  Press,
  PageTransition,
} from './MotionWrappers';
