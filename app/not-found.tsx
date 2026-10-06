import Link from "next/link"
import { Frame, Section } from "@/components/layout"

export default function NotFound() {
  return (
    <Section rhythm="loose">
      <Frame width="wide">
        <p className="text-spec font-display font-semibold text-canopy/15">404</p>
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
