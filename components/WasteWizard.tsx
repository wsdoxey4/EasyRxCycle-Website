"use client";
import { useState } from "react";

type Result = {
  stream: string;
  container: string;
  rule: string;
  detail: string;
  href: string;
  hrefLabel: string;
};
type Node =
  | { kind: "q"; q: string; help?: string; options: { label: string; next: string }[] }
  | { kind: "r"; result: Result };

// Guided, educational decision tree. Grounded in OSHA 1910.1030, DOT UN3291,
// DEA 21 CFR 1317, EPA RCRA 40 CFR incl. Subpart P (266), USP <800>. Not a
// substitute for a facility's own waste determination or an SDS.
const TREE: Record<string, Node> = {
  start: {
    kind: "q",
    q: "What are you trying to dispose of?",
    options: [
      { label: "Needles, syringes, or other sharps", next: "sharps" },
      { label: "A medication or drug (expired/unused)", next: "med" },
      { label: "Blood- or fluid-contaminated items (non-sharp)", next: "rmw" },
      { label: "Chemotherapy-related materials", next: "chemo" },
    ],
  },
  sharps: {
    kind: "r",
    result: {
      stream: "Sharps disposal",
      container: "Rigid, puncture-resistant sharps container",
      rule: "OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030); DOT UN3291 for transport",
      detail:
        "Needles, syringes with needles, lancets, and blades go in a labeled, leak- and puncture-resistant sharps container — never loose in a bag or the trash. A prepaid mail-back sharps kit is the simplest option for lower-volume sites.",
      href: "/our-solutions/sharps-disposal",
      hrefLabel: "Sharps disposal",
    },
  },
  med: {
    kind: "q",
    q: "Is the medication a DEA controlled substance (Schedule I–V)?",
    help: "Opioids, benzodiazepines, stimulants, testosterone, ketamine, and similar scheduled drugs.",
    options: [
      { label: "Yes — it's a controlled substance", next: "controlled" },
      { label: "No / not sure it's controlled", next: "med_haz" },
    ],
  },
  controlled: {
    kind: "r",
    result: {
      stream: "Controlled substance destruction",
      container: "DEA-compliant collection / mail-back, kept secure until destroyed",
      rule: "DEA 21 CFR 1317 — rendered non-retrievable; Form 41 (and Form 222 for Schedule II transfers)",
      detail:
        "Controlled substances must be rendered non-retrievable and documented — they can never be flushed, thrown in the trash, or returned for credit like ordinary stock. A DEA-registered destruction company or reverse distributor handles this with a Certificate of Destruction.",
      href: "/our-solutions/controlled-substance-destruction",
      hrefLabel: "Controlled substance destruction",
    },
  },
  med_haz: {
    kind: "q",
    q: "Is it a known RCRA-hazardous or hazardous drug?",
    help: "P-/U-listed examples: warfarin, nicotine products, epinephrine, physostigmine; many chemo agents; plus ignitable or toxic characteristic drugs. If unsure, check the SDS or our P/U-list guide.",
    options: [
      { label: "Yes — it's RCRA-hazardous / hazardous", next: "rcra" },
      { label: "It may still be returnable for manufacturer credit", next: "reverse" },
      { label: "No — non-controlled, non-hazardous", next: "nonhaz" },
    ],
  },
  rcra: {
    kind: "r",
    result: {
      stream: "RCRA hazardous pharmaceutical waste",
      container: "Black container (RCRA-hazardous)",
      rule: "EPA RCRA 40 CFR (P/U lists at 261.33; characteristics at 261.21–.24); Subpart P (40 CFR 266)",
      detail:
        "RCRA-hazardous drugs are managed as hazardous waste — not the blue bin, not the drain (Subpart P bans sewering them). Empty containers and residues can still carry the designation. Segregate to a black container and dispose through a permitted facility.",
      href: "/our-solutions/rcra-hazardous-pharmaceutical-waste",
      hrefLabel: "RCRA hazardous drug disposal",
    },
  },
  reverse: {
    kind: "r",
    result: {
      stream: "Reverse distribution",
      container: "Segregated returnable stock, documented",
      rule: "Manufacturer return policies; DEA 21 CFR 1317 if any controlled; EPA Subpart P if hazardous",
      detail:
        "Unexpired or short-dated, unopened, creditable stock may be worth returning to a reverse distributor for manufacturer credit before you destroy anything. Product outside the window, opened, non-creditable, or hazardous typically moves to destruction instead.",
      href: "/our-solutions/reverse-distribution",
      hrefLabel: "Reverse distribution",
    },
  },
  nonhaz: {
    kind: "r",
    result: {
      stream: "Non-hazardous pharmaceutical waste",
      container: "Blue container (non-hazardous pharmaceutical)",
      rule: "State pharmaceutical-waste rules; never flushed or landfilled as ordinary trash",
      detail:
        "Non-controlled, non-hazardous drugs — most OTC and many prescription meds — go in the blue pharmaceutical container for compliant destruction with documentation. Keep controlled and RCRA-hazardous drugs out of this stream.",
      href: "/our-solutions/pharmaceutical-waste-disposal",
      hrefLabel: "Pharmaceutical waste disposal",
    },
  },
  rmw: {
    kind: "q",
    q: "Is the item saturated, dripping, or caked with blood or other potentially infectious material?",
    help: "OSHA's test for regulated medical waste — lightly soiled items are often ordinary waste under state rules, but when in doubt, treat as regulated.",
    options: [
      { label: "Yes — saturated / would release fluid if compressed", next: "rmw_yes" },
      { label: "No — only lightly soiled", next: "rmw_no" },
    ],
  },
  rmw_yes: {
    kind: "r",
    result: {
      stream: "Biohazard / regulated medical waste (RMW)",
      container: "Red bag / red-bag-lined RMW container",
      rule: "OSHA 29 CFR 1910.1030; DOT UN3291; state RMW rules",
      detail:
        "Blood-saturated dressings, gauze, tubing, and similar items are regulated medical waste — red bag, then compliant treatment (autoclave or incineration per your state). Sharps still go in a sharps container, not the red bag.",
      href: "/our-solutions/biohazard-waste-disposal",
      hrefLabel: "Biohazard / RMW disposal",
    },
  },
  rmw_no: {
    kind: "r",
    result: {
      stream: "Often ordinary waste — but verify your state rule",
      container: "Check state requirements before discarding",
      rule: "State regulated-medical-waste definitions vary",
      detail:
        "Lightly soiled items that would not release fluid if compressed are frequently NOT regulated medical waste under federal OSHA — but several states define RMW more broadly. Confirm your state's rule before treating it as ordinary trash.",
      href: "/medical-waste-regulations-by-state",
      hrefLabel: "State regulations",
    },
  },
  chemo: {
    kind: "q",
    q: "Is it trace chemo (empty vials, PPE, tubing) or bulk (unused drug, partial vials, P/U-listed)?",
    help: "Trace = RCRA-empty containers and contaminated materials with only residual drug. Bulk = usable drug amounts or listed hazardous chemo agents.",
    options: [
      { label: "Trace — RCRA-empty vials, gowns, gloves, tubing", next: "chemo_trace" },
      { label: "Bulk — unused drug, partial vials, or P/U-listed", next: "rcra" },
    ],
  },
  chemo_trace: {
    kind: "r",
    result: {
      stream: "Trace chemotherapy waste",
      container: "Yellow container",
      rule: "USP <800> handling; incinerated at a permitted facility",
      detail:
        "Trace chemo — RCRA-empty vials and contaminated PPE/tubing — goes in a yellow container and is incinerated at a permitted facility. Bulk or P-/U-listed chemo is managed on the RCRA-hazardous path instead.",
      href: "/our-solutions/trace-chemotherapy-waste",
      hrefLabel: "Trace chemotherapy waste",
    },
  },
};

export default function WasteWizard() {
  const [path, setPath] = useState<string[]>(["start"]);
  const id = path[path.length - 1];
  const node = TREE[id];
  const go = (next: string) => setPath((p) => [...p, next]);
  const back = () => setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
  const restart = () => setPath(["start"]);

  return (
    <div className="wiz">
      <div className="wiz-head">
        <span className="wiz-step">Step {path.length}</span>
        {path.length > 1 && (
          <button className="wiz-back" onClick={back} type="button">← Back</button>
        )}
      </div>

      {node.kind === "q" ? (
        <div className="wiz-q">
          <h2 className="wiz-title">{node.q}</h2>
          {node.help && <p className="wiz-help">{node.help}</p>}
          <div className="wiz-opts">
            {node.options.map((o) => (
              <button key={o.next} className="wiz-opt" type="button" onClick={() => go(o.next)}>
                <span>{o.label}</span><span className="ar">→</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="wiz-result">
          <span className="wiz-badge">Recommended stream</span>
          <h2 className="wiz-title">{node.result.stream}</h2>
          <dl className="wiz-facts">
            <div><dt>Container</dt><dd>{node.result.container}</dd></div>
            <div><dt>Governing rule</dt><dd>{node.result.rule}</dd></div>
          </dl>
          <p className="wiz-detail">{node.result.detail}</p>
          <div className="wiz-cta">
            <a className="btn btn-primary" href={node.result.href}>{node.result.hrefLabel} <span className="ar">→</span></a>
            <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
          </div>
          <button className="wiz-restart" type="button" onClick={restart}>↺ Start over</button>
        </div>
      )}

      <p className="wiz-disclaimer">
        Educational guidance, not a formal waste determination. Classifications can vary by state and by a
        product&rsquo;s specific formulation — verify against the current regulations and the product&rsquo;s SDS,
        or <a href="/get-a-quote">ask our team</a>.
      </p>
    </div>
  );
}
