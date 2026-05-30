// Phone wireframe primitives — revised after Ivan's review.
// New rules: garage has a dark base with carousel + recents + address;
// curtain never fully closes (always section header peek above nav);
// curtain never expands to absolute top (always car-name sliver visible);
// search is permanent under section title; drag works anywhere on curtain.

function StatusBar({ tone = "light" }) {
  return (
    <div className="statusbar" style={{color: tone === "dark" ? "#f5f3ee" : "var(--ink)"}}>
      <span>9:41</span>
      <span>●●●●  ◴  ▮▮▮</span>
    </div>
  );
}

function Phone({ size = "md", tall = false, children, statusBar = false, statusTone = "dark" }) {
  const cls = "phone " + (size === "lg" ? "lg " : "") + (tall ? "tall" : "");
  return (
    <div className={cls.trim()}>
      {statusBar && <StatusBar tone={statusTone}/>}
      {children}
      <div className="notch" />
      {!tall && <div className="home-ind"/>}
    </div>
  );
}

// ─── GARAGE BASE LAYER ─────────────────────────────────────────────────────
// Per Ivan: dark/tonal background, carousel of car cards in upper half,
// then recent orders stack, then address banner. The active car name is shown
// small at the top — the BIG title for it lives lower in vehicle-detail.

// Inner stack — identical for the regular layer and the tall anatomy frame.
function GarageBaseStack({ activeCar = "BMW 320d", plate = "12-AB-34", showActiveTop = true }) {
  return (
    <>
      <StatusBar tone="dark"/>
      {showActiveTop && (
        <div className="garage-topbar">
          <div className="mini-car">
            <span className="glyph"/>
            <span>{activeCar}{plate ? " · " + plate : ""}</span>
          </div>
          <div className="acts">
            <span className="top-ico gift" title="Promos / referral">
              <span className="gift-ribbon"/>
              <span className="gift-box"/>
              <span className="dot"/>
            </span>
            <span className="top-ico avatar" title="Profile">
              <span className="head"/>
              <span className="shoulders"/>
              <span className="dot"/>
            </span>
          </div>
        </div>
      )}
      <div className="garage-section-row">
        <div className="garage-section-h">
          <span className="lbl">Garage</span>
          <span className="count-badge">2</span>
        </div>
        <span className="top-ico add-plus" title="Add a car">
          <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="11" y1="5" x2="11" y2="17"/>
            <line x1="5" y1="11" x2="17" y2="11"/>
          </svg>
        </span>
      </div>
      <div className="car-cards">
        <div className="car-card active">
          <div className="car-photo">
            <span className="car-photo-glyph"/>
            <span className="car-photo-tag mono">PHOTO</span>
          </div>
          <div className="car-name">BMW 3-series</div>
          <div className="car-meta-row"><span>F30 · 2018</span><span>92,300 km</span></div>
          <div className="plate-tag">12-AB-34</div>
        </div>
        <div className="car-card">
          <div className="car-photo" style={{opacity:0.6}}>
            <span className="car-photo-glyph"/>
            <span className="car-photo-tag mono">PHOTO</span>
          </div>
          <div className="car-name">Audi A4</div>
          <div className="car-meta-row"><span>B9 · 2021</span><span>41,800 km</span></div>
          <div className="plate-tag">56-CD-78</div>
        </div>
      </div>
      <div className="base-section">
        <div className="h-row">
          <span className="h">Recent orders</span>
          <span className="count-badge">3</span>
        </div>
        <div className="orders-row">
          <div className="order-card">
            <div className="order-card-body">
              <div className="ord-no">#A-1987</div>
              <div className="ord-name">Engine oil 5W-30</div>
            </div>
            <div className="ord-stat delivered">Delivered</div>
          </div>
          <div className="order-card">
            <div className="order-card-body">
              <div className="ord-no">#A-2028</div>
              <div className="ord-name">Air filter, wipers</div>
            </div>
            <div className="ord-stat">Out for delivery</div>
          </div>
          <div className="order-card">
            <div className="order-card-body">
              <div className="ord-no">#A-2031</div>
              <div className="ord-name">Brake pads, oil filter</div>
            </div>
            <div className="ord-stat">In transit</div>
          </div>
        </div>
      </div>
      <div className="base-section">
        <div className="h-row">
          <span className="h">Wishlist</span>
          <span className="count-badge">8</span>
        </div>
        <div className="wishlist-row">
          <div className="wish-card"><span className="discount-tag">-15%</span><span className="wish-img a"/></div>
          <div className="wish-card"><span className="wish-img y"/></div>
          <div className="wish-card"><span className="discount-tag">-25%</span><span className="wish-img b"/></div>
          <div className="wish-card"><span className="wish-img f"/></div>
          <div className="wish-card"><span className="wish-img w"/></div>
        </div>
      </div>
      <div className="base-section">
        <span className="h">Rewards</span>
        <div className="rewards-grid">
          <div className="reward-card">
            <svg className="reward-svg" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="11" cy="7" rx="6" ry="2"/>
              <path d="M5 7 V11 C5 12.1 7.7 13 11 13 C14.3 13 17 12.1 17 11 V7"/>
              <path d="M5 11 V15 C5 16.1 7.7 17 11 17 C14.3 17 17 16.1 17 15 V11"/>
            </svg>
            <div className="reward-meta">
              <div className="reward-val">£1,677.00</div>
              <div className="reward-lbl">bonuses</div>
            </div>
          </div>
          <div className="reward-card">
            <svg className="reward-svg" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9 V8 H19 V9 A1.5 1.5 0 0 0 19 12 V13 H3 V12 A1.5 1.5 0 0 0 3 9 Z"/>
              <line x1="11" y1="9" x2="11" y2="12" strokeDasharray="1.5 1.5"/>
            </svg>
            <div className="reward-meta">
              <div className="reward-val">4</div>
              <div className="reward-lbl">coupons</div>
            </div>
          </div>
        </div>
      </div>
      <div className="base-section">
        <div className="quick-grid">
          <div className="quick-card">
            <svg className="quick-svg" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 19 C11 19 5 13 5 9 A6 6 0 0 1 17 9 C17 13 11 19 11 19 Z"/>
              <circle cx="11" cy="9" r="2"/>
            </svg>
            <span className="quick-lbl">Delivery Address</span>
          </div>
          <div className="quick-card">
            <svg className="quick-svg" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="8.5" r="2.6"/>
              <path d="M6 8.5 V7 A5 5 0 0 1 16 7 V8.5"/>
              <circle cx="6" cy="9.2" r="1.1" fill="currentColor" stroke="none"/>
              <circle cx="16" cy="9.2" r="1.1" fill="currentColor" stroke="none"/>
              <path d="M5.5 10.2 C5.2 12 5.8 13 7.4 13"/>
              <circle cx="7.5" cy="13" r="0.7" fill="currentColor" stroke="none"/>
              <path d="M5 19.5 C5 16.5 7 15 11 15 C15 15 17 16.5 17 19.5"/>
            </svg>
            <span className="quick-lbl">Support</span>
          </div>
        </div>
      </div>
    </>
  );
}

function GarageBase({ activeCar, year, plate, showActiveTop = true, light = false, compact = false }) {
  // `compact` retained for backwards-compat; visually identical to the regular
  // layer now (single canonical topbar), so no special rendering.
  return (
    <div className={"layer-base " + (light ? "tinted-light" : "")}>
      <GarageBaseStack activeCar={activeCar} plate={plate} showActiveTop={showActiveTop}/>
    </div>
  );
}

// ─── GARAGE BASE FULL ──────────────────────────────────────────────────────
// Full vertical stack of the My AUTODOC base layer for use in long-frame
// anatomy diagrams. Carousel peek of active + next car, simplified Recent
// orders, Promo banner, Wishlist, Rewards, Quick-links. Render inside
// <Phone tall> with no Curtain / no BottomNav. Monochrome only.

function GarageBaseFull() {
  return (
    <div className="layer-base full">
      <GarageBaseStack/>
    </div>
  );
}

// ─── CURTAIN ───────────────────────────────────────────────────────────────
// position: 0 = peek (only header + search bar visible above bottom nav),
// 0.5 = half (default), 1 = max (but car-name sliver still visible at top).

function Curtain({ position = 1, title = "Catalog", filter, children, showSearch = true, searchPlaceholder, centered = false, customTop, showFilterBtn = true, back = false }) {
  // Three states: 0 = lowered (only title sliver above bottom nav), 0.5 = half-open
  // (My AUTODOC and curtain split the screen), 1 = closed (working state — curtain
  // hugs the small topbar, ~14% of phone is My AUTODOC). Default is closed.
  // `back` adds ‹ on the left of the title row for drill-down inside the curtain.
  const tops = { 0: "calc(100% - 128px)", 0.5: "44%", 1: "14%" };
  const top = customTop || tops[position] || tops[0.5];
  // `back` without a filter chip keeps a centred title (location reads in the middle);
  // `back` + `filter` uses a toolbar row — ‹ + title left, contextual chip trailing right.
  const titleCentered = centered || (back && !filter);
  const titleRowStyle = back && !filter ? { position: "relative" } : undefined;
  const backChevronW = 22;
  return (
    <div className="layer-curtain" style={{top, bottom: 72}}>
      <div className="grabber" />
      <div className="curtain-head">
        <div
          className={"curtain-title-row " + (titleCentered ? "centered" : "")}
          style={
            back && filter
              ? { alignItems: "center", ...titleRowStyle }
              : titleRowStyle
          }
        >
          {back && filter ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0, flex: "1 1 auto" }}>
                <span style={{
                  fontSize: 22, lineHeight: 1, color: "var(--ink)",
                  width: backChevronW, height: 22, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>‹</span>
                <span className="ttl" style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>{title}</span>
              </div>
              <span className="sub-filter" style={{ flexShrink: 0, marginLeft: 8 }}>{filter}</span>
            </>
          ) : (
            <>
              {back && (
                <span style={{
                  position: "absolute", left: 0, top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 22, lineHeight: 1, color: "var(--ink)",
                  width: backChevronW, height: 22,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>‹</span>
              )}
              <span className="ttl">{title}</span>
              {!back && filter && <span className="sub-filter">{filter}</span>}
            </>
          )}
        </div>
        {showSearch && (
          <div className="curtain-search-row">
            <div className="curtain-search">
              <span className="search-icon"/>
              <span>{searchPlaceholder || `Search in ${title.toLowerCase()}`}</span>
            </div>
            {showFilterBtn && (
              <div className="curtain-filter-btn" title="Filters">
                <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <line x1="3" y1="6" x2="19" y2="6"/>
                  <line x1="3" y1="11" x2="19" y2="11"/>
                  <line x1="3" y1="16" x2="19" y2="16"/>
                  <circle cx="8" cy="6" r="2.2" fill="#fff"/>
                  <circle cx="14" cy="11" r="2.2" fill="#fff"/>
                  <circle cx="6" cy="16" r="2.2" fill="#fff"/>
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="curtain-body">
        {children}
      </div>
    </div>
  );
}

function NavGlyph({ kind, active = false }) {
  // Outline-only icons across all three tabs. Active state is bold label +
  // dark colour — no chip background. All glyphs are designed to balance
  // visually around the viewBox centre (x=11, y=11).
  if (kind === "home") return (
    <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11 L11 4 L19 11 V19 H14 V14 H8 V19 H3 Z"/>
    </svg>
  );
  if (kind === "catalog") return (
    <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.4"/>
      <rect x="12" y="3" width="7" height="7" rx="1.4"/>
      <rect x="3" y="12" width="7" height="7" rx="1.4"/>
      <rect x="12" y="12" width="7" height="7" rx="1.4"/>
    </svg>
  );
  if (kind === "cart") return (
    // Body trapezoid centred on x=11.5 (top 6→17, bottom 7→16); wheels
    // mirror that centre. Small handle stub on the left at x=2→4 gives
    // the visual mass on the left enough weight to anchor the glyph at
    // x=11 — matching the optical centre of Home and Catalog.
    <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5 H4 L7 14 H16 L18 7 H6"/>
      <circle cx="8.5" cy="17.5" r="1.4"/>
      <circle cx="14.5" cy="17.5" r="1.4"/>
    </svg>
  );
  return null;
}

// `cartCount` shows the red numeric badge on the cart tab. Defaults to 3 so the
// canonical demo screens carry the badge automatically; pass an explicit count or
// 0 to override. The badge always clears when the active tab is Cart.
// `cartBadge` (legacy) draws the smaller accent dot — kept for backwards-compat but
// the numeric badge is the canonical form.
function BottomNav({ active = "home", style = "icons-labels", cartBadge = false, cartCount = 3, onTabChange }) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "catalog", label: "Catalog" },
    { id: "cart", label: "Cart" },
  ];
  const showCount = active !== "cart" && cartCount != null && cartCount > 0;
  return (
    <div className="bottom-nav">
      {tabs.map(t => (
        <div
          key={t.id}
          className={"tab " + (active===t.id?"active":"")}
          onClick={onTabChange ? () => onTabChange(t.id) : undefined}
          onKeyDown={onTabChange ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTabChange(t.id); } } : undefined}
          role={onTabChange ? "button" : undefined}
          tabIndex={onTabChange ? 0 : undefined}
          style={onTabChange ? { cursor: "pointer" } : undefined}
        >
          {style !== "labels-only" && (
            <div className="ico svg">
              <span style={{position:"relative", display:"inline-flex"}}>
                <NavGlyph kind={t.id} active={active===t.id}/>
                {t.id==="cart" && showCount && (
                  <span className="cart-badge-num">{cartCount}</span>
                )}
                {t.id==="cart" && cartBadge && !showCount && active !== "cart" && (
                  <span style={{position:"absolute", top:-3, right:-3, width:8, height:8, background:"var(--accent)", borderRadius:"50%", border:"1.5px solid #fff"}}/>
                )}
              </span>
            </div>
          )}
          {style !== "icons-only" && <span>{t.label}</span>}
        </div>
      ))}
    </div>
  );
}

// ─── CURTAIN CONTENT STUBS ─────────────────────────────────────────────────

// Full Home-feed stub — schematic blocks indicating the curated, scrollable feed:
// hero promo with slider, recommendation rows, categories, widget tiles with
// internal 2x2 grids, pill row, promo strip, deals row with discount tags.
// Used inside Curtain Home position across the book — the canon Home content.
function HomeStub() {
  return (
    <>
      <div className="home-hero" style={{ minHeight: 110 }}>
        <div className="skel-row" style={{ width: "30%", height: 6, marginTop: 0, opacity: 0.55 }}/>
        <div className="skel-row" style={{ width: "75%", height: 14, marginTop: 10 }}/>
        <div className="skel-row" style={{ width: "55%", height: 8, marginTop: 6 }}/>
        <div style={{ marginTop: 14, width: 72, height: 22, borderRadius: 11, background: "rgba(0,0,0,0.18)" }}/>
        <div className="home-hero-dots">
          <span className="dot active"/><span className="dot"/><span className="dot"/><span className="dot"/>
        </div>
      </div>

      <div className="home-section-h">
        <div className="skel-row" style={{ width: "55%", height: 11, margin: 0 }}/>
        <div className="skel-row" style={{ width: 44, height: 8, margin: 0, opacity: 0.5 }}/>
      </div>
      <div className="home-row">
        {[0,1,2].map(i => (
          <div key={i} className="home-mini-card">
            <div className="home-mini-thumb"/>
            <div className="skel-row short" style={{ height: 6, margin: "6px 0 0" }}/>
            <div className="skel-row" style={{ width: "40%", height: 6, marginTop: 4 }}/>
          </div>
        ))}
      </div>

      <div className="home-section-h">
        <div className="skel-row" style={{ width: "48%", height: 11, margin: 0 }}/>
        <div className="skel-row" style={{ width: 44, height: 8, margin: 0, opacity: 0.5 }}/>
      </div>
      <div className="home-row">
        {[0,1,2].map(i => (
          <div key={i} className="home-mini-card" style={{ flex: "0 0 44%" }}>
            <div className="home-mini-thumb" style={{ height: 64 }}/>
            <div className="skel-row" style={{ width: "60%", height: 7, margin: "8px 0 0" }}/>
            <div className="skel-row" style={{ width: "35%", height: 6, marginTop: 4 }}/>
          </div>
        ))}
      </div>

      <div className="home-section-h">
        <div className="skel-row" style={{ width: "40%", height: 11, margin: 0 }}/>
      </div>
      <div className="home-row">
        {[0,1].map(i => (
          <div key={i} className="home-mini-card" style={{ flex: "0 0 47%" }}>
            <div className="skel-row" style={{ width: "55%", height: 8, margin: "0 0 8px" }}/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              <div className="home-mini-thumb" style={{ height: 32 }}/>
              <div className="home-mini-thumb" style={{ height: 32 }}/>
              <div className="home-mini-thumb" style={{ height: 32 }}/>
              <div className="home-mini-thumb" style={{ height: 32 }}/>
            </div>
          </div>
        ))}
      </div>

      <div className="home-section-h">
        <div className="skel-row" style={{ width: "36%", height: 11, margin: 0 }}/>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflow: "hidden" }}>
        {[44, 56, 38, 50, 42].map((w, i) => (
          <div key={i} style={{
            flex: `0 0 ${w}px`, height: 24, borderRadius: 12,
            background: "var(--line-2)",
          }}/>
        ))}
      </div>

      <div style={{
        background: "var(--line-2)", borderRadius: 10,
        padding: "12px 14px", marginBottom: 16,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{ flex: 1 }}>
          <div className="skel-row" style={{ width: "60%", height: 9, margin: 0 }}/>
          <div className="skel-row" style={{ width: "40%", height: 6, marginTop: 6 }}/>
        </div>
        <div style={{
          width: 56, height: 22, borderRadius: 11,
          background: "rgba(0,0,0,0.18)",
        }}/>
      </div>

      <div className="home-section-h">
        <div className="skel-row" style={{ width: "30%", height: 11, margin: 0 }}/>
        <div className="skel-row" style={{ width: 44, height: 8, margin: 0, opacity: 0.5 }}/>
      </div>
      <div className="home-row">
        {[0,1,2,3].map(i => (
          <div key={i} className="home-mini-card" style={{ flex: "0 0 28%", position: "relative" }}>
            <div style={{
              position: "absolute", top: 4, left: 4, width: 22, height: 10,
              borderRadius: 3, background: "rgba(198,40,40,0.85)",
            }}/>
            <div className="home-mini-thumb" style={{ height: 52 }}/>
            <div className="skel-row short" style={{ height: 6, margin: "6px 0 0" }}/>
            <div className="skel-row" style={{ width: "30%", height: 6, marginTop: 4 }}/>
          </div>
        ))}
      </div>
    </>
  );
}

function CatalogStub() {
  return (
    <div className="cards-grid">
      <div className="skel-card"><div className="skel-img"/><div className="skel-row med"/><div className="skel-row short"/></div>
      <div className="skel-card"><div className="skel-img"/><div className="skel-row med"/><div className="skel-row short"/></div>
      <div className="skel-card"><div className="skel-img"/><div className="skel-row med"/><div className="skel-row short"/></div>
      <div className="skel-card"><div className="skel-img"/><div className="skel-row med"/><div className="skel-row short"/></div>
    </div>
  );
}

function CartStub() {
  return (
    <>
      <div className="skel-card" style={{display:"flex", gap:10, alignItems:"center"}}>
        <div style={{width:50, height:50, background:"var(--line-2)", borderRadius:6}}/>
        <div style={{flex:1}}><div className="skel-row med"/><div className="skel-row short" style={{height:9}}/></div>
      </div>
      <div className="skel-card" style={{display:"flex", gap:10, alignItems:"center"}}>
        <div style={{width:50, height:50, background:"var(--line-2)", borderRadius:6}}/>
        <div style={{flex:1}}><div className="skel-row med"/><div className="skel-row short" style={{height:9}}/></div>
      </div>
    </>
  );
}

// Cart commit bar — flat plate pinned to the top edge of the bottom tab bar,
// inside the curtain. Total on the left, primary Checkout button on the right.
// NOT a sheet: no drag handle, no top corner radius, no shadow — the canonical
// «no sheet over sheet» rule means the curtain itself is already a sheet, so its
// commit affordance is a pinned bar, not a second sheet stacked on it. Price
// breakdown lives inline above this bar in the Cart list, not in a popout.
function CartCheckoutBar({ total = "184.90", label = "Checkout" }) {
  return (
    <div className="cart-cta">
      <div className="cart-cta-row">
        <div className="cart-total">
          <span className="cart-total-lbl">Total</span>
          <span className="cart-total-val">€ {total}</span>
        </div>
        <div className="cart-buy">{label}</div>
      </div>
    </div>
  );
}
// Back-compat alias — older render sites still import the Sheet name.
const CartCheckoutSheet = CartCheckoutBar;

// ─── CTA BUTTON + PRIMARY CTA WRAPPER ──────────────────────────────────────
// Single source of truth for the look of the primary action everywhere in the
// book. Canonical screen-anchored CTA: 50px height, 15px font, 600 weight,
// 14px radius, full-width.
//
// <CtaButton/>      — bare button. Use inline (inside curtain bodies, sheets,
//                     cart footers) where the surrounding container handles
//                     spacing. No sublink, no padded wrapper.
// <PrimaryCTA/>     — bare button + optional subordinate text **button** or
//                     **link** below. Use screen-anchored (corridor bottom,
//                     success exit, etc.).
//
// Three button tiers + one link across the book — roles, not styling:
//   • Primary   — the verb of the screen. One per screen.
//   • Secondary — a comparable-weight action paired with the primary,
//                 visually quieter so the primary stays dominant.
//                 Either in the footer (Cancel / Save) or inside a block.
//   • Tertiary  — subordinate action beneath the primary, semantically
//                 still a button. The quietest of the three.
//   • Link      — not an action; navigates to content (terms, privacy,
//                 help). Visually distinct from a button.
// Pass `subbutton="…"` for a tertiary action; `sublink="…"` for a real link.
// Visual styling for each tier lives in the design-system kit, not here.

function CtaButton({ label, dark = true, disabled = false, style }) {
  const bg = disabled ? "var(--line)" : (dark ? "var(--ink)" : "var(--accent)");
  const color = disabled ? "var(--muted)" : "#fff";
  return (
    <div style={{
      height: 50, background: bg, color,
      borderRadius: 14,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 15, fontWeight: 600,
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      ...(style || {}),
    }}>{label}</div>
  );
}

function PrimaryCTA({ label, subbutton, sublink, dark = true }) {
  // Bottom padding 31px — gives the CTA-block room above the home
  // indicator and matches the breathing space used by sheet CTAs (cf.
  // Discard sheet in Ch05). Raised the whole block ~15px vs the older
  // 16px pad so the subordinate text doesn't crowd the phone edge.
  // subbutton renders as a text button (no underline, medium weight).
  // sublink renders as a real link (dotted underline, regular weight).
  return (
    <div style={{padding:"12px 16px 31px", textAlign:"center"}}>
      <CtaButton label={label} dark={dark}/>
      {subbutton && (
        <div style={{
          marginTop:10, fontSize:12, color:"var(--muted)",
          fontWeight:500,
        }}>{subbutton}</div>
      )}
      {sublink && (
        <div style={{
          marginTop:10, fontSize:12, color:"var(--muted)",
          textDecoration:"underline", textDecorationStyle:"dotted",
          textUnderlineOffset:3
        }}>{sublink}</div>
      )}
    </div>
  );
}

Object.assign(window, {
  StatusBar, Phone, GarageBase, GarageBaseFull, Curtain, BottomNav,
  HomeStub, CatalogStub, CartStub, CartCheckoutBar, CartCheckoutSheet, PrimaryCTA, CtaButton,
});
