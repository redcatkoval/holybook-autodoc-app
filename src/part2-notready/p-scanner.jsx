function PScanner() {
  return (
    <ProposalEntry num="—" title="Camera Scanner" category="System experiences (proposed)"
      what={<>A <span className="hl">camera scanner</span> is a full-screen viewport that streams the device camera with an overlay viewfinder, used to read printed identifiers — VIN on the windshield, part-number barcode on packaging, registration plate on the car body. Unlike forms or pickers in the rest of the book, this surface has no list, no fields, and no scroll: the user is aiming the device at something physical.</>}
      why="Adding a car by typing the VIN is friction; adding a car by pointing the camera at the windshield is one second. Same with parts: many users have the box in hand and would rather scan the barcode than type the catalog number. Without a scanner pattern the team will improvise — one feature uses one camera UX, another uses something different — and the result reads as multiple products."
      behaviours={[
        "<b>Full-screen camera viewport.</b> The whole screen is the camera feed; no curtain, no tab bar, no card chrome. The PhoneNavBar stays at the top but with white-on-dim icons.",
        "<b>Overlay viewfinder.</b> A semi-transparent dark mask covers everything except a centered rectangular cut-out. The cut-out marks where to point — same shape and size for VIN, barcode, plate. Corner brackets reinforce the framing.",
        "<b>Hint line under the cut-out.</b> One short instruction: «Point at the VIN under the windshield», «Align the barcode in the frame». Single-line, fades in when the camera opens.",
        "<b>Auto-detect, no shutter.</b> The scanner recognises the code automatically when it's in frame and in focus — no manual capture button. A brief haptic tap + visual flash confirms the read.",
        "<b>Manual capture fallback.</b> If auto-detect fails for several seconds, a shutter button appears at the bottom as a fallback. Tap once to capture; the system retries OCR on the still frame.",
        "<b>Torch toggle.</b> Small icon in the top corner for low-light conditions.",
        "<b>Exit with ✕.</b> The scanner is a lightweight corridor — nothing is committed until the code is read. Header keeps a ✕ in line with the canonical exception for web view, search overlay, and image gallery viewer.",
        "<b>After a successful read.</b> The screen handles the result depending on the entry point — for VIN, it confirms the matched car; for a barcode, it opens the matched product's PDP.",
      ]}
      openQuestions={[
        "Permission: the user denies camera access. What does the screen look like, and what's the recovery path?",
        "Multiple identifiers on the same frame (VIN + barcode visible at once): which one wins, and is that surfaced to the user?",
        "Confidence threshold for auto-detect: how confident must we be before committing the result without confirmation?",
        "When does a manual «Enter by hand» link appear, and where does it route?",
      ]}>
      <Phone>
        <div style={{
          position: "absolute", inset: 0, background: "#1a1a1a",
        }}>
          <div style={{
            position: "absolute", top: 8, left: 0, right: 0,
            display: "flex", justifyContent: "space-between",
            padding: "0 14px", color: "#fff", fontSize: 18, lineHeight: 1,
          }}>
            <span style={{ width: 22 }}>✕</span>
            <span style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Scan VIN</span>
            <span style={{ width: 22 }}>⚡</span>
          </div>
          <div style={{
            position: "absolute", top: 130, left: 32, right: 32,
            height: 130, border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: 8,
          }}>
            {[
              { top: -2, left: -2, borderTop: "3px solid #fff", borderLeft: "3px solid #fff", borderRight: 0, borderBottom: 0 },
              { top: -2, right: -2, borderTop: "3px solid #fff", borderRight: "3px solid #fff", borderLeft: 0, borderBottom: 0 },
              { bottom: -2, left: -2, borderBottom: "3px solid #fff", borderLeft: "3px solid #fff", borderRight: 0, borderTop: 0 },
              { bottom: -2, right: -2, borderBottom: "3px solid #fff", borderRight: "3px solid #fff", borderLeft: 0, borderTop: 0 },
            ].map((p, i) => (
              <div key={i} style={{ position: "absolute", width: 16, height: 16, ...p }}/>
            ))}
          </div>
          <div style={{
            position: "absolute", top: 280, left: 0, right: 0,
            textAlign: "center", color: "#fff", fontSize: 12,
            opacity: 0.85, padding: "0 24px", lineHeight: 1.4,
          }}>Point the camera at the VIN under the windshield</div>
          <div style={{
            position: "absolute", bottom: 24, left: 0, right: 0,
            textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: 11,
            textDecoration: "underline", textDecorationStyle: "dotted",
            textUnderlineOffset: 3,
          }}>Enter by hand</div>
        </div>
      </Phone>
    </ProposalEntry>
  );
}
window.PScanner = PScanner;
