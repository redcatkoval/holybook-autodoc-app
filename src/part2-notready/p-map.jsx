function PMap() {
  return (
    <ProposalEntry num="—" title="Map View" category="System experiences (proposed)"
      what={<>A <span className="hl">map view</span> is the only surface in Autodoc with its own interaction model — pan, pinch-zoom, marker taps, info windows. Everything else in the app composes from list / sheet / corridor primitives; a map cannot. It is a candidate for the canonical surface once a use case lands that requires geographic context: order tracking (where is my parcel right now), store locator (pick-up points), garage map (where the user's cars live).</>}
      why="Composability has limits. List + Card + Sheet covers most needs, but anything that puts a location on a map requires gestures and a viewport that don't exist anywhere else in the book. Rather than improvise per-feature, pin a single map pattern so every feature that needs geography reads the same way."
      behaviours={[
        "<b>Full-bleed map.</b> The map occupies the body of the screen; the standard PhoneNavBar carries the title and back arrow at the top.",
        "<b>Pinch and pan, no scroll competition.</b> The map owns vertical gestures inside its bounds. The page itself does not scroll while the user is on the map.",
        "<b>Markers + info window.</b> Tap on a marker opens a small floating info window above it — name, address, one-line meta, optional CTA («Choose this point»). Tap outside the marker closes the window.",
        "<b>Bottom sheet for results.</b> When the map carries a list (e.g. nearby pick-up points), a half-height bottom sheet rises from the bottom with the items. The sheet is draggable like every other sheet in the book — collapsed (peek), half, full.",
        "<b>Recenter affordance.</b> A small floating button in the corner returns the viewport to the user's location or to the relevant region (e.g. the destination of a tracked parcel).",
        "<b>External nav handoff.</b> «Open in Maps» as a tertiary text-link inside the info window — for navigation handoff to the system map app.",
        "<b>No ✕.</b> Map lives as a body of a regular screen, not a fullscreen overlay. Exit is back-arrow in the header.",
      ]}
      openQuestions={[
        "Live updates on a tracked parcel: do we redraw the route in place, or replace the marker silently?",
        "Marker clustering: at what zoom level do we collapse marker groups into a count badge?",
        "Privacy: do we ask for precise location, coarse location, or neither, and how does the recenter button behave in each case?",
        "Offline: the user opens the map with no connection. What is the fallback?",
      ]}>
      <Phone>
        <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
        <div style={{
          position: "absolute", top: 44, left: 0, right: 0, bottom: 0,
          background:
            "repeating-linear-gradient(0deg, #f0eee9 0 24px, #e8e4dc 24px 25px), " +
            "repeating-linear-gradient(90deg, #f0eee9 0 24px, #e8e4dc 24px 25px)",
        }}>
          {[[80, 100], [180, 160], [120, 220], [220, 240]].map(([x, y], i) => (
            <div key={i} style={{
              position: "absolute", left: x, top: y,
              width: 18, height: 18, borderRadius: "50% 50% 50% 0",
              background: "#111", border: "2px solid #fff",
              transform: "rotate(-45deg)", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}/>
          ))}
          <div style={{
            position: "absolute", left: 140, top: 110,
            background: "#fff", borderRadius: 10, padding: "8px 10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            border: "1px solid #d8d8d8",
            minWidth: 130, display: "flex", flexDirection: "column", gap: 4,
          }}>
            <div className="skel-row" style={{ width: "70%", height: 8, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
            <div className="skel-row" style={{ width: "85%", height: 7, margin: 0 }}/>
            <div className="skel-row" style={{ width: "55%", height: 8, margin: "4px 0 0", background: "#b8b8b8" }}/>
          </div>
          <div style={{
            position: "absolute", right: 12, bottom: 80,
            width: 36, height: 36, borderRadius: "50%", background: "#fff",
            border: "1px solid #d8d8d8",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}>⌖</div>
        </div>
      </Phone>
    </ProposalEntry>
  );
}
window.PMap = PMap;
