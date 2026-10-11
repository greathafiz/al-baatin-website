import { Frame, Section } from "@/components/layout"
import { googleListings } from "@/data/business"
import { testimonials } from "@/data/testimonials"

/**
 * One quote large, the rest as a running column.
 *
 * The previous pass showed `testimonials[0]` and dropped the other five. The
 * reasoning — that six sparse cards looked padded — was right about the cards
 * and wrong about the remedy: Google gives no town and no project type, so six
 * equal boxes each holding one short line is mostly empty box. But five real
 * reviews are the strongest evidence on the page and throwing them away to
 * avoid a layout problem is the wrong trade.
 *
 * So the lead quote keeps its full display size, and the others run beneath it
 * as plain text in a narrow column — a review column, not a card grid. Short
 * quotes look correct there, because a column of short lines reads as a list
 * of people agreeing, which is exactly what it is.
 *
 * This section also sits on the canopy field now. It used to be the only
 * section with no background and no image on a page where both neighbours are
 * full-bleed, which made it read as a gap between two sections rather than a
 * section. Dark also lets the lead quote carry real weight without competing
 * with the photographs above and below it.
 *
 * Quotes are reproduced exactly, including their original punctuation and
 * capitalisation — they are someone else's words. See src/data/testimonials.ts.
 */
export function Testimonials() {
  const [lead, ...rest] = testimonials
  const { rating, reviewCount, url } = googleListings.main

  return (
    <Section rhythm="loose" className="bg-canopy text-bone">
      <Frame width="wide">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <figure className="md:col-span-7">
            {/* No decorative quote marks: the typographic quotes are in the
                content, and an oversized glyph behind the text is chrome. */}
            <blockquote className="text-title font-display font-semibold text-white">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="text-meta mt-8 text-bone/70">
              {lead.name}
              {lead.context ? ` — ${lead.context}` : ""}
            </figcaption>
          </figure>

          <div className="md:col-span-5">
            {/*
              The remaining reviews. Rules between them rather than around
              them, so the column reads as one continuous list instead of five
              stacked cards.
            */}
            <ul>
              {rest.map((item) => (
                <li
                  key={item.name}
                  className="border-t border-bone/15 py-5 first:border-0 first:pt-0"
                >
                  <p className="text-bone/90">&ldquo;{item.quote}&rdquo;</p>
                  <p className="text-meta mt-2 text-bone/55">
                    {item.name}
                    {item.context ? ` — ${item.context}` : ""}
                  </p>
                </li>
              ))}
            </ul>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-meta mt-6 inline-flex min-h-11 items-center border-b border-bone/30 text-bone/80 transition-colors hover:border-bone hover:text-white"
            >
              All {reviewCount} reviews, {rating.toFixed(1)} on Google
            </a>
          </div>
        </div>
      </Frame>
    </Section>
  )
}
