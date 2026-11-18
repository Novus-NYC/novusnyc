import { SITE_SHOT_SLUGS } from "@/data/siteShots";

export function siteHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function siteShotFor(url?: string): string | undefined {
  if (!url) return undefined;
  const slug = siteHost(url).replace(/[^a-zA-Z0-9]/g, "-");
  return slug && SITE_SHOT_SLUGS.has(slug) ? `/site-shots/${slug}.webp` : undefined;
}
