// Tiny utility used inside some patterns
// ---------------------------------------------------------------
function Stub({ note }) {
  return (
    <div style={{
      padding: "50px 14px 14px",
      fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "#9a9a9a",
    }}>{note || "screen body"}</div>
  );
}
window.Stub = Stub;

// Part III — Proposals. 21 patterns under review.
// Format: PatternHead + lede + Callout + small wireframe + bullets.
// No full Rules/DoDont — these are proposals, not finalised patterns.

// ---------- shared component for proposals ----------
function ProposalEntry({ num, title, category, what, why, behaviours, openQuestions, children }) {
  return (
    <Section id={"prop-" + num.toLowerCase()}>
      <PatternHead title={title} lede={what} />

      <Callout label="Why this might be needed">
        {why}
      </Callout>

      <div style={{
        display: "grid", gridTemplateColumns: "320px 1fr", gap: 32,
        margin: "24px 0", alignItems: "start",
      }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {children}
        </div>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            textTransform: "uppercase", letterSpacing: "0.15em",
            color: "var(--ink)", marginBottom: 10,
          }}>What it should cover</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>
            {behaviours.map((b, i) => (
              <li key={i} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{__html: b}}/>
            ))}
          </ul>
          {openQuestions && openQuestions.length > 0 && (
            <>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                textTransform: "uppercase", letterSpacing: "0.15em",
                color: "var(--accent)", marginTop: 18, marginBottom: 10,
              }}>Open questions</div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>
                {openQuestions.map((q, i) => (
                  <li key={i} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{__html: q}}/>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
window.ProposalEntry = ProposalEntry;

