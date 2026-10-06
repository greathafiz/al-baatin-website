import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Frame, Section } from "@/components/layout"
import { Lightbox } from "@/components/Lightbox"
import { Clip } from "@/components/Media"
import { WhatsAppIcon } from "@/components/ui"
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
    <Section rhythm="normal">
      <Frame width="wide">
        <Link
          href="/projects/"
          className="text-meta text-ink-soft underline underline-offset-4 transition-colors hover:text-canopy"
        >
          Back to all work
        </Link>

        <h1 className="text-display mt-5 max-w-[16ch] font-semibold">
          {project.title}
        </h1>
        {project.description ? (
          <p className="text-lede mt-6 max-w-[46ch] text-ink-soft">
            {project.description}
          </p>
        ) : null}

        {specs.length > 0 ? (
          <dl className="mt-12 grid gap-x-10 gap-y-8 border-t border-canopy pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-meta text-ink-soft">{spec.label}</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-canopy sm:text-2xl">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {project.photos.length > 0 ? (
          <Lightbox
            photos={project.photos}
            className="mt-10 grid gap-4 sm:grid-cols-2"
            itemClassName="aspect-4/3"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ) : null}

        {project.videos.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {project.videos.map((clip) => (
              <Clip key={clip.key} clip={clip}  />
            ))}
          </div>
        ) : null}

        <div className="mt-16 border-t border-hairline pt-10">
          <h2 className="text-title font-semibold">Want something like this?</h2>
          <p className="text-lede mt-4 max-w-[40ch] text-ink-soft">
            Tell us what you run and we will size a system for it.
          </p>
          <a
            href={whatsapp.quote}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 bg-canopy px-7 py-4 font-medium text-white transition-colors hover:bg-signal-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </Frame>
    </Section>
  )
}
