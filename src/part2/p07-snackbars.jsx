// ---------------------------------------------------------------
// P07 — Snackbars
// ---------------------------------------------------------------

// Local iOS-style mock chrome used inside FrameCells. Title strip stands in
// for the navigation bar at the top, and the bottom strip stands in for the
// active CTA / toolbar / tab bar. The snackbar floats just above the bottom
// strip — between content and chrome — to make the canonical position
// readable at a glance.
function SnackbarMock({ children }) {
  return (
    <>
      <div style={{
        position: "absolute", top: 40, left: 0, right: 0,
        height: 36, padding: "0 12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "transparent", borderBottom: "1px solid #ececec",
        fontFamily: '-apple-system, "SF Pro Text", sans-serif',
        fontSize: 13, fontWeight: 600, color: "#111",
        zIndex: 1,
      }}>Title</div>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: 68, background: "#ececec", borderTop: "1px solid #d8d8d8",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: "#9a9a9a",
        zIndex: 1,
      }}>CTA button / Tool bars</div>
      {children}
    </>
  );
}

// Snackbar with a circular countdown timer next to the action. While the
// timer runs (e.g., 5s) the snackbar is committed to staying — the ring
// shows the remaining seconds. When it reaches 0 the ring is replaced by an
// explicit × so the user can still dismiss without being forced to act.
function TimerSnackbar({ text = "Item removed", action = "Undo", seconds = 3, total = 5, elapsed = false }) {
  const R = 7;
  const C = 2 * Math.PI * R;
  const progress = elapsed ? 0 : seconds / total;
  return (
    <div style={{
      position: "absolute", left: 12, right: 12, bottom: 80,
      background: "#111", color: "#fff", borderRadius: 8,
      padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
      fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.2)", zIndex: 3,
      fontFamily: '-apple-system, sans-serif',
    }}>
      <span style={{ flex: 1 }}>{text}</span>
      <span style={{ color: "#fff", fontWeight: 600, fontSize: 11 }}>{action}</span>
      {elapsed ? (
        <span style={{
          width: 18, height: 18, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, color: "#fff", opacity: 0.85, lineHeight: 1,
        }}>×</span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: "block" }}>
          <circle cx="9" cy="9" r={R} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
          <circle
            cx="9" cy="9" r={R} fill="none"
            stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            transform="rotate(-90 9 9)"
          />
          <text x="9" y="11.5" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">{seconds}</text>
        </svg>
      )}
    </div>
  );
}

function P07Snackbars() {
  return (
    <Section id="p-snackbars">
      <PatternHead num="05" title="Snackbars" category="Presentation"
        lede={<>A <span className="hl">snackbar</span> is a short notification that appears at the <b>bottom of the screen</b>, confirms an action or reports a system event, and disappears on its own. It does not block the user — they can keep doing what they were doing. It is the quietest way the app talks back.</>} />

      <Callout label="Autodoc reading">
        A snackbar is the quietest possible feedback in the app — a short message at the bottom that auto-dismisses without blocking. Autodoc uses it as the default response to any successful event: «Item added», «List sent», «Saved as draft». These are confirmations, not questions — the user already knows what they did, and a dialog would only interrupt to confirm something obvious. The snackbar acknowledges the event without breaking flow: never interrupts, but still gets noticed.
      </Callout>

      <H3>Key features</H3>
      <ul className="rules">
        <li>Snackbars don&apos;t interrupt the user&apos;s experience.</li>
        <li><b>Visually at the bottom of the screen, just above the tab bar.</b> When there is no tab bar (inside a Corridor), the snackbar sits above the bottom CTA or above the OS bottom inset.</li>
        <li><b>In the z-stack, above the Curtain</b> — snackbars are non-sheet overlays in the chrome band, so they're visible on top of content, never hidden by the Curtain.</li>
        <li><b>One visible at a time.</b> A new event replaces the previous one. The single exception: a <i>persistent</i> snackbar (resume-flow and similar) outranks a transient one — an incoming transient waits until the persistent is resolved by the user.</li>
        <li><b>Yield to blocking overlays.</b> When a system alert or action sheet is open, snackbar events queue behind it and surface once the modal closes; if interrupted by a newer event meanwhile, they drop silently.</li>
      </ul>

      <H3>When it disappears</H3>
      <ul className="rules">
        <li><b>Auto-dismiss</b> — 3–10 seconds, calibrated to the length of the copy. Applies to action-less snackbars and to ambient ones with an optional action (Retry, Undo).</li>
        <li><b>Persistent</b> — stays until the user taps the action or the close button. Used for events the app cannot afford to lose silently — resume-flow on relaunch is the canonical case.</li>
        <li><b>Swipe</b> — both kinds dismiss on a downward swipe.</li>
        <li><b>Tap ×</b> — variants with the close button dismiss on tap.</li>
      </ul>

      <H3>Four variants</H3>
      <p>A snackbar can be passive (just a message), or it can offer one short action — <i>Undo</i>, <i>Retry</i>, or <i>View</i>. The most common variant is action-less and auto-dismisses after a few seconds. Variants with an action stay on screen until the user taps or dismisses; the timer variant adds a visible countdown next to the action so the user can see how much time they have to react.</p>

      <Callout label="When to use «View»">
        <i>View</i> is the canonical forward action. Use it when an event has just happened and the user might want to see the result, or when there is an unfinished task waiting to be resumed: <b>View</b> what was added or changed (something appeared in the cart outside the user&apos;s explicit action), <b>View</b> to return to a task left mid-flow (the user dropped checkout on step 2 and we surface the path back).
      </Callout>

      <Callout label="When to use «Undo»">
        <i>Undo</i> reverses a just-applied optimistic action. Two flavours: (a) reversing a small destructive act — «Item removed · Undo», «Address deleted · Undo»; (b) <b>cancelling a commit corridor</b> — when the user taps ✕ on Checkout (or any Pay-now / Place-order surface), they land back on the parent and a snackbar «Checkout cancelled · Undo» appears. Tap Undo within the window → the corridor re-opens with every field still filled. Auto-dismiss → state drops silently. The snackbar replaces a «Discard progress?» dialog — see Part III · Checkout, Stage 1 and the Optimistic UI pattern.
      </Callout>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Plain snackbar.</b> No action. Auto-dismisses after a few seconds. Used for confirmations the user does not need to act on — «Saved», «Sent», «Done».">
          <Phone>
            <SnackbarMock>
              <Snackbar text="Short notification description" />
            </SnackbarMock>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>With action.</b> A short action — typically <i>Undo</i>, <i>Retry</i>, or <i>View</i>. Auto-dismisses unless the user taps. Used when the user might want to reverse or continue what just happened.">
          <Phone>
            <SnackbarMock>
              <Snackbar text="Item removed from list" action="Undo"/>
            </SnackbarMock>
          </Phone>
        </FrameCell>
      </div>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>With action and explicit close (×).</b> Persistent snackbar — stays until the user taps the action, the close button, or swipes down. Used for resume-flow and other events the app doesn't want to lose by auto-dismiss.">
          <Phone>
            <SnackbarMock>
              <Snackbar text="Short notification description with optional details" action="Action" dismissable persistent/>
            </SnackbarMock>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>With action and visible countdown.</b> The ring next to the action shows the remaining seconds (e.g., 5s). While it runs the snackbar is committed to staying — the user can see how much time they have to tap Undo. When the timer reaches 0, the ring is replaced by an explicit ×, so the snackbar stays one more moment, dismissable on tap. Used when the Undo window matters and we want the user to <i>see</i> it tick.">
          <Phone>
            <SnackbarMock>
              <TimerSnackbar text="Item removed" action="Undo" seconds={3} />
            </SnackbarMock>
          </Phone>
        </FrameCell>
      </div>

      <H3>Behaviour</H3>
      <p>Snackbars sit visually at the bottom of the screen — just above the tab bar when it's there, just above the bottom CTA or OS inset when it's not. In the z-stack they sit above the Curtain, so they're always visible on top of content. Both kinds dismiss on a downward swipe; the variant with × also dismisses on tap.</p>

      <Rules items={[
        "<b>Confirmations and notifications.</b> Snackbars report events. They do not ask questions. If you need an answer, use a dialog instead.",
        "<b>One visible at a time.</b> A new event replaces the previous snackbar. The single exception: a persistent snackbar (resume-flow and similar) outranks a transient one — incoming transients wait until the persistent is resolved.",
        "<b>Visually bottom, z-stack above the Curtain.</b> Snackbars sit just above the tab bar (or above the bottom CTA inside a Corridor) and never get covered by the Curtain.",
        "<b>Yield to blocking overlays.</b> While a system alert or action sheet is on screen, snackbar events wait behind it and surface after the modal closes. If a newer event arrives in the meantime, the older one drops silently.",
        "<b>Auto-dismiss without action.</b> 3 to 10 seconds. Calibrate to the length of the message — long copy gets longer.",
        "<b>Action and persistence are independent.</b> A snackbar can carry an action (Retry, Undo) and still auto-dismiss; it can also be persistent without an action. Persistent (resume-flow) stays until the user resolves it; ambient action variants are a convenience, not a commitment.",
      ]}/>

      <DoDont
        doItem="Show «Item added to cart» as a snackbar at the bottom. The cart icon updates, the snackbar confirms, the user keeps browsing."
        dontItem="Don't use a snackbar for an error that blocks the next step. «Payment failed» deserves a dialog or a screen, not a strip that disappears in 5 seconds."
      />
    </Section>
  );
}
window.P07Snackbars = P07Snackbars;
