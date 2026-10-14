// Proof and reassurance that sits directly under the Add to Cart button: what the buyer actually receives (a sample
// Certificate of Destruction), verified credentials, the controlled-substance manifest step explained BEFORE checkout,
// and a human to call. Every claim here is a verified fact (see TrustBar / StatsBand).
export default function BuyConfidence({ category }: { category: string }) {
  const controlled = category === "controlled";
  return (
    <div className="bconf">
      <a className="bconf-cert" href="/downloads/sample-certificate-of-destruction.pdf" target="_blank" rel="noopener">
        <img src="/images/guides/sample-certificate-of-destruction.jpg" alt="Sample Certificate of Destruction" width={84} height={108} loading="lazy" />
        <span>
          <b>See a sample Certificate of Destruction</b>
          <small>The record you keep for DEA, EPA, OSHA and state inspections. Issued after every kit is destroyed.</small>
        </span>
      </a>

      <ul className="bconf-facts">
        <li>DEA-registered destruction</li>
        <li>1,000+ facilities served since 2018</li>
        <li>Chain of custody from your door to destruction</li>
      </ul>

      {controlled && (
        <div className="bconf-manifest">
          <b>One extra step for controlled substances</b>
          <ol>
            <li>Check out as normal. Your confirmation page and receipt email include a link to our drug inventory manifest.</li>
            <li>Fill in your company, DEA number and state, then list each drug: name, strength, NDC and package size.</li>
            <li>Print it and put it in the box with your controls before you seal it.</li>
          </ol>
          <small>It takes about two minutes. Questions about what to include? Call us before you ship.</small>
        </div>
      )}

      <p className="bconf-help">Questions before you order? Call <a href="tel:5019042929">501-904-2929</a> or <a href="/get-a-quote">get a quote</a> for higher volume.</p>
    </div>
  );
}
