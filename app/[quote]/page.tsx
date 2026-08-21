import type { Metadata } from "next";
import { notFound } from "next/navigation";
import quotes from "@/lib/quotes.json";

type Q = { slug: string; id: string; title: string; company: string; amount: string; status: string };
const QUOTES = quotes as Q[];

// One static page per recovered HubSpot quote slug. Real named routes (pricing, shop, blog…)
// take precedence, so these only catch the random quote codes — nothing steps on the site.
export function generateStaticParams() {
  return QUOTES.map((q) => ({ quote: q.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ quote: string }> }): Promise<Metadata> {
  const { quote } = await params;
  const q = QUOTES.find((x) => x.slug === quote);
  return { title: q ? "Your quote — Easy Rx Cycle" : "Quote — Easy Rx Cycle", robots: { index: false, follow: false } };
}

export default async function QuotePage({ params }: { params: Promise<{ quote: string }> }) {
  const { quote } = await params;
  const q = QUOTES.find((x) => x.slug === quote);
  if (!q) notFound();
  const money = q.amount ? "$" + Number(q.amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "";
  const pdf = `/quotes/${q.id}.pdf`;
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px 60px" }}>
      <div style={{ fontFamily: "Poppins, system-ui, sans-serif", fontWeight: 700, color: "#005770", fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Easy Rx Cycle · Your Quote</div>
      <h1 style={{ fontFamily: "Poppins, system-ui, sans-serif", fontSize: "clamp(22px,3vw,30px)", color: "#123A44", margin: "0 0 6px" }}>{q.company || q.title || "Your quote"}</h1>
      {money && <div style={{ fontSize: 18, color: "#123A44", fontWeight: 600, marginBottom: 4 }}>Total: {money}</div>}
      <p style={{ color: "#55646B", margin: "0 0 18px", fontSize: 14, lineHeight: 1.55 }}>Your quote for regulated-waste destruction is below. Download it for your records, or reply to your original email to move forward. Questions? Call <b>(501)&nbsp;904-2929</b>.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
        <a href={pdf} download style={{ background: "#33C089", color: "#0b2b34", fontWeight: 700, padding: "12px 22px", borderRadius: 10, textDecoration: "none" }}>Download your quote (PDF)</a>
        <a href="/get-a-quote/" style={{ border: "1px solid #d5e0de", color: "#123A44", fontWeight: 600, padding: "12px 22px", borderRadius: 10, textDecoration: "none" }}>Request an updated quote</a>
      </div>
      <div style={{ border: "1px solid #e4edeb", borderRadius: 14, overflow: "hidden", boxShadow: "0 16px 34px -30px rgba(18,58,68,.5)" }}>
        <iframe src={pdf} title="Your quote" style={{ width: "100%", height: "80vh", border: "0", display: "block" }} />
      </div>
      <p style={{ color: "#8aa0a8", fontSize: 12.5, marginTop: 14 }}>Easy Rx Cycle · Arkansas Redistributors, LLC · DEA-registered destruction · easyrxcycle.com</p>
    </main>
  );
}
