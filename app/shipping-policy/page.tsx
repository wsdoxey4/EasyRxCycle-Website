import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { SITE, abs } from "@/lib/site";

const PATH = "/shipping-policy";
const TITLE = "Shipping Policy";
const DESC = "How Easy Rx Cycle ships mail-back kits — processing times, carriers, free shipping over $50, prepaid return labels, and expedited options.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <PolicyPage title="Shipping Policy" updated="August 2026" intro="Every Easy Rx Cycle mail-back kit ships prepaid both ways from our Little Rock, Arkansas facility. Here's how and when your order arrives.">
      <h2>Order processing</h2>
      <p>Orders placed before 2:00pm CT on a business day are typically processed the same day; orders placed after that or on weekends and holidays are processed the next business day. You&rsquo;ll receive tracking by email once your kit ships.</p>

      <h2>Shipping rates</h2>
      <ul>
        <li><strong>Free shipping</strong> on orders over $50.</li>
        <li><strong>$9.95 flat</strong> shipping on orders under $50.</li>
        <li><strong>Expedited (3-day)</strong> service is available on eligible kits for an additional $250.</li>
      </ul>

      <h2>Prepaid return shipping is included</h2>
      <p>Mail-back kits include a prepaid, DOT-compliant return label. When your kit is full, seal it and drop it with the carrier — return shipping to our permitted destruction facility is already paid. There is nothing more to buy to send your waste back.</p>

      <h2>Carriers &amp; coverage</h2>
      <p>We ship nationwide to all 50 states and Washington, D.C. via USPS and UPS, depending on the kit and destination. Mail-back returns travel under the carrier and service required for the waste stream (for example, USPS Ground Advantage Returns for sharps).</p>

      <h2>Delivery times</h2>
      <p>Standard delivery is typically 2–6 business days after processing, depending on your location. Transit times are estimates provided by the carrier and are not guaranteed. Remote areas (including parts of AK and HI) may take longer.</p>

      <h2>How compliant mail-back shipping works</h2>
      <p>A mail-back kit is a self-contained way to ship regulated waste for destruction without a scheduled truck. Each kit is built to move your specific stream through the mail or parcel network under the packaging, marking, and labeling rules that apply to it. When you order, the kit arrives with everything needed to fill, seal, and return it — including the prepaid return label — so there is no separate paperwork to arrange and no shipping account of your own required.</p>

      <h2>DOT-compliant packaging for regulated medical waste</h2>
      <p>Regulated medical waste shipped by mail-back travels as a UN3291 shipment under U.S. DOT hazardous materials rules (49 CFR). That is why the kit matters: the inner liner, absorbent, rigid container, and outer box are a tested combination, and the return label and markings are already applied. Your job is to pack only the stream the kit is rated for, stay within the fill line and weight limit printed on the box, and close it exactly as the enclosed instructions describe. Sharps go into an approved sharps container first; do not overfill, and do not add loose liquids beyond what the kit is designed to absorb.</p>

      <h2>What ships by mail-back vs. what needs scheduled pickup</h2>
      <p>Mail-back is the right fit for lower, steady volumes — sharps, pharmaceutical waste, and similar streams a single site accumulates over weeks or months. Higher volumes, bulk chemotherapy or trace-chemo waste, large quantities of controlled substances, and multi-site programs are usually better served by a scheduled pickup or route service sized to the facility. If you are unsure which model fits, a quote will point you to the lower-cost option for your actual volume. Easy Rx Cycle handles all eight waste streams either way.</p>

      <h2>Tracking, transit, and your Certificate of Destruction</h2>
      <p>Every outbound kit and every return shipment is tracked; you receive the outbound tracking by email when the kit ships, and the prepaid return label carries its own tracking number so you can confirm the carrier received it. Once your sealed kit reaches our permitted destruction facility, it is logged, processed, and destroyed — and a Certificate of Destruction is issued for that shipment, every time, as your compliance record. Keep the return tracking and the certificate together for your files.</p>

      <h2>Questions</h2>
      <p>Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a> and we&rsquo;ll help with any shipping question.</p>
    </PolicyPage>
  );
}
