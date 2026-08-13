// Partner channel content — one source for the /partners hub and the /partners/[channel] pages.
// Business terms reflect William's confirmed answers (2026-08-05): GPO contract-ready; distributor
// tiered + private-label with pricing GATED (apply); 3PL white-label + referral + integration + SLAs;
// broker recurring commission per order. No invented numbers.

export type ChannelItem = { t: string; d: string };
export type Channel = {
  slug: string;
  name: string;        // nav / card label
  tag: string;         // short chip on the hub card
  blurb: string;       // one-liner on the hub card
  eyebrow: string;
  h1: string;          // may contain a {teal} split marker "|" — first part ink, second teal
  lead: string;
  intro: string;       // opening paragraph on the channel page
  youGet: ChannelItem[];   // what the partner gets
  fit: string[];           // "this is for you if…"
  ctaLabel: string;
};

export const channels: Channel[] = [
  {
    slug: "gpos",
    name: "GPOs",
    tag: "Contract-ready",
    blurb: "Add compliant destruction across every regulated stream to your members' portfolio.",
    eyebrow: "For GPOs & purchasing coalitions",
    h1: "Compliant waste destruction, |ready for your contract.",
    lead: "Give your members one DEA-registered partner for every regulated waste stream — sharps, biohazard, pharmaceutical, RCRA-hazardous, controlled substances, trace chemo, and more — with the credentials and documentation your compliance team expects.",
    intro: "We're contract-ready and built to onboard fast. Easy Rx Cycle serves healthcare facilities in all 50 states with mail-back kits and scheduled pickup, a Certificate of Destruction on every order, and a 100% client audit-pass record — so adding us to your agreement is low-risk and high-value for members.",
    youGet: [
      { t: "A contract-ready vendor", d: "Capability statement, credentials, and company data (NAICS 562119 · DUNS 10-953-4447) on file — fast to add to your agreement." },
      { t: "Member pricing", d: "Competitive, consistent pricing your members can buy through the GPO — no contract or minimums on their end." },
      { t: "Every regulated stream", d: "One partner for sharps, biohazard/RMW, pharmaceutical, RCRA-hazardous, controlled substances, trace chemo, mail-back kits, and reverse distribution." },
      { t: "Dedicated onboarding & support", d: "A single point of contact for your team and white-glove onboarding for members." },
      { t: "Nationwide coverage", d: "Mail-back to all 50 states plus scheduled pickup for higher-volume members." },
      { t: "Audit-ready documentation", d: "A Certificate of Destruction on every member order, with records retained per DEA requirements." },
    ],
    fit: [
      "National or regional GPOs serving healthcare",
      "Purchasing coalitions and IDNs",
      "Anyone who needs a compliant, single-source destruction vendor for members",
    ],
    ctaLabel: "Add us to your contract",
  },
  {
    slug: "distributors-wholesalers",
    name: "Distributors & Wholesalers",
    tag: "Wholesale tiers · apply",
    blurb: "Resell compliant mail-back kits for every stream under a name buyers trust.",
    eyebrow: "For distributors & wholesalers",
    h1: "Resell compliant destruction, |profitably.",
    lead: "Add DEA-registered mail-back kits and destruction for every regulated waste stream to your catalog — with tiered wholesale pricing, private-label options, and the compliance handled for you.",
    intro: "You bring the accounts and the catalog; we bring the compliance, the kits, and the paperwork. Resell under our name or your own, at wholesale tier pricing, with a Certificate of Destruction on every order backing your customers.",
    youGet: [
      { t: "Tiered wholesale pricing", d: "Silver, Gold, and Platinum wholesale tiers — apply and we'll match you to the right level for your volume." },
      { t: "Private-label & co-brand", d: "Resell under your own brand or co-branded — the compliant destruction back-end is ours, the customer relationship is yours." },
      { t: "The full line card", d: "Every kit and SKU across all eight regulated streams, on one line card, ready to list." },
      { t: "Drop-ship or stock", d: "We drop-ship to your customers or supply your stock — whichever fits your model." },
      { t: "Marketing assets", d: "Product content, the line card, and sell sheets to help your reps move it." },
      { t: "Compliance handled", d: "DEA/EPA/DOT compliance and the Certificate of Destruction are on us — you focus on selling." },
    ],
    fit: [
      "Medical, dental, and lab supply distributors",
      "Pharmacy and healthcare wholesalers",
      "Anyone reselling to healthcare who wants a compliant destruction line",
    ],
    ctaLabel: "Apply for wholesale pricing",
  },
  {
    slug: "3pls-fulfillment",
    name: "3PLs & Fulfillment",
    tag: "White-label ready",
    blurb: "Be your clients' DEA/RCRA destruction back-end — under your own brand.",
    eyebrow: "For 3PLs & fulfillment providers",
    h1: "Your clients' destruction back-end, |white-labeled.",
    lead: "Offer compliant medical and pharmaceutical waste destruction as part of your fulfillment — fully white-labeled, with integration options, and backed by our DEA/RCRA compliance and documentation.",
    intro: "Plug Easy Rx Cycle in behind your brand and give your clients compliant destruction for every regulated stream without building a DEA-registered operation yourself. We handle the compliance and the paperwork; you keep the client relationship.",
    youGet: [
      { t: "Full white-label", d: "Destruction offered entirely under your brand — your clients never see us unless you want them to." },
      { t: "Referral back-end option", d: "Prefer to refer instead of white-label? Send us the client and we fulfill and document — co-branded or named." },
      { t: "Integration options", d: "API, EDI, and portal integration for orders, tracking, and CODs — scoped with our team around your systems (early access)." },
      { t: "Volume SLAs & dedicated support", d: "Service-level commitments and a dedicated contact for your account team." },
      { t: "Compliance & liability handled", d: "DEA registration, EPA/RCRA, and DOT compliance are ours — the regulated risk doesn't sit with you." },
      { t: "Every regulated stream", d: "Sharps, biohazard, pharmaceutical, RCRA-hazardous, controlled substances, trace chemo, and more." },
    ],
    fit: [
      "3PLs and fulfillment providers serving healthcare",
      "Medical logistics and kitting companies",
      "Platforms that want to add destruction without a DEA registration",
    ],
    ctaLabel: "Explore a white-label partnership",
  },
  {
    slug: "brokers",
    name: "Brokers",
    tag: "Recurring commission",
    blurb: "Earn recurring commission placing compliant destruction with your accounts.",
    eyebrow: "For brokers & independent reps",
    h1: "Earn recurring commission |on every order.",
    lead: "Place DEA-registered destruction for every regulated waste stream with your book of accounts — and earn a recurring commission on every order they place. No DEA license, kits, or infrastructure required on your end.",
    intro: "You have the relationships; we have the compliance. Refer your accounts, we fulfill and document every order, and you earn on every one — ongoing, not just the first sale.",
    youGet: [
      { t: "Recurring commission", d: "Earn on every order your accounts place — ongoing revenue, not a one-time referral fee." },
      { t: "No license or infrastructure", d: "No DEA registration, no kits to stock, no compliance to manage — we handle all of it." },
      { t: "A simple referral process", d: "Introduce the account; we take it from there and keep you in the loop." },
      { t: "Sales collateral", d: "The capability statement, line card, and sample Certificate of Destruction to help you close." },
      { t: "Deal protection", d: "Your referred accounts are registered to you so your commission is protected." },
      { t: "We fulfill & document", d: "Every order ships with a Certificate of Destruction — your accounts stay audit-ready and happy." },
    ],
    fit: [
      "Independent medical/dental sales reps",
      "Compliance and practice-management consultants",
      "Anyone with healthcare relationships who wants recurring referral income",
    ],
    ctaLabel: "Become a referral partner",
  },
];

export const CHANNEL_BY_SLUG: Record<string, Channel> = Object.fromEntries(channels.map((c) => [c.slug, c]));

// Sub-segments served within each channel ("who we serve within [channel]").
// href links to a representative who-we-serve ICP so partners can verify we cover their accounts.
export type SubSegment = { name: string; note: string; href?: string };
export const SUB_SEGMENTS: Record<string, SubSegment[]> = {
  gpos: [
    { name: "Hospital & health-system GPOs / IDNs", note: "Multi-facility acute care with every regulated stream and strict documentation needs.", href: "/who-we-serve/hospitals" },
    { name: "LTC & senior-care GPOs", note: "Nursing homes, hospice, and assisted living — controlled-substance take-back and resident meds.", href: "/who-we-serve/nursing-homes" },
    { name: "Dental GPOs & DSOs", note: "Sharps and the occasional controlled — at scale across locations.", href: "/who-we-serve/dental-groups-dso" },
    { name: "Physician, ASC & surgery-center groups", note: "High sharps and Schedule II volume across lean-staffed sites.", href: "/who-we-serve/asc" },
    { name: "Veterinary buying groups", note: "Ketamine, euthanasia solution, and sharps under DEA rules.", href: "/who-we-serve/veterinary" },
    { name: "Pharmacy & retail coalitions", note: "Reverse distribution, controlled destruction, and RCRA-hazardous drugs.", href: "/who-we-serve/retail-pharmacy" },
    { name: "Regional purchasing alliances", note: "Mixed-facility coalitions that need one compliant vendor for members.", href: "/who-we-serve/" },
  ],
  "distributors-wholesalers": [
    { name: "Med-surg distributors", note: "Add sharps, biohazard, and pharmaceutical mail-back kits to a broad healthcare catalog.", href: "/who-we-serve/hospitals" },
    { name: "Dental supply distributors", note: "Sharps and small-practice compliance kits for dental accounts.", href: "/who-we-serve/dental" },
    { name: "Pharmacy & drug wholesalers", note: "Reverse distribution, controlled destruction, and RCRA-hazardous handling.", href: "/who-we-serve/retail-pharmacy" },
    { name: "Laboratory suppliers", note: "Sharps, biohazard, and chemical/RCRA streams for research and clinical labs.", href: "/who-we-serve/clinical-labs" },
    { name: "Veterinary distributors", note: "Controlled-substance and sharps kits for vet clinics.", href: "/who-we-serve/veterinary" },
    { name: "Home-health & DME suppliers", note: "Mail-back sharps and medication kits for in-home care.", href: "/who-we-serve/home-health" },
  ],
  "3pls-fulfillment": [
    { name: "Pharma 3PLs", note: "White-label destruction and reverse distribution behind your fulfillment.", href: "/who-we-serve/pharma-manufacturers" },
    { name: "Medical-device logistics", note: "Sharps and biohazard back-end for device and kit fulfillment.", href: "/who-we-serve/hospitals" },
    { name: "Healthcare e-commerce fulfillment", note: "Drop-ship destruction kits under your brand, integrated to your platform.", href: "/who-we-serve/" },
    { name: "Specialty-pharmacy logistics", note: "Controlled, hazardous, and mail-back handling with chain-of-custody.", href: "/who-we-serve/specialty-pharmacy" },
    { name: "Lab-kit fulfillment", note: "Return-and-destroy flows for sample and specimen kits.", href: "/who-we-serve/clinical-labs" },
  ],
  brokers: [
    { name: "Independent medical & dental reps", note: "Add a recurring-commission compliance line to your bag.", href: "/who-we-serve/dental" },
    { name: "Compliance & practice-management consultants", note: "Refer destruction as part of the compliance programs you build.", href: "/who-we-serve/physician-offices" },
    { name: "Procurement & GPO advisors", note: "Place a vetted destruction vendor with the accounts you advise.", href: "/who-we-serve/hospitals" },
    { name: "Facility-services brokers", note: "Bundle regulated-waste destruction into facility service deals.", href: "/who-we-serve/" },
  ],
};

// Partner enablement — the same real support offered across channels (William-confirmed).
export const PARTNER_SUPPORT: { t: string; d: string }[] = [
  { t: "Co-branded marketing & MDF", d: "Co-branded sell sheets, campaign assets, and market-development support to help you win accounts." },
  { t: "Training & enablement", d: "Onboarding and product/compliance training so your team can speak to every regulated stream." },
  { t: "A dedicated partner manager & portal", d: "A named point of contact for your account, plus portal access for orders, tracking, and documents." },
  { t: "Deal & territory protection", d: "Registered accounts and protected referrals, so the business you bring stays yours." },
];

// Partner enablement — the itemized "what you actually get," in 5 buckets, each with its downloadable asset.
// William-confirmed: MDF case-by-case; full training + Certified Partner; portal live (orders/CODs/asset library).
export type EnableItem = { t: string; d: string };
export type EnableBucket = { t: string; blurb: string; items: EnableItem[]; dl?: { t: string; h: string } };
export const ENABLEMENT: EnableBucket[] = [
  { t: "Marketing kit — co-branded", blurb: "Everything you need to market compliant destruction under your own name.", items: [
    { t: "Co-branded sell sheets", d: "One per waste stream and per industry — your logo and contact, our compliance and proof." },
    { t: "Co-branded line card", d: "Every kit and SKU on one sheet, ready to hand a buyer or attach to a proposal." },
    { t: "Email & social campaign templates", d: "Ready-to-send campaigns for your accounts, editable to your brand and voice." },
    { t: "Stream graphics & product images", d: "Stream icons and product graphics for your site, decks, and listings (kit photography added as it's available)." },
    { t: "Co-branded case-study one-pagers", d: "Real client results, badged with your name, to close a skeptical account." },
    { t: "A co-branded landing page", d: "A landing page for your leads — set up with your partner manager." },
    { t: "Co-op & MDF support (case-by-case)", d: "We co-invest in campaigns that grow the account base — bring your partner manager a plan and we scope funding case-by-case." },
  ], dl: { t: "Marketing kit overview", h: "/downloads/partner-marketing-kit.pdf" } },
  { t: "Sales enablement", blurb: "What makes your reps able to actually sell it — from the first call to the close.", items: [
    { t: "A rep battle card", d: "The pitch, the wedge vs. the national haulers, and objection handling, all on one page." },
    { t: "An 8-stream cheat sheet", d: "What each regulated stream is and who generates it, so a rep can talk to any account." },
    { t: "A qualifying & discovery guide", d: "The questions that surface the opportunity fast and size the deal." },
    { t: "Why-us one-liners", d: "The three reasons an account switches, ready to drop into an email or a call." },
    { t: "Margin & pricing quick-reference", d: "Your economics at a glance — shared on approval so you can sell with confidence." },
  ], dl: { t: "Rep battle card", h: "/downloads/rep-battle-card.pdf" } },
  { t: "Training & certification", blurb: "A real program — not a PDF you skim once and forget.", items: [
    { t: "A live onboarding session", d: "A working session with your partner manager to get your team selling day one." },
    { t: "Recorded product & compliance modules", d: "On-demand training on every stream and every credential — learn at your pace." },
    { t: "‘Certified Partner’ status", d: "Your team earns it once trained — a badge you can show accounts." },
    { t: "Ongoing briefings", d: "We keep you current as regulations, products, and kits change." },
    { t: "A partner knowledge base", d: "Answers and assets on demand inside the partner portal." },
  ], dl: { t: "Training outline", h: "/downloads/partner-training-outline.pdf" } },
  { t: "Tools & portal", blurb: "Your dedicated partner manager runs the day-to-day today — with self-serve tools rolling out.", items: [
    { t: "A dedicated partner manager", d: "A named human who places and tracks your orders and owns your success — not a ticket queue." },
    { t: "A co-branded asset library — live now", d: "Every co-branded sheet and campaign template, always the current version. Browse the partner toolkit." },
    { t: "A Certificate of Destruction on every order", d: "The proof your accounts and auditors ask for, delivered to you every time." },
    { t: "Self-serve partner portal — early access", d: "Online ordering, tracking, COD retrieval, and commission reporting — rolling out; ask about early access." },
  ] },
  { t: "Deal & territory protection", blurb: "The business you bring stays yours.", items: [
    { t: "Register your accounts", d: "Log a deal and it's tied to you — no channel conflict." },
    { t: "Protected referrals & territory", d: "Your accounts and your patch are protected while you're active." },
    { t: "Transparent commission tracking", d: "Every order tied to your account is tracked and reported." },
    { t: "First right on renewals & expansion", d: "The accounts you win are yours to grow." },
  ] },
];

// How each channel makes money — framed around flexibility (William: "we're flexible, give them what's best").
export const ECONOMICS: Record<string, { t: string; d: string }[]> = {
  gpos: [
    { t: "Contracted member pricing", d: "Your members buy at agreed contract pricing through the GPO — you earn your admin fee, they get one compliant vendor for every stream." },
    { t: "We support members directly", d: "We onboard and support each member; you get the contract win without carrying the service load." },
    { t: "Flexible to your model", d: "Tiered pricing, standardized SKUs, or custom terms — we build the agreement around how your members buy. Terms set at onboarding." },
  ],
  "distributors-wholesalers": [
    { t: "Buy wholesale, keep the margin", d: "You purchase at tiered wholesale pricing and resell at your price — you own the customer and keep the spread." },
    { t: "Resell or private-label", d: "Sell under our name or your own brand. Drop-ship or stock — whichever fits your model." },
    { t: "Flexible terms", d: "Tier level, kitting, and payment terms are set at onboarding around your volume. Apply for wholesale pricing." },
  ],
  "3pls-fulfillment": [
    { t: "White-label back-end", d: "Offer destruction under your brand; you invoice your client and set your price — we're the compliant engine behind it." },
    { t: "Or refer and earn", d: "Prefer not to white-label? Refer the client and we handle fulfillment, billing, and documentation." },
    { t: "Flexible integration & terms", d: "API, EDI, and portal integration (early access), with SLAs and terms set around your volume at onboarding." },
  ],
  brokers: [
    { t: "Recurring commission", d: "You refer the account; we invoice and fulfill, and you earn a recurring commission on every order they place — ongoing, not one-and-done." },
    { t: "Zero overhead", d: "No DEA license, no kits, no compliance to manage. We carry all of it; you keep the relationship and the commission." },
    { t: "Flexible terms", d: "Commission terms are set at onboarding around your book of business. Contact us for terms." },
  ],
};

// Objection-handling FAQ per channel (also feeds FAQPage schema).
export const CHANNEL_FAQ: Record<string, { q: string; a: string }[]> = {
  gpos: [
    { q: "Are you contract-ready?", a: "Yes. We have the capability statement, credentials, and company data (NAICS 562119 · DUNS 10-953-4447) on file and can be added to your agreement quickly." },
    { q: "Can you serve members nationwide?", a: "Yes — mail-back to all 50 states plus scheduled pickup for higher-volume members, across every regulated waste stream." },
    { q: "Who supports our members?", a: "We do. Members get direct onboarding and support, with a Certificate of Destruction on every order and records retained per DEA requirements." },
    { q: "What does it cost members?", a: "Members buy at agreed contract pricing with no contract or minimums on their end. We build the pricing structure around how your members purchase." },
  ],
  "distributors-wholesalers": [
    { q: "How do I make money?", a: "You buy at tiered wholesale pricing and resell at your price — you own the customer and keep the margin. Apply and we'll match you to the right tier." },
    { q: "Can I sell under my own brand?", a: "Yes. Resell under our name or fully private-labeled/co-branded — the compliant destruction back-end is ours, the customer relationship is yours." },
    { q: "Do I have to stock inventory?", a: "No. We can drop-ship kits directly to your customers, or supply your stock — whichever fits your model." },
    { q: "Who handles compliance?", a: "We do. DEA/EPA/DOT compliance and the Certificate of Destruction are on us, so you can sell without regulatory overhead." },
  ],
  "3pls-fulfillment": [
    { q: "Can I white-label it?", a: "Yes — offer destruction entirely under your brand. Your clients never see us unless you want them to. A referral model is available too." },
    { q: "Do you integrate with our systems?", a: "Yes — API, EDI, and portal integration is on our roadmap and in early access. We scope the right connection with your team at onboarding; until it's live for you, a dedicated manager handles orders, tracking, and CODs." },
    { q: "Who carries the regulatory liability?", a: "We do. We hold the DEA registration and carry the regulated-destruction liability — it doesn't sit with you." },
    { q: "Do you offer SLAs?", a: "Yes — service-level commitments and a dedicated contact for volume partners, set at onboarding." },
  ],
  brokers: [
    { q: "How and when do I get paid?", a: "You earn a recurring commission on every order your referred accounts place — ongoing, not a one-time fee. Commission terms are set at onboarding." },
    { q: "Do I need a DEA license or infrastructure?", a: "No. No license, no kits, no compliance to manage. We handle fulfillment, billing, and documentation; you keep the relationship." },
    { q: "Who owns the account?", a: "Your referred accounts are registered to you and protected, so the business you bring stays yours." },
    { q: "What if my account gets audited?", a: "We provide the documentation and support to help your account pass — backed by a 100% client audit-pass record." },
  ],
};

// Compliance & liability assurances (William-confirmed true — no indemnification claim).
export const COMPLIANCE_POINTS: { t: string; d: string }[] = [
  { t: "We carry the regulatory liability", d: "As the DEA registrant, the regulated-destruction liability sits with us — not with you or your accounts." },
  { t: "Certificate of Insurance on request", d: "We provide a COI to partners and their procurement teams whenever it's needed." },
  { t: "We support your accounts through audits", d: "If a partner's account is audited, we provide the documentation and support to pass — backed by a 100% client audit-pass record." },
  { t: "Full documentation & chain-of-custody", d: "A Certificate of Destruction on every order, plus DEA Form 41/222 and manifests where they apply, retained per DEA requirements." },
];

// Why partners choose Easy Rx Cycle over the national haulers.
export const WHY_PARTNERS: { t: string; d: string }[] = [
  { t: "No contracts, no minimums", d: "Your accounts aren't locked into multi-year hauler contracts — an easier sell and a stickier relationship." },
  { t: "One vendor for all 8 streams", d: "Sharps to controlled substances to RCRA-hazardous — you place one partner, not five." },
  { t: "Destruction, not just hauling", d: "DEA non-retrievable destruction with a Certificate of Destruction on every order — the proof accounts actually want." },
  { t: "Fast, flexible onboarding", d: "Contract-ready with credentials on file, and terms built around how you go to market." },
];
