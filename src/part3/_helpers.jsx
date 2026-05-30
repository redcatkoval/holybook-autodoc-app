// Part IV — Composed Flows. Shared layout primitives for journey-style entries.
// Distinct from Part II PatternHead / H3 / Rules — flows read as linear narratives,
// not as reference cards.

// ─── FlowHead ────────────────────────────────────────────────────────────────
// Header block at the top of a flow. Carries:
//   - "FLOW" mono eyebrow
//   - title
//   - journey chain (Cart → Auth → Checkout → Pay → Thank you) as a chip-row
//   - user-type badges
//   - one-paragraph lede
function FlowHead({ id, title, journey = [], userTypes = [], lede }) {
  return (
    <div id={id} style={{ marginBottom: 24 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
        textTransform: "uppercase", letterSpacing: "0.18em",
        color: "var(--accent)", marginBottom: 8,
      }}>Flow</div>
      <h1 className="title" style={{ fontSize: 44, marginBottom: 16 }}>{title}</h1>

      {journey.length > 0 && (
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6,
          padding: "10px 12px", marginBottom: 14,
          background: "var(--accent-soft)", border: "1px solid var(--accent)",
          borderRadius: 8,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          color: "var(--ink)",
        }}>
          {journey.map((stop, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: 600 }}>{stop}</span>
              {i < journey.length - 1 && (
                <span style={{ color: "var(--accent)" }}>→</span>
              )}
            </span>
          ))}
        </div>
      )}

      {userTypes.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {userTypes.map((u, i) => (
            <span key={i} style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: "var(--ink)", border: "1px solid var(--line)",
              padding: "3px 8px", borderRadius: 12, background: "#fff",
            }}>{u}</span>
          ))}
        </div>
      )}

      <p className="lede" style={{ marginBottom: 0 }}>{lede}</p>
    </div>
  );
}

// ─── FlowStage ──────────────────────────────────────────────────────────────
// Numbered stage marker. Replaces H3 in flows. Reads as «① The screen»,
// «② Block-by-block», etc.
function FlowStage({ num, title, subtitle }) {
  return (
    <div style={{ marginTop: 56, marginBottom: 14 }}>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 14,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 26, fontWeight: 700, color: "var(--accent)",
          letterSpacing: "-0.02em", lineHeight: 1,
        }}>{String(num).padStart(2, "0")}</div>
        <h2 style={{
          fontSize: 26, fontWeight: 600,
          letterSpacing: "-0.015em",
          margin: 0, lineHeight: 1.15,
        }}>{title}</h2>
      </div>
      {subtitle && (
        <p style={{
          margin: "6px 0 0 40px",
          fontSize: 14, color: "var(--muted)",
          maxWidth: "68ch", lineHeight: 1.5,
        }}>{subtitle}</p>
      )}
    </div>
  );
}

// ─── FlowCallout ────────────────────────────────────────────────────────────
// «Journey reading» callout — replaces «Autodoc reading». Same vibe, accent fill.
function FlowCallout({ children, label = "Journey reading" }) {
  return (
    <div style={{
      background: "var(--accent-soft)", border: "1px solid var(--accent)",
      borderLeft: "3px solid var(--accent)",
      padding: "16px 18px", borderRadius: 4,
      fontSize: 14, color: "var(--ink-2)",
      margin: "16px 0 24px", maxWidth: "70ch",
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        color: "var(--accent)", textTransform: "uppercase",
        letterSpacing: "0.15em", marginBottom: 6,
      }}>{label}</div>
      {children}
    </div>
  );
}

// ─── FlowBlock ──────────────────────────────────────────────────────────────
// Block-by-block container used in Stage 2. Each block carries a small numbered
// header, an optional one-line description, and the two-frame row.
// Note: pattern lineage lives in a dedicated Stage at the end of each flow,
// never inline as a "Uses → Pattern" pill — keeps flow narrative uncluttered.
function FlowBlock({ num, title, summary, children }) {
  return (
    <div style={{ marginTop: 32, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, color: "var(--muted)", fontWeight: 600,
        }}>{String(num).padStart(2, "0")}</div>
        <h3 style={{
          fontSize: 18, fontWeight: 600,
          letterSpacing: "-0.01em", margin: 0,
        }}>{title}</h3>
      </div>
      {summary && (
        <p style={{
          margin: "6px 0 0 28px",
          fontSize: 13, color: "var(--ink-2)",
          maxWidth: "70ch", lineHeight: 1.55,
        }}>{summary}</p>
      )}
      <div style={{ marginTop: 14 }}>{children}</div>
    </div>
  );
}

// ─── FlowPatternList ────────────────────────────────────────────────────────
// Used in Stage 5 to enumerate the Part II patterns the flow stands on.
function FlowPatternList({ items }) {
  return (
    <ul style={{
      listStyle: "none", padding: 0, margin: 0,
      display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px 24px",
      maxWidth: "70ch",
    }}>
      {items.map(([label, anchor, note], i) => (
        <li key={i} style={{ padding: "10px 12px", border: "1px solid var(--line-2)", borderRadius: 6 }}>
          <a href={"#" + anchor} style={{
            color: "var(--ink)", textDecoration: "none",
            fontSize: 13, fontWeight: 600,
          }}>{label}</a>
          {note && (
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{note}</div>
          )}
        </li>
      ))}
    </ul>
  );
}

window.FlowHead = FlowHead;
window.FlowStage = FlowStage;
window.FlowCallout = FlowCallout;
window.FlowBlock = FlowBlock;
window.FlowPatternList = FlowPatternList;
