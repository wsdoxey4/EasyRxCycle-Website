"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";

type St = { slug: string; name: string; region: string };

// Client-side search over a server-rendered list. Every link stays in the DOM
// (we only toggle a hidden class), so the directory is fully crawlable.
export default function StateFinder({ states }: { states: St[] }) {
  const [q, setQ] = useState("");
  const norm = q.trim().toLowerCase();
  const matches = norm ? states.filter((s) => s.name.toLowerCase().includes(norm)) : states;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (matches.length >= 1) {
      trackEvent("locations_search", { query: norm });
      window.location.href = `/locations/${matches[0].slug}/`;
    }
  }

  return (
    <div className="statefinder">
      <form className="sf-search" onSubmit={onSubmit} role="search">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="#8aa6ac" strokeWidth="2" /><path d="M20 20l-3.2-3.2" stroke="#8aa6ac" strokeWidth="2" strokeLinecap="round" /></svg>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find your state…"
          aria-label="Find your state"
          autoComplete="off"
        />
        {norm && <button type="submit" className="sf-go">Go →</button>}
      </form>

      <div className="statecols" style={{ marginTop: "20px" }}>
        {states.map((s) => {
          const hit = !norm || s.name.toLowerCase().includes(norm);
          return (
            <a
              key={s.slug}
              href={`/locations/${s.slug}/`}
              className={`statelink${hit ? "" : " sf-hide"}`}
            >
              {s.name}
            </a>
          );
        })}
      </div>
      {norm && matches.length === 0 && (
        <p className="lead" style={{ marginTop: "16px" }}>
          We serve all 50 states &mdash; try the full state name, or <a href="/get-a-quote" style={{ color: "var(--teal)", fontWeight: 600 }}>request a quote</a>.
        </p>
      )}
    </div>
  );
}
