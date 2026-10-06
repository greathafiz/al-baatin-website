import { Frame, Section } from "@/components/layout"

/**
 * Numbered because this genuinely is a sequence — you cannot be installed
 * before you are surveyed. Numbers on an unordered list would be decoration.
 */
const steps = [
  {
    title: "Consultation",
    body: "Tell us what you run and how long you need it to last.",
  },
  {
    title: "Site visit",
    body: "We look at the roof, the wiring and where the batteries will sit, then confirm the cost.",
  },
  {
    title: "Installation",
    body: "Our own crew fits and wires the system, then tests it with you watching.",
  },
  {
    title: "Aftercare",
    body: "We service what we install and carry spares for the brands we fit.",
  },
]

export function HowItWorks() {
  return (
    <Section rhythm="normal" className="border-y border-hairline bg-bone-deep">
      <Frame width="wide">
        <h2 className="text-title max-w-[18ch] font-semibold">How a job runs</h2>

        <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-canopy pt-5">
              <p className="font-display text-3xl font-semibold text-canopy/25">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-canopy">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[30ch] text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Frame>
    </Section>
  )
}
