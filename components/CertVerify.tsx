"use client";

import { useEffect, useState } from "react";

type R = { valid: boolean; name?: string; company?: string; date?: string; cert_no?: string };

export default function CertVerify() {
  const [id, setId] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<R | null>(null);

  async function check(v: string) {
    if (!v.trim()) return;
    setBusy(true); setRes(null);
    try {
      const j = await fetch(`/api/training?verify=${encodeURIComponent(v.trim())}`).then((r) => r.json());
      setRes({ valid: !!j.valid, name: j.name, company: j.company, date: j.date, cert_no: j.cert_no });
    } catch { setRes({ valid: false }); } finally { setBusy(false); }
  }

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("id");
    if (p) { setId(p); check(p); }
  }, []);

  return (
    <form className="rfq" onSubmit={(e) => { e.preventDefault(); check(id); }}>
      <label>Certificate number<input value={id} onChange={(e) => setId(e.target.value)} placeholder="ERX-PC-261022-XXXXX" required /></label>
      <button className="btn btn-primary" disabled={busy} type="submit">{busy ? "Checking…" : "Verify"} <span className="ar">→</span></button>
      {res && (res.valid ? (
        <div className="tc-score pass" style={{ marginTop: "8px" }}>
          <span className="tc-pct" style={{ fontSize: "20px" }}>Valid certificate</span>
          <span><b>{res.name}</b>{res.company ? ` · ${res.company}` : ""}</span>
          <span>Product &amp; Compliance Certification · {res.date ? new Date(res.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""} · {res.cert_no}</span>
        </div>
      ) : (
        <p className="form-note" style={{ color: "#B4442F" }}>No certificate found with that number. Check it and try again, or call 501-904-2929.</p>
      ))}
    </form>
  );
}
