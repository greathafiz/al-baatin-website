import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages: `next build` writes to out/
  output: "export",
  // No image optimisation server on static hosting; media is pre-sized by
  // scripts/optimize-media.mjs instead.
  images: { unoptimized: true },
  // Emit /projects/index.html rather than /projects.html so Cloudflare Pages
  // serves clean URLs without redirect hops.
  trailingSlash: true,
}

export default nextConfig
