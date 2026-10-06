import {
  addresses,
  business,
  phones,
  serviceAreas,
  whatsapp,
} from "@/data/business"
import { ContactForm } from "../ContactForm"
import { ButtonAnchor, Container, SectionHeading, WhatsAppIcon } from "../ui"

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-bone-deep py-16 md:py-24">
      <Container>
        <SectionHeading>Get a quote</SectionHeading>
        <p className="text-lede mt-3 max-w-prose text-ink-soft">
          WhatsApp is the fastest way to reach us. Send a photo of your meter
          board or inverter space and we can tell you a lot before visiting.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor
                href={whatsapp.quote}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </ButtonAnchor>
              <ButtonAnchor
                href={`tel:${phones[0].dial}`}
                variant="secondary"
              >
                Call {phones[0].number}
              </ButtonAnchor>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-canopy">
                All our numbers
              </h3>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {phones.map((phone) => (
                  <li key={phone.dial}>
                    <a
                      href={`tel:${phone.dial}`}
                      className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-signal-dark"
                    >
                      {phone.number}
                    </a>
                    {phone.primary ? (
                      <span className="ml-1.5 text-xs text-ink-soft">
                        (WhatsApp)
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-canopy">Email</h3>
              <a
                href={`mailto:${business.email}`}
                className="mt-1 inline-block break-all text-ink underline decoration-hairline underline-offset-4 hover:decoration-signal-dark"
              >
                {business.email}
              </a>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {addresses.map((address) => (
                <div key={address.label}>
                  <h3 className="text-sm font-semibold text-canopy">
                    {address.label}
                  </h3>
                  <address className="mt-1 text-sm not-italic text-ink-soft">
                    {address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-canopy">
                Where we work
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Nationwide, most often in {serviceAreas.slice(0, -1).join(", ")}{" "}
                and {serviceAreas.at(-1)}.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
