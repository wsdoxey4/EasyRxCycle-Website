import { STATES } from "@/lib/geo";
import { INDUSTRIES, INDUSTRY_BY_SLUG, INDUSTRY_LIVE } from "@/lib/industryGeo";

/** On an industry page: links to that industry's page in every state. */
export function IndustryStateLinks({ slug }: { slug: string }) {
  const ind = INDUSTRY_BY_SLUG[slug];
  if (!ind) return null;
  return (
    <section className="sec" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
      <div className="wrap">
        <div className="shead"><span className="eyebrow">By state</span><h2>{ind.name} waste disposal in your state.</h2><p className="lead">State facility counts, rules and the right kit for each waste stream.</p></div>
        <div className="pills" style={{ marginTop: "22px" }}>
          {STATES.map((s) => (<a className="pill" key={s.slug} href={`/who-we-serve/${slug}/${s.slug}/`}>{s.name}</a>))}
        </div>
      </div>
    </section>
  );
}

/** On a state locations page: links to every released industry's page for that state. */
export function StateIndustryLinks({ stateSlug, stateName }: { stateSlug: string; stateName: string }) {
  const live = INDUSTRIES.filter((i) => INDUSTRY_LIVE.has(i.slug));
  if (!live.length) return null;
  return (
    <section className="sec" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
      <div className="wrap">
        <div className="shead"><span className="eyebrow">Industries</span><h2>Industries we serve in {stateName}.</h2></div>
        <div className="pills" style={{ marginTop: "22px" }}>
          {live.map((i) => (<a className="pill" key={i.slug} href={`/who-we-serve/${i.slug}/${stateSlug}/`}>{i.name} in {stateName}</a>))}
        </div>
      </div>
    </section>
  );
}
