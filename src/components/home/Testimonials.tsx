import { googleListings } from "@/data/business"
import { testimonials } from "@/data/testimonials"
import { Container, SectionHeading } from "../ui"

/**
 * Scroll-snap on mobile, grid on desktop.
 *
 * A native scroller rather than a JS carousel: it is keyboard-scrollable and
 * swipeable for free, needs no client JS, and has no hidden slides for screen
 * readers to trip over.
 *
 * Google gives no town and no project type, so cards show only what we know.
 * The rating links out so visitors can check the reviews themselves.
 */
export function Testimonials() {
  const { rating, reviewCount, url } = googleListings.main

  return (
    <section className="bg-canopy py-16 text-bone md:py-24">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <SectionHeading className="text-white">
            What customers say
          </SectionHeading>
          <p className="text-sm text-bone/75">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              {rating.toFixed(1)} from {reviewCount} Google reviews
            </a>
          </p>
        </div>

        <ul
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
          tabIndex={0}
          aria-label="Customer reviews"
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="w-[85%] shrink-0 snap-start border-t border-bone/25 pt-5 md:w-auto"
            >
              <blockquote className="font-display text-lg leading-snug text-bone">
                {t.quote}
              </blockquote>
              <p className="mt-4 text-sm font-medium text-white">{t.name}</p>
              {t.context ? (
                <p className="text-sm text-bone/70">{t.context}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
