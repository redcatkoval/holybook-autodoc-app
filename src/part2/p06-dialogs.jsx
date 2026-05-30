// ---------------------------------------------------------------
// P06 — Dialogs, Alerts & Action Sheets
// ---------------------------------------------------------------
function P06Dialogs() {
  return (
    <Section id="p-dialogs">
      <PatternHead num="04" title="Dialogs, Alerts & Action Sheets" category="Presentation"
        lede={<>A <span className="hl">dialog</span> interrupts the user's workflow to convey critical information, confirm an irreversible action, or obtain an immediate decision. Three forms — <b>non-alerting dialog</b>, <b>system alert</b>, <b>action sheet</b> — and one extra axis the canon adds: <b>which surface they're allowed to live on</b>. Two of the three are sheet-shaped and only appear inside fullscreen flows; the third is centered and works anywhere.</>} />


      <Callout label="Autodoc reading">
        A dialog is the loudest tool in the kit. It interrupts the user, blocks everything behind it, demands a response. Every dialog the team adds makes every existing dialog less effective — so the canon keeps them in three buckets, each with a different job. The main app surface narrows the choice: because that surface is itself a sheet, sheet-shaped dialogs cannot rise over it without stacking two sheets at once. Only the centered system alert works on every surface; the other two belong to fullscreen flows.
      </Callout>

      <H3>Three forms</H3>
      <p>One row, three shapes. Each does a different job and lives on a different set of surfaces.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Non-alerting dialog — bottom sheet.</b> Soft tone: image (optional), body, primary CTA, optional text link. Tap-outside dismisses. Used for asks the user can safely ignore inside a flow — a soft commit confirm or an offer the user can decline by tapping outside. <i>Surface: fullscreen flow only</i> (sheet-shaped).">
          <Phone>
            <Stub note="parent" />
            <BottomSheet title="Title" height={0.55}>
              <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{
                  width: "100%", height: 90, background: "#ececec", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#9a9a9a", fontSize: 18, marginTop: 4, marginBottom: 12,
                }}>▱</div>
                <div className="skel-row" style={{ width: "85%", height: 8, margin: "0 0 6px" }}/>
                <div className="skel-row" style={{ width: "70%", height: 8, margin: 0 }}/>
                <div style={{ flex: 1 }}/>
                <div style={{
                  height: 40, background: "#111", color: "#fff", borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 600, marginBottom: 10,
                }}>CTA</div>
                <div className="skel-row" style={{ width: "40%", height: 7, margin: "0 auto" }}/>
              </div>
            </BottomSheet>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>System alert — centered card.</b> App-initiated, mandatory choice. Title, optional subtitle, primary action, Cancel. Tap-outside does <i>not</i> dismiss — the user must tap a button. <i>Surface: any</i> — the only form that works over the main app surface. Examples: «App update required», cancelling a placed order.">
          <Phone>
            <Stub note="parent" />
            <DialogModal
              title="Title"
              subtitle="Short subtitle describing the situation."
              primary="Action"
              secondary="Cancel"
              destructive
              split
            />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Action sheet — bottom list of choices.</b> User-initiated pick from a set, or destructive confirmation (Discard, Remove). Destructive option sits last; Cancel is always present. Tap-outside acts as Cancel. <i>Surface: fullscreen flow only</i> (sheet-shaped). Examples: «Discard progress?», «Remove a car», «Cancel this order».">
          <Phone>
            <Stub note="parent" />
            <ActionSheet
              prompt="Title of the action sheet"
              actions={["Action", "Action", { label: "Destructive action", destructive: true }]}
              cancel="Cancel"
            />
          </Phone>
        </FrameCell>
      </div>

      <H3>Decision rule — two axes</H3>
      <Callout label="Pick by surface first, then by initiator">
        <b>(1) Surface.</b> If the dialog appears while the user is <b>browsing the app</b>, only the <b>centered system alert</b> is allowed — sheet-shaped forms would stack a second sheet on a surface that is already a sheet. If the dialog appears <b>inside a fullscreen flow</b>, all three forms are available.<br/>
        <b>(2) Initiator + dismiss intent.</b> Inside a fullscreen flow, pick by who asked and whether the user can ignore: <b>app-initiated, must answer</b> → system alert. <b>User-initiated pick or destructive confirm</b> → action sheet. <b>Soft ask the user can ignore</b> → non-alerting dialog.
      </Callout>

      <H3>Destructive actions</H3>
      <p>A destructive action deletes user data or removes a record. Picking the right form depends on <b>how costly the mistake is</b> and on the <b>surface</b> the user is standing on.</p>

      <ul className="rules">
        <li><b>Low cost, easy to recover, in a fullscreen flow.</b> → <b>Action sheet</b>. Destructive option last, Cancel always present, tap-outside cancels. Examples: discarding a draft, removing a car from the garage detail, removing a saved address from a manage-addresses screen.</li>
        <li><b>Low cost, the user is browsing the app.</b> → Just do it, surface a <b>snackbar with Undo</b>. No confirmation dialog. The user can reverse with one tap during the auto-dismiss window. Example: removing a cart item from the cart list.</li>
        <li><b>High cost, irreversible.</b> → <b>System alert</b>. Centered, requires an explicit tap (no tap-outside dismiss). Cancel on the left as the safer default, destructive on the right in error red. Example: cancelling a placed order — the order has already entered fulfilment, there is no «undo» window.</li>
        <li><b>Closing a single-commit fullscreen flow (Checkout, Pay-now).</b> → Neither dialog form. An optimistic <b>snackbar with Undo</b>: drop state on auto-dismiss, restore on Undo tap.</li>
        <li><b>Destructive option position.</b> In action sheets — last in the list. In split-layout system alerts — right side, painted error red. Cancel is always the visually neutral, easier-to-hit option.</li>
      </ul>

      <Rules items={[
        "<b>Surface decides the shape first.</b> When the user is browsing the app, only the centered system alert is allowed — sheet-shaped forms would stack a second sheet on the app surface, which is itself a sheet. Inside a fullscreen flow, any of the three forms is available. «No sheet over sheet» is non-negotiable.",
        "<b>Pick by initiator + dismiss intent.</b> App-initiated must-answer → system alert. User-initiated pick or destructive confirm → action sheet. Soft ask the user can ignore → non-alerting dialog.",
        "<b>Scrim is required on every form.</b> The background dims behind the dialog to focus attention. No floating dialogs over a fully-bright screen.",
        "<b>System alerts need a tap.</b> No tap-outside dismiss. Tap-outside-as-Cancel is reserved for action sheets and non-alerting dialogs.",
        "<b>Destructive options sit last (action sheet) or right (split alert).</b> They are visually heaviest in their list; Cancel always looks like the safer, neutral path.",
        "<b>Boundary cases.</b> Sorts and option pickers are dropdowns, not action sheets. Mode picks for adding a vehicle happen <i>inside</i> the add-vehicle flow, not as a sheet over the browsing surface. Closing a single-commit fullscreen flow is a snackbar with Undo, not a dialog. Inline form errors stay inline — never a centered alert.",
      ]}/>

      <DoDont
        doItem="When the app requires an update to keep working, show a centered system alert «Update required» — Update on the right, Later on the left. It works over the main app surface, demands a deliberate tap, and never stacks a second sheet on top."
        dontItem="Don't open an action sheet to sort the catalog. The catalog screen is itself a sheet — a second sheet stacks two drag handles and breaks the layer rule. Sort is a dropdown or an inline control."
      />
    </Section>
  );
}
window.P06Dialogs = P06Dialogs;
