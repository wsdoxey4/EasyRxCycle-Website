"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";

type Post = { slug: string; title: string; excerpt: string; cluster: string };
type Cluster = { key: string; label: string; pillar: string };

// Cornerstone guides surfaced in the "Start here" row (default view only).
const FEATURED = [
  "how-to-properly-destroy-controlled-drugs-dea-forms-222-41-and-cod-explained",
  "how-to-dispose-of-sharps-containers-a-complete-guide-by-state",
  "what-is-pharmaceutical-waste-management-a-complete-guide-for-the-southeast",
  "rcra-subpart-p-hazardous-pharmaceutical-waste",
];

// Filter chips + cluster-grouped sections. All posts render on the server for the
// default "all" view, so the full list + pillar links are in the crawlable HTML;
// the chips are progressive enhancement that filter client-side.
export default function BlogIndex({ clusters, posts }: { clusters: Cluster[]; posts: Post[] }) {
  const [sel, setSel] = useState("all");
  const shown = clusters.filter((c) => sel === "all" || c.key === sel);
  const label = (k: string) => clusters.find((c) => c.key === k)?.label || "Guide";
  const featured = FEATURED.map((s) => posts.find((p) => p.slug === s)).filter(Boolean) as Post[];

  return (
    <>
      {sel === "all" && featured.length > 0 && (
        <div className="blogfeatured">
          <div className="clusterhead"><h2>Start here</h2><span className="bf-sub">The cornerstone guides</span></div>
          <div className="bloglist">
            {featured.map((p) => (
              <a className="postcard postcard-feat" key={p.slug} href={`/blog/${p.slug}`}>
                <span className="cat">{label(p.cluster)}</span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="rm">Read guide →</span>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="blogfilter" role="tablist" aria-label="Filter guides by topic">
        <button className={`fchip${sel === "all" ? " is-on" : ""}`} onClick={() => setSel("all")} aria-pressed={sel === "all"}>
          All <span>{posts.length}</span>
        </button>
        {clusters.map((c) => {
          const n = posts.filter((p) => p.cluster === c.key).length;
          return (
            <button
              key={c.key}
              className={`fchip${sel === c.key ? " is-on" : ""}`}
              aria-pressed={sel === c.key}
              onClick={() => { setSel(c.key); trackEvent("blog_filter", { cluster: c.key }); }}
            >
              {c.label} <span>{n}</span>
            </button>
          );
        })}
      </div>

      {shown.map((c) => {
        const cp = posts.filter((p) => p.cluster === c.key);
        if (!cp.length) return null;
        return (
          <div className="cluster" key={c.key}>
            <div className="clusterhead">
              <h2>{c.label}</h2>
              <a href={c.pillar}>View the {c.label} pillar →</a>
            </div>
            <div className="bloglist">
              {cp.map((p) => (
                <a className="postcard" key={p.slug} href={`/blog/${p.slug}`}>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="rm">Read guide →</span>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
