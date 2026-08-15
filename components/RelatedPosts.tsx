import { relatedPosts, CLUSTER_LABEL, CLUSTER_PILLAR, CLUSTER_GUIDE, POST_BY_SLUG } from "@/lib/blogPosts";

/**
 * "Keep reading" related posts + a topical "solution band" that links the post into its
 * cluster's money pages (pillar service + free guide + quote) — flows topical authority
 * from the blog to the pages that convert. Server component.
 */
export default function RelatedPosts({ slug, heading = "Keep reading" }: { slug: string; heading?: string }) {
  const related = relatedPosts(slug, 3);
  const cluster = POST_BY_SLUG[slug]?.cluster;
  const pillar = cluster ? CLUSTER_PILLAR[cluster] : undefined;
  const label = cluster ? CLUSTER_LABEL[cluster] : undefined;
  const guide = cluster ? CLUSTER_GUIDE[cluster] : undefined;
  if (!related.length && !pillar) return null;
  return (
    <div className="related-posts">
      {pillar && label && (
        <div className="relband" style={{ marginBottom: "28px" }}>
          <a className="relband-primary" href={pillar}>
            See our <b>{label}</b> service <span className="ar">→</span>
          </a>
          <div className="relband-guides">
            <span className="relband-lbl">Go deeper</span>
            {guide && <a href={`/resources/${guide}`}>Free {label} guide</a>}
            <a href="/get-a-quote">Get a quote</a>
          </div>
        </div>
      )}
      {related.length > 0 && <>
      <h4>{heading}</h4>
      <div className="bloglist bloglist-related">
        {related.map((p) => (
          <a className="postcard" key={p.slug} href={`/blog/${p.slug}`}>
            <span className="cat">{CLUSTER_LABEL[p.cluster] || "Guide"}</span>
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
            <span className="rm">Read guide →</span>
          </a>
        ))}
      </div>
      </>}
    </div>
  );
}
