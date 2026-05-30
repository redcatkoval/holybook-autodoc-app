// ---------------------------------------------------------------
// Catalog navigation shells (shared helpers)
// ---------------------------------------------------------------
// CNCatalogProposed — canonical Catalog Home: GarageBase + Curtain head with
// bold left title + search icon, three category tabs, 2×2 tile grid, then a
// labelled recommendations carousel. BottomNav with cart badge.
// CNCatalogDrilled — drilled-in subcategory: ‹ + bold title + search/filter
// icons, "Match to your car" chip, list rows with "Add" pill, then the same
// recommendations carousel pattern.
//
// Used as a shared visual surface across Part I (layer/foundation examples)
// and Part II (tab bar, search, errors). Not a TOC pattern.

// ─── Small SVG icons for the curtain head ────────────────────────────────
function CNSearchIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none"
      stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="6"/>
      <line x1="14.5" y1="14.5" x2="19" y2="19"/>
    </svg>
  );
}
function CNFilterIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none"
      stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="19" y2="6"/>
      <line x1="3" y1="11" x2="19" y2="11"/>
      <line x1="3" y1="16" x2="19" y2="16"/>
      <circle cx="14" cy="6" r="2.2" fill="#fff"/>
      <circle cx="8" cy="11" r="2.2" fill="#fff"/>
      <circle cx="15" cy="16" r="2.2" fill="#fff"/>
    </svg>
  );
}
function CNBackChevron() {
  return (
    <span style={{
      fontSize: 22, lineHeight: 1, color: "#111",
      width: 18, height: 22, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>‹</span>
  );
}

// ─── Curtain heads ────────────────────────────────────────────────────────
// Proposed (Catalog root): title left + search icon right, both inside the
// canonical curtain-head row (matches Home / Cart curtains in the Tab Bar
// pattern — same font-size 17, font-weight 600, same padding).
function CNHeadProposed({ activeTab = 0 }) {
  return (
    <>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px 8px",
      }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#111", letterSpacing: "-0.01em" }}>Catalog</div>
        <CNSearchIcon size={18} />
      </div>
      <div style={{
        display: "flex", gap: 14, padding: "0 16px",
        borderBottom: "1px solid #ececec",
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            paddingBottom: 8, marginBottom: -1,
            borderBottom: i === activeTab ? "2px solid #111" : "2px solid transparent",
            flex: 1,
          }}>
            <div className="skel-row" style={{
              width: "100%", height: 7, margin: 0,
              background: i === activeTab ? "#111" : undefined,
              opacity: i === activeTab ? 0.85 : 1,
            }}/>
          </div>
        ))}
      </div>
    </>
  );
}

// Drilled (subcategory): ‹ + title left, search + filter icons right; "Match
// to your car" chip below. Same font/padding as Proposed for consistency.
function CNHeadDrilled({ title = "Brake pads", filterBadge }) {
  return (
    <>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 14px 8px", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
          <CNBackChevron />
          <div style={{
            fontSize: 17, fontWeight: 600, color: "#111", letterSpacing: "-0.01em",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <CNSearchIcon size={18} />
          <div style={{ position: "relative", display: "inline-flex" }}>
            <CNFilterIcon size={18} />
            {filterBadge && (
              <div style={{
                position: "absolute", top: -6, right: -8,
                minWidth: 16, height: 16, padding: "0 4px",
                background: "#ff3b30", color: "#fff",
                borderRadius: 8, fontSize: 10, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
                lineHeight: 1,
                fontFamily: '-apple-system, "SF Pro Text", sans-serif',
              }}>{filterBadge}</div>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 14px 8px" }}>
        <span style={{
          display: "inline-block", padding: "4px 10px",
          border: "1px solid #d8d8d8", borderRadius: 999,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: "#111", background: "#fff",
        }}>Match to your car</span>
      </div>
    </>
  );
}

// ─── Body building blocks ────────────────────────────────────────────────
// Single large tile used inside the 2-column subcategory grid.
function CNGridTile() {
  return (
    <div style={{
      background: "#f1f0ed", borderRadius: 12,
      padding: 8,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ height: 84, background: "#e6e5e1", borderRadius: 8, marginBottom: 10 }}/>
      <div className="skel-row" style={{ width: "78%", height: 6, margin: "0 0 5px 0" }}/>
      <div className="skel-row" style={{ width: "48%", height: 5, margin: 0 }}/>
    </div>
  );
}

// Section header bar above a horizontal recommendations carousel.
function CNCarouselHead() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 16px 10px",
    }}>
      <div className="skel-row" style={{
        width: 80, height: 11, margin: 0, background: "#b8b8b8", borderRadius: 3,
      }}/>
      <div style={{ display: "flex", gap: 10, fontSize: 13, color: "#9a9a9a" }}>
        <span>‹</span>
        <span>›</span>
      </div>
    </div>
  );
}

function CNCarouselStrip() {
  return (
    <div style={{
      display: "flex", gap: 10, paddingLeft: 16,
      overflow: "hidden",
    }}>
      {[0, 1].map((i) => (
        <div key={i} style={{
          flex: "0 0 66%",
          height: 110,
          background: "#f1f0ed",
          borderRadius: 12,
        }}/>
      ))}
    </div>
  );
}

// Body for Catalog Home — 2×2 tile grid + carousel.
function CNProposedBody() {
  return (
    <div style={{ paddingTop: 10 }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 10, padding: "0 16px",
      }}>
        {[0, 1, 2, 3].map((i) => <CNGridTile key={i} />)}
      </div>
      <CNCarouselHead />
      <CNCarouselStrip />
    </div>
  );
}

// Body for drilled subcategory — list rows with "Add" + carousel.
function CNDrilledRow() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 14px",
      borderBottom: "1px solid #f1f0ed",
    }}>
      <div style={{
        width: 40, height: 40, background: "#ececec",
        borderRadius: 6, flexShrink: 0,
      }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="skel-row" style={{ width: "85%", height: 6, margin: 0 }}/>
        <div className="skel-row" style={{ width: "55%", height: 5, margin: "6px 0 0" }}/>
      </div>
      <div style={{
        background: "#111", color: "#fff",
        fontSize: 11, fontWeight: 600,
        padding: "5px 12px", borderRadius: 999,
        flexShrink: 0,
      }}>Add</div>
    </div>
  );
}

function CNDrilledBody() {
  return (
    <div>
      {[0, 1, 2, 3].map((i) => <CNDrilledRow key={i} />)}
      <CNCarouselHead />
      <CNCarouselStrip />
    </div>
  );
}

// ─── Public components ────────────────────────────────────────────────────
// Manual curtain layer — bypasses the kit's Curtain wrapper because its
// customTop prop is unused in render and its .curtain-body forces padding +
// overflow:hidden that breaks our layout.
function CNCurtainShell({ head, children }) {
  return (
    <div className="layer-curtain" style={{ top: "14%", bottom: 72 }}>
      <div className="grabber" />
      <div style={{ paddingTop: 20 }}>{head}</div>
      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

function CNCatalogProposed({
  size = "",
  navStyle = "icons-labels",
  activeCategory = 0,
  promoPosition = "middle",
  cartBadge = false,
  overlay,
  bodyOverride,
  filter,
}) {
  return (
    <Phone size={size}>
      <GarageBase />
      <CNCurtainShell head={<CNHeadProposed activeTab={activeCategory} />}>
        {bodyOverride || <CNProposedBody />}
      </CNCurtainShell>
      {overlay}
      <BottomNav active="catalog" cartBadge={cartBadge} style={navStyle} />
    </Phone>
  );
}

function CNCatalogDrilled({ size = "", title = "Brake pads", overlay, bodyOverride, cartBadge = true, filterBadge }) {
  return (
    <Phone size={size}>
      <GarageBase />
      <CNCurtainShell head={<CNHeadDrilled title={title} filterBadge={filterBadge} />}>
        {bodyOverride || <CNDrilledBody />}
      </CNCurtainShell>
      {overlay}
      <BottomNav active="catalog" cartBadge={cartBadge} />
    </Phone>
  );
}

window.CNCatalogProposed = CNCatalogProposed;
window.CNCatalogDrilled = CNCatalogDrilled;
