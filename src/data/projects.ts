/**
 * Completed jobs. Source: content/projects/<slug>/info.md.
 *
 * `null` means we genuinely do not know, and the UI omits that line rather than
 * guessing or writing "N/A". Several fields are still waiting on the client —
 * see build-plan.md. Clients are named only where he confirmed permission.
 *
 * Alt text describes what is in the frame, written from looking at each photo.
 *
 * The exported `projects` is sorted most recent first, with undated jobs last
 * (see below). Entries are listed here in whatever order is convenient to
 * edit — adding a new job means pasting it in with its `sortDate`, not finding
 * the right slot by hand.
 */
import type { Project } from "./types"

const entries: Project[] = [
  {
    slug: "daffodil-garden-estate-lekki-lagos",
    title: "Daffodil Garden Estate",
    location: "Chevron Drive, Lekki, Lagos",
    type: "residential",
    systemSize: "24kVA inverter capacity · 45kWh storage · 36 × 700W panels",
    date: "July 2026",
    sortDate: "2026-07",
    description:
      "Three 8kVA hybrid inverters and three 15kWh lithium batteries on one wall, feeding a full flat-roof array of bifacial panels hoisted up by the crew.",
    clientNamed: true,
    featured: true,
    photos: [
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/01-three-inverters-and-three-batteries-wall",
        alt: "Three Felicity hybrid inverters mounted in a row above a rail of breakers and changeover switches, with three floor-standing lithium batteries below and Al-Baatin stickers on each unit.",
        focal: "center",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/02-roof-array-fully-laid",
        alt: "The completed array of bifacial solar panels laid across the full flat roof of the house.",
        focal: "center",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/05-crew-hoisting-panels-to-roof",
        alt: "Al-Baatin fitters in hi-vis vests hoisting a solar panel up to the roof from the balcony below.",
        focal: "center",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/03-changeover-switches-and-breakers-closeup",
        alt: "A close-up of the changeover switches and breakers on their mounting rail, each circuit labelled.",
        focal: "center",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/07-bifacial-panels-delivered-on-site",
        alt: "A pallet of bifacial solar panels delivered and unwrapped on site before installation.",
        focal: "center",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/04-crew-member-at-inverter-wall",
        alt: "An Al-Baatin fitter standing beside the finished inverter and battery wall.",
        focal: "center",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/06-crew-briefing-at-site-gate",
        alt: "The crew gathered at the site gate for a briefing before work starts.",
        focal: "center",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/08-house-exterior",
        alt: "The two-storey house the system was installed on, seen from the driveway.",
        focal: "center",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/09-estate-entrance-gate",
        alt: "The entrance gate to Daffodil Garden Estate on Chevron Drive.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/video-01-roof-panels-installed",
        alt: "A pan across the installed rooftop array, a fitter in a hi-vis vest sitting on the parapet behind it.",
        caption: "The finished rooftop array",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/video-02-roof-array-walkthrough",
        alt: "A walk along the flat roof past the full run of installed bifacial panels.",
        caption: "Walking the finished roof array",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/video-04-inverter-wall-walkthrough",
        alt: "A walkthrough of the finished inverter wall, showing the three inverters, breakers and batteries.",
        caption: "Walkthrough of the inverter wall",
      },
      {
        key: "projects/daffodil-garden-estate-lekki-lagos/video-03-crew-briefing-on-site",
        alt: "The crew being briefed on site before work starts.",
        caption: "The crew on site",
      },
    ],
  },
  {
    slug: "kolapo-ishola-gra-ibadan",
    title: "Kolapo Ishola GRA",
    location: "Akobo, Ibadan",
    type: "residential",
    systemSize: "24kVA inverter capacity · 30kWh storage · 18 × 700W panels",
    date: "May 2026",
    sortDate: "2026-05",
    description:
      "Solar, electric fence and CCTV on one property: three 8kVA hybrid inverters and two batteries indoors, with the panels handed up from the balcony and fixed to a metal roof.",
    clientNamed: true,
    featured: true,
    photos: [
      {
        key: "projects/kolapo-ishola-gra-ibadan/04-crew-fixing-panels-on-metal-roof",
        alt: "Two Al-Baatin fitters in hi-vis vests fixing solar panels to a dark metal roof, with the rooftops of the estate behind them.",
        focal: "50% 45%",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/01-three-inverters-and-two-batteries-wall",
        alt: "Three Felicity hybrid inverters mounted in a row above a rail of breakers and isolators, with two floor-standing lithium batteries below and a 'Danger live wires' label between them.",
        focal: "center",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/03-roof-array-installed",
        alt: "The completed run of solar panels installed across the metal roof.",
        focal: "center",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/05-crew-handing-panels-up-from-balcony",
        alt: "Fitters handing a solar panel up to the roof from a balcony.",
        focal: "center",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/02-md-with-inverter-wall",
        alt: "Al-Baatin standing beside the finished three-inverter wall.",
        focal: "center",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/06-inverter-wall-installation-in-progress",
        alt: "The inverter wall part-way through installation, cabling still being run between the units.",
        focal: "center",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/07-crew-unpacking-battery-crate",
        alt: "The crew unpacking a lithium battery from its shipping crate.",
        focal: "center",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/08-panels-staged-along-side-passage",
        alt: "Solar panels staged along the side passage of the house, ready to be carried up.",
        focal: "center",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/09-estate-signboard-at-night",
        alt: "The Kolapo Ishola GRA estate signboard lit at night.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/kolapo-ishola-gra-ibadan/video-01-roof-array-pan",
        alt: "A short pan across the installed roof array.",
        caption: "The finished roof array",
      },
      {
        key: "projects/kolapo-ishola-gra-ibadan/video-02-inverters-and-breaker-panels-closeup",
        alt: "A close look along the three inverters and the breaker panels wired between them.",
        caption: "The inverters and breaker panels",
      },
    ],
  },
  {
    slug: "oasis-integrated-farms-ibadan",
    title: "Oasis Integrated Farms",
    location: "Ibadan-Ijebu Expressway, Ibadan",
    type: "commercial",
    systemSize: "12kVA hybrid inverter · 15kWh storage · 10 × 650W panels",
    date: "September 2026",
    sortDate: "2026-09",
    description:
      "A hybrid system for a working farm, fitted in stages: the electrical installation first, then the inverter, battery and panels.",
    clientNamed: true,
    featured: true,
    photos: [
      {
        key: "projects/oasis-integrated-farms-ibadan/01-hybrid-inverter-and-battery",
        alt: "A 12kVA Felicity hybrid inverter mounted on the wall above a row of breaker boxes, with a floor-standing lithium battery below.",
        focal: "center",
      },
      {
        key: "projects/oasis-integrated-farms-ibadan/05-crew-running-wiring-at-roof-trusses",
        alt: "A fitter running wiring along the roof trusses inside the farm building.",
        focal: "center",
      },
      {
        key: "projects/oasis-integrated-farms-ibadan/03-crew-measuring-farm-building-interior",
        alt: "Two of the crew measuring up inside the empty farm building before the wiring goes in.",
        focal: "center",
      },
      {
        key: "projects/oasis-integrated-farms-ibadan/04-crew-marking-wall-for-wiring",
        alt: "A fitter marking the block wall where the conduit and sockets will run.",
        focal: "center",
      },
      {
        key: "projects/oasis-integrated-farms-ibadan/02-farm-gate-sign",
        alt: "The entrance gate at Oasis Integrated Farms, the farm's name lettered across the sign above it.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/oasis-integrated-farms-ibadan/video-01-inverter-and-battery",
        alt: "A close look at the installed hybrid inverter and battery at the farm.",
        caption: "The installed inverter and battery",
      },
      {
        key: "projects/oasis-integrated-farms-ibadan/video-02-farm-gate-sign",
        alt: "The farm's entrance gate and name sign from the road.",
        caption: "Oasis Integrated Farms",
      },
    ],
  },
  {
    slug: "ilorin-princess-luxury-hotels",
    title: "Princess Luxury Hotels and Tourism",
    location: "Ilorin, Kwara State",
    type: "commercial",
    systemSize: "8kVA hybrid inverter · 15kWh storage · 10 × 650W panels",
    date: "August 2026",
    sortDate: "2026-08",
    description:
      "An 8kVA hybrid inverter and 15kWh battery for a hotel, with a tidy breaker and changeover setup and a roof array fitted by the crew.",
    clientNamed: true,
    featured: true,
    photos: [
      {
        key: "projects/ilorin-princess-luxury-hotels/01-finished-inverter-and-battery-wall",
        alt: "A Felicity hybrid inverter mounted on the wall beside a distribution box and changeover switch, conduit curving down to a floor-standing lithium battery below.",
        focal: "center",
      },
      {
        key: "projects/ilorin-princess-luxury-hotels/02-crew-mounting-panels-on-roof",
        alt: "Fitters in hi-vis vests mounting solar panels on the hotel roof.",
        focal: "center",
      },
      {
        key: "projects/ilorin-princess-luxury-hotels/03-crew-laying-panels-on-roof-close",
        alt: "A close view of the crew laying panels onto the mounting rails.",
        focal: "center",
      },
      {
        key: "projects/ilorin-princess-luxury-hotels/04-technician-wiring-inverter-wall",
        alt: "A technician wiring the inverter into the distribution board.",
        focal: "center",
      },
      {
        key: "projects/ilorin-princess-luxury-hotels/05-inverter-mounted-with-laser-level",
        alt: "The inverter being set on the wall against a laser level line to get it square.",
        focal: "center",
      },
      {
        key: "projects/ilorin-princess-luxury-hotels/06-distribution-board-and-conduit-run",
        alt: "The finished distribution board with its conduit run neatly along the wall.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/ilorin-princess-luxury-hotels/video-01-crew-mounting-inverter-and-battery",
        alt: "The crew mounting the inverter and setting the battery in place.",
        caption: "Mounting the inverter and battery",
      },
      {
        key: "projects/ilorin-princess-luxury-hotels/video-02-crew-on-roof-at-panel-rails",
        alt: "The crew working along the panel rails on the hotel roof.",
        caption: "Fitting the roof array",
      },
    ],
  },
  {
    slug: "centrepoint-supermarket-ibadan",
    title: "Centrepoint Supermarket",
    location: "Ibadan",
    type: "commercial",
    systemSize: "10kVA hybrid inverter · 15kWh storage · 18 × 450W panels",
    date: "March 2025",
    sortDate: "2025-03",
    description:
      "A 10kVA hybrid system keeping a supermarket trading through outages, with the panels fitted on the pitched roof in safety harnesses.",
    // UNKNOWN: he has not explicitly confirmed naming this client, but the
    // shop sign is visible in his own footage. Treat as confirmed-by-use.
    clientNamed: true,
    featured: true,
    photos: [
      {
        key: "projects/centrepoint-supermarket-ibadan/01-inverter-and-battery-installed",
        alt: "An orange Welion hybrid inverter mounted on a rail beside the distribution box and breakers, with a floor-standing lithium battery below and a fire extinguisher on the wall.",
        focal: "center",
      },
      {
        key: "projects/centrepoint-supermarket-ibadan/04-crew-on-roof-fitting-panels",
        alt: "The crew fitting solar panels across the supermarket's pitched roof.",
        focal: "center",
      },
      {
        key: "projects/centrepoint-supermarket-ibadan/05-crew-member-on-roof-in-safety-harness",
        alt: "A fitter working on the roof in a safety harness and hi-vis vest.",
        focal: "center",
      },
      {
        key: "projects/centrepoint-supermarket-ibadan/03-panels-staged-along-compound-wall",
        alt: "Solar panels staged in a row along the compound wall before being carried up.",
        focal: "center",
      },
      {
        key: "projects/centrepoint-supermarket-ibadan/02-technician-wiring-inverter-and-battery",
        alt: "A technician wiring the inverter to the battery below it.",
        focal: "center",
      },
      {
        key: "projects/centrepoint-supermarket-ibadan/06-supermarket-building-exterior",
        alt: "The supermarket building from the street, its signage above the entrance.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/centrepoint-supermarket-ibadan/video-01-crew-fitting-panels-on-roof",
        alt: "The crew fitting panels along the supermarket roof.",
        caption: "Fitting the roof array",
      },
      {
        key: "projects/centrepoint-supermarket-ibadan/video-02-technician-wiring-inverter-wall",
        alt: "A technician wiring the inverter wall and breakers.",
        caption: "Wiring the inverter",
      },
    ],
  },
  {
    slug: "abule-egba-new-look-hotel-upgrade",
    title: "New Look Hotel",
    location: "Abule Egba, Lagos",
    type: "commercial",
    systemSize: "4.2kVA hybrid inverter · 5kWh storage · 6 × 650W panels",
    date: "March 2026",
    sortDate: "2026-03",
    description:
      "An upgrade, not a new build: a 2kVA inverter on tubular batteries replaced with a 4.2kVA hybrid inverter, a lithium battery and new panels on the roof.",
    clientNamed: true,
    featured: false,
    photos: [
      {
        key: "projects/abule-egba-new-look-hotel-upgrade/01-after-4-2kva-hybrid-inverter-installed",
        alt: "After the upgrade: a Felicity hybrid inverter and matching lithium battery unit mounted side by side on the wall, with a monitor and isolator above them.",
        focal: "center",
      },
      {
        key: "projects/abule-egba-new-look-hotel-upgrade/02-before-2kva-inverter-and-tubular-batteries",
        alt: "Before the upgrade: the old 2kVA inverter sitting above a pair of tubular batteries.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/abule-egba-new-look-hotel-upgrade/video-01-after-new-inverter-wall-walkthrough",
        alt: "A walkthrough of the finished wall after the upgrade, showing the new inverter and lithium battery.",
        caption: "After: the new hybrid inverter and battery",
      },
      {
        key: "projects/abule-egba-new-look-hotel-upgrade/video-02-before-old-tubular-batteries",
        alt: "The old tubular batteries and 2kVA inverter before they were replaced.",
        caption: "Before: the old 2kVA inverter",
      },
      {
        key: "projects/abule-egba-new-look-hotel-upgrade/video-03-crew-installing-panels-on-roof",
        alt: "The crew installing the new panels on the hotel's corrugated roof.",
        caption: "Fitting the new panels",
      },
    ],
  },
  {
    slug: "gbopa-ibadan-first-fix-wiring",
    title: "First-stage electrical wiring",
    location: "Gbopa, Ibadan",
    type: "other",
    // Electrical first fix only — no solar on this job yet.
    systemSize: null,
    // UNKNOWN: the client sent no date for this job.
    date: null,
    sortDate: null,
    description:
      "The first stage of wiring a new building: marking and chasing the block walls for conduit, and checking the distribution board before it goes in.",
    clientNamed: false,
    featured: false,
    photos: [
      {
        key: "projects/gbopa-ibadan-first-fix-wiring/01-crew-chasing-wall-for-conduit",
        alt: "Two Al-Baatin fitters in hi-vis vests cutting a channel down a block wall with a hammer and chisel, the route for the conduit chalked on the blockwork beside them.",
        focal: "center",
      },
      {
        key: "projects/gbopa-ibadan-first-fix-wiring/02-crew-carrying-conduit-pipes",
        alt: "The crew carrying lengths of conduit pipe into the building.",
        focal: "center",
      },
      {
        key: "projects/gbopa-ibadan-first-fix-wiring/03-van-loaded-with-wiring-materials",
        alt: "A van loaded with conduit and wiring materials for the job.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/gbopa-ibadan-first-fix-wiring/video-01-checking-distribution-board-breakers",
        alt: "Checking over the breakers in the distribution board before installation.",
        caption: "Checking the distribution board",
      },
      {
        key: "projects/gbopa-ibadan-first-fix-wiring/video-02-unloading-conduit-and-materials",
        alt: "Unloading conduit and wiring materials at the site.",
        caption: "Materials arriving on site",
      },
    ],
  },
  {
    slug: "nysc-oyo-coordinator-office",
    title: "NYSC State Coordinator's office",
    location: "Oyo State",
    type: "other",
    // UNKNOWN: system size and date not supplied.
    systemSize: null,
    date: null,
    sortDate: null,
    description:
      "Solar installation at the office of the NYSC State Coordinator for Oyo State.",
    clientNamed: true,
    featured: false,
    photos: [],
    videos: [
      {
        key: "projects/nysc-oyo-coordinator-office/video-01-installation-at-state-coordinator-office",
        alt: "Al-Baatin fitters in hi-vis vests preparing solar panels, cabling and inverter equipment at the NYSC State Coordinator's office.",
        caption:
          "Installation at the NYSC State Coordinator's office, Oyo State",
      },
    ],
  },
]

/**
 * Most recent first; jobs with no date from the client go last.
 *
 * `sortDate` is "YYYY-MM", so a plain string comparison orders it correctly.
 * Sorting a copy keeps this a pure expression rather than mutating `entries`.
 */
export const projects: Project[] = [...entries].sort((a, b) => {
  if (a.sortDate === b.sortDate) return 0
  if (a.sortDate === null) return 1
  if (b.sortDate === null) return -1
  return b.sortDate.localeCompare(a.sortDate)
})

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const featuredProjects = projects.filter((p) => p.featured)

/** Every project that has at least one photo or video to show. */
export const projectsWithMedia = projects.filter(
  (p) => p.photos.length > 0 || p.videos.length > 0,
)
