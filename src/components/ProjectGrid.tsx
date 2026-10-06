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

/**
 * The work as an indexed schedule: one row per job, specs in columns, the way
 * a contractor's own schedule of works reads. Denser and more scannable than a
 * card grid when someone is comparing systems, and the numbers stay aligned
 * down the page instead of being buried in each card.
 *
 * Thumbnails sit in grayscale and come to colour on hover or focus, so the
 * index reads as one calm list until you point at a row.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all")

  const shown =
    filter === "all" ? projects : projects.filter((p) => p.type === filter)

  return (
    <>
      <div
        className="flex flex-wrap gap-x-6 gap-y-2"
        role="group"
        aria-label="Filter projects"
      >
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
              className={`border-b pb-1 text-base transition-colors disabled:opacity-30 ${
                active
                  ? "border-canopy text-canopy"
                  : "border-transparent text-ink-soft hover:border-hairline hover:text-ink"
              }`}
            >
              {f.label}
              <span className="text-meta ml-1.5 align-super opacity-60">
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {projects.length} projects.
      </p>

      <ul className="mt-10 border-t border-canopy">
        {shown.map((project) => (
          <li key={project.slug} className="border-b border-hairline">
            <Link
              href={`/projects/${project.slug}/`}
              className="group grid grid-cols-12 items-center gap-x-5 gap-y-1 py-4 transition-colors hover:bg-bone-deep"
            >
              <div className="col-span-3 sm:col-span-2 lg:col-span-1">
                {project.photos[0] ? (
                  <Img
                    photo={project.photos[0]}
                    sizes="110px"
                    className="aspect-square w-full max-w-22 object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                  />
                ) : project.videos[0] ? (
                  // Video-only job: its poster frame stands in as the thumbnail.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={video(project.videos[0].key).poster}
                    alt={project.videos[0].alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full max-w-22 object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                ) : null}
              </div>

              <div className="col-span-9 sm:col-span-4 lg:col-span-4">
                <h2 className="font-display text-lg font-semibold text-canopy sm:text-xl">
                  {project.title}
                </h2>
                {project.location ? (
                  <p className="text-meta mt-0.5 text-ink-soft">
                    {project.location}
                  </p>
                ) : null}
              </div>

              <p className="text-meta col-span-9 col-start-4 text-ink sm:col-span-5 sm:col-start-auto lg:col-span-5">
                {project.systemSize ?? ""}
              </p>

              <p className="text-meta col-span-12 text-ink-soft sm:col-span-1 sm:text-right lg:col-span-2">
                {project.date ?? ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
