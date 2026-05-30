// ---------------------------------------------------------------
// P05 — Final Flow Screens
// ---------------------------------------------------------------

// Marketing slot for the optional middle area — section header + 1–3 cards
// or a single promo banner. Per Ch05: «The space below the confirmation can
// surface subordinate content — seasonal categories, accessory shortcuts,
// offers — so long as the primary CTA stays the boss.»
function FinalMarketingSlot({ kind = "cards", count = 3 }) {
  if (kind === "banner") {
    return (
      <div style={{ marginTop: 18, textAlign: "left" }}>
        <div className="skel-row" style={{ width: "45%", height: 8, margin: "0 0 8px" }}/>
        <div style={{
          height: 84, background: "#ececec", borderRadius: 8,
        }}/>
      </div>
    );
  }
  return (
    <div style={{ marginTop: 18, textAlign: "left" }}>
      <div className="skel-row" style={{ width: "45%", height: 8, margin: "0 0 8px" }}/>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: "#f7f6f4", borderRadius: 8, padding: "10px 12px",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            <div className="skel-row" style={{ width: "80%", height: 8, margin: 0 }}/>
            <div className="skel-row" style={{ width: "55%", height: 7, margin: 0 }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// Shared skeleton — illustration, title, message at top; optional marketing
// slot below the message; primary CTA + optional text button pinned at bottom.
function FinalScreenBody({ icon, iconColor = "#9a9a9a", title, message, primary, secondary, marketing }) {
  return (
    <FullscreenSheet title="" step="" close={false}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", textAlign: "center" }}>
        <div style={{ paddingTop: 20 }}>
          <div style={{
            width: 70, height: 56, background: "#ececec", borderRadius: 6,
            margin: "10px auto 16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: iconColor, fontSize: 22,
          }}>{icon}</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 11, color: "#6b6b6b", lineHeight: 1.5, padding: "0 12px" }}>
            {message}
          </div>
        </div>
        {marketing && <FinalMarketingSlot {...(typeof marketing === "object" ? marketing : {})} />}
        <div style={{ flex: 1 }}/>
        <div style={{ padding: "0 0 16px" }}>
          <div style={{
            height: 44, background: "#111", color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600, marginBottom: secondary ? 12 : 0,
          }}>{primary}</div>
          {secondary && (
            <div style={{
              textAlign: "center", fontSize: 12, color: "#6b6b6b",
              fontWeight: 500,
            }}>{secondary}</div>
          )}
        </div>
      </div>
    </FullscreenSheet>
  );
}

function P05FinalScreens() {
  const anatAnno = { left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45 };

  return (
    <Section id="p-final">
      <PatternHead num="03" title="Final Flow Screens" category="Presentation"
        lede={<>A <span className="hl">final screen</span> is the end of a flow — success, failed, pending, offline. There must be no dead ends. Every final screen tells the user what happened, and offers a contextual next action that keeps the journey going.</>} />


      <Callout label="Autodoc reading">
        Every flow ends. The end screen is the most underused real estate in the app — the user is at peak engagement, and the screen either uses that moment or wastes it. A final screen that says only «Done» and shows a close button is a wasted moment. Autodoc offers a continuation: after checkout, after registration, after a service booking — there is always at least one contextual next action. The primary CTA <i>is</i> the way out of the final screen; no ✕ in the header.
      </Callout>

      <H3>Anatomy</H3>
      <FrameRow>
        <FrameCell caption="<b>Anatomy of a final screen.</b> Five pieces — illustration, title, message, an optional marketing slot, and the action area at the bottom (primary CTA + optional subordinate text button).">
          <div className="annot-phone" style={{ padding: "0 460px 0 0" }}>
            <Phone size="lg">
              <FinalScreenBody
                icon="▱"
                title="Title"
                message="One or two sentences explaining what happened, in plain language."
                primary="Primary action"
                secondary="Secondary action"
                marketing={{ kind: "cards", count: 3 }}
              />
            </Phone>
            <div className="anno" style={{ top: 114, ...anatAnno }}>
              <span className="num">1</span><b>Illustration.</b>
            </div>
            <div className="anno" style={{ top: 189, ...anatAnno }}>
              <span className="num">2</span><b>Title.</b> One short line naming the outcome — «Order placed», «Couldn't process payment».
            </div>
            <div className="anno" style={{ top: 237, ...anatAnno }}>
              <span className="num">3</span><b>Message.</b> One or two sentences in plain language. Never «Error 503».
            </div>
            <div className="anno" style={{ top: 316, ...anatAnno }}>
              <span className="num">4</span><b>Marketing slot (optional).</b> Subordinate content below the message — section header + cards (recommendations, accessory shortcuts, seasonal categories) or a single banner. Configurable on the product side, never hard-coded.
            </div>
            <div className="anno" style={{ top: 475, ...anatAnno }}>
              <span className="num">5</span><b>Action area.</b> Filled primary CTA carries the next step (Go to My Orders, Retry, Browse catalog) — the only way out, no ✕ in the header. Optional text button beneath offers a subordinate path.
            </div>
          </div>
        </FrameCell>
      </FrameRow>

      <H3>Variants</H3>
      <p>The skeleton is constant. What changes between variants is the <b>illustration</b>, the <b>copy</b>, the <b>button labels</b>, and whether the marketing slot is filled. Four canonical states share the shape: success, failed, pending, offline. The marketing slot can appear under any of them — most often under success, where the user is at peak engagement and there is the most to gain from a contextual next thing.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Plain final screen.</b> No marketing — illustration + title + message + CTA. Used when the screen's job is purely to confirm or recover (failed, offline) and offering shortcuts would feel pushy.">
          <Phone>
            <FinalScreenBody
              icon="✓"
              iconColor="#111"
              title="Order placed"
              message="Your order is on its way. We'll let you know once it ships."
              primary="Go to My Orders"
              secondary="Continue shopping"
            />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>With marketing — cards.</b> Section header + 1–3 cards between message and CTA. Recommendations, accessory shortcuts, seasonal categories. The primary CTA still owns the bottom edge — the slot is subordinate.">
          <Phone>
            <FinalScreenBody
              icon="✓"
              iconColor="#111"
              title="Order placed"
              message="Your order is on its way."
              primary="Go to My Orders"
              secondary="Continue shopping"
              marketing={{ kind: "cards", count: 3 }}
            />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>With marketing — banner.</b> One taller promo card instead of a stack — used when the contextual offer is a single curated thing (a single discount, a single category, a single product). Same rule: the primary CTA is still the boss.">
          <Phone>
            <FinalScreenBody
              icon="✓"
              iconColor="#111"
              title="Order placed"
              message="Your order is on its way."
              primary="Go to My Orders"
              secondary="Continue shopping"
              marketing={{ kind: "banner" }}
            />
          </Phone>
        </FrameCell>
      </div>

      <H3>Edge case — Chat ended</H3>
      <p>The Chat ended screen sits slightly outside the success / failed / pending / offline triad. It closes a support conversation and asks for a rating. The structure is different: a star row, an optional comment field, and a Submit primary with a Skip text button.</p>

      <FrameRow>
        <FrameCell caption="<b>Chat ended.</b> The support conversation has finished. A five-star row invites a rating, an optional comment field captures detail, Submit commits the feedback. Skip text button below offers an exit without rating.">
          <Phone size="lg">
            <FullscreenSheet title="Chat ended" step="" close={false}>
              <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "8px 4px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, textAlign: "center" }}>
                    How was the support?
                  </div>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 18 }}>
                    {[0,1,2,3,4].map(i => (
                      <div key={i} style={{
                        width: 26, height: 26, fontSize: 16,
                        color: i < 3 ? "#111" : "#d8d8d8",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>★</div>
                    ))}
                  </div>
                  <div style={{
                    border: "1px solid #d8d8d8", borderRadius: 8,
                    height: 70, padding: 10, fontSize: 11, color: "#9a9a9a",
                  }}>Leave a comment (optional)</div>
                </div>
                <div style={{ flex: 1 }}/>
                <div style={{ padding: "0 0 16px" }}>
                  <div style={{
                    height: 44, background: "#111", color: "#fff", borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 600, marginBottom: 12,
                  }}>Submit</div>
                  <div style={{
                    textAlign: "center", fontSize: 12, color: "#6b6b6b",
                    fontWeight: 500,
                  }}>Skip</div>
                </div>
              </div>
            </FullscreenSheet>
          </Phone>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Never a dead end.</b> Every final screen offers at least one contextual primary action. The primary CTA is the way out — no ✕ in the header, no bare «Done» that leads nowhere.",
        "<b>Copy stays human.</b> The message names what happened in plain language — never an error code, never a status string. Errors explain and offer a way to recover; pending names the wait; offline names the connection problem and stays optimistic.",
        "<b>Marketing slot is optional and subordinate.</b> When present, it sits between message and CTA — section header + cards or a single banner. Content is configurable on the product side, not hard-coded. The primary CTA stays the visual boss; the slot must not compete for the tap.",
      ]}/>

      <DoDont
        doItem="After payment success, show the order summary, a Go to My Orders primary CTA, and a Continue shopping text button beneath. The user lands on their order or restarts browsing — either way, the flow continues."
        dontItem="Don't end checkout with just «Thank you» and a close button. The user is at peak intent — at minimum, give them somewhere to go next."
      />
    </Section>
  );
}
window.P05FinalScreens = P05FinalScreens;
window.FinalScreenBody = FinalScreenBody;
window.FinalMarketingSlot = FinalMarketingSlot;
