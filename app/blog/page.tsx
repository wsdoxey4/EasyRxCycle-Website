import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogIndex from "@/components/BlogIndex";
import { clusters, posts } from "@/lib/blogPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog";
const TITLE = "Blog — Compliance Guides for Pharmaceutical & Medical Waste";
const DESC =
  "Practical guides on controlled substance destruction, reverse distribution, sharps and medical waste disposal, DEA forms, and staying audit-ready — from the Easy Rx Cycle team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${abs(PATH)}#blog`,
  name: `${SITE.name} Blog`,
  url: abs(PATH),
  publisher: { "@id": `${SITE.url}/#organization` },
  blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: abs(`/blog/${p.slug}`) })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "clamp(40px,6vw,64px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Blog" }]} />
            <span className="eyebrow">Compliance guides</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Guides for handling regulated <span style={{ color: "var(--teal)" }}>pharmaceutical &amp; medical waste.</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "64ch" }}>
              Plain-English guides on controlled substance destruction, reverse distribution, sharps and medical waste,
              DEA forms, and staying audit-ready — written for the people who actually handle this every day.
            </p>
            <BlogIndex clusters={clusters} posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
