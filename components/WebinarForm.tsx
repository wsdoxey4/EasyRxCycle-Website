"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";
import { getAttribution } from "@/lib/attribution";
import type { Webinar } from "@/lib/webinars";

const INDUSTRIES = ["Pharmacy", "Veterinary", "Dental", "Surgery center", "Long-term care", "Home health", "Physician / clinic", "Government / public agency", "Other"];

export default function WebinarForm({ webinar }: { webinar: Webinar }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    const fd = new FormData(e.currentTarget);
    const a = getAttribution();
    const data = {
      name: String(fd.get("name") || ""),
      org: String(fd.get("org") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      industry: String(fd.get("industry") || ""),
      company_website: String(fd.get("company_website") || ""), // honeypot
      slug: webinar.slug, title: webinar.title, when: webinar.when,
      pageUri: window.location.href, channel: a.channel, utm: a.utm,
    };
    try {
      const r = await fetch("/api/webinar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({ ok: false }));
      if (j.ok) { setStatus("ok"); trackEvent("generate_lead", { form: "webinar", webinar: webinar.slug, currency: "USD" }); }
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
        <h3>You&rsquo;re registered.</h3>
        <p>Check your inbox for a confirmation. We&rsquo;ll email your join link the week of the session.</p>
      </div>
    );
  }

  return (
    <form className="rfq" onSubmit={onSubmit}>
      <label>Full name*<input name="name" required autoComplete="name" /></label>
      <label>Organization*<input name="org" required autoComplete="organization" /></label>
      <label>Work email*<input name="email" type="email" required autoComplete="email" /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="full">Your industry*
        <select name="industry" required defaultValue=""><option value="" disabled>Select…</option>{INDUSTRIES.map((v) => <option key={v}>{v}</option>)}</select>
      </label>
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="rfq-submit">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Registering…" : <>Save my seat <span className="ar">→</span></>}
        </button>
        <span className="form-note">Free · 45 minutes · recording sent to all registrants</span>
      </div>
      {status === "error" && <p className="full form-err">{err}</p>}
    </form>
  );
}
