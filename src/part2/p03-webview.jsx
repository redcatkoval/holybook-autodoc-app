// ---------------------------------------------------------------
// P03 — Web View
// ---------------------------------------------------------------

// Web view shell — single-step Corridor. Header carries:
// ‹ for the web view's own browser history (hidden when history is empty),
// title in the centre, ✕ on the right as the exit affordance.
function WebviewShell({
  title = "Page title",
  canGoBack = false,
  body = "page",
  showSnackbar = false,
}) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff", zIndex: 3,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{
        padding: "44px 12px 10px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        background: "#ececec",
      }}>
        <div style={{ width: 24, fontSize: 16, color: canGoBack ? "#111" : "transparent" }}>‹</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#111", flex: 1, textAlign: "center" }}>{title}</div>
        <div style={{ width: 24, fontSize: 14, color: "#111", textAlign: "right" }}>✕</div>
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {body === "page" && (
          <div style={{
            position: "absolute", inset: 0, padding: "16px 14px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div className="skel-row" style={{ width: "55%", height: 12, margin: 0 }}/>
            <div className="skel-row" style={{ width: "90%", height: 8, margin: 0 }}/>
            <div className="skel-row" style={{ width: "85%", height: 8, margin: 0 }}/>
            <div className="skel-row" style={{ width: "70%", height: 8, margin: 0 }}/>
            <div style={{ height: 70, background: "#ececec", borderRadius: 6, marginTop: 6 }}/>
            <div className="skel-row" style={{ width: "92%", height: 8, margin: 0 }}/>
            <div className="skel-row" style={{ width: "80%", height: 8, margin: 0 }}/>
            <div className="skel-row" style={{ width: "60%", height: 8, margin: 0 }}/>
          </div>
        )}
        {body === "loading" && (
          <>
            <div style={{
              position: "absolute", top: 0, left: 0, height: 2,
              width: "35%", background: "#111",
            }}/>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#9a9a9a", fontSize: 11,
            }}>Loading…</div>
          </>
        )}
        {body === "empty" && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "0 32px", textAlign: "center", gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              border: "1.5px solid #111",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, color: "#111",
            }}>!</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Couldn't load</div>
            <div style={{ fontSize: 11, color: "#6b6b6b", lineHeight: 1.4 }}>
              We didn't get a response from the page. Check your connection and try again.
            </div>
            <div style={{
              marginTop: 6, padding: "8px 16px",
              background: "#111", color: "#fff", borderRadius: 6,
              fontSize: 11, fontWeight: 600,
            }}>Retry</div>
          </div>
        )}
        {showSnackbar && (
          <div style={{
            position: "absolute", left: 12, right: 12, bottom: 16,
            background: "#111", color: "#fff", borderRadius: 8,
            padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
            fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}>
            <span style={{ flex: 1 }}>No internet connection.</span>
            <span style={{ fontWeight: 600 }}>Retry</span>
          </div>
        )}
      </div>
    </div>
  );
}

function P03WebView() {
  return (
    <Section id="p-webview">
      <PatternHead num="03" title="Web View" category="Navigation and search"
        lede={<>A <span className="hl">web view</span> is a browser embedded inside the app — a <b>single-step Corridor</b> that opens external content (terms, help, privacy, third-party redirects) without sending the user to Safari or Chrome. Architecturally identical to any other Corridor: the shell disappears, one job in focus, the user returns to where they started when the Corridor exits.</>} />


      <Callout label="Autodoc reading">
        A web view is the app politely refusing to own something — terms, help articles, third-party redirects that the brand needs to display but should not pretend to author. Web views are slower than native, lack native gestures, and depend on the network — so they're for content the app must show but should not own. <b>Never a primary task.</b> Catalog, cart, checkout, account are native; web views are for legal, help, and external partners.
      </Callout>

      <H3>Anatomy — single-step Corridor</H3>
      <p>The web view is a Corridor with one screen. It follows the Corridor canon (no shell, no tab bar, returns the user exactly where they started) with one canonical deviation in the header.</p>

      <FrameRow>
        <FrameCell caption="<b>Web view shell.</b> Header carries three things: <b>‹</b> on the left — steps back through the web view's <i>own</i> browser history (not the Corridor stack); hidden when there is nothing to go back to. <b>Title</b> in the centre — the page title reported by the loaded page. <b>✕</b> on the right — exits the Corridor and returns to the surface the user was on. Below the header is the page itself.">
          <Phone size="lg">
            <WebviewShell title="Page title" canGoBack body="page" />
          </Phone>
        </FrameCell>
      </FrameRow>

      <H3>Why ✕ instead of just ‹</H3>
      <p>By default a Corridor carries only <code>‹</code>, and the ✕ shows up only on the last step of a multi-step flow. The web view deviates by carrying <b>both</b> <code>‹</code> and <code>✕</code> on a single step, for two reasons that hold only for this pattern:</p>
      <ul className="rules">
        <li><b>‹ and ✕ mean different things here.</b> <code>‹</code> walks back inside the embedded page's history (a separate stack we don't own); <code>✕</code> closes the entire Corridor. Mixing these into one chevron would leave no way to leave the web view once the user has clicked a link inside it.</li>
        <li><b>No user input to discard.</b> The Corridor's discard sheet exists to protect typed input. A web view shows read-only external content — there is nothing to lose. ✕ can therefore exit immediately, no Action Sheet.</li>
      </ul>

      <H3>Loading &amp; failure</H3>
      <p>The web view is responsible for feedback up to the moment the page's HTML arrives. After that, the page is on its own canvas. Three states:</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Loading.</b> A thin progress bar pinned under the header while the page is fetching. Silence reads as a freeze — the bar is the proof of life.">
          <Phone>
            <WebviewShell title="Page title" body="loading" />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Offline — snackbar.</b> The device has no network. App-level chrome speaks, because the failure is the app's environment, not the page. Persistent snackbar with Retry; clears when the connection is back.">
          <Phone>
            <WebviewShell title="Page title" body="loading" showSnackbar />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Couldn't load — inline empty state.</b> Network is up but HTML never arrived (timeout, DNS, unreachable). The web view's own body shows «Couldn't load · Retry». A snackbar over an empty page reads strangely — when the canvas is empty, the canvas itself carries the message.">
          <Phone>
            <WebviewShell title="Page title" body="empty" />
          </Phone>
        </FrameCell>
      </div>

      <p><b>Server-side errors are not our concern.</b> If the page's server returns 5xx or renders its own error, that's the partner's content — we don't draw anything over it. The handoff is clean: <i>before HTML arrives, the web view speaks; after HTML arrives, the page speaks.</i></p>

      <Rules items={[
        "<b>Single-step Corridor.</b> Same canon as any Corridor — shell disappears, no tab bar, exit returns the user exactly where they started.",
        "<b>‹ walks the page's history; ✕ closes the Corridor.</b> Two stacks, two affordances. ‹ hides when the page history is empty.",
        "<b>No discard sheet on exit.</b> Web views show read-only content — there is nothing to lose, so ✕ exits immediately.",
        "<b>Mobile-optimised content only.</b> If the page does not respond to mobile widths, redirect to the system browser instead. A desktop site jammed into 320px reads as broken.",
        "<b>Never for primary tasks.</b> Catalog, cart, checkout, account — these are native. Web views are for legal, help, and external partners.",
        "<b>Feedback rule of thumb.</b> Before HTML arrives the web view speaks (progress, snackbar, empty state). After HTML arrives the page speaks — server errors render inside the page, not over it.",
      ]}/>

      <DoDont
        doItem="Open Terms of Use as a single-step Corridor web view. ✕ closes back to checkout exactly where the user paused, ‹ hides because the page has no internal history."
        dontItem="Don't render the product catalog inside a web view. The user won't know why scrolling feels wrong, but they'll leave. Native is for primary tasks; web views are for content the brand must show but should not own."
      />
    </Section>
  );
}
window.P03WebView = P03WebView;
