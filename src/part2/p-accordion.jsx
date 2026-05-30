// ---------------------------------------------------------------
// P-Accordion — Accordion / Disclosure
// ---------------------------------------------------------------

const { useState: useAcc, useEffect: useAccEffect, useRef: useAccRef } = React;

// Auto-loop accordion. mode = "single" | "multi".
// Multi cycles through accumulating-then-clearing open sets.
// Single cycles which one row is open.
// trigger = "chevron" (default) | "text" — chevron rotates; text swaps
// «Show more ›» ↔ «Show less ‹».
function AccordionList({ mode = "multi", trigger = "chevron" }) {
  const rows = [
    { titleW: "58%", bodyWidths: ["88%", "76%"] },
    { titleW: "66%", bodyWidths: ["82%", "64%"] },
    { titleW: "72%", bodyWidths: ["90%", "70%"] },
  ];
  const seqMulti = [
    { 0: true },
    { 0: true, 1: true },
    { 0: true, 1: true, 2: true },
    { 1: true, 2: true },
    { 2: true },
    {},
  ];
  const seqSingle = [0, 1, 2, -1];
  const [step, setStep] = useAcc(0);
  const timer = useAccRef(null);
  useAccEffect(() => {
    const len = mode === "single" ? seqSingle.length : seqMulti.length;
    timer.current = setTimeout(() => setStep(s => (s + 1) % len), 1700);
    return () => clearTimeout(timer.current);
  }, [step, mode]);
  const openState = mode === "single" ? seqSingle[step] : seqMulti[step];
  const isOpen = (i) => mode === "single" ? openState === i : !!openState[i];

  return (
    <div style={{ position: "absolute", top: 76, left: 0, right: 0 }}>
      {rows.map((r, i) => {
        const opened = isOpen(i);
        return (
          <div key={i} style={{ borderBottom: "1px solid #ececec" }}>
            <div style={{
              padding: "14px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div className="skel-row" style={{
                width: r.titleW, height: 9, margin: 0,
                background: "#b8b8b8",
              }}/>
              {trigger === "text" ? (
                <span style={{
                  fontSize: 12, fontWeight: 600, color: "#111",
                  lineHeight: 1, whiteSpace: "nowrap", marginLeft: 12,
                }}>{opened ? "Show less ‹" : "Show more ›"}</span>
              ) : (
                <span style={{
                  color: "#6b6b6b", fontSize: 14, lineHeight: 1,
                  display: "inline-block",
                  transform: opened ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.22s ease-out",
                }}>⌄</span>
              )}
            </div>
            <div style={{
              maxHeight: opened ? 80 : 0,
              overflow: "hidden",
              transition: "max-height 0.28s ease-out",
            }}>
              <div style={{ padding: "0 16px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
                {r.bodyWidths.map((w, j) => (
                  <div key={j} className="skel-row" style={{ width: w, height: 8, margin: 0 }}/>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PAccordion() {
  const anatAnno = { left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45 };

  return (
    <Section id="p-accordion">
      <PatternHead num="07" title="Accordion / Disclosure" category="Presentation"
        lede={<>An <span className="hl">accordion</span> is a row that expands to show its content when tapped, and collapses when tapped again. Used for grouped content where any single item is worth reading, but showing all of them at once would overwhelm — product specs, compatibility tables, warranty terms, settings groups, FAQ.</>} />


      <Callout label="Autodoc reading">
        Autodoc uses accordions for dense, structured, optional content — compatibility, technical specs, warranty, returns, support details. Inlining everything makes the page four screens long; hiding it behind tabs spreads it across screens; the accordion sits between — content stays in place, summoned by the user. The whole row is the tap target, the chevron rotates on expand, content slides in without jumping the page. Two modes: <b>multiple-open</b> (each row independent — the default) and <b>single-open</b> (only one expanded at a time — used when rows compete for attention, like FAQ).
      </Callout>

      <H3>Two modes</H3>
      <p>Same row shape, different toggle behaviour — pick by whether the user wants to compare sections side by side or focus on one at a time.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Multiple-open (default).</b> Each row is independent — expanding one doesn't collapse another. Used when sections describe complementary aspects of the same thing (specs, warranty, fitment) and the user might compare them with each other open. Loops to show the full cycle.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <AccordionList mode="multi" />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Single-open.</b> Only one row is expanded at a time — opening another collapses the previous. Used when sections compete for attention, typically FAQ-style lists where the user reads one question, then moves on. Loops to show the full cycle.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <AccordionList mode="single" />
          </Phone>
        </FrameCell>
      </div>

      <H3>Trigger style — chevron or text button</H3>
      <p>Two ways to surface the toggle on the right side of the row. The <b>chevron</b> (default) is compact and disappears into the row chrome — best for dense lists where many rows live together. The <b>text button</b> («Show more ›» / «Show less ‹») reads as an explicit reading affordance — best when the body that is hidden is long-form copy (description, policy, explainer) and the row carries fewer of them. Same row mechanics either way: whole row stays the tap target, the trigger on the right is purely a visual signal of state.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Chevron trigger (default).</b> Compact rotating glyph on the right. Reads as «row toggle»; suits dense lists with many rows where the trigger should disappear into the chrome.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <AccordionList mode="single" trigger="chevron" />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Text-button trigger.</b> «Show more ›» / «Show less ‹» on the right. Reads as «expand to read»; suits rows whose body is a long-form paragraph the user has to decide whether to read.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <AccordionList mode="single" trigger="text" />
          </Phone>
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Whole row is the tap target.</b> Not just the trigger on the right — the full header row, edge to edge.",
        "<b>Smooth expand and collapse.</b> Content slides in, never jumps. The page reflows; surrounding rows scroll down.",
        "<b>Multiple-open by default.</b> Single-open is opt-in — pick it only when rows compete for attention (FAQ).",
        "<b>Two trigger styles, pick by content.</b> Chevron for compact toggle-of-section rows; text button for rows whose body is long-form copy the user has to decide whether to read.",
        "<b>No deep nesting.</b> An accordion inside an accordion is almost always wrong. Two levels at most, and only with good reason.",
        "<b>Scroll position survives the toggle.</b> Expanding a row above the fold doesn't push other content out of view unexpectedly.",
      ]}/>

      <DoDont
        doItem="Use an accordion for the warranty, returns, and compatibility sections on a product page. The user scrolls past them quickly when uninterested, and opens one with a single tap when they care."
        dontItem="Don't use an accordion to hide essential information — price, fitment status, the primary CTA. If the user needs it to make a decision, inline it; the accordion is for optional depth, not for the things that drive the decision."
      />
    </Section>
  );
}
window.PAccordion = PAccordion;
