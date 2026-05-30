// ---------------------------------------------------------------
// P — Context Menu
// ---------------------------------------------------------------

const { useState: useCM } = React;
const CM_ICON = "◧";
const CM_OPTIONS = ["Option 1", "Option 2", "Option 3"];

// Shared row renderer for option lists. iconSide: "left" (sheet) | "right" (menu).
function CMOption({ label, iconSide, onSelect, last }) {
  const Icon = (
    <span style={{ fontSize: 13, color: "#2a2a2a", width: 14, textAlign: "center" }}>{CM_ICON}</span>
  );
  return (
    <div onClick={onSelect} style={{
      padding: "12px 14px", fontSize: 13, color: "#111",
      borderBottom: last ? "none" : "1px solid #ececec",
      display: "flex", alignItems: "center", gap: 10,
      justifyContent: iconSide === "right" ? "space-between" : "flex-start",
      cursor: "pointer", userSelect: "none",
    }}>
      {iconSide === "left" && Icon}
      <span style={{ flex: iconSide === "right" ? 1 : "none" }}>{label}</span>
      {iconSide === "right" && Icon}
    </div>
  );
}

// Long-press helper. delay ~350ms, cancels on move > 5px or release.
function useLongPress(onLongPress) {
  const ref = React.useRef({ timer: null, x: 0, y: 0 });
  return {
    onPointerDown: (e) => {
      ref.current.x = e.clientX; ref.current.y = e.clientY;
      ref.current.timer = setTimeout(onLongPress, 350);
    },
    onPointerMove: (e) => {
      const d = ref.current;
      if (d.timer && (Math.abs(e.clientX - d.x) > 5 || Math.abs(e.clientY - d.y) > 5)) {
        clearTimeout(d.timer); d.timer = null;
      }
    },
    onPointerUp: () => { if (ref.current.timer) { clearTimeout(ref.current.timer); ref.current.timer = null; } },
    onPointerCancel: () => { if (ref.current.timer) { clearTimeout(ref.current.timer); ref.current.timer = null; } },
  };
}

// ---------- Screen-level — auto-loop: idle → bottom sheet rises → option
// highlights → sheet dismisses → idle.
function ScreenLevelPrototype() {
  const [phase, setPhase] = useCM("idle"); // idle → open → close → idle
  const timer = React.useRef(null);
  React.useEffect(() => {
    const cycle = { idle: 1200, open: 2000, close: 350 };
    const next = { idle: "open", open: "close", close: "idle" };
    timer.current = setTimeout(() => setPhase(next[phase]), cycle[phase]);
    return () => clearTimeout(timer.current);
  }, [phase]);
  const sheetVisible = phase === "open" || phase === "close";
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="vmore" />
      <div style={{
        position: "absolute", top: 76, left: 0, right: 0, bottom: 0,
        zIndex: 0,
      }}>
        <Stub note="screen body" />
      </div>
      {sheetVisible && (
        <>
          <div style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 5,
            opacity: phase === "close" ? 0 : 1,
            transition: "opacity 0.32s ease-out",
          }}/>
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            height: "42%", background: "#fff",
            borderRadius: "16px 16px 0 0",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.18)",
            zIndex: 6, padding: "8px 0",
            transform: phase === "close" ? "translateY(100%)" : "translateY(0)",
            transition: "transform 0.32s ease-out",
          }}>
            <div style={{ width: 36, height: 4, background: "#d8d8d8", borderRadius: 2, margin: "8px auto 6px" }}/>
            {CM_OPTIONS.map((opt, i) => (
              <CMOption key={i} label={opt} iconSide="right" last={i === CM_OPTIONS.length - 1} />
            ))}
          </div>
        </>
      )}
    </Phone>
  );
}

// ---------- Item-level — auto-loop: idle → floating menu appears next to
// a target row → menu dismisses → idle.
function ItemLevelPrototype() {
  const ROWS = 5;
  const TARGET = 1;
  const [phase, setPhase] = useCM("idle"); // idle → open → close → idle
  const timer = React.useRef(null);
  React.useEffect(() => {
    const cycle = { idle: 1200, open: 2000, close: 220 };
    const next = { idle: "open", open: "close", close: "idle" };
    timer.current = setTimeout(() => setPhase(next[phase]), cycle[phase]);
    return () => clearTimeout(timer.current);
  }, [phase]);
  const menuVisible = phase === "open" || phase === "close";
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ paddingTop: 76, position: "relative", minHeight: "100%" }}>
        {Array.from({ length: ROWS }).map((_, i) => {
          const isTarget = i === TARGET;
          return (
            <div key={i} style={{
              height: 50, background: "#ececec", borderRadius: 6,
              margin: "6px 12px", position: "relative",
              display: "flex", alignItems: "center", paddingLeft: 14,
              fontSize: 12, color: "#6b6b6b", fontFamily: '"JetBrains Mono", monospace',
            }}>
              Card
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 28, height: 50,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, color: "#2a2a2a", fontWeight: 700, lineHeight: 1,
              }}>⋮</div>
              {isTarget && menuVisible && (
                <div style={{
                  position: "absolute", top: 46, right: 4,
                  background: "#fff", borderRadius: 10,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
                  border: "1px solid #ececec",
                  minWidth: 160, zIndex: 10, overflow: "hidden",
                  opacity: phase === "close" ? 0 : 1,
                  transform: phase === "close" ? "translateY(-4px)" : "translateY(0)",
                  transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                }}>
                  {CM_OPTIONS.map((opt, j) => (
                    <CMOption key={j} label={opt} iconSide="right" last={j === CM_OPTIONS.length - 1} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Phone>
  );
}

function P12ContextMenu() {
  return (
    <Section id="p-contextmenu">
      <PatternHead num="01" title="Context Menus" category="Actions on items"
        lede={<>A <span className="hl">context menu</span> provides quick access to secondary actions for a specific object on the screen — copy, share, edit, delete — without interrupting the user's workflow. Triggered by a long press or by tapping a ⋮ icon, a chevron, or a labelled trigger on the object itself.</>} />

      <Callout label="Why context menus">
        A context menu is a quiet shortcut for actions that the screen does not need to show on its own. Two triggers reach it — a long-press anywhere on the target, and a ⋮ icon for users who never long-press. The two are siblings: one fast, one obvious. Where the menu appears depends on what the trigger relates to: if it applies to the whole screen (sort, filter, refresh, settings) it rises as a bottom sheet; if it applies to one specific item in a list (copy this row, delete this row) it floats next to that item. The placement tells the user what the actions apply to. Critical operations are never hidden in a context menu alone — most users will never find them there.
      </Callout>

      <H3>Two scopes</H3>
      <p>Same idea — a quick list of actions — placed differently depending on what the actions apply to. Placement is the canon: where the menu sits tells the user what it operates on.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Screen-level.</b> Triggered by ⋮ in the navigation bar or a long-press on the body. Rises as a bottom sheet — applies to the current screen as a whole (settings, refresh, manage). The screen dims behind; tap-out or selection dismisses. Loops to show the full cycle.">
          <ScreenLevelPrototype />
        </FrameCell>
        <FrameCell caption="<b>Item-level.</b> Triggered by ⋮ on a specific row or a long-press on it. A small floating menu attaches to that row — applies to that one item (copy, share, edit, delete). The rest of the list stays visible. Loops to show the full cycle.">
          <ItemLevelPrototype />
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Placement signals scope.</b> Bottom sheet = applies to the whole screen. Floating menu attached to the row = applies to that row. The position is the canon — don't break it.",
        "<b>Screen-level sheet lives in fullscreen flows.</b> The screen-level form is a bottom sheet, so it follows the no-sheet-over-sheet rule — never rises over the main app surface. The item-level floating menu is a popover, not a sheet, and can attach to a row on any surface.",
        "<b>Never the only path to a critical action.</b> Context menus are quiet — most users won't long-press to discover them. Anything that destroys or commits must also be reachable through visible UI; the menu is a shortcut, not a hiding place.",
        "<b>Destructive last.</b> Delete and other irreversible actions sit at the end of the list and use the destructive variant.",
      ]}/>


      <DoDont
        doItem="Long-press a saved address to reveal Edit and Delete in a context menu. Power users save a navigation step."
        dontItem="Don't make Delete only available through a long-press. Most users will never find it. Surface destructive actions in the row's edit screen too."
      />
    </Section>
  );
}
window.P12ContextMenu = P12ContextMenu;
