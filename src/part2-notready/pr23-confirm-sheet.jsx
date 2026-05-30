function Pr23ConfirmSheet() {
  return (
    <ProposalEntry num="Pr23" title="Express Commit Sheet" category="Presentation"
      what={<>A bottom sheet that summarises a commit the user has already configured — items, address, payment — and lets them confirm with a single tap (often biometric). It is not part of the full checkout flow; it is the shortcut that lets the user skip the flow entirely when everything is already on file. Three concrete triggers in Autodoc: <b>Buy now</b> from a PDP, <b>Order again</b> from order history, and <b>Subscription confirm</b> when adjusting a recurring delivery.</>}
      why="The full checkout flow is necessary when data is missing — but it's overkill when the user already has saved addresses, payment methods, and a known set of items. The Express Commit Sheet rises in place over the parent, summarises the commit, and a single tap closes it. Same surface, three different entry points — Buy now bypasses the cart from PDP; Order again repeats a past order from history; Subscription confirm commits an edit to a recurring delivery. Saving the user three to five screens in these scenarios is one of the largest mobile conversion levers."
      behaviours={[
        "<b>Bottom sheet over the parent.</b> Same surface as a modal sheet — drag handle, header with the verb of the commit («Buy now», «Order again», «Confirm subscription»), summary body, primary CTA at the bottom.",
        "<b>Three entry points, one shape.</b> Buy now (from PDP — items prefilled from this product), Order again (from history — items prefilled from past order), Subscription confirm (from subscription edit — items and cadence prefilled). The sheet's body is identical; only the header verb and the source of the prefilled data change.",
        "<b>Summary rows.</b> Each significant input gets one row — label on the left, value on the right. Deliver to, Pay with, item count, total. Each row carries an inline-editable text link («Edit») that opens a dedicated picker without leaving the sheet.",
        "<b>Single primary CTA carries the verb and the cost.</b> Filled, dark, full-width. The label commits the action with the final number — «Pay €87.40», «Confirm order», «Confirm subscription · €87.40 / month».",
        "<b>Biometric line beneath the CTA.</b> Plain text — «Confirm with Face ID», «Confirm with Touch ID». Sets expectation; the tap also triggers the system biometric prompt.",
        "<b>Dismiss returns the parent unchanged.</b> Drag-down, tap-outside, or swipe-down dismisses. Nothing is committed without an explicit tap on the primary.",
        "<b>Failure recovery preserves state.</b> If the commit fails (payment declined, server error), the sheet remains visible with the data intact — the user can retry without re-entering anything.",
        "<b>Missing data falls back to checkout.</b> If any required piece is absent — no saved payment, no saved address — the entry point does not open the sheet; it routes the user into the full checkout flow instead.",
      ]}
      openQuestions={[
        "Buy now from a PDP: should the sheet open with default address + default payment, or always re-confirm both?",
        "Order again from history: do we copy the same delivery method (Standard / Express) as the original order, or always default to Standard?",
        "Subscription confirm: do we need a separate sheet shape for cadence changes versus item changes, or is one summary sufficient?",
        "Is the biometric line necessary on every device, or only when biometrics are configured?",
      ]}>
      <Phone>
        <Stub note="parent" />
        <BottomSheet title="Buy now" height={0.72}>
          <div style={{ height: "100%", display: "flex", flexDirection: "column", fontSize: 11 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #ececec", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Deliver to</div>
                <div className="skel-row" style={{ width: 120, height: 8, margin: 0 }}/>
              </div>
              <div style={{ fontSize: 10, color: "#6b6b6b", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: 3 }}>Edit</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #ececec", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Pay with</div>
                <div className="skel-row" style={{ width: 90, height: 8, margin: 0 }}/>
              </div>
              <div style={{ fontSize: 10, color: "#6b6b6b", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: 3 }}>Edit</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
              <div style={{ fontSize: 11 }}>1 item</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 600 }}>€ 46.20</div>
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{
              height: 44, background: "#111", color: "#fff", borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 600,
            }}>Pay € 46.20</div>
            <div style={{ marginTop: 8, fontSize: 9, color: "#6b6b6b", textAlign: "center" }}>Confirm with Face ID</div>
          </div>
        </BottomSheet>
      </Phone>
    </ProposalEntry>
  );
}
window.Pr23ConfirmSheet = Pr23ConfirmSheet;
