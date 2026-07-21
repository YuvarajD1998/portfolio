'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  Logo,
  MobileNav,
  NavigationBar,
  NavItem,
  NavToggle,
} from '@/components/navigation';
import { Header } from '@/components/navigation/Header';
import { Link } from '@/components/typography';
import { Button } from '@/components/ui';
import { ThemeToggle } from '@/components/utility';
import { primaryNav, resumeNav, routes } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { isActivePath } from '@/lib/active-path';
import { cn } from '@/lib/cn';

const MOBILE_PANEL_ID = 'mobile-nav';

/**
 * SiteHeader — the production top bar of the application shell (Sprint 03 §05).
 *
 * Composes the Sprint 02 navigation primitives — Logo, NavigationBar, NavItem,
 * MobileNav, NavToggle — with the ThemeToggle and a Resume CTA, into the one
 * header every route reuses. It is data-driven (reads `primaryNav`) and derives
 * the active item from the real path, so a new route needs no change here.
 *
 * Behaviours (P06 §04): sticky, and it hides on scroll-down / reveals on
 * scroll-up so it is present when wanted and out of the way while reading. The
 * reveal is disabled under reduced motion — the bar simply stays pinned.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reducedMotion = useReducedMotion();
  const lastY = useRef(0);

  // Hide on scroll-down past the header, reveal on scroll-up (P06 §04).
  useEffect(() => {
    if (reducedMotion) {
      setHidden(false);
      return;
    }
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      // Never hide while at the very top or while the mobile panel is open.
      setHidden(goingDown && y > 96 && !mobileOpen);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion, mobileOpen]);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const logo = <Logo label={siteConfig.name} href={routes.home.href} />;

  return (
    <div
      className={cn(
        'z-nav sticky top-0 transition-transform duration-[var(--dur-standard)] ease-[var(--ease-datum)]',
        hidden ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <Header
        sticky={false}
        left={
          <>
            {logo}
            <NavigationBar label="Primary" className="hidden md:block">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavItem
                    href={item.href}
                    current={isActivePath(pathname, item.href)}
                  >
                    {item.label}
                  </NavItem>
                </li>
              ))}
            </NavigationBar>
          </>
        }
        right={
          <>
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href={resumeNav.href} variant="quiet">
                {resumeNav.label}
              </Link>
            </Button>
            <ThemeToggle />
            {/* Mobile panel: the Drawer supplies focus trap + Esc dismissal. */}
            <div className="md:hidden">
              <MobileNav
                trigger={
                  // NavToggle owns the toggle (it does not forward Radix's
                  // injected onClick), so we lift the open state here; the
                  // Drawer is driven purely by `open`/`onOpenChange`.
                  <NavToggle
                    open={mobileOpen}
                    onToggle={() => setMobileOpen((o) => !o)}
                    controls={MOBILE_PANEL_ID}
                  />
                }
                title="Menu"
                open={mobileOpen}
                onOpenChange={setMobileOpen}
              >
                {[...primaryNav, resumeNav].map((item) => (
                  <li key={item.href}>
                    <NavItem
                      href={item.href}
                      current={isActivePath(pathname, item.href)}
                      className="text-body flex min-h-11 items-center py-2.5"
                    >
                      {item.label}
                    </NavItem>
                  </li>
                ))}
              </MobileNav>
            </div>
          </>
        }
      />
    </div>
  );
}
