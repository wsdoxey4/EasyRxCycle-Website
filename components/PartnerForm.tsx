"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/track";
import { getAttribution } from "@/lib/attribution";

const CHANNELS = [
  "GPO / purchasing group",
  "Distributor / wholesaler",
  "3PL / fulfillment",
  "Broker / independent rep",
  "Manufacturer (recall / destruction)",
  "Other",
];
const SLUG_TO_LABEL: Record<string, string> = {
  gpos: "GPO / purchasing group",
  "distributors-wholesalers": "Distributor / wholesaler",
  "3pls-fulfillment": "3PL / fulfillment",
  brokers: "Broker / independent rep",
};
const SIZES = ["Just exploring", "A handful of accounts", "Dozens of accounts", "Hundreds+ / national", "Not sure yet"];

export default function PartnerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");
  const [channel, setChannel] = useState("");

  // Pre-fill the channel from a ?channel= param (channel pages link here).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("channel");
    if (p && SLUG_TO_LABEL[p]) setChannel(SLUG_TO_LABEL[p]);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    const fd = new FormData(e.currentTarget);
    const a = getAttribution();
    const data: Record<string, unknown> = {
      name: String(fd.get("name") || ""),
      org: String(fd.get("org") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      role: `Partner — ${String(fd.get("channel") || "Unspecified")}`,
      volume: String(fd.get("size") || ""),
      message: String(fd.get("message") || ""),
      consent: fd.get("consent") ? "Opted in" : "Opted out",
      company_website: String(fd.get("company_website") || ""), // honeypot
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      channel: a.channel, utm: a.utm,
    };
    try {
      const r = await fetch("/api/rfq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({ ok: false }));
      if (j.ok) { setStatus("ok"); trackEvent("generate_lead", { form: "partner", currency: "USD" }); }
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
        <h3>Application received.</h3>
        <p>Our partnerships team will reach out to get you set up. Prefer to talk now? Call <b>501-904-2929</b>.</p>
      </div>
    );
  }

  return (
    <form className="rfq" onSubmit={onSubmit}>
      <label>Full name*<input name="name" required autoComplete="name" /></label>
      <label>Company*<input name="org" required autoComplete="organization" /></label>
      <label>Work email*<input name="email" type="email" required autoComplete="email" /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="full">Partner type*
        <select name="channel" required value={channel} onChange={(e) => setChannel(e.target.value)}>
          <option value="" disabled>Select…</option>{CHANNELS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label className="full">How many accounts could you bring?
        <select name="size" defaultValue=""><option value="" disabled>Select…</option>{SIZES.map((v) => <option key={v}>{v}</option>)}</select>
      </label>
      <label className="full">Tell us about your business<textarea name="message" placeholder="Your accounts, territory, current vendors, and how you'd like to work with us." /></label>
      <label className="full consent">
        <input type="checkbox" name="consent" value="yes" defaultChecked />
        <span>Keep me posted with partner updates &amp; compliance news. <span className="form-note">Uncheck to opt out &mdash; we&rsquo;ll still reply about your application.</span></span>
      </label>
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="rfq-submit">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : <>Apply to partner <span className="ar">→</span></>}
        </button>
        <span className="form-note">We reply same day · no obligation</span>
      </div>
      {status === "error" && <p className="full form-err">{err}</p>}
    </form>
  );
}
