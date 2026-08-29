"use client";
import { useEffect, useMemo, useState } from "react";
import { inCategory, money, autoshipCents, canExpedite, INTERVALS, EXPEDITE_CENTS, BY_SKU } from "@/lib/shop";
import { trackEvent } from "@/lib/track";
import { getAttribution } from "@/lib/attribution";
import AddressFields, { type Addr, blankAddr } from "@/components/AddressFields";

type Line = { id: number; sku: string; qty: number; interval: string | null; expedite: boolean };
type Loc = { id: number; name: string; addr: Addr; lines: Line[] };

let uid = 100;
const nid = () => ++uid;
const FREQ = [{ key: "", label: "One-time" }, ...INTERVALS.map((i) => ({ key: i.key, label: i.label }))];
const catOf = (sku: string) => BY_SKU[sku]?.category || "sharps";

const STREAM_ORDER = ["sharps", "biohazard", "pharma", "medication", "medication-onsite", "chemo", "controlled", "hazardous"];
const STREAM_SHORT: Record<string, string> = {
  sharps: "Sharps", biohazard: "Biohazard / RMW", pharma: "Pharmaceutical", medication: "Medication (mail-back)",
  "medication-onsite": "Medication (on-site)", chemo: "Trace chemo", controlled: "Controlled substances", hazardous: "RCRA hazardous",
};
const DEFAULT_SKU: Record<string, string> = {
  sharps: "ERX-SHP-02G-EA", biohazard: "ERX-BIO-08G-EA", pharma: "ERX-PHW-08G-EA", medication: "ERX-MED-125G-EA",
  "medication-onsite": "ERX-MED-125G-OS-EA", chemo: "ERX-CHM-08G-EA", controlled: "ERX-CTL-C05-EA", hazardous: "ERX-HAZ-08G-EA",
};
const FACILITIES = [
  { key: "physician", label: "Physician / medical office", streams: ["sharps", "biohazard", "pharma"] },
  { key: "dental", label: "Dental practice", streams: ["sharps", "biohazard", "pharma"] },
  { key: "veterinary", label: "Veterinary clinic", streams: ["controlled", "sharps", "pharma", "biohazard"] },
  { key: "pharmacy", label: "Pharmacy", streams: ["pharma", "controlled", "hazardous", "medication"] },
  { key: "surgery", label: "Surgery center / hospital", streams: ["controlled", "sharps", "biohazard", "pharma"] },
  { key: "ltc", label: "Long-term care / hospice / home health", streams: ["medication", "controlled", "sharps"] },
  { key: "aesthetic", label: "Med spa / TRT / weight-loss clinic", streams: ["sharps", "pharma", "controlled"] },
  { key: "lab", label: "Lab / research", streams: ["biohazard", "sharps", "hazardous"] },
  { key: "oncology", label: "Oncology / infusion center", streams: ["chemo", "sharps", "hazardous"] },
  { key: "tattoo", label: "Tattoo / body art studio", streams: ["sharps", "biohazard"] },
  { key: "funeral", label: "Funeral home", streams: ["hazardous", "sharps", "biohazard"] },
  { key: "other", label: "Something else", streams: [] },
];
const facLine = (cat: string): Line => ({ id: nid(), sku: DEFAULT_SKU[cat], qty: 1, interval: "3month", expedite: false });
const seedLoc = (name: string, streams: string[]): Loc => ({ id: nid(), name, addr: blankAddr(), lines: streams.map(facLine) });

function unitCents(l: Line) { const p = BY_SKU[l.sku]; if (!p) return 0; return l.interval ? autoshipCents(p.cents) : p.cents; }
const lineCents = (l: Line) => unitCents(l) * l.qty + (l.expedite && canExpedite(l.sku) ? EXPEDITE_CENTS : 0);
const locCents = (loc: Loc) => loc.lines.reduce((s, l) => s + lineCents(l), 0);

export default function ProgramBuilder() {
  const [facility, setFacility] = useState<string>("");
  const [locs, setLocs] = useState<Loc[]>([]);
  const [showRfq, setShowRfq] = useState(false);
  const [busy, setBusy] = useState<"" | "card" | "rfq">("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const fac = FACILITIES.find((f) => f.key === facility);
  const rec = fac?.streams || [];
  const multi = locs.length > 1;
  const allLines = locs.flatMap((x) => x.lines);
  const hasRecurring = allLines.some((l) => l.interval);
  const grand = useMemo(() => locs.reduce((s, x) => s + locCents(x), 0), [locs]);
  const anyLines = allLines.length > 0;

  function pickFacility(key: string) {
    setFacility(key);
    const f = FACILITIES.find((x) => x.key === key);
    setLocs(key ? [seedLoc("Main location", f?.streams || [])] : []);
  }
  function setCount(n: number) {
    setLocs((ls) => {
      if (n <= ls.length) return ls.slice(0, Math.max(1, n));
      const add = Array.from({ length: n - ls.length }, (_, i) => seedLoc(`Location ${ls.length + i + 1}`, rec));
      return [...ls, ...add];
    });
  }
  const patchLoc = (id: number, p: Partial<Loc>) => setLocs((ls) => ls.map((x) => x.id === id ? { ...x, ...p } : x));
  const patchLine = (locId: number, lineId: number, p: Partial<Line>) =>
    setLocs((ls) => ls.map((x) => x.id !== locId ? x : { ...x, lines: x.lines.map((l) => l.id === lineId ? { ...l, ...p } : l) }));
  const addStream = (locId: number, cat: string) => setLocs((ls) => ls.map((x) => x.id === locId ? { ...x, lines: [...x.lines, facLine(cat)] } : x));
  const rmLine = (locId: number, lineId: number) => setLocs((ls) => ls.map((x) => x.id === locId ? { ...x, lines: x.lines.filter((l) => l.id !== lineId) } : x));
  const copyFirst = (id: number) => setLocs((ls) => { const first = ls[0]; return ls.map((x) => x.id === id ? { ...x, lines: first.lines.map((l) => ({ ...l, id: nid() })) } : x); });

  // deep-link: /build-your-program?facility=dental preselects the facility (e.g. from an ICP page)
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("facility");
      if (p && FACILITIES.some((f) => f.key === p)) pickFacility(p);
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function summaryText() {
    return locs.map((loc) => {
      const addr = [loc.addr.line1, loc.addr.line2, loc.addr.city && `${loc.addr.city}, ${loc.addr.state} ${loc.addr.zip}`.trim()].filter(Boolean).join(" · ") || "(address to confirm)";
      const items = loc.lines.map((l) => { const p = BY_SKU[l.sku]; const freq = l.interval ? INTERVALS.find((i) => i.key === l.interval)?.label : "One-time"; return `   • ${p.family} — ${p.size} ×${l.qty} · ${freq}${l.expedite && canExpedite(l.sku) ? " · expedited" : ""}`; }).join("\n");
      return `${loc.name} [${addr}] — ${money(locCents(loc))}\n${items}`;
    }).join("\n\n");
  }

  async function checkoutCard() {
    const loc = locs[0];
    if (!loc?.lines.length) { setErr("Add at least one container first."); return; }
    setBusy("card"); setErr("");
    trackEvent("begin_checkout", { source: "program_builder", facility, containers: loc.lines.length, recurring: hasRecurring });
    try {
      const items = loc.lines.map((l) => ({ sku: l.sku, qty: l.qty, interval: l.interval || undefined, expedite: l.expedite || undefined }));
      const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, attribution: getAttribution() }) });
      const j = await r.json();
      if (j.ok && j.url) { window.location.href = j.url; return; }
      setErr(j.error || "Could not start checkout."); setBusy("");
    } catch { setErr("Checkout is temporarily unavailable. Please try again."); setBusy(""); }
  }

  async function submitRfq(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) { setDone(true); return; }
    const message = `MAIL-BACK PROGRAM (built online)\nFacility type: ${fac?.label || "—"}\nLocations: ${locs.length}\nPayment preference: ${fd.get("pay") || "invoice/PO"}\n\n${summaryText()}\n\nEst. first shipment (self-serve pricing): ${money(grand)}${hasRecurring ? " + recurring" : ""}`;
    setBusy("rfq"); setErr("");
    try {
      const r = await fetch("/api/rfq", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), email: fd.get("email"), org: fd.get("org"), phone: fd.get("phone"), role: `Program builder · ${fac?.label || ""}`, message, company_website: fd.get("company_website") }) });
      const j = await r.json().catch(() => ({ ok: false }));
      // Never show "success" if the lead didn't actually save — surface a call fallback instead.
      if (!r.ok || !j.ok) { setErr((j && j.error) || "We couldn’t submit that — please call 501-904-2929 and we’ll set your program up in minutes."); setBusy(""); return; }
    } catch { setErr("Network error — please call 501-904-2929 and we’ll set your program up in minutes."); setBusy(""); return; }
    trackEvent("generate_lead", { lead_source: "program_builder", facility, locations: locs.length, containers: allLines.length });
    setBusy(""); setDone(true);
  }

  return (
    <div className="pb">
      <div className="pb-build">
        {/* 1. facility */}
        <div className="pb-field">
          <label className="pb-label"><span className="pb-n">1</span> What kind of facility are you?</label>
          <select className="pb-select" value={facility} onChange={(e) => pickFacility(e.target.value)}>
            <option value="">Select your facility type…</option>
            {FACILITIES.map((f) => (<option key={f.key} value={f.key}>{f.label}</option>))}
          </select>
        </div>

        {facility && (
          <>
            {/* 2. locations count */}
            <div className="pb-field pb-countfield">
              <label className="pb-label"><span className="pb-n">2</span> How many locations?</label>
              <div className="pb-stepper">
                <button type="button" onClick={() => setCount(locs.length - 1)} disabled={locs.length <= 1} aria-label="Fewer">−</button>
                <b>{locs.length}</b>
                <button type="button" onClick={() => setCount(locs.length + 1)} aria-label="More">+</button>
              </div>
            </div>

            {/* 3. per-location build */}
            <div className="pb-field">
              <label className="pb-label"><span className="pb-n">3</span> Build each location</label>
              {locs.map((loc, li) => (
                <div className="pbl" key={loc.id}>
                  <div className="pbl-head">
                    <input className="pbl-name" value={loc.name} onChange={(e) => patchLoc(loc.id, { name: e.target.value })} placeholder={`Location ${li + 1} name`} />
                    {li > 0 && <button type="button" className="pbl-copy" onClick={() => copyFirst(loc.id)}>Copy Location 1</button>}
                  </div>

                  <div className="pbl-streams">
                    {STREAM_ORDER.map((cat) => {
                      const items = loc.lines.filter((l) => catOf(l.sku) === cat);
                      const suggested = rec.includes(cat);
                      return (
                        <div className={`pbs${items.length ? " has" : ""}`} key={cat}>
                          <div className="pbs-head">
                            <span className="pbs-name">{STREAM_SHORT[cat]}{suggested && <em>suggested</em>}</span>
                            <button type="button" className="pbs-add" onClick={() => addStream(loc.id, cat)}>{items.length ? "+ Add another" : "+ Add"}</button>
                          </div>
                          {items.map((l) => {
                            const sizes = inCategory(cat);
                            return (
                              <div className="pbl-line" key={l.id}>
                                <select className="pbl-size" value={l.sku} onChange={(e) => patchLine(loc.id, l.id, { sku: e.target.value, expedite: false })} aria-label="Size">
                                  {sizes.map((s) => (<option key={s.sku} value={s.sku}>{s.size} — {money(s.cents)}</option>))}
                                </select>
                                <input className="pbl-qty" type="number" min={1} max={99} value={l.qty} onChange={(e) => patchLine(loc.id, l.id, { qty: Math.max(1, Math.min(99, parseInt(e.target.value) || 1)) })} aria-label="Quantity" />
                                <select className="pbl-freq" value={l.interval || ""} onChange={(e) => patchLine(loc.id, l.id, { interval: e.target.value || null })} aria-label="Frequency">
                                  {FREQ.map((f) => (<option key={f.key} value={f.key}>{f.label}</option>))}
                                </select>
                                <span className="pbl-price">{money(lineCents(l))}</span>
                                <button type="button" className="pbl-x" onClick={() => rmLine(loc.id, l.id)} aria-label="Remove">×</button>
                                {canExpedite(l.sku) && (<label className="pbl-exp"><input type="checkbox" checked={l.expedite} onChange={(e) => patchLine(loc.id, l.id, { expedite: e.target.checked })} /> Expedite (+{money(EXPEDITE_CENTS)})</label>)}
                                {BY_SKU[l.sku]?.restricted && <span className="pbl-manifest">DEA manifest collected after checkout</span>}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pbl-addr-wrap">
                    <span className="pbl-addr-lbl">Ship-to address</span>
                    <AddressFields addr={loc.addr} onChange={(addr) => patchLoc(loc.id, { addr })} />
                  </div>

                  <div className="pbl-sub"><span>{loc.name || "This location"}</span><b>{money(locCents(loc))}{loc.lines.some((l) => l.interval) ? " first ship" : ""}</b></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* summary */}
      {facility && (
        <aside className="pb-sum">
          <div className="pb-sum-card">
            <h3>Your program</h3>
            {!anyLines && <p className="pb-empty">Add containers to build your program.</p>}
            {anyLines && locs.map((loc) => (
              <div className="pb-sum-loc" key={loc.id}>
                <div className="pb-sum-locname">{loc.name || "Location"} <span>{loc.lines.length} container{loc.lines.length === 1 ? "" : "s"}</span></div>
                <span className="pb-sum-price">{money(locCents(loc))}</span>
              </div>
            ))}
            {anyLines && (
              <>
                <div className="pb-sum-tot"><span>{hasRecurring ? "First shipment" : "Total"}</span><b>{money(grand)}</b></div>
                {hasRecurring && <p className="pb-sum-rec">Auto-ship containers renew on their own schedule (20% off). Pause or cancel anytime.</p>}
                {multi && <p className="pb-sum-multi">{locs.length} locations — we&rsquo;ll set up each site&rsquo;s address &amp; shipments.</p>}
                {err && <p className="pb-err">{err}</p>}
                {!multi && (<button className="btn btn-primary pb-cta" onClick={checkoutCard} disabled={busy !== ""}>{busy === "card" ? "Starting checkout…" : "Check out & start — pay by card"} <span className="ar">→</span></button>)}
                <button className="btn btn-ghost pb-cta2" onClick={() => setShowRfq((s) => !s)}>{multi ? "Set up my multi-site program" : "Prefer invoice / PO? Get it set up"}</button>
                <p className="pb-fine">Single site by card = instant auto-ship. Invoice/PO &amp; multi-site = we set it up with you, same program, no contract.</p>
              </>
            )}
          </div>
        </aside>
      )}

      {showRfq && anyLines && (
        <div className="pb-rfq">
          <div className="pb-rfq-card">
            {done ? (
              <div className="pb-rfq-done"><div className="pb-rfq-check" aria-hidden="true">✓</div><h3>Got it — your program is on its way to us.</h3><p>We&rsquo;ll confirm setup and get every location shipping. Or call <b>501-904-2929</b>.</p></div>
            ) : (
              <>
                <h3>Set up your program</h3>
                <p className="pb-rfq-sub">Send the program you built — we&rsquo;ll confirm pricing, set up {multi ? "each location" : "your site"}, and get you shipping. No contract.</p>
                <form onSubmit={submitRfq} className="pb-rfq-form">
                  <input name="name" placeholder="Name" autoComplete="name" required />
                  <input name="email" type="email" placeholder="Work email" autoComplete="email" required />
                  <input name="org" placeholder="Organization" autoComplete="organization" />
                  <input name="phone" placeholder="Phone" autoComplete="tel" />
                  <select name="pay" defaultValue="Invoice / PO"><option>Invoice / PO</option><option>Card auto-ship</option><option>Either</option></select>
                  <input type="text" name="company_website" tabIndex={-1} aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
                  <button className="btn btn-primary" disabled={busy !== ""}>{busy === "rfq" ? "Sending…" : "Send my program"} <span className="ar">→</span></button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
