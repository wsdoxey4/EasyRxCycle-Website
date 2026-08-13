import { wasteStreams } from "@/lib/wasteStreams";

/**
 * Full rundown of all 8 regulated waste streams — so a partner can speak to
 * everything their accounts generate. Each card links to its solution pillar.
 */
export default function WasteStreams() {
  return (
    <div className="wstreams">
      {wasteStreams.map((s) => (
        <a className="wstream wstream-link" href={s.href} key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.what}</p>
          <p className="ws-meta"><b>The rule</b> — {s.rule}</p>
          <div className="ws-io">
            <div className="ws-col in">
              <span className="ws-lbl">Typical items</span>
              <ul>{s.goesIn.map((g) => <li key={g}>{g}</li>)}</ul>
            </div>
          </div>
          <span className="ws-rm">See the solution →</span>
        </a>
      ))}
    </div>
  );
}
