import { Frame, Section } from "@/components/layout"
import { Img } from "@/components/Media"
import { brands } from "@/data/business"
import { services } from "@/data/services"

/**
 * The brand names, shared by both marquee rows so a type change cannot drift
 * between them. Row 2 is a shade quieter: two rows at identical weight fight
 * each other for the same attention, and row 1 is the one being read.
 */
const brandNameClass =
  "font-display text-base font-semibold tracking-tight text-bone/90 sm:text-lg md:text-2xl lg:text-[1.75rem]"

const brandNameClassQuiet =
  "font-display text-base font-semibold tracking-tight text-bone/45 sm:text-lg md:text-2xl lg:text-[1.75rem]"

/**
 * Row 2 shows the same names starting from the middle of the list, so the two
 * rows never present the same name at the same horizontal position. Without
 * the offset the band reads as one list printed twice; with it, as a deep
 * supply list. Math.floor keeps this correct if a brand is added or removed.
 */
const rotatedBrands = [
  ...brands.slice(Math.floor(brands.length / 2)),
  ...brands.slice(0, Math.floor(brands.length / 2)),
]

/**
 * Solar leads with the only photograph; the other eight are a plain list.
 *
 * The asymmetry is honest rather than decorative. Solar is the business, and
 * we have no photography of the CCTV, intercom, tracking or satellite work —
 * nine equal cards with stock icons would imply a parity of evidence we do
 * not have.
 */
export function Services() {
  const [lead, ...rest] = services

  return (
    <Section id="services" rhythm="loose" className="bg-canopy text-bone">
      <Frame width="wide">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5 md:self-center">
            <h2 className="text-title font-semibold text-white">
              {lead.title}
            </h2>
            <p className="text-lede mt-5 max-w-[34ch] text-bone/75">
              {lead.blurb}
            </p>
          </div>

          <div className="md:col-span-7">
            {lead.photo ? (
              <Img
                photo={lead.photo}
                sizes="(min-width: 768px) 58vw, 100vw"
                className="aspect-4/3 w-full object-cover"
              />
            ) : null}
          </div>
        </div>

        {/*
          Brands, set as type rather than as logos.
          We have no licence to display manufacturers' marks, and showing them
          would imply an authorised-dealer relationship he may not hold. The
          names in the display face carry the same information, cost nothing in
          page weight, survive a brand change (one edit in business.ts) and
          cannot arrive as thirteen mismatched rasters from a logo scraper.

          Two counter-running rows. Thirteen names wrapped into a static block
          read as a grey paragraph of nouns; moving, they read as a supply list,
          and the names can stay large enough to actually be read rather than
          shrinking to fit a line.

          The motion is bounded by the two things that make a marquee usable:
          it pauses on hover and on focus-within, and under
          prefers-reduced-motion it collapses back to the wrapped static rail
          with every name on screen at once. See globals.css.

          Row 2 is offset so the two rows never show the same name at the same
          x-position, which is what would otherwise reveal them as one list
          printed twice.
        */}
        <div className="mt-14 border-t border-bone/20 pt-8 md:mt-20">
          <h3 className="text-meta text-bone/60" id="brands-heading">
            Brands we fit
          </h3>

          {/*
            Negative margin so the band bleeds to the viewport edge while the
            rest of the section keeps its gutter. A marquee that starts and
            stops inside the text column reads as a widget dropped on the page;
            running it to the edges is what makes it read as a band.
          */}
          <div className="brand-marquee mt-5 -mx-5 sm:-mx-8">
            {/* Row 1: the real list, in source order. This is the one
                assistive tech reads — the duplicate and row 2 are hidden. */}
            <ul
              className="brand-marquee-track"
              aria-labelledby="brands-heading"
            >
              {brands.map((brand) => (
                <li key={brand} className={brandNameClass}>
                  {brand}
                </li>
              ))}
              {/* The seamless-loop copy: exact duplicate, hidden from the
                  accessibility tree so the names are not announced twice. */}
              {brands.map((brand) => (
                <li
                  key={`dupe-${brand}`}
                  className={`brand-marquee-dupe ${brandNameClass}`}
                  aria-hidden="true"
                >
                  {brand}
                </li>
              ))}
            </ul>

            {/* Row 2: decorative only. Same names, rotated order, running the
                other way — it carries no information row 1 has not already
                given, so it is hidden entirely rather than repeated to a
                screen reader. */}
            <ul
              className="brand-marquee-track brand-marquee-row-2 mt-3 md:mt-4"
              data-direction="reverse"
              aria-hidden="true"
            >
              {[...rotatedBrands, ...rotatedBrands].map((brand, i) => (
                <li key={`r2-${i}`} className={brandNameClassQuiet}>
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* This heading used to be sr-only, which left the list with nothing to
            introduce it on screen — the first row read as a continuation of the
            brand names above. It is now a visible label, set exactly like
            "Brands we fit" so the two bands are obviously siblings.
            No second rule: the brand band already draws one, and two hairlines
            a few lines apart read as a mistake rather than a divide. */}
        {/*
          The other eight services, each with the line that says what it
          actually covers.

          They were a bare list of titles at text-lede — eight equal nouns
          with no weight, directly beneath a band that now moves, so they were
          the easiest thing on the page to skip. The blurbs already exist in
          src/data/services.ts and were going unused on this page; showing
          them turns a list of words into eight real answers to "do you do X?"

          Rules above each entry rather than boxes around them: these are
          secondary to solar by design (see the note above — we have no
          photography of any of them), and a grid of bordered cards would give
          them the same visual weight as the lead service while still having
          nothing to show.
        */}
        <h3 className="text-meta mt-16 text-bone/60">Also installed and serviced</h3>
        <ul className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((service) => (
            <li key={service.slug} className="border-t border-bone/20 pt-4">
              <h4 className="font-display text-lg font-semibold text-bone">
                {service.title}
              </h4>
              <p className="mt-1.5 text-sm text-bone/65">{service.blurb}</p>
            </li>
          ))}
        </ul>
      </Frame>
    </Section>
  )
}
