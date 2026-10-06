/**
 * Completed jobs. Source: content/projects/<slug>/info.md.
 *
 * `null` means we genuinely do not know, and the UI omits that line rather than
 * guessing or writing "N/A". Several fields are still waiting on the client —
 * see build-plan.md. Clients are named only where he confirmed permission.
 *
 * Alt text describes what is in the frame, written from looking at each photo.
 */
import type { Project } from "./types"

export const projects: Project[] = [
  {
    slug: "rhema-chapel-lekki-lagos",
    title: "Rhema Chapel, Lekki",
    location: "Lekki, Lagos",
    // UNKNOWN: client has not confirmed residential/commercial. It is a church,
    // so it is certainly not residential, but we do not guess on the site.
    type: null,
    systemSize: "24 × 650W panels · 15.6kWp",
    date: "May 2026",
    description:
      "A 24-panel rooftop array on the church building, assembled and wired on site.",
    clientNamed: true,
    featured: true,
    photos: [
      {
        key: "projects/rhema-chapel-lekki-lagos/02-panels-completed-from-above",
        alt: "Two Al-Baatin fitters in hi-vis vests wiring a completed solar array on a dark metal roof, with Lekki rooftops behind them.",
        focal: "center",
      },
      {
        key: "projects/rhema-chapel-lekki-lagos/01-solar-array-on-roof",
        alt: "The finished solar array seen along the roofline at dusk, panels angled across the full width of the roof.",
        focal: "center",
      },
      {
        key: "projects/rhema-chapel-lekki-lagos/04-panel-closeup-before-install",
        alt: "A close-up of a 650W solar panel resting on its edge before installation.",
        focal: "center",
      },
      {
        key: "projects/rhema-chapel-lekki-lagos/03-panels-unpacked-in-compound",
        alt: "Solar panels unpacked and stacked in the compound, ready to be carried up to the roof.",
        focal: "center",
      },
      {
        key: "projects/rhema-chapel-lekki-lagos/05-crew-unpacking-panels-at-wall",
        alt: "The crew unpacking solar panels against a compound wall before installation.",
        focal: "center",
      },
    ],
    videos: [],
  },
  {
    slug: "daffodil-gardens-estate-lagos",
    title: "Daffodil Gardens Estate",
    location: "Chevron Drive, Lagos",
    type: "residential",
    systemSize: "24kVA inverter capacity · 45kWh storage · 10 × 650W panels",
    date: "August 2026",
    description:
      "Three 8kVA hybrid inverters and three 15kWh lithium batteries on one wall, feeding a rooftop array on a new-build duplex.",
    clientNamed: true,
    featured: true,
    photos: [
      {
        key: "projects/daffodil-gardens-estate-lagos/04-inverter-wall-three-units-angled",
        alt: "Three Felicity hybrid inverters mounted in a row above three floor-standing lithium batteries, with breaker boxes between them and an Al-Baatin sticker on the end unit.",
        focal: "center",
      },
      {
        key: "projects/daffodil-gardens-estate-lagos/05-crew-on-roof-and-balcony",
        alt: "A three-storey white duplex with Al-Baatin fitters in hi-vis vests working on the roof terrace and balcony, a solar panel waiting by the gate below.",
        focal: "center",
      },
      {
        key: "projects/daffodil-gardens-estate-lagos/01-three-inverters-three-batteries",
        alt: "The completed inverter wall seen straight on: three inverters above, three batteries below.",
        focal: "center",
      },
      {
        key: "projects/daffodil-gardens-estate-lagos/02-crew-member-at-inverter-wall",
        alt: "An Al-Baatin fitter standing beside the finished inverter installation.",
        focal: "center",
      },
      {
        key: "projects/daffodil-gardens-estate-lagos/03-estate-entrance-gate",
        alt: "The entrance gate to Daffodil Gardens Estate.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/daffodil-gardens-estate-lagos/video-01-roof-panels-installed",
        alt: "A pan across the installed rooftop array, a fitter in a hi-vis vest sitting on the parapet behind it.",
        caption: "The finished rooftop array",
      },
      {
        key: "projects/daffodil-gardens-estate-lagos/video-03-inverter-wall-walkthrough",
        alt: "A walkthrough of the finished inverter wall, showing the three inverters, breakers and batteries.",
        caption: "Walkthrough of the inverter wall",
      },
      {
        key: "projects/daffodil-gardens-estate-lagos/video-02-crew-briefing-on-site",
        alt: "The crew being briefed on site before work starts.",
        caption: "The crew on site",
      },
    ],
  },
  {
    slug: "oasis-integrated-farms",
    title: "Oasis Integrated Farms",
    location: "Lagos-Ibadan Expressway, Ibadan",
    type: "commercial",
    systemSize: "12kVA hybrid inverter · 15kWh storage · 10 × 650W panels",
    date: "2026",
    description:
      "A hybrid system for a working farm, fitted in stages: the electrical work first, then the solar and storage.",
    clientNamed: true,
    featured: true,
    photos: [
      {
        key: "projects/oasis-integrated-farms/01-hybrid-inverter-and-battery",
        alt: "A 12kVA Felicity hybrid inverter mounted on the wall above a row of breaker boxes, with a floor-standing lithium battery below.",
        focal: "center",
      },
      {
        key: "projects/oasis-integrated-farms/02-farm-gate-sign",
        alt: "The black metal entrance gate at Oasis Integrated Farms, the farm's name in white lettering across the top.",
        focal: "center",
      },
    ],
    videos: [
      {
        key: "projects/oasis-integrated-farms/video-01-inverter-and-battery",
        alt: "A close look at the installed hybrid inverter and battery at the farm.",
        caption: "The installed inverter and battery",
      },
    ],
  },
  {
    slug: "inverter-install-a",
    title: "Home inverter and solar system",
    location: "Ibadan",
    type: "residential",
    systemSize: "24kVA inverter capacity · 30kWh storage · 10 × 650W panels",
    date: "May 2026",
    description:
      "Three 8kVA hybrid inverters and two 15kWh batteries on a single wall, with the panels mounted on a pitched roof.",
    clientNamed: false,
    featured: true,
    photos: [
      {
        key: "projects/inverter-install-a/01-three-inverters-two-batteries",
        alt: "Three Felicity hybrid inverters above a row of breaker boxes, with two floor-standing lithium batteries below and an Al-Baatin fitter standing beside them.",
        focal: "center",
      },
      {
        key: "projects/inverter-install-a/02-inverter-wall-front-view",
        alt: "The same inverter wall straight on, showing the breaker panel and cable runs between the units.",
        focal: "center",
      },
      {
        key: "projects/inverter-install-a/03-roof-crew-mounting-panels",
        alt: "Fitters in hi-vis vests mounting solar panels on a pitched roof.",
        focal: "center",
      },
    ],
    videos: [],
  },
  {
    slug: "inverter-install-c",
    title: "Home inverter and battery",
    // UNKNOWN: client has not given the town for this job.
    location: null,
    type: "residential",
    systemSize: "8kVA hybrid inverter · 15kWh storage",
    date: "August 2026",
    description:
      "A single hybrid inverter, distribution box and lithium battery, neatly mounted.",
    clientNamed: false,
    featured: true,
    photos: [
      {
        key: "projects/inverter-install-c/01-inverter-and-battery",
        alt: "A wall-mounted hybrid inverter and distribution box above a floor-standing lithium battery.",
        // Tall 9:16 phone shot; the mounted kit sits above the midline.
        focal: "50% 38%",
      },
      {
        key: "projects/inverter-install-c/02-crew-with-inverter-and-battery",
        alt: "An Al-Baatin fitter beside the completed inverter and battery installation.",
        focal: "center",
      },
    ],
    videos: [],
  },
  {
    slug: "nysc-oyo-coordinator-office",
    title: "NYSC State Coordinator's office",
    location: "Oyo State",
    type: "other",
    // UNKNOWN: system size and date not supplied.
    systemSize: null,
    date: null,
    description:
      "Solar installation at the office of the NYSC State Coordinator for Oyo State.",
    clientNamed: true,
    featured: false,
    photos: [],
    videos: [
      {
        key: "projects/nysc-oyo-coordinator-office/video-01-installation-at-state-coordinator-office",
        alt: "Al-Baatin fitters in hi-vis vests preparing solar panels, cabling and inverter equipment at the NYSC State Coordinator's office.",
        caption: "Installation at the NYSC State Coordinator's office, Oyo State",
      },
    ],
  },
]

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const featuredProjects = projects.filter((p) => p.featured)

/** Every project that has at least one photo or video to show. */
export const projectsWithMedia = projects.filter(
  (p) => p.photos.length > 0 || p.videos.length > 0,
)
