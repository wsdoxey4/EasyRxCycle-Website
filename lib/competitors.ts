// Fair, model-based competitor comparison content for the "/compare/{slug}" pages.
// RULE: describe each competitor's PUBLIC business model factually (contract/route/quote/product) —
// no invented fees or unverifiable negative claims. Lead with Easy Rx Cycle's verifiable strengths:
// published pricing, no contract, DEA-registered certified destruction + COD, all 8 streams,
// on-site deactivation AND mail-back, reverse distribution, self-serve shop.

export type Row = { feature: string; them: string; us: string };
export type Competitor = {
  slug: string;         // "{name}-alternative"
  name: string;         // "Stericycle"
  kind: string;         // short category
  metaTitle: string;
  metaDesc: string;
  h1: string;
  lead: string;
  theirModel: string;   // fair, factual description
  rows: Row[];
  edges: string[];      // why switch — our verifiable advantages
  faqs: { q: string; a: string }[];
};

const US = "Easy Rx Cycle";

export const COMPETITORS: Competitor[] = [
  {
    slug: "stericycle-alternative",
    name: "Stericycle",
    kind: "national route-based hauler",
    metaTitle: "Stericycle Alternative — No-Contract Mail-Back Medical Waste",
    metaDesc: "Looking for a Stericycle alternative? Easy Rx Cycle is DEA-registered medical waste disposal with published prices, no long-term contract, and prepaid mail-back for every stream.",
    h1: "The no-contract Stericycle alternative",
    lead: "Stericycle is the largest route-based medical waste hauler, built for scheduled pickups under multi-year service agreements. If you're a small-to-mid-size facility tired of contracts, surcharges, and calling for a price, Easy Rx Cycle is the transparent, no-contract alternative — prepaid mail-back and pickup for every regulated stream, with a Certificate of Destruction on every order.",
    theirModel: "Stericycle operates a national pickup fleet on scheduled routes, typically under multi-year service contracts with recurring service fees. It's built for volume and enterprise logistics.",
    rows: [
      { feature: "Pricing", them: "Quote / contract-based", us: "Published prices on every kit" },
      { feature: "Contract", them: "Multi-year service agreement", us: "None — order when you need to" },
      { feature: "Model", them: "Route pickup", us: "Mail-back + scheduled pickup" },
      { feature: "Best for", them: "High-volume, multi-site enterprise", us: "Small-to-mid sites (and enterprise, without the contract)" },
      { feature: "Controlled / DEA", them: "Available", us: "DEA-registered destruction + Form 41/222" },
      { feature: "Reverse distribution", them: "Limited", us: "Yes — credit recovery + destruction" },
      { feature: "Documentation", them: "Available", us: "Certificate of Destruction on every order" },
    ],
    edges: [
      "No long-term contract, monthly minimum, or auto-renewal.",
      "Every price is published — no sales call to learn a number.",
      "Prepaid mail-back reaches every ZIP; pickup where volume calls for it.",
      "One vendor for all eight streams, including controlled and reverse distribution.",
    ],
    faqs: [
      { q: "Is Easy Rx Cycle cheaper than Stericycle?", a: "For low-to-moderate volume, mail-back is often the lower total cost because there's no monthly service fee, fuel surcharge, or minimum — you pay a flat price per kit only when you ship. Higher-volume sites get a same-day quote with no contract." },
      { q: "Can I switch from Stericycle mid-contract?", a: "You can start using Easy Rx Cycle for any stream immediately with no commitment. Review your current agreement's terms for its own cancellation window; many facilities run mail-back alongside an existing contract and move fully over at renewal." },
      { q: "Does Easy Rx Cycle handle everything Stericycle does?", a: "For mail-back and scheduled disposal of sharps, biohazard, pharmaceutical, controlled, RCRA-hazardous, and trace chemo — yes, plus reverse distribution. Very large multi-site route logistics is where a national fleet still fits; we're built for the rest, without the contract." },
    ],
  },
  {
    slug: "medpro-disposal-alternative",
    name: "MedPro Disposal",
    kind: "mail-back & pickup broker",
    metaTitle: "MedPro Disposal Alternative — Transparent, No-Contract Disposal",
    metaDesc: "A MedPro Disposal alternative with published prices and no quote wall — DEA-registered mail-back for every stream, plus controlled-substance destruction and reverse distribution MedPro doesn't specialize in.",
    h1: "A transparent MedPro Disposal alternative",
    lead: "MedPro offers mail-back and pickup, but pricing runs through a quote and a rep. Easy Rx Cycle publishes every price, adds DEA-registered controlled-substance destruction and reverse distribution, and lets you buy a compliant kit in minutes — no quote wall.",
    theirModel: "MedPro Disposal brokers mail-back and route pickup and runs a large content library; pricing is generally provided by quote.",
    rows: [
      { feature: "Pricing", them: "By quote", us: "Published on every kit" },
      { feature: "Contract", them: "Varies", us: "None" },
      { feature: "Self-serve shop", them: "Limited", us: "Full storefront — buy in minutes" },
      { feature: "Controlled / DEA", them: "Available", us: "DEA-registered destruction, Form 41/222" },
      { feature: "Reverse distribution", them: "Not a focus", us: "Yes — recover manufacturer credit" },
      { feature: "On-site + mail-back", them: "Mail-back / pickup", us: "On-site deactivation AND mail-back" },
    ],
    edges: [
      "See the price and buy online — no quote form required.",
      "DEA-registered certified destruction with Form 41/222, not just pickup.",
      "Reverse distribution to recover credit on returnable stock.",
      "Both on-site deactivation and mail-back destruction under one roof.",
    ],
    faqs: [
      { q: "What's the main difference from MedPro Disposal?", a: "Transparency and breadth: we publish every price and sell kits self-serve, and we add DEA-registered controlled-substance destruction and reverse distribution as core services rather than referrals." },
      { q: "Can I just buy a kit without talking to sales?", a: "Yes — the shop lists every kit and price; add it to cart and check out. A specialist is available if you want help sizing a program, but it's optional." },
    ],
  },
  {
    slug: "sharps-compliance-alternative",
    name: "Sharps Compliance",
    kind: "self-serve mail-back + route",
    metaTitle: "Sharps Compliance Alternative — Every Stream, No Contract",
    metaDesc: "A Sharps Compliance (MWS) alternative: published pricing, no contract, and one vendor for every regulated stream — sharps, biohazard, pharmaceutical, controlled, RCRA, chemo — plus reverse distribution.",
    h1: "A full-stream Sharps Compliance alternative",
    lead: "Sharps Compliance pioneered mail-back and is a solid sharps and mail-back provider. Easy Rx Cycle extends that model to every regulated stream — including DEA-registered controlled destruction and reverse distribution — with published prices, no contract, and a modern self-serve shop.",
    theirModel: "Sharps Compliance (Sharps Medical Waste Services) offers mail-back recovery systems and route-based pickup, sold in part through retail and pharmacy channels.",
    rows: [
      { feature: "Pricing", them: "Varies by channel", us: "Published on every kit" },
      { feature: "Stream breadth", them: "Sharps-led + mail-back", us: "All 8 streams, one vendor" },
      { feature: "Controlled / DEA", them: "Mail-back take-back", us: "DEA-registered destruction + Form 41/222" },
      { feature: "Reverse distribution", them: "Not a focus", us: "Yes" },
      { feature: "On-site + mail-back", them: "Mail-back", us: "On-site deactivation AND mail-back" },
      { feature: "Contract", them: "Varies", us: "None" },
    ],
    edges: [
      "One vendor for every stream, not just sharps and mail-back.",
      "DEA-registered certified destruction and reverse distribution.",
      "On-site deactivation and mail-back — witness-wasting to disposal in one place.",
      "Published prices and no contract.",
    ],
    faqs: [
      { q: "Is Easy Rx Cycle like Sharps Compliance?", a: "Same mail-back convenience, broader scope: we cover every regulated stream, add DEA-registered controlled destruction and reverse distribution, publish prices, and don't require a contract." },
      { q: "Do you handle controlled substances like a take-back program?", a: "Yes — both patient take-back mail-back kits and registrant-level DEA-registered controlled-substance destruction with Form 41/222 and a Certificate of Destruction." },
    ],
  },
  {
    slug: "daniels-health-alternative",
    name: "Daniels Health",
    kind: "enterprise reusable-container pickup",
    metaTitle: "Daniels Health Alternative — No-Contract Mail-Back for Any Size",
    metaDesc: "A Daniels Health alternative for facilities that don't need enterprise route service: DEA-registered mail-back for every stream, published prices, and no contract.",
    h1: "A right-sized Daniels Health alternative",
    lead: "Daniels Health is built around reusable-container systems and route service for large hospitals. If you don't need enterprise logistics, Easy Rx Cycle gives you the same compliance with prepaid mail-back, published prices, and no contract — sized to a practice, clinic, pharmacy, or clinic group.",
    theirModel: "Daniels Health focuses on reusable sharps containers and route-based clinical waste service for hospitals and health systems, with a strong sustainability program.",
    rows: [
      { feature: "Model", them: "Reusable containers + route pickup", us: "Prepaid mail-back + pickup" },
      { feature: "Best for", them: "Large hospitals / systems", us: "Practices, clinics, pharmacies, groups" },
      { feature: "Pricing", them: "Contract / quote", us: "Published on every kit" },
      { feature: "Contract", them: "Service agreement", us: "None" },
      { feature: "Controlled / DEA", them: "Available", us: "DEA-registered destruction + Form 41/222" },
      { feature: "Reverse distribution", them: "Not a focus", us: "Yes" },
    ],
    edges: [
      "No enterprise contract — buy exactly what your site needs.",
      "Prepaid mail-back to any address; pickup where it makes sense.",
      "Published prices and a self-serve shop.",
      "DEA-registered controlled destruction and reverse distribution included.",
    ],
    faqs: [
      { q: "When does Daniels Health make more sense?", a: "For very large hospitals and systems that need daily route service and reusable-container logistics at scale. For most practices, clinics, pharmacies, and multi-site groups, no-contract mail-back is simpler and lower-commitment." },
      { q: "Do you offer reusable containers?", a: "Our model is prepaid single-use mail-back kits and scheduled pickup — no reusable-container contract to manage. You get the compliant container, shipping both ways, destruction, and documentation in one flat price." },
    ],
  },
  {
    slug: "rx-destroyer-alternative",
    name: "Rx Destroyer",
    kind: "on-site deactivation product",
    metaTitle: "Rx Destroyer Alternative — Certified Destruction, Not Just Deactivation",
    metaDesc: "An Rx Destroyer alternative that goes beyond on-site deactivation: DEA-registered certified destruction with a Certificate of Destruction, mail-back, reverse distribution — plus our own on-site deactivation kit.",
    h1: "Beyond Rx Destroyer: deactivation AND certified destruction",
    lead: "Rx Destroyer is an activated-charcoal product that deactivates medications at the point of use so they can be discarded. That's useful — and we make our own on-site deactivation kit too. But deactivation isn't certified destruction. Easy Rx Cycle adds DEA-registered mail-back destruction with a Certificate of Destruction, plus reverse distribution and every other stream, so one vendor covers point-of-use through documented final destruction.",
    theirModel: "Rx Destroyer (C2R Global) is an on-site activated-charcoal deactivation system — a product that renders medications non-retrievable at the point of use for disposal in the trash.",
    rows: [
      { feature: "On-site deactivation", them: "Yes (its core product)", us: "Yes — our own kit" },
      { feature: "Certified destruction", them: "No (deactivate & discard)", us: "Yes — DEA-registered + Certificate of Destruction" },
      { feature: "Mail-back", them: "No", us: "Yes — every stream" },
      { feature: "Reverse distribution", them: "No", us: "Yes" },
      { feature: "Other streams", them: "Medication only", us: "All 8 regulated streams" },
      { feature: "Documentation", them: "Limited", us: "COD + Form 41/222 where required" },
    ],
    edges: [
      "On-site deactivation when you want it — plus certified mail-back destruction when you need proof.",
      "A Certificate of Destruction (and Form 41/222) that deactivation-and-trash can't provide.",
      "Reverse distribution to recover credit on returnable stock.",
      "One vendor for medication AND every other regulated stream.",
    ],
    faqs: [
      { q: "Isn't deactivation the same as destruction?", a: "No. Deactivation renders a drug non-retrievable at the point of use so it can be discarded, which is appropriate for many settings. Certified destruction adds documented, DEA-registered final destruction with a Certificate of Destruction — the proof an auditor or DEA registrant needs. We offer both." },
      { q: "Do you have an on-site kit like Rx Destroyer?", a: "Yes — our on-site medication disposal kit uses activated-charcoal deactivation for point-of-use wasting, and it pairs with mail-back certified destruction and full documentation." },
    ],
  },
  {
    slug: "reverse-distributor-alternative",
    name: "traditional reverse distributors",
    kind: "pharmaceutical returns specialists",
    metaTitle: "Reverse Distributor Alternative — Returns + Destruction + Every Stream",
    metaDesc: "An alternative to traditional reverse distributors (Inmar, Pharma Logistics, and others): recover manufacturer credit AND get DEA-registered destruction, mail-back, and every regulated stream from one transparent, self-serve vendor.",
    h1: "A one-vendor reverse distributor alternative",
    lead: "Traditional reverse distributors process pharmaceutical returns for credit — but that's usually all they do, through a B2B, quote-based relationship. Easy Rx Cycle is a DEA-registered reverse distributor that also handles certified destruction of what isn't creditable and every other regulated waste stream, with published pricing and a self-serve shop.",
    theirModel: "Reverse-distribution specialists (such as Inmar and Pharma Logistics) process returnable pharmaceuticals for manufacturer credit and destroy the rest, typically as a B2B, contract/quote service.",
    rows: [
      { feature: "Manufacturer credit", them: "Yes (core service)", us: "Yes" },
      { feature: "Certified destruction", them: "Yes", us: "Yes — DEA-registered + COD" },
      { feature: "Other waste streams", them: "Pharma returns only", us: "All 8 regulated streams" },
      { feature: "Mail-back / self-serve", them: "B2B / quote", us: "Published prices + self-serve shop" },
      { feature: "On-site deactivation", them: "No", us: "Yes" },
      { feature: "Best for", them: "Large-volume returns", us: "Returns + full disposal, any size" },
    ],
    edges: [
      "Recover credit on returnable stock AND compliantly destroy the rest.",
      "One vendor for reverse distribution and every other regulated stream.",
      "Published pricing and a self-serve shop, not a quote-only relationship.",
      "On-site deactivation and mail-back destruction included.",
    ],
    faqs: [
      { q: "Do you recover manufacturer credit like a reverse distributor?", a: "Yes — as a DEA-registered reverse distributor we process returnable, in-date stock for manufacturer credit and compliantly destroy what isn't creditable, with full documentation." },
      { q: "Why use you instead of a returns-only reverse distributor?", a: "Because you get returns AND disposal from one vendor: reverse distribution, DEA-registered controlled destruction, and every other stream — with transparent pricing instead of a quote-only B2B relationship." },
    ],
  },
];

export const competitorBySlug = (slug: string) => COMPETITORS.find((c) => c.slug === slug);
export const competitorSlugs = () => COMPETITORS.map((c) => c.slug);
