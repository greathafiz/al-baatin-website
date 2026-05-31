import { PHONE, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/app/lib/constants"

export default function Contact() {
  const whatsappDirect = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="contact" className="bg-slate-light py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-inter text-amber text-xs font-semibold tracking-widest uppercase mb-4">
          Get In Touch
        </p>

        <h2 className="font-sora font-bold text-navy-deep text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
          Ready to Go Solar?
          <br />
          Let&apos;s Talk.
        </h2>

        <p className="font-inter text-body-gray text-lg mb-10">
          We serve homes and businesses across Ibadan.
          <br />
          Reach out — the consultation is completely free.
        </p>

        {/* CTAs */}
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

        <p className="font-inter text-body-gray text-sm mt-8">
          Monday - Saturday · 8:00 AM - 6:00 PM
        </p>
      </div>
    </section>
  )
}
