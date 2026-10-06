import { business, googleListings } from "@/data/business"
import { Container } from "../ui"

/**
 * Only claims we can actually stand behind.
 *
 * "Since 2010" is when he started trading; the company was registered in 2018.
 * Installations and trainees are "thousands" because no exact count exists —
 * a made-up number here would be the easiest thing on the site to disprove.
 */
const facts = [
  { value: "2010", label: "Serving customers since" },
  { value: "Thousands", label: "Systems installed" },
  { value: "Nationwide", label: "From Ibadan and Lagos" },
  {
    value: googleListings.main.rating.toFixed(1),
    label: `From ${googleListings.main.reviewCount} Google reviews`,
    href: googleListings.main.url,
  },
]

export function TrustStrip() {
  return (
    <section className="border-b border-hairline bg-bone-deep">
      <Container>
        <dl className="grid grid-cols-2 divide-hairline sm:grid-cols-4 sm:divide-x">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col-reverse gap-1 px-1 py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="text-sm text-ink-soft">{fact.label}</dt>
              <dd className="font-display text-2xl font-semibold text-canopy sm:text-3xl">
                {fact.href ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-hairline underline-offset-4 hover:decoration-signal-dark"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="sr-only">
          {business.name}, RC {business.rcNumber}.
        </p>
      </Container>
    </section>
  )
}
