import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";
import { STATES } from "@/lib/geo";

const PATH = "/blog/biohazardous-waste-disposal-for-healthcare-facilities";
const TITLE = "Biohazardous Waste Disposal for Healthcare Facilities: 2026 Guide";
const DESC = "What counts as biohazardous waste (with examples), who generates it, OSHA, DOT and state rules, packaging and storage, treatment methods, pickup vs. mail-back, and cost.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What qualifies as biohazardous waste?", a: "Any material containing or transmitting infectious agents \u2014 blood, bodily fluids, tissues, cultures, used sharps, contaminated PPE, and animal research waste. When uncertain, treat it as regulated medical waste." },
  { q: "Can I throw sharps in red bags?", a: "No. Sharps must go in FDA-cleared, rigid, puncture-resistant, leak-proof containers with biohazard labels. Mixing them into red bags is a common OSHA violation and a leading cause of handler injuries." },
  { q: "Do I need a manifest for every pickup?", a: "In most states, yes. Each off-site shipment of regulated medical waste is tracked on a manifest or shipping record (generator, date, container count, waste type, transporter, treatment facility), and you keep a copy for the period your state requires. Mail-back kits include the medical waste manifest and a Certificate of Destruction." },
  { q: "Can we treat our own waste on-site?", a: "Only if properly licensed and permitted, which usually applies to large hospitals, universities, and BSL 3\u20134 labs. Most clinics use a licensed vendor for safety and cost." },
  { q: "Can biohazardous waste be mailed?", a: "Yes, in a UN-rated mail-back container with a red liner, sealed and shipped under DOT rules with a prepaid label. Mail-back fits low-volume sites that don't want a hauler contract; you receive a Certificate of Destruction and the medical waste manifest." },
  { q: "What's the difference between biohazard waste and sharps?", a: "Sharps can puncture skin and need a rigid, puncture-resistant container. Biohazard (red-bag) waste is soft material saturated with blood or other infectious material. They're separate streams with separate containers." },
  { q: "How often should pickups occur?", a: "Often enough to stay inside your state\u2019s storage-time limit, which depends on whether the waste is refrigerated. High-volume sites usually need weekly or more frequent service; low-volume sites such as dental or dermatology practices often fit mail-back, shipping a box when it fills." },
  { q: "Who regulates medical waste in my state?", a: "Usually the state health department or environmental agency. There has been no single federal medical waste law since the Medical Waste Tracking Act expired in 1991, so storage limits, registration and tracking rules come from the state. OSHA and DOT rules apply everywhere." },
  { q: "What happens to biohazardous waste after it leaves my facility?", a: "A licensed transporter or carrier takes it to a permitted treatment facility, where it is autoclaved or incinerated so it is no longer infectious. The treated residue goes to a landfill or is destroyed, and the paperwork closes the cradle-to-grave trail back to your facility." },
  { q: "Is biohazard waste the same as hazardous waste?", a: "No. Biohazardous waste is infectious and regulated mainly by states, OSHA and DOT. Hazardous waste is chemical waste regulated by the EPA under RCRA, which includes some drugs (P- and U-listed). A few items, like chemo-contaminated sharps, can be both and need special handling." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-06-02", dateModified: "2026-10-24", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Biohazardous Waste Disposal" }]} />
              <span className="eyebrow">Biohazard · Medical Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Biohazardous Waste Disposal for Healthcare Facilities: A Complete Guide (2026)" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Jun 2, 2025</span>
                <span className="dot-sep" />
                <span>18 min read</span>
                <span className="dot-sep" />
                <span>Updated Oct 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Biohazardous waste isn&rsquo;t just a box to check &mdash; it&rsquo;s central to patient safety, the environment, and your facility&rsquo;s legal standing. This guide covers what counts as biohazardous waste, who generates it, the six waste types, federal and state rules, packaging and storage, treatment methods, and how to build a program that stays compliant." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What is biohazardous waste?" }} /></li>
                <li><a href="#test" dangerouslySetInnerHTML={{ __html: "Is it biohazard? Examples table" }} /></li>
                <li><a href="#generators" dangerouslySetInnerHTML={{ __html: "Who produces biohazardous waste?" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#types" dangerouslySetInnerHTML={{ __html: "The six types of biohazard waste" }} /></li>
                <li><a href="#rules" dangerouslySetInnerHTML={{ __html: "Federal regulations" }} /></li>
                <li><a href="#packaging" dangerouslySetInnerHTML={{ __html: "Packaging, storage & labeling" }} /></li>
                <li><a href="#treatment" dangerouslySetInnerHTML={{ __html: "Approved treatment methods" }} /></li>
                <li><a href="#program" dangerouslySetInnerHTML={{ __html: "Building a compliant program" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "Pickup vs. mail-back" }} /></li>
                <li><a href="#states" dangerouslySetInnerHTML={{ __html: "Rules by state &amp; cost" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is biohazardous waste?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Biohazardous waste &mdash; also called regulated medical waste (RMW) &mdash; is any material capable of transmitting disease or infection, generated in healthcare and lab settings. Proper segregation prevents cross-contamination, OSHA breaches, environmental harm, and reputational damage." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>Common categories include:</strong>" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Blood-soaked materials (gauze, sponges, suction canisters)" }} /><li dangerouslySetInnerHTML={{ __html: "Sharps (needles, syringes, scalpels, broken glass)" }} /><li dangerouslySetInnerHTML={{ __html: "Pathological waste (tissues, organs, body parts)" }} /><li dangerouslySetInnerHTML={{ __html: "Microbiological waste (cultures, petri dishes, vaccines)" }} /><li dangerouslySetInnerHTML={{ __html: "Contaminated PPE (gloves, gowns, masks)" }} /><li dangerouslySetInnerHTML={{ __html: "Animal research waste (carcasses, bedding, tissue)" }} /></ul>
            <h2 id="test">Is it biohazardous waste? The drip-or-flake test</h2>
            <p dangerouslySetInnerHTML={{ __html: "The simplest test for regulated medical waste: <strong>would it drip, pour or flake blood or other potentially infectious material if you squeezed it?</strong> If yes, it&rsquo;s biohazardous and goes in a red bag inside a rigid container. If not &mdash; a glove with a dot of dried blood, a lightly stained bandage &mdash; it&rsquo;s usually regular trash. State definitions vary, so when in doubt, treat it as biohazard." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th>Item</th><th>Where it goes</th></tr></thead>
                <tbody>
                  <tr><td>Blood-soaked gauze, sponges and dressings</td><td><strong>Biohazard (red bag)</strong></td></tr>
                  <tr><td>Gloves, gowns or masks saturated with blood</td><td><strong>Biohazard (red bag)</strong></td></tr>
                  <tr><td>Cultures, swabs and specimens</td><td><strong>Biohazard (red bag)</strong></td></tr>
                  <tr><td>Needles, syringes, lancets, blades</td><td><a href="/our-solutions/sharps-disposal/">Sharps container</a> &mdash; never the red bag</td></tr>
                  <tr><td>Chemo-contaminated gowns, tubing, empty vials</td><td><a href="/our-solutions/trace-chemotherapy-waste/">Trace chemo (yellow)</a></td></tr>
                  <tr><td>Expired or unused medications</td><td><a href="/our-solutions/pharmaceutical-waste-disposal/">Pharmaceutical waste (blue)</a></td></tr>
                  <tr><td>Glove with a spot of dried blood</td><td>Usually regular trash</td></tr>
                  <tr><td>Tissue, organs, body parts</td><td>Pathological waste &mdash; separate handling and incineration</td></tr>
                </tbody>
              </table>
            </div>
            <p dangerouslySetInnerHTML={{ __html: "<strong>Color code:</strong> red = biohazard and sharps &middot; yellow = trace chemotherapy &middot; black = RCRA hazardous drugs &middot; blue = non-hazardous pharmaceuticals." }} />
            <h2 id="generators" dangerouslySetInnerHTML={{ __html: "Who produces biohazardous waste?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Any facility that draws blood, gives injections, treats wounds, handles specimens or works with animals generates regulated medical waste &mdash; and a low-volume generator follows the same rules as a hospital. The most common generators, and what they typically produce:" }} />
            <ul>
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/hospitals/\">Hospitals</a> and <a href=\"/who-we-serve/asc/\">surgery centers</a></strong> &mdash; the largest volumes: blood-soaked surgical materials, suction canisters, sharps, cultures, and pathological waste from operating rooms, labor and delivery, the ED and labs." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/physician-offices/\">Physician offices</a> and <a href=\"/who-we-serve/urgent-care/\">urgent care</a></strong> &mdash; injection sharps, laceration and abscess dressings, biopsy materials, and testing swabs from high patient turnover." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/dental/\">Dental practices</a></strong> &mdash; blood-saturated gauze, anesthetic needles and carpules, and contaminated PPE." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/clinical-labs/\">Clinical</a> and <a href=\"/who-we-serve/research-labs/\">research labs</a></strong> &mdash; microbiological cultures, specimen containers, petri dishes and contaminated lab ware, often autoclaved on site or shipped for treatment." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/veterinary/\">Veterinary clinics</a></strong> &mdash; surgical waste, sharps, blood-soaked materials and, in some states, animal tissue handled like human pathological waste." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/nursing-homes/\">Nursing homes</a>, <a href=\"/who-we-serve/home-health/\">home health</a> and <a href=\"/who-we-serve/hospice/\">hospice</a></strong> &mdash; wound-care dressings, insulin and vaccination sharps, and infection-control waste." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/dialysis/\">Dialysis</a> and <a href=\"/who-we-serve/blood-plasma/\">blood and plasma centers</a></strong> &mdash; tubing, filters and blood-saturated materials in large, steady volumes." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/med-spas/\">Med spas</a>, <a href=\"/who-we-serve/tattoo/\">tattoo studios</a> and <a href=\"/who-we-serve/iv-hydration-ketamine/\">IV hydration clinics</a></strong> &mdash; injection and IV sharps, blood-contaminated wipes and PPE. Small volumes, same rules." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong><a href=\"/who-we-serve/funeral-homes/\">Funeral homes</a>, <a href=\"/who-we-serve/ems-fire/\">EMS</a> and <a href=\"/who-we-serve/crime-scene/\">crime-scene cleanup</a></strong> &mdash; fluid-contaminated materials and sharps generated outside a clinic." }} />
            </ul>
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Biohazardous waste is a cradle-to-grave responsibility: the facility that generates it stays responsible until it is treated and documented, even after a vendor picks it up. When that chain breaks, the consequences land in five places:" }} />
            <ul>
              <li dangerouslySetInnerHTML={{ __html: "<strong>Staff exposure.</strong> Needlesticks and splashes can transmit hepatitis B, hepatitis C and HIV. A torn red bag or an overfilled sharps container is how most handler injuries happen &mdash; for your staff, custodians and the drivers downstream." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>OSHA citations.</strong> The Bloodborne Pathogens Standard is one of the most-cited OSHA standards in healthcare. Missing training, no Exposure Control Plan, or no hepatitis B vaccine offer are common findings, and penalties run into five figures per serious violation (adjusted for inflation each year), more for willful or repeat violations." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>State penalties.</strong> Your state health or environmental agency sets storage limits, registration and tracking rules, and fines generators who miss them &mdash; even when the violation happened at a vendor." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Environmental harm.</strong> Untreated waste in the regular trash can expose sanitation workers and the public and contaminate landfills and water." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Liability and reputation.</strong> Exposure incidents lead to workers&rsquo; comp claims, lawsuits and lost patient trust. Good paperwork &mdash; manifests and a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a> &mdash; is your proof that you did it right." }} />
            </ul>
            <h2 id="types" dangerouslySetInnerHTML={{ __html: "The six types of biohazardous waste" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "1. Sharps waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Anything that can puncture skin &mdash; needles, syringes, scalpel blades, lancets, broken glass. Goes in FDA-cleared, puncture-resistant containers, sealed at three-quarters full. See our <a href=\"/our-solutions/sharps-disposal/\">sharps disposal</a> service." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "2. Pathological waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Human or animal tissues, organs, and body parts from surgery, biopsy, or autopsy. Requires incineration, with refrigeration during storage. (Easy Rx Cycle doesn&rsquo;t accept pathological waste.)" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "3. Blood &amp; fluid waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Materials saturated or dripping with blood or other potentially infectious materials (OPIM). Leak-proof red biohazard bags with secondary containment; liquids may need solidification." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "4. Microbiological waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Lab waste with concentrated infectious cultures &mdash; petri dishes, culture tubes, discarded vaccines. Autoclaved on-site or treated off-site." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "5. Contaminated PPE" }} />
            <p dangerouslySetInnerHTML={{ __html: "Single-use gear exposed to infectious material &mdash; gloves, gowns, masks, face shields. Red biohazard bags." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "6. Animal waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Materials from infected or research animals &mdash; carcasses, bedding, tissue. Incineration or biological deactivation; some states require separate permitting." }} />
            <h2 id="rules" dangerouslySetInnerHTML={{ __html: "Federal regulations and agencies" }} />
            <p dangerouslySetInnerHTML={{ __html: "There is no single federal medical waste law. The Medical Waste Tracking Act of 1988 expired in 1991, so <strong>states are the primary regulators</strong> of regulated medical waste, and federal agencies each cover one part of the lifecycle:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>OSHA</strong> &mdash; the <a href=\"/resources/bloodborne-training/\">OSHA Bloodborne Pathogens Standard</a> (29 CFR 1910.1030) protects workers: a written Exposure Control Plan reviewed every year, annual training for exposed employees, the hepatitis B vaccine offered at no cost, PPE, sharps containers, and labeling. See our <a href=\"/blog/osha-medical-waste-requirements/\">OSHA medical waste requirements</a> guide." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>DOT</strong> &mdash; the Hazardous Materials Regulations (49 CFR 171&ndash;180) govern packaging and transport. Regulated medical waste ships as UN3291 in rigid, leak-resistant, properly marked packaging, and anyone who packages or signs for a shipment needs hazmat training." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>EPA</strong> &mdash; regulates medical waste incinerator emissions under the Clean Air Act, and regulates hazardous <em>drug</em> waste under RCRA &mdash; which is why <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste/\">RCRA-hazardous pharmaceutical waste</a> is a separate stream from red-bag waste." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>States</strong> &mdash; define what counts as regulated medical waste, set storage-time limits, and decide whether generators must register, use manifests, or use licensed transporters. Our <a href=\"/medical-waste-regulations-by-state/\">medical waste regulations by state</a> page lists each state&rsquo;s regulator." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>CDC</strong> &mdash; publishes infection-control and biosafety guidance that OSHA and state agencies draw on, but does not enforce it." }} /></ul>
            <h2 id="packaging" dangerouslySetInnerHTML={{ __html: "Packaging, storage &amp; labeling" }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>Packaging:</strong> rigid, puncture-resistant, leak-proof containers for sharps; red, tear-resistant (often double-lined) bags for red-bag waste; hard-sided, DOT-approved secondary bins for transport." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>Labeling:</strong> the universal biohazard symbol, generator name and address, the container start date, and UN markings where required &mdash; on weatherproof, smudge-resistant labels." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>Storage:</strong> secure, locked, clearly signed areas with spill containment. Storage-time limits are set by each state and usually allow longer storage for refrigerated waste; pathological and trace-chemo waste may be stricter. Date every container when you start filling it so you can show you are inside the limit." }} />
            <h2 id="treatment" dangerouslySetInnerHTML={{ __html: "Approved treatment &amp; disposal methods" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Autoclaving</strong> &mdash; high-pressure steam (121&ndash;134&deg;C) for red-bag waste, PPE, cultures." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Incineration</strong> &mdash; high-heat destruction required for pathological, trace-chemo, and pharmaceutical waste." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Chemical disinfection</strong> &mdash; EPA-registered agents for lab waste and fluids." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Microwave treatment</strong> &mdash; shred, moisten, and microwave soft waste." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Encapsulation</strong> &mdash; embedding sharps or chemical byproducts before landfill." }} /></ul>

            <h2 id="program" dangerouslySetInnerHTML={{ __html: "Building a compliant biohazard waste program" }} />
            <p dangerouslySetInnerHTML={{ __html: "A compliant program is mostly routine. For a clinic, practice or lab, it comes down to six habits:" }} />
            <ol>
              <li dangerouslySetInnerHTML={{ __html: "<strong>Map your waste streams.</strong> List what you generate: red-bag waste, sharps, pharmaceuticals, trace chemo, controlled substances. Each one has its own container and its own rules." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Segregate at the point of generation.</strong> Put the right container where the waste is made &mdash; a sharps container in every room where injections happen, red bags only for saturated items." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Write and review your Exposure Control Plan.</strong> OSHA requires it in writing and reviewed at least once a year." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Train every year.</strong> Employees with occupational exposure need bloodborne pathogens training at hire and annually. Our <a href=\"/resources/bloodborne-training/\">bloodborne pathogens training</a> covers it." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Store and date containers correctly.</strong> A secure, labeled area, closed containers, and a start date on each one." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Keep the paperwork.</strong> File every manifest and Certificate of Destruction for as long as your state requires. Our <a href=\"/resources/medical-waste-compliance-checklist/\">medical waste compliance checklist</a> puts it on one page." }} />
            </ol>

            <h2 id="options">Biohazard waste pickup vs. mail-back</h2>
            <p>There are two ways to get biohazardous waste off your site. Which fits depends mostly on volume:</p>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th>&nbsp;</th><th>Scheduled pickup</th><th>Mail-back kits</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Hospitals and high-volume sites filling several boxes a week</td><td>Clinics, dental, vet, med spas and other low- to mid-volume sites</td></tr>
                  <tr><td><strong>Contract</strong></td><td>Often a service agreement and route schedule</td><td>None &mdash; order a kit when you need one</td></tr>
                  <tr><td><strong>How it works</strong></td><td>A licensed transporter collects on a set schedule</td><td>Fill the UN-rated box, seal it, ship it with the prepaid label</td></tr>
                  <tr><td><strong>Paperwork</strong></td><td>Medical waste manifest per pickup</td><td>Certificate of Destruction and the medical waste manifest</td></tr>
                </tbody>
              </table>
            </div>
            <p dangerouslySetInnerHTML={{ __html: "Easy Rx Cycle offers both: <a href=\"/shop/biohazard-mail-back-kit/\">biohazard mail-back kits</a> from 2 to 28 gallons, and scheduled pickups by same-day quote." }} />

            <h2 id="states">Biohazard waste rules by state, and what it costs</h2>
            <p dangerouslySetInnerHTML={{ __html: "States are the main regulators of medical waste, so storage limits, registration and tracking rules vary. See your state: <a href=\"/our-solutions/biohazard-waste-disposal/texas/\">Texas</a>, <a href=\"/our-solutions/biohazard-waste-disposal/california/\">California</a>, <a href=\"/our-solutions/biohazard-waste-disposal/florida/\">Florida</a>, <a href=\"/our-solutions/biohazard-waste-disposal/new-york/\">New York</a>, <a href=\"/our-solutions/biohazard-waste-disposal/pennsylvania/\">Pennsylvania</a>, <a href=\"/our-solutions/biohazard-waste-disposal/ohio/\">Ohio</a> &mdash; or <a href=\"/our-solutions/biohazard-waste-disposal/\">every state</a>." }} />
            <p><strong>Biohazardous waste disposal by state:</strong></p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(9.5rem, 1fr))", gap: "6px 18px", margin: "6px 0 18px" }}>
              {STATES.map((st) => (<a key={st.slug} href={`/our-solutions/biohazard-waste-disposal/${st.slug}/`}>{st.name}</a>))}
            </div>
            <p dangerouslySetInnerHTML={{ __html: "On cost: mail-back biohazard kits start at $75 for a 2-gallon box, prepaid both ways with destruction included. Pickup pricing depends on volume and frequency. Our <a href=\"/blog/biohazard-waste-disposal-cost/\">biohazard disposal cost guide</a> breaks down both." }} />

                <div className="postcta">
                  <h3>Make biohazard compliance the easy part.</h3>
                  <p>Licensed transport or mail-back kits, DOT-compliant packaging, and a Certificate of Destruction on every pickup — sized to your facility, no contracts.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/biohazard-mail-back-kit/">Shop biohazard kits <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote/">Get a same-day quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="biohazardous-waste-disposal-for-healthcare-facilities" />
              </div>
            </article>
          </div>
        </section>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
