"use client";

import Script from "next/script";
import { ANALYTICS } from "@/lib/site";

// Loads GA4 (gtag) + GTM + Microsoft Clarity — only when NEXT_PUBLIC_ANALYTICS=true.
// Dormant on staging so test traffic never pollutes production data.
export default function Analytics() {
  if (!ANALYTICS.on) return null;
  return (
    <>
      {ANALYTICS.ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
            gtag('js',new Date());gtag('config','${ANALYTICS.ga4}');
          `}</Script>
        </>
      )}
      {ANALYTICS.gtm && (
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${ANALYTICS.gtm}');
        `}</Script>
      )}
      {ANALYTICS.clarity && (
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${ANALYTICS.clarity}");
        `}</Script>
      )}
    </>
  );
}
