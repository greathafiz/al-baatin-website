import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { SITE_URL } from "@/data/site"

// Required for `output: "export"` — emits out/sitemap.xml at build time.
export const dynamic = "force-static"

/**
 * Static sitemap. `output: "export"` writes this to out/sitemap.xml at build
 * time, so it costs nothing at runtime and stays in step with the project list
 * automatically — adding a folder to content/projects puts it in the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/training/`, changeFrequency: "yearly", priority: 0.7 },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}/`,
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...pages, ...projectPages]
}
