import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

import { Card, Grid, Icon, Text } from '@/components';
import { socialLinks } from '@/content/contact';
import { ContactSection } from '@/features/contact/ContactSection';

/**
 * §08 Social & professional links — only the approved platforms (Sprint 12 §08).
 *
 * The professional profiles on the record — GitHub and LinkedIn, the exact set
 * Book A lists. No other platform is added (S12 §08 RULE). Each link opens
 * securely in a new tab (`rel="noopener noreferrer"`) with an accessible name
 * stating the destination and that it opens externally. The entries are reused
 * from the frozen `methods` set so this section can never diverge from §04.
 */
const ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
};

export function SocialLinks() {
  return (
    <ContactSection
      id="social-links"
      index="08"
      kicker={socialLinks.eyebrow}
      title={socialLinks.title}
      lead={socialLinks.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {socialLinks.items.map((link) => (
          <Card
            key={link.id}
            as="a"
            interactive
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.accessibleName}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Icon
                  icon={ICONS[link.id] ?? Github}
                  size="sm"
                  className="text-signal"
                />
                <Text variant="label" tone="ink" as="h3">
                  {link.label}
                </Text>
              </span>
              <Icon
                icon={ArrowUpRight}
                size="sm"
                className="text-mute"
                aria-hidden
              />
            </div>
            <Text
              variant="small"
              tone="graphite"
              className="mt-1 font-mono break-all"
            >
              {link.value}
            </Text>
          </Card>
        ))}
      </Grid>
    </ContactSection>
  );
}
