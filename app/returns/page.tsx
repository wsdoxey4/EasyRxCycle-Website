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
    </PolicyPage>
  );
}
