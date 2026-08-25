"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";
import { captureAttribution } from "@/lib/attribution";

// One delegated listener fires cta_click for every Shop / Get-a-Quote / primary CTA, site-wide.
export default function Tracker() {
  useEffect(() => {
    captureAttribution();   // first-touch attribution: stamp channel/UTM on landing, site-wide
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const text = (a.textContent || "").trim().slice(0, 48);
      let cta = "";
      if (/#quote|\/get-a-quote/.test(href) || /quote/i.test(text)) cta = "get_quote";
      else if (/shop/i.test(text)) cta = "shop";
      else if (a.classList.contains("btn-primary") || a.classList.contains("btn-onteal") || a.classList.contains("btn-grad")) cta = "primary_cta";
      if (cta) trackEvent("cta_click", { cta, link_text: text, link_url: href, page: window.location.pathname });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
