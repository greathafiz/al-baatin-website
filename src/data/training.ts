/**
 * NYSC SAED accredited training. Source: content/training/nysc-saed/info.md.
 *
 * There is no fixed timetable — classes start when someone shows interest — so
 * every call to action here is WhatsApp rather than a booking form or a date.
 *
 * Corps members gave permission to appear. The NYSC Camp Director appears in
 * the certificate photos; naming her is still unconfirmed, so the alt text
 * describes her without using her name.
 */
import type { Photo, Video } from "./types"

export const training = {
  title: "NYSC SAED accredited training",
  accreditedBy: "NYSC (Skill Acquisition and Entrepreneurship Development)",
  skills: ["Solar installation", "CCTV installation", "Intercom systems"],
  campProgramme:
    "A one-week crash course for corps members during orientation camp.",
  fullProgramme:
    "After camp, corps members can enrol and train for the rest of their service year.",
  openTo: "Corps members, students, graduates and job seekers.",
  cost: "₦100,000 for the full year",
  certificate: true,
  camp: "NYSC Permanent Orientation Camp, Iseyin, Oyo State",
  /** Owner's own figure. No exact count exists, so it stays a word. */
  trained: "thousands",
  schedule:
    "There is no fixed timetable. Classes start whenever someone is ready, so message him on WhatsApp to arrange a start date.",
} as const

/**
 * All training photos, lead image first.
 *
 * `certificatePhotos` and `classPhotos` below split the tail into the two
 * groups the page shows separately. The certificate shots are the proof a corps
 * member walks away with, so they are not buried among the practicals.
 */
export const trainingPhotos: Photo[] = [
  {
    key: "training/nysc-saed/13-corps-members-group-photo",
    alt: "A large group of corps members in NYSC kit crouched and standing around a solar panel at the Al-Baatin training stand in camp.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/12-instructor-whiteboard-lesson",
    alt: "An Al-Baatin instructor teaching beside a whiteboard headed “Al-Baatin Technologies Limited — intercom system”, with a solar panel propped next to him in the camp hall.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/07-certificate-presentation-a",
    alt: "Four corps members holding their NYSC certificates of participation alongside an Al-Baatin trainer and an NYSC camp official.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/01-hands-on-training-a",
    alt: "Corps members gathered around equipment during a hands-on practical session.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/04-wiring-practical",
    alt: "A corps member wiring a circuit during a practical class.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/03-intercom-practical",
    alt: "A hands-on intercom practical in progress.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/02-hands-on-training-b",
    alt: "Corps members working through a practical exercise with an instructor.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/05-camp-stand-with-banner",
    alt: "The Al-Baatin stand at orientation camp, with a banner and a solar panel on display.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/14-instructor-addressing-camp-hall",
    alt: "An instructor addressing a hall full of corps members at orientation camp.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/06-corps-members-at-banner",
    alt: "Corps members gathered at the Al-Baatin banner during a camp event.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/08-certificate-presentation-b",
    alt: "Corps members receiving their certificates at the end of the programme.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/10-corps-members-in-hall",
    alt: "Corps members seated in the camp hall during a session.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/11-stand-banner-and-tv",
    alt: "The Al-Baatin camp stand banner showing the company name and RC number, next to a screen.",
    focal: "center",
  },
  {
    key: "training/nysc-saed/09-camp-stand-collage",
    alt: "A collage of scenes from the Al-Baatin stand at orientation camp.",
    focal: "center",
  },
]

/** The lead photo, shown large at the top of the page. */
export const trainingLeadPhoto = trainingPhotos[0]

const isCertificate = (photo: Photo) =>
  photo.key.includes("certificate-presentation")

/**
 * Certificate presentations, shown as their own group. Keyed off the filename
 * so a new `NN-certificate-presentation-*.jpg` lands here without a code change.
 */
export const certificatePhotos: Photo[] = trainingPhotos
  .slice(1)
  .filter(isCertificate)

/** Everything else from the tail: practicals, camp stand, hall sessions. */
export const classPhotos: Photo[] = trainingPhotos
  .slice(1)
  .filter((photo) => !isCertificate(photo))

export const trainingVideos: Video[] = [
  {
    key: "training/nysc-saed/video-01-camp-selfie-with-corps-members",
    alt: "A walk through the camp stand with corps members gathered around.",
    caption: "At orientation camp with corps members",
  },
]
