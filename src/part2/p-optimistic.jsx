// ---------------------------------------------------------------
// P-Optimistic — Optimistic UI / Undo
// ---------------------------------------------------------------

const { useState: useOpt, useRef: useOptRef, useEffect: useOptEffect } = React;

// Interactive prototype: tap a row to remove optimistically. Snackbar shows "Removed" with Undo.
// Auto-commits after a short window if no Undo. Reset after a beat so the prototype loops.
// Auto-loop demonstration of the happy path: idle → row removes + snackbar
// with Undo → Undo "tapped" → row returns → idle. No user interaction.
function OptimisticUndoProto() {
  const widths = ["80%", "72%", "85%", "65%"];
  const targetIndex = 1;
  const [phase, setPhase] = useOpt("idle"); // idle → removed → undone → idle (loop)
  const timer = useOptRef(null);
  useOptEffect(() => {
    if (phase === "idle") {
      timer.current = setTimeout(() => setPhase("removed"), 1200);
    } else if (phase === "removed") {
      timer.current = setTimeout(() => setPhase("undone"), 1800);
    } else if (phase === "undone") {
      timer.current = setTimeout(() => setPhase("idle"), 1200);
    }
    return () => clearTimeout(timer.current);
  }, [phase]);

  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ paddingTop: 76 }}>
        {widths.map((w, i) => {
          const removed = phase === "removed" && i === targetIndex;
          return (
            <div key={i} style={{
              height: removed ? 0 : 54,
              opacity: removed ? 0 : 1,
              overflow: "hidden",
              transition: "height 0.22s ease-out, opacity 0.22s ease-out",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderBottom: "1px solid #ececec",
              }}>
                <div style={{ width: 32, height: 32, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div className="skel-row" style={{ width: w, height: 8, margin: 0 }}/>
                </div>
                <div style={{ fontSize: 16, color: "#9a9a9a", padding: "0 6px" }}>✕</div>
              </div>
            </div>
          );
        })}
      </div>
      {(phase === "removed" || phase === "undone") && (
        <div style={{
          position: "absolute", left: 12, right: 12, bottom: 16,
          background: "#111", color: "#fff", borderRadius: 8,
          padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
          fontSize: 11, zIndex: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}>
          <span style={{ flex: 1 }}>Item removed</span>
          <span style={{
            color: "#fff", fontWeight: 600,
            background: phase === "undone" ? "rgba(255,255,255,0.18)" : "transparent",
            padding: phase === "undone" ? "2px 6px" : "0",
            borderRadius: 4,
            transition: "background 0.18s ease-out",
          }}>Undo</span>
        </div>
      )}
    </Phone>
  );
}

// Failure prototype: optimistic remove → server rejects → row returns + error snackbar.
function OptimisticFailureProto() {
  const widths = ["80%", "72%", "85%", "65%"];
  const [phase, setPhase] = useOpt("idle"); // idle → removed → failed → idle (loop)
  const timer = useOptRef(null);
  useOptEffect(() => {
    if (phase === "idle") {
      timer.current = setTimeout(() => setPhase("removed"), 1200);
    } else if (phase === "removed") {
      timer.current = setTimeout(() => setPhase("failed"), 1800);
    } else if (phase === "failed") {
      timer.current = setTimeout(() => setPhase("idle"), 2600);
    }
    return () => clearTimeout(timer.current);
  }, [phase]);

  const targetIndex = 1;

  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ paddingTop: 76 }}>
        {widths.map((w, i) => {
          const removed = (phase === "removed") && i === targetIndex;
          return (
            <div key={i} style={{
              height: removed ? 0 : 54,
              opacity: removed ? 0 : 1,
              overflow: "hidden",
              transition: "height 0.22s ease-out, opacity 0.22s ease-out",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderBottom: "1px solid #ececec",
              }}>
                <div style={{ width: 32, height: 32, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div className="skel-row" style={{ width: w, height: 8, margin: 0 }}/>
                </div>
                <div style={{ fontSize: 16, color: "#9a9a9a", padding: "0 6px" }}>✕</div>
              </div>
            </div>
          );
        })}
      </div>
      {(phase === "removed" || phase === "failed") && (
        <div style={{
          position: "absolute", left: 12, right: 12, bottom: 16,
          background: "#111", color: "#fff", borderRadius: 8,
          padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
          fontSize: 11, zIndex: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}>
          {phase === "removed" ? (
            <>
              <span style={{ flex: 1 }}>Item removed</span>
              <span style={{ color: "#fff", fontWeight: 600 }}>Undo</span>
            </>
          ) : (
            <>
              <span style={{ flex: 1 }}>Couldn't remove. Try again?</span>
              <span style={{ color: "#fff", fontWeight: 600 }}>Retry</span>
            </>
          )}
        </div>
      )}
    </Phone>
  );
}

function POptimistic() {
  const anatAnno = { left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45 };

  return (
    <Section id="p-optimistic">
      <PatternHead num="04" title="Optimistic UI / Undo" category="Status"
        lede={<>An <span className="hl">optimistic action</span> applies the change in the UI immediately — the row vanishes, the item is archived — and offers a short window to take it back via a Snackbar with Undo. The user feels the speed of an action that hasn't yet been confirmed by the server; the safety of a reversal that's one tap away.</>} />


      <Callout label="Autodoc reading">
        Optimistic UI feels fast. Modal confirms feel slow. For reversible medium-stakes actions — remove from cart, archive an order, dismiss a wishlist item — Autodoc applies the change in the UI before the server confirms, and offers a Snackbar with Undo for a few seconds. If the user does nothing, the action commits. If they tap Undo, the change reverses with the same animation in reverse. If the <i>server</i> rejects the action, the change rolls back automatically and a different Snackbar explains why. Reserved strictly for reversible actions — never for payment, never for anything irreversible.
      </Callout>

      <H3>Two cycles</H3>
      <p>Same principle in two outcomes — the happy path, and the path the server rejects.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Apply → Undo.</b> The row removes immediately, a Snackbar appears with Undo. Undo is «tapped» within the window — the row returns to its place, the Snackbar dismisses. Loops to show the full cycle.">
          <OptimisticUndoProto />
        </FrameCell>
        <FrameCell caption="<b>Server failure → auto-rollback.</b> The row removes immediately, the Snackbar shows Undo. The server rejects: the row returns to its place, the Snackbar swaps to «Couldn't remove · Retry». Loops to show the full cycle.">
          <OptimisticFailureProto />
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Apply visually first, sync second.</b> The change lands in the UI the moment the user taps — no spinner between the tap and the result. Server confirmation happens in the background.",
        "<b>Every optimistic action carries an Undo window.</b> A short reversal window opens with the action and closes on its own; tap Undo within it and the change reverses, ignore it and the action commits.",
        "<b>Server failure auto-rolls back.</b> The UI reverts on its own — never silently. A snackbar explains what failed; the recovery action is Retry, not Undo (the change is already reversed).",
        "<b>One at a time.</b> A new optimistic action replaces the previous one and resets the window. Undo always applies to the most recent action; multi-action undo is out of scope.",
        "<b>Reserved for reversible actions only.</b> Remove, archive, dismiss, mark-read — yes. Payment, account deletion, anything irreversible — no.",
        "<b>Commit-flow dismiss uses the same principle.</b> Closing a commit-flow (Checkout, Pay-now, Place-order) sends the user back to the parent immediately and offers a snackbar to restore the flow with every field still filled. Same Apply-first-sync-second canon — replaces the «Discard progress?» dialog.",
      ]}/>

      <DoDont
        doItem="Use optimistic UI for «Remove from cart». The row disappears the moment the user taps ✕; a Snackbar offers Undo for a few seconds. The cart feels fast, the user retains the safety net."
        dontItem="Don't apply optimistic UI to payment. «Paid» that needs to be undone is not Undo — it's a refund flow. The shorter the path between tap and irreversibility, the less optimistic it should be."
      />
    </Section>
  );
}
window.POptimistic = POptimistic;
