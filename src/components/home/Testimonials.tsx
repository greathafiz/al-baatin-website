import { Frame, Section } from "@/components/layout"
import { googleListings } from "@/data/business"
import { testimonials } from "@/data/testimonials"

/**
 * One quote at full size, not six cards.
 *
 * Google gives no town and no project type, and the quotes are short. Six
 * sparse cards looked padded; one quote set large reads as confidence, and the
 * rating links out so visitors can check the rest themselves.
 */
export function Testimonials() {
  const lead = testimonials[0]
  const { rating, reviewCount, url } = googleListings.main

  return (
    <Section rhythm="loose">
      <Frame width="default">
        <figure>
          <blockquote className="text-title font-display font-semibold text-canopy">
            &ldquo;{lead.quote}&rdquo;
          </blockquote>
          <figcaption className="text-meta mt-8 text-ink-soft">
            {lead.name}
            {lead.context ? ` — ${lead.context}` : ""}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex min-h-11 items-center underline underline-offset-4 transition-colors hover:text-canopy"
            >
              {rating.toFixed(1)} from {reviewCount} reviews on Google
            </a>
          </figcaption>
        </figure>
      </Frame>
    </Section>
  )
}
