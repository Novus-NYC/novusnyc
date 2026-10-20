// Canonical public URL for this site.
//
// www is canonical: DNS/Vercel 301 the apex (novusnyc.org) to www.novusnyc.org,
// so this must use www or every canonical tag and og:url costs an extra hop.
//
// Override via NEXT_PUBLIC_SITE_URL in .env.local / Vercel env vars — but only
// a novusnyc.org host or localhost is a valid canonical. A stale override once
// put a retired domain into the sitemap, robots.txt and the JSON-LD `url` field.
const CANONICAL_URL = "https://www.novusnyc.org";

const ALLOWED_OVERRIDE_HOSTS = new Set(["www.novusnyc.org", "localhost", "127.0.0.1"]);

function resolveSiteUrl(): string {
  const override = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!override) return CANONICAL_URL;
  try {
    if (!ALLOWED_OVERRIDE_HOSTS.has(new URL(override).hostname.toLowerCase())) {
      return CANONICAL_URL;
    }
    return override.replace(/\/$/, "");
  } catch {
    return CANONICAL_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

export const SITE_HOSTNAME = new URL(SITE_URL).hostname;
