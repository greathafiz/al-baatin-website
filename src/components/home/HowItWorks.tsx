import { Container, SectionHeading } from "../ui"

/**
 * Numbered because this genuinely is a sequence — you cannot be installed
 * before you are surveyed. Numbers would be decoration on an unordered list.
 */
const steps = [
  {
    title: "Consultation",
    body: "Tell us what you run and how long you need it to last. We size the system around that, not around a package.",
  },
  {
    title: "Site visit",
    body: "We look at the roof, the wiring and where the batteries will sit, then confirm the cost before anything is ordered.",
  },
  {
    title: "Installation",
    body: "Our own crew fits and wires the system, tests it with you watching, and shows you how to read it.",
  },
  {
    title: "Aftercare",
    body: "Call us if anything changes. We service what we install and carry spares for the brands we fit.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading>How a job runs</SectionHeading>
        <ol className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-canopy pt-4">
              <p className="font-display text-sm font-semibold text-signal-dark">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-canopy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
