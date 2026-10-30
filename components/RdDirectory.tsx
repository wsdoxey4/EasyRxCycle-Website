"use client";
import { useMemo, useState } from "react";
import { RD_COMPANIES, RD_KIND_LABEL, RD_LATEST, RD_LISTS, type RdKind } from "@/lib/rdDirectory";

const KINDS = Object.keys(RD_KIND_LABEL) as RdKind[];
const STATES = [...new Set(RD_COMPANIES.flatMap((c) => c.states))].sort();
const ym = (s: string) => new Date(s + "-15T12:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export default function RdDirectory() {
  const [q, setQ] = useState("");
  const [st, setSt] = useState("");
  const [kind, setKind] = useState<RdKind | "">("");
  const [all, setAll] = useState(false);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return RD_COMPANIES
      .filter((c) => all || c.onLatest)
      .filter((c) => !st || c.states.includes(st))
      .filter((c) => !kind || c.kind === kind)
      .filter((c) => !s || [c.name, ...(c.formerNames || []), c.hq].some((v) => v.toLowerCase().includes(s)));
  }, [q, st, kind, all]);
  const dropped = RD_COMPANIES.filter((c) => !c.onLatest).length;

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <input className="pu-input" type="search" aria-label="Search the directory" placeholder="Search by company or city" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" style={{ flex: "1 1 240px", minWidth: 0 }} />
        <select className="pu-input" aria-label="Filter by state" value={st} onChange={(e) => setSt(e.target.value)} style={{ flex: "1 1 140px", minWidth: 0, maxWidth: "100%" }}>
          <option value="">All states</option>
          {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="pu-input" aria-label="Filter by type" value={kind} onChange={(e) => setKind(e.target.value as RdKind | "")} style={{ flex: "1 1 220px", minWidth: 0, maxWidth: "100%" }}>
          <option value="">All types</option>
          {KINDS.map((k) => <option key={k} value={k}>{RD_KIND_LABEL[k]}</option>)}
        </select>
      </div>
      <label style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: "var(--slate)", marginTop: "10px" }}>
        <input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} /> Also show the {dropped} registrants on older DEA lists that are not on the {ym(RD_LATEST)} list
      </label>
      <p style={{ color: "var(--slate)", fontSize: "14px", margin: "8px 0 0" }}>Showing {rows.length} of {RD_COMPANIES.length}</p>

      <div style={{ overflowX: "auto", marginTop: "12px" }}>
        <table className="ctable">
          <thead>
            <tr><th>Registrant (as listed by DEA)</th><th>City</th><th>Registered in</th><th>Type</th><th>On latest list</th><th style={{ whiteSpace: "nowrap" }}>DEA list history</th></tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.name}>
                <th scope="row" style={{ fontWeight: 600 }}>
                  {c.website ? <a href={c.website} target="_blank" rel="noopener nofollow" style={{ color: "var(--teal)" }}>{c.name}</a> : c.name}
                  {c.formerNames?.length ? <div style={{ fontSize: "12.5px", color: "var(--slate)", fontWeight: 400 }}>also listed as {c.formerNames.join("; ")}</div> : null}
                  {c.collector ? <div style={{ fontSize: "12.5px", color: "var(--slate)", fontWeight: 400 }}>Also noted as an authorized collector</div> : null}
                </th>
                <td>{c.hq || "—"}</td>
                <td>{c.states.join(", ")}</td>
                <td style={{ fontSize: "14px" }}>{RD_KIND_LABEL[c.kind]}</td>
                <td>{c.onLatest ? "Yes" : <span style={{ color: "var(--slate)" }}>No</span>}</td>
                <td style={{ fontSize: "13.5px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{c.lists.length === 1 ? ym(c.lists[0]) : `${ym(c.lists[c.lists.length - 1])} – ${ym(c.lists[0])}`}<div style={{ color: "var(--slate)" }}>{c.lists.length} of {RD_LISTS.length} copies</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
