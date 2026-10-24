import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { SITE, abs } from "@/lib/site";

const PATH = "/terms";
const TITLE = "Terms of Service";
const DESC = "The terms governing use of the Easy Rx Cycle website, orders, and mail-back disposal services.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <PolicyPage title="Terms of Service" updated="October 2026" intro={`These terms govern your use of the ${SITE.name} website and services, operated by ${SITE.legalName} (DBA ${SITE.name}).`}>
      <h2>1. Acceptance</h2>
      <p>By accessing this site or placing an order, you agree to these Terms of Service. If you do not agree, please do not use the site.</p>

      <h2>2. Orders &amp; pricing</h2>
      <p>Prices are shown in U.S. dollars and may change without notice. We may correct errors, cancel orders, or limit quantities at our discretion. Payment is processed securely by Stripe; we do not store your full card details.</p>

      <h2>3. Eligibility for regulated products</h2>
      <p>Certain products — including controlled-substance, RCRA-hazardous, and chemotherapy kits — are sold only to eligible facilities and are subject to DEA, EPA, DOT, and state requirements. You represent that you are authorized to purchase and use any regulated product you order.</p>

      <h2>4. Customer responsibilities</h2>
      <p>You are responsible for using each kit for its intended waste stream, packaging and sealing it as instructed, and complying with all applicable federal, state, and local laws for the waste you generate. Mixing incompatible waste streams or shipping prohibited materials is not permitted.</p>

      <h2>5. Service &amp; documentation</h2>
      <p>We provide compliant destruction and a Certificate of Destruction for eligible orders. Documentation is provided for the materials we receive; we are not responsible for materials never delivered to us or lost in transit outside our control.</p>

      <h2>6. Text messaging</h2>
      <p>{SITE.name} text messages are sent only to people who opt in, for example by checking the texting box on our quote form or choosing text updates at checkout. Texts cover your quote, orders, shipping and account. Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to cancel at any time; you&rsquo;ll get one confirmation and no further texts. Reply <strong>HELP</strong> for help, or call <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>. Carriers are not liable for delayed or undelivered messages. Consent is not a condition of purchase. See our <a href="/privacy/">Privacy Policy</a> for how we handle your number.</p>

      <h2>7. Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {SITE.name} is not liable for indirect, incidental, or consequential damages arising from use of the site or services. Our total liability for any claim is limited to the amount you paid for the order giving rise to the claim.</p>

      <h2>8. Intellectual property</h2>
      <p>All site content, branding, and materials are owned by {SITE.legalName} or its licensors and may not be reproduced without permission.</p>

      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of the State of Arkansas, without regard to conflict-of-laws principles.</p>

      <h2>10. Changes</h2>
      <p>We may update these terms from time to time; the &ldquo;last updated&rdquo; date reflects the current version. Continued use of the site constitutes acceptance of the updated terms.</p>

      <h2>11. Contact</h2>
      <p>{SITE.legalName} (DBA {SITE.name}), {SITE.address.city}, {SITE.address.region}. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>. Please do not mail waste to us directly — every kit includes a prepaid return label to our permitted facility.</p>
    </PolicyPage>
  );
}
