import Navbar from "@/app/components/Navbar"
import Hero from "@/app/components/Hero"
import WhySolar from "@/app/components/WhySolar"
import Services from "@/app/components/Services"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhySolar />
        <Services />
      </main>
    </>
  )
}
