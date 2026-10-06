/**
 * Crew photos for the About section. Source: content/team/info.md.
 *
 * There is still NO owner portrait — see `business.owner.photo`, which is null.
 * The About section leads with the daytime crew photo instead and carries a
 * clearly marked placeholder where his picture and story will go.
 *
 * Crew members' names are not listed: we have not asked whether he wants them
 * published.
 */
import type { Photo } from "./types"

export const teamPhotos: Photo[] = [
  {
    key: "team/01-crew-in-hi-vis-daytime",
    alt: "The Al-Baatin crew in branded hi-vis vests standing with coils of cable and boxed equipment in front of their vans before a job.",
    // The crew stand in the upper half; below them is empty paving.
    focal: "50% 30%",
  },
  {
    key: "team/02-crew-in-hi-vis-night-a",
    alt: "The crew in branded hi-vis vests photographed in the evening, the company name and phone number across the back of each vest.",
    focal: "center",
  },
  {
    key: "team/03-crew-in-hi-vis-night-b",
    alt: "The crew lined up in branded hi-vis vests at the end of an evening job.",
    focal: "center",
  },
]

/** Extra photos not tied to any one job, used where they fit. */
export const looseShots: Photo[] = [
  {
    key: "_unassigned/crew-on-rooftop-wall",
    alt: "Al-Baatin fitters working along a rooftop wall during an installation.",
    focal: "center",
  },
]
