// ---------------------------------------------------------------
// P — Filters (Part II · Selection)
// ---------------------------------------------------------------
// One-step corridor that lets the user narrow a product list by attributes —
// placement, brand, value, etc. Opens from a drilled catalog via the filter
// icon in the surface header; commits via «Show results (N)»; ‹ returns to
// the catalog with the previously committed selection intact.
//
// Uses the configurator corridor header variant — see Ch05 «Discipline»:
// ‹ + trailing «Clear all» text action.

// ─── Building blocks ────────────────────────────────────────────────────

// Header for the filter corridor: ‹ back (left), title (centred), Clear all
// (text button, right). The new corridor header variant — ‹ keeps the
// canonical back semantics, the trailing Clear all empties the in-progress
// configuration without leaving the corridor.
function PFCorridorHeader({ title = "Filters" }) {
  return (
    <div style={{
      padding: "44px 16px 12px",
      borderBottom: "1px solid #ececec", background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{ width: 56, fontSize: 22, lineHeight: 1, color: "#111" }}>‹</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{title}</div>
      <div style={{ width: 56, textAlign: "right", fontSize: 13, fontWeight: 600, color: "#111" }}>Clear all</div>
    </div>
  );
}

// Selected-filter chip — orange pill with × button. Tap × removes the value.
// Lives in a horizontal row at the top of the body, summarising what's
// currently picked across all sections.
function PFActiveChip({ width = 60 }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      height: 28, padding: "0 6px 0 12px", borderRadius: 999,
      background: "#111", color: "#fff", flexShrink: 0,
    }}>
      <div className="skel-row" style={{ width, height: 6, margin: 0, background: "#fff", opacity: 0.9 }}/>
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        background: "rgba(255,255,255,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, fontWeight: 700,
      }}>×</div>
    </div>
  );
}

// Section header — mono uppercase title (TITLE TEXT) + optional skel-row
// subtitle / explainer beneath.
function PFSectionHead({ withSub = false, withFitment = false }) {
  return (
    <div style={{ padding: "18px 16px 10px" }}>
      <div className="skel-row" style={{
        width: 84, height: 8, margin: 0, background: "#b8b8b8", borderRadius: 2,
      }}/>
      {withSub && (
        <div style={{ marginTop: 8 }}>
          <div className="skel-row" style={{ width: "90%", height: 6, margin: 0 }}/>
          <div className="skel-row" style={{ width: "65%", height: 6, margin: "5px 0 0" }}/>
        </div>
      )}
      {withFitment && (
        <div style={{ marginTop: 10 }}>
          <span style={{
            display: "inline-block", padding: "4px 10px",
            border: "1px solid #d8d8d8", borderRadius: 999,
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            color: "#111", background: "#fff",
          }}>For your car · 4.2L</span>
        </div>
      )}
    </div>
  );
}

// Image card used for visual-choice sections (e.g. placement diagrams,
// orientation, position). Active card has the accent outline.
function PFImageCard({ active = false, glyph = "▱" }) {
  return (
    <div style={{
      flex: 1, height: 90,
      border: active ? "1.5px solid #111" : "1px solid #ececec",
      borderRadius: 10, background: "#fff",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 6,
    }}>
      <div style={{
        width: 60, height: 38, background: "#ececec", borderRadius: 6,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#9a9a9a", fontSize: 18,
      }}>{glyph}</div>
      <div className="skel-row" style={{ width: 44, height: 6, margin: 0 }}/>
    </div>
  );
}

// Brand-logo tile — placeholder for brand chips (Valeo, Brembo, etc.). We use
// a generic tile so the pattern stays brand-agnostic in this document.
function PFBrandTile() {
  return (
    <div style={{
      flex: 1, height: 44,
      border: "1px solid #ececec", borderRadius: 8, background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div className="skel-row" style={{ width: 36, height: 8, margin: 0, background: "#b8b8b8" }}/>
    </div>
  );
}

// Value pill — short labelled option with a count. Used for ranged
// attributes (speeds, capacities, sizes). Active pill has accent outline.
function PFValuePill({ active = false, w = "100%" }) {
  return (
    <div style={{
      flex: 1, height: 36, padding: "0 14px",
      border: active ? "1.5px solid #111" : "1px solid #ececec",
      borderRadius: 8, background: "#fff",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <div className="skel-row" style={{
        flex: 1, height: 7, margin: 0,
        background: active ? "#b8b8b8" : undefined,
      }}/>
      <div className="skel-row" style={{ width: 18, height: 6, margin: 0, opacity: 0.6 }}/>
    </div>
  );
}

// «Show more» — accent text link, left-aligned, used to expand a long
// value-pill list one section at a time.
function PFShowMore() {
  return (
    <div style={{
      padding: "10px 16px 0",
      fontSize: 12, fontWeight: 600, color: "#111",
    }}>Show more ›</div>
  );
}

// Bottom commit CTA — accent-filled, full width, carries the live count.
function PFShowResultsCta() {
  return (
    <div style={{
      padding: "12px 16px 18px", background: "#fff",
      borderTop: "1px solid #ececec",
    }}>
      <div style={{
        height: 44, background: "#111", color: "#fff", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600,
        fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      }}>Show results (120)</div>
    </div>
  );
}

// Container for a horizontal row of chips (cards / brands / pills). Allows the
// row to scroll horizontally if items overflow.
function PFRow({ children, cols = 2 }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 8, padding: "0 16px",
    }}>
      {children}
    </div>
  );
}

// ─── Bodies for trigger / corridor previews ────────────────────────────

// Active-chip row pinned at the top of the corridor body, summarising the
// current selection across all sections.
function PFChipRow() {
  return (
    <div style={{
      display: "flex", gap: 8, padding: "12px 16px",
      flexWrap: "wrap",
    }}>
      <PFActiveChip width={36} />
      <PFActiveChip width={70} />
      <PFActiveChip width={56} />
      <PFActiveChip width={66} />
    </div>
  );
}

// Full corridor body — chips + several filter sections.
function PFCorridorBody() {
  return (
    <div style={{
      position: "absolute", top: 78, left: 0, right: 0, bottom: 74,
      overflow: "hidden",
    }}>
      <PFChipRow />

      <PFSectionHead />
      <PFRow cols={2}>
        <PFImageCard active />
        <PFImageCard />
      </PFRow>

      <PFSectionHead />
      <PFRow cols={4}>
        <PFBrandTile />
        <PFBrandTile />
        <PFBrandTile />
        <PFBrandTile />
      </PFRow>
      <div style={{ marginTop: 8 }}>
        <PFRow cols={4}>
          <PFBrandTile />
          <div style={{ flex: 1 }}/>
          <div style={{ flex: 1 }}/>
          <div style={{ flex: 1 }}/>
        </PFRow>
      </div>

      <PFSectionHead withSub />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
        <PFRow cols={2}>
          <PFValuePill active />
          <PFValuePill />
        </PFRow>
        <PFRow cols={2}>
          <PFValuePill />
          <PFValuePill />
        </PFRow>
        <PFRow cols={2}>
          <PFValuePill />
          <PFValuePill />
        </PFRow>
      </div>
      <PFShowMore />
    </div>
  );
}

// Variant: per-fitment section with the fitment value surfaced as a mono
// chip beneath the section head (same shape as «Match to your car»).
function PFCorridorBodyFitment() {
  return (
    <div style={{
      position: "absolute", top: 78, left: 0, right: 0, bottom: 74,
      overflow: "hidden",
    }}>
      <PFChipRow />

      <PFSectionHead withFitment />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
        <PFRow cols={2}>
          <PFValuePill active />
          <PFValuePill />
        </PFRow>
        <PFRow cols={2}>
          <PFValuePill />
          <PFValuePill />
        </PFRow>
        <PFRow cols={2}>
          <PFValuePill />
          <PFValuePill />
        </PFRow>
      </div>
    </div>
  );
}

// ─── Trigger frames ────────────────────────────────────────────────────
// We reuse the canonical Drilled-catalog screen as the trigger surface.
// The filter icon on the right gains a numeric badge once the user has
// committed any selection.

function PFTriggerIdle() {
  return <CNCatalogDrilled />;
}

function PFTriggerWithBadge() {
  return <CNCatalogDrilled filterBadge={4} />;
}

// ─── Corridor frames ───────────────────────────────────────────────────

function PFCorridor() {
  return (
    <Phone>
      <div style={{
        position: "absolute", inset: 0, background: "#f7f6f4",
        fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      }}>
        <PFCorridorHeader />
        <PFCorridorBody />
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
        }}>
          <PFShowResultsCta />
        </div>
      </div>
    </Phone>
  );
}

function PFCorridorFitment() {
  return (
    <Phone>
      <div style={{
        position: "absolute", inset: 0, background: "#f7f6f4",
        fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      }}>
        <PFCorridorHeader />
        <PFCorridorBodyFitment />
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
        }}>
          <PFShowResultsCta />
        </div>
      </div>
    </Phone>
  );
}

// ─── The pattern ───────────────────────────────────────────────────────

function PFilters() {
  return (
    <Section id="p-filters">
      <PatternHead title="Filters"
        category="Selection"
        lede={<>A <span className="hl">filters corridor</span> lets the user narrow a long product list by attributes — placement, brand, fitment value, dimensions. Opens from the filter icon in the drilled catalog header; commits via «Show results (N)»; the icon then carries a badge with the count of active filters until the user clears them.</>} />

      <Callout label="Autodoc reading">
        Filters live in a <b>one-step corridor</b>, not a sheet. The catalog the user came from is still in their mind; the corridor wraps the whole task in its own surface. The header uses the <b>configurator variant</b> documented in Ch05: ‹ on the left + a trailing <i>Clear all</i> text action on the right. The commit verb on the sticky CTA — black filled, canonical Primary — carries the live result count so the user sees the impact before tapping. Active chips at the top of the body summarise what's currently picked; tapping the × on a chip removes that single value without leaving the corridor.
      </Callout>

      <H3>Trigger — the filter icon in the drilled catalog</H3>
      <p>The filter affordance lives in the surface header next to the search icon — always visible while the user is on a drilled catalog page. Once any filter is committed, a small ink-filled badge sits over the icon with the count, so the user can see at a glance that the list they're looking at is narrowed.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Idle — no filters yet.</b> Search and filter icons sit on the right of the surface header. Tapping the filter icon opens the corridor.">
          <PFTriggerIdle />
        </FrameCell>
        <FrameCell caption="<b>Filters applied — badge appears.</b> The number on the badge counts active filter <i>values</i>, not sections — a brand + two sizes + one placement reads as «4».">
          <PFTriggerWithBadge />
        </FrameCell>
      </div>

      <H3>The corridor</H3>
      <p>One full-screen surface, header at the top, sticky commit CTA at the bottom, every section scrolls in between. Active chips pinned just under the header summarise the in-progress configuration; the rest of the body is a sequence of titled sections — each a different shape of choice (image card grid, brand tiles, value pills).</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Full corridor.</b> Header — chips row — sections — sticky «Show results (N)». Active values inside each section carry the ink outline; the filled-black CTA at the bottom is the only filled affordance on the screen.">
          <PFCorridor />
        </FrameCell>
        <FrameCell caption="<b>Fitment-aware section.</b> When a section depends on the active car (oil capacity, tyre size, brake disc Ø) the matching value surfaces as a mono chip under the section head — same shape as «Match to your car» on the drilled catalog. The user can still choose any value; the fitment hint is informational, not enforced.">
          <PFCorridorFitment />
        </FrameCell>
      </div>

      <H3>Section shapes</H3>
      <p>Each section adapts to the shape of the attribute. Three canonical shapes cover almost everything; a fourth is a list with search when the value space is long (brands &gt; 20, dimensions &gt; 40).</p>

      <Rules items={[
        "<b>Image cards.</b> For attributes where an image distinguishes the choice — placement diagrams, orientation, position. 2-column grid, active card carries the ink outline.",
        "<b>Brand tiles.</b> Logo-first grid for brand selection. 4-column compact tile, no count on the tile itself.",
        "<b>Value pills.</b> Short labelled values with a count — «ALL (12)», «V = to 240 km/h (12)». 2-column grid; «Show more» expands the section without leaving the corridor.",
        "<b>Searchable list.</b> When the value space is long (brands at scale, dimensions, fitment IDs) the section opens as a List Filtering inner surface — same canon as List Filtering pattern.",
      ]}/>

      <H3>Rules</H3>
      <Rules items={[
        "<b>Filters are a corridor, not a sheet.</b> The user is configuring a set; the task gets its own full surface so chips, sections, and live count read together. Sheets would split the user's attention between corridor task and parent list.",
        "<b>Header is the configurator variant (see Ch05).</b> ‹ on the left returns to the parent with the previously committed selection intact; <i>Clear all</i> on the right empties the in-progress configuration without leaving.",
        "<b>Active chips at the top.</b> Each committed value is a chip; tapping × removes that value. Chip summary lives in the corridor body, never in the header.",
        "<b>One commit verb, live count.</b> The sticky CTA is «Show results (N)», where N updates as the user toggles values. The CTA is the canonical filled-black Primary — the only filled affordance on the corridor — so it reads as the obvious next step.",
        "<b>Trigger badge on the parent surface.</b> Once any filter is active, the catalog filter icon carries a small ink-filled count badge until the user clears the configuration. Counts values, not sections.",
        "<b>Active selection = ink outline, never filled.</b> Active image cards and value pills carry the ink border (1.5px); the fill stays white. The single filled affordance on the screen is the commit CTA at the bottom, so the user always reads it as the obvious next step.",
        "<b>Fitment hint, never gate.</b> Sections whose values depend on the active car surface the matching value in the subtitle. The user can still choose anything; the hint is a quiet help, not a constraint.",
      ]}/>

      <DoDont
        doItem="Open Filters from the drilled catalog as a corridor with a ‹ / Clear all header and a single Show results CTA. Mark active values with the ink outline; reserve the filled affordance for the commit button only."
        dontItem="Don't ship Filters as a bottom sheet — sheet over Curtain breaks the layer canon and splits the user's attention. Don't fill active values — the commit CTA must stay the only filled affordance on the screen. Don't auto-apply on every tap — the user composes a set, then commits once."
      />
    </Section>
  );
}
window.PFilters = PFilters;
