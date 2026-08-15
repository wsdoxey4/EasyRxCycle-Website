import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="site"><div className="wrap">
  <div className="fnews">
    <div className="fnews-copy">
      <h5>Compliance, in your inbox</h5>
      <p>Regulation updates, disposal tips &amp; offers &mdash; no spam, unsubscribe anytime.</p>
    </div>
    <NewsletterForm />
  </div>
  <div className="fgrid">
    <div className="brand">
      <img className="logo-w" src="/images/logo-white.png" alt="Easy Rx Cycle" width={4796} height={819} />
      <p>Trusted pharma &amp; medical waste disposal experts. DEA-registered destruction, documented on every order.</p>
    </div>
    <div><h5>Solutions</h5><ul><li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li><li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW</a></li><li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste</a></li><li><a href="/our-solutions/controlled-substance-destruction">Controlled substances</a></li><li><a href="/our-solutions/reverse-distribution">Reverse distribution</a></li><li><a href="/build-your-program">Build a program</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/medical-waste-disposal-cost">What it costs</a></li><li><a href="/cost-calculator">Cost calculator</a></li></ul></div>
    <div><h5>Company</h5><ul><li><a href="/about-us">About us</a></li><li><a href="/why-us">Why us</a></li><li><a href="/case-studies">Case studies</a></li><li><a href="/who-we-serve/">Who we serve</a></li><li><a href="/capabilities">Capabilities</a></li><li><a href="/partners">Partners &amp; GPOs</a></li></ul></div>
    <div><h5>Resources</h5><ul><li><a href="/resources">Resources hub</a></li><li><a href="/resources/guides">Guide library</a></li><li><a href="/blog/">Blog</a></li><li><a href="/faq">FAQ</a></li><li><a href="/cost-calculator">Cost calculator</a></li></ul></div>
    <div><h5>Get in touch</h5><ul><li><a href="tel:5019042929">501-904-2929</a></li><li><a href="mailto:sales@easyrxcycle.com">sales@easyrxcycle.com</a></li><li><a href="/contact">Contact us</a></li><li><a href="/how-it-works">How it works</a></li><li><a href="/faq">FAQ</a></li></ul>
      <p style={{ marginTop: "10px", fontSize: "13px", opacity: 0.85 }}>Little Rock, AR · nationwide mail-back</p>
    </div>
  </div>
  <div className="fbar">
    <div>&copy; 2026 Easy Rx Cycle. All rights reserved.</div>
    <div className="fpolicy"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/shipping-policy">Shipping</a><a href="/returns">Returns</a></div>
    <div className="fcreds"><span>DEA-REGISTERED</span><span>EPA-COMPLIANT</span><span>HIPAA &amp; DOT</span><span>RCRA</span></div>
  </div>
</div></footer>
  );
}
