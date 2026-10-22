"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";

type Q = { id: string; q: string; o: string[] };
type Mod = { id: string; title: string; questions: Q[] };
type Result = { passed: boolean; score: number; total: number; pct: number; pass_pct: number; cert_no: string | null; emailed: boolean;
  by_module: { id: string; title: string; correct: number; total: number }[] };

export default function TrainingTest({ total: testLength, passPct }: { total: number; passPct: number }) {
  const [stage, setStage] = useState<"intro" | "test" | "done">("intro");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [who, setWho] = useState({ name: "", email: "", company: "" });
  const [attempt, setAttempt] = useState("");
  const [mods, setMods] = useState<Mod[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const total = mods.reduce((n, m) => n + m.questions.length, 0);
  const answered = Object.keys(answers).length;

  async function call(body: Record<string, unknown>) {
    const r = await fetch("/api/training", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return r.json().catch(() => ({ ok: false, error: "Something went wrong. Please try again." }));
  }

  async function start(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true); setErr("");
    try {
      const j = await call({ action: "start", ...who });
      if (!j.ok) { setErr(j.error || "Couldn't start the test."); return; }
      setAttempt(j.attempt_id); setMods(j.modules); setAnswers({}); setResult(null); setStage("test");
      trackEvent("training_start", {});
      window.scrollTo({ top: (document.getElementById("test")?.offsetTop ?? 0) - 90, behavior: "smooth" });
    } catch { setErr("Network error — please try again."); } finally { setBusy(false); }
  }

  async function submit() {
    setBusy(true); setErr("");
    try {
      const j = await call({ action: "submit", attempt_id: attempt, answers });
      if (!j.ok) { setErr(j.error || "Couldn't submit the test."); return; }
      setResult(j); setStage("done");
      trackEvent(j.passed ? "training_pass" : "training_fail", { value: j.pct });
      window.scrollTo({ top: (document.getElementById("test")?.offsetTop ?? 0) - 90, behavior: "smooth" });
    } catch { setErr("Network error — please try again."); } finally { setBusy(false); }
  }

  if (stage === "intro") {
    return (
      <form className="rfq" onSubmit={start}>
        <label>Full name (as it should appear on your certificate)*
          <input required autoComplete="name" value={who.name} onChange={(e) => setWho({ ...who, name: e.target.value })} /></label>
        <label>Email (your certificate is sent here)*
          <input type="email" required autoComplete="email" value={who.email} onChange={(e) => setWho({ ...who, email: e.target.value })} /></label>
        <label>Company
          <input autoComplete="organization" value={who.company} onChange={(e) => setWho({ ...who, company: e.target.value })} /></label>
        <input name="company_website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
        <button className="btn btn-primary" disabled={busy} type="submit">{busy ? "Starting…" : "Start the test"} <span className="ar">→</span></button>
        {err && <p className="form-note" style={{ color: "#B4442F" }}>{err}</p>}
        <p className="form-note">{testLength} questions · {passPct}% to pass · retake anytime.</p>
      </form>
    );
  }

  if (stage === "done" && result) {
    const weak = result.by_module.filter((m) => m.correct / m.total < 0.75);
    return (
      <div className="tc-result">
        <div className={`tc-score ${result.passed ? "pass" : "fail"}`}>
          <span className="tc-pct">{result.pct}%</span>
          <span>{result.score} of {result.total} correct · {result.pass_pct}% to pass</span>
        </div>
        {result.passed ? (
          <>
            <h3>You passed. You&rsquo;re certified.</h3>
            <p>{result.emailed ? <>Your certificate is on its way to <b>{who.email}</b>.</> : <>Your certificate will be emailed to <b>{who.email}</b>.</>} Certificate No. <b>{result.cert_no}</b>.</p>
          </>
        ) : (
          <>
            <h3>Not quite — review and try again.</h3>
            <p>Each attempt draws a new set of questions. Focus on the modules below, then retake the test.</p>
          </>
        )}
        <table className="tc-mods">
          <thead><tr><th>Module</th><th>Score</th></tr></thead>
          <tbody>{result.by_module.map((m) => (
            <tr key={m.id} className={m.correct / m.total < 0.75 ? "weak" : ""}><td>{m.title}</td><td>{m.correct} / {m.total}</td></tr>
          ))}</tbody>
        </table>
        {!result.passed && weak.length > 0 && <p className="form-note">Review: {weak.map((m) => m.title).join(", ")} — see the playbook&rsquo;s forms section and Appendices A and B.</p>}
        {!result.passed && <button className="btn btn-primary" disabled={busy} onClick={() => start()}>{busy ? "Starting…" : "Retake the test"} <span className="ar">→</span></button>}
        {err && <p className="form-note" style={{ color: "#B4442F" }}>{err}</p>}
      </div>
    );
  }

  let n = 0;
  return (
    <div className="tc-test">
      {mods.map((m, mi) => (
        <fieldset key={m.id} className="tc-mod">
          <legend><span className="eyebrow">Module {mi + 1}</span>{m.title}</legend>
          {m.questions.map((q) => {
            n++;
            return (
              <div key={q.id} className="tc-q">
                <p className="tc-qt"><b>{n}.</b> {q.q}</p>
                {q.o.map((o, i) => (
                  <label key={i} className={`tc-opt ${answers[q.id] === i ? "on" : ""}`}>
                    <input type="radio" name={q.id} checked={answers[q.id] === i} onChange={() => setAnswers({ ...answers, [q.id]: i })} />
                    <span>{o}</span>
                  </label>
                ))}
              </div>
            );
          })}
        </fieldset>
      ))}
      <div className="tc-bar">
        <span>{answered} of {total} answered</span>
        <button className="btn btn-primary" disabled={busy || answered < total} onClick={submit}>{busy ? "Grading…" : "Submit my test"} <span className="ar">→</span></button>
      </div>
      {err && <p className="form-note" style={{ color: "#B4442F" }}>{err}</p>}
    </div>
  );
}
