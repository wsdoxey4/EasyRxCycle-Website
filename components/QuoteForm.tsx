"use client";

import { trackEvent } from "@/lib/track";

import { useState } from "react";

const ROLES = [
  "Physician / medical office", "Dental practice", "Veterinary", "Hospital / health system",
  "Pharmacy (retail / independent)", "Pharmacy (chain / specialty / 340B)", "Surgery center", "Long-term care / hospice",
  "Lab / research", "Tattoo / med spa", "GPO / distributor / broker", "Other",
];
const STREAMS = [
  "Sharps", "Biohazard / RMW", "Pharmaceutical", "Controlled substances",
  "RCRA hazardous", "Trace chemo", "Medication kits", "Reverse distribution",
];
const VOLUMES = ["Single site — standard volume", "Single site — high volume", "Multiple sites", "Bulk / pickup", "Not sure yet"];

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {
      name: String(fd.get("name") || ""),
      org: String(fd.get("org") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      role: String(fd.get("role") || ""),
      volume: String(fd.get("volume") || ""),
      message: String(fd.get("message") || ""),
      streams: fd.getAll("streams").join(", "),
      consent: fd.get("consent") ? "Opted in" : "Opted out",
      company_website: String(fd.get("company_website") || ""), // honeypot
      pageUri: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      const r = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json().catch(() => ({ ok: false }));
      if (j.ok) { setStatus("ok"); trackEvent("generate_lead", { form: "rfq", currency: "USD" }); }
      else { setStatus("error"); setErr(j.error || "Something went wrong."); }
    } catch {
      setStatus("error");
      setErr("Network error — please call 501-904-2929.");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-ok">
        <div className="ok-badge">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3>Request received.</h3>
        <p>A specialist will reach out shortly with your quote. Need it now? Call <b>501-904-2929</b>.</p>
      </div>
    );
  }

  return (
    <form className="rfq" onSubmit={onSubmit}>
      <label>Full name*<input name="name" required autoComplete="name" /></label>
      <label>Organization<input name="org" autoComplete="organization" /></label>
      <label>Work email*<input name="email" type="email" required autoComplete="email" /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="full">What best describes you?
        <select name="role" defaultValue=""><option value="" disabled>Select…</option>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>
      </label>
      <div className="full">
        <span className="fld-label">Waste streams (select any)</span>
        <div className="streams">
          {STREAMS.map((s) => (
            <label key={s}><input type="checkbox" name="streams" value={s} /> {s}</label>
          ))}
        </div>
      </div>
      <label className="full">Estimated volume
        <select name="volume" defaultValue=""><option value="" disabled>Select…</option>{VOLUMES.map((v) => <option key={v}>{v}</option>)}</select>
      </label>
      <label className="full">Anything else?<textarea name="message" placeholder="States you operate in, timing, current vendor, etc." /></label>
      <label className="full consent">
        <input type="checkbox" name="consent" value="yes" defaultChecked />
        <span>Keep me posted with occasional compliance tips &amp; offers. <span className="form-note">Uncheck to opt out &mdash; we&rsquo;ll still reply about your request.</span></span>
      </label>
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="rfq-submit">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : <>Request my quote <span className="ar">→</span></>}
        </button>
        <span className="form-note">No obligation · we reply same day</span>
      </div>
      {status === "error" && <p className="full form-err">{err}</p>}
    </form>
  );
}
