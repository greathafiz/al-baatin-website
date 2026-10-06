import Link from "next/link"
import { Frame, Section } from "@/components/layout"
import { Img } from "@/components/Media"
import { projects } from "@/data/projects"
import { isPortrait } from "@/lib/media"

/**
 * The work, as a record.
 *
 * Each job is a full-width entry: a large photograph with its real number set
 * in display type beside it. The specs ARE the argument — 45kWh of storage
 * says more to someone comparing quotes than any adjective would, so the
 * figure is the headline rather than a line of grey text in a spec list.
 *
 * Entries alternate sides so the page has a rhythm instead of one repeated card.
 */
const entries = [
  {
    slug: "daffodil-gardens-estate-lagos",
    figure: "45",
    unit: "kWh",
    note: "of storage across three batteries, on a new-build duplex",
  },
  {
    slug: "rhema-chapel-lekki-lagos",
    figure: "24",
    unit: "panels",
    note: "15.6kWp across one church roof in Lekki",
  },
  {
    slug: "oasis-integrated-farms",
    figure: "12",
    unit: "kVA",
    note: "hybrid system keeping a working farm running",
  },
]

export function FeaturedWork() {
  return (
    <Section id="work" rhythm="loose">
      <Frame width="wide">
        <h2 className="text-title max-w-[18ch] font-semibold">
          Systems we have built
        </h2>
      </Frame>

      <div className="mt-14 space-y-20 md:mt-20 md:space-y-32">
        {entries.map((entry, i) => {
          const project = projects.find((p) => p.slug === entry.slug)!
          const photo = project.photos[0]
          const flip = i % 2 === 1

          /**
           * Let the photograph keep its own shape.
           *
           * The Oasis inverter photo is 720×1280 — a tall wall stack: inverter
           * at the top, breakers in the middle, battery on the floor. Forcing
           * it into a 16:10 landscape box threw away about 70% of the height,
           * so whichever focal point we picked, the frame showed one slice and
           * cut off either the inverter or the battery. The full stack is the
           * thing worth seeing, so portrait sources get a portrait box and the
           * column narrows to stop it towering over the page.
           */
          const portrait = isPortrait(photo.key)
          const mediaCols = portrait ? "md:col-span-5" : "md:col-span-8"
          const textCols = portrait ? "md:col-span-6" : "md:col-span-4"
          const ratio = portrait
            ? "aspect-3/4"
            : "aspect-4/3 md:aspect-16/10"

          return (
            <article key={entry.slug}>
              <Frame width="wide">
                <div
                  className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 ${
                    flip ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div
                    className={`${mediaCols} ${flip ? "md:[direction:ltr]" : ""}`}
                  >
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="block overflow-hidden"
                    >
                      <Img
                        photo={photo}
                        sizes={
                          portrait
                            ? "(min-width: 768px) 40vw, 100vw"
                            : "(min-width: 768px) 66vw, 100vw"
                        }
                        className={`${ratio} w-full object-cover transition-transform duration-500 hover:scale-[1.02]`}
                      />
                    </Link>
                  </div>

                  <div
                    className={`${textCols} ${flip ? "md:[direction:ltr]" : ""}`}
                  >
                    <p className="text-spec font-display font-semibold text-canopy">
                      {entry.figure}
                      <span className="text-title align-baseline font-display font-normal text-ink-soft">
                        {entry.unit}
                      </span>
                    </p>
                    <p className="text-lede mt-3 max-w-[30ch] text-ink">
                      {entry.note}
                    </p>
                    <p className="text-meta mt-6 border-t border-hairline pt-3 text-ink-soft">
                      {project.title}
                      {project.location ? `, ${project.location}` : ""}
                    </p>
                  </div>
                </div>
              </Frame>
            </article>
          )
        })}
      </div>

      <Frame width="wide" className="mt-14 md:mt-20">
        <Link
          href="/projects/"
          className="text-lede inline-flex min-h-11 items-center border-b border-canopy/30 text-canopy transition-colors hover:border-canopy"
        >
          All projects
        </Link>
      </Frame>
    </Section>
  )
}
