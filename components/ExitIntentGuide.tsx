"use client";
import { useEffect, useRef, useState } from "react";
import { MAGNET_BY_SLUG } from "@/lib/leadMagnets";
import { trackEvent } from "@/lib/track";
import { getAttribution } from "@/lib/attribution";

// Exit-intent capture that offers THIS page's ICP guide. Desktop = mouse-leave modal;
// mobile = a compliant bottom sheet after a delay (never a full-screen interstitial).
export default function ExitIntentGuide({ slug }: { slug: string }) {
  const m = MAGNET_BY_SLUG[slug];
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fired = useRef(false);
  const KEY = "erx_exit_shown";

  useEffect(() => {
    if (!m) return;
    try { if (sessionStorage.getItem(KEY)) return; } catch {}
    const trigger = () => {
      if (fired.current) return;
      fired.current = true;
      try { sessionStorage.setItem(KEY, "1"); } catch {}
      setOpen(true);
      trackEvent("exit_intent_shown", { magnet: slug });
    };
    const onOut = (e: MouseEvent) => { if (e.clientY <= 4 && !e.relatedTarget) trigger(); };
    document.addEventListener("mouseout", onOut);
    const isMobile = window.matchMedia("(max-width:760px)").matches;
    const t = isMobile ? window.setTimeout(trigger, 35000) : 0;
    return () => { document.removeEventListener("mouseout", onOut); if (t) clearTimeout(t); };
  }, [m, slug]);

  if (!m || !open) return null;
  const close = () => setOpen(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) { setDone(true); return; }
    const email = String(fd.get("email") || "").trim();
    if (!email) { setErr("Please enter your email."); return; }
    setBusy(true); setErr("");
    try {
      await fetch("/api/lead-magnet", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), email, org: fd.get("org"), magnet: m.slug, file: m.file, title: m.h1, industry: m.industry, bullets: m.bullets, channel: getAttribution().channel, utm: getAttribution().utm, pageUri: typeof window !== "undefined" ? window.location.pathname : m.file }) });
    } catch {}
    trackEvent("generate_lead", { lead_source: "exit_intent", magnet: m.slug, industry: m.industry });
    setBusy(false); setDone(true);
  }

  return (
    <div className="exit-scrim" onClick={close}>
      <div className="exit-card" role="dialog" aria-modal="true" aria-label={m.h1} onClick={(e) => e.stopPropagation()}>
        <button className="exit-x" onClick={close} aria-label="Close">×</button>
        {done ? (
          <div className="exit-done">
            <div className="exit-check" aria-hidden="true">✓</div>
            <h3>Your guide is on its way.</h3>
            <p>We&rsquo;ve emailed it — or grab it now.</p>
            <a className="btn btn-primary" href={m.file} target="_blank" rel="noopener" download>Download the PDF ↓</a>
          </div>
        ) : (
          <>
            <span className="eyebrow">{m.eyebrow}</span>
            <h3 className="exit-h">Before you go — get the free guide</h3>
            <p className="exit-sub">{m.intro}</p>
            <ul className="exit-bul">{m.bullets.slice(0, 3).map((b) => (<li key={b}>{b}</li>))}</ul>
            <form className="exit-form" onSubmit={submit}>
              <input name="name" placeholder="Name" autoComplete="name" />
              <input name="email" type="email" required placeholder="Work email" autoComplete="email" />
              <input type="text" name="company_website" tabIndex={-1} aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
              {err && <p className="exit-err">{err}</p>}
              <button className="btn btn-primary" disabled={busy}>{busy ? "Sending…" : "Email me the free guide"} <span className="ar">→</span></button>
              <span className="exit-fine">Free PDF · instant download · unsubscribe anytime.</span>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
