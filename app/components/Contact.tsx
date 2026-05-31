// app/components/Contact.tsx
"use client"

import { useState, type FormEvent } from "react"
import { PHONE, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/app/lib/constants"

export default function Contact() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = `Hi, I'm ${name}. My number is ${phone}. ${message || WHATSAPP_MESSAGE}`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const whatsappDirect = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="contact" className="bg-slate-light py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4">
          Get In Touch
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
          Ready to Go Solar?<br />Let&apos;s Talk.
        </h2>

        <p className="font-inter text-body-gray text-lg mb-10">
          We serve homes and businesses across Ibadan.<br />
          Reach out — the consultation is completely free.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={`tel:${PHONE}`}
            className="bg-amber hover:bg-amber-hover text-navy-deep font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200 text-center"
          >
            📞 Call Now
          </a>
          <a
            href={whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp hover:bg-green-500 text-white font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200 text-center"
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-navy-deep/10" />
          <span className="font-inter text-body-gray text-sm whitespace-nowrap">
            or leave a message
          </span>
          <div className="flex-1 h-px bg-navy-deep/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-navy-deep/20 rounded-xl px-4 py-3 font-inter text-sm text-navy-deep placeholder:text-body-gray focus:outline-none focus:ring-2 focus:ring-amber bg-white"
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-navy-deep/20 rounded-xl px-4 py-3 font-inter text-sm text-navy-deep placeholder:text-body-gray focus:outline-none focus:ring-2 focus:ring-amber bg-white"
          />
          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full border border-navy-deep/20 rounded-xl px-4 py-3 font-inter text-sm text-navy-deep placeholder:text-body-gray focus:outline-none focus:ring-2 focus:ring-amber bg-white resize-none"
          />
          <button
            type="submit"
            className="bg-amber hover:bg-amber-hover text-navy-deep font-sora font-bold text-base px-8 py-4 rounded-full transition-colors duration-200"
          >
            Send Message via WhatsApp
          </button>
        </form>

        <p className="font-inter text-body-gray text-sm mt-8">
          Monday – Saturday · 8:00 AM – 6:00 PM
        </p>
      </div>
    </section>
  )
}
