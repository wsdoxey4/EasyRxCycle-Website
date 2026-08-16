import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { SITE, abs } from "@/lib/site";

const PATH = "/returns";
const TITLE = "Return & Refund Policy";
const DESC = "Easy Rx Cycle return and refund policy for mail-back disposal kits — unused kit returns, refund timelines, and how to request one.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <PolicyPage title="Return & Refund Policy" updated="August 2026" intro="We want you to order with confidence. Here's how returns and refunds work on Easy Rx Cycle mail-back kits.">
      <h2>Unused kits</h2>
      <p>If you haven&rsquo;t used a kit, you may return it for a refund within <strong>30 days</strong> of delivery. The kit must be unused, uncontaminated, and in its original condition and packaging. To start a return, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your order number and we&rsquo;ll provide instructions. Return shipping on unused kits is the customer&rsquo;s responsibility unless the return is due to our error.</p>

      <h2>Used or filled kits</h2>
      <p>For safety and regulatory reasons, a kit that has been used, filled, or contaminated with waste <strong>cannot be returned or refunded</strong>. Once waste has entered a container, it must be processed for compliant destruction — this is a regulatory requirement, not a company preference.</p>

      <h2>Damaged or incorrect orders</h2>
      <p>If your kit arrives damaged, or you received the wrong item, contact us within 7 days of delivery and we&rsquo;ll replace it or refund it at no cost to you, including shipping.</p>

      <h2>Restricted &amp; regulated kits</h2>
      <p>Controlled-substance, RCRA-hazardous, and chemotherapy kits are governed by DEA and EPA regulations. Returns of these items are handled case by case in line with those rules — contact us before returning any regulated kit.</p>

      <h2>Refunds</h2>
      <p>Approved refunds are issued to your original payment method within 5–10 business days after we receive and inspect the returned item. You&rsquo;ll get an email confirmation when your refund is processed.</p>

      <h2>How to request a return</h2>
      <p>Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a> with your order number, and we&rsquo;ll take it from there.</p>

      <h2>A mail-back kit is not a typical product return</h2>
      <p>It helps to think about our kits in two stages. Before a kit is used, it is an ordinary product &mdash; if it&rsquo;s unopened and in original condition, the 30-day return above applies just like any e-commerce purchase. Once you place waste inside, the kit stops being a returnable product and becomes regulated waste headed for destruction. At that point the goal is no longer a refund; it&rsquo;s compliant processing and a clean paper trail. That is why a filled kit can&rsquo;t come back to inventory: once waste enters a container, it has to be destroyed under the applicable DEA, EPA, and DOT rules rather than restocked or resold.</p>

      <h2>What &ldquo;returning&rdquo; a used kit actually means</h2>
      <p>When you send a filled kit back, you are not returning a product for credit &mdash; you are shipping waste to our permitted facility for destruction using the prepaid label included with the kit. Mail-back sharps and pharmaceutical shipments travel under DOT packaging rules for regulated medical waste (UN3291), so please seal and pack the kit exactly as the enclosed instructions describe. Controlled-substance kits follow DEA chain-of-custody handling under 21 CFR part 1317. Sending the kit is what triggers destruction; it is a separate process from the refund path for unused kits.</p>

      <h2>Your documentation and proof of destruction</h2>
      <p>The most important thing you receive is not a refund &mdash; it&rsquo;s evidence the waste was destroyed. Every completed destruction generates a Certificate of Destruction tied to your order, which is what you keep for your compliance records and audit trail. If you need a copy re-sent, or you&rsquo;re missing documentation for an order, email us with your order number and we&rsquo;ll get it to you. Keep these certificates with your other regulated-waste records.</p>

      <h2>If a kit arrives damaged</h2>
      <p>Inspect your kit when it arrives. If the outer packaging is crushed, a container is cracked, or the prepaid label or instructions are missing, do not use the kit &mdash; contact us within 7 days and we&rsquo;ll send a replacement at no cost, including shipping. Never place waste into a compromised container, and never improvise packaging for a return; using the intact, provided kit is what keeps the shipment compliant with DOT requirements and keeps you protected.</p>
    </PolicyPage>
  );
}
