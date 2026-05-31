// app/components/Footer.tsx
import { PHONE, WHATSAPP_URL } from "@/app/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-white/5 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
            <span className="text-amber select-none">☀</span>
            <span className="font-sora font-bold text-white text-base">
              Al-Baatin Technologies
            </span>
          </div>
          <p className="font-inter text-slate-500 text-xs">
            Solar Installations · Ibadan, Oyo State
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`tel:${PHONE}`}
            className="font-inter text-slate-400 hover:text-white text-sm transition-colors duration-200"
          >
            📞 {PHONE}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-slate-400 hover:text-whatsapp text-sm transition-colors duration-200"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center">
        <p className="font-inter text-slate-600 text-xs">
          © {new Date().getFullYear()} Al-Baatin Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
