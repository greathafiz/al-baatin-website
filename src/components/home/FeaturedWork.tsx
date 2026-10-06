import { projects } from "@/data/projects"
import { Clip, Img } from "../Media"
import { ButtonLink, Container, SectionHeading } from "../ui"

/**
 * Eight photos and two clips, hand-picked for sharpness rather than pulled in
 * order. Portrait phone shots stay portrait: forcing 18 vertical photos into
 * 16:9 boxes would crop the inverter walls — the actual subject — out of frame.
 * The grid mixes one wide tile with tall ones instead.
 */
const picks = [
  { key: "projects/rhema-chapel-lekki-lagos/02-panels-completed-from-above", span: "wide" },
  { key: "projects/daffodil-gardens-estate-lagos/04-inverter-wall-three-units-angled", span: "tall" },
  { key: "projects/inverter-install-a/01-three-inverters-two-batteries", span: "tall" },
  { key: "projects/daffodil-gardens-estate-lagos/05-crew-on-roof-and-balcony", span: "tall" },
  { key: "projects/rhema-chapel-lekki-lagos/01-solar-array-on-roof", span: "tall" },
  { key: "projects/oasis-integrated-farms/01-hybrid-inverter-and-battery", span: "tall" },
  { key: "projects/inverter-install-c/01-inverter-and-battery", span: "tall" },
  { key: "projects/inverter-install-a/03-roof-crew-mounting-panels", span: "tall" },
] as const

/** Look the photo up in the project data so alt text has one source of truth. */
function findPhoto(key: string) {
  for (const project of projects) {
    const hit = project.photos.find((p) => p.key === key)
    if (hit) return hit
  }
  throw new Error(`Featured photo "${key}" is not in any project.`)
}

function findVideo(key: string) {
  for (const project of projects) {
    const hit = project.videos.find((v) => v.key === key)
    if (hit) return hit
  }
  throw new Error(`Featured video "${key}" is not in any project.`)
}

export function FeaturedWork() {
  const clips = [
    findVideo("projects/daffodil-gardens-estate-lagos/video-01-roof-panels-installed"),
    findVideo("projects/oasis-integrated-farms/video-01-inverter-and-battery"),
  ]

  return (
    <section id="work" className="scroll-mt-20 bg-bone-deep py-16 md:py-24">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <SectionHeading>Recent work</SectionHeading>
          <ButtonLink href="/projects/" variant="quiet" className="px-0 py-0">
            View all projects
          </ButtonLink>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {picks.map((pick) => {
            const photo = findPhoto(pick.key)
            const wide = pick.span === "wide"
            return (
              <figure
                key={pick.key}
                className={wide ? "col-span-2 lg:col-span-2" : ""}
              >
                <Img
                  photo={photo}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className={`w-full rounded-sm object-cover ${
                    wide ? "aspect-4/3 lg:aspect-16/10" : "aspect-3/4"
                  }`}
                />
              </figure>
            )
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {clips.map((clip) => (
            <Clip
              key={clip.key}
              clip={clip}
              className="[&_video]:aspect-3/4 [&_video]:rounded-sm sm:[&_video]:aspect-video"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
