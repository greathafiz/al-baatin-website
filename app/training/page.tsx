import type { Metadata } from "next"
import { Lightbox, type LightboxItem } from "@/components/Lightbox"
import { Img } from "@/components/Media"
import { Frame, Section } from "@/components/layout"
import { WhatsAppIcon } from "@/components/ui"
import { whatsapp } from "@/data/business"
import {
  certificatePhotos,
  classPhotos,
  training,
  trainingLeadPhoto,
  trainingVideos,
} from "@/data/training"

export const metadata: Metadata = {
  title: "Solar and CCTV training",
  description:
    "NYSC SAED accredited training in solar installation, CCTV and intercom systems. ₦100,000 for the full year, certificate on completion.",
  alternates: { canonical: "/training/" },
  openGraph: { url: "/training/" },
}

export default function TrainingPage() {
  /** Practical photos then class footage, as one run in the viewer. */
  const classGallery: LightboxItem[] = [
    ...classPhotos.map((photo) => ({ kind: "photo", photo }) as const),
    ...trainingVideos.map((clip) => ({ kind: "video", clip }) as const),
  ]

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
              photo={trainingLeadPhoto}
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="aspect-4/3 w-full object-cover"
            />

            <div className="mt-8 space-y-6">
              {/* h3, not h2: these are sub-topics of how the training runs,
                  sitting under the page title. "From the classes" below is the
                  next real h2. A screen reader user navigating by heading
                  should hear the page's shape, not a flat list. */}
              <section>
                <h3 className="font-display text-xl font-semibold text-canopy">
                  In camp
                </h3>
                <p className="mt-2 text-ink-soft">{training.campProgramme}</p>
              </section>

              <section>
                <h3 className="font-display text-xl font-semibold text-canopy">
                  After camp
                </h3>
                <p className="mt-2 text-ink-soft">{training.fullProgramme}</p>
              </section>

              <section>
                <h3 className="font-display text-xl font-semibold text-canopy">
                  When classes start
                </h3>
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
          Training in progress
        </h2>
        {/* Mixed orientations: these are his phone photos, some 384×288
            landscape, some 384×512 portrait. A single forced aspect-3/4 was
            cropping about half out of every landscape shot — including the
            whiteboard lesson, where the whiteboard is the subject. Each photo
            keeps its own shape; the columns keep the grid tidy. */}
        {/* Class photos and class footage in one gallery. The clips used to
            sit in a separate row at the very bottom of the page, after the
            certificates section — so footage of a practical appeared under a
            heading about certificates, and none of it was reachable from the
            viewer. */}
        <Lightbox
          items={classGallery}
          className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          preserveAspect
          sizes="(min-width: 1024px) 25vw, 50vw"
        />

        {/* The certificate is what a corps member leaves with, so it gets its
            own heading rather than sitting among the practicals. */}
        {certificatePhotos.length > 0 ? (
          <>
            <h2 className="text-title mt-20 font-semibold">
              Certificates on completion
            </h2>
            <p className="text-lede mt-4 max-w-[46ch] text-ink-soft">
              Every corps member who finishes the programme is presented with an
              NYSC certificate of participation.
            </p>
            <Lightbox
              photos={certificatePhotos}
              className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
              preserveAspect
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </>
        ) : null}

      </Frame>
    </Section>
  )
}
