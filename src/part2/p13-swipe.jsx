// ---------------------------------------------------------------
// P13 — Swipe Actions
// ---------------------------------------------------------------

const { useState: useSw, useEffect: useSwEffect, useRef: useSwRef } = React;

// Auto-loop animation: idle → target row slides left → Edit + Delete revealed
// → row snaps back → idle. No interaction.
function SwipeAutoLoop({ rows = 5, target = 1 }) {
  const [phase, setPhase] = useSw("idle"); // idle → revealing → revealed → closing
  const timer = useSwRef(null);
  useSwEffect(() => {
    const cycle = { idle: 1200, revealing: 400, revealed: 1500, closing: 400 };
    const next = { idle: "revealing", revealing: "revealed", revealed: "closing", closing: "idle" };
    timer.current = setTimeout(() => setPhase(next[phase]), cycle[phase]);
    return () => clearTimeout(timer.current);
  }, [phase]);
  const offset = (phase === "revealed" || phase === "revealing" || phase === "closing")
    ? -90 : 0;
  const showActions = phase === "revealing" || phase === "revealed" || phase === "closing";
  return (
    <div style={{ paddingTop: 76 }}>
      {Array.from({ length: rows }).map((_, i) => {
        const isTarget = i === target;
        const off = isTarget ? offset : 0;
        return (
          <div key={i} style={{ overflow: "visible" }}>
            <div style={{
              height: 50, background: "#ececec", borderRadius: 6,
              margin: "2px 12px", position: "relative",
              display: "flex", alignItems: "center", paddingLeft: 14,
              fontSize: 12, color: "#6b6b6b",
              fontFamily: '"JetBrains Mono", monospace',
              transform: `translateX(${off}px)`,
              transition: phase === "revealing" || phase === "closing"
                ? "transform 0.4s ease-out"
                : phase === "revealed"
                  ? "none"
                  : "transform 0.25s ease-out",
            }}>
              Card
              {isTarget && showActions && (
                <div style={{
                  position: "absolute", right: -90, top: 0, height: "100%",
                  display: "flex", alignItems: "center",
                }}>
                  <div style={{
                    width: 44, height: "100%",
                    background: "#2a2a2a", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 500,
                  }}>Edit</div>
                  <div style={{
                    width: 44, height: "100%",
                    background: "#c62828", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 500,
                  }}>Delete</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function P13Swipe() {
  return (
    <Section id="p-swipe">
      <PatternHead num="02" title="Swipe Actions" category="Actions on items"
        lede={<>A <span className="hl">swipe</span> on a list item reveals hidden actions tucked behind the row. The user drags the card to the left, action buttons slide out from underneath. Tapping a button performs the action; releasing without tapping snaps the card back. It is the fastest way to manage list items without leaving the list.</>} />


      <Callout label="Why swipe">
        A swipe is the fastest way to handle a row without leaving it. Some list operations happen often — archiving notifications, removing saved items, marking things done — and going into a detail screen for each one would be slow. A swipe puts the action directly under the user's finger: one drag, one tap, the row is handled. The price of this speed is discovery — a hidden gesture is invisible to anyone who doesn't know it exists. Autodoc uses swipe sparingly, on rows the user manages frequently (saved items, addresses, notifications). Hidden gestures are caches for power users, never the primary path — every swipeable action also has a visible alternative.
      </Callout>

      <FrameRow>
        <FrameCell caption="<b>Swipeable list.</b> A row drags left to reveal Edit and Delete tucked underneath; the destructive option sits rightmost. Loops to show the full cycle.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <SwipeAutoLoop />
          </Phone>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Swipe lives on rows, not on screens.</b> The gesture is bound to a list item, not to a surface. Anything that scopes to the whole screen belongs to a different pattern.",
        "<b>One direction.</b> Only the left-swipe is used, and it always means the same thing: reveal actions on the trailing edge. Mixing right-swipe in with different semantics breaks the canon.",
        "<b>Use it where the action is frequent.</b> Swipe earns its keep on inbox cleanup, list curation, quick edits — operations the user repeats. For once-a-year actions the user will never discover the gesture; don't put them here.",
        "<b>Never the only path.</b> The gesture is invisible to anyone who doesn't know it exists. Anything that destroys or commits must also be reachable through visible UI; swipe is a shortcut, not a hiding place.",
        "<b>Destructive last.</b> Delete and other irreversible actions sit at the trailing edge of the revealed row and use the destructive variant.",
      ]}/>

      <DoDont
        doItem="Add swipe-to-delete on saved items in a wishlist. Users who manage their list often will discover it and save taps."
        dontItem="Don't hide Delete behind only a swipe. New users will never find it, and they will email support asking how to remove an item."
      />
    </Section>
  );
}
window.P13Swipe = P13Swipe;

