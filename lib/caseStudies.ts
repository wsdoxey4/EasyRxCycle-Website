// Real client case studies. Attribution is industry + region only (no names, no permission needed).
// Every figure was provided by the Easy Rx Cycle team (honest ranges where given) — no invented numbers,
// no fabricated quotes. `quote` stays empty until a real (anonymized) quote is supplied.
export type Metric = { value: string; label: string };
export type Quote = { text: string; who: string };
export type BA = { label: string; before: string; after: string };
export type CaseStudy = {
  slug: string;
  industry: string;
  region?: string;
  icp: string;
  icpLabel: string;
  solutions: string[];
  tag: string;
  title: string;
  desc: string;
  stakes: string;      // why it mattered — short framing
  challenge: string;
  approach: string;
  result: string;
  metrics: Metric[];
  beforeAfter: BA[];   // the honest results visual
  quote?: Quote;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "southeast-veterinary-controlled-substance-audit",
    industry: "Veterinary group", region: "Southeast",
    icp: "veterinary", icpLabel: "veterinary practices",
    solutions: ["controlled-substance-destruction", "sharps-disposal", "pharmaceutical-waste-disposal"],
    tag: "Passed clean, ~20–30% lower cost, switched every site in under a week",
    title: "How a Southeast Veterinary Group Closed a Controlled-Substance Gap — and Cut Costs ~25%",
    desc: "A multi-location Southeast veterinary group fixed a controlled-substance documentation gap, passed its audit clean, and cut disposal costs ~20–30% — switched over in under a week, no contract.",
    stakes: "Veterinary practices carry Schedule I–V drugs and euthanasia solution the DEA scrutinizes closely — a thin controlled-substance paper trail is exactly what turns an inspection into a finding.",
    challenge: "A multi-location Southeast veterinary group was managing controlled drugs — sedatives, ketamine, euthanasia solution — under a national hauler, but the way expired and wasted controls were documented left a gap heading into an audit. It was also costing more than it should.",
    approach: "We switched every site onto prepaid mail-back kits with no contract — live in under a week — and stood up DEA-compliant, non-retrievable controlled-substance destruction with Form 41 and witnessed logs, alongside sharps and pharmaceutical waste.",
    result: "They came through their audit clean with a complete Certificate-of-Destruction trail — and cut disposal costs roughly 20–30% versus their old hauler, with no contract to stay locked into.",
    metrics: [
      { value: "~20–30%", label: "Lower cost vs. hauler" },
      { value: "Under a week", label: "Switched every site over" },
      { value: "Passed clean", label: "Compliance audit" },
    ],
    beforeAfter: [
      { label: "Disposal cost", before: "National-hauler pricing", after: "~20–30% lower" },
      { label: "Controlled-substance records", before: "Gap heading into audit", after: "Passed clean, full COD trail" },
      { label: "Contract", before: "Locked in", after: "None" },
      { label: "Switchover", before: "—", after: "Every site, under a week" },
    ],
  },
  {
    slug: "pharma-manufacturer-reliable-controlled-destruction",
    industry: "Pharmaceutical manufacturer", region: "Regional",
    icp: "pharma-manufacturers", icpLabel: "manufacturers & distributors",
    solutions: ["controlled-substance-destruction", "reverse-distribution", "rcra-hazardous-pharmaceutical-waste"],
    tag: "On-time destructions, no more missed pickups, ~20–35% lower cost",
    title: "How a Pharmaceutical Manufacturer Replaced an Unreliable Provider — and Saved ~20–35%",
    desc: "A regional pharmaceutical manufacturer replaced an unreliable provider with DEA-registered, registrant-to-registrant destruction — on-time every event, no missed pickups, and ~20–35% lower cost.",
    stakes: "As a DEA registrant, a manufacturer is accountable for every unit of controlled product it destroys — a provider that misses pickups or lags on paperwork isn't an inconvenience, it's a compliance exposure.",
    challenge: "A regional pharmaceutical manufacturer with a handful of sites depended on a destruction provider that had become unreliable — missed pickups and late paperwork — a serious problem when you're a DEA registrant accountable for every unit destroyed.",
    approach: "As a DEA-registered destruction company, we took over their controlled-substance destruction registrant-to-registrant — witnessed, non-retrievable, with chain-of-custody and a Certificate of Destruction on every event, on a schedule they could count on.",
    result: "Destructions and documentation now land on time, every event, with no more missed pickups — and it came in roughly 20–35% below what their previous provider charged.",
    metrics: [
      { value: "On-time", label: "Destruction + COD, every event" },
      { value: "~20–35%", label: "Lower cost" },
      { value: "Registrant-to-registrant", label: "DEA-compliant" },
    ],
    beforeAfter: [
      { label: "Reliability", before: "Missed pickups, late paperwork", after: "On-time, every event" },
      { label: "Documentation", before: "Lagging CODs", after: "COD + chain-of-custody, every event" },
      { label: "Cost", before: "Prior provider", after: "~20–35% lower" },
    ],
  },
  {
    slug: "surgery-center-multi-site-consolidation",
    industry: "Ambulatory surgery center", region: "",
    icp: "asc", icpLabel: "surgery centers",
    solutions: ["controlled-substance-destruction", "sharps-disposal", "biohazard-waste-disposal"],
    tag: "3 vendors → 1 program, ~15–25% cost savings, one clean paper trail",
    title: "How a Surgery Center Consolidated 3 Vendors Into One Program — and Saved ~15–25%",
    desc: "An ambulatory surgery center replaced two to three separate vendors with one standardized program — sharps, biohazard, and DEA-compliant controlled destruction — and cut disposal spend ~15–25%.",
    stakes: "A surgery center runs anesthesia controls through every case — and a patchwork of vendors means a patchwork paper trail, which is the last thing you want when the DEA or an accreditor comes calling.",
    challenge: "An ambulatory surgery center was juggling two to three separate vendors for its regulated waste — separate contracts, inconsistent paperwork, and no single chain-of-custody. Anesthesia controls made the documentation gaps especially risky.",
    approach: "We consolidated every stream — sharps, biohazard, pharmaceutical, and DEA-compliant controlled-substance destruction — into one program with unified documentation and a Certificate of Destruction on every shipment.",
    result: "They replaced two to three vendors with one accountable partner and one clean paper trail — and trimmed disposal spend roughly 15–25% in the process.",
    metrics: [
      { value: "3 → 1", label: "Vendors consolidated" },
      { value: "~15–25%", label: "Cost savings" },
      { value: "Every stream", label: "One program" },
    ],
    beforeAfter: [
      { label: "Vendors", before: "2–3 separate vendors", after: "1 accountable partner" },
      { label: "Paperwork", before: "Inconsistent, no single trail", after: "Unified, COD every shipment" },
      { label: "Cost", before: "Patchwork pricing", after: "~15–25% lower" },
    ],
  },
  {
    slug: "new-trt-clinic-compliant-from-day-one",
    industry: "TRT clinic", region: "",
    icp: "trt-clinics", icpLabel: "TRT clinics",
    solutions: ["controlled-substance-destruction", "sharps-disposal"],
    tag: "Compliant in under a week, Schedule III handled, has since added locations",
    title: "How a New TRT Clinic Got Compliant in Under a Week — and Grew With Us",
    desc: "A newly opened TRT clinic got compliant sharps and Schedule III controlled-substance disposal in place in under a week — no contract — and has since added locations on the same program.",
    stakes: "Testosterone is a Schedule III controlled substance — a new clinic that gets its wasting and destruction wrong from day one is building a compliance problem into its foundation.",
    challenge: "A newly opened TRT clinic had no waste-disposal system in place — and testosterone (a Schedule III controlled substance) plus injection sharps meant they needed a compliant setup fast, without signing a new business into a rigid contract.",
    approach: "We set them up in under a week with prepaid mail-back kits — sharps and controlled-substance disposal — no contract, no minimums, and Form 41 handled so the Schedule III side was right from day one.",
    result: "They were compliant within a week of opening — and have since grown, adding locations onto the same no-contract program.",
    metrics: [
      { value: "Under a week", label: "To compliant" },
      { value: "Schedule III", label: "Handled right, day one" },
      { value: "Added sites", label: "Grew with us" },
    ],
    beforeAfter: [
      { label: "Setup", before: "No system at open", after: "Compliant in under a week" },
      { label: "Schedule III (testosterone)", before: "Unhandled", after: "Form 41, non-retrievable, day one" },
      { label: "Commitment", before: "—", after: "No contract; grew to more sites" },
    ],
  },
  {
    slug: "independent-pharmacy-dea-222-cod-turnaround",
    industry: "Independent pharmacy", region: "",
    icp: "independent-pharmacy", icpLabel: "independent pharmacies",
    solutions: ["controlled-substance-destruction", "reverse-distribution", "rcra-hazardous-pharmaceutical-waste"],
    tag: "Passed its DEA audit with zero findings, on-time 222/COD, 30%+ lower cost",
    title: "How an Independent Pharmacy Passed Its DEA Audit With Zero Findings — at 30%+ Lower Cost",
    desc: "An independent pharmacy replaced a slow provider, got Form 222 and CODs on time every order, passed its DEA audit with zero findings, and did it at 30%+ lower cost.",
    stakes: "For a pharmacy, the controlled-substance paper trail is the audit — slow Form 222 processing and missing CODs are exactly the gaps a DEA inspector writes up.",
    challenge: "An independent pharmacy was stuck with a provider that lagged on the paperwork that matters most — DEA Form 222 processing and Certificates of Destruction were slow, leaving the pharmacy exposed on its controlled-substance recordkeeping heading into an audit.",
    approach: "We took over their controlled and RCRA-hazardous drug program — non-retrievable controlled-substance destruction with Form 222 and Form 41 handled correctly — and turned the documentation around on time, every order.",
    result: "They passed their DEA audit with zero findings, backed by an on-time paper trail on every order — and did it at more than 30% less than their prior provider.",
    metrics: [
      { value: "Zero findings", label: "DEA audit" },
      { value: "On-time", label: "222 + COD, every order" },
      { value: "30%+", label: "Lower cost" },
    ],
    beforeAfter: [
      { label: "DEA audit", before: "Exposed on recordkeeping", after: "Passed, zero findings" },
      { label: "Form 222 / COD", before: "Slow, chasing paperwork", after: "On-time, every order" },
      { label: "Cost", before: "Prior provider", after: "30%+ lower" },
    ],
  },
  {
    slug: "home-health-on-site-opioid-deactivation",
    industry: "Home health agency", region: "",
    icp: "home-health", icpLabel: "home health agencies",
    solutions: ["medication-disposal-kit", "controlled-substance-destruction", "sharps-disposal"],
    tag: "Diversion risk closed, every clinician equipped, rolled out in under a month",
    title: "How a Home Health Agency Closed Its Opioid Diversion Risk — Across the Whole Field Team",
    desc: "A home health agency equipped every field clinician with on-site deactivation kits — unused opioids neutralized at the bedside, diversion risk closed, audit-ready — rolled out in under a month.",
    stakes: "Unused opioids left in a patient's home after care ends are a live diversion risk — and a distributed field team with no on-the-spot destruction method is an exposure that grows with every visit.",
    challenge: "A home health agency had unused opioids and other controlled meds piling up in patients' homes after care ended, with no compliant, practical way for its field clinicians to destroy them on the spot — a real diversion risk.",
    approach: "We equipped every clinician with on-site deactivation kits — controlled meds rendered non-retrievable right at the point of care — plus prepaid mail-back kits for sharps and other medications, rolled out across the team in under a month.",
    result: "Unused controls are now neutralized at the bedside and documented, closing the diversion exposure — and the agency is audit-ready across its whole field team.",
    metrics: [
      { value: "Closed", label: "Diversion risk" },
      { value: "Every clinician", label: "Equipped, on-site" },
      { value: "Under a month", label: "Full rollout" },
    ],
    beforeAfter: [
      { label: "Unused opioids", before: "Piling up in patients' homes", after: "Neutralized at the bedside" },
      { label: "Diversion risk", before: "Open exposure", after: "Closed, documented" },
      { label: "Field team", before: "No compliant method", after: "Every clinician equipped (< 1 month)" },
    ],
  },
  {
    slug: "dental-practice-every-stream-no-contract",
    industry: "Dental practice", region: "",
    icp: "dental", icpLabel: "dental practices",
    solutions: ["sharps-disposal", "controlled-substance-destruction", "biohazard-waste-disposal"],
    tag: "Escaped a locked contract, every stream (incl. controlled) in one program, ~20–35% lower cost",
    title: "How a Dental Practice Escaped a Locked Contract — and Cut Costs ~20–35%",
    desc: "A dental practice escaped a rigid hauler contract, consolidated every stream including controlled substances into one no-contract program, and cut disposal costs ~20–35%.",
    stakes: "Dental offices touch amalgam, sharps, biohazard, and controlled sedation — spread across vendors and locked into a contract, it's easy to overpay and still have gaps.",
    challenge: "A dental practice was locked into a rigid hauler contract, with its regulated waste — sharps, amalgam, biohazard, and controlled substances — handled as a costly, confusing patchwork.",
    approach: "We consolidated every stream into one program: sharps mail-back, amalgam recycling under the EPA amalgam rule, biohazard, and DEA-compliant controlled-substance destruction — with a Certificate of Destruction on every shipment and no contract.",
    result: "They replaced a locked-in contract and a pile of vendors with a single accountable partner for every stream — including their controlled substances — at roughly 20–35% lower cost.",
    metrics: [
      { value: "~20–35%", label: "Lower cost" },
      { value: "No contract", label: "Ever" },
      { value: "Every stream", label: "incl. controlled" },
    ],
    beforeAfter: [
      { label: "Contract", before: "Locked-in hauler deal", after: "None" },
      { label: "Streams", before: "Patchwork of vendors", after: "One program, every stream incl. controlled" },
      { label: "Cost", before: "Contract pricing", after: "~20–35% lower" },
    ],
  },
];

export const CASE_BY_SLUG: Record<string, CaseStudy> = Object.fromEntries(
  CASE_STUDIES.map((c) => [c.slug, c])
);

export const CASE_BY_ICP: Record<string, CaseStudy> = Object.fromEntries(
  CASE_STUDIES.map((c) => [c.icp, c])
);

// First case study that uses each solution — for the proof card on /our-solutions pages.
export const CASE_BY_SOLUTION: Record<string, CaseStudy> = (() => {
  const out: Record<string, CaseStudy> = {};
  for (const c of CASE_STUDIES) {
    for (const s of c.solutions) if (!out[s]) out[s] = c;
  }
  return out;
})();

export const SOLUTION_LABELS: Record<string, string> = {
  "sharps-disposal": "Sharps disposal",
  "controlled-substance-destruction": "Controlled substance destruction",
  "pharmaceutical-waste-disposal": "Pharmaceutical waste disposal",
  "biohazard-waste-disposal": "Biohazard / RMW disposal",
  "rcra-hazardous-pharmaceutical-waste": "RCRA hazardous drug disposal",
  "reverse-distribution": "Pharmaceutical reverse distribution",
  "medication-disposal-kit": "Medication mail-back kits",
  "trace-chemotherapy-waste": "Trace chemotherapy waste",
};
