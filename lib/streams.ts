// Per-stream content for the data-driven /our-solutions/{stream}/{state} location pages.
// Each stream carries genuinely stream-specific substance (what it takes, the real regulatory
// framework, how disposal works, and stream+state FAQ) so every page stands on its own — not a
// token-swapped doorway. Accuracy rule: real federal frameworks (OSHA/DOT/EPA/DEA/RCRA) + the
// (accurate) state Board of Pharmacy where relevant; NO invented state statutes. Where no single
// state body name is universal (sharps/RMW), we frame around "your {state} medical-waste rules."

import type { StateInfo } from "./geo";

export type QA = { q: string; a: string };
export type Bullet = { label: string; text: string };
export type Step = { h: string; p: string };
export type Related = { href: string; h: string; p: string };

export type Stream = {
  slug: string;             // new pillar slug (folder under /our-solutions)
  name: string;             // "Sharps Disposal"
  eyebrow: string;          // hero eyebrow suffix, e.g. "Sharps & needles"
  shop?: string;            // shop kit href (omit for quote-only services like reverse distribution)
  image?: string;           // hero product image (omit for single-column hero)
  imageAlt?: string;        // image alt (state appended)
  guideSlug: string;        // /resources/{guideSlug} + exit-intent slug
  guideTitle: string;       // lead-magnet band title
  guideBody: string;        // lead-magnet band body
  kitLabel: string;         // primary CTA label ("Shop a kit" / "Get a quote")
  metaTitle: (s: StateInfo) => string;
  metaDesc: (s: StateInfo) => string;
  h1: (s: StateInfo) => { pre: string; accent: string };
  heroLead: (s: StateInfo) => string;
  takesHeading: (s: StateInfo) => string;
  takesLead: string;
  takes: string[];
  ladder?: { tag: "std" | "quote"; size: string; note: (s: StateInfo) => string }[];
  howHeading: (s: StateInfo) => string;
  steps: (s: StateInfo) => Step[];
  compHeading: (s: StateInfo) => string;
  compIntro: (s: StateInfo) => string;
  compBullets: (s: StateInfo) => Bullet[];
  serveHeading: (s: StateInfo) => string;
  serve: { href: string; label: string }[];
  related: (s: StateInfo) => Related[];
  faqs: (s: StateInfo) => QA[];
  finalH: (s: StateInfo) => string;
  finalP: (s: StateInfo) => string;
  proofSolution: string;    // CaseStudyProof solution key
};

const cities = (s: StateInfo) => s.cities.join(", ");
const last = (s: StateInfo) => s.cities[s.cities.length - 1];
const gov = (s: StateInfo) => s.agency ?? `${s.name}'s environmental agency`;

const stdLadder = [
  { tag: "std" as const, size: "Small", note: (s: StateInfo) => `Single-site practices and clinics in ${s.cities[0]} with routine volume.` },
  { tag: "std" as const, size: "Large", note: (s: StateInfo) => `Higher-volume ${s.name} sites — with an expedited option when timing matters.` },
  { tag: "quote" as const, size: "Bulk", note: (s: StateInfo) => `Bulk volume, multi-site ${s.name} programs, or scheduled pickup.` },
];

/* ------------------------------------------------------------------ SHARPS */
const sharps: Stream = {
  slug: "sharps-disposal",
  name: "Sharps Disposal",
  eyebrow: "Sharps & needles",
  shop: "/shop/sharps-mail-back-kit",
  image: "/images/products/sharps-kit.webp",
  imageAlt: "Easy Rx Cycle sharps mail-back kit",
  guideSlug: "sharps-disposal-compliance-guide",
  guideTitle: "The Sharps Disposal Compliance Guide",
  guideBody: "OSHA's Bloodborne Pathogens Standard, DOT mail-back rules, approved containers, and how any site disposes of sharps compliantly — plus a checklist and FAQ.",
  kitLabel: "Shop a kit",
  metaTitle: (s) => `Sharps Disposal in ${s.name} | Mail-Back Needle Disposal`,
  metaDesc: (s) => `OSHA- & DOT-compliant sharps disposal in ${s.name} — prepaid mail-back kits and scheduled service for ${s.cities[0]} and statewide, with tracking and documentation on every container.`,
  h1: (s) => ({ pre: "Sharps disposal in", accent: `${s.name}.` }),
  heroLead: (s) => `Prepaid, OSHA- and DOT-compliant sharps and needle disposal for ${cities(s)} and communities across ${s.name}. Approved containers, tracked mail-back or scheduled service, and documentation on every order — no pickups to wait on, no contracts.`,
  takesHeading: (s) => `Every sharp you generate, handled in ${s.name}.`,
  takesLead: "Contaminated sharps, rendered safe and documented.",
  takes: ["Needles & syringes", "Lancets & fingerstick devices", "Insulin pens & auto-injectors", "IV needles & butterfly sets", "Blood-glucose & phlebotomy supplies", "Any contaminated sharps"],
  ladder: stdLadder,
  howHeading: (s) => `Mail-back or scheduled service, statewide in ${s.name}.`,
  steps: (s) => [
    { h: "Order your kit", p: `Shipped to any ${s.name} address with an approved sharps container and prepaid return label — or set scheduled service for ${s.cities[0]} and higher-volume sites.` },
    { h: "Fill to the line", p: "Drop sharps directly into the approved container and seal it at the fill line — never overfill." },
    { h: "Ship or pickup", p: "Tracked door-to-door to our permitted treatment facility under DOT rules — no route to wait on." },
    { h: "Get documentation", p: "We treat the waste and archive your disposal record to your account." },
  ],
  compHeading: (s) => `${s.name} & federal sharps rules, handled.`,
  compIntro: (s) => `Sharps are a regulated medical waste. Federally, OSHA's Bloodborne Pathogens Standard (29 CFR 1910.1030) governs how sharps are contained and handled to protect workers, and the DOT (49 CFR) governs how they ship. In ${s.name}, state medical-waste regulations — administered by the ${gov(s)} — set container, labeling, and treatment requirements. Easy Rx Cycle's approved containers and prepaid, DOT-compliant mail-back keep you compliant with all of them, with documentation on every order.`,
  compBullets: (s) => [
    { label: "OSHA", text: "Bloodborne Pathogens Standard — 29 CFR 1910.1030 containment & handling" },
    { label: "DOT", text: "49 CFR compliant packaging & prepaid return shipping" },
    { label: `${s.name}`, text: "state medical-waste container, labeling & treatment rules" },
    { label: "Tracking", text: "door-to-door tracking and a disposal record archived to your account" },
  ],
  serveHeading: (s) => `Built for ${s.name} sites that use needles.`,
  serve: [
    { href: "/who-we-serve/retail-pharmacy/", label: "Retail pharmacies" },
    { href: "/who-we-serve/hospitals/", label: "Hospitals" },
    { href: "/who-we-serve/nursing-homes/", label: "Long-term care" },
    { href: "/who-we-serve/veterinary/", label: "Veterinary" },
    { href: "/who-we-serve/iv-hydration-ketamine/", label: "IV & infusion" },
    { href: "/who-we-serve/tattoo/", label: "Tattoo & piercing" },
    { href: "/who-we-serve/", label: "All industries →" },
  ],
  related: (s) => [
    { href: "/our-solutions/biohazard-waste-disposal/" + s.slug + "/", h: `Biohazard waste in ${s.name}`, p: "Blood-soaked materials, PPE, and other RMW." },
    { href: "/our-solutions/pharmaceutical-waste-disposal/" + s.slug + "/", h: `Pharmaceutical waste in ${s.name}`, p: "Expired and non-controlled medications." },
    { href: `/locations/${s.slug}/`, h: `All services in ${s.name}`, p: "Every waste stream we handle statewide." },
  ],
  faqs: (s) => [
    { q: `How do I dispose of sharps in ${s.name}?`, a: `Collect sharps in an approved, puncture-resistant container and send them to a permitted treatment facility — a prepaid mail-back kit is the simplest compliant option. We serve ${cities(s)} and everywhere across ${s.name}, with tracking and documentation on every container.` },
    { q: `Is it legal to mail sharps from ${s.name}?`, a: `Yes — DOT-compliant sharps mail-back is legal in all 50 states, including ${s.name}, when an approved container and packaging are used. Our kits are built to that standard and ship prepaid both ways.` },
    { q: `Can I throw needles in the trash in ${s.name}?`, a: `No — putting loose sharps in household or business trash is unsafe and prohibited under ${s.name}'s medical-waste rules. They must go in an approved container and be treated at a permitted facility.` },
    { q: `Who regulates sharps disposal in ${s.name}?`, a: `Federally, OSHA (worker safety) and the DOT (transport) apply. In ${s.name}, state medical-waste regulations administered by the health or environmental agency set container and treatment requirements. We handle disposal to all of them.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — mail-back reaches every ZIP in ${s.name}, from ${s.cities[0]} to ${last(s)}, and scheduled service is available for higher-volume sites across the state.` },
  ],
  finalH: (s) => `Dispose of sharps the compliant way in ${s.name}.`,
  finalP: (s) => `Order a prepaid, OSHA- and DOT-compliant kit in minutes, or get a same-day quote for scheduled service across ${s.name}.`,
  proofSolution: "sharps-disposal",
};

/* --------------------------------------------------------------- BIOHAZARD */
const biohazard: Stream = {
  slug: "biohazard-waste-disposal",
  name: "Biohazard Waste Disposal",
  eyebrow: "Biohazard / RMW",
  shop: "/shop/biohazard-mail-back-kit",
  image: "/images/products/biohazard-kit.webp",
  imageAlt: "Easy Rx Cycle biohazard / RMW mail-back kit",
  guideSlug: "biohazard-rmw-disposal-guide",
  guideTitle: "The Biohazard & RMW Disposal Guide",
  guideBody: "OSHA's Bloodborne Pathogens Standard, DOT shipping rules, what counts as regulated medical waste, and how any site disposes of it compliantly — plus a checklist and FAQ.",
  kitLabel: "Shop a kit",
  metaTitle: (s) => `Biohazard Waste Disposal in ${s.name} | Mail-Back RMW`,
  metaDesc: (s) => `OSHA- & DOT-compliant biohazard and regulated medical waste (RMW) disposal in ${s.name} — prepaid mail-back kits and scheduled service for ${s.cities[0]} and statewide, documented on every order.`,
  h1: (s) => ({ pre: "Biohazard waste disposal in", accent: `${s.name}.` }),
  heroLead: (s) => `Prepaid, OSHA- and DOT-compliant biohazard and regulated medical waste (RMW) disposal for ${cities(s)} and communities across ${s.name}. Blood-soaked materials, PPE, cultures and more — treated at a permitted facility, documented on every order, no contracts.`,
  takesHeading: (s) => `Every regulated medical waste you generate in ${s.name}.`,
  takesLead: "Non-sharps RMW, treated and documented.",
  takes: ["Blood-soaked gauze & dressings", "Contaminated PPE & gloves", "Cultures, swabs & specimens", "Blood & bodily-fluid waste", "Contaminated disposables", "Other non-sharps RMW"],
  ladder: stdLadder,
  howHeading: (s) => `Mail-back or scheduled service, statewide in ${s.name}.`,
  steps: (s) => [
    { h: "Order your kit", p: `Shipped to any ${s.name} address with a compliant RMW container and prepaid return label — or set scheduled service for ${s.cities[0]} and higher-volume sites.` },
    { h: "Fill & seal", p: "Load regulated medical waste into the lined container and seal it — keep sharps in their own approved container." },
    { h: "Ship or pickup", p: "Tracked door-to-door to our permitted treatment facility under DOT rules." },
    { h: "Get documentation", p: "We treat the waste — autoclave then landfill, or incineration — and archive your record." },
  ],
  compHeading: (s) => `${s.name} & federal RMW rules, handled.`,
  compIntro: (s) => `Regulated medical waste is governed federally by OSHA's Bloodborne Pathogens Standard (29 CFR 1910.1030) for worker protection and by the DOT (49 CFR) for transport. In ${s.name}, state medical-waste regulations — administered by the ${gov(s)} — define what is regulated and how it must be contained and treated. Easy Rx Cycle's compliant containers, prepaid DOT shipping, and permitted treatment (autoclave-then-landfill or incineration) keep you compliant with all of them, documented on every order.`,
  compBullets: (s) => [
    { label: "OSHA", text: "Bloodborne Pathogens Standard — 29 CFR 1910.1030" },
    { label: "DOT", text: "49 CFR compliant packaging & prepaid return shipping" },
    { label: `${s.name}`, text: "state RMW definition, containment & treatment rules" },
    { label: "Treatment", text: "permitted autoclave-then-landfill or incineration, documented" },
  ],
  serveHeading: (s) => `Built for ${s.name} providers who generate RMW.`,
  serve: [
    { href: "/who-we-serve/hospitals/", label: "Hospitals" },
    { href: "/who-we-serve/nursing-homes/", label: "Long-term care" },
    { href: "/who-we-serve/veterinary/", label: "Veterinary" },
    { href: "/who-we-serve/asc/", label: "Surgery centers (ASC)" },
    { href: "/who-we-serve/ems-fire/", label: "EMS & fire" },
    { href: "/who-we-serve/tattoo/", label: "Tattoo & piercing" },
    { href: "/who-we-serve/", label: "All industries →" },
  ],
  related: (s) => [
    { href: "/our-solutions/sharps-disposal/" + s.slug + "/", h: `Sharps disposal in ${s.name}`, p: "Needles, syringes, and other sharps." },
    { href: "/our-solutions/pharmaceutical-waste-disposal/" + s.slug + "/", h: `Pharmaceutical waste in ${s.name}`, p: "Expired and non-controlled medications." },
    { href: `/locations/${s.slug}/`, h: `All services in ${s.name}`, p: "Every waste stream we handle statewide." },
  ],
  faqs: (s) => [
    { q: `How do I dispose of biohazard waste in ${s.name}?`, a: `Collect regulated medical waste in a compliant, leak-resistant container and send it to a permitted treatment facility — a prepaid mail-back kit is the simplest compliant option. We serve ${cities(s)} and everywhere across ${s.name}, documented on every order.` },
    { q: `What counts as regulated medical waste in ${s.name}?`, a: `Generally, items soaked or caked with blood or infectious material — gauze, PPE, cultures, and similar — plus sharps (handled in their own container). ${s.name}'s medical-waste rules define the specifics, and our guide breaks them down.` },
    { q: `Is biohazard mail-back legal in ${s.name}?`, a: `Yes — DOT-compliant RMW mail-back is legal in ${s.name} when compliant packaging is used and the waste is treated at a permitted facility. Our kits meet that standard and ship prepaid both ways.` },
    { q: `Who regulates medical waste in ${s.name}?`, a: `Federally, OSHA (worker safety) and the DOT (transport). In ${s.name}, state medical-waste regulations administered by the health or environmental agency govern definition, containment, and treatment.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — mail-back reaches every ZIP in ${s.name}, from ${s.cities[0]} to ${last(s)}, and scheduled service is available for higher-volume sites across the state.` },
  ],
  finalH: (s) => `Handle regulated medical waste right in ${s.name}.`,
  finalP: (s) => `Order a prepaid, compliant RMW kit in minutes, or get a same-day quote for scheduled service across ${s.name}.`,
  proofSolution: "biohazard-waste-disposal",
};

/* ---------------------------------------------------------- PHARMACEUTICAL */
const pharmaceutical: Stream = {
  slug: "pharmaceutical-waste-disposal",
  name: "Pharmaceutical Waste Disposal",
  eyebrow: "Non-controlled Rx",
  shop: "/shop/pharmaceutical-waste-mail-back-kit",
  image: "/images/products/pharmaceutical-kit.webp",
  imageAlt: "Easy Rx Cycle pharmaceutical waste mail-back kit",
  guideSlug: "pharmaceutical-waste-disposal-guide",
  guideTitle: "The Pharmaceutical Waste Disposal Guide",
  guideBody: "Non-controlled vs. controlled vs. RCRA-hazardous, how to segregate each, and how any facility disposes of expired medications compliantly — plus a checklist and FAQ.",
  kitLabel: "Shop a kit",
  metaTitle: (s) => `Pharmaceutical Waste Disposal in ${s.name} | Expired Rx Mail-Back`,
  metaDesc: (s) => `Compliant pharmaceutical and expired-drug disposal in ${s.name} — prepaid mail-back kits and scheduled service for ${s.cities[0]} and statewide, with documentation on every order. Controlled and RCRA-hazardous handled through their own streams.`,
  h1: (s) => ({ pre: "Pharmaceutical waste disposal in", accent: `${s.name}.` }),
  heroLead: (s) => `Compliant disposal of expired, unused, and non-controlled medications for ${cities(s)} and communities across ${s.name}. Prepaid mail-back or scheduled service, documented on every order — with controlled substances and RCRA-hazardous drugs routed to their own compliant streams.`,
  takesHeading: (s) => `Every non-controlled medication you need gone in ${s.name}.`,
  takesLead: "Expired and unusable pharmaceuticals, documented.",
  takes: ["Expired non-controlled Rx", "OTC & sample medications", "Unused & returned meds (non-controlled)", "Vitamins & supplements", "Non-hazardous pharmaceutical waste", "Documentation on every order"],
  ladder: stdLadder,
  howHeading: (s) => `Mail-back or scheduled service, statewide in ${s.name}.`,
  steps: (s) => [
    { h: "Order your kit", p: `Shipped to any ${s.name} address, prepaid both ways — or set scheduled service for ${s.cities[0]} and higher-volume sites.` },
    { h: "Segregate & fill", p: "Load non-controlled pharmaceuticals into the kit; keep controlled and RCRA-hazardous drugs in their own streams." },
    { h: "Ship or pickup", p: "Tracked door-to-door to our permitted facility — no route to wait on." },
    { h: "Get documentation", p: "We destroy the waste compliantly and archive your record to your account." },
  ],
  compHeading: (s) => `${s.name} & federal pharmaceutical rules, handled.`,
  compIntro: (s) => `Pharmaceutical waste splits into three lanes, and mixing them is the most common compliance error. Non-controlled, non-hazardous drugs are the routine pharmaceutical stream. Controlled substances fall under the DEA (Form 41/222, non-retrievable destruction), and drugs that are also hazardous waste fall under the EPA's RCRA rules (40 CFR, including the Subpart P management standard). In ${s.name}, the ${s.name} Board of Pharmacy and the ${gov(s)} add their own requirements. Easy Rx Cycle sorts and routes each lane correctly — and documents every order.`,
  compBullets: (s) => [
    { label: "Non-controlled", text: "routine pharmaceutical destruction, documented" },
    { label: "DEA", text: "controlled substances routed to controlled destruction (Form 41/222)" },
    { label: "EPA / RCRA", text: "hazardous drugs routed to the RCRA stream (40 CFR, Subpart P)" },
    { label: `${s.name}`, text: "Board of Pharmacy & state environmental requirements" },
  ],
  serveHeading: (s) => `Built for ${s.name} providers who hold medications.`,
  serve: [
    { href: "/who-we-serve/retail-pharmacy/", label: "Retail pharmacies" },
    { href: "/who-we-serve/hospitals/", label: "Hospitals" },
    { href: "/who-we-serve/nursing-homes/", label: "Long-term care" },
    { href: "/who-we-serve/hospice/", label: "Hospice" },
    { href: "/who-we-serve/veterinary/", label: "Veterinary" },
    { href: "/who-we-serve/physician-offices/", label: "Physician offices" },
    { href: "/who-we-serve/", label: "All industries →" },
  ],
  related: (s) => [
    { href: "/our-solutions/controlled-substance-destruction/" + s.slug + "/", h: `Controlled destruction in ${s.name}`, p: "DEA Schedules II–V, non-retrievable." },
    { href: "/our-solutions/rcra-hazardous-pharmaceutical-waste/", h: "RCRA hazardous", p: "Subpart P & hazardous pharmaceutical waste." },
    { href: `/locations/${s.slug}/`, h: `All services in ${s.name}`, p: "Every waste stream we handle statewide." },
  ],
  faqs: (s) => [
    { q: `How do I dispose of expired medications in ${s.name}?`, a: `Segregate non-controlled drugs from controlled and hazardous ones, then send the non-controlled stream to a permitted facility — a prepaid mail-back kit is the simplest compliant option. We serve ${cities(s)} and everywhere across ${s.name}, documented on every order.` },
    { q: `Can non-controlled drugs go in the same kit in ${s.name}?`, a: `Yes — expired and unused non-controlled, non-hazardous medications go together in the pharmaceutical kit. Controlled substances and RCRA-hazardous drugs must be handled in their own streams, which we also provide.` },
    { q: `Who regulates pharmaceutical waste in ${s.name}?`, a: `It depends on the drug: the DEA for controlled substances, the EPA's RCRA rules for hazardous drugs, and routine pharmaceutical rules for the rest. In ${s.name}, the Board of Pharmacy and the state environmental agency add their requirements. We handle disposal to all of them.` },
    { q: `Do you also handle controlled and hazardous drugs in ${s.name}?`, a: `Yes — controlled substances route to our DEA-registered controlled destruction, and hazardous drugs route to our RCRA stream. One partner, every ${s.name} pharmaceutical lane.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — mail-back reaches every ZIP in ${s.name}, from ${s.cities[0]} to ${last(s)}, and scheduled service is available for higher-volume sites across the state.` },
  ],
  finalH: (s) => `Dispose of pharmaceutical waste right in ${s.name}.`,
  finalP: (s) => `Order a prepaid, compliant kit in minutes, or get a same-day quote for scheduled service across ${s.name}.`,
  proofSolution: "pharmaceutical-waste-disposal",
};

/* ---------------------------------------------------------- TRACE CHEMO */
const traceChemo: Stream = {
  slug: "trace-chemotherapy-waste",
  name: "Trace Chemotherapy Waste Disposal",
  eyebrow: "Trace chemo",
  shop: "/shop/trace-chemo-mail-back-kit",
  image: "/images/products/trace-chemo-kit.webp",
  imageAlt: "Easy Rx Cycle trace chemotherapy waste mail-back kit",
  guideSlug: "trace-chemotherapy-waste-guide",
  guideTitle: "The Trace Chemotherapy Waste Guide",
  guideBody: "USP <800> handling, what makes waste “trace” vs. bulk (RCRA-hazardous), the yellow-container rule, and how any site disposes of trace chemo compliantly — plus a checklist and FAQ.",
  kitLabel: "Shop a kit",
  metaTitle: (s) => `Trace Chemotherapy Waste Disposal in ${s.name} | Yellow-Container Mail-Back`,
  metaDesc: (s) => `Compliant trace chemotherapy waste disposal in ${s.name} — yellow-container mail-back kits and scheduled service for ${s.cities[0]} and statewide, incinerated and documented. Bulk/P-listed chemo routed to the RCRA stream.`,
  h1: (s) => ({ pre: "Trace chemotherapy waste disposal in", accent: `${s.name}.` }),
  heroLead: (s) => `Compliant disposal of trace (RCRA-empty) chemotherapy waste for ${cities(s)} and communities across ${s.name} — empty vials and syringes, trace-contaminated PPE and IV sets — collected in yellow containers, incinerated, and documented. Bulk and P-listed chemo route to our RCRA hazardous stream.`,
  takesHeading: (s) => `Every trace chemo item you generate in ${s.name}.`,
  takesLead: "RCRA-empty chemo waste, incinerated and documented.",
  takes: ["Empty (RCRA-empty) chemo vials & syringes", "Trace-contaminated PPE, gowns & gloves", "IV bags & tubing with trace residue", "Empty drug containers", "Contaminated prep materials", "Yellow-container trace waste"],
  ladder: stdLadder,
  howHeading: (s) => `Mail-back or scheduled service, statewide in ${s.name}.`,
  steps: (s) => [
    { h: "Order your kit", p: `Yellow trace-chemo container shipped to any ${s.name} address with a prepaid return label — or set scheduled service for ${s.cities[0]} and higher-volume sites.` },
    { h: "Fill the yellow container", p: "Place only trace (RCRA-empty) chemo waste in the yellow container — keep bulk/P-listed chemo in the RCRA stream." },
    { h: "Ship or pickup", p: "Tracked door-to-door to our permitted facility under DOT rules." },
    { h: "Get documentation", p: "Trace chemo is incinerated and your disposal record is archived to your account." },
  ],
  compHeading: (s) => `${s.name} & federal trace-chemo rules, handled.`,
  compIntro: (s) => `Chemotherapy waste splits by how much drug remains. “Trace” waste — RCRA-empty containers and trace-contaminated materials — goes in yellow containers for incineration. Bulk or P-listed chemo (for example, discarded product or certain hazardous drugs) is a RCRA hazardous waste and must be managed as such. Federally, OSHA and USP General Chapter <800> govern safe handling of hazardous drugs, and the DOT governs transport. In ${s.name}, the ${gov(s)} and the ${s.name} Board of Pharmacy add their requirements. Easy Rx Cycle sorts and routes each correctly, documented on every order.`,
  compBullets: (s) => [
    { label: "USP <800>", text: "hazardous-drug handling & containment" },
    { label: "Trace vs. bulk", text: "yellow-container trace incineration; bulk/P-listed routed to RCRA" },
    { label: "DOT", text: "49 CFR compliant packaging & prepaid return shipping" },
    { label: `${s.name}`, text: "state environmental & Board of Pharmacy requirements" },
  ],
  serveHeading: (s) => `Built for ${s.name} sites that handle hazardous drugs.`,
  serve: [
    { href: "/who-we-serve/hospitals/", label: "Hospitals & oncology" },
    { href: "/who-we-serve/asc/", label: "Surgery centers (ASC)" },
    { href: "/who-we-serve/veterinary/", label: "Veterinary" },
    { href: "/who-we-serve/oncology-infusion/", label: "Oncology & infusion" },
    { href: "/who-we-serve/503b-pharmacy/", label: "503B facilities" },
    { href: "/who-we-serve/", label: "All industries →" },
  ],
  related: (s) => [
    { href: "/our-solutions/rcra-hazardous-pharmaceutical-waste/", h: "RCRA hazardous", p: "Bulk & P-listed chemo and hazardous drugs." },
    { href: "/our-solutions/pharmaceutical-waste-disposal/" + s.slug + "/", h: `Pharmaceutical waste in ${s.name}`, p: "Non-controlled expired medications." },
    { href: `/locations/${s.slug}/`, h: `All services in ${s.name}`, p: "Every waste stream we handle statewide." },
  ],
  faqs: (s) => [
    { q: `What is trace chemotherapy waste in ${s.name}?`, a: `Trace chemo is RCRA-empty waste — vials and syringes emptied of drug, plus trace-contaminated PPE and IV sets. It goes in yellow containers for incineration. Bulk or P-listed chemo is a RCRA hazardous waste. We handle both across ${s.name}, and serve ${cities(s)}.` },
    { q: `What's the difference between trace and bulk chemo waste?`, a: `“Trace” means the container is RCRA-empty (drug removed to the extent practical); it's incinerated as trace chemo. “Bulk” means usable or P-listed drug remains — that's a RCRA hazardous waste with stricter handling. Mixing them is a common ${s.name} compliance error we help you avoid.` },
    { q: `What color container does trace chemo go in?`, a: `Yellow. Yellow containers signal trace chemotherapy waste bound for incineration — separate from red (RMW), black (RCRA hazardous), and blue (pharmaceutical). Our ${s.name} kits use the correct container for the stream.` },
    { q: `Who regulates chemotherapy waste in ${s.name}?`, a: `OSHA and USP <800> govern safe handling, the DOT governs transport, and the EPA's RCRA rules govern bulk/P-listed chemo. In ${s.name}, the state environmental agency and Board of Pharmacy add requirements. We handle disposal to all of them.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — mail-back reaches every ZIP in ${s.name}, from ${s.cities[0]} to ${last(s)}, and scheduled service is available for higher-volume sites across the state.` },
  ],
  finalH: (s) => `Handle trace chemo the compliant way in ${s.name}.`,
  finalP: (s) => `Order a yellow-container kit in minutes, or get a same-day quote for scheduled service across ${s.name}.`,
  proofSolution: "trace-chemotherapy-waste",
};

/* --------------------------------------------------------------- RCRA */
const rcra: Stream = {
  slug: "rcra-hazardous-pharmaceutical-waste",
  name: "RCRA Hazardous Pharmaceutical Waste Disposal",
  eyebrow: "RCRA hazardous",
  shop: "/shop/rcra-hazardous-mail-back-kit",
  image: "/images/products/rcra-kit.webp",
  imageAlt: "Easy Rx Cycle RCRA hazardous pharmaceutical waste mail-back kit",
  guideSlug: "rcra-hazardous-drug-waste-guide",
  guideTitle: "The RCRA Hazardous Drug Waste Guide",
  guideBody: "P-, U-, and D-listed drugs, the Subpart P management standard, black-container segregation, and how any facility disposes of hazardous pharmaceuticals compliantly — plus a checklist and FAQ.",
  kitLabel: "Shop a kit",
  metaTitle: (s) => `RCRA Hazardous Pharmaceutical Waste Disposal in ${s.name} | Subpart P`,
  metaDesc: (s) => `EPA RCRA-compliant hazardous pharmaceutical waste disposal in ${s.name} — P/U/D-listed drug mail-back and scheduled service for ${s.cities[0]} and statewide, managed under Subpart P with a manifest and documentation.`,
  h1: (s) => ({ pre: "RCRA hazardous pharmaceutical waste disposal in", accent: `${s.name}.` }),
  heroLead: (s) => `EPA RCRA-compliant disposal of hazardous pharmaceutical waste for ${cities(s)} and communities across ${s.name} — P-, U-, and D-listed drugs managed under the Subpart P standard, incinerated at a permitted facility, with a manifest and documentation on every order.`,
  takesHeading: (s) => `Every hazardous drug you need gone in ${s.name}.`,
  takesLead: "P/U/D-listed and characteristic waste, manifested and documented.",
  takes: ["P-listed acutely hazardous drugs", "U-listed hazardous drugs", "D-listed / characteristic waste (ignitable, corrosive, toxic)", "Bulk & P-listed chemotherapy drugs", "Hazardous formulary items", "Black-container hazardous waste"],
  ladder: stdLadder,
  howHeading: (s) => `Mail-back or scheduled service, statewide in ${s.name}.`,
  steps: (s) => [
    { h: "Order your kit", p: `Black RCRA container shipped to any ${s.name} address with a prepaid return label — or set scheduled service for ${s.cities[0]} and higher-volume sites.` },
    { h: "Segregate hazardous drugs", p: "Place P/U/D-listed and characteristic drugs in the black container — keep non-hazardous meds in the pharmaceutical stream." },
    { h: "Ship or pickup", p: "Manifested and tracked door-to-door to a permitted TSDF under DOT and EPA rules." },
    { h: "Get documentation", p: "Incinerated at a permitted facility; your manifest and record are archived to your account." },
  ],
  compHeading: (s) => `${s.name} & federal RCRA rules, handled.`,
  compIntro: (s) => `Some drugs are also hazardous waste under the EPA's Resource Conservation and Recovery Act (RCRA, 40 CFR). They fall on the P-list (acutely hazardous), U-list, or exhibit a characteristic (ignitable, corrosive, reactive, toxic — the D-codes). Healthcare facilities manage them under the Subpart P standard for hazardous waste pharmaceuticals. In ${s.name}, the ${gov(s)} — which may be more stringent than the federal floor — and the ${s.name} Board of Pharmacy add requirements. Easy Rx Cycle identifies, segregates, manifests, and destroys each hazardous drug correctly, documented on every order.`,
  compBullets: (s) => [
    { label: "EPA / RCRA", text: "P-, U-, and D-listed hazardous waste (40 CFR)" },
    { label: "Subpart P", text: "hazardous waste pharmaceuticals management standard" },
    { label: "Manifest", text: "hazardous waste manifest & permitted-TSDF incineration" },
    { label: `${s.name}`, text: "state environmental (often stricter) & Board of Pharmacy rules" },
  ],
  serveHeading: (s) => `Built for ${s.name} facilities with a hazardous formulary.`,
  serve: [
    { href: "/who-we-serve/hospitals/", label: "Hospitals & health systems" },
    { href: "/who-we-serve/retail-pharmacy/", label: "Retail pharmacies" },
    { href: "/who-we-serve/nursing-homes/", label: "Long-term care" },
    { href: "/who-we-serve/asc/", label: "Surgery centers (ASC)" },
    { href: "/who-we-serve/veterinary/", label: "Veterinary" },
    { href: "/who-we-serve/", label: "All industries →" },
  ],
  related: (s) => [
    { href: "/our-solutions/pharmaceutical-waste-disposal/" + s.slug + "/", h: `Pharmaceutical waste in ${s.name}`, p: "Non-hazardous, non-controlled medications." },
    { href: "/our-solutions/trace-chemotherapy-waste/" + s.slug + "/", h: `Trace chemo in ${s.name}`, p: "RCRA-empty yellow-container chemo waste." },
    { href: `/locations/${s.slug}/`, h: `All services in ${s.name}`, p: "Every waste stream we handle statewide." },
  ],
  faqs: (s) => [
    { q: `What is RCRA hazardous pharmaceutical waste in ${s.name}?`, a: `Drugs that are also hazardous waste under EPA rules — P-listed (acutely hazardous), U-listed, or characteristic (ignitable, corrosive, reactive, toxic). Common examples include warfarin, nicotine products, and certain chemo drugs. We manage them under Subpart P across ${s.name}, and serve ${cities(s)}.` },
    { q: `What's the difference between P-, U-, and D-listed drugs?`, a: `P-listed drugs are acutely hazardous (strictest handling), U-listed are hazardous but non-acute, and D-listed (D-codes) exhibit a characteristic like toxicity or ignitability. Each has specific ${s.name} handling and documentation — our guide breaks them down.` },
    { q: `What is the Subpart P standard?`, a: `40 CFR Part 266 Subpart P is the EPA's management standard for hazardous waste pharmaceuticals at healthcare facilities and reverse distributors. It sets how these drugs are accumulated, labeled, and shipped. We keep your ${s.name} program aligned to it.` },
    { q: `Who regulates hazardous drug waste in ${s.name}?`, a: `The EPA under RCRA federally, plus ${s.name}'s state environmental agency — which is often stricter than the federal floor — and the Board of Pharmacy. The DOT governs transport. We handle disposal and the manifest to all of them.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — mail-back reaches every ZIP in ${s.name}, from ${s.cities[0]} to ${last(s)}, and scheduled service is available for higher-volume sites across the state.` },
  ],
  finalH: (s) => `Manage hazardous drug waste right in ${s.name}.`,
  finalP: (s) => `Order a compliant RCRA kit in minutes, or get a same-day quote for scheduled service across ${s.name}.`,
  proofSolution: "rcra-hazardous-pharmaceutical-waste",
};

/* ------------------------------------------------------ MEDICATION KIT */
const medication: Stream = {
  slug: "medication-disposal-kit",
  name: "Medication Disposal Kits",
  eyebrow: "Patient med mail-back",
  shop: "/shop/medication-mail-back-kit",
  image: "/images/products/medication-disposal-kit.webp",
  imageAlt: "Easy Rx Cycle medication mail-back disposal kit",
  guideSlug: "medication-mail-back-kit-guide",
  guideTitle: "The Medication Mail-Back Kit Guide",
  guideBody: "How DEA-authorized mail-back works, which medications (including controlled) it accepts, and how pharmacies and facilities offer patient take-back compliantly — plus a checklist and FAQ.",
  kitLabel: "Shop a kit",
  metaTitle: (s) => `Medication Disposal Kits in ${s.name} | DEA Mail-Back Take-Back`,
  metaDesc: (s) => `DEA-compliant medication mail-back disposal kits in ${s.name} — for patient and consumer take-back of unused Rx (including controlled) in ${s.cities[0]} and statewide, with destruction documentation on every kit.`,
  h1: (s) => ({ pre: "Medication disposal kits in", accent: `${s.name}.` }),
  heroLead: (s) => `DEA-compliant medication mail-back kits for ${cities(s)} and communities across ${s.name} — a simple, prepaid way for pharmacies, facilities, and patients to dispose of unused and expired medications, including controlled substances, with destruction documentation on every kit.`,
  takesHeading: (s) => `Every patient medication, handled in ${s.name}.`,
  takesLead: "Unused and expired consumer medications, destroyed and documented.",
  takes: ["Unused & expired prescriptions", "Controlled substances (Schedules II–V)", "Over-the-counter medications", "Pills, capsules & tablets", "Liquids & patches", "Patient / consumer take-back"],
  ladder: [
    { tag: "std" as const, size: "Envelope", note: (s: StateInfo) => `Prepaid mail-back envelopes for patients and small sites in ${s.cities[0]}.` },
    { tag: "std" as const, size: "Kit", note: (s: StateInfo) => `Larger mail-back kits for busy ${s.name} pharmacies and facilities.` },
    { tag: "quote" as const, size: "Kiosk", note: (s: StateInfo) => `In-store collection kiosks and multi-site take-back programs across ${s.name}.` },
  ],
  howHeading: (s) => `Mail-back take-back, statewide in ${s.name}.`,
  steps: (s) => [
    { h: "Order your kit", p: `Prepaid envelope, kit, or kiosk shipped to any ${s.name} address — no special license required to offer patient mail-back.` },
    { h: "Collect medications", p: "Patients or staff deposit unused and expired medications, including controlled substances." },
    { h: "Seal & mail", p: "Seal the prepaid package and drop it in the mail — tracked to our DEA-registered destruction facility." },
    { h: "Get your COD", p: "Non-retrievable destruction and a Certificate of Destruction, archived to your account." },
  ],
  compHeading: (s) => `${s.name} & federal take-back rules, handled.`,
  compIntro: (s) => `The DEA's take-back framework (21 CFR 1317) lets patients dispose of unused medications — including controlled substances — through authorized mail-back packages and collection receptacles, rendered non-retrievable. Pharmacies, hospitals, and long-term care facilities in ${s.name} use these kits to offer patient take-back and to handle patient-returned meds compliantly, and the ${s.name} Board of Pharmacy adds recordkeeping requirements. Easy Rx Cycle provides DEA-compliant mail-back and destruction, with a Certificate of Destruction on every kit.`,
  compBullets: (s) => [
    { label: "DEA", text: "take-back mail-back & non-retrievable destruction (21 CFR 1317)" },
    { label: "Controlled OK", text: "accepts Schedules II–V alongside non-controlled meds" },
    { label: `${s.name}`, text: "Board of Pharmacy recordkeeping requirements" },
    { label: "Certificate", text: "Certificate of Destruction archived on every kit" },
  ],
  serveHeading: (s) => `Built for ${s.name} sites that serve patients.`,
  serve: [
    { href: "/who-we-serve/retail-pharmacy/", label: "Retail pharmacies" },
    { href: "/who-we-serve/hospitals/", label: "Hospitals" },
    { href: "/who-we-serve/nursing-homes/", label: "Long-term care" },
    { href: "/who-we-serve/hospice/", label: "Hospice" },
    { href: "/who-we-serve/physician-offices/", label: "Physician offices" },
    { href: "/who-we-serve/", label: "All industries →" },
  ],
  related: (s) => [
    { href: "/our-solutions/controlled-substance-destruction/" + s.slug + "/", h: `Controlled destruction in ${s.name}`, p: "Registrant-level DEA destruction." },
    { href: "/our-solutions/pharmaceutical-waste-disposal/" + s.slug + "/", h: `Pharmaceutical waste in ${s.name}`, p: "Facility non-controlled medication waste." },
    { href: `/locations/${s.slug}/`, h: `All services in ${s.name}`, p: "Every waste stream we handle statewide." },
  ],
  faqs: (s) => [
    { q: `How do patients dispose of medications in ${s.name}?`, a: `The simplest compliant way is a DEA-authorized mail-back envelope or kit — patients place unused and expired meds inside, seal it, and mail it for non-retrievable destruction. Pharmacies and facilities in ${cities(s)} and across ${s.name} offer these to their patients.` },
    { q: `Can medication mail-back kits take controlled substances in ${s.name}?`, a: `Yes — the DEA take-back framework (21 CFR 1317) allows controlled substances (Schedules II–V) in authorized mail-back packages, right alongside non-controlled meds. Every kit ends with a Certificate of Destruction.` },
    { q: `Does my ${s.name} pharmacy need a special license to offer mail-back?`, a: `Offering DEA-authorized patient mail-back packages does not require becoming a collector — we supply the compliant kits and handle destruction. The ${s.name} Board of Pharmacy sets recordkeeping expectations, which our documentation covers.` },
    { q: `What can't go in a medication mail-back kit?`, a: `Sharps, hazardous (RCRA) drugs, and business-generated controlled inventory belong in their own streams — all of which we also provide in ${s.name}. Mail-back kits are for patient/consumer medications.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — mail-back reaches every ZIP in ${s.name}, from ${s.cities[0]} to ${last(s)}, and multi-site take-back programs are available across the state.` },
  ],
  finalH: (s) => `Offer compliant medication take-back in ${s.name}.`,
  finalP: (s) => `Order prepaid mail-back kits in minutes, or get a same-day quote for a multi-site ${s.name} take-back program.`,
  proofSolution: "medication-disposal-kit",
};

/* ------------------------------------------------ REVERSE DISTRIBUTION */
// A national DEA credit/returns service, not a mail-back kit: quote-only CTA,
// single-column hero (no product), no kit ladder — returns/credit-focused content.
const reverse: Stream = {
  slug: "reverse-distribution",
  name: "Reverse Distribution",
  eyebrow: "Returns & credit",
  guideSlug: "reverse-distribution-guide",
  guideTitle: "The Reverse Distribution Guide",
  guideBody: "How manufacturer credit works, what's returnable vs. destroy-only, DEA handling for controlled returns, and how any pharmacy recovers value on expired inventory — plus a checklist and FAQ.",
  kitLabel: "Get a quote",
  metaTitle: (s) => `Reverse Distribution in ${s.name} | Pharmacy Returns & Credit`,
  metaDesc: (s) => `DEA-registered reverse distribution in ${s.name} — recover manufacturer credit on returnable Rx and compliantly destroy the rest, for pharmacies in ${s.cities[0]} and statewide, with full documentation.`,
  h1: (s) => ({ pre: "Reverse distribution in", accent: `${s.name}.` }),
  heroLead: (s) => `Recover manufacturer credit on returnable pharmaceuticals and compliantly destroy the rest — for pharmacies and facilities in ${cities(s)} and across ${s.name}. As a DEA-registered reverse distributor, we process returns, handle controlled substances, and document every step.`,
  takesHeading: (s) => `Every return we process in ${s.name}.`,
  takesLead: "Returnable stock recovered for credit; the rest destroyed compliantly.",
  takes: ["Returnable & creditable stock", "Expired & short-dated inventory", "Overstock & discontinued NDCs", "Recalled product", "Manufacturer returns processing", "Non-creditable destruction with a COD"],
  howHeading: (s) => `How reverse distribution works in ${s.name}.`,
  steps: (s) => [
    { h: "Send your returns", p: `Package expired and unwanted inventory from your ${s.cities[0]} or ${s.name} site — we provide the process and documentation.` },
    { h: "We sort & value", p: "Returnable stock is processed for manufacturer credit; controlled substances are handled under DEA rules." },
    { h: "You recover credit", p: "Creditable returns are submitted to manufacturers so you recover value on unsellable inventory." },
    { h: "Destroy the rest", p: "Non-creditable and controlled product is destroyed non-retrievably with a Certificate of Destruction." },
  ],
  compHeading: (s) => `${s.name} & federal returns rules, handled.`,
  compIntro: (s) => `Reverse distribution recovers value from expired and unsellable pharmaceuticals while keeping disposal compliant. As a DEA-registered reverse distributor, Easy Rx Cycle can accept controlled-substance returns — with DEA Form 222 for Schedule II transfers and Form 41 for destroyed stock — and reports controlled transactions through ARCOS where required. Non-controlled returns follow manufacturer return policies. In ${s.name}, the ${s.name} Board of Pharmacy adds licensing and recordkeeping requirements. Every return is documented, and non-creditable product is destroyed non-retrievably.`,
  compBullets: (s) => [
    { label: "DEA", text: "registered reverse distributor — Form 222/41, controlled returns" },
    { label: "ARCOS", text: "controlled-substance transaction reporting where required" },
    { label: `${s.name}`, text: "Board of Pharmacy licensing & recordkeeping" },
    { label: "Credit + COD", text: "manufacturer credit on returnable stock; Certificate of Destruction on the rest" },
  ],
  serveHeading: (s) => `Built for ${s.name} pharmacies that carry inventory.`,
  serve: [
    { href: "/who-we-serve/retail-pharmacy/", label: "Retail pharmacies" },
    { href: "/who-we-serve/independent-pharmacy/", label: "Independent pharmacies" },
    { href: "/who-we-serve/chain-pharmacy/", label: "Chain pharmacies" },
    { href: "/who-we-serve/hospitals/", label: "Hospitals" },
    { href: "/who-we-serve/nursing-homes/", label: "Long-term care" },
    { href: "/who-we-serve/", label: "All industries →" },
  ],
  related: (s) => [
    { href: "/our-solutions/controlled-substance-destruction/" + s.slug + "/", h: `Controlled destruction in ${s.name}`, p: "Non-creditable & controlled destruction." },
    { href: "/our-solutions/pharmaceutical-waste-disposal/" + s.slug + "/", h: `Pharmaceutical waste in ${s.name}`, p: "Non-controlled expired medications." },
    { href: `/locations/${s.slug}/`, h: `All services in ${s.name}`, p: "Every waste stream we handle statewide." },
  ],
  faqs: (s) => [
    { q: `What is reverse distribution in ${s.name}?`, a: `Reverse distribution is the process of returning expired and unsellable pharmaceuticals to recover manufacturer credit, and compliantly destroying what isn't creditable. ${s.name} pharmacies use it to recover value on inventory that would otherwise be a total loss. We serve ${cities(s)} and statewide.` },
    { q: `How does a ${s.name} pharmacy recover credit on expired Rx?`, a: `Send your expired and short-dated stock to a reverse distributor. Returnable product is processed and submitted to manufacturers for credit under their return policies; the rest is destroyed with documentation. We handle both.` },
    { q: `Do you handle controlled-substance returns in ${s.name}?`, a: `Yes — as a DEA-registered reverse distributor we accept Schedule II–V returns, with Form 222 for Schedule II transfers and Form 41 for destroyed stock, and ARCOS reporting where required.` },
    { q: `What isn't creditable?`, a: `Opened, adulterated, or non-returnable product, and most controlled substances, generally can't be returned for credit — but they still must be destroyed compliantly. Our process sorts creditable from destroy-only so nothing is mishandled in ${s.name}.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — we process returns for pharmacies and facilities everywhere in ${s.name}, from ${s.cities[0]} to ${last(s)}.` },
  ],
  finalH: (s) => `Recover value on expired inventory in ${s.name}.`,
  finalP: (s) => `Get a same-day reverse distribution quote for your ${s.name} pharmacy or facility — credit on what's returnable, compliant destruction for the rest.`,
  proofSolution: "reverse-distribution",
};

export const STREAMS: Record<string, Stream> = {
  "sharps-disposal": sharps,
  "biohazard-waste-disposal": biohazard,
  "pharmaceutical-waste-disposal": pharmaceutical,
  "trace-chemotherapy-waste": traceChemo,
  "rcra-hazardous-pharmaceutical-waste": rcra,
  "medication-disposal-kit": medication,
  "reverse-distribution": reverse,
};
