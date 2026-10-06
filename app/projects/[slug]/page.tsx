import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clip, Img } from "@/components/Media"
import { ButtonAnchor, Container, WhatsAppIcon } from "@/components/ui"
import { whatsapp } from "@/data/business"
import { projects } from "@/data/projects"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  const where = project.location ? ` in ${project.location}` : ""
  return {
    title: project.title,
    description:
      project.systemSize
        ? `${project.systemSize}, installed${where} by Al-Baatin Technologies.`
        : `Installed${where} by Al-Baatin Technologies.`,
  }
}

const typeLabel: Record<string, string> = {
  residential: "Home",
  commercial: "Business",
  other: "Other",
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  // Only the facts we actually have — a missing row is omitted, never "N/A".
  const specs = [
    project.systemSize && { label: "System", value: project.systemSize },
    project.location && { label: "Location", value: project.location },
    project.date && { label: "Installed", value: project.date },
    project.type && { label: "Type", value: typeLabel[project.type] },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <article className="py-12 md:py-16">
      <Container>
        <Link
          href="/projects/"
          className="text-sm text-ink-soft underline underline-offset-4 hover:text-signal-dark"
        >
          Back to all work
        </Link>

        <h1 className="text-display mt-4 font-semibold">{project.title}</h1>
        {project.description ? (
          <p className="text-lede mt-4 max-w-prose text-ink-soft">
            {project.description}
          </p>
        ) : null}

        {specs.length > 0 ? (
          <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-hairline pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-sm text-ink-soft">{spec.label}</dt>
                <dd className="mt-0.5 font-display text-lg font-semibold text-canopy">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {project.photos.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {project.photos.map((photo, i) => (
              <Img
                key={photo.key}
                photo={photo}
                sizes="(min-width: 640px) 50vw, 100vw"
                priority={i === 0}
                className="w-full rounded-sm"
              />
            ))}
          </div>
        ) : null}

        {project.videos.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {project.videos.map((clip) => (
              <Clip key={clip.key} clip={clip} className="[&_video]:rounded-sm" />
            ))}
          </div>
        ) : null}

        <div className="mt-12 border-t border-hairline pt-8">
          <h2 className="font-display text-xl font-semibold text-canopy">
            Want something like this?
          </h2>
          <p className="mt-2 max-w-prose text-ink-soft">
            Tell us what you run and we will size a system for it.
          </p>
          <ButtonAnchor
            href={whatsapp.quote}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </ButtonAnchor>
        </div>
      </Container>
    </article>
  )
}
