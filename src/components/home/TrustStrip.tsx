import { Frame, Section } from "@/components/layout"
import { googleListings } from "@/data/business"

/**
 * The three claims we can actually stand behind, set as figures.
 *
 * Only claims we can stand behind: 2010 is when he started trading (the
 * company was registered in 2018), and installations are "thousands" because
 * no exact count exists. A precise number here would be the easiest thing on
 * the site to disprove — so "thousands" is set as a word in the same slot a
 * numeral would occupy, rather than being dressed up as a fake figure.
 *
 * Why figures rather than the single sentence this used to be: the sentence
 * carried the same three facts, but set as running prose between a full-bleed
 * hero and a dark section it read as a caption for the photograph above it.
 * The page's own best device is the big specification numeral in Featured
 * Work; using it here too means the first thing after the hero is the proof,
 * and the two sections now rhyme instead of each inventing a treatment.
 *
 * Deliberately NOT boxed cards. Three figures separated by rules on the same
 * field read as one statement in three parts; three bordered boxes read as a
 * stat widget, and the divider carries the grouping just as well.
 */
const claims = [
  {
    figure: "2010",
    label: "Installing since",
    /** Registered 2018 — never put "registered" next to this number. */
    note: null,
  },
  {
    figure: "Thousands",
    label: "Of systems fitted",
    note: null,
  },
] as const

export function TrustStrip() {
  const { rating, reviewCount, url } = googleListings.main

  return (
    <Section rhythm="tight" className="border-b border-hairline">
      <Frame width="wide">
        {/*
          Baseline-aligned row, dividing rules between items rather than around
          them. `divide-x` would also put a rule after the last item on some
          wrap configurations; explicit border-l on all but the first is
          predictable at every breakpoint.
        */}
        <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-3">
          {claims.map((claim) => (
            <div key={claim.label} className="pr-6">
              <dd className="font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-canopy">
                {claim.figure}
              </dd>
              {/* Label under the figure, not above it: the numeral is the
                  thing being read first, and a label on top turns it into a
                  caption for text that has not arrived yet. */}
              <dt className="text-meta mt-2 text-ink-soft">{claim.label}</dt>
            </div>
          ))}

          {/*
            The rating is the only claim a visitor can independently verify, so
            it is the only one that links out. It sits in the same figure slot
            as the other two so the row reads as one scale of evidence.
          */}
          <div className="col-span-2 border-t border-hairline pt-6 sm:col-span-1 sm:border-0 sm:pt-0">
            <dd className="font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-canopy">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-hairline decoration-2 underline-offset-[8px] transition-colors hover:decoration-signal-dark"
              >
                {rating.toFixed(1)}
              </a>
            </dd>
            <dt className="text-meta mt-2 text-ink-soft">
              On Google, from {reviewCount} reviews
            </dt>
          </div>
        </dl>
      </Frame>
    </Section>
  )
}
