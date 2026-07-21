'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

import { Button, Container, Section, Subheading } from '@/components';
import { hero } from '@/content/home';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  heroDatumLine,
  heroWord,
  heroWordContainer,
} from '@/lib/motion/presets';

/**
 * Hero — the homepage's single above-the-fold block (Sprint 04 §03; P08).
 *
 * Purpose:      Establish, in the first seconds, that this is a product
 *               engineer — one confident thesis on warm paper, framed by a
 *               datum coordinate. Copy is P08's frozen hero; the role is the
 *               Content Bible's fixed title (P10A §04).
 * Public API:   No props — reads all copy from `@/content/home`.
 * States:       On load the datum lines draw, then the thesis rises
 *               word-by-word (P03 §00 motion). Under reduced motion, both
 *               resolve to their final state instantly — content is never
 *               gated behind motion (Sprint 04 §11).
 * A11y:         Holds the page's single <h1>; the coordinate + datum lines are
 *               decorative (aria-hidden). CTAs are real links styled as
 *               buttons; the hero is the LCP element and shifts nothing.
 * Responsive:   Left-anchored thesis with open space to the right on desktop;
 *               single column on mobile. Type scales via the display token.
 * Composition:  Section → Container → decorative datum frame + heading + CTAs.
 */
export function Hero() {
  const reduced = useReducedMotion();

  const words = hero.headline.split(' ');

  // Word-by-word rise + datum-line draw, from the shared motion presets (P03
  // §00). Under reduced motion, both resolve to their final state instantly —
  // no movement, content never gated behind motion (§04/§12).
  const container = reduced ? undefined : heroWordContainer;
  const word = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : heroWord;

  return (
    <Section spacing="lg" aria-labelledby="hero-heading">
      <Container>
        <div className="relative">
          {/* Decorative datum frame — two hairlines meeting at a corner
              origin. Draws on load; static under reduced motion. */}
          <motion.span
            aria-hidden
            className="bg-hairline pointer-events-none absolute top-0 -left-4 hidden h-full w-px md:block"
            variants={heroDatumLine}
            initial={reduced ? 'visible' : 'hidden'}
            animate="visible"
            style={{ transformOrigin: 'top' }}
          />

          <p className="text-small text-mute font-mono tracking-[0.14em] uppercase">
            <span aria-hidden>{hero.coordinate}</span>
          </p>

          <motion.h1
            id="hero-heading"
            className="font-display text-display text-ink mt-6 max-w-[16ch] leading-[1.04] font-normal tracking-[-0.015em]"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                variants={word}
                className="inline-block whitespace-pre"
              >
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </motion.h1>

          <p className="text-small text-graphite mt-6 font-mono tracking-[0.12em] uppercase">
            {hero.role}
          </p>

          <Subheading className="mt-6 max-w-[42ch]">{hero.support}</Subheading>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
