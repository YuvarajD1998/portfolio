'use client';

import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

import {
  Button,
  Container,
  Eyebrow,
  Flex,
  Heading,
  Icon,
  Reveal,
  Section,
  Stack,
  Text,
} from '@/components';
import { routes } from '@/config/navigation';
import { contact, invitation } from '@/content/home';

/**
 * The invitation — final CTA & footer transition (Sprint 04 §10; P03 §10).
 *
 * Converts earned trust into a conversation, peer-to-peer: one serif line, a
 * Signal email link, and a quiet row of Résumé · GitHub · LinkedIn. It is the
 * last section of the page and reads directly into the shell's SiteFooter —
 * it does not rebuild or duplicate the footer (Sprint 04 §10 RULE). Social
 * links appear because the Content Bible includes them (P10A §07); the handles
 * are the frozen contact facts, not invented.
 *
 * A11y:  Email is a real mailto link; external profile links open in a new tab
 *        with rel noopener (via <Link> external detection would need http, so
 *        these set target/rel explicitly). Section labelled by its heading;
 *        the primary CTA sits at md target size.
 */
export function Invitation() {
  return (
    <Section spacing="lg" aria-labelledby="invitation-heading">
      <Container width="measure">
        <Reveal>
          <Stack gap={8}>
            <Eyebrow as="p">{invitation.eyebrow}</Eyebrow>
            <Heading
              as="h2"
              size="h1"
              id="invitation-heading"
              className="max-w-[18ch]"
            >
              {invitation.title}
            </Heading>
            <Text variant="body" tone="graphite" className="max-w-[42ch]">
              {invitation.lead}
            </Text>

            <div>
              <Button asChild size="lg" leadingIcon={Mail}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </Button>
            </div>

            <Flex wrap gap={6} className="text-small font-mono">
              <Link
                href={routes.resume.href}
                className="text-graphite hover:text-signal inline-flex items-center gap-1"
              >
                Résumé
                <Icon icon={ArrowUpRight} size="sm" aria-hidden />
              </Link>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-graphite hover:text-signal inline-flex items-center gap-1"
              >
                <Icon icon={Github} size="sm" aria-hidden />
                GitHub
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-graphite hover:text-signal inline-flex items-center gap-1"
              >
                <Icon icon={Linkedin} size="sm" aria-hidden />
                LinkedIn
              </a>
            </Flex>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
