import { Frame, Section } from "@/components/layout"
import { ContactForm } from "../ContactForm"
import { WhatsAppIcon } from "../ui"
import {
  addresses,
  business,
  phones,
  serviceAreas,
  whatsapp,
} from "@/data/business"

export function Contact() {
  return (
    <Section id="contact" rhythm="loose" className="bg-canopy text-bone">
      <Frame width="wide">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <h2 className="text-display max-w-[14ch] font-semibold text-white">
              Tell us what you run
            </h2>
            <p className="text-lede mt-6 max-w-[38ch] text-bone/75">
              Send a photo of your meter board and we can size a system before
              we ever visit.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={whatsapp.quote}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-signal px-7 py-4 font-medium text-canopy transition-colors hover:bg-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${phones[0].dial}`}
                className="inline-flex items-center border border-bone/30 px-7 py-4 font-medium text-bone transition-colors hover:border-bone"
              >
                Call {phones[0].number}
              </a>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-meta text-bone/60">All our numbers</h3>
                <ul className="mt-2 space-y-1">
                  {phones.map((phone) => (
                    <li key={phone.dial}>
                      <a
                        href={`tel:${phone.dial}`}
                        className="text-bone/90 transition-colors hover:text-white"
                      >
                        {phone.number}
                      </a>
                      {phone.primary ? (
                        <span className="text-meta ml-2 text-bone/50">
                          WhatsApp
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>

                <h3 className="text-meta mt-6 text-bone/60">Email</h3>
                <a
                  href={`mailto:${business.email}`}
                  className="mt-1 inline-block break-all text-bone/90 transition-colors hover:text-white"
                >
                  {business.email}
                </a>
              </div>

              <div>
                {addresses.map((address) => (
                  <div key={address.label} className="mb-5 last:mb-0">
                    <h3 className="text-meta text-bone/60">{address.label}</h3>
                    <address className="mt-1 text-sm not-italic text-bone/85">
                      {address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-meta mt-8 max-w-[44ch] text-bone/60">
              Nationwide, most often in {serviceAreas.slice(0, -1).join(", ")}{" "}
              and {serviceAreas.at(-1)}.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ContactForm />
          </div>
        </div>
      </Frame>
    </Section>
  )
}
