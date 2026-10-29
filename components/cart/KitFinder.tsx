"use client";
// "Which kit do I need?" — three questions (waste type, size, one-time vs auto-ship) that end in Add to Cart.
// Shoppers who aren't sure are routed to the waste-determination guide, a quote, or a phone call instead of guessing.
import { useState } from "react";
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
  { key: "unsure", label: "Not sure, or several types" },
];
const MEDS = [
  { key: "medication", label: "Mail them back to be destroyed", sub: "Commingled medications, with a Certificate of Destruction" },
  { key: "pharma", label: "An ongoing pharmaceutical waste stream", sub: "Non-hazardous expired and unused pharmaceuticals from your facility" },
  { key: "medication-onsite", label: "Deactivate them on-site", sub: "Renders medications non-retrievable, no return shipping" },
];
const BY_WEIGHT = new Set(["controlled", "charcoal"]);
const IV_KEYS = ["month", "3month", "6month"];

export default function KitFinder() {
  const { add } = useCart();
  const [waste, setWaste] = useState("");
  const [cat, setCat] = useState("");
  const [sku, setSku] = useState("");
  const [plan, setPlan] = useState<"once" | "auto" | "">("");
  const [interval, setIv] = useState("3month");
  const [added, setAdded] = useState(false);

  const step = !waste ? 1 : waste === "unsure" ? 0 : waste === "meds" && !cat ? 1.5 : !sku ? 2 : !plan ? 3 : 4;
  const sizes = cat ? inCategory(cat) : [];
  const sel = sizes.find((p) => p.sku === sku);
  const kit = cat ? KIT_BY_CATEGORY[cat] : null;
  const image = CATEGORIES.find((c) => c.key === cat)?.image;

  function pickWaste(k: string) {
    if (!waste) trackEvent("kit_finder_start", { page: location.pathname });
    setWaste(k); setAdded(false); setSku(""); setPlan("");
    setCat(k === "meds" || k === "unsure" ? "" : k);
  }
  function pickPlan(p: "once" | "auto") {
    setPlan(p);
    trackEvent("kit_finder_complete", { category: cat, sku, plan: p });
  }
  function reset() { setWaste(""); setCat(""); setSku(""); setPlan(""); setAdded(false); }
  function addToCart() {
    add(sku, { qty: 1, interval: plan === "auto" ? interval : null });
    setAdded(true);
  }

  const crumbs = [
    waste && WASTE.find((w) => w.key === waste)?.label,
    waste === "meds" && cat && MEDS.find((m) => m.key === cat)?.label,
    sel && sel.size,
  ].filter(Boolean) as string[];

  return (
    <div className="kf" id="kit-finder">
      <div className="kf-head">
        <span className="eyebrow">Kit finder</span>
        <h2>Which kit do I need?</h2>
        <p>Three questions, then straight to your cart.</p>
      </div>

      {crumbs.length > 0 && (
        <div className="kf-crumbs">
          {crumbs.map((c) => <span key={c}>{c}</span>)}
          <button type="button" onClick={reset}>Start over</button>
        </div>
      )}

      {step === 1 && (
        <fieldset className="kf-q">
          <legend><span className="kf-n">1 of 3</span> What are you disposing of?</legend>
          <div className="kf-opts">
            {WASTE.map((w) => (<button type="button" key={w.key} className="kf-opt" onClick={() => pickWaste(w.key)}>{w.label}</button>))}
          </div>
        </fieldset>
      )}

      {step === 1.5 && (
        <fieldset className="kf-q">
          <legend><span className="kf-n">1 of 3</span> How do you want to handle the medications?</legend>
          <div className="kf-opts kf-opts-1">
            {MEDS.map((m) => (<button type="button" key={m.key} className="kf-opt" onClick={() => setCat(m.key)}><b>{m.label}</b><small>{m.sub}</small></button>))}
          </div>
        </fieldset>
      )}

      {step === 0 && (
        <div className="kf-unsure">
          <p>That&rsquo;s common, especially if you generate more than one waste stream. Two quick ways to get it right:</p>
          <div className="kf-unsure-b">
            <a className="btn btn-primary" href="/waste-determination/">Use the waste determination guide <span className="ar">→</span></a>
            <a className="btn btn-ghost" href="/get-a-quote/">Get a quote for several streams</a>
          </div>
          <p className="kf-call">Or talk to a specialist: <a href="tel:5019042929">501-904-2929</a></p>
        </div>
      )}

      {step === 2 && (
        <fieldset className="kf-q">
          <legend><span className="kf-n">2 of 3</span> {BY_WEIGHT.has(cat) ? "How much will you send back?" : "Which size fits your volume?"}</legend>
          <p className="kf-hint">{BY_WEIGHT.has(cat) ? "Weigh what you're sending and pick the tier that covers it." : "Pick the container you would fill in the time you want between shipments."}</p>
          <div className="kf-opts kf-sizes">
            {sizes.map((p) => (<button type="button" key={p.sku} className="kf-opt kf-size" onClick={() => setSku(p.sku)}><b>{p.size}</b><small>{money(p.cents)}</small></button>))}
          </div>
        </fieldset>
      )}

      {step === 3 && sel && (
        <fieldset className="kf-q">
          <legend><span className="kf-n">3 of 3</span> One-time, or on a schedule?</legend>
          <div className="kf-opts kf-opts-2">
            <button type="button" className="kf-opt" onClick={() => pickPlan("once")}><b>One-time purchase</b><small>{money(sel.cents)}, ship once</small></button>
            <button type="button" className="kf-opt kf-opt-save" onClick={() => pickPlan("auto")}><b>Auto-ship and save 20%</b><small>{money(autoshipCents(sel.cents))} per delivery, cancel anytime</small></button>
          </div>
        </fieldset>
      )}

      {step === 4 && sel && kit && (
        <div className="kf-result">
          {image && <img src={image} alt={kit.name} width={1200} height={800} loading="lazy" />}
          <div className="kf-r-body">
            <span className="kf-r-label">Your kit</span>
            <h3>{kit.name}</h3>
            <p className="kf-r-meta">{sel.size} &middot; {plan === "auto" ? `${money(autoshipCents(sel.cents))} per delivery (save 20%)` : money(sel.cents)}</p>
            {plan === "auto" && (
              <label className="kf-freq">
                <span>Deliver</span>
                <select value={interval} onChange={(e) => setIv(e.target.value)}>
                  {IV_KEYS.map((k) => { const i = INTERVALS.find((x) => x.key === k)!; return <option key={k} value={k}>{i.label}</option>; })}
                </select>
              </label>
            )}
            <p className="kf-r-blurb">{kit.cardBlurb}</p>
            {cat === "controlled" && <p className="kf-r-note">After checkout you&rsquo;ll complete a short drug inventory manifest to put in the box. Have your DEA number handy.</p>}
            <div className="kf-r-b">
              <button type="button" className="btn btn-primary" onClick={addToCart}>{added ? "Added. Add another" : "Add to cart"} <span className="ar">→</span></button>
              <a className="btn btn-ghost" href={`/shop/${kit.slug}/`}>See kit details</a>
            </div>
            <SaveCart lines={[{ sku: sel.sku, qty: 1 }]} label="Not ready to order? Email me this kit" source="kit-finder" />
          </div>
        </div>
      )}
    </div>
  );
}
