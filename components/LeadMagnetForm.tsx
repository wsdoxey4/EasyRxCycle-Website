"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/track";

export default function LeadMagnetForm({ magnet, file, title, industry, bullets }: { magnet: string; file: string; title: string; industry?: string; bullets?: string[] }) {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) { setDone(true); return; } // honeypot
    const email = String(fd.get("email") || "").trim();
    if (!email) { setErr("Please enter your email."); return; }
    setBusy(true); setErr("");
    const payload = { name: String(fd.get("name") || ""), email, org: String(fd.get("org") || ""), magnet, file, title, industry, bullets };
    try {
      await fetch("/api/lead-magnet", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true });
    } catch {}
    trackEvent("generate_lead", { lead_source: "lead_magnet", magnet, industry });
    setBusy(false); setDone(true);
  }

  if (done) {
    return (
      <div className="lm-done">
        <div className="lm-check" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3>Your download is ready.</h3>
        <p>We&rsquo;ve also emailed you a copy.</p>
        <a className="btn btn-primary" href={file} target="_blank" rel="noopener" download>Download PDF <span className="ar">↓</span></a>
      </div>
    );
  }

  return (
    <form className="lm-form" onSubmit={submit}>
      <h3>Get the free download</h3>
      <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" /></label>
      <label>Work email<input name="email" type="email" required autoComplete="email" placeholder="you@facility.com" /></label>
      <label>Organization<input name="org" type="text" autoComplete="organization" placeholder="Your practice or company" /></label>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      {err && <p className="lm-err">{err}</p>}
      <button className="btn btn-primary lm-submit" disabled={busy}>{busy ? "Preparing…" : "Get the download"} <span className="ar">→</span></button>
      <p className="lm-fine">We&rsquo;ll email your download and occasional compliance tips. Unsubscribe anytime.</p>
    </form>
  );
}
