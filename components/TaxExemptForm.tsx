"use client";

import { useEffect, useState } from "react";

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
const MAX_MB = 10;

// Read a File as base64 (no data: prefix) for the JSON upload.
function fileToB64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => { const s = String(r.result || ""); resolve(s.includes(",") ? s.slice(s.indexOf(",") + 1) : s); };
    r.onerror = () => reject(new Error("read failed"));
    r.readAsDataURL(file);
  });
}

export default function TaxExemptForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");
  const [fileName, setFileName] = useState("");

  // Pre-fill the email from ?email= (checkout passes the buyer's receipt email through).
  const [email, setEmail] = useState("");
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("email");
    if (p) setEmail(p);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const file = fd.get("cert") as File | null;
    if (!file || !file.size) { setErr("Please attach your exemption certificate."); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setErr(`That file is over ${MAX_MB} MB — please attach a smaller PDF or photo.`); return; }

    setStatus("sending");
    try {
      const content = await fileToB64(file);
      const data = {
        org: String(fd.get("org") || ""),
        first: String(fd.get("first") || ""),
        last: String(fd.get("last") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        street: String(fd.get("street") || ""),
        city: String(fd.get("city") || ""),
        state: String(fd.get("state") || ""),
        zip: String(fd.get("zip") || ""),
        billing_email: String(fd.get("billing_email") || ""),
        company_website: String(fd.get("company_website") || ""), // honeypot
        cert: { filename: file.name, type: file.type || "application/octet-stream", content },
      };
      const r = await fetch("/api/tax-exempt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({ ok: false }));
      if (j.ok) setStatus("ok");
      else { setStatus("error"); setErr(j.error || "Something went wrong — please call 501-904-2929."); }
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
        <p>We’re reviewing your certificate — usually within one business day. As soon as it’s approved, we’ll email you and sales tax comes off automatically at checkout when you use that email.</p>
        <p style={{ marginTop: 10 }}>In a hurry? Place your order now at the regular price and we’ll refund the tax once you’re approved. Call <b>501-904-2929</b>.</p>
      </div>
    );
  }

  return (
    <form className="rfq" onSubmit={onSubmit}>
      <label className="full">Business / organization name*<input name="org" required autoComplete="organization" /></label>
      <label>First name<input name="first" autoComplete="given-name" /></label>
      <label>Last name<input name="last" autoComplete="family-name" /></label>
      <label>Account email*<input name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="full">Billing address<input name="street" autoComplete="street-address" placeholder="Street address" /></label>
      <label>City<input name="city" autoComplete="address-level2" /></label>
      <label>State
        <select name="state" defaultValue=""><option value="" disabled>Select…</option>{US_STATES.map((s) => <option key={s}>{s}</option>)}</select>
      </label>
      <label>ZIP<input name="zip" autoComplete="postal-code" inputMode="numeric" /></label>
      <label>Billing email (if different)<input name="billing_email" type="email" autoComplete="email" /></label>
      <div className="full">
        <span className="fld-label">Exemption certificate*</span>
        <label className="te-file">
          <input type="file" name="cert" accept=".pdf,.jpg,.jpeg,.png,.heic,image/*,application/pdf" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
          <span className="te-file-btn">Choose file</span>
          <span className="te-file-name">{fileName || "PDF or photo of your resale / tax-exemption certificate"}</span>
        </label>
        <span className="form-note">Accepted: state resale, sales-tax exemption, or government/nonprofit certificate. Max {MAX_MB} MB.</span>
      </div>
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="rfq-submit">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Submitting…" : <>Submit for approval <span className="ar">→</span></>}
        </button>
        <span className="form-note">We review certificates the same business day.</span>
      </div>
      {status === "error" && <p className="full form-err">{err}</p>}
    </form>
  );
}
