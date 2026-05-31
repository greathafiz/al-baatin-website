"use client"
import { useEffect, useState } from "react"
import { PHONE } from "@/app/lib/constants"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy-deep shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber text-xl select-none">☀</span>
          <span className="font-sora font-bold text-white text-lg tracking-tight">
            Al-Baatin <span className="hidden md:inline">Technologies</span>
          </span>
        </div>
        <a
          href={`tel:${PHONE}`}
          className="bg-amber hover:bg-amber-hover text-navy-deep font-sora font-semibold text-sm px-4 py-2 rounded-full transition-colors duration-200"
        >
          📞 Call Now
        </a>
      </div>
    </nav>
  )
}
