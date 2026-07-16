import { Container, Divider, Flex, Text } from '@/components/primitives';
import { siteConfig } from '@/config/site';

/**
 * SiteFooter — the spec-sheet title block (Bible §09 Footer).
 *
 * A restrained placeholder for Sprint 01: a hairline top rule, mono
 * coordinates and a quiet signature. Link columns arrive with real pages in a
 * later sprint. Ends the shell like a spec sheet's title block.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <Divider />
      <Container>
        <Flex justify="between" align="center" wrap gap={4} className="py-8">
          <Text variant="label" tone="mute" as="span">
            {siteConfig.name} · {siteConfig.role}
          </Text>
          <Text variant="label" tone="mute" as="span">
            Datum v1.0 · 0,0
          </Text>
        </Flex>
      </Container>
    </footer>
  );
}
