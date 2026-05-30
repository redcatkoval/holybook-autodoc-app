// ---------------------------------------------------------------
// P-Errors — Error states
// ---------------------------------------------------------------
function PErrors() {
  return (
    <Section id="p-errors">
      <PatternHead num="03" title="Errors" category="Status"
        lede={<>Every screen has a happy path and at least three unhappy ones. <span className="hl">Errors</span> are designed states, not afterthoughts — and the surface that carries an error is picked by severity and by where the user is. Four flavours cover almost every case in the app: ambient snackbars, inline field errors, system alerts, hard container replacements.</>} />


      <Callout label="Autodoc reading">
        An error is the moment the system tells the user something is wrong. The job of the screen is to say <b>what happened</b> and <b>what to do next</b> — never «Invalid input», never «Something went wrong». Autodoc picks the surface by how much of the screen the failure invalidates and by whether the user must respond to continue: a non-blocking hiccup is a snackbar (with or without Retry); a wrong password is an inline message under the field; a recoverable failure the user must resolve before the flow can continue is a system alert; an unrenderable container is a hard error replacing the body.
      </Callout>

      <H3>Four flavours by surface</H3>
      <p>Pick by what the failure invalidates and whether the user must respond. Each flavour carries the same three building blocks — a <b>signal</b> the eye reads as «error», a <b>message</b> in plain language («Plate must be 6 characters», not «Invalid input»), and an <b>action</b> where the surface has room for one. Snackbar is the lightest, hard container the heaviest; system alert and inline cover the recoverable and the input in between.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Snackbar — non-blocking.</b> A background refresh failed, an autosave blinked, something the user tried didn't go through. The user can ignore it or tap a quiet Retry — either way, the flow underneath is not blocked. Cached content keeps rendering.">
          <CNCatalogProposed
            activeCategory={0}
            promoPosition="middle"
            size=""
            overlay={
              <div style={{
                position:"absolute", left:12, right:12, bottom:80,
                background:"#111", color:"#fff", borderRadius:8,
                padding:"10px 12px", display:"flex", justifyContent:"space-between", alignItems:"center",
                fontSize:11, zIndex:5, boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
              }}>
                <span>Couldn't refresh prices.</span>
                <span style={{fontWeight:600}}>Retry</span>
              </div>
            }
          />
        </FrameCell>
        <FrameCell caption="<b>Inline — field level.</b> Outline on the offending field, one line of plain explanation underneath, primary CTA disabled until fixed. Used for form validation and short server responses (wrong password, e-mail already in use). The fix lives where the typing happened — never a modal for an input error.">
          <Phone>
            <div className="layer-full">
              <div className="full-header"><div style={{width:28}}/><div className="title" style={{flex:1, display:"flex", justifyContent:"center"}}><div className="skel-row" style={{width:80, height:8, margin:0}}/></div><div style={{width:28}}/></div>
              <div className="full-body">
                <div className="mono" style={{fontSize:11, color:"var(--muted)"}}>E-mail</div>
                <div style={{height:44, border:"1px solid var(--line)", borderRadius:10, marginTop:6, padding:"0 12px", display:"flex", alignItems:"center"}}><div className="skel-row" style={{width:"60%", height:8, margin:0}}/></div>
                <div className="mono" style={{fontSize:11, color:"var(--muted)", marginTop:14}}>Password</div>
                <div style={{height:44, border:"1.5px solid var(--bad)", borderRadius:10, marginTop:6, padding:"0 12px", display:"flex", alignItems:"center", fontSize:13, color:"#111", letterSpacing:2}}>••••••••</div>
                <div style={{fontSize:11, color:"var(--bad)", marginTop:6}}>Wrong password. Try again or reset it.</div>
              </div>
              <div style={{padding:"12px 16px 31px"}}><CtaButton label="Sign in" disabled/></div>
            </div>
          </Phone>
        </FrameCell>
      </div>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>System alert — actionable, app-initiated.</b> Critical operation failed and the user must explicitly decide before continuing — payment didn't go through, account locked, rate limit hit. Centered card with two text-only buttons: Cancel left as the safer default, the action right in error red. Tap-outside does not dismiss.">
          <Phone>
            <Stub note="parent" />
            <DialogModal title="Payment failed" subtitle="We couldn't charge your card. The order has not been placed." primary="Try again" secondary="Cancel" destructive split />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Hard container — full replacement.</b> A service is down, an order can't be found, a product page can't fetch its specs. The container body is replaced by the error composition; the shell around it (Garage above, tab bar below) stays — the user is still in the app, just this room is closed.">
          <CNCatalogProposed
            size=""
            bodyOverride={
              <div style={{
                position: "relative", flex: 1,
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ textAlign: "center", padding: "30px 14px", flex: 1 }}>
                  <div style={{ width: 60, height: 60, border: "1.5px solid var(--bad)", borderRadius: 14, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "var(--bad)" }}>!</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 14 }}>Catalog unavailable</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>We can't reach the parts service. Try again in a moment.</div>
                </div>
                <div style={{ padding: "12px 16px 18px" }}>
                  <div style={{
                    height: 44, background: "#111", color: "#fff", borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 600,
                  }}>Retry</div>
                </div>
              </div>
            }
          />
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Never silent.</b> Every failure produces a visible state — snackbar, inline message, alert, or full container. The user always knows what's happening and what they can do.",
        "<b>Pick the surface by whether the user must respond.</b> Must answer to continue → system alert. Non-blocking → snackbar. Form input → inline. Container is dead → hard replacement.",
        "<b>Always a path forward.</b> An error without a next step is a wall. Inline collapses the path into the field above; snackbars offer an optional Retry; alerts and hard containers always carry an explicit action.",
        "<b>Don't blame the user. Speak in plain language.</b> Say what's expected, what failed, what to try — «Plate must be 6 characters, no spaces», not «Invalid input» and never «Error 503».",
      ]}/>

      <DoDont
        doItem="Pick the surface by whether the user must respond. Snackbar for non-blocking, inline for input, system alert for must-answer, hard only when the container is dead. End every error that can carry an action with a clear next step."
        dontItem="Don't escalate every failure to a system alert. Don't write «Something went wrong». Don't promote a form-validation error to a modal. Don't ship an error without a path forward when the surface has room for one."
      />
    </Section>
  );
}
window.PErrors = PErrors;
