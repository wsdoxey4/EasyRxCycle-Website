"use client";
import { useState } from "react";

// EPA RCRA generator categories (40 CFR 262.13). Federal thresholds; states can be
// stricter. Educational — not a formal generator-status determination.
type Cat = "VSQG" | "SQG" | "LQG";
const RESULT: Record<Cat, { name: string; sub: string; points: string[] }> = {
  VSQG: {
    name: "Very Small Quantity Generator (VSQG)",
    sub: "≤ 100 kg/month hazardous waste AND ≤ 1 kg/month acute hazardous waste",
    points: [
      "Identify your hazardous waste and never exceed the VSQG limits (or you move up a category).",
      "Keep no more than 1,000 kg of hazardous waste on site at a time.",
      "Send waste to a facility authorized to manage it (a permitted TSDF or, in many states, a VSQG-consolidation path).",
      "The lightest requirements of the three — but you still can't landfill or sewer hazardous pharmaceutical waste.",
    ],
  },
  SQG: {
    name: "Small Quantity Generator (SQG)",
    sub: "> 100 and < 1,000 kg/month hazardous waste AND ≤ 1 kg/month acute hazardous waste",
    points: [
      "Obtain an EPA ID number and manifest hazardous waste shipments.",
      "Store on site no longer than 180 days (270 if shipping > 200 miles) and keep ≤ 6,000 kg.",
      "Basic personnel training and a designated emergency coordinator.",
      "Comply with container management and labeling standards (40 CFR 262).",
    ],
  },
  LQG: {
    name: "Large Quantity Generator (LQG)",
    sub: "≥ 1,000 kg/month hazardous waste OR > 1 kg/month acute hazardous waste",
    points: [
      "EPA ID number, full manifesting, and biennial reporting.",
      "Store on site no longer than 90 days with no quantity limit.",
      "A full contingency plan, arrangements with local responders, and thorough personnel training.",
      "The most stringent generator requirements under RCRA (40 CFR 262).",
    ],
  },
};

const HAZ = [
  { label: "100 kg (about 220 lb) or less per month", v: "le100" },
  { label: "More than 100 but less than 1,000 kg / month", v: "mid" },
  { label: "1,000 kg (about 2,200 lb) or more per month", v: "ge1000" },
];
const ACUTE = [
  { label: "1 kg (about 2.2 lb) or less per month", v: "le1" },
  { label: "More than 1 kg per month", v: "gt1" },
];

function classify(haz: string, acute: string): Cat {
  if (acute === "gt1" || haz === "ge1000") return "LQG";
  if (haz === "mid") return "SQG";
  return "VSQG";
}

export default function GeneratorStatus() {
  const [haz, setHaz] = useState<string | null>(null);
  const [acute, setAcute] = useState<string | null>(null);
  const done = haz && acute;
  const cat = done ? classify(haz!, acute!) : null;

  return (
    <div className="wiz">
      <div className="wiz-q">
        <h2 className="wiz-title">1. How much RCRA-hazardous waste does your site generate per month?</h2>
        <p className="wiz-help">Count all RCRA-hazardous waste — including hazardous pharmaceutical waste (P-, U-, and characteristic drugs).</p>
        <div className="wiz-opts">
          {HAZ.map((o) => (
            <button key={o.v} type="button"
              className={"wiz-opt" + (haz === o.v ? " wiz-opt-on" : "")}
              onClick={() => setHaz(o.v)} aria-pressed={haz === o.v}>
              <span>{o.label}</span><span className="ar">{haz === o.v ? "✓" : "→"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="wiz-q" style={{ marginTop: 22 }}>
        <h2 className="wiz-title">2. How much ACUTE hazardous waste (P-listed) per month?</h2>
        <p className="wiz-help">P-listed drugs — e.g., warfarin ≥ 0.3%, nicotine, physostigmine, epinephrine base — plus their contaminated residues and containers.</p>
        <div className="wiz-opts">
          {ACUTE.map((o) => (
            <button key={o.v} type="button"
              className={"wiz-opt" + (acute === o.v ? " wiz-opt-on" : "")}
              onClick={() => setAcute(o.v)} aria-pressed={acute === o.v}>
              <span>{o.label}</span><span className="ar">{acute === o.v ? "✓" : "→"}</span>
            </button>
          ))}
        </div>
      </div>

      {cat && (
        <div className="wiz-result" style={{ marginTop: 24 }}>
          <span className="wiz-badge">Your likely generator status</span>
          <h2 className="wiz-title">{RESULT[cat].name}</h2>
          <p className="wiz-help" style={{ marginTop: 2 }}>{RESULT[cat].sub}</p>
          <ul className="wiz-list">
            {RESULT[cat].points.map((p) => (<li key={p}>{p}</li>))}
          </ul>
          <div className="wiz-cta">
            <a className="btn btn-primary" href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal <span className="ar">→</span></a>
            <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
          </div>
        </div>
      )}

      <p className="wiz-disclaimer">
        Educational estimate based on the federal RCRA thresholds (40 CFR 262.13). Your state may count waste
        differently or set stricter rules, and a formal generator-status determination is the facility&rsquo;s
        responsibility. Note EPA&rsquo;s Subpart P changed how many facilities count hazardous waste
        pharmaceuticals — <a href="/blog/epa-subpart-p-explained">see how</a>, or <a href="/get-a-quote">ask our team</a>.
      </p>
    </div>
  );
}
