import { ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

import { Card, Grid, Icon, Stack, Text } from '@/components';
import { methods } from '@/content/contact';
import { ContactSection } from '@/features/contact/ContactSection';

/**
 * §04 Contact methods — every channel, exactly as recorded (Sprint 12 §04).
 *
 * All approved contact methods as reusable cards from the design system — email,
 * LinkedIn, GitHub and phone — each a REAL, accessible, correctly-behaving link:
 * `mailto:` for email, `tel:` for phone, and secure external links
 * (`rel="noopener noreferrer"`, new tab) for the profiles (S12 §04 RULE, §08
 * RULE). The values are frozen in Book A (`siteConfig.contact`) and rendered
 * verbatim; no channel is added, edited or dropped. Each card is a single large
 * tap target (≥44px) with an accessible name stating the destination and, for
 * external links, that it opens in a new tab.
 */
const ICONS: Record<string, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  phone: Phone,
};

export function ContactMethods() {
  return (
    <ContactSection
      id="contact-methods"
      index="04"
      kicker={methods.eyebrow}
      title={methods.title}
      lead={methods.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {methods.items.map((method) => {
          const external = method.kind === 'external';
          return (
            <Card
              key={method.id}
              as="a"
              interactive
              href={method.href}
              {...externalProps(external)}
              aria-label={method.accessibleName}
            >
              <Stack gap={2}>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <Icon
                      icon={ICONS[method.id] ?? Mail}
                      size="sm"
                      className="text-signal"
                    />
                    <Text
                      variant="small"
                      tone="mute"
                      as="h3"
                      className="text-label font-mono tracking-[0.12em] uppercase"
                    >
                      {method.label}
                    </Text>
                  </span>
                  {external ? (
                    <Icon
                      icon={ArrowUpRight}
                      size="sm"
                      className="text-mute"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <Text tone="ink" className="text-body font-mono break-all">
                  {method.value}
                </Text>
                <Text variant="small" tone="graphite">
                  {method.hint}
                </Text>
              </Stack>
            </Card>
          );
        })}
      </Grid>
    </ContactSection>
  );
}

/** Secure external-link attributes (S12 §08 RULE) — new tab + noopener noreferrer. */
function externalProps(external: boolean) {
  return external
    ? ({ target: '_blank', rel: 'noopener noreferrer' } as const)
    : {};
}
