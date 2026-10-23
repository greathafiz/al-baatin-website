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
  // Tailwind's stylesheet is ~9KB compressed. Inlining it removes the one
  // render-blocking request between the HTML and first paint — a full round
  // trip on the slow mobile connections most of this audience is on.
  experimental: { inlineCss: true },
}

export default nextConfig
