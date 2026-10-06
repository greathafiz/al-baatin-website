import type { Metadata } from "next"
import Link from "next/link"
import { Frame, Section } from "@/components/layout"

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 that gets indexed is a 404 that shows up in search results.
  robots: { index: false, follow: true },
  // null, not inherited: without this the 404 carries the root layout's
  // canonical and tells Google this page IS the homepage.
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <Section rhythm="loose">
      <Frame width="wide">
        {/* Decorative only — the heading below carries the actual message. */}
        <p
          aria-hidden="true"
          className="text-spec font-display font-semibold text-canopy/20"
        >
          404
        </p>
        <h1 className="text-display mt-4 max-w-[16ch] font-semibold">
          That page is not here
        </h1>
        <p className="text-lede mt-6 max-w-[44ch] text-ink-soft">
          The link may be out of date. Our work and contact details are both a
          click away.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/"
            className="inline-flex items-center bg-canopy px-7 py-4 font-medium text-white transition-colors hover:bg-signal-dark"
          >
            Back to the homepage
          </Link>
          <Link
            href="/projects/"
            className="text-meta border-b border-hairline pb-1 text-ink transition-colors hover:border-canopy"
          >
            See our work
          </Link>
        </div>
      </Frame>
    </Section>
  )
}
