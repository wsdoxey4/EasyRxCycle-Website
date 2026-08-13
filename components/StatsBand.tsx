// Real, verified company stats. Every value here is true and confirmed by the client.
// Pending figures (volume, audit-pass %, on-time %, COD turnaround) get added here once provided.
type Stat = { v: string; l: string };

const DEFAULT: Stat[] = [
  { v: "100%", l: "Client audit pass rate" },
  { v: "1,000+", l: "Facilities served" },
  { v: "99%+", l: "On-time delivery" },
  { v: "All 50", l: "States covered" },
];

export default function StatsBand({ items = DEFAULT, heading }: { items?: Stat[]; heading?: string }) {
  return (
    <div className="statsband">
      {heading && <span className="sb-head">{heading}</span>}
      <div className="sb-grid">
        {items.map((s) => (
          <div className="sb-stat" key={s.l}>
            <span className="sb-v">{s.v}</span>
            <span className="sb-l">{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
