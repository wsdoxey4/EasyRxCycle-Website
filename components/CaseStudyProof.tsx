import { CASE_BY_ICP, CASE_BY_SOLUTION } from "@/lib/caseStudies";

/**
 * Rich proof card for who-we-serve (ICP) and our-solutions pages.
 * Pass `icp` (ICP page) or `solution` (solution page) — it looks up the
 * matching case study and renders an eyebrow, headline, three metric
 * tiles, and a link to the full story. Renders nothing if none matches.
 */
export default function CaseStudyProof({ icp, solution }: { icp?: string; solution?: string }) {
  const c = icp ? CASE_BY_ICP[icp] : solution ? CASE_BY_SOLUTION[solution] : undefined;
  if (!c) return null;
  const label = `${c.industry}${c.region ? ` · ${c.region}` : ""}`;
  return (
    <section className="sec csproof-sec">
      <div className="wrap">
        <a className="csproof" href={`/case-studies/${c.slug}`} aria-label={`Read the ${c.industry} case study`}>
          <div className="csproof-head">
            <span className="csproof-eyebrow">Proof · case study</span>
            <span className="csproof-label">{label}</span>
          </div>
          <p className="csproof-title">{c.tag}</p>
          <div className="csproof-metrics">
            {c.metrics.map((m) => (
              <div className="csproof-metric" key={m.label}>
                <span className="csproof-value">{m.value}</span>
                <span className="csproof-mlabel">{m.label}</span>
              </div>
            ))}
          </div>
          <span className="csproof-rm">Read the full story <span aria-hidden="true">→</span></span>
        </a>
      </div>
    </section>
  );
}
