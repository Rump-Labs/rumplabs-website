/**
 * Canonical origin for the site. Single source of truth for metadata,
 * robots, sitemap and every JSON-LD @id — do not hardcode it elsewhere.
 *
 * www is primary: the apex (rumplabs.xyz) has a DNS record but no working
 * certificate, so it does not serve. If the apex is ever added in Vercel and
 * www redirected to it, change this one constant and everything follows.
 */
export const SITE = "https://www.rumplabs.xyz";
