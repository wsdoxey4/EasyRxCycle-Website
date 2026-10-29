// Phase 2 programmatic pages: industry × state (/who-we-serve/{industry}/{state}/).
// Each page = one industry's real waste streams + matching kits (live catalog prices) intersected with the
// state's real data (facility count + national rank from Census CBP in lib/geo.ts ESTAB, regulator,
// take-back law, sharps rule, metros). Facts here match the Distributor Sales Playbook / training
// (lib/training/lessons.ts) — no pathological, no bulk chemo, no amalgam; trace chemo only.
import { ESTAB, STATES, type EstabCounts, type StateInfo } from "@/lib/geo";

export type IndustryStream = { name: string; what: string; cat: string; kit: string; kitName: string };
export type Industry = {
  slug: string;              // matches app/who-we-serve/{slug}
  name: string;              // "Dental practices"
  label: string;             // headline form: "Dental" → "Dental waste disposal in Texas"
  one: string;               // "dental practice"
  estab: keyof EstabCounts;  // which Census count to use
  board: (s: StateInfo) => string;
  guide: string;             // /resources/...
  lead: (s: StateInfo, n: string) => string;
  streams: IndustryStream[];
  notTaken: string[];
  rules: (s: StateInfo) => { label: string; text: string }[];
  faqs: (s: StateInfo) => { q: string; a: string }[];
  stateStreams: string[];    // /our-solutions/{x}/{state}/ pages to link
};

const SH = { cat: "sharps", kit: "/shop/sharps-mail-back-kit/", kitName: "Sharps Mail-Back Kit" };
const BIO = { cat: "biohazard", kit: "/shop/biohazard-mail-back-kit/", kitName: "Biohazard Mail-Back Kit" };
const PH = { cat: "pharma", kit: "/shop/pharmaceutical-waste-mail-back-kit/", kitName: "Pharmaceutical Waste Kit" };
const CTL = { cat: "controlled", kit: "/shop/controlled-substance-mail-back-kit/", kitName: "Controlled Substance Kit" };
const MED = { cat: "medication", kit: "/shop/medication-mail-back-kit/", kitName: "Medication Disposal Kit (Mail-Back)" };
const ONS = { cat: "medication-onsite", kit: "/shop/on-site-medication-disposal-kit/", kitName: "Medication Disposal Kit (On-Site)" };
const RCRA = { cat: "hazardous", kit: "/shop/rcra-hazardous-mail-back-kit/", kitName: "Hazardous (RCRA) Kit" };
const CHM = { cat: "chemo", kit: "/shop/trace-chemo-mail-back-kit/", kitName: "Trace Chemo Kit" };
const ACR = { cat: "charcoal", kit: "/shop/activated-charcoal-take-back-kit/", kitName: "Activated Charcoal Take-Back Kit" };

const CTL_FAQ = (s: StateInfo, who: string) => ({
  q: `Can a ${s.name} ${who} mail back expired controlled substances?`,
  a: `Yes, if the practice holds a DEA registration. Use the Controlled Substance kit: you fill out one list, the Drug Inventory Manifest, and we complete the DEA Form 222, the 3–5 Form and DEA Form 41, then destroy everything by witnessed incineration to a non-retrievable state. Keep the records at least two years, longer if ${s.name} requires it.`,
});

export const INDUSTRIES: Industry[] = [
  {
    slug: "dental", label: "Dental", name: "Dental practices", one: "dental practice", estab: "dentists",
    board: (s) => `the ${s.name} dental board`, guide: "/resources/dental-waste-disposal-guide/",
    lead: (s, n) => `Compliant mail-back disposal for the ${n} dental practices across ${s.name} — sharps, expired medications, sedation controlled substances and red-bag waste, with a Certificate of Destruction on every mail-back order. No hauler contract, no route fees.`,
    streams: [
      { name: "Sharps", what: "Needles, syringes, scalpel blades and endodontic files", ...SH },
      { name: "Expired medications", what: "Expired non-controlled drugs, samples and OTC stock", ...PH },
      { name: "Controlled substances", what: "Sedation drugs such as midazolam and diazepam, and expired Schedule II–V stock", ...CTL },
      { name: "Biohazard", what: "Blood-soaked gauze and contaminated PPE from oral surgery", ...BIO },
    ],
    notTaken: ["Dental amalgam and lead foil (use an amalgam recycler)", "Pathological waste (extracted tissue)", "X-ray fixer and other chemicals"],
    rules: (s) => [
      { label: "OSHA", text: "Bloodborne Pathogens Standard (29 CFR 1910.1030) for sharps and red-bag waste" },
      { label: "DEA", text: "registrant rules for sedation and other controlled drugs (21 CFR 1317)" },
      { label: "EPA", text: "no sewering of drug waste" },
      { label: s.name, text: `${s.name} dental board recordkeeping and the state's medical-waste rules` },
    ],
    faqs: (s) => [
      { q: `How should a ${s.name} dental office dispose of used needles?`, a: `In an FDA-cleared sharps container, filled only to the fill line, then mailed back with the prepaid label. You receive a Certificate of Destruction and the Medical Waste Manifest. Most single-dentist offices use the 1-quart or 2-gallon size.` },
      CTL_FAQ(s, "dental practice"),
      { q: "Do you take dental amalgam?", a: "No. Amalgam and lead foil need a dedicated amalgam recycler. We handle sharps, expired medications, controlled substances and red-bag waste." },
      { q: `Do you serve dental offices in ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes. Mail-back kits ship to any ${s.name} address, from ${s.cities[0]} to ${s.cities[s.cities.length - 1]}, prepaid both ways.` },
    ],
    stateStreams: ["sharps-disposal", "controlled-substance-destruction", "pharmaceutical-waste-disposal", "biohazard-waste-disposal"],
  },
  {
    slug: "veterinary", label: "Veterinary", name: "Veterinary clinics", one: "veterinary clinic", estab: "vet",
    board: (s) => `the ${s.name} veterinary medical board`, guide: "/resources/veterinary-waste-disposal-guide/",
    lead: (s, n) => `Compliant mail-back disposal for the ${n} veterinary clinics across ${s.name} — expired controlled drugs like ketamine and euthanasia solution, sharps, expired medications and red-bag waste, documented on every order.`,
    streams: [
      { name: "Controlled substances", what: "Ketamine, euthanasia solution, butorphanol and other expired Schedule II–V drugs", ...CTL },
      { name: "Sharps", what: "Needles, syringes, catheters and scalpel blades", ...SH },
      { name: "Expired medications", what: "Expired non-controlled drugs, vaccines and dispensing returns", ...PH },
      { name: "Biohazard", what: "Blood-soaked gauze, drapes and contaminated PPE", ...BIO },
    ],
    notTaken: ["Animal carcasses and tissue (pathological waste)", "Bulk chemotherapy (trace chemo only)", "Chemicals and formalin"],
    rules: (s) => [
      { label: "DEA", text: "registrant rules for veterinary controlled drugs, including euthanasia solution (21 CFR 1317)" },
      { label: "OSHA", text: "Bloodborne Pathogens Standard for sharps and contaminated waste" },
      { label: "EPA", text: "no sewering of drug waste" },
      { label: s.name, text: `${s.name} veterinary medical board recordkeeping and state medical-waste rules` },
    ],
    faqs: (s) => [
      { q: `How does a ${s.name} vet clinic dispose of expired euthanasia solution?`, a: `Euthanasia solutions such as pentobarbital are controlled substances. A DEA-registered clinic sends them in the Controlled Substance kit; we complete the DEA forms and destroy them by witnessed incineration, then send your Certificate of Destruction.` },
      CTL_FAQ(s, "veterinary clinic"),
      { q: "Do you take animal remains?", a: "No. Carcasses and tissue are pathological waste, which we don't accept. We handle controlled substances, sharps, expired medications and red-bag waste." },
      { q: `Do you serve veterinary clinics in ${s.cities[0]} and across ${s.name}?`, a: `Yes. Mail-back kits ship to any ${s.name} address, from ${s.cities[0]} to ${s.cities[s.cities.length - 1]}, prepaid both ways.` },
    ],
    stateStreams: ["controlled-substance-destruction", "sharps-disposal", "pharmaceutical-waste-disposal", "biohazard-waste-disposal"],
  },
  {
    slug: "independent-pharmacy", label: "Pharmacy", name: "Pharmacies", one: "pharmacy", estab: "pharmacies",
    board: (s) => `the ${s.name} Board of Pharmacy`, guide: "/resources/pharmacy-waste-disposal-guide/",
    lead: (s, n) => `Compliant mail-back disposal for the ${n} pharmacies across ${s.name} — expired controlled substances with the DEA paperwork handled, non-hazardous and RCRA-hazardous drugs, patient take-back and immunization sharps.`,
    streams: [
      { name: "Controlled substances", what: "Expired Schedule II–V inventory, recalls and partial doses", ...CTL },
      { name: "Expired medications", what: "Expired non-controlled Rx, OTC and returned stock", ...PH },
      { name: "Hazardous (RCRA) drugs", what: "P- and U-listed drugs such as nicotine products and warfarin", ...RCRA },
      { name: "Patient take-back", what: "Patients' unused medications, including their controlled drugs", ...MED },
      { name: "Sharps", what: "Immunization needles and syringes", ...SH },
    ],
    notTaken: ["Bulk chemotherapy (trace chemo only)", "A pharmacy's own controlled inventory in patient take-back kits", "Inhalers and aerosols in take-back kits"],
    rules: (s) => [
      { label: "DEA", text: "Form 222 for Schedule I/II transfers, Form 41 for destruction, non-retrievable standard (21 CFR 1317)" },
      { label: "EPA", text: "RCRA P/U lists and Subpart P — no sewering of hazardous waste pharmaceuticals" },
      { label: "Take-back", text: "DEA patient take-back rules for mail-back packages" },
      { label: s.name, text: `${s.name} Board of Pharmacy licensing and recordkeeping` },
    ],
    faqs: (s) => [
      CTL_FAQ(s, "pharmacy"),
      { q: `Where do nicotine products and warfarin go for a ${s.name} pharmacy?`, a: "They're P-listed hazardous drugs under EPA rules, so they go in the black RCRA kit. You receive a Certificate of Destruction and the Uniform Hazardous Waste Manifest (EPA Form 8700-22). No DEA registration is needed for that kit." },
      { q: `Can a ${s.name} pharmacy offer patients medication take-back?`, a: "Yes. The Medication Disposal Mail-Back kit is a tamper-evident mailer for patients' unused medications, including their controlled drugs. Your own expired controlled inventory goes in the Controlled Substance kit instead." },
      { q: `Do you serve pharmacies in ${s.cities[0]} and across ${s.name}?`, a: `Yes. Mail-back kits ship to any ${s.name} address, from ${s.cities[0]} to ${s.cities[s.cities.length - 1]}, and larger volumes or pickups are available by same-day quote.` },
    ],
    stateStreams: ["controlled-substance-destruction", "pharmaceutical-waste-disposal", "rcra-hazardous-pharmaceutical-waste", "medication-disposal-kit"],
  },
  {
    slug: "physician-offices", label: "Physician office", name: "Physician offices", one: "physician office", estab: "physicians",
    board: (s) => `the ${s.name} medical board`, guide: "/resources/physician-office-waste-disposal-guide/",
    lead: (s, n) => `Compliant mail-back disposal for the ${n} physician offices across ${s.name} — sharps, red-bag waste, expired medications and controlled substances, with no hauler contract and a Certificate of Destruction on every mail-back order.`,
    streams: [
      { name: "Sharps", what: "Needles, syringes, lancets and blades", ...SH },
      { name: "Biohazard", what: "Blood-soaked gauze, dressings and contaminated PPE", ...BIO },
      { name: "Expired medications", what: "Expired non-controlled drugs and samples", ...PH },
      { name: "Controlled substances", what: "Expired Schedule II–V stock for DEA-registered practices", ...CTL },
    ],
    notTaken: ["Pathological waste (tissue)", "Bulk chemotherapy (trace chemo only)", "Chemicals and radioactive waste"],
    rules: (s) => [
      { label: "OSHA", text: "Bloodborne Pathogens Standard for sharps and red-bag waste" },
      { label: "DEA", text: "registrant rules for controlled drugs (21 CFR 1317)" },
      { label: "DOT", text: "packaging and shipping rules, met by every prepaid kit" },
      { label: s.name, text: `${s.name} medical-waste rules and ${s.name} medical board expectations` },
    ],
    faqs: (s) => [
      { q: `What does a ${s.name} physician office need for waste disposal?`, a: "Most offices need a Sharps kit, and many add a Biohazard kit for red-bag waste and a Pharmaceutical kit for expired samples. Practices that stock controlled drugs add the Controlled Substance kit." },
      CTL_FAQ(s, "physician office"),
      { q: "Do I need a hauler contract?", a: "No. Mail-back kits are prepaid both ways with no contract, route fees or minimums. Pickups for larger volumes are available by quote." },
      { q: `Do you serve physician offices in ${s.cities[0]} and across ${s.name}?`, a: `Yes. Mail-back kits ship to any ${s.name} address, from ${s.cities[0]} to ${s.cities[s.cities.length - 1]}.` },
    ],
    stateStreams: ["sharps-disposal", "biohazard-waste-disposal", "pharmaceutical-waste-disposal", "controlled-substance-destruction"],
  },
  {
    slug: "nursing-homes", label: "Nursing home", name: "Nursing homes and long-term care", one: "long-term care facility", estab: "nursing",
    board: (s) => `the ${s.name} health department`, guide: "/resources/nursing-home-waste-disposal-guide/",
    lead: (s, n) => `Medication and sharps disposal for the ${n} nursing and long-term-care facilities across ${s.name} — on-site deactivation at the nursing station, documented destruction of the full containers, controlled substances and sharps.`,
    streams: [
      { name: "On-site deactivation", what: "Residents' discontinued medications, deactivated at the nursing station", ...ONS },
      { name: "Full deactivation containers", what: "Used activated-charcoal containers sent back for documented destruction", ...ACR },
      { name: "Controlled substances", what: "Expired and wasted controlled drugs", ...CTL },
      { name: "Sharps", what: "Insulin pens, needles and lancets", ...SH },
    ],
    notTaken: ["Pathological waste", "Bulk chemotherapy (trace chemo only)", "Inhalers and aerosols in medication kits"],
    rules: (s) => [
      { label: "DEA", text: "controlled-substance disposal and take-back rules (21 CFR 1317)" },
      { label: "CMS", text: "federal long-term-care survey expectations for drug disposal records" },
      { label: "OSHA", text: "Bloodborne Pathogens Standard for sharps" },
      { label: s.name, text: `${s.name} health department and Board of Pharmacy requirements` },
    ],
    faqs: (s) => [
      { q: `How do ${s.name} nursing homes dispose of residents' medications?`, a: "Many use on-site deactivation containers at each nursing station: medications go in and the compound inside renders them non-retrievable. Nothing ships back, so the facility follows its own witnessing and logging procedures. Full containers then go back in an Activated Charcoal Take-Back kit for documented destruction." },
      { q: "Does the on-site kit come with a Certificate of Destruction?", a: "No. Nothing ships back, so we issue no Certificate for on-site deactivation. When the full containers come back in a Charcoal Take-Back kit, you receive a Certificate of Destruction." },
      CTL_FAQ(s, "long-term care facility"),
      { q: `Do you serve long-term care in ${s.cities[0]} and across ${s.name}?`, a: `Yes. Kits ship to any ${s.name} address, and multi-facility programs are available by same-day quote.` },
    ],
    stateStreams: ["medication-disposal-kit", "controlled-substance-destruction", "sharps-disposal", "pharmaceutical-waste-disposal"],
  },
  {
    slug: "hospitals", label: "Hospital", name: "Hospitals", one: "hospital", estab: "hospitals",
    board: (s) => `the ${s.name} health department`, guide: "/resources/hospital-waste-disposal-guide/",
    lead: (s, n) => `Mail-back and scheduled pickup for the ${n} hospitals across ${s.name} — controlled substances, RCRA-hazardous drugs, trace chemo, sharps and red-bag waste from satellite units, pharmacies and clinics.`,
    streams: [
      { name: "Controlled substances", what: "Expired and wasted Schedule II–V drugs from pharmacy and units", ...CTL },
      { name: "Hazardous (RCRA) drugs", what: "P-, U- and D-listed pharmaceuticals", ...RCRA },
      { name: "Trace chemo", what: "RCRA-empty vials, tubing, gowns and gloves from infusion", ...CHM },
      { name: "Sharps", what: "Needles, syringes and blades", ...SH },
      { name: "Biohazard", what: "Blood-soaked gauze and contaminated PPE", ...BIO },
    ],
    notTaken: ["Pathological waste", "Bulk chemotherapy (trace chemo only)", "Radioactive and laboratory chemical waste"],
    rules: (s) => [
      { label: "DEA", text: "Form 222, Form 41 and the non-retrievable standard (21 CFR 1317)" },
      { label: "EPA", text: "RCRA and Subpart P for hazardous waste pharmaceuticals" },
      { label: "USP <800>", text: "hazardous-drug handling for trace chemo" },
      { label: s.name, text: `${s.name} health department and state medical-waste rules` },
    ],
    faqs: (s) => [
      { q: `Can ${s.name} hospitals use mail-back kits?`, a: "Yes — they work well for satellite clinics, outpatient pharmacies and lower-volume streams like controlled substances and trace chemo. Scheduled pickups for higher volumes are available by same-day quote." },
      { q: "Do you take bulk chemotherapy?", a: "No. We take trace (RCRA-empty) chemo only. P-, U- and D-listed hazardous drugs go in the RCRA kit." },
      CTL_FAQ(s, "hospital"),
      { q: `Do you serve hospitals in ${s.cities[0]} and across ${s.name}?`, a: `Yes. Kits ship to any ${s.name} address, from ${s.cities[0]} to ${s.cities[s.cities.length - 1]}.` },
    ],
    stateStreams: ["controlled-substance-destruction", "rcra-hazardous-pharmaceutical-waste", "trace-chemotherapy-waste", "sharps-disposal"],
  },
];

// Staged indexing (same idea as STREAM_WAVE): build every page, index the industries listed here.
// Wave A (2026-10-23): dental, veterinary, pharmacies. Add physician-offices, nursing-homes, hospitals after ~2–3 weeks.
export const INDUSTRY_LIVE = new Set(["dental", "veterinary", "independent-pharmacy"]);

export const INDUSTRY_BY_SLUG: Record<string, Industry> = Object.fromEntries(INDUSTRIES.map((i) => [i.slug, i]));

/** Count, national rank and share of the U.S. total for an industry in a state (Census CBP 2022). */
export function stateStats(ind: Industry, slug: string) {
  const counts = STATES.map((s) => ({ slug: s.slug, n: ESTAB[s.slug]?.[ind.estab] ?? 0 })).sort((a, b) => b.n - a.n);
  const total = counts.reduce((a, c) => a + c.n, 0);
  const i = counts.findIndex((c) => c.slug === slug);
  const n = counts[i]?.n ?? 0;
  return { n, rank: i + 1, of: counts.length, share: total ? (n / total) * 100 : 0, peers: counts.slice(Math.max(0, i - 3), i + 4).filter((c) => c.slug !== slug).map((c) => c.slug) };
}
