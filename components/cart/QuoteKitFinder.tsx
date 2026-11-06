"use client";
// Kit finder shown right after a quote request is submitted. It walks through each waste stream the person
// checked on the form (same questions as the /shop kit finder), stacks the kits, then one "Buy now" puts the
// whole stack in the cart and goes to checkout. The /shop KitFinder is left untouched.
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, inCategory, money, autoshipCents, INTERVALS } from "@/lib/shop";
import { KIT_BY_CATEGORY } from "@/lib/shopContent";
import { trackEvent } from "@/lib/track";
import { useCart } from "./CartProvider";
import SaveCart from "./SaveCart";

const WASTE = [
  { key: "sharps", label: "Needles, syringes, lancets or pen needles" },
  { key: "biohazard", label: "Blood- or fluid-contaminated items, PPE, red-bag waste" },
  { key: "meds", label: "Expired or unused medications (not controlled)" },
  { key: "controlled", label: "Controlled substances (Schedules I–V)" },
  { key: "chemo", label: "Trace chemotherapy waste" },
  { key: "hazardous", label: "RCRA hazardous pharmaceuticals" },
  { key: "charcoal", label: "Used activated-charcoal disposal containers" },
];
const MEDS = [
  { key: "medication", label: "Mail them back to be destroyed", sub: "Commingled medications, with a Certificate of Destruction" },
  { key: "pharma", label: "An ongoing pharmaceutical waste stream", sub: "Non-hazardous expired and unused pharmaceuticals from your facility" },
  { key: "medication-onsite", label: "Deactivate them on-site", sub: "Renders medications non-retrievable, no return shipping" },
];
const STREAM_NAME: Record<string, string> = {
  sharps: "Sharps", biohazard: "Biohazard", meds: "Medications", pharma: "Pharmaceutical", controlled: "Controlled substances",
  chemo: "Trace chemo", hazardous: "RCRA hazardous", charcoal: "Activated charcoal",
};
const BY_WEIGHT = new Set(["controlled", "charcoal"]);
const IV_KEYS = ["month", "3month", "6month"];
// Smallest container first (quarts/gallons); kits sized by weight keep price order.
const sizeKey = (size: string, cents: number) => {
  const q = size.match(/([\d.]+)\s*quart/i); if (q) return parseFloat(q[1]) / 4;
  const g = size.match(/([\d.]+)\s*gallon/i); if (g) return parseFloat(g[1]);
  return cents;
};
type Pick = { cat: string; sku: string };
const imgFor = (cat: string) => CATEGORIES.find((c) => c.key === (cat === "meds" ? "medication" : cat))?.image;
type Contact = { email: string; name?: string; phone?: string };
// "Most ordered" size per kit, from real portal orders (order_items, counted 2026-11-05). Only kits with enough orders
// to mean something: sharps 2 gal 22 of 47, controlled 5 lb 33 of 61, pharma 2 gal 12 of 28, biohazard 2 gal 15 of 18,
// RCRA 2 gal 7 of 10. Medication, chemo and charcoal have too few orders to call one popular.
const POPULAR: Record<string, string> = {
  sharps: "ERX-SHP-02G-EA", controlled: "ERX-CTL-C05-EA", pharma: "ERX-PHW-02G-EA", biohazard: "ERX-BIO-02G-EA", hazardous: "ERX-HAZ-02G-EA",
};
// Save progress on their quote request (functions/api/quote-kits.js) so the rep sees what they picked. Fire and forget.
function save(contact: Contact | undefined, body: Record<string, unknown>) {
  if (!contact?.email) return;
  try { fetch("/api/quote-kits", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: contact.email, ...body }) }).catch(() => {}); } catch { /* no-op */ }
}

export default function QuoteKitFinder({ initial, contact }: { initial: string[]; contact?: Contact }) {
  const { add, cart, checkout } = useCart();
  const [queue, setQueue] = useState<string[]>(initial);   // streams still to size (keys from WASTE)
  const [cat, setCat] = useState("");                       // resolved kit category for the current stream
  const [stack, setStack] = useState<Pick[]>([]);
  const [picking, setPicking] = useState(initial.length === 0); // choose a waste type (no streams, or "add another kit")
  const [plan, setPlan] = useState<"once" | "auto">("once");
  const [interval, setIv] = useState("3month");
  const [going, setGoing] = useState(false);
  const checkoutRef = useRef(checkout);
  checkoutRef.current = checkout;

  const current = queue[0] || "";
  const resolved = current === "meds" ? cat : current;     // medications need one extra question first
  const sizes = resolved ? [...inCategory(resolved)].sort((a, b) => sizeKey(a.size, a.cents) - sizeKey(b.size, b.cents)) : [];
  const done = !picking && !current;

  const started = useRef(false);
  useEffect(() => {
    if (started.current) return; started.current = true;
    trackEvent("quote_kit_finder_start", { streams: initial.join(",") });
    save(contact, { stage: "shown" });
  }, [initial, contact]);

  const lineCents = (p: Pick) => { const c = inCategory(p.cat).find((x) => x.sku === p.sku)!.cents; return plan === "auto" ? autoshipCents(c) : c; };
  const sum = stack.reduce((n, p) => n + lineCents(p), 0);

  // Reached the kit list: track it (with value) and save the picks to their quote request.
  const listed = useRef("");
  useEffect(() => {
    if (!done || !stack.length) return;
    const sig = stack.map((p) => p.sku).join(",") + "|" + plan + "|" + interval;
    if (listed.current === sig) return;
    if (!listed.current) trackEvent("quote_kit_finder_list", { currency: "USD", value: sum / 100, kits: stack.map((p) => p.sku).join(","), count: stack.length });
    listed.current = sig;
    save(contact, { stage: "list", kits: stack.map((p) => ({ sku: p.sku, qty: 1 })), plan, interval });
  }, [done, stack, plan, interval, sum, contact]);

  // Buy now: once every stacked kit is in the cart (and saved), go to checkout.
  useEffect(() => {
    if (!going) return;
    if (stack.every((p) => cart.some((l) => l.sku === p.sku))) {
      const t = setTimeout(() => checkoutRef.current(), 80);
      return () => clearTimeout(t);
    }
  }, [going, cart, stack]);

  function next() { setQueue((q) => q.slice(1)); setCat(""); }
  function pickSize(sku: string) {
    trackEvent("quote_kit_finder_size", { category: resolved, sku, most_ordered: POPULAR[resolved] === sku });
    setStack((s) => [...s.filter((p) => p.sku !== sku), { cat: resolved, sku }]); next();
  }
  function skip() { trackEvent("quote_kit_finder_skip", { category: resolved || current }); next(); }
  function pickWaste(k: string) { setPicking(false); setQueue([k]); setCat(""); }
  function remove(sku: string) { setStack((s) => s.filter((p) => p.sku !== sku)); }
  function buyNow() {
    if (going || !stack.length) return;
    trackEvent("quote_kit_finder_buy", { currency: "USD", value: sum / 100, kits: stack.map((p) => p.sku).join(","), plan });
    save(contact, { stage: "buy", kits: stack.map((p) => ({ sku: p.sku, qty: 1 })), plan, interval });
    for (const p of stack) if (!cart.some((l) => l.sku === p.sku)) add(p.sku, { qty: 1, interval: plan === "auto" ? interval : null });
    setGoing(true);
  }


  return (
    <div className="kf qkf" id="quote-kit-finder">
      <div className="kf-head">
        <span className="eyebrow">Kit finder</span>
        <h2>{done ? "Your kits" : "Skip the wait. Your kits can ship today."}</h2>
        <p>{done ? "Check out now and your kits ship today." : "Your specialist still follows up. Ordering now just gets your kits moving sooner."}</p>
      </div>

      {stack.length > 0 && !done && (
        <div className="kf-crumbs">
          {stack.map((p) => <span key={p.sku}>{KIT_BY_CATEGORY[p.cat]?.name}: {inCategory(p.cat).find((x) => x.sku === p.sku)?.size}</span>)}
        </div>
      )}

      {picking && (
        <fieldset className="kf-q">
          <legend>What are you disposing of?</legend>
          <div className="kf-opts kf-opts-1">
            {WASTE.map((w) => (<button type="button" key={w.key} className="kf-opt qkf-opt-img" onClick={() => pickWaste(w.key)}>{imgFor(w.key) && <img src={imgFor(w.key)} alt="" width={1200} height={800} />}<span>{w.label}</span></button>))}
          </div>
          {stack.length > 0 && <button type="button" className="qkf-skip" onClick={() => setPicking(false)}>Back to my kits</button>}
        </fieldset>
      )}

      {!picking && current === "meds" && !cat && (
        <fieldset className="kf-q">
          <legend><span className="kf-n">{STREAM_NAME.meds}</span>How do you want to handle the medications?</legend>
          <div className="kf-opts kf-opts-1">
            {MEDS.map((m) => (<button type="button" key={m.key} className="kf-opt qkf-opt-img" onClick={() => setCat(m.key)}>{imgFor(m.key) && <img src={imgFor(m.key)} alt="" width={1200} height={800} />}<span><b>{m.label}</b><small>{m.sub}</small></span></button>))}
          </div>
          <button type="button" className="qkf-skip" onClick={skip}>Not sure? Skip it and your specialist will help you choose</button>
        </fieldset>
      )}

      {!picking && resolved && (
        <fieldset className="kf-q">
          <legend>
            <span className="kf-n">{STREAM_NAME[resolved] || STREAM_NAME[current]}</span>
            {BY_WEIGHT.has(resolved) ? "How much will you send back?" : "Which size fits your volume?"}
          </legend>
          <div className="qkf-kithead">
            {imgFor(resolved) && <img src={imgFor(resolved)} alt="" width={1200} height={800} />}
            <div><b>{KIT_BY_CATEGORY[resolved]?.name}</b><small>{KIT_BY_CATEGORY[resolved]?.cardBlurb}</small></div>
          </div>
          <p className="kf-hint">{BY_WEIGHT.has(resolved) ? "Pick the tier that covers what you're sending." : "Pick the container you would fill in the time you want between shipments."}</p>
          <div className="kf-opts kf-sizes">
            {sizes.map((p) => (<button type="button" key={p.sku} className={`kf-opt kf-size${POPULAR[resolved] === p.sku ? " qkf-popular" : ""}`} onClick={() => pickSize(p.sku)}>{POPULAR[resolved] === p.sku && <span className="qkf-pop">Most ordered</span>}<b>{p.size}</b><small>{money(p.cents)}</small></button>))}
          </div>
          <button type="button" className="qkf-skip" onClick={skip}>Not sure? Skip it and your specialist will size it with you</button>
        </fieldset>
      )}

      {done && stack.length === 0 && (
        <div className="kf-unsure">
          <p>No problem. Your specialist will help you pick the right kits when they follow up today.</p>
          <div className="kf-unsure-b"><button type="button" className="btn btn-ghost" onClick={() => setPicking(true)}>Pick a kit now</button></div>
        </div>
      )}

      {done && stack.length > 0 && (
        <div className="qkf-sum">
          <ul className="qkf-lines">
            {stack.map((p) => {
              const kit = KIT_BY_CATEGORY[p.cat];
              const img = CATEGORIES.find((c) => c.key === p.cat)?.image;
              const size = inCategory(p.cat).find((x) => x.sku === p.sku)?.size;
              return (
                <li key={p.sku}>
                  {img && <img src={img} alt="" width={1200} height={800} />}
                  <div className="qkf-l-txt">
                    <a href={kit ? `/shop/${kit.slug}/` : "/shop/"} data-cta="quote_finder_kit" data-kit={p.cat}>{kit?.name}</a>
                    <span>{size}</span>
                  </div>
                  <b className="qkf-l-price">{money(lineCents(p))}</b>
                  <button type="button" className="qkf-rm" onClick={() => remove(p.sku)} aria-label={`Remove ${kit?.name}`}>Remove</button>
                </li>
              );
            })}
          </ul>
          <button type="button" className="qkf-skip" onClick={() => setPicking(true)}>+ Add another kit</button>

          <div className="kf-opts kf-opts-2 qkf-plan">
            <button type="button" className={`kf-opt${plan === "once" ? " qkf-on" : ""}`} aria-pressed={plan === "once"} onClick={() => setPlan("once")}><b>One-time purchase</b><small>Ship once</small></button>
            <button type="button" className={`kf-opt kf-opt-save${plan === "auto" ? " qkf-on" : ""}`} aria-pressed={plan === "auto"} onClick={() => setPlan("auto")}><b>Auto-ship and save 20%</b><small>Fresh kits on a schedule, cancel anytime</small></button>
          </div>
          {plan === "auto" && (
            <label className="kf-freq">
              <span>Deliver</span>
              <select value={interval} onChange={(e) => setIv(e.target.value)}>
                {IV_KEYS.map((k) => { const i = INTERVALS.find((x) => x.key === k)!; return <option key={k} value={k}>{i.label}</option>; })}
              </select>
            </label>
          )}

          <div className="qkf-total"><span>Total{plan === "auto" ? " per delivery" : ""}</span><b>{money(sum)}</b></div>
          <div className="kf-r-b">
            <button type="button" className="btn btn-primary" onClick={buyNow} disabled={going}>{going ? "Opening checkout…" : <>Buy now <span className="ar">→</span></>}</button>
          </div>
          <p className="qkf-assure">No contract &middot; Prepaid shipping both ways &middot; Certificate of Destruction included</p>
          <SaveCart lines={stack.map((p) => ({ sku: p.sku, qty: 1 }))} label="Not ready? Email me this list" source="quote-kit-finder" defaultEmail={contact?.email || ""} />
        </div>
      )}
    </div>
  );
}
