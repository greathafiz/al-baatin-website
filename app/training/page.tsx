import type { Metadata } from "next"
import { Clip, Img } from "@/components/Media"
import { Frame, Section } from "@/components/layout"
import { WhatsAppIcon } from "@/components/ui"
import { whatsapp } from "@/data/business"
import { training, trainingPhotos, trainingVideos } from "@/data/training"

export const metadata: Metadata = {
  title: "Solar and CCTV training",
  description:
    "NYSC SAED accredited training in solar installation, CCTV and intercom systems. ₦100,000 for the full year, certificate on completion.",
}

export default function TrainingPage() {
  return (
    <Section rhythm="normal">
      <Frame width="wide">
        <h1 className="text-display max-w-[16ch] font-semibold">
          {training.title}
        </h1>
        <p className="text-lede mt-6 max-w-[48ch] text-ink-soft">
          Al-Baatin is accredited by NYSC SAED to teach solar installation,
          CCTV and intercom systems. {training.trained[0].toUpperCase()}
          {training.trained.slice(1)} of corps members have trained with us, in
          camp and through the service year.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-3">
            <Img
              photo={trainingPhotos[0]}
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="aspect-4/3 w-full object-cover"
            />

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="font-display text-xl font-semibold text-canopy">
                  In camp
                </h2>
                <p className="mt-2 text-ink-soft">{training.campProgramme}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-canopy">
                  After camp
                </h2>
                <p className="mt-2 text-ink-soft">{training.fullProgramme}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-canopy">
                  When classes start
                </h2>
                <p className="mt-2 text-ink-soft">{training.schedule}</p>
              </section>
            </div>
          </div>

          <aside className="md:col-span-2">
            <div className="border-t border-canopy pt-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-meta text-ink-soft">Cost</dt>
                  <dd className="font-display text-2xl font-semibold text-canopy">
                    {training.cost}
                  </dd>
                </div>
                <div>
                  <dt className="text-meta text-ink-soft">What you learn</dt>
                  <dd className="mt-1 text-ink">
                    {training.skills.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-meta text-ink-soft">Open to</dt>
                  <dd className="mt-1 text-ink">{training.openTo}</dd>
                </div>
                <div>
                  <dt className="text-meta text-ink-soft">On completion</dt>
                  <dd className="mt-1 text-ink">Certificate issued</dd>
                </div>
                <div>
                  <dt className="text-meta text-ink-soft">Camp</dt>
                  <dd className="mt-1 text-ink">{training.camp}</dd>
                </div>
              </dl>

              <a
                href={whatsapp.training}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-canopy px-7 py-4 font-medium text-white transition-colors hover:bg-signal-dark"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Ask about training
              </a>
            </div>
          </aside>
        </div>

        <h2 className="text-title mt-20 font-semibold">
          From the classes
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {trainingPhotos.slice(1).map((photo) => (
            <Img
              key={photo.key}
              photo={photo}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="aspect-3/4 w-full object-cover"
            />
          ))}
        </div>

        {trainingVideos.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {trainingVideos.map((clip) => (
              <Clip key={clip.key} clip={clip}  />
            ))}
          </div>
        ) : null}
      </Frame>
    </Section>
  )
}
