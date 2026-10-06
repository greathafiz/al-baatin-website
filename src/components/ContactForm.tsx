"use client"

import Script from "next/script"
import { useState } from "react"
import { whatsapp } from "@/data/business"

type Status = "idle" | "sending" | "sent" | "error"

// The form sits on the dark canopy field, so inputs are light-on-dark.
const field =
  "w-full border border-bone/25 bg-white/5 px-4 py-3 text-base text-white placeholder:text-bone/40 focus:border-signal focus:outline-none"

const label = "block text-meta text-bone/70"

/**
 * Formspree via a client-side POST — the site is a static export, so there is
 * no server to receive a form. Cloudflare Turnstile guards it against bots;
 * Formspree verifies the token server-side using the secret key configured in
 * its own dashboard (never in this repo).
 *
 * Both ids are NEXT_PUBLIC_* values baked into the HTML at build time — that
 * is by design, neither is a secret. Without them the form renders disabled
 * and points at WhatsApp, which is how most of his customers reach him anyway.
 */
export function ContactForm() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const [status, setStatus] = useState<Status>("idle")

  if (!formId || !turnstileSiteKey) {
    return (
      <div className="border border-bone/25 p-6">
        <p className="font-display text-xl font-semibold text-white">
          The message form is not set up yet
        </p>
        <p className="mt-2 text-bone/75">
          Message us on WhatsApp or call instead — both reach us straight away.
        </p>
        <a
          href={whatsapp.quote}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center border-b border-signal font-medium text-signal transition-colors hover:border-white hover:text-white"
        >
          Chat on WhatsApp
        </a>
        {/* Visible to whoever is building the site, not to customers. */}
        <p className="text-meta mt-6 border-l-2 border-live-red bg-live-red/15 px-3 py-2 text-bone">
          <strong className="font-semibold">[PLACEHOLDER]</strong> Set
          NEXT_PUBLIC_FORMSPREE_FORM_ID and NEXT_PUBLIC_TURNSTILE_SITE_KEY in
          .env.local to enable this form. See .env.example.
        </p>
      </div>
    )
  }

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target
    setStatus("sending")

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
      if (response.ok) {
        setStatus("sent")
        form.reset()
        // @ts-expect-error -- loaded globally by the Turnstile script, no types
        window.turnstile?.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-signal/40 bg-signal/10 p-6">
        <p className="font-display text-xl font-semibold text-white">
          Message sent
        </p>
        <p className="mt-2 text-bone/80">
          We will get back to you shortly. If it is urgent, call{" "}
          <a
            href={`tel:${whatsapp.dial}`}
            className="font-medium text-signal underline underline-offset-4"
          >
            {whatsapp.display}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
        defer
      />
      <input
        type="hidden"
        name="_subject"
        value="New enquiry from the Al-Baatin website"
      />
      {/* Spam trap: real people never fill this in. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="name" className={label}>
          Your name
        </label>
        <input id="name" name="name" required autoComplete="name" className={`${field} mt-1.5`} />
      </div>

      <div>
        <label htmlFor="phone" className={label}>
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className={`${field} mt-1.5`}
        />
      </div>

      <div>
        <label htmlFor="message" className={label}>
          What do you need?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us what you run — fridge, pumps, air conditioners — and roughly how long you need backup for."
          className={`${field} mt-1.5 resize-y`}
        />
      </div>

      <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" />

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-300">
          That did not send. Try again, or message us on WhatsApp — the button
          is at the top of this section.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex cursor-pointer items-center justify-center bg-signal px-7 py-4 font-medium text-canopy transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
