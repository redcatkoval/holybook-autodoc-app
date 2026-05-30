// Reusable bits used across chapters.
const { useState, useEffect, useRef } = React;

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function ChapterHead({ num, title, lede }) {
  return (
    <header className="chapter-head">
      <div className="chapter-num">Chapter {num}</div>
      <h2 className="chapter">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

function Callout({ label = "Why", children }) {
  return (
    <div className="callout">
      <span className="label">{label}</span>
      {children}
    </div>
  );
}

function Section({ id, children }) {
  return <section id={id} className="chapter">{children}</section>;
}

function H3({ children, id }) { return <h3 className="section-h" id={id}>{children}</h3>; }
function H4({ children }) { return <h4 className="sub-h">{children}</h4>; }

function Rules({ items }) {
  return (
    <ul className="rules">
      {items.map((it, i) => (
        <li key={i} dangerouslySetInnerHTML={{__html: it}} />
      ))}
    </ul>
  );
}

function DoDont({ doItem, dontItem }) {
  return (
    <div className="dodont">
      <div className="col do">
        <div className="tag">✓ Do</div>
        <p>{doItem}</p>
      </div>
      <div className="col dont">
        <div className="tag">✗ Don't</div>
        <p>{dontItem}</p>
      </div>
    </div>
  );
}

function Spec({ rows }) {
  return (
    <table className="spec">
      <thead><tr><th>Property</th><th>Value</th></tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}><td className="k">{r[0]}</td><td>{r[1]}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

function FrameRow({ children }) {
  return <div className="frames-row">{children}</div>;
}

function FrameCell({ caption, children }) {
  return (
    <div className="frame-cell">
      {children}
      {caption && <div className="caption" dangerouslySetInnerHTML={{__html: caption}} />}
    </div>
  );
}

// Sketch arrow between two points (used for flow diagrams).
function SketchArrow({ from, to, label, dashed = false, curve = 0 }) {
  const dx = to.x - from.x, dy = to.y - from.y;
  const mx = (from.x + to.x) / 2 + (dy ? -curve : 0);
  const my = (from.y + to.y) / 2 + (dx ? curve : 0);
  const d = `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  return (
    <g>
      <path d={d} stroke="var(--accent)" strokeWidth="1.4"
        fill="none" strokeDasharray={dashed ? "4 4" : "0"} />
      <polygon points={`${to.x},${to.y} ${to.x-7},${to.y-3} ${to.x-7},${to.y+3}`}
        fill="var(--accent)" transform={`rotate(${Math.atan2(dy,dx)*180/Math.PI},${to.x},${to.y})`} />
      {label && (
        <text x={mx} y={my-6} fontSize="10" fontFamily="JetBrains Mono, monospace"
          fill="var(--accent)" textAnchor="middle">{label}</text>
      )}
    </g>
  );
}

// ---------- Part II additions ----------

// Pattern head: like ChapterHead but with a category tag on the right.
function PatternHead({ num, title, category, lede }) {
  const showPrefix = !!num || !!category;
  return (
    <header className="chapter-head">
      {showPrefix && (
        <div className="chapter-num" style={{ textTransform: "uppercase" }}>
          {category ? `${category}${num ? " " + num : ""}` : `Pattern ${num}`}
        </div>
      )}
      <h2 className="chapter">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

// Related links footer — small row of cross-references
function Related({ items = [] }) {
  return (
    <div style={{
      marginTop: 40, paddingTop: 16, borderTop: "1px solid var(--line-2)",
      display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
      color: "var(--muted)",
    }}>
      <span style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>Related</span>
      {items.map((it, i) => (
        <a key={i} href={it.href} style={{
          color: "var(--ink-2)", textDecoration: "none",
          padding: "3px 8px", border: "1px solid var(--line)", borderRadius: 4,
        }}>{it.label}</a>
      ))}
    </div>
  );
}

Object.assign(window, {
  Eyebrow, ChapterHead, Callout, Section, H3, H4,
  Rules, DoDont, Spec, FrameRow, FrameCell, SketchArrow,
  PatternHead, Related,
});
