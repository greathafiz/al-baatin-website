import Script from "next/script"
import { GTM_ID } from "@/data/site"

// Google Tag Manager (carries the Google Analytics tag). Loaded with
// `lazyOnload`: Next injects it client-side during browser idle time, after
// the page's own resources have finished, so it never competes with the
// LCP image, fonts or hydration. The GTM container is `async` by design, so
// it doesn't block parsing either.
//
// The inline snippet is the standard GTM bootstrap: it seeds the dataLayer
// and pushes `gtm.start` before loading gtm.js. Both run in the same
// lazyOnload slot so ordering is guaranteed.
//
// Only rendered in production so local dev and previews don't pollute stats.
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null

  return (
    <Script id="gtm" strategy="lazyOnload">
      {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({"gtm.start":new Date().getTime(),event:"gtm.js"});var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtm.js?id=${GTM_ID}";document.head.appendChild(s);`}
    </Script>
  )
}
