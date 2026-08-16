"use client";
import { useState, useMemo } from "react";

// Curated from EPA RCRA lists (40 CFR 261.33 P/U; 261.21–.24 characteristics). Well-established
// pharmaceutical entries only. NOT exhaustive — always verify against the current CFR and the
// product's SDS, since salt form, concentration, and formulation change the classification.
type Kind = "P" | "U" | "D";
type Drug = { name: string; code: string; kind: Kind; note: string; alt?: string[] };
const DRUGS: Drug[] = [
  { name: "Warfarin", code: "P001", kind: "P", note: "At or above 0.3% — acute hazardous. Below 0.3% it is U248.", alt: ["coumadin", "jantoven"] },
  { name: "Warfarin (below 0.3%)", code: "U248", kind: "U", note: "Below 0.3%. At or above 0.3% it is P001." },
  { name: "Nicotine", code: "P075", kind: "P", note: "Nicotine and salts. Note: OTC nicotine-replacement therapy has an EPA exemption under Subpart P.", alt: ["nicotrol", "nicoderm", "nrt"] },
  { name: "Physostigmine", code: "P204", kind: "P", note: "Acute hazardous." },
  { name: "Physostigmine salicylate", code: "P188", kind: "P", note: "Acute hazardous." },
  { name: "Epinephrine (base)", code: "P042", kind: "P", note: "The base is P042; EPA has clarified epinephrine SALTS are generally NOT P042.", alt: ["adrenaline"] },
  { name: "Arsenic trioxide", code: "P012", kind: "P", note: "Certain oncology use (e.g., Trisenox).", alt: ["trisenox"] },
  { name: "Cyclophosphamide", code: "U058", kind: "U", note: "Antineoplastic (chemo).", alt: ["cytoxan"] },
  { name: "Chlorambucil", code: "U035", kind: "U", note: "Antineoplastic (chemo).", alt: ["leukeran"] },
  { name: "Melphalan", code: "U150", kind: "U", note: "Antineoplastic (chemo).", alt: ["alkeran"] },
  { name: "Daunomycin (daunorubicin)", code: "U059", kind: "U", note: "Antineoplastic (chemo)." },
  { name: "Mitomycin C", code: "U010", kind: "U", note: "Antineoplastic (chemo).", alt: ["mutamycin"] },
  { name: "Streptozotocin", code: "U206", kind: "U", note: "Antineoplastic (chemo).", alt: ["zanosar"] },
  { name: "Uracil mustard", code: "U237", kind: "U", note: "Antineoplastic (chemo)." },
  { name: "Mercury", code: "U151", kind: "U", note: "Elemental mercury; relevant to some products and thimerosal-related waste streams." },
  { name: "Lindane", code: "U129", kind: "U", note: "Antiparasitic (scabicide/pediculicide).", alt: ["kwell"] },
  { name: "Selenium sulfide", code: "U205", kind: "U", note: "Certain dermatologic products above OTC strength.", alt: ["selsun"] },
  { name: "Reserpine", code: "U200", kind: "U", note: "Antihypertensive." },
  { name: "Paraldehyde", code: "U182", kind: "U", note: "Sedative/anticonvulsant." },
  { name: "Chloral hydrate", code: "U034", kind: "U", note: "Sedative/hypnotic." },
  { name: "Hexachlorophene", code: "U132", kind: "U", note: "Antiseptic.", alt: ["phisohex"] },
  { name: "Formaldehyde", code: "U122", kind: "U", note: "Fixative/disinfectant; also relevant to pathology and funeral-home waste." },
  { name: "Trichloromonofluoromethane", code: "U121", kind: "U", note: "Propellant in some older inhalers." },
  { name: "Ignitable drugs (high alcohol, aerosols)", code: "D001", kind: "D", note: "Characteristic: ignitable — e.g., alcohol-based elixirs/tinctures and aerosol products (flashpoint < 60°C)." },
  { name: "Corrosive products", code: "D002", kind: "D", note: "Characteristic: corrosive — pH ≤ 2 or ≥ 12.5 (certain compounding chemicals)." },
  { name: "Silver (some products)", code: "D011", kind: "D", note: "Characteristic: toxicity — certain silver-containing products above the TCLP limit.", alt: ["silver nitrate"] },
  { name: "Barium (some contrast)", code: "D005", kind: "D", note: "Characteristic: toxicity — certain barium products above the TCLP limit." },
  { name: "m-Cresol / cresol", code: "U052", kind: "U", note: "Preservative in some injectables." },
];

const KLABEL: Record<Kind, string> = { P: "P-listed · acute hazardous", U: "U-listed · toxic", D: "Characteristic (D-code)" };
const KCLR: Record<Kind, string> = { P: "#b3261e", U: "#8a5a00", D: "#005770" };

export default function PUListLookup() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DRUGS;
    return DRUGS.filter((d) =>
      d.name.toLowerCase().includes(s) ||
      d.code.toLowerCase().includes(s) ||
      (d.alt || []).some((a) => a.includes(s))
    );
  }, [q]);

  return (
    <div className="wiz">
      <label htmlFor="pu-search" className="wiz-step" style={{ display: "block", marginBottom: 8 }}>Search a drug or code</label>
      <input
        id="pu-search"
        className="pu-input"
        type="search"
        placeholder="e.g. warfarin, nicotine, cyclophosphamide, P001…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoComplete="off"
      />
      <p className="wiz-help" style={{ marginTop: 10 }}>
        {results.length} {results.length === 1 ? "match" : "matches"}. Brand names are searchable where common.
      </p>

      <div className="pu-results">
        {results.length === 0 ? (
          <div className="pu-empty">
            No match in this reference set — that does <strong>not</strong> mean the drug is non-hazardous. Many
            drugs are hazardous by characteristic (ignitability, toxicity) without being listed. Check the SDS,
            or <a href="/get-a-quote">ask our team</a>.
          </div>
        ) : results.map((d) => (
          <div key={d.name} className="pu-row">
            <div className="pu-row-head">
              <span className="pu-name">{d.name}</span>
              <span className="pu-code" style={{ background: KCLR[d.kind] }}>{d.code}</span>
            </div>
            <div className="pu-kind" style={{ color: KCLR[d.kind] }}>{KLABEL[d.kind]}</div>
            <div className="pu-note">{d.note}</div>
          </div>
        ))}
      </div>

      <p className="wiz-disclaimer">
        Curated from EPA&rsquo;s P/U lists (40 CFR 261.33) and characteristic criteria — <strong>not exhaustive</strong>.
        Salt form, concentration, and formulation change the classification, so always verify against the current CFR
        and the product&rsquo;s SDS. For the full picture, read the{" "}
        <a href="/blog/rcra-p-list-u-list-pharmaceuticals">P/U-list guide</a> or download the{" "}
        <a href="/downloads/rcra-p-u-list-pharmaceuticals.pdf" download>reference PDF</a>.
      </p>
    </div>
  );
}
