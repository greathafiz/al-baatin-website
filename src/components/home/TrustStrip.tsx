import { Frame, Section } from "@/components/layout"
import { googleListings } from "@/data/business"

/**
 * One sentence rather than four boxed stats.
 *
 * Only claims we can stand behind: 2010 is when he started trading (the
 * company was registered in 2018), and installations are "thousands" because
 * no exact count exists. A precise number here would be the easiest thing on
 * the site to disprove.
 */
export function TrustStrip() {
  const { rating, url } = googleListings.main

  return (
    <Section rhythm="tight" className="border-b border-hairline">
      <Frame width="wide">
        <p className="text-title max-w-[22ch] font-display font-semibold text-canopy md:max-w-[44ch]">
          Installing since 2010. Thousands of systems. Rated{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-hairline decoration-2 underline-offset-[6px] transition-colors hover:decoration-signal"
          >
            {rating.toFixed(1)} on Google
          </a>
          .
        </p>
      </Frame>
    </Section>
  )
}
