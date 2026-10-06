"use client"

import Link from "next/link"
import { useState } from "react"
import type { Project, ProjectType } from "@/data/types"
import { video } from "@/lib/media"
import { Img } from "./Media"

type Filter = "all" | ProjectType

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "residential", label: "Homes" },
  { value: "commercial", label: "Business" },
  { value: "other", label: "Other" },
]

const typeLabel: Record<ProjectType, string> = {
  residential: "Home",
  commercial: "Business",
  other: "Other",
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all")

  const shown =
    filter === "all" ? projects : projects.filter((p) => p.type === filter)

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((f) => {
          const active = filter === f.value
          const count =
            f.value === "all"
              ? projects.length
              : projects.filter((p) => p.type === f.value).length
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={active}
              disabled={count === 0}
              className={`rounded-sm border px-4 py-2 text-sm transition-colors disabled:opacity-40 ${
                active
                  ? "border-canopy bg-canopy text-white"
                  : "border-hairline text-ink hover:border-canopy"
              }`}
            >
              {f.label}
              <span className="ml-1.5 text-xs opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      {/* aria-live so the count change is announced when a filter is pressed. */}
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {projects.length} projects.
      </p>

      <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => {
          const cover = project.photos[0]
          return (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}/`} className="group block">
                {cover ? (
                  <Img
                    photo={cover}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-5/4 w-full rounded-sm object-cover"
                  />
                ) : project.videos[0] ? (
                  // Video-only project: its poster frame stands in as the cover.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={video(project.videos[0].key).poster}
                    alt={project.videos[0].alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-5/4 w-full rounded-sm object-cover"
                  />
                ) : null}
                <h2 className="mt-4 font-display text-xl font-semibold text-canopy group-hover:text-signal-dark">
                  {project.title}
                </h2>
              </Link>

              <dl className="mt-1 text-sm text-ink-soft">
                {project.location ? (
                  <div>
                    <dt className="sr-only">Location</dt>
                    <dd>{project.location}</dd>
                  </div>
                ) : null}
                {project.systemSize ? (
                  <div className="mt-1">
                    <dt className="sr-only">System</dt>
                    <dd className="text-ink">{project.systemSize}</dd>
                  </div>
                ) : null}
                {project.type ? (
                  <div className="mt-2">
                    <dt className="sr-only">Type</dt>
                    <dd className="inline-block border border-hairline px-2 py-0.5 text-xs">
                      {typeLabel[project.type]}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </li>
          )
        })}
      </ul>
    </>
  )
}
