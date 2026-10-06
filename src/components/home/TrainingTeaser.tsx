import Link from "next/link"
import { Frame, Section } from "@/components/layout"
import { Img } from "@/components/Media"
import { training, trainingLeadPhoto } from "@/data/training"

export function TrainingTeaser() {
  return (
    <Section rhythm="loose">
      <Frame width="wide">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Img
              photo={trainingLeadPhoto}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-4/3 w-full object-cover"
            />
          </div>

          <div className="md:col-span-5">
            <h2 className="text-title font-semibold">We train corps members</h2>
            <p className="text-lede mt-5 max-w-[32ch] text-ink-soft">
              NYSC SAED accredited, in solar, CCTV and intercom. {training.trained[0].toUpperCase()}
              {training.trained.slice(1)} have trained with us.
            </p>
            <p className="text-meta mt-4 max-w-[32ch] text-ink-soft">
              {training.cost}, certificate on completion. No fixed timetable —
              classes start when you are ready.
            </p>
            <Link
              href="/training/"
              className="text-lede mt-8 inline-flex min-h-11 items-center border-b border-canopy/30 text-canopy transition-colors hover:border-canopy"
            >
              About the training
            </Link>
          </div>
        </div>
      </Frame>
    </Section>
  )
}
