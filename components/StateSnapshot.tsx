import { TAKE_BACK_LAW, SHARPS_TRASH_BAN, ESTAB, type StateInfo } from "@/lib/geo";

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Per-state regulatory snapshot — real, cited facts that genuinely vary state to state
 * (agency, take-back law, sharps rule). This is the unique-content block that differentiates
 * otherwise-templated location pages. Facts sourced in lib/geo.ts.
 */
export default function StateSnapshot({ s, heading = true }: { s: StateInfo; heading?: boolean }) {
  const tb = TAKE_BACK_LAW[s.slug];
  const sharps = SHARPS_TRASH_BAN[s.slug];
  const e = ESTAB[s.slug];

  const rows: { k: string; v: string }[] = [
    { k: "Environmental regulator", v: s.agency ?? `${s.name} environmental agency` },
    { k: "Pharmacy oversight", v: `${s.name} Board of Pharmacy` },
    {
      k: "Statewide drug take-back law",
      v: tb
        ? `Yes — manufacturer-funded statewide program (enacted ${tb})`
        : "No statewide take-back law — disposal via mail-back kits, pharmacy kiosks & DEA collectors",
    },
    {
      k: "Home sharps in household trash",
      v:
        sharps === "ban"
          ? "Prohibited — must use a mail-back, drop-off, or approved disposal program"
          : sharps === "conditional"
          ? "Restricted where curbside sharps service exists — otherwise use an approved container or mail-back"
          : "Allowed only in an approved, puncture-resistant container, subject to local rules",
    },
  ];

  return (
    <div className="statesnap">
      {heading && <div className="statesnap-h">{s.name} at a glance</div>}
      <dl>
        {rows.map((r) => (
          <div className="statesnap-row" key={r.k}>
            <dt>{r.k}</dt>
            <dd>{r.v}</dd>
          </div>
        ))}
      </dl>
      {e && (
        <p className="statesnap-foot">
          <strong>{s.name} healthcare footprint:</strong> roughly {fmt(e.pharmacies)} pharmacies, {fmt(e.hospitals)} hospitals,{" "}
          {fmt(e.physicians)} physician offices, {fmt(e.dentists)} dental practices, {fmt(e.nursing)} nursing &amp; long-term-care
          facilities, and {fmt(e.vet)} veterinary clinics — every one a generator of regulated waste we serve.{" "}
          <span className="statesnap-src">Source: U.S. Census County Business Patterns, 2022.</span>
        </p>
      )}
      <p className="statesnap-note">
        Federal rules (OSHA 29 CFR 1910.1030, DOT 49 CFR, EPA RCRA, DEA 21 CFR 1317) apply in {s.name} on top of the above.
      </p>
    </div>
  );
}
