import QuoteForm from "@/components/QuoteForm";

const point = (t: string) => (
  <li key={t}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <span dangerouslySetInnerHTML={{ __html: t }} />
  </li>
);

export default function QuoteSection() {
  return (
    <section className="sec quote-sec" id="quote">
      <div className="wrap">
        <div className="shead">
          <span className="eyebrow">Request a quote</span>
          <h2>Tell us what you generate. We&rsquo;ll scope it fast.</h2>
          <p className="lead">A single office or a national system — same-day quotes, no obligation.</p>
        </div>
        <div className="quote-grid" style={{ marginTop: "36px" }}>
          <div className="quote-aside">
            <ul className="covers" style={{ gridTemplateColumns: "1fr" }}>
              {point("Tell us your <b>industry</b> and what you need")}
              {point("Pick your <b>waste streams</b> — sharps to controlled")}
              {point("Pickup, multi-site, or bulk welcome")}
              {point("Invoice, PO, W-9 &amp; tax-exempt supported")}
            </ul>
            <div className="quote-call">
              <span className="fld-label">Prefer to talk?</span>
              <a href="tel:5019042929" className="callbig">501-904-2929</a>
              <span className="form-note">Mon–Fri · a specialist, not a bot</span>
            </div>
          </div>
          <div className="quote-card">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
