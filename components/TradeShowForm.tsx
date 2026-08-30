"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/track";

// Booth capture form. Posts to /api/event-lead → saves to the portal DB + HubSpot, emails the coupon, and
// returns the code so we show it on-screen instantly. `show` is the slug ("iveccs" | "ems-world").
export default function TradeShowForm({ show, showName }: { show: string; showName: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [code, setCode] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) { setCode("—"); return; }   // honeypot
    const email = String(fd.get("email") || "").trim();
    if (!email) { setErr("Please enter your email."); return; }
    setBusy(true); setErr("");
    const payload = { name: String(fd.get("name") || ""), email, org: String(fd.get("org") || ""), phone: String(fd.get("phone") || ""), show };
    let out: { code?: string } = {};
    try { out = await fetch("/api/event-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).then((r) => r.json()); } catch { /* best-effort */ }
    trackEvent("generate_lead", { lead_source: "tradeshow", campaign: showName });
    setBusy(false); setCode(out.code || "check your email");
  }

  if (code) {
    return (
      <div className="lm-done">
        <div className="lm-check" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <h3>You&rsquo;re all set — here&rsquo;s 10% off.</h3>
        <div style={{ border: "2px dashed #33C089", borderRadius: 12, padding: "12px 22px", margin: "10px 0 14px", display: "inline-block" }}>
          <div style={{ fontSize: 11, letterSpacing: ".5px", textTransform: "uppercase", color: "#177f86", marginBottom: 3 }}>Your code</div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 1, color: "#123A44" }}>{code}</div>
        </div>
        <p>We emailed it to you too. One-time use, first order, expires in 30 days.</p>
        <a className="btn btn-primary" href="/shop?utm_source=tradeshow&utm_medium=events&utm_campaign=onsite">Shop mail-back kits <span className="ar">→</span></a>
      </div>
    );
  }

  return (
    <form className="lm-form" onSubmit={submit}>
      <h3>Get 10% off &mdash; scan &amp; done</h3>
      <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" /></label>
      <label>Work email<input name="email" type="email" required autoComplete="email" placeholder="you@facility.com" /></label>
      <label>Organization<input name="org" type="text" autoComplete="organization" placeholder="Your practice or company" /></label>
      <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-5555" /></label>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      {err && <p className="lm-err">{err}</p>}
      <button className="btn btn-primary lm-submit" disabled={busy}>{busy ? "One sec…" : "Get my 10% off"} <span className="ar">→</span></button>
      <p className="lm-fine">Your coupon appears here and lands in your inbox. We&rsquo;ll also send occasional compliance tips &mdash; unsubscribe anytime.</p>
    </form>
  );
}
