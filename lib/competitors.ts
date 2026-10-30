// Fair, model-based competitor comparison content for the "/compare/{slug}" pages.
// RULE: describe each competitor's PUBLIC business model factually (contract/route/quote/product) —
// no invented fees or unverifiable negative claims. Lead with Easy Rx Cycle's verifiable strengths:
// published pricing, no contract, DEA-registered certified destruction + COD, all 8 streams,
// on-site deactivation AND mail-back, reverse distribution, self-serve shop.

export type Row = { feature: string; them: string; us: string };
// Optional extra content blocks (e.g. a rebrand note or a contract-exit checklist), rendered after
// the comparison table. Strings may contain simple inline HTML, like `edges`.
export type CompareSection = { eyebrow: string; h2: string; paras?: string[]; list?: string[]; ordered?: boolean };
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
  sections?: CompareSection[];
};

import { inCategory, fromPrice, money } from "@/lib/shop";

const US = "Easy Rx Cycle";

// Our controlled-substance kit prices, read from the shop catalog (never hard-coded).
const CTL = inCategory("controlled").map((p) => money(p.cents));
const CTL_LIST = CTL.join(" / ");
const from = (cat: string) => money(fromPrice(cat));

export const COMPETITORS: Competitor[] = [
  {
    slug: "stericycle-alternative",
    name: "Stericycle",
    kind: "national route-based hauler",
    metaTitle: "Stericycle (Now WM) Alternative — No-Contract Mail-Back Disposal",
    metaDesc: "Stericycle is now part of WM (WM Healthcare Solutions). Looking for an alternative? Easy Rx Cycle is DEA-registered disposal with published prices, no contract, and prepaid mail-back for every stream.",
    h1: "The no-contract Stericycle alternative",
    lead: "Stericycle, now part of WM, is the largest route-based medical waste hauler, built for scheduled pickups under multi-year service agreements. If you're a small-to-mid-size facility tired of contracts, surcharges, and calling for a price, Easy Rx Cycle is the transparent, no-contract alternative — prepaid mail-back and pickup for every regulated stream, with a Certificate of Destruction on every order.",
    theirModel: "Stericycle (now part of WM) operates a national pickup fleet on scheduled routes, typically under multi-year service contracts with recurring service fees. It also sells a SafeDrop sharps mail-back product. It's built for volume and enterprise logistics.",
    rows: [
      { feature: "Pricing", them: "Quote / contract-based", us: "Published prices on every kit" },
      { feature: "Contract", them: "Multi-year service agreement", us: "None — order when you need to" },
      { feature: "Model", them: "Route pickup (plus SafeDrop sharps mail-back)", us: "Mail-back + scheduled pickup" },
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
      { q: "Is Stericycle now WM?", a: "Yes. WM completed its acquisition of Stericycle in November 2024, and the business is gradually moving to the WM Healthcare Solutions name. WM has told existing customers it's business as usual, so your current agreement and its terms carry on until you change them." },
      { q: "Does the WM acquisition change my Stericycle contract?", a: "Not by itself. Your service agreement's term, renewal date, and cancellation terms still apply. The change in ownership is a natural moment to reread the agreement and decide whether its model still fits your volume." },
    ],
    sections: [
      {
        eyebrow: "What changed",
        h2: "Stericycle is now part of WM.",
        paras: [
          "WM (formerly Waste Management) completed its acquisition of Stericycle in November 2024. The medical waste business is gradually moving to the <strong>WM Healthcare Solutions</strong> name, and you'll see &ldquo;Stericycle, now part of WM&rdquo; on its ads and site in the meantime. WM has told customers it's business as usual.",
          "For you, the practical point is simple: the ownership changed, the agreement you signed didn't. Your term, renewal date, pricing terms, and cancellation window all stay as written. If you've been meaning to review whether a route contract still fits your volume, this is a good time to do it.",
        ],
      },
      {
        eyebrow: "Before you switch",
        h2: "A contract-exit checklist.",
        paras: ["Work through these with your current agreement in hand. Every contract is different, so the agreement itself is the final word."],
        ordered: true,
        list: [
          "<strong>Find the signed agreement</strong> and any amendments or renewals. Your account rep or online portal can send a copy.",
          "<strong>Note the term and the renewal date.</strong> Check whether the agreement renews automatically and for how long.",
          "<strong>Find the cancellation notice window.</strong> Many agreements require written notice a set number of days before renewal. Put that date on the calendar.",
          "<strong>Read the price-change and termination clauses.</strong> Look for annual increases, surcharges, and any fee for ending early.",
          "<strong>Download your records</strong> — manifests, tracking documents, and certificates of destruction — while you still have portal access. You may need them for an inspection later.",
          "<strong>Plan container returns and a final pickup</strong> so nothing is left on site and nothing is billed after you leave.",
          "<strong>Set up the replacement first.</strong> You can order <a href=\"/shop/\">mail-back kits</a> today and run them alongside your current service, then send written notice inside the window.",
        ],
      },
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
    kind: "mail-back + route + reverse distribution",
    metaTitle: "Sharps Compliance (Now Sharps MWS) Alternative — Published Prices",
    metaDesc: "Sharps Compliance now operates as Sharps Medical Waste Services (sharpsmws.com). Easy Rx Cycle is a DEA-registered alternative with published kit prices, self-serve checkout, and no contract for every regulated stream.",
    h1: "A published-price Sharps Compliance alternative",
    lead: "Sharps Compliance, now operating as Sharps Medical Waste Services, pioneered mail-back and covers a wide range of streams. Easy Rx Cycle covers every regulated stream too — with the price of every kit published, checkout in minutes, no contract, and DEA-registered destruction with a Certificate of Destruction on every order.",
    theirModel: "Sharps Medical Waste Services (formerly Sharps Compliance) offers route pickup, mail-back systems, and reverse distribution under one roof, across sharps, regulated medical waste, pharmaceutical, chemo, RCRA, controlled substances, and more. Its online store lists products with quote prompts rather than prices.",
    rows: [
      { feature: "Pricing", them: "Quote prompts on its online store", us: "Published on every kit" },
      { feature: "Buying", them: "Request a quote or evaluation", us: "Self-serve checkout in minutes" },
      { feature: "Stream breadth", them: "Broad — sharps, RMW, pharma, chemo, RCRA, controlled, more", us: "All 8 streams, one vendor" },
      { feature: "Controlled / DEA", them: "Offered", us: "DEA-registered destruction + Form 41/222" },
      { feature: "On-site + mail-back", them: "Mail-back + route", us: "On-site deactivation kit AND mail-back" },
      { feature: "Contract", them: "Varies", us: "None" },
    ],
    edges: [
      "See the price of every kit before you talk to anyone.",
      "Buy online in minutes — no quote form or evaluation call required.",
      "On-site deactivation and mail-back — witness-wasting to disposal in one place.",
      "DEA-registered destruction, a Certificate of Destruction on every order, and no contract.",
    ],
    faqs: [
      { q: "Is Sharps Compliance now Sharps Medical Waste Services?", a: "Yes. The company now operates as Sharps Medical Waste Services, and its old sharpsinc.com address redirects to sharpsmws.com. If you're searching for Sharps Compliance mail-back products, that's where they live now." },
      { q: "Is Easy Rx Cycle like Sharps Compliance?", a: "Similar mail-back convenience across a similar range of streams. The difference is how you buy: we publish the price of every kit, let you check out online without a quote, and don't require a contract." },
      { q: "Do you handle controlled substances like a take-back program?", a: "Yes — both patient take-back mail-back kits and registrant-level DEA-registered controlled-substance destruction with Form 41/222 and a Certificate of Destruction." },
    ],
    sections: [
      {
        eyebrow: "Name change",
        h2: "Sharps Compliance is now Sharps Medical Waste Services.",
        paras: [
          "If you've bought Sharps Compliance mail-back systems before, you'll now find the company as <strong>Sharps Medical Waste Services</strong> at sharpsmws.com. The old sharpsinc.com address redirects there, and its online store remains at store.sharpsinc.com.",
          "Nothing about your compliance obligations changes with a name. What's worth comparing is how each company sells: Sharps MWS lists products with quote prompts, while every Easy Rx Cycle kit shows its price before you check out.",
        ],
      },
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
  {
    slug: "123-compliant-alternative",
    name: "123 Compliant",
    kind: "self-serve reverse distributor",
    metaTitle: "123 Compliant Alternative — Controlled Destruction + Every Stream",
    metaDesc: "Comparing 123 Compliant? Both publish controlled-substance destruction prices. Easy Rx Cycle adds sharps, biohazard, RCRA, trace chemo, and an on-site medication disposal kit — one DEA-registered vendor, no contract.",
    h1: "A full-stream 123 Compliant alternative",
    lead: "123 Compliant and Easy Rx Cycle are two of the few reverse distributors that publish what controlled-substance destruction costs. If controlled and non-controlled drugs are all you ship, compare the boxes side by side. If you also generate sharps, biohazard, RCRA-hazardous drugs, or trace chemo — or want to deactivate wasted doses on site — Easy Rx Cycle covers all of it from one DEA-registered vendor.",
    theirModel: "123 Compliant is a self-serve reverse distributor. It publishes destruction box prices (Small $170, Medium $325, Large $468), offers a free USPS sizing pack, and takes controlled substances (Schedules II–V), non-controlled and bulk pharmaceuticals, listed chemicals, and veterinary drugs. It also sells a Sublocade destruction product and runs route service in Arizona.",
    rows: [
      { feature: "Controlled destruction pricing", them: "Published: $170 / $325 / $468 per box", us: `Published: ${CTL_LIST} per kit, sized by weight` },
      { feature: "Model", them: "Self-serve mail-back boxes", us: "Self-serve mail-back kits + pickup + quote" },
      { feature: "Pharmaceutical streams", them: "Controlled, non-controlled, bulk pharma, listed chemicals", us: "Controlled, non-controlled, RCRA-hazardous, trace chemo" },
      { feature: "Sharps & biohazard", them: "Not listed in its lineup", us: `Mail-back kits from ${from("sharps")}` },
      { feature: "On-site medication disposal kit", them: "Not listed in its lineup", us: `Yes — from ${from("medication-onsite")}` },
    ],
    edges: [
      "Every regulated stream from one vendor — sharps, biohazard, pharmaceutical, controlled, RCRA-hazardous, and trace chemo.",
      "An on-site medication disposal kit for wasted doses, alongside mail-back destruction for inventory.",
      "Controlled kits sized by weight up to 100 lbs, with prepaid shipping both ways, chain of custody, and a Certificate of Destruction included.",
      "Bigger sites can get a same-day quote or scheduled pickup — still with no contract.",
    ],
    faqs: [
      { q: "Is 123 Compliant cheaper than Easy Rx Cycle?", a: `For controlled-substance boxes, 123 Compliant's published list prices ($170, $325, $468) start lower than our controlled kits (${CTL_LIST}). Box capacity and what's included differ, so compare like for like: how much each holds, whether shipping both ways is included, who completes Form 222 and Form 41, and what documentation you get back.` },
      { q: "What does Easy Rx Cycle cover that a pharmaceutical-only service doesn't?", a: "Sharps, biohazard (red-bag) waste, RCRA-hazardous drugs, trace chemotherapy waste, and an on-site medication disposal kit — so a clinic or pharmacy can put every regulated stream with one vendor instead of two or three." },
      { q: "Can I use both?", a: "Yes. There's no contract with either, so some facilities use one vendor for controlled substances and another for everything else. Consolidating with one vendor just means one account, one set of records, and one place to reorder." },
    ],
    sections: [
      {
        eyebrow: "Published prices",
        h2: "Two companies that show the price.",
        paras: [
          "Most of this industry quotes controlled-substance destruction privately. 123 Compliant publishes per-box prices, and so do we. That's good for buyers: you can compare before you call anyone.",
          `Our controlled substance kits are sized by weight and item count: ${inCategory("controlled").map((p) => `${p.size} for ${money(p.cents)}`).join("; ")}. Each includes the weight-rated mailer, prepaid shipping both ways, chain of custody, DEA-registered non-retrievable destruction, Form 222 and Form 41 handled for you, and a Certificate of Destruction. See <a href=\"/blog/reverse-distributor-cost/\">what reverse distribution costs</a> for the full breakdown.`,
        ],
      },
    ],
  },
  {
    slug: "trilogy-medwaste-alternative",
    name: "Trilogy MedWaste",
    kind: "regional route-based hauler",
    metaTitle: "Trilogy MedWaste Alternative — Nationwide Mail-Back, No Contract",
    metaDesc: "Comparing Trilogy MedWaste? Easy Rx Cycle is DEA-registered, nationwide prepaid mail-back for every regulated stream — including controlled-substance destruction — with published prices and no contract.",
    h1: "A nationwide Trilogy MedWaste alternative",
    lead: "Trilogy MedWaste runs regional route pickup with mail-back sharps and a supplies store. If you'd rather skip the truck schedule, or you're outside its route area, Easy Rx Cycle ships prepaid mail-back kits for every regulated stream to any US address — with published prices, no contract, and DEA-registered controlled-substance destruction.",
    theirModel: "Trilogy MedWaste provides regional route pickup (its site lists location pages in 14 states) plus mail-back sharps, trace chemo, non-RCRA pharmaceutical and hazardous waste, OSHA/HIPAA/DOT training, and formulary management. It sells containers, red bags, and gloves through an online supplies store, and service is quoted.",
    rows: [
      { feature: "Model", them: "Regional route pickup + mail-back sharps", us: "Nationwide prepaid mail-back + pickup" },
      { feature: "Service pricing", them: "By quote (supplies sold online)", us: "Published on every kit" },
      { feature: "Coverage", them: "Route areas (location pages in 14 states)", us: "Every US ZIP by mail-back" },
      { feature: "Controlled / DEA", them: "Not listed among its services", us: "DEA-registered destruction + Form 41/222" },
      { feature: "Reverse distribution", them: "Not listed among its services", us: "Yes" },
      { feature: "On-site medication kit", them: "Not listed among its services", us: "Yes" },
    ],
    edges: [
      "Ships to any US address — no route area, no pickup window to wait for.",
      "Published price on every kit; no quote needed to start.",
      "DEA-registered controlled-substance destruction and reverse distribution alongside every other stream.",
      "No contract, monthly minimum, or auto-renewal.",
    ],
    faqs: [
      { q: "Is mail-back cheaper than a route service like Trilogy MedWaste?", a: "For low-to-moderate volume it often is, because you pay a flat price per kit only when you ship — no recurring service fee or minimum. High-volume sites that fill bins every week may be better served by route pickup; we quote pickup too, with no contract." },
      { q: "Can Easy Rx Cycle handle controlled substances?", a: "Yes. We're a DEA-registered reverse distributor. Our controlled substance mail-back kits include chain of custody, non-retrievable destruction, Form 222 and Form 41 handled for you, and a Certificate of Destruction." },
      { q: "Do you serve my state?", a: "Mail-back kits ship to any US address. Pickup is available where volume calls for it — get a quote and we'll confirm." },
    ],
  },
  {
    slug: "sharps-assure-alternative",
    name: "Sharps Assure",
    kind: "sharps mail-back + reverse distributor",
    metaTitle: "Sharps Assure Alternative — Every Stream, DEA-Registered",
    metaDesc: "Comparing Sharps Assure? Easy Rx Cycle offers sharps mail-back plus biohazard, pharmaceutical, controlled, RCRA, and trace chemo kits — DEA-registered, published prices, no contract.",
    h1: "A full-stream Sharps Assure alternative",
    lead: "Sharps Assure sells sharps mail-back systems through retail and medical-supply channels and is a DEA-registered reverse distributor. Easy Rx Cycle also sells no-contract sharps mail-back — and adds kits for every other regulated stream, from biohazard to RCRA-hazardous drugs and trace chemo, plus an on-site medication disposal kit.",
    theirModel: "Sharps Assure, based in New Jersey, sells self-serve sharps mail-back systems (from travel packs to 18-gallon programs) through outlets such as McKesson, Staples, Walmart, and School Nurse Supply, advertises no contract, and is registered with the DEA as a reverse distributor.",
    rows: [
      { feature: "Sharps mail-back", them: "Yes — travel packs to 18-gallon programs", us: `Yes — 1 quart to 28 gallons, from ${from("sharps")}` },
      { feature: "Contract", them: "No contract (advertised)", us: "None" },
      { feature: "Where to buy", them: "Retail and medical-supply channels", us: "Direct self-serve shop, quote, or distributor" },
      { feature: "DEA registration", them: "Registered reverse distributor", us: "Registered reverse distributor" },
      { feature: "Biohazard, RCRA & trace chemo kits", them: "Not listed in its lineup", us: "Yes — each its own kit" },
      { feature: "On-site medication kit", them: "Not listed in its lineup", us: `Yes — from ${from("medication-onsite")}` },
    ],
    edges: [
      "Sharps plus every other regulated stream — biohazard, pharmaceutical, controlled, RCRA-hazardous, and trace chemo.",
      "Controlled substance kits with published prices, Form 222/41 handled, and a Certificate of Destruction.",
      "An on-site medication disposal kit for wasted doses.",
      "One account and one set of records for everything your facility generates.",
    ],
    faqs: [
      { q: "Do both companies offer no-contract sharps mail-back?", a: "Yes. Both sell sharps mail-back without a contract. The difference is breadth: Easy Rx Cycle also sells biohazard, pharmaceutical, controlled-substance, RCRA-hazardous, and trace chemo kits, plus an on-site medication disposal kit." },
      { q: "Which sharps container size do I need?", a: "Match it to how fast you fill it. A 1-quart or 2-gallon kit suits a small office or school nurse; 9 to 28 gallons suits a busy clinic. Our sharps container size guide walks through it." },
      { q: "Is Easy Rx Cycle DEA-registered?", a: "Yes. We're a DEA-registered reverse distributor, so controlled substances can come to us for documented, non-retrievable destruction." },
    ],
  },
  {
    slug: "pureway-alternative",
    name: "PureWay",
    kind: "self-serve sharps mail-back",
    metaTitle: "PureWay Alternative — DEA-Registered Mail-Back for Every Stream",
    metaDesc: "Comparing PureWay sharps mail-back? Easy Rx Cycle adds DEA-registered controlled-substance destruction, biohazard, pharmaceutical, RCRA, and an on-site medication kit — published prices, no contract.",
    h1: "A DEA-registered PureWay alternative",
    lead: "PureWay sells self-serve sharps mail-back systems online and through dental and pharmacy channels, with a strong at-home injection focus. Easy Rx Cycle sells no-contract sharps mail-back too — and, as a DEA-registered reverse distributor, adds controlled-substance destruction with a Certificate of Destruction, plus every other regulated stream a clinic generates.",
    theirModel: "PureWay, based in San Antonio and operating since 2013, sells self-serve sharps mail-back systems from 1.4 quarts to 18 gallons (including multipacks and an 18-gallon trace chemo system) through its online store, dental distributors such as Benco Dental, and the IPC pharmacy co-op, along with OSHA, HIPAA, and pharmacy-waste compliance services.",
    rows: [
      { feature: "Sharps mail-back", them: "1.4 qt to 18 gal systems", us: `1 qt to 28 gal kits, from ${from("sharps")}` },
      { feature: "Trace chemo", them: "18-gallon system", us: `2 to 28 gallon kits, from ${from("chemo")}` },
      { feature: "Pricing", them: "Published (online store)", us: "Published on every kit" },
      { feature: "Controlled / DEA", them: "Not listed in its lineup", us: "DEA-registered destruction + Form 41/222" },
      { feature: "Biohazard & RCRA kits", them: "Not listed in its lineup", us: "Yes — each its own kit" },
      { feature: "On-site medication kit", them: "Not listed in its lineup", us: `Yes — from ${from("medication-onsite")}` },
    ],
    edges: [
      "DEA-registered: controlled substances come to us for documented, non-retrievable destruction.",
      "A Certificate of Destruction on every mail-back order.",
      "Every regulated stream — sharps, biohazard, pharmaceutical, controlled, RCRA-hazardous, and trace chemo — from one vendor.",
      "An on-site medication disposal kit for wasted doses at the point of care.",
    ],
    faqs: [
      { q: "Is PureWay or Easy Rx Cycle better for at-home injections?", a: "Both sell sharps mail-back for people who inject at home — GLP-1, insulin, TRT, fertility. If you're a clinic that also handles controlled substances, expired medications, or biohazard waste, Easy Rx Cycle covers those streams from the same account." },
      { q: "Can Easy Rx Cycle destroy controlled substances?", a: "Yes. We're a DEA-registered reverse distributor. Our controlled substance mail-back kits include chain of custody, non-retrievable destruction, Form 222 and Form 41 handled for you, and a Certificate of Destruction." },
      { q: "Do you sell through dental distributors?", a: "You can buy directly in our shop with published prices, request a quote for larger programs, or ask about our distributor partners." },
    ],
  },
];

export const competitorBySlug = (slug: string) => COMPETITORS.find((c) => c.slug === slug);
export const competitorSlugs = () => COMPETITORS.map((c) => c.slug);
