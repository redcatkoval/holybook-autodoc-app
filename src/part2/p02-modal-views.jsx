// ---------------------------------------------------------------
// P02 — Modal Views (Bottom Sheet)
// ---------------------------------------------------------------

// Neutral parent for sheet anatomy — a faded Corridor-like body so the sheet
// shape reads without implying it's stacked over the Curtain. By the
// no-sheet-over-sheet rule, bottom sheets live in Corridors, not over the
// Curtain.
function SheetParent() {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fafafa",
      padding: "44px 16px 0",
      opacity: 0.55,
    }}>
      <div className="skel-row" style={{ width: "40%", height: 10, margin: "0 0 14px" }}/>
      <div className="skel-row" style={{ width: "85%", height: 8, margin: "0 0 8px" }}/>
      <div className="skel-row" style={{ width: "70%", height: 8, margin: "0 0 18px" }}/>
      <div style={{ height: 60, background: "#ececec", borderRadius: 8, marginBottom: 10 }}/>
      <div style={{ height: 60, background: "#ececec", borderRadius: 8 }}/>
    </div>
  );
}

// Placeholder rows — list-style body.
function PlaceholderRows({ count = 6 }) {
  const widths = [70, 55, 80, 48, 65, 58];
  return (
    <div style={{ padding: "4px 0" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 4px",
          borderBottom: i < count - 1 ? "1px solid #ececec" : "none",
        }}>
          <div className="skel-row" style={{ width: `${widths[i % widths.length]}%`, height: 8, margin: 0 }}/>
          <span style={{ color: "#9a9a9a", fontSize: 14 }}>›</span>
        </div>
      ))}
    </div>
  );
}

// Placeholder card grid — 2×2 body.
function PlaceholderCards({ selectedIndex = 1 }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "4px 0",
    }}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{
          background: "#f7f6f4", borderRadius: 10, padding: 10,
          border: i === selectedIndex ? "2px solid #111" : "2px solid transparent",
          display: "flex", flexDirection: "column", gap: 8, position: "relative",
        }}>
          <div style={{ width: "100%", height: 56, background: "#ececec", borderRadius: 6 }}/>
          <div className="skel-row" style={{ width: "70%", height: 7, margin: 0 }}/>
          <div className="skel-row" style={{ width: "45%", height: 6, margin: 0 }}/>
          {i === selectedIndex && (
            <span style={{
              position: "absolute", top: 6, right: 6,
              width: 14, height: 14, borderRadius: "50%", background: "#111",
              color: "#fff", fontSize: 9, display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>✓</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Generic mixed body — demonstrates that any content fits inside the sheet
// shell: prose, media, rows, link. Used for both sheet states.
function MixedSheetBody({ extended = false }) {
  return (
    <div style={{ padding: "4px 0", display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div className="skel-row" style={{ width: "92%", height: 8, margin: "0 0 5px" }}/>
        <div className="skel-row" style={{ width: "78%", height: 8, margin: 0 }}/>
      </div>
      <div style={{
        width: "100%", height: 80, background: "#ececec", borderRadius: 8,
      }}/>
      <div>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: i < 2 ? "1px solid #ececec" : "none",
          }}>
            <div className="skel-row" style={{ width: ["60%", "75%", "52%"][i], height: 8, margin: 0 }}/>
            <span style={{ color: "#9a9a9a", fontSize: 14 }}>›</span>
          </div>
        ))}
      </div>
      {extended && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                background: "#f7f6f4", borderRadius: 8, padding: 10,
                display: "flex", flexDirection: "column", gap: 6,
              }}>
                <div style={{ width: "100%", height: 50, background: "#ececec", borderRadius: 5 }}/>
                <div className="skel-row" style={{ width: "70%", height: 7, margin: 0 }}/>
              </div>
            ))}
          </div>
          <div>
            <div className="skel-row" style={{ width: "85%", height: 8, margin: "0 0 5px" }}/>
            <div className="skel-row" style={{ width: "70%", height: 8, margin: 0 }}/>
          </div>
        </>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div className="skel-row" style={{ width: "30%", height: 8, margin: 0 }}/>
        <span style={{
          fontSize: 11, color: "#111",
          textDecoration: "underline", textDecorationStyle: "dotted",
          textUnderlineOffset: 2,
        }}>link</span>
      </div>
    </div>
  );
}

// Placeholder long picker — radio-style selection list (used for tall sheet).
function PlaceholderPickerList({ count = 9, active = 0 }) {
  const widths = [62, 78, 54, 70, 48, 66, 58, 74, 60];
  return (
    <div style={{ padding: "4px 0" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 4px",
          borderBottom: i < count - 1 ? "1px solid #ececec" : "none",
        }}>
          <div className="skel-row" style={{ width: `${widths[i % widths.length]}%`, height: 8, margin: 0 }}/>
          <span style={{
            width: 14, height: 14, borderRadius: "50%",
            border: `1.5px solid ${i === active ? "#111" : "#d8d8d8"}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {i === active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#111" }}/>}
          </span>
        </div>
      ))}
    </div>
  );
}

function P02ModalViews() {
  const anatAnno = { left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45 };

  return (
    <Section id="p-modal">
      <PatternHead num="02" title="Modal Views" category="Presentation"
        lede={<>A <span className="hl">modal view</span> rises from the bottom of the screen as a sheet over the current task. The parent is dimmed by a scrim and ignores taps — the user finishes inside the sheet, then dismisses by swipe-down or tap-outside. The same sheet can be short or stretch up to ~90% of the screen — when more space is needed, the same sheet rises higher.</>} />


      <Callout label="Autodoc reading">
        Autodoc uses one shape for every modal view — a bottom sheet. The sheet always opens the same way (rises from the bottom, drag handle on top, dismiss by tap-outside or swipe-down) and always covers the chrome behind it. Sheet height is a slider, not a category — short sheet for short tasks, tall sheet for long tasks; you don't switch surface, you raise the same one. <b>Modal sheets live in Corridors</b>, not over the Curtain — the Curtain is already a sheet, so a second sheet on top of it would stack drag handles and break the «one sheet at a time» rule. If a sheet-shaped pick is needed from a Curtain screen, the screen is a Corridor candidate; if it's truly inline to the Curtain, use a non-sheet overlay (centered dialog or alert).
      </Callout>

      <H3>Anatomy</H3>
      <FrameRow>
        <FrameCell caption="<b>Bottom sheet anatomy.</b> The five pieces every modal view shares: drag handle, header, body, scrim, and the bottom edge that aligns with the phone — covering the tab bar behind it. The parent here is shown as a faded neutral body — modal sheets live in Corridors (no shell, no Curtain), so the surface behind is the corridor's body, not the app shell.">
          <div className="annot-phone" style={{ padding: "0 460px 0 0" }}>
            <Phone size="lg">
              <SheetParent />
              <BottomSheet title="Title" height={0.55}>
                <PlaceholderRows count={6} />
              </BottomSheet>
            </Phone>
            <div className="anno" style={{ top: 246, ...anatAnno }}>
              <span className="num">1</span><b>Drag handle.</b> Small horizontal bar at the top of the sheet — signals the sheet is draggable. Pulling it down past the threshold dismisses.
            </div>
            <div className="anno" style={{ top: 281, ...anatAnno }}>
              <span className="num">2</span><b>Header.</b> Centered title naming what the sheet is for. Border below separates the header from the body.
            </div>
            <div className="anno" style={{ top: 335, ...anatAnno }}>
              <span className="num">3</span><b>Body.</b> Scrollable content — rows, fields, cards, lists. The body fills the remaining height of the sheet. We show <i>placeholders</i> here, not literal copy — the pattern is shape-agnostic.
            </div>
            <div className="anno" style={{ top: 123, ...anatAnno }}>
              <span className="num">4</span><b>Scrim.</b> Semi-transparent layer between the sheet and the parent — dims everything behind. Tap on the scrim dismisses the sheet.
            </div>
            <div className="anno" style={{ top: 510, ...anatAnno }}>
              <span className="num">5</span><b>Bottom edge.</b> The sheet sits flush with the bottom of the screen — covering the tab bar behind it. The bar stays in the layout; when the sheet dismisses, the bar is in the same place on the same tab.
            </div>
          </div>
        </FrameCell>
      </FrameRow>

      <H3>Two states</H3>
      <p>The sheet has two heights, and the body inside is the designer's canvas — anything can live there (text, media, lists, links, cards, controls). The <b>short</b> state is the default; the <b>tall</b> state rises to ~85% of the screen for longer content. The user can drag-up to expand, or the sheet itself can grow when the body needs more room as the user scrolls.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Short.</b> Default compact state. Drag up or scroll to expand into the tall state.">
          <Phone>
            <SheetParent />
            <BottomSheet title="Title" height={0.45}>
              <MixedSheetBody />
            </BottomSheet>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Tall.</b> Same sheet, expanded to ~85% — a sliver of the parent stays visible at the top to keep drag-down dismiss obvious.">
          <Phone>
            <SheetParent />
            <BottomSheet title="Title" height={0.85}>
              <MixedSheetBody extended />
            </BottomSheet>
          </Phone>
        </FrameCell>
      </div>

      <Rules items={[
        "<b>One shape for every modal view.</b> Bottom sheet — drag handle, header, body, dismiss. Don't reach for a different surface; raise the same sheet.",
        "<b>Sheets stretch.</b> Short sheet for short tasks, tall sheet for long tasks. Sheet height is a slider, not a pattern switch.",
        "<b>No sheet over sheet — sheets live in Corridors.</b> The Curtain is already a sheet, so bottom sheets and action sheets never rise over it. Sheet-shaped picks belong to Corridors, where there's no other sheet to stack against. Anything inside the Curtain that needs a permanent commit affordance is a pinned bar (Cart's Total + Checkout), not a second sheet.",
        "<b>Always dismissable, no ✕.</b> Every sheet dismisses on tap-outside, swipe-down, or drag-handle pull. No ✕ in the header — the gesture set carries the dismiss, and an extra glyph reads as «something to confirm». If the sheet can't be dismissed by gesture, you wanted a Corridor.",
        "<b>One content sheet at a time.</b> Never stack two content sheets. If a sheet needs to lead somewhere, push a screen inside the same sheet. The one allowed exception is a selection sheet (a picker or dropdown) opened from inside another sheet — it's a selection surface, not a content one, and it dismisses back to its parent on commit.",
        "<b>The sheet covers the tab bar.</b> When a sheet is open, it sits over the tab bar visually. The bar stays in the layout — once the sheet closes, the bar is in the same place on the same tab.",
      ]}/>

      <DoDont
        doItem="Use a tall bottom sheet for a long picker — the parent peeks at the top, the list scrolls inside the sheet, one tap commits."
        dontItem="Don't pick a sheet height by 'modal type'. Height follows content. Don't open a second sheet on top of an open one — push a screen inside the same sheet instead."
      />
    </Section>
  );
}
window.P02ModalViews = P02ModalViews;
