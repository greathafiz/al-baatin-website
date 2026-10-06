import type { MetadataRoute } from "next"
import { SITE_URL } from "@/data/site"

// Required for `output: "export"` — emits out/robots.txt at build time.
export const dynamic = "force-static"

/** Everything here is public — there is nothing on the site to hide from crawlers. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
