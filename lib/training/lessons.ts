// Distributor rep training — the "book" behind /partners/training/[module].
// One chapter per test module (ids match lib/training/bank.json). Same facts as the Distributor Sales Playbook
// (docs-src/sales_catalog.py) — keep the two in step. Strings are trusted, authored HTML (bold/italics only).
// SKU tables come from the live shop catalog (lib/shop.ts) so prices always match.

export type FormSample = { src: string; title: string; caption: string };
export type Section = {
  h: string;
  p?: string[];
  yes?: string[];            // "what goes in" list
  no?: string[];             // "never goes in" list
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  skus?: string;             // shop category key → SKU / size / MSRP table
  forms?: string[];          // FORM_SAMPLES keys
  callout?: { label: string; text: string; warn?: boolean };
};
export type Lesson = { id: string; title: string; kicker: string; image?: string; summary: string; sections: Section[]; remember: string[] };

const F = "/images/training/forms/";
export const FORM_SAMPLES: Record<string, FormSample> = {
  "cod-sharps": { src: F + "cod-sharps.jpg", title: "Certificate of Destruction — Sharps", caption: "Containers by weight · autoclave sterilization · two electronic signatures" },
  "cod-biohazard": { src: F + "cod-biohazard.jpg", title: "Certificate of Destruction — Biohazard", caption: "Containers by weight · autoclave sterilization · two electronic signatures" },
  "cod-pharmaceutical": { src: F + "cod-pharmaceutical.jpg", title: "Certificate of Destruction — Non-controlled drugs", caption: "Containers by weight · regulated incineration" },
  "cod-medication": { src: F + "cod-medication.jpg", title: "Certificate of Destruction — Medication kits", caption: "Mailer by weight · regulated incineration" },
  "cod-rcra": { src: F + "cod-rcra.jpg", title: "Certificate of Destruction — RCRA containers", caption: "Containers by weight · incineration at a permitted TSDF" },
  "cod-controlled": { src: F + "cod-controlled.jpg", title: "Certificate of Destruction — Controlled (Schedules I–V)", caption: "Every drug itemized · client DEA number · two witnesses · signed by hand" },
  "cod-trace-chemo": { src: F + "cod-trace-chemo.jpg", title: "Certificate of Destruction — Trace chemo", caption: "Containers by weight · regulated incineration" },
  "cod-charcoal": { src: F + "cod-charcoal.jpg", title: "Certificate of Destruction — Charcoal containers", caption: "Containers by weight · regulated destruction" },
  "rmw": { src: F + "rmw-manifest.jpg", title: "Medical Waste Manifest", caption: "Required by law for regulated medical waste — tracks it from your customer to treatment and disposal" },
  "dea222": { src: F + "dea-222.jpg", title: "DEA Form 222 (Schedule I & II)", caption: "The data we print onto the official DEA-issued form" },
  "form35": { src: F + "form-3-5.jpg", title: "3–5 Form (Schedule III–V transfer)", caption: "Customer = supplier · Arkansas Redistributors, LLC (Easy Rx Cycle) = purchaser · up to 20 lines" },
  "dea41": { src: F + "dea-41.jpg", title: "DEA Form 41 (destruction record)", caption: "What was destroyed, when, where, how — signed by two witnesses" },
  "epa": { src: F + "epa-manifest.jpg", title: "RCRA Form — EPA Form 8700-22", caption: "Uniform Hazardous Waste Manifest: generator → transporter → TSDF" },
};

export const LESSONS: Lesson[] = [
  {
    id: "basics", title: "The basics", kicker: "Chapter 1",
    summary: "What Easy Rx Cycle does, how a mail-back kit works from start to finish, and the rules that keep every order compliant.",
    sections: [
      { h: "What we do", p: [
        "Easy Rx Cycle is a <b>DEA-registered disposal company</b>. We make prepaid mail-back kits for every regulated pharmaceutical and medical waste stream: sharps, biohazard, non-controlled drugs, patient take-back medications, controlled substances, trace chemo, RCRA hazardous drugs and used charcoal disposal containers.",
        "The customer fills the kit, seals it and mails it back with the prepaid label. We destroy the contents the way that waste stream requires, and we send the documents they keep for inspections — starting with a <b>Certificate of Destruction</b> on every mail-back order.",
      ] },
      { h: "The four documents you'll hear about most", table: { head: ["Document", "What it is", "Goes with"], rows: [
        ["<b>Certificate of Destruction (COD)</b>", "Easy Rx Cycle's proof that the customer's waste was destroyed — how, when and what. The customer keeps it for inspections.", "Every mail-back product"],
        ["<b>DEA Form 222</b>", "The official DEA order form required by federal law to transfer Schedule I and II controlled substances.", "Controlled kits with Schedule I/II drugs"],
        ["<b>3–5 Form</b>", "The transfer form documenting Schedule III, IV and V drugs moving from the customer to Easy Rx Cycle.", "Controlled kits with Schedule III–V drugs"],
        ["<b>DEA Form 41</b>", "DEA's record of controlled substances destroyed — what was destroyed, when, where, how, and the two witnesses.", "Every controlled kit"],
      ] }, p: ["The customer completes none of the DEA forms. For controlled kits they fill out one list — the Drug Inventory Manifest — and we prepare the 222, 3–5 Form and Form 41 from it. Chapters 10 and 11 cover each document in detail."] },
      { h: "How the distributor program works", table: { head: ["Step", "What happens"], rows: [
        ["1. You buy in bulk", "You order kits in your Easy Rx Cycle partner portal."],
        ["2. We ship to you", "Kits ship to your warehouse, each with its prepaid return label."],
        ["3. You resell", "You sell kits from your stock to your customers."],
        ["4. They mail it back", "Your customer fills, seals and ships the kit straight to Easy Rx Cycle."],
        ["5. We destroy & document", "We destroy the contents and deliver the Certificate of Destruction and the stream's forms."],
      ] }, callout: { label: "What you never touch", text: "Waste never passes through you. The DEA transfer is between your customer and Easy Rx Cycle, and we complete the DEA forms. You sell the kit; we carry the compliance." } },
      { h: "The rule that prevents most mistakes: one stream per kit", p: [
        "Each kit takes <b>one kind of waste</b>. Mixing streams breaks the destruction rules for both. A dental office with used needles and expired tablets needs two kits — a Sharps kit and a Pharmaceutical kit.",
        "When a customer isn't sure where something goes, call <b>501-904-2929</b> before anything ships.",
      ] },
      { h: "The color code", table: { head: ["Color", "Stream", "Kit"], rows: [
        ["Red", "Sharps and regulated medical waste", "Sharps · Biohazard"], ["Blue", "Non-hazardous pharmaceutical", "Pharmaceutical"],
        ["Yellow", "Trace chemotherapy", "Trace Chemo"], ["Black", "RCRA hazardous pharmaceutical", "Hazardous (RCRA)"],
      ] } },
      { h: "Which kit for which waste", table: { head: ["If the customer has…", "Sell this kit"], rows: [
        ["Needles, syringes, lancets, blades", "Sharps"], ["Blood-soaked gauze, PPE, cultures", "Biohazard / RMW"],
        ["Expired regular (non-controlled) drugs", "Pharmaceutical"], ["Patients' unused medications (take-back)", "Medication Disposal — Mail-Back"],
        ["Wants to deactivate medications on site", "Medication Disposal — On-Site"], ["Expired DEA-scheduled drugs (registrant)", "Controlled Substance"],
        ["Empty chemo vials, chemo PPE and tubing", "Trace Chemo"], ["P-listed, U-listed or characteristic hazardous drugs", "Hazardous (RCRA)"],
        ["Full activated-charcoal disposal containers", "Activated Charcoal Take-Back"],
      ] } },
      { h: "What we don't accept", no: ["Pathological waste (human or animal tissue)", "Bulk chemotherapy (visible drug left) — contact us", "Formaldehyde and laboratory chemicals", "Radioactive waste"] },
      { h: "What you can say — and what you shouldn't", list: [
        "<b>Say:</b> DEA registered · EPA compliant · HIPAA and DOT compliant · 1,000+ facilities served since 2018 · mail-back to all 50 states · a Certificate of Destruction on every mail-back order · we complete the DEA paperwork on controlled substances.",
        "<b>Don't say:</b> that we take pathological waste, chemicals or radioactive waste; that customers can log in to a portal to see records (they're emailed and mailed); savings or turnaround promises we haven't confirmed.",
        "<b>Our DEA registration number</b> is available on request through Easy Rx Cycle — don't hand it out.",
        "<b>Never</b> tell a customer drug waste can be flushed or poured down a drain. It can't.",
      ] },
    ],
    remember: ["One stream per kit.", "Every mail-back order gets a Certificate of Destruction.", "Unsure? Call 501-904-2929 before it ships.", "We don't take pathological, chemical or radioactive waste.", "Never sewer drug waste."],
  },
  {
    id: "sharps", title: "Sharps", kicker: "Chapter 2", image: "/images/products/sharps.webp",
    summary: "Needles, syringes, lancets and blades — the most common kit you'll sell, mailed back in an FDA-cleared container.",
    sections: [
      { h: "What sharps are", p: ["Any device that can puncture or cut skin and may be contaminated: needles, syringes with needles, lancets, insulin pen needles, auto-injectors, IV catheters, scalpel and suture blades, and blood-contaminated broken glass."] },
      { h: "What goes in — and what never does", yes: ["Needles, syringes and lancets", "Insulin pens, pen needles and auto-injectors (EpiPen, etc.)", "IV catheters and butterfly sets", "Scalpel and suture blades", "Blood-contaminated broken glass", "Full or partial sharps containers"],
        no: ["Medications or vials → Pharmaceutical kit", "Chemo-contaminated sharps → Trace Chemo kit", "Red-bag soft waste → Biohazard kit", "Milk jugs, coffee cans or loose bags as containers"] },
      { h: "Sizes and MSRP", skus: "sharps", p: ["1 quart suits a home user or very low-volume office. 2–9 gallon fits most clinics. 18–28 gallon is for high-volume or multi-provider sites. Pick a size they'll fill in weeks to months, not years — when unsure, start smaller."] },
      { h: "How it works", list: ["Drop sharps in at the point of use — never recap, bend or break needles.", "Stop at the <b>fill line</b> (about three-quarters full). Overfilled containers are the most common inspection finding.", "Close and lock the lid, apply the prepaid return label and hand it to the carrier.", "We destroy it by <b>autoclave sterilization</b>."] },
      { h: "The rules behind it", p: ["OSHA's Bloodborne Pathogens Standard (29 CFR 1910.1030) protects workers; DOT governs packaging and shipping; state medical-waste rules govern treatment. Sharps mail-back is legal in all 50 states."] },
      { h: "What the customer receives", p: ["Two documents: the <b>Certificate of Destruction</b> and the <b>Medical Waste Manifest</b>, which the law requires for regulated medical waste. The customer fills out nothing."], forms: ["cod-sharps", "rmw"] },
    ],
    remember: ["Fill line = about ¾ full.", "Chemo sharps go in Trace Chemo, not Sharps.", "Never a milk jug or coffee can.", "Destroyed by autoclave.", "Customer gets a COD + Medical Waste Manifest."],
  },
  {
    id: "biohazard", title: "Biohazard / regulated medical waste", kicker: "Chapter 3", image: "/images/products/biohazard.webp",
    summary: "Red-bag regulated medical waste — blood-soaked gauze, contaminated PPE, cultures — in a UN-rated box with a red liner.",
    sections: [
      { h: "What regulated medical waste is", p: [
        "Waste saturated or caked with blood or other potentially infectious material (OPIM): blood-soaked gauze and dressings, contaminated PPE, cultures, stocks and swabs.",
        "<b>The test:</b> would it drip or flake blood if squeezed? If not — say, a glove with a single dot of dried blood — it's usually regular trash.",
      ] },
      { h: "What goes in — and what never does", yes: ["Blood-soaked gauze and dressings", "Contaminated PPE and gloves", "Cultures, swabs and specimens", "Items soaked or caked with blood or OPIM"],
        no: ["Loose sharps → Sharps kit", "Medications → Pharmaceutical kit", "Trace chemo → Trace Chemo kit", "Pathological waste (tissue) — not accepted"] },
      { h: "Sizes and MSRP", skus: "biohazard" },
      { h: "How it works", list: ["Line the box with the red bag. The red bag alone is <b>not</b> a shipping container — it goes inside the rigid, UN-rated box.", "Stay below the fill line and keep sharps out.", "Seal, apply the prepaid label and ship.", "We destroy it by <b>autoclave sterilization</b>."] },
      { h: "The rules behind it", p: ["States are the main authority for regulated medical waste, and their rules vary. OSHA (Bloodborne Pathogens) and DOT apply too."] },
      { h: "What the customer receives", p: ["The <b>Certificate of Destruction</b> and the <b>Medical Waste Manifest</b> required by law. The customer fills out nothing."], forms: ["cod-biohazard", "rmw"] },
    ],
    remember: ["Drip-or-flake test.", "Red bag goes inside the rigid box.", "No sharps, no tissue.", "Destroyed by autoclave.", "Customer gets a COD + Medical Waste Manifest."],
  },
  {
    id: "pharma", title: "Pharmaceutical (non-controlled)", kicker: "Chapter 4", image: "/images/products/pharmaceutical.webp",
    summary: "Expired and unused regular medications — not controlled, not hazardous — destroyed by regulated incineration.",
    sections: [
      { h: "What non-hazardous pharmaceutical waste is", p: ["Medications that are neither DEA-controlled nor RCRA-hazardous: expired or unused prescription drugs, OTC drugs, samples, vitamins and supplements, compounding prep waste, and IV bags with no hazardous drug."] },
      { h: "What goes in — and what never does", yes: ["Expired non-controlled Rx", "OTC drugs and samples", "Unused or returned non-controlled medications", "Vitamins and supplements", "Compounding prep waste", "IV bags with no hazardous drug"],
        no: ["Controlled substances → Controlled Substance kit", "RCRA-hazardous drugs (P/U-listed, characteristic) → RCRA kit", "Trace chemo → Trace Chemo kit"] },
      { h: "Sizes and MSRP", skus: "pharma", callout: { label: "When in doubt", text: "If a customer isn't sure whether a drug is hazardous, treat it as hazardous and use the RCRA kit — or call us and we'll help classify it." } },
      { h: "How it works", list: ["Segregate non-controlled, non-hazardous drugs into the blue container.", "Seal and ship with the prepaid label.", "We destroy it by <b>regulated incineration</b>.", "Drug waste never goes down a drain or toilet."] },
      { h: "The rules behind it", p: ["EPA (no sewering of drug waste), the state Board of Pharmacy and state environmental rules."] },
      { h: "What the customer receives", p: ["A <b>Certificate of Destruction</b> listing the containers and their weights (individual drugs aren't itemized)."], forms: ["cod-pharmaceutical"] },
    ],
    remember: ["Blue container.", "Not controlled, not hazardous.", "Unsure if hazardous? Treat it as hazardous.", "Regulated incineration.", "COD lists containers by weight."],
  },
  {
    id: "medkits", title: "Medication Disposal Kits", kicker: "Chapter 5", image: "/images/products/medication-disposal.webp",
    summary: "Two kits for patients' medications: a mail-back mailer for take-back programs, and an on-site container that deactivates medications at the customer's location.",
    sections: [
      { h: "Mail-back: patient take-back", p: [
        "The Medication Disposal Mail-Back kit is a tamper-evident mailer for <b>patients' and consumers'</b> unused or expired medications — collected by a pharmacy, LTC facility, clinic or take-back program. Patients' controlled substances can be commingled with their other medications.",
        "It is <b>not</b> for a practice's own inventory. A pharmacy or clinic clearing its own expired controlled drugs needs the Controlled Substance kit, which carries the DEA transfer paperwork.",
      ], yes: ["Patients' unused or expired medications", "Pills, capsules, tablets, patches, creams", "Liquids in original containers", "Patients' controlled substances (commingled)"],
        no: ["A practice's own controlled inventory → Controlled Substance kit", "Sharps → Sharps kit", "Inhalers, aerosols, illicit drugs", "Chemo or hazardous drugs"] },
      { h: "Mail-back sizes and MSRP", skus: "medication" },
      { h: "On-site: deactivate at the customer's location", p: [
        "The On-Site kit is a deactivation container. Medications go in, the container is closed, and the compound inside renders them non-retrievable — right at the nursing station or pharmacy. <b>Nothing ships back</b>, so Easy Rx Cycle issues no Certificate of Destruction.",
        "The facility follows its own witnessing and logging procedures. When the containers are full, they come back to us for documented destruction in an <b>Activated Charcoal Take-Back kit</b>.",
      ] },
      { h: "On-site sizes and MSRP", skus: "medication-onsite" },
      { h: "The rules behind it", p: ["DEA take-back rules (21 CFR 1317, Secure and Responsible Drug Disposal Act) and Board of Pharmacy recordkeeping. Controlled substances destroyed on site must still be logged per the facility's DEA recordkeeping."] },
      { h: "What the customer receives", table: { head: ["Kit", "Documents"], rows: [["Mail-Back", "Certificate of Destruction (the mailer is listed by weight)"], ["On-Site", "None from Easy Rx Cycle — nothing ships back"]] }, forms: ["cod-medication"] },
    ],
    remember: ["Mail-back = patients' medications.", "A practice's own controls → Controlled kit.", "No inhalers or aerosols.", "On-Site: nothing ships back, no COD.", "Full on-site containers → Charcoal Take-Back kit."],
  },
  {
    id: "controlled", title: "Controlled substances", kicker: "Chapter 6", image: "/images/products/controlled.webp",
    summary: "DEA-compliant mail-back for Schedules I–V. The customer fills out one list — we handle the DEA forms and the witnessed destruction.",
    sections: [
      { h: "What controlled substances are", p: ["Drugs regulated by DEA under the Controlled Substances Act, grouped into five schedules by abuse potential. A registrant's own controlled inventory must be transferred with DEA paperwork and destroyed to a <b>non-retrievable</b> state."],
        table: { head: ["Schedule", "What it means", "Examples"], rows: [
          ["I", "No accepted medical use; high abuse potential", "Heroin, LSD, marijuana (federally)"],
          ["II", "Accepted medical use; high abuse potential", "Oxycodone, hydrocodone, fentanyl, morphine, Adderall"],
          ["III", "Moderate to low dependence potential", "Ketamine, testosterone and anabolic steroids, buprenorphine, Tylenol #3"],
          ["IV", "Low abuse potential", "Alprazolam, diazepam, lorazepam, tramadol, zolpidem"],
          ["V", "Lowest abuse potential", "Pregabalin, lacosamide, low-dose codeine cough preparations"],
        ] } },
      { h: "Who can buy it", callout: { label: "DEA registrants only", warn: true, text: "Pharmacies, hospitals, LTC and hospice, veterinary, dental (sedation), surgery centers, pain management and clinics. They need their DEA registration number, and we validate it when the kit comes back. Non-registrants collecting patients' medications use the Medication Disposal kits." } },
      { h: "What goes in — and what never does", yes: ["Expired controlled substances", "Schedule II narcotics", "Schedules III–V", "Unused and returned prescriptions", "Patient-returned controls (LTC/hospice)", "Overstock and recalls", "Partial or wasted doses"],
        no: ["RCRA-hazardous drugs → RCRA kit", "Chemo → Trace Chemo kit", "Pathological waste"] },
      { h: "Pricing: by weight (lbs) and NDC", skus: "controlled", p: ["Controlled destruction is priced by <b>weight in pounds</b> and the <b>NDCs</b> (drug line items) on the customer's Drug Inventory Manifest. Weigh what's going out and pick the tier that covers it. Over 100 lbs is a custom quote. Optional expedite: +$250 for rush shipping and priority destruction."] },
      { h: "How it works, step by step", table: { head: ["#", "Step"], rows: [
        ["1", "The customer gets the weight tier that covers what they're sending."],
        ["2", "They complete the <b>Drug Inventory Manifest</b>: company, DEA number and state, then each drug's name, strength, NDC and package size. About 2 minutes."],
        ["3", "They print it and put it in the box. Drugs go in the tamper-evident inner liner. Seal and ship with the prepaid label."],
        ["4", "The kit arrives at our facility and goes into secured, access-controlled storage."],
        ["5", "Every drug line is logged — schedule, count, weight — with the registrant and DEA number."],
        ["6", "A second person verifies. Transfer paperwork is prepared: Schedule I/II with an NDC → <b>DEA Form 222</b>; Schedules III–V → <b>3–5 Form</b>."],
        ["7", "Witnessed destruction by incineration to non-retrievable, with <b>two witnesses</b>."],
        ["8", "<b>DEA Form 41</b> and the <b>Certificate of Destruction</b> are completed and signed by hand."],
        ["9", "The documents are delivered to the customer."],
      ] }, callout: { label: "The selling line", text: "\"You fill out one list. We handle the 222, the 3–5 Form, the Form 41 and the destruction record.\"" } },
      { h: "Record keeping", p: ["Customers keep DEA records for at least <b>2 years</b> — longer if their state requires it. Flushing or drain disposal is never compliant."] },
      { h: "What the customer receives", p: ["The most complete document set we issue: the <b>Certificate of Destruction</b> (every drug itemized), the <b>DEA Form 222</b> when Schedule I/II drugs are present, the <b>3–5 Form</b> when Schedule III–V drugs are present, and <b>DEA Form 41</b>. Chapter 10 covers each form in detail."], forms: ["cod-controlled"] },
    ],
    remember: ["DEA registrants only.", "Customer fills out one list: the Drug Inventory Manifest.", "Priced by weight (lbs) and NDC; over 100 lbs = quote.", "Schedule I/II → 222; III–V → 3–5 Form; destruction → Form 41.", "Two witnesses; keep records 2+ years."],
  },
  {
    id: "chemo", title: "Trace chemotherapy", kicker: "Chapter 7", image: "/images/products/trace-chemo.webp",
    summary: "RCRA-empty chemotherapy waste — empty vials, tubing, gowns and gloves — in a yellow container, incinerated.",
    sections: [
      { h: "Trace vs. bulk", p: [
        "Trace chemo is waste that held or touched chemotherapy but is <b>RCRA-empty</b>: all contents removed by normal means, with only a trace left.",
        "An IV bag or vial with <b>visible drug remaining</b> is not RCRA-empty — that's bulk chemo, and it doesn't go in this kit. Have the customer contact us.",
      ] },
      { h: "What goes in — and what never does", yes: ["RCRA-empty chemo vials and syringes", "Trace-contaminated gowns, gloves and PPE", "IV bags and tubing with trace residue only", "Empty drug containers and prep materials", "Chemo-contaminated sharps"],
        no: ["Bulk or unused chemo (visible drug left) → contact us", "P-listed drug waste → RCRA kit", "Non-chemo sharps or regulated medical waste"] },
      { h: "Sizes and MSRP", skus: "chemo" },
      { h: "How it works", list: ["Segregate at the point of use into the <b>yellow</b> container.", "Seal the mailer and return it with the prepaid label.", "We destroy it by <b>incineration</b>."] },
      { h: "The rules behind it", p: ["USP &lt;800&gt; (hazardous drug handling), OSHA worker protection, EPA's \"RCRA-empty\" rule, DOT and state rules."] },
      { h: "What the customer receives", p: ["A <b>Certificate of Destruction</b> and the <b>Medical Waste Manifest</b>."], forms: ["cod-trace-chemo"] },
    ],
    remember: ["Yellow container.", "RCRA-empty only — visible drug = bulk.", "Chemo sharps go here.", "Incinerated.", "USP <800>."],
  },
  {
    id: "rcra", title: "Hazardous (RCRA)", kicker: "Chapter 8", image: "/images/products/rcra.webp",
    summary: "RCRA-hazardous pharmaceutical waste destroyed to EPA rules. No DEA registration needed.",
    sections: [
      { h: "What RCRA hazardous pharmaceutical waste is", p: ["Drugs EPA lists or characterizes as hazardous under RCRA:"], list: [
        "<b>P-listed</b> — acutely hazardous, e.g., nicotine (P075) and warfarin over 0.3%.",
        "<b>U-listed</b> — toxic, e.g., cyclophosphamide and mercury compounds.",
        "<b>Characteristic</b> — D001 ignitable, D002 corrosive, D003 reactive, D004–D043 toxic.",
      ] },
      { h: "What goes in — and what never does", yes: ["P-listed drugs (nicotine gum and patches, warfarin over 0.3%)", "U-listed drugs", "Ignitable, corrosive and toxic D-code wastes", "Empty P-listed containers that aren't RCRA-empty"],
        no: ["Non-hazardous drugs → Pharmaceutical kit", "Trace chemo → Trace Chemo kit", "Controlled substances → Controlled Substance kit"] },
      { h: "Sizes and MSRP", skus: "hazardous", callout: { label: "No DEA registration needed", text: "RCRA is an EPA program, not DEA. The RCRA kit orders like any other kit. If the facility has an EPA ID number, have it ready — it goes on the RCRA Form." } },
      { h: "How it works", list: ["Segregate into the <b>black</b> container using the enclosed P-list / U-list guidance.", "Seal and ship with the prepaid label.", "We destroy it by incineration at a permitted treatment, storage and disposal facility (<b>TSDF</b>)."] },
      { h: "The rules behind it", p: ["EPA RCRA (40 CFR 261), including the P and U lists. EPA's Subpart P (40 CFR 266) is an absolute ban on putting hazardous waste pharmaceuticals down any drain. DOT and state rules (often stricter) apply too."] },
      { h: "What the customer receives", p: ["A <b>Certificate of Destruction</b> and the <b>RCRA Form</b> — the Uniform Hazardous Waste Manifest (EPA Form 8700-22). Customers keep the manifest at least <b>3 years</b>."], forms: ["cod-rcra", "epa"] },
    ],
    remember: ["Black container.", "Nicotine is P-listed (P075).", "EPA, not DEA — no DEA registration.", "Never down a drain (Subpart P).", "COD + EPA Form 8700-22; keep 3 years."],
  },
  {
    id: "charcoal", title: "Activated Charcoal Take-Back", kicker: "Chapter 9", image: "/images/products/activated-charcoal.webp",
    summary: "Send back used activated-charcoal medication disposal containers — any brand, any size — for documented destruction. Priced by weight.",
    sections: [
      { h: "What it's for", p: ["Point-of-use deactivation containers fill up. This kit returns them — including our own Medication Disposal On-Site kits — for documented destruction as non-hazardous pharmaceutical waste."],
        yes: ["Used activated-charcoal disposal containers, any brand", "Any size: 16 oz, 64 oz, 1 gallon and larger", "As many containers as fit, up to the weight tier"], no: ["Loose medications → use the right mail-back kit", "Sharps or biohazard waste"] },
      { h: "Sizes and MSRP", skus: "charcoal", p: ["Weigh the filled containers and pick the tier. Over 50 lbs: order multiple kits or ask us for a freight quote."] },
      { h: "How it works", list: ["Pack the containers in the lined box.", "Fill out the enclosed <b>disposal manifest</b> listing what's being returned.", "Seal and ship with the prepaid label."] },
      { h: "What the customer receives", p: ["A <b>Certificate of Destruction</b> and a copy of their disposal manifest."], forms: ["cod-charcoal"] },
    ],
    remember: ["Any brand, any size.", "Priced by weight: 5, 25 or 50 lbs.", "Customer fills out the disposal manifest.", "COD + copy of the manifest."],
  },
  {
    id: "dea-forms", title: "DEA forms: 222, 3–5 Form & Form 41", kicker: "Chapter 10",
    summary: "The three DEA forms behind every controlled-substance kit — what each one is for, what's on it and who completes it.",
    sections: [
      { h: "Quick definitions", table: { head: ["Form", "What it is"], rows: [
        ["<b>DEA Form 222</b>", "The official DEA order form used to transfer Schedule I and II controlled substances."],
        ["<b>3–5 Form</b>", "The transfer form documenting Schedule III, IV and V drugs moving from the customer to Easy Rx Cycle."],
        ["<b>DEA Form 41</b>", "DEA's record of controlled substances destroyed — what, when, where, how, and the two witnesses."],
      ] } },
      { h: "The big picture", p: ["Every controlled kit moves drugs from the customer (a DEA registrant) to Easy Rx Cycle. Federal law requires that transfer to be documented — on the <b>DEA Form 222</b> for Schedules I and II, and on the <b>3–5 Form</b> for Schedules III–V. Then the destruction itself is recorded on <b>DEA Form 41</b>. The customer completes none of these: they fill out one list, the Drug Inventory Manifest, and we prepare the rest from it."] },
      { h: "DEA Form 222 — Schedule I & II", p: ["The official DEA order form required by federal law for every transfer of Schedule I and II drugs. Official 222s are issued by DEA to registrants; we print the transfer data onto the official form. The customer is listed as the <b>supplier</b>; Easy Rx Cycle receives the drugs."],
        list: ["Supplier (the customer): DEA registration number, name and address", "Each line: number of packages, package size, name of item and <b>NDC</b>", "Number shipped and date shipped; number received and date received", "Up to <b>20 lines</b> per form — 25 Schedule II items means two 222s", "Total number of lines completed"], forms: ["dea222"] },
      { h: "3–5 Form — Schedule III, IV & V", p: ["Our transfer form for Schedule III–V drugs — and for any Schedule I/II item that has no NDC. The customer is the <b>supplier</b>; <b>Arkansas Redistributors, LLC</b> — Easy Rx Cycle's legal name — is the <b>purchaser</b>."],
        list: ["Purchaser: Arkansas Redistributors, LLC (Easy Rx Cycle), with our DEA registration", "Supplier: the customer's DEA number, name and address", "Date ordered", "Up to 20 lines: number of packages, package size, name of item, number received, date received, NDC, number shipped, date shipped", "<b>Last line completed</b> — the number of the last line used (20 or less), which closes the form"], forms: ["form35"] },
      { h: "DEA Form 41 — the destruction record", p: ["The official DEA \"Registrant Record of Controlled Substances Destroyed.\" Easy Rx Cycle completes and keeps it as the destroying registrant; the customer can request a copy."],
        list: ["Registrant: Easy Rx Cycle's registered name, DEA number, address and contact", "Items destroyed: NDC, batch number, substance name, strength, form, package quantity and total destroyed", "Method, date and location of destruction", "<b>Two witnesses</b>, who sign by hand"], forms: ["dea41"] },
      { h: "Which forms come with a controlled kit", table: { head: ["The kit contains…", "Forms"], rows: [
        ["Only Schedule II drugs", "DEA Form 222 · DEA Form 41 · Certificate of Destruction"],
        ["Only Schedule III–V drugs", "3–5 Form · DEA Form 41 · Certificate of Destruction"],
        ["Schedule II and Schedule IV drugs", "DEA Form 222 · 3–5 Form · DEA Form 41 · Certificate of Destruction"],
      ] }, callout: { label: "Record keeping", text: "Customers keep their copies of DEA forms and Certificates for at least 2 years — longer where the state requires it." } },
    ],
    remember: ["222 = Schedule I/II; 3–5 Form = III–V (and I/II without an NDC).", "Customer = supplier; Easy Rx Cycle (Arkansas Redistributors) = purchaser.", "20 lines max per form.", "Form 41 = destruction record, two witnesses.", "We complete them all from the Drug Inventory Manifest."],
  },
  {
    id: "cod-manifests", title: "Certificates of Destruction, manifests & EPA forms", kicker: "Chapter 11",
    summary: "Every Certificate of Destruction, the Medical Waste Manifest and the RCRA Form — what's on each, which waste it goes with and who keeps it.",
    sections: [
      { h: "Quick definition", callout: { label: "What is a Certificate of Destruction (COD)?", text: "Easy Rx Cycle's document proving the customer's waste was destroyed — how, when and what. Every mail-back product gets one, and the customer keeps it for DEA, EPA, OSHA or state inspections." } },
      { h: "The Certificate of Destruction", p: ["Every mail-back product comes with a Certificate of Destruction (COD) — the customer's proof that the material was destroyed, how and when, and the document they hand an inspector. Every COD carries a <b>certificate number and issue date</b>, the facility, the destruction date, the destruction method, and a statement that the materials were rendered non-retrievable and destroyed under federal and state rules."],
        table: { head: ["", "Non-controlled streams", "Controlled substances"], rows: [
          ["Items listed", "Each container with its weight, plus a total", "Every drug: name, strength, NDC, form, quantity"],
          ["Extra fields", "—", "Client DEA number and the two witnesses"],
          ["Signatures", "Two electronic signatures (operator and CEO)", "Signed by hand"],
        ] } },
      { h: "Destruction method printed on each COD", table: { head: ["Stream", "Method"], rows: [
        ["Sharps · Biohazard", "Autoclave sterilization"], ["Non-controlled drugs · Medication kits · Trace chemo", "Regulated incineration"],
        ["RCRA hazardous", "Incineration at a permitted TSDF"], ["Controlled (I–V)", "Witnessed incineration to non-retrievable — DEA-registered"],
        ["Activated charcoal containers", "Regulated destruction"],
      ] }, forms: ["cod-sharps", "cod-biohazard", "cod-pharmaceutical", "cod-medication", "cod-rcra", "cod-controlled", "cod-trace-chemo", "cod-charcoal"] },
      { h: "Medical Waste Manifest — required by law", p: ["Tracks regulated medical waste from the customer (the <b>generator</b>) through transport, treatment and disposal. It comes with Sharps, Biohazard and Trace Chemo kits."],
        list: ["Manifest tracking number and date", "Generator: name, address, phone and generator ID if the state assigns one", "Waste description, number of containers, total weight and treatment method", "Generator certification: properly classified, packaged, marked and labeled", "Transporter, treatment facility and disposal facility — each with name, signature and date"], forms: ["rmw"] },
      { h: "RCRA Form — EPA Form 8700-22", p: ["The Uniform Hazardous Waste Manifest: EPA's cradle-to-grave tracking form for hazardous waste, following it from the generator (the customer) to the transporter to the permitted treatment, storage and disposal facility (<b>TSDF</b>). Customers keep it at least <b>3 years</b>."],
        list: ["Manifest tracking number and date", "Generator: name, mailing address, phone and <b>EPA ID number</b>", "Transporter and designated facility (TSDF): names and EPA ID numbers", "U.S. DOT description: proper shipping name, hazard class, UN number and packing group", "Number and type of containers, total quantity and <b>EPA waste codes</b> (e.g., P075, U058)", "Generator certification and the facility's certification of receipt"], forms: ["epa"] },
      { h: "Every product's documents at a glance", table: { head: ["Product", "Customer fills out", "Customer receives"], rows: [
        ["Sharps", "Nothing", "COD · Medical Waste Manifest"], ["Biohazard / RMW", "Nothing", "COD · Medical Waste Manifest"],
        ["Pharmaceutical", "Nothing", "COD"], ["Medication — Mail-Back", "Nothing", "COD"], ["Medication — On-Site", "Their own facility log", "None (nothing ships back)"],
        ["Controlled Substance", "Drug Inventory Manifest", "COD · DEA 222 (I/II) · 3–5 Form (III–V) · DEA Form 41"],
        ["Trace Chemo", "Nothing", "COD · Medical Waste Manifest"], ["Hazardous (RCRA)", "EPA ID number, if they have one", "COD · RCRA Form (EPA 8700-22)"],
        ["Activated Charcoal", "Disposal manifest (enclosed)", "COD · copy of their disposal manifest"],
      ] } },
    ],
    remember: ["Every mail-back product gets a COD.", "Controlled COD: drugs itemized, DEA number, two witnesses, hand-signed.", "Medical Waste Manifest: Sharps, Biohazard, Trace Chemo — required by law.", "EPA 8700-22: generator → transporter → TSDF; keep 3 years.", "On-Site kit: no documents."],
  },
  {
    id: "selling", title: "Ordering & selling", kicker: "Chapter 12",
    summary: "How you order, who to sell to, what to say, and how to answer the objections you'll hear.",
    sections: [
      { h: "How you order", table: { head: ["Step", "In your partner portal"], rows: [
        ["1. Log in", "Open your partner portal and choose <b>Place an Order</b>."],
        ["2. Pick kits", "Choose products and sizes and add bulk quantities."],
        ["3. Ship-to", "Your warehouse, saved on your account."],
        ["4. Pay", "Invoice, ACH or card. Invoice terms follow your account."],
        ["5. Track", "Confirmation and shipped emails (with tracking) go to you. Status lives in <b>Orders &amp; Tracking</b>."],
      ] }, list: ["Order by the case or the pallet. Everything ships to your warehouse, and every kit includes its prepaid return label.", "Good fast movers to stock: Sharps 1 qt and 2 gal, Pharmaceutical 2 gal, Controlled 5 lb, Medication On-Site 0.5 gal.", "Prices in this training are <b>MSRP</b>."] },
      { h: "Bring Easy Rx Cycle in when", list: ["The customer wants a <b>pickup</b>, has <b>multiple sites</b>, or has more than the largest kit holds.", "It's <b>law-enforcement or evidence</b> destruction, bulk chemo, or a waste stream you're not sure about.", "You need a custom quote: 501-904-2929 · sales@easyrxcycle.com."] },
      { h: "Starter bundles by customer type", table: { head: ["Customer", "Starter bundle"], rows: [
        ["Dental", "Sharps 1 qt or 2 gal · Pharmaceutical 2 gal · Controlled 5 lb (sedation) · Biohazard 2 gal (oral surgery)"],
        ["Veterinary", "Sharps 2 gal · Pharmaceutical 2 gal · Controlled 5 lb · Biohazard 2 gal"],
        ["Independent pharmacy", "Controlled 5–10 lb · Pharmaceutical 8 gal · RCRA 2 gal · Medication Mail-Back · Sharps 1 qt"],
        ["LTC, hospice & assisted living", "Medication On-Site · Activated Charcoal Take-Back · Controlled 5 lb · Sharps 2 gal"],
        ["Physician & urgent care", "Sharps 2–9 gal · Biohazard 8 gal · Pharmaceutical 2 gal"],
        ["Med spa, aesthetics & GLP-1", "Sharps 1 qt or 2 gal · Biohazard 2 gal · Pharmaceutical 2 gal"],
        ["Oncology & infusion", "Trace Chemo 8–18 gal · RCRA 8 gal · Sharps 9 gal"],
        ["Compounding pharmacy", "RCRA 2–8 gal · Trace Chemo 2 gal · Pharmaceutical 8 gal · Controlled 5–10 lb"],
      ] } },
      { h: "Five questions that find the right kits", list: ["What do you throw away today?", "Are you DEA-registered, and do you have expired controlled substances? → Controlled kit.", "Do you collect patients' unused medications? → Medication Mail-Back.", "How fast do you fill a container? → a size they'll fill in weeks to months.", "How many locations? → several sites or a pickup means bring us in."] },
      { h: "What customers say — and what you say", table: { head: ["They say", "You say"], rows: [
        ["\"We already use a big hauler.\"", "Keep them for what they do well. Mail-back fills the gaps — controlled substances, small volumes, extra locations — with no contract."],
        ["\"We use a reverse distributor.\"", "Keep them for credit-eligible stock. We destroy what doesn't qualify for credit, with a Certificate of Destruction."],
        ["\"We just flush it.\"", "Drug waste can't go down the drain, and controlled substances must be destroyed to DEA's non-retrievable standard with records."],
        ["\"Too expensive.\"", "One kit with a prepaid return label, destruction and documentation included. No monthly fees, route charges or contract."],
        ["\"We don't generate much.\"", "That's who mail-back is for. Pick a size they'll fill in a few months."],
        ["\"An inspector has never asked.\"", "DEA, EPA, OSHA and the state board can all ask. The Certificate of Destruction is ready when they do."],
      ] } },
      { h: "What reps ask us", table: { head: ["You ask", "The answer"], rows: [
        ["Am I liable for the waste?", "No. You sell an empty kit. The waste goes from your customer directly to Easy Rx Cycle, and the DEA transfer is between your customer and us."],
        ["How much should I stock?", "Start with the fast movers and reorder in bulk as they sell."],
        ["Who answers compliance questions?", "We do. Bring us into the call, or have your customer call 501-904-2929."],
        ["Can anyone buy the Controlled kit?", "No — DEA registrants only. Non-registrants collecting patients' medications use the Medication Disposal kits."],
      ] } },
      { h: "The 30-second pitch", callout: { label: "Say this", text: "\"How are you handling expired meds and sharps right now? We carry Easy Rx Cycle mail-back kits. You fill it, seal it and send it back with the prepaid label, and they destroy it and send you a Certificate of Destruction for your records. No pickups, no contract. For controlled substances they even complete the DEA forms — you just fill out one list. Want me to add a kit to your next order?\"" } },
    ],
    remember: ["Order in bulk in the portal; ships to your warehouse.", "MSRP only in this training.", "Bring us in for pickups, multi-site, law enforcement.", "Waste never passes through you.", "Controlled kits: DEA registrants only."],
  },
];

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
