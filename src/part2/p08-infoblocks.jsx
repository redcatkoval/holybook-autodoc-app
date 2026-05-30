// ---------------------------------------------------------------
// P08 — Infoblocks
// ---------------------------------------------------------------

function P08Infoblocks() {
  const infoTriggerAnnoBase = {
    left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45,
  };

  return (
    <Section id="p-infoblocks">
      <PatternHead num="06" title="Infoblocks" category="Presentation"
        lede={<>An <span className="hl">infoblock</span> is contextual help in two shapes. A <b>sheet infoblock</b> opens when the user taps an ⓘ icon next to something they might not understand — it explains the term, its cause and effect, without removing them from the screen. An <b>inline infoblock</b> sits in the content flow as a coloured banner — Info or Warning — to flag a state the user needs to be aware of right now.</>} />


      <Callout label="Autodoc reading">
        An infoblock keeps the screen clean while making the explanation one tap away. Some things are too detailed to inline and too important to hide — tax breakdowns, fitment compatibility rules, warranty conditions, terms specific to one product. Writing them on the screen drowns the primary content; hiding them in FAQ makes them invisible. The ⓘ icon is the trigger; the sheet is the answer; the underlying screen never moves. <b>Surface constraint</b>: the sheet form lives only inside fullscreen flows (PDP, Checkout, vehicle detail) — by the no-sheet-over-sheet rule it doesn't open over the main app surface. When an explanation is needed on the main surface, use the inline infoblock instead.
      </Callout>

      <H3>Sheet infoblock — the trigger</H3>
      <p>The trigger is always the same glyph — ⓘ — placed next to the term it explains. The user learns it once and recognises it everywhere. A textual «Info Link» on a row is the same trigger in word form: tapping it opens the same bottom sheet. Quiet by default; one level of visual loudness only.</p>

      <FrameRow>
        <FrameCell caption="<b>Where info-triggers can live.</b> The ⓘ icon goes wherever the user might have a question — next to a term, a number, a condition. The goal is simple: give the user a way to get the explanation in place, without leaving the screen.">
          <div className="annot-phone" style={{ padding: "0 460px 0 0" }}>
            <Phone size="lg">
              <PhoneNavBar title="Title Parent Screen" left="back" right="none" />
              <div style={{ padding: "88px 14px 0", fontSize: 12, lineHeight: "18px", color: "#2a2a2a" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    Label <span style={{ color: "#ff5a1f", fontSize: 11 }}>ⓘ</span>
                  </div>
                </div>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 0", borderBottom: "1px solid #ececec",
                }}>
                  <span>Title <span style={{ color: "#ff5a1f", fontSize: 11 }}>ⓘ</span></span>
                  <span style={{ color: "#9a9a9a" }}>Value</span>
                </div>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 0", borderBottom: "1px solid #ececec",
                }}>
                  <span>Title</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#9a9a9a" }}>Value</span>
                    <span style={{ color: "#ff5a1f", fontSize: 11 }}>ⓘ</span>
                  </span>
                </div>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 0", borderBottom: "1px solid #ececec",
                }}>
                  <span>Title</span>
                  <span style={{ color: "#ff5a1f", fontSize: 11 }}>ⓘ</span>
                </div>

                <div style={{ position: "relative", marginTop: 14 }}>
                  <div style={{
                    background: "#fff", border: "1px solid #d8d8d8", borderRadius: 8,
                    padding: "10px 12px",
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      marginBottom: 6,
                    }}>
                      <span style={{ fontWeight: 600 }}>Widget</span>
                      <span style={{ color: "#ff5a1f", fontSize: 11 }}>ⓘ</span>
                    </div>
                    <div style={{ height: 30, background: "#ececec", borderRadius: 4 }} />
                  </div>
                </div>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 0", borderBottom: "1px solid #ececec", marginTop: 14,
                }}>
                  <span>Title</span>
                  <span style={{ fontSize: 11, color: "#111", textDecoration: "underline" }}>Info Link</span>
                </div>
              </div>
            </Phone>
            <div className="anno" style={{ top: 77, ...infoTriggerAnnoBase }}>
              <span className="num">1</span><b>Section header label.</b> <span style={{ whiteSpace: "nowrap" }}>Label ⓘ</span> — clarifies what a whole group of rows means.
            </div>
            <div className="anno" style={{ top: 118, ...infoTriggerAnnoBase }}>
              <span className="num">2</span><b>Row with ⓘ next to the title.</b> Title ⓘ … Value — the ⓘ explains the <i>term</i>. The value stays visible on the trailing edge.
            </div>
            <div className="anno" style={{ top: 158, ...infoTriggerAnnoBase }}>
              <span className="num">3</span><b>Row with ⓘ next to the value.</b> Title … Value ⓘ — the ⓘ explains the <i>value</i> itself (how it was calculated, what unit, what range). Sits with the value, not the title.
            </div>
            <div className="anno" style={{ top: 199, ...infoTriggerAnnoBase }}>
              <span className="num">4</span><b>Row with ⓘ as trailing icon.</b> Title … ⓘ — the icon is the only trailing element; tap it to open the sheet.
            </div>
            <div className="anno" style={{ top: 264, ...infoTriggerAnnoBase }}>
              <span className="num">5</span><b>Widget header, top-right.</b> The card explains itself via ⓘ in the corner; the body stays uncluttered.
            </div>
            <div className="anno" style={{ top: 329, ...infoTriggerAnnoBase }}>
              <span className="num">6</span><b>Textual «Info Link» on a row.</b> A word-link as the trailing element — same target sheet as ⓘ, just in word form.
            </div>
          </div>
        </FrameCell>
      </FrameRow>

      <H3>Sheet infoblock — content</H3>
      <p>One sheet shell, anything inside. Combine freely — prose, image, bulleted list, two-column table — in any order the topic needs. Keep it tidy and reasonably short; if it doesn't fit the capped height, it scrolls inside the sheet while the title stays pinned. No Continue button: the sheet explains, not decides.</p>

      <FrameRow>
        <FrameCell caption="<b>One sheet, any combination.</b> The shell accepts prose, image, list, table in any order. Treat it like a short article: pick the shapes the topic actually needs, keep each block short, let the title carry the topic.">
          <Phone size="lg">
            <Stub note="parent" />
            <InfoTooltip title="Title" height={0.82}
              body={<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div className="skel-row" style={{ width: "92%", height: 8, margin: "0 0 5px" }}/>
                  <div className="skel-row" style={{ width: "85%", height: 8, margin: "0 0 5px" }}/>
                  <div className="skel-row" style={{ width: "60%", height: 8, margin: 0 }}/>
                </div>
                <div style={{
                  width: "100%", height: 70, background: "#ececec", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#9a9a9a", fontSize: 16,
                }}>▱</div>
                <ul style={{ margin: 0, paddingLeft: 16, listStyle: "disc" }}>
                  {[78, 64, 82].map((w, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      <div className="skel-row" style={{ width: `${w}%`, height: 7, margin: 0, display: "inline-block" }}/>
                    </li>
                  ))}
                </ul>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {[0,1,2].map(i => (
                      <tr key={i}>
                        <td style={{ padding: "6px 0", borderBottom: i < 2 ? "1px solid #ececec" : "none" }}>
                          <div className="skel-row" style={{ width: "55%", height: 7, margin: 0 }}/>
                        </td>
                        <td style={{ padding: "6px 0", borderBottom: i < 2 ? "1px solid #ececec" : "none", textAlign: "right" }}>
                          <div className="skel-row" style={{ width: "35%", height: 7, margin: "0 0 0 auto" }}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div className="skel-row" style={{ width: "45%", height: 8, margin: 0 }}/>
                  <span style={{
                    fontSize: 11, color: "#111",
                    textDecoration: "underline", textDecorationStyle: "dotted",
                    textUnderlineOffset: 2,
                  }}>link</span>
                </div>
              </div>}
            />
          </Phone>
        </FrameCell>
      </FrameRow>

      <H3>Inline infoblock</H3>
      <p>A neutral banner in the content flow — not floating, not modal. Two flavours: <b>Info</b> (ⓘ, neutral fact) and <b>Warning</b> (⚠, something is incomplete or risky). Same monochrome plate in both — the icon carries the meaning, no colour-coded backgrounds. An optional action is either a <b>tertiary text button</b> on the trailing edge of the body (for discrete actions like «Add a car») or a <b>dotted-underline link</b> woven inline into the sentence (for «Learn more»-style doorways) — one or the other, never both.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Info — neutral fact.</b> ⓘ icon. Use when the user benefits from knowing something but no action is required. Optional text button only when there's a genuine doorway.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "88px 14px 0" }}>
              <div style={{
                background: "#fff", border: "1px solid #1c1c1c", borderRadius: 10,
                padding: "12px", display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", border: "1px solid #1c1c1c",
                  color: "#1c1c1c", fontFamily: "Georgia, serif", fontStyle: "italic",
                  fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0, marginTop: 1, lineHeight: 1,
                }}>i</div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                  <div className="skel-row" style={{ width: "92%", height: 8, margin: 0 }}/>
                  <div className="skel-row" style={{ width: "70%", height: 8, margin: 0 }}/>
                </div>
              </div>
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Warning — something is incomplete or risky.</b> ⚠ icon, body text, plus an optional <b>tertiary text button</b> on the trailing edge of the body — same line, vertically centered. No underline — that style is reserved for links. Use when ignoring it means something goes wrong (wrong part, missed delivery, lost data).">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "88px 14px 0" }}>
              <div style={{
                background: "#fff", border: "1px solid #1c1c1c", borderRadius: 10,
                padding: "12px",
                display: "flex", gap: 10, alignItems: "center",
              }}>
                <div style={{
                  width: 16, height: 16, color: "#1c1c1c", fontSize: 13,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, lineHeight: 1,
                }}>⚠</div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                  <div className="skel-row" style={{ width: "90%", height: 8, margin: 0 }}/>
                  <div className="skel-row" style={{ width: "65%", height: 8, margin: 0 }}/>
                </div>
                <span style={{
                  color: "#1c1c1c", fontSize: 11, fontWeight: 600, flexShrink: 0,
                }}>Action</span>
              </div>
            </div>
          </Phone>
        </FrameCell>
      </div>

      <DoDont
        doItem="Put an ⓘ next to «Estimated delivery date» in checkout. The user taps, reads how the date is calculated, dismisses, continues."
        dontItem="Don't open an infoblock that contains a Continue button. If the user has to act, it's a sheet or a dialog, not an infoblock."
      />
    </Section>
  );
}
window.P08Infoblocks = P08Infoblocks;
