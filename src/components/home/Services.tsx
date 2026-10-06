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
            <p className="text-meta mt-6 max-w-[34ch] text-bone/60">
              We mostly fit {brands.slice(0, -1).join(", ")} and {brands.at(-1)}{" "}
              equipment.
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

        <h3 className="sr-only">Other services</h3>
        <ul className="mt-16 grid gap-x-12 gap-y-5 border-t border-bone/20 pt-10 sm:grid-cols-2 lg:grid-cols-3">
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
