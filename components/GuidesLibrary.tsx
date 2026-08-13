"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";
import { CAT_LABEL, industrySegments, type LibGuide } from "@/lib/guidesLibrary";

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All guides" },
  { key: "stream", label: "By waste stream" },
  { key: "industry", label: "By industry" },
  { key: "reference", label: "References & tools" },
];

type Section = { key: string; label: string; guides: LibGuide[] };

function Card({ g }: { g: LibGuide }) {
  return (
    <a className="gcard" href={`/resources/${g.slug}`}>
      <span className={`gcard-cover${g.cover ? "" : " is-blank"}`}>
        {g.cover ? <img src={g.cover} alt="" loading="lazy" /> : <span className="gcard-mark">ERC</span>}
        <span className="gcard-cat">{CAT_LABEL[g.cat]}</span>
      </span>
      <span className="gcard-body">
        <h3>{g.title}</h3>
        <span className="gcard-rm">Get the guide →</span>
      </span>
    </a>
  );
}

export default function GuidesLibrary({ guides, counts }: { guides: LibGuide[]; counts: Record<string, number> }) {
  const [sel, setSel] = useState("all");

  // Build the ordered list of sections to show for the current filter.
  const streams = guides.filter((g) => g.cat === "stream");
  const refs = guides.filter((g) => g.cat === "reference");
  const industrySection = (): Section[] =>
    industrySegments
      .map((s) => ({ key: `seg-${s.key}`, label: s.label, guides: guides.filter((g) => g.cat === "industry" && g.seg === s.key) }))
      .filter((sec) => sec.guides.length > 0);

  let sections: Section[] = [];
  if (sel === "all") {
    sections = [{ key: "streams", label: "By waste stream", guides: streams }, ...industrySection(), { key: "refs", label: CAT_LABEL.reference, guides: refs }];
  } else if (sel === "stream") {
    sections = [{ key: "streams", label: "By waste stream", guides: streams }];
  } else if (sel === "industry") {
    sections = industrySection();
  } else {
    sections = [{ key: "refs", label: CAT_LABEL.reference, guides: refs }];
  }

  return (
    <>
      <div className="blogfilter" role="tablist" aria-label="Filter guides">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`fchip${sel === f.key ? " is-on" : ""}`}
            aria-pressed={sel === f.key}
            onClick={() => { setSel(f.key); if (f.key !== "all") trackEvent("guide_filter", { cat: f.key }); }}
          >
            {f.label} <span>{counts[f.key] ?? 0}</span>
          </button>
        ))}
      </div>

      {sections.map((sec) => (
        <section className="glib-group" key={sec.key}>
          <h2 className="glib-h">{sec.label} <span className="n">{sec.guides.length}</span></h2>
          <div className="glib">
            {sec.guides.map((g) => <Card key={g.slug} g={g} />)}
          </div>
        </section>
      ))}
    </>
  );
}
