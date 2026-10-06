import type { Metadata } from "next"
import { Frame, Section } from "@/components/layout"
import { ProjectGrid } from "@/components/ProjectGrid"
import { projects } from "@/data/projects"

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Solar, inverter and battery installations by Al-Baatin Technologies in Lagos, Ibadan and across Nigeria.",
}

export default function ProjectsPage() {
  return (
    <Section rhythm="normal">
      <Frame width="wide">
        <h1 className="text-display max-w-[14ch] font-semibold">Our work</h1>
        <p className="text-lede mt-6 max-w-[46ch] text-ink-soft">
          Every system here was installed by our own crew. The sizes are the
          real ones we fitted.
        </p>

        <div className="mt-14">
          <ProjectGrid projects={projects} />
        </div>
      </Frame>
    </Section>
  )
}
