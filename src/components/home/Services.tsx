import { Frame, Section } from "@/components/layout"
import { Img } from "@/components/Media"
import { brands } from "@/data/business"
import { services } from "@/data/services"

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
          cannot arrive as five mismatched rasters from a logo scraper.
        */}
        <div className="mt-14 border-t border-bone/20 pt-8 md:mt-20">
          <h3 className="text-meta text-bone/60">Brands we fit</h3>
          <ul className="mt-5 flex flex-wrap items-baseline gap-x-10 gap-y-3 md:gap-x-16">
            {brands.map((brand) => (
              <li
                key={brand}
                className="font-display text-2xl font-semibold tracking-tight text-bone/90 md:text-3xl"
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>

        {/* This heading used to be sr-only, which left the list with nothing to
            introduce it on screen — the first row read as a continuation of the
            brand names above. It is now a visible label, set exactly like
            "Brands we fit" so the two bands are obviously siblings.
            No second rule: the brand band already draws one, and two hairlines
            a few lines apart read as a mistake rather than a divide. */}
        <h3 className="text-meta mt-16 text-bone/60">Also installed and serviced</h3>
        <ul className="mt-5 grid gap-x-12 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((service) => (
            <li key={service.slug} className="text-lede text-bone/80">
              {service.title}
            </li>
          ))}
        </ul>
      </Frame>
    </Section>
  )
}
