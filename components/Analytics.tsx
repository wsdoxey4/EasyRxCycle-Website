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
      {ANALYTICS.hubspot && (
        <Script id="hs-script-loader" src={`https://js.hs-scripts.com/${ANALYTICS.hubspot}.js`} strategy="afterInteractive" />
      )}
      {ANALYTICS.callrail && (
        <Script id="callrail-swap" src={ANALYTICS.callrail} strategy="afterInteractive" />
      )}
      {ANALYTICS.metaPixel && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${ANALYTICS.metaPixel}');fbq('track','PageView');
          `}</Script>
          <noscript><img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${ANALYTICS.metaPixel}&ev=PageView&noscript=1`} /></noscript>
        </>
      )}
      {ANALYTICS.linkedin && (
        <Script id="linkedin-insight" strategy="afterInteractive">{`
          _linkedin_partner_id="${ANALYTICS.linkedin}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);
        `}</Script>
      )}
    </>
  );
}
