"use client";
import { useMemo, useState } from "react";
import { inCategory, money, autoshipCents } from "@/lib/shop";
import { trackEvent } from "@/lib/track";

// Estimate is built from our REAL kit prices — no invented competitor numbers.
const STREAMS = [
  { key: "sharps", label: "Sharps", cat: "sharps" },
  { key: "pharma", label: "Pharmaceutical waste", cat: "pharma" },
  { key: "biohazard", label: "Biohazard / RMW", cat: "biohazard" },
  { key: "medication", label: "Medication disposal", cat: "medication" },
  { key: "controlled", label: "Controlled substances", cat: "controlled" },
  { key: "chemo", label: "Trace chemo", cat: "chemo" },
  { key: "hazardous", label: "RCRA hazardous", cat: "hazardous" },
];
// representative "typical" kit = the 2nd-smallest size (a common practice size), volume scales frequency
function repCents(cat: string) {
  const p = inCategory(cat).map((x) => x.cents).sort((a, b) => a - b);
  return p.length ? p[Math.min(1, p.length - 1)] : 0;
}
const VOL = [
  { key: "low", label: "Low", note: "solo / small site", f: 0.34 },
  { key: "med", label: "Medium", note: "busy practice", f: 1 },
  { key: "high", label: "High", note: "high-volume / multi-provider", f: 2.6 },
];

export default function CostCalculator() {
  const [sel, setSel] = useState<Record<string, boolean>>({ sharps: true });
  const [vol, setVol] = useState("med");
  const [current, setCurrent] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);

  const f = VOL.find((v) => v.key === vol)!.f;
  const est = useMemo(() => {
    let one = 0, sub = 0;
    STREAMS.forEach((s) => {
      if (!sel[s.key]) return;
      const rc = repCents(s.cat);
      one += rc * f;
      sub += autoshipCents(rc) * f;
    });
    return { oneTime: Math.round(one), auto: Math.round(sub) };
  }, [sel, f]);

  const monthlyOne = est.oneTime / 100;
  const monthlyAuto = est.auto / 100;
  const cur = parseFloat(current) || 0;
  const savings = cur > 0 ? cur - monthlyAuto : 0;
  const nStreams = Object.values(sel).filter(Boolean).length;

  async function email(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) { setDone(true); return; }
    setBusy(true); setErr(false);
    const streams = STREAMS.filter((s) => sel[s.key]).map((s) => s.label).join(", ");
    const msg = `Cost estimate — streams: ${streams}; volume: ${vol}; est ~$${Math.round(monthlyAuto)}/mo (auto-ship)${cur ? `; current spend $${cur}/mo` : ""}`;
    try {
      const r = await fetch("/api/rfq", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name") || fd.get("org") || "Website visitor", email: fd.get("email"), org: fd.get("org"), role: "Cost calculator lead", streams, volume: vol, message: msg, pageUri: "/cost-calculator", company_website: fd.get("company_website") }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.ok === false) { setBusy(false); setErr(true); return; }
    } catch { setBusy(false); setErr(true); return; }
    trackEvent("generate_lead", { lead_source: "cost_calculator" });
    setBusy(false); setDone(true);
  }

  return (
    <div className="calc">
      <div className="calc-in">
        <div className="calc-field">
          <label className="calc-lbl">1 · Which waste do you generate?</label>
          <div className="calc-streams">
            {STREAMS.map((s) => (
              <label key={s.key} className={"calc-chip" + (sel[s.key] ? " on" : "")}>
                <input type="checkbox" checked={!!sel[s.key]} onChange={(e) => setSel((p) => ({ ...p, [s.key]: e.target.checked }))} />
                {s.label}
              </label>
            ))}
          </div>
        </div>
        <div className="calc-field">
          <label className="calc-lbl">2 · How much, roughly?</label>
          <div className="calc-vol">
            {VOL.map((v) => (
              <button type="button" key={v.key} className={"calc-volbtn" + (vol === v.key ? " on" : "")} onClick={() => setVol(v.key)}>
                <b>{v.label}</b><span>{v.note}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="calc-field">
          <label className="calc-lbl">3 · Paying a hauler now? (optional)</label>
          <div className="calc-cur">
            <span>$</span>
            <input type="number" inputMode="decimal" min="0" placeholder="your current monthly bill" value={current} onChange={(e) => setCurrent(e.target.value)} />
            <span>/ mo</span>
          </div>
        </div>
      </div>

      <div className="calc-out">
        {nStreams === 0 ? (
          <p className="calc-empty">Pick at least one waste stream to see your estimate.</p>
        ) : (
          <>
            <div className="calc-result">
              <span className="calc-rlbl">Estimated cost with Easy Rx Cycle</span>
              <div className="calc-big">{money(est.auto)}<small>/ mo</small></div>
              <p className="calc-sub">with auto-ship (20% off) · one-time {money(est.oneTime)}/mo · about {money(est.auto * 12)}/yr</p>
            </div>
            {cur > 0 && savings > 0 && (
              <div className="calc-savings">You&rsquo;d save about <b>{money(savings * 100)}/mo</b> vs your current bill — roughly {money(savings * 1200)}/yr.</div>
            )}
            <ul className="calc-incl">
              <li>No contract, no minimums</li><li>Prepaid both ways</li><li>Certificate of Destruction included</li>
            </ul>
            <p className="calc-note">Estimate only, based on typical kit sizes — <b>get an exact quote</b> for your setup.</p>

            {!done ? (
              <form className="calc-email" onSubmit={email}>
                <div className="calc-erow">
                  <input name="name" placeholder="Name" autoComplete="name" />
                  <input name="email" type="email" required placeholder="Work email" autoComplete="email" />
                </div>
                <input name="org" placeholder="Organization (optional)" autoComplete="organization" />
                <input type="text" name="company_website" tabIndex={-1} aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
                <button className="btn btn-primary" disabled={busy}>{busy ? "Sending…" : "Email me this estimate + a quote"} <span className="ar">→</span></button>
                {err && <p className="calc-note" style={{ color: "#b23b32", marginTop: "8px" }}>Couldn&rsquo;t send just now — please call 501-904-2929 or email sales@easyrxcycle.com.</p>}
              </form>
            ) : (
              <div className="calc-thanks">✓ Sent — a specialist will follow up with your exact quote.</div>
            )}
            <div className="calc-cta">
              <a className="btn btn-ghost" href="/shop">Shop kits &amp; exact prices</a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a custom quote</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
