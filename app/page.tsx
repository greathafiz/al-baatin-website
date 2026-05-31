import Navbar from "@/app/components/Navbar"
import Hero from "@/app/components/Hero"
import WhySolar from "@/app/components/WhySolar"
import Services from "@/app/components/Services"
import Gallery from "@/app/components/Gallery"
import HowItWorks from "@/app/components/HowItWorks"
import Testimonials from "@/app/components/Testimonials"
import Brands from "@/app/components/Brands"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhySolar />
        <Services />
        <Gallery />
        <HowItWorks />
        <Testimonials />
        <Brands />
      </main>
    </>
  )
}
