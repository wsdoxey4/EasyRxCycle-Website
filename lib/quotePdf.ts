// Client-side branded cost-estimate PDF for the cost calculator. jsPDF is loaded
// lazily (dynamic import) so it never ships on pages that don't need it.
export type QuoteData = {
  name?: string;
  org?: string;
  email?: string;
  streams: string;      // comma-separated labels
  volume: string;       // low | med | high
  monthlyAuto: number;  // $/mo with auto-ship
  monthlyOne: number;   // $/mo one-time
  current?: number;     // current monthly bill ($), optional
};

const VOL_LABEL: Record<string, string> = { low: "Low (solo / small site)", med: "Medium (busy practice)", high: "High (multi-provider)" };
const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

// Returns the PDF as a base64 string (no data: prefix) for emailing, plus a Blob for download.
export async function buildQuotePdf(d: QuoteData): Promise<{ base64: string; blob: Blob; filename: string }> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = 612;
  const teal: [number, number, number] = [0, 87, 112];
  const emerald: [number, number, number] = [51, 192, 137];
  const ink: [number, number, number] = [31, 45, 52];
  const mut: [number, number, number] = [91, 102, 112];
  const L = 48;

  // header
  doc.setFillColor(...teal); doc.rect(0, 0, W, 66, "F");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(18);
  doc.text("Easy Rx Cycle", L, 40);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9);
  doc.text("easyrxcycle.com  ·  501-904-2929", W - L, 38, { align: "right" });
  doc.setFillColor(...emerald); doc.rect(0, 66, W, 3, "F");

  let y = 108;
  doc.setTextColor(...teal); doc.setFont("helvetica", "bold"); doc.setFontSize(22);
  doc.text("Cost Estimate", L, y);
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...mut);
  y += 18; doc.text(`Prepared ${today}${d.org ? "  ·  for " + d.org : d.name ? "  ·  for " + d.name : ""}`, L, y);

  // big number
  y += 34;
  doc.setFillColor(240, 246, 246); doc.roundedRect(L, y, W - 2 * L, 92, 8, 8, "F");
  doc.setTextColor(...mut); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  doc.text("ESTIMATED COST WITH EASY RX CYCLE", L + 20, y + 26);
  doc.setTextColor(...ink); doc.setFont("helvetica", "bold"); doc.setFontSize(30);
  doc.text(`${usd(d.monthlyAuto)}/mo`, L + 20, y + 58);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...mut);
  doc.text(`with auto-ship (20% off)  ·  one-time ${usd(d.monthlyOne)}/mo  ·  about ${usd(d.monthlyAuto * 12)}/yr`, L + 20, y + 78);
  y += 92;

  // savings
  if (d.current && d.current > d.monthlyAuto) {
    const save = d.current - d.monthlyAuto;
    y += 22;
    doc.setTextColor(...emerald); doc.setFont("helvetica", "bold"); doc.setFontSize(12);
    doc.text(`Estimated savings: ${usd(save)}/mo  (about ${usd(save * 12)}/yr) vs. your current bill`, L, y);
  }

  // details table
  y += 34;
  doc.setDrawColor(224, 230, 233); doc.setLineWidth(0.5);
  const row = (k: string, v: string) => {
    doc.setTextColor(...mut); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text(k, L, y);
    doc.setTextColor(...ink); doc.setFont("helvetica", "bold");
    doc.text(doc.splitTextToSize(v, W - 2 * L - 160), L + 160, y);
    y += 22; doc.line(L, y - 8, W - L, y - 8);
  };
  doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(...teal);
  doc.text("Your inputs", L, y); y += 20;
  row("Waste streams", d.streams || "—");
  row("Volume", VOL_LABEL[d.volume] || d.volume);
  if (d.current) row("Current monthly bill", usd(d.current) + "/mo");

  // included
  y += 14;
  doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(...teal);
  doc.text("Every order includes", L, y); y += 20;
  ["No contract, no minimums", "Prepaid shipping both ways", "Certificate of Destruction on every load", "DEA-registered destruction"].forEach((t) => {
    // draw a checkmark (the ✓ glyph isn't in jsPDF's base WinAnsi fonts)
    doc.setDrawColor(...emerald); doc.setLineWidth(1.5); doc.setLineCap("round");
    doc.line(L, y - 3, L + 3, y); doc.line(L + 3, y, L + 9, y - 8);
    doc.setTextColor(...ink); doc.setFont("helvetica", "normal"); doc.setFontSize(10.5); doc.text(t, L + 16, y);
    y += 18;
  });

  // disclaimer
  y += 12;
  doc.setTextColor(...mut); doc.setFont("helvetica", "italic"); doc.setFontSize(9);
  const disc = "This is an estimate built from our published mail-back kit prices — a realistic starting point, not a bill. Higher volumes, bulk chemo, large controlled-substance quantities, and multi-site programs move into custom pricing. Request a quote for an exact figure sized to your facility.";
  doc.text(doc.splitTextToSize(disc, W - 2 * L), L, y);

  // footer
  doc.setDrawColor(224, 230, 233); doc.line(L, 740, W - L, 740);
  doc.setTextColor(...mut); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
  doc.text("Easy Rx Cycle  ·  DEA-Registered · EPA-Compliant · HIPAA & DOT", L, 756);
  doc.text("501-904-2929  ·  sales@easyrxcycle.com", W - L, 756, { align: "right" });

  const uri = doc.output("datauristring");
  const base64 = uri.substring(uri.indexOf(",") + 1);
  const blob = doc.output("blob");
  return { base64, blob, filename: "easy-rx-cycle-cost-estimate.pdf" };
}
