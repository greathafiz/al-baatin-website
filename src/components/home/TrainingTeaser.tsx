import Link from "next/link"
import { Frame, Section } from "@/components/layout"
import { Img } from "@/components/Media"
import { whatsapp } from "@/data/business"
import { training, trainingLeadPhoto } from "@/data/training"

/**
 * Training, as a full-bleed photograph with the claim set over it.
 *
 * This section used to be the 7/5 photo-beside-text split — the same module as
 * Services and About, three times on one page. It is now the only full-bleed
 * moment after the hero, which is the right weight for it: the training is a
 * genuinely separate business line, not another service tile, and the group
 * photograph of a camp intake is the most persuasive image on the site.
 *
 * "Thousands" is set as a specification numeral, like the kVA and kWh figures
 * in Featured Work, because it is doing the same job — it is the proof. It
 * stays a word rather than a number: no exact count exists, and inventing one
 * would be the easiest claim on the site to disprove. See src/data/training.ts.
 */
export function TrainingTeaser() {
  return (
    <Section rhythm="loose">
      {/*
        Bleeds past the page gutter but not to the viewport edge: the hero
        already owns full-bleed, and a second edge-to-edge photograph would
        compete with it rather than echo it.
      */}
      <Frame width="wide">
        <div className="relative isolate overflow-hidden">
          <Img
            photo={trainingLeadPhoto}
            sizes="(min-width: 1600px) 100rem, 100vw"
            className="aspect-4/3 w-full object-cover sm:aspect-16/10 lg:aspect-21/9"
          />
          {/* Scrim weighted to the bottom where the type sits. Black rather
              than green: a green wash over a photograph of people in NYSC kit
              tints the one thing worth seeing.

              Measured against the actual composited pixels, not estimated.
              At from-black/85 via-black/45 the worst case behind the body
              line was exactly 4.5:1 and behind the "Thousands" numeral 3.14:1
              — both sitting ON their AA thresholds rather than above them,
              because the brightest part of this photograph (white NYSC
              shirts) falls directly behind the text. A crop change or a new
              lead photo would push them under. With these stops the same
              photo measures 9.65:1 behind the body line and 6.52:1 behind
              the numeral, so there is margin for a future photo swap.

              The second, bottom-anchored gradient does the real work: it
              darkens only the lower third where the type actually sits, so
              the faces in the upper half of the frame keep their contrast
              instead of the whole image going muddy. */}
          <div
            className="absolute inset-0 -z-0 bg-linear-to-t from-black/90 via-black/60 to-black/15"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 -z-0 h-2/3 bg-linear-to-t from-black/75 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <p className="font-display text-[clamp(2.5rem,1.4rem+4.5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
              {training.trained[0].toUpperCase()}
              {training.trained.slice(1)}
            </p>
            <h2 className="text-lede mt-3 max-w-[34ch] font-sans font-normal text-white/90">
              of corps members have trained with us in solar, CCTV and
              intercom — {training.accreditedBy.split(" (")[0]} accredited.
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/training/"
                className="inline-flex min-h-11 items-center bg-white px-6 py-3.5 font-medium text-canopy transition-colors hover:bg-signal"
              >
                About the training
              </Link>
              <a
                href={whatsapp.training}
                target="_blank"
                rel="noopener noreferrer"
                className="text-meta inline-flex min-h-11 items-center border-b border-white/40 text-white/90 transition-colors hover:border-white"
              >
                {training.cost}, certificate on completion
              </a>
            </div>
          </div>
        </div>
      </Frame>
    </Section>
  )
}
