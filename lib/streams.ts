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
  shop: string;             // shop kit href
  image: string;            // hero product image
  imageAlt: string;         // image alt (state appended)
  guideSlug: string;        // /resources/{guideSlug} + exit-intent slug
  guideTitle: string;       // lead-magnet band title
  guideBody: string;        // lead-magnet band body
  kitLabel: string;         // shop CTA label ("Shop a kit")
  metaTitle: (s: StateInfo) => string;
  metaDesc: (s: StateInfo) => string;
  h1: (s: StateInfo) => { pre: string; accent: string };
  heroLead: (s: StateInfo) => string;
  takesHeading: (s: StateInfo) => string;
  takesLead: string;
  takes: string[];
  ladder: { tag: "std" | "quote"; size: string; note: (s: StateInfo) => string }[];
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
  compIntro: (s) => `Sharps are a regulated medical waste. Federally, OSHA's Bloodborne Pathogens Standard (29 CFR 1910.1030) governs how sharps are contained and handled to protect workers, and the DOT (49 CFR) governs how they ship. In ${s.name}, state medical-waste regulations — administered by ${s.name}'s health or environmental agency — set container, labeling, and treatment requirements. Easy Rx Cycle's approved containers and prepaid, DOT-compliant mail-back keep you compliant with all of them, with documentation on every order.`,
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
    { href: "/who-we-serve/tattoo-piercing/", label: "Tattoo & piercing" },
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
  compIntro: (s) => `Regulated medical waste is governed federally by OSHA's Bloodborne Pathogens Standard (29 CFR 1910.1030) for worker protection and by the DOT (49 CFR) for transport. In ${s.name}, state medical-waste regulations — administered by ${s.name}'s health or environmental agency — define what is regulated and how it must be contained and treated. Easy Rx Cycle's compliant containers, prepaid DOT shipping, and permitted treatment (autoclave-then-landfill or incineration) keep you compliant with all of them, documented on every order.`,
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
    { href: "/who-we-serve/emergency-services/", label: "Emergency services" },
    { href: "/who-we-serve/tattoo-piercing/", label: "Tattoo & piercing" },
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
  compIntro: (s) => `Pharmaceutical waste splits into three lanes, and mixing them is the most common compliance error. Non-controlled, non-hazardous drugs are the routine pharmaceutical stream. Controlled substances fall under the DEA (Form 41/222, non-retrievable destruction), and drugs that are also hazardous waste fall under the EPA's RCRA rules (40 CFR, including the Subpart P management standard). In ${s.name}, the ${s.name} Board of Pharmacy and the state environmental agency add their own requirements. Easy Rx Cycle sorts and routes each lane correctly — and documents every order.`,
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
    { href: "/who-we-serve/clinics/", label: "Clinics" },
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

export const STREAMS: Record<string, Stream> = {
  "sharps-disposal": sharps,
  "biohazard-waste-disposal": biohazard,
  "pharmaceutical-waste-disposal": pharmaceutical,
};
