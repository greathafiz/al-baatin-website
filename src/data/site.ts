/**
 * The canonical origin, with no trailing slash.
 *
 * Used by the sitemap, robots.txt, Open Graph URLs and the JSON-LD `@id`, so
 * if it is wrong search engines index the wrong host.
 *
 * Set NEXT_PUBLIC_SITE_URL in .env.local to override. The fallback is the
 * domain we expect him to buy — still a PLACEHOLDER until that is confirmed.
 */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()

export const SITE_URL = (configured || "https://albaatintechnologies.com")
  // A trailing slash here would produce "https://site.com//projects/".
  .replace(/\/+$/, "")
