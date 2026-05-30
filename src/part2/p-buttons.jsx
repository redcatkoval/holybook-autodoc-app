// ---------------------------------------------------------------
// P — Action hierarchy (Part II · Controls)
// ---------------------------------------------------------------
// Four roles, footer combinations, and how a Primary migrates with the
// context. Extracted from Ch06 State principles where it had been living.

function PBPrimary({ label }) {
  return (
    <div style={{
      height: 44, background: "#111", color: "#fff", borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 600,
    }}>{label}</div>
  );
}
function PBSecondary({ label }) {
  return (
    <div style={{
      height: 44, background: "#fff", color: "#111",
      border: "1.5px solid #111", borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 600,
    }}>{label}</div>
  );
}
function PBTertiary({ label }) {
  return (
    <div style={{
      textAlign: "center", fontSize: 12, color: "#6b6b6b",
      fontWeight: 500, padding: "6px 0",
    }}>{label}</div>
  );
}
function PBFooterStack({ children }) {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      padding: "12px 16px 24px", display: "flex", flexDirection: "column", gap: 10,
      background: "#fff", borderTop: "1px solid #ececec",
    }}>{children}</div>
  );
}
function PBFooterPreviewBody() {
  return (
    <div style={{ padding: "100px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ height: 14, background: "#ececec", borderRadius: 4, width: "70%" }}/>
      <div style={{ height: 10, background: "#f1f1f1", borderRadius: 4, width: "90%" }}/>
      <div style={{ height: 10, background: "#f1f1f1", borderRadius: 4, width: "85%" }}/>
      <div style={{ height: 10, background: "#f1f1f1", borderRadius: 4, width: "60%" }}/>
      <div style={{ height: 70, background: "#ececec", borderRadius: 8, marginTop: 8 }}/>
      <div style={{ height: 70, background: "#ececec", borderRadius: 8 }}/>
    </div>
  );
}
function PBProductCardPreview() {
  return (
    <div style={{
      display: "flex", gap: 10, padding: 10,
      border: "1px solid #ececec", borderRadius: 10,
    }}>
      <div style={{ width: 56, height: 56, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="skel-row" style={{ width: "70%", height: 8, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
        <div className="skel-row" style={{ width: "50%", height: 7, margin: 0 }}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <div className="skel-row" style={{ width: 40, height: 10, margin: 0, background: "#b8b8b8" }}/>
          <div style={{
            height: 26, width: 26, background: "#111", color: "#fff", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 600,
          }}>+</div>
        </div>
      </div>
    </div>
  );
}

function PButtons() {
  return (
    <Section id="p-buttons">
      <PatternHead title="Action hierarchy"
        lede={<>Every screen is built around a single verb — one action that closes the flow — and every other tappable element exists <span className="hl">in service of that verb</span>, never in competition with it. Four roles cover everything the user can tap.</>} />

      <H3>Four roles</H3>
      <Rules items={[
        "<b>Primary CTA.</b> The verb of the screen. One per screen — while a primary is anchored, no other button of equal weight stands next to it.",
        "<b>Secondary button.</b> A bordered button that lives <i>inside</i> a block that carries its own task (a card, a section) — never beside the Primary in the sticky footer, where it would read as a second main verb.",
        "<b>Tertiary text button.</b> A subordinate path beneath the primary — semantically a button, visually the quietest. Used when the screen offers one main verb and one quiet way out.",
        "<b>Link.</b> Not an action — opens content (Terms, Privacy, Help). Visually distinct from a button so the user reads «goes somewhere», not «does something».",
      ]}/>

      <H3>Footer combinations</H3>
      <p>When the screen has a sticky footer, the footer carries the screen's main goal.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Primary alone.</b> The default — one verb closes the flow.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <PBFooterPreviewBody />
            <PBFooterStack>
              <PBPrimary label="Continue" />
            </PBFooterStack>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Primary + Tertiary.</b> Subordinate way out beneath the primary (Continue / Skip, Send / Cancel). The strongest contrast.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <PBFooterPreviewBody />
            <PBFooterStack>
              <PBPrimary label="Continue" />
              <PBTertiary label="Skip" />
            </PBFooterStack>
          </Phone>
        </FrameCell>
      </div>

      <H3>Primary migrates with the context</H3>
      <p>The same action can play different roles depending on focus. Inside a listing, each card carries its own Primary (Add to cart) — many primaries on the screen are fine because each lives in its own card. The moment the user opens one card as a full screen, that Primary becomes <i>the</i> Primary of the screen, anchored as a sticky footer.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Listing — many Primaries, one per card.</b> Each card is an isolated context; its Primary belongs to that card.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "100px 14px 0", display: "flex", flexDirection: "column", gap: 10 }}>
              {[0,1,2].map(i => (
                <PBProductCardPreview key={i} />
              ))}
            </div>
            <BottomNav active="catalog"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Detail — same action becomes the screen's Primary.</b> The user opened one card as a full screen. Add to cart is now the only Primary, anchored as a sticky footer.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "100px 16px 130px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ height: 160, background: "#ececec", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#9a9a9a", fontSize: 28 }}>▱</div>
              <div className="skel-row" style={{ width: "75%", height: 14, margin: "0", background: "#b8b8b8", opacity: 0.85 }}/>
              <div className="skel-row" style={{ width: "92%", height: 8, margin: 0 }}/>
              <div className="skel-row" style={{ width: "70%", height: 8, margin: 0 }}/>
              <div className="skel-row" style={{ width: "30%", height: 14, margin: "4px 0 0", background: "#b8b8b8" }}/>
            </div>
            <PBFooterStack>
              <PBPrimary label="Add to cart" />
            </PBFooterStack>
          </Phone>
        </FrameCell>
      </div>

      <H3>Primary inside content</H3>
      <p>Not every screen anchors a footer. When the body is short and self-contained, the verb sits inside the content — the headline says what the screen is, the Primary is the verb, the Tertiary is the quiet way out.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Primary inside content.</b> No footer — the verb sits in the body, secondaries below defer. Same hierarchy, different placement.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "100px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="skel-row" style={{ width: "75%", height: 14, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
              <div className="skel-row" style={{ width: "90%", height: 8, margin: 0 }}/>
              <div className="skel-row" style={{ width: "70%", height: 8, margin: 0 }}/>
              <div style={{ marginTop: 4 }}><PBPrimary label="Primary action" /></div>
              <div style={{ marginTop: -6 }}><PBTertiary label="Subordinate action" /></div>
            </div>
          </Phone>
        </FrameCell>
      </div>

      <H3>Anti-patterns</H3>
      <p>Three ways the hierarchy collapses: pairing the Primary with a heavy Secondary in the footer, stacking too many levels, and shipping two equal-weight verbs on a normal screen.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Primary + bordered Secondary in the footer.</b> A boxed Secondary next to the Primary reads as a second main button and competes with the verb. Demote Cancel to a Tertiary text button, or move it into the nav bar.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <PBFooterPreviewBody />
            <PBFooterStack>
              <PBPrimary label="Save" />
              <PBSecondary label="Cancel" />
            </PBFooterStack>
            <div style={{ position: "absolute", inset: 0, border: "2px solid #c62828", borderRadius: 36, pointerEvents: "none" }}/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Three levels in one footer.</b> Primary + Secondary + Tertiary stacked together loads the footer with decisions and dilutes the main verb. Cut to two levels — push the third into the body or remove it.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <PBFooterPreviewBody />
            <PBFooterStack>
              <PBPrimary label="Confirm" />
              <PBSecondary label="Edit" />
              <PBTertiary label="Cancel" />
            </PBFooterStack>
            <div style={{ position: "absolute", inset: 0, border: "2px solid #c62828", borderRadius: 36, pointerEvents: "none" }}/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Two competing primaries.</b> Two equal-weight CTAs split attention; neither reads as primary. Pick one verb for the screen, demote the other.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "100px 14px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="skel-row" style={{ width: "70%", height: 14, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
              <div className="skel-row" style={{ width: "90%", height: 8, margin: 0 }}/>
            </div>
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 31, display: "flex", gap: 8 }}>
              <div style={{ flex: 1, height: 44, background: "#111", color: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>Primary action</div>
              <div style={{ flex: 1, height: 44, background: "#111", color: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>Another primary</div>
            </div>
            <div style={{ position: "absolute", inset: 0, border: "2px solid #c62828", borderRadius: 36, pointerEvents: "none" }}/>
          </Phone>
        </FrameCell>
      </div>

      <DoDont
        doItem="Pick one verb per screen. Anchor it as the Primary, with at most one quiet Tertiary text button beneath. Let the Primary own the moment."
        dontItem="Don't pair the Primary with a bordered Secondary in the footer. Don't stack three levels. Don't ship two equal-weight Primaries on a normal screen. Don't promote a block-level action to Primary when the screen already carries a sticky footer Primary."
      />
    </Section>
  );
}
window.PButtons = PButtons;
