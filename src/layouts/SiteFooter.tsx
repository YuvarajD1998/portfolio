import { Github, Linkedin, Mail } from 'lucide-react';

import { Icon } from '@/components/icons';
import { NavGroup, NavItem } from '@/components/navigation';
import { Footer } from '@/components/navigation/Footer';
import { Link, Text } from '@/components/typography';
import { footerColumns } from '@/config/navigation';
import { siteConfig } from '@/config/site';

/**
 * SiteFooter — the site's index of record (Sprint 03 §07, P06 §04).
 *
 * Composes the Sprint 02 Footer shell with data-driven NavGroups (every page is
 * reachable here), a social row, and a quiet meta row carrying copyright,
 * version and theme note. Every region the spec names is present and laid out;
 * final handles, repo URL and copy arrive in a later sprint (S03 §07 DONE).
 */

const SOCIALS = [
  { href: siteConfig.links.github, label: 'GitHub', icon: Github },
  { href: siteConfig.links.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: siteConfig.links.email, label: 'Email', icon: Mail },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <Footer
      columns={
        <>
          {footerColumns.map((column) => (
            <NavGroup key={column.title} title={column.title}>
              {column.links.map((link) => (
                <li key={link.href}>
                  <NavItem href={link.href}>{link.label}</NavItem>
                </li>
              ))}
            </NavGroup>
          ))}
          <NavGroup title="Elsewhere">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  variant="quiet"
                  className="text-graphite hover:text-signal text-small inline-flex items-center gap-2"
                >
                  <Icon icon={social.icon} size="sm" aria-hidden />
                  {social.label}
                </Link>
              </li>
            ))}
          </NavGroup>
        </>
      }
      meta={
        <>
          <Text variant="label" tone="mute" as="span">
            &copy; {year} {siteConfig.name} · {siteConfig.role}
          </Text>
          <Text variant="label" tone="mute" as="span">
            Datum v1.0 · Light &amp; dark
          </Text>
        </>
      }
    />
  );
}
