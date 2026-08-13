import { relatedPosts, CLUSTER_LABEL } from "@/lib/blogPosts";

/**
 * "Keep reading" — real related blog posts (same cluster first), rendered as
 * proper blog cards that match the /blog index (.postcard). Server component.
 */
export default function RelatedPosts({ slug, heading = "Keep reading" }: { slug: string; heading?: string }) {
  const related = relatedPosts(slug, 3);
  if (!related.length) return null;
  return (
    <div className="related-posts">
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
    </div>
  );
}
