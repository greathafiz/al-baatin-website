import { brands } from "@/data/business"
import { services } from "@/data/services"
import { Img } from "../Media"
import { Container, SectionHeading } from "../ui"

/**
 * Solar leads at full width with the only photograph; the other eight sit in a
 * plain list beneath it.
 *
 * This asymmetry is honest rather than decorative: solar is the business, and
 * we have no photography of the CCTV, intercom, tracking or satellite work.
 * Equal cards with stock icons would imply a parity of evidence we do not have.
 */
export function Services() {
  const [lead, ...rest] = services

  return (
    <section id="services" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <SectionHeading>What we install</SectionHeading>

        <div className="mt-8 grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-3">
            {lead.photo ? (
              <Img
                photo={lead.photo}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="aspect-4/3 w-full rounded-sm object-cover"
              />
            ) : null}
            <h3 className="mt-5 font-display text-2xl font-semibold text-canopy">
              {lead.title}
            </h3>
            <p className="mt-2 max-w-prose text-ink-soft">{lead.blurb}</p>
            <p className="mt-4 text-sm text-ink-soft">
              We mostly fit {brands.slice(0, -1).join(", ")} and{" "}
              {brands.at(-1)} equipment.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="sr-only">Other services</h3>
            <ul className="divide-y divide-hairline border-t border-hairline">
              {rest.map((service) => (
                <li key={service.slug} className="py-4">
                  <p className="font-medium text-canopy">{service.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{service.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
