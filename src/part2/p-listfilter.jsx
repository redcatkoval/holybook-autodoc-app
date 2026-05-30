// ---------------------------------------------------------------
// P — List Filtering
// ---------------------------------------------------------------

// Magnifier icon — same shape as the Catalog Curtain search field and the
// Search overlay's top bar. Keeps every search-shaped input consistent.
function LFMagnifier({ color = "#6b6b6b" }) {
  return (
    <span style={{ position: "relative", width: 14, height: 14, flexShrink: 0 }}>
      <span style={{
        position: "absolute", inset: 0, width: 14, height: 14,
        border: `1.5px solid ${color}`, borderRadius: "50%",
      }}/>
      <span style={{
        position: "absolute", right: -3, bottom: -3,
        width: 6, height: 1.5, background: color, transform: "rotate(45deg)",
      }}/>
    </span>
  );
}

// Top bar of the list-filter screen — title + back affordance only. When `title`
// is empty a placeholder bar renders instead of literal text — keeps the demo
// generic (could be Orders, Cars, Addresses, Brand step inside a corridor…).
function LFHeader({ title = "" }) {
  return (
    <div style={{
      padding: "44px 14px 12px",
      borderBottom: "1px solid #ececec",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "#fff",
    }}>
      <div style={{ width: 28, fontSize: 18, color: "#111" }}>‹</div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {title
          ? <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{title}</div>
          : <div className="skel-row" style={{ width: 100, height: 10, margin: 0 }}/>}
      </div>
      <div style={{ width: 28 }}/>
    </div>
  );
}

// Inline search input — visible field always present (in-place filter, not an
// overlay trigger). Same magnifier glyph and field dimensions as the Search
// overlay's top bar. Cancel appears next to it when the field is focused.
// Optional onClick handlers make it interactive.
function LFInput({ value = "", focused = false, hasClear = false, withCancel = false, onClickField, onClickClear, onClickCancel, placeholder = "Search" }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "10px 12px", alignItems: "center", background: "#fff" }}>
      <div
        onClick={onClickField}
        style={{
          flex: 1, height: 36, background: "#f7f6f4", borderRadius: 10,
          display: "flex", alignItems: "center", padding: "0 12px", gap: 8,
          cursor: onClickField ? "pointer" : "default",
        }}
      >
        <LFMagnifier />
        <span style={{ flex: 1, fontSize: 12, color: value ? "#111" : "#9a9a9a", fontFamily: '"JetBrains Mono", monospace' }}>
          {value || placeholder}
        </span>
        {hasClear && (
          <span
            onClick={(e) => { e.stopPropagation(); onClickClear && onClickClear(); }}
            style={{
              width: 14, height: 14, borderRadius: "50%", background: "#9a9a9a",
              color: "#fff", fontSize: 9, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: onClickClear ? "pointer" : "default",
            }}
          >×</span>
        )}
      </div>
      {withCancel && (
        <span
          onClick={onClickCancel}
          style={{ fontSize: 12, color: "#111", cursor: onClickCancel ? "pointer" : "default" }}
        >Cancel</span>
      )}
    </div>
  );
}

// Renders a list of items, optionally bolding the matched substring inside each row.
function LFList({ items = null, count = 9, matchedPrefix = "", label = "Option" }) {
  // Back-compat — if items is null, render `count` generic rows.
  const rows = items
    || Array.from({ length: count }).map((_, i) => `${label} ${i + 1}`);
  const renderRow = (row, i) => {
    if (!matchedPrefix) return row;
    const idx = row.toLowerCase().indexOf(matchedPrefix.toLowerCase());
    if (idx === -1) return row;
    return (
      <>
        {row.slice(0, idx)}
        <b>{row.slice(idx, idx + matchedPrefix.length)}</b>
        {row.slice(idx + matchedPrefix.length)}
      </>
    );
  };
  return (
    <div style={{ background: "#fff", flex: 1, overflow: "hidden" }}>
      {rows.map((row, i) => (
        <div key={i} style={{
          padding: "12px 14px", borderBottom: "1px solid #ececec",
          fontSize: 12, color: "#111",
        }}>{renderRow(row, i)}</div>
      ))}
    </div>
  );
}

// Bottom-anchored keyboard stub.
function LFKeyboardStub({ active = false }) {
  const row1 = ["q","w","e","r","t","y","u","i","o","p"];
  const row2 = ["a","s","d","f","g","h","j","k","l"];
  const row3 = ["z","x","c","v","b","n","m"];
  const key = (label, idx) => (
    <div key={`${label}-${idx}`} style={{
      flex: 1, height: 26, background: "#cfd2d6", borderRadius: 4,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, color: "#111", margin: "0 2px",
    }}>{label}</div>
  );
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      background: "#d3d6da", padding: "6px 4px 8px",
      borderTop: "1px solid #b8bbc0",
    }}>
      <div style={{ display: "flex", margin: "2px 0" }}>{row1.map(key)}</div>
      <div style={{ display: "flex", margin: "2px 0", padding: "0 14px" }}>{row2.map(key)}</div>
      <div style={{ display: "flex", margin: "2px 0", padding: "0 4px" }}>
        <div style={{ flex: 1.4 }}/>{row3.map(key)}<div style={{ flex: 1.4 }}/>
      </div>
      <div style={{ display: "flex", margin: "4px 0 0", gap: 4 }}>
        <div style={{ flex: 1.4, height: 26, background: "#b8bbc0", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#111" }}>123</div>
        <div style={{ flex: 4, height: 26, background: "#e9ecef", borderRadius: 4 }}/>
        <div style={{
          flex: 1.8, height: 26,
          background: active ? "#111" : "#9a9a9a",
          color: "#fff", borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 600,
          opacity: active ? 1 : 0.55,
        }}>Search</div>
      </div>
    </div>
  );
}

// Compact inline no-results state.
function LFNoResults() {
  return (
    <div style={{
      padding: "44px 16px", textAlign: "center", background: "#fff",
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: "50%", background: "#ececec",
        margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center",
        color: "#9a9a9a", fontSize: 16,
      }}>?</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>No results found</div>
    </div>
  );
}

// Above-list block that hides on focus (banners, carousels, promo).
function LFAboveList() {
  return (
    <div style={{ padding: "8px 12px", background: "#fff" }}>
      <div style={{
        height: 80, background: "#ececec", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#9a9a9a", fontSize: 11,
      }}>Promo / carousel</div>
    </div>
  );
}

// Auto-loop animation — cycles through the four states of List Filtering:
// idle → focused (empty) → filtering «brake» → filtering «zzz» (no results)
// → idle.
function ListFilterPrototype() {
  const [step, setStep] = useState(0); // 0=idle, 1=focused empty, 2=brake, 3=zzz
  const timer = React.useRef(null);
  React.useEffect(() => {
    const cycle = { 0: 2200, 1: 1800, 2: 2500, 3: 2000 };
    timer.current = setTimeout(() => setStep(s => (s + 1) % 4), cycle[step]);
    return () => clearTimeout(timer.current);
  }, [step]);
  const items = [
    "Brake pads front",
    "Brake fluid DOT 4",
    "Engine oil 5W-30",
    "Oil filter",
    "Cabin filter",
    "Spark plug",
    "Wiper blade",
    "Headlight bulb",
    "Battery 60Ah",
  ];
  const query = step === 2 ? "brake" : step === 3 ? "zzz" : "";
  const focused = step !== 0;
  const filtered = query ? items.filter(i => i.toLowerCase().includes(query.toLowerCase())) : items;
  const noResults = focused && query && filtered.length === 0;
  return (
    <Phone size="lg">
      <LFHeader />
      {!focused && <LFAboveList />}
      <LFInput
        value={query}
        focused={focused}
        hasClear={query.length > 0}
        withCancel={focused}
      />
      {noResults
        ? <LFNoResults />
        : <LFList items={filtered} matchedPrefix={query} />}
      {focused
        ? <LFKeyboardStub active={query.length > 0} />
        : <BottomNav active="home"/>}
    </Phone>
  );
}

function PListFilter() {
  return (
    <Section id="p-listfilter">
      <PatternHead num="04" title="List Filtering" category="Navigation and search"
        lede={<><span className="hl">List filtering</span> is a local filter inside whatever surface the user is on — a tabbed screen, a Corridor step, a settings hub. The user narrows down a list they already see, without going anywhere new. Only the list responds, growing or shrinking as the user types.</>} />


      <Callout label="Autodoc reading">
        Two ways the user gets a list shorter; they&apos;re not the same thing. The global <b>Search overlay</b> is a navigation tool reached from a search icon — the user looks for something in the whole catalogue, the shell is replaced by a Corridor for the duration. <b>List Filtering</b> is the opposite: it&apos;s an <i>always-visible</i> field on the surface itself; the user has a finite list in front of them and just wants to narrow it, the surface they are on stays put. Use it when the user already arrived at the right surface (their orders, their cars, the brand step inside an add-car Corridor, a long settings list) and only needs the long list to get shorter.
      </Callout>

      <div className="frames-row" style={{ alignItems: "flex-start" }}>
        <FrameCell>
          <ListFilterPrototype />
        </FrameCell>
      </div>

      <div className="caption" style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
        color: "var(--muted)", letterSpacing: "0.04em",
        maxWidth: 904, marginTop: 12, lineHeight: 1.55,
      }}>
        Four states on one phone, looping. <b style={{color:"var(--ink)"}}>Idle</b> — full list, optional banner above, surface chrome intact (tab bar, header). <b style={{color:"var(--ink)"}}>Focus</b> — keyboard rises, the above-list block collapses out, <b style={{color:"var(--ink)"}}>Cancel</b> appears next to the field. <b style={{color:"var(--ink)"}}>Filtering «brake»</b> — list narrows live, matched letters render bold. <b style={{color:"var(--ink)"}}>«zzz»</b> — list collapses into the compact <b style={{color:"var(--ink)"}}>No results</b> state. → back to Idle.
      </div>

      <H3>Discipline</H3>
      <Rules items={[
        "<b>Not a destination.</b> The surface stays put. List Filtering is an input that lives inside a screen or a Corridor step — never a screen of its own. Use it on finite collections the user is already inside (orders, cars, address book, brands, countries); don't reach for it when the user wants to search the whole catalogue — that's the global Search overlay.",
        "<b>Live, in-place, no autocomplete.</b> The list narrows with every keystroke; matched letters render bold inside each row. Keyboard autocomplete stays off — brand names, OEM codes and unique identifiers would be auto-corrected and break the search. The Search key on the keyboard is inert in this context — there is nothing to commit, the list is already the result. Debounce only when the list is fetched from the server (around 150–200 ms); local lists filter instantly.",
        "<b>When the list is fitment-scoped, the active car is sovereign.</b> Fitment-sensitive lists (saved parts, compatible brands, recommended kits) are already pre-filtered to the active car before List Filtering layers on top. List Filtering never re-scopes the car — it just narrows what fitment already produced.",
        "<b>What hides on focus — only what sat above the list.</b> Surface chrome (header, tab bar, Corridor step header) stays put. Banners, carousels, promo blocks and category chips that sat above the list collapse out on focus to give the list the whole content area. Cancel restores them.",
        "<b>No-results — inline, small, no CTA.</b> When nothing matches, the list is replaced by a compact icon-and-title state («No results found»). The user&apos;s recovery is the clear (×) on the field; the mini-empty-state needs no CTA of its own.",
      ]}/>

      <DoDont
        doItem="Use List Filtering on a long list of addresses or saved cars, or on the brand step of an add-car Corridor. The user is already on the right surface; they just want to find their item among many. Nothing around the list changes — only the list itself."
        dontItem="Don't open the global Search overlay to filter a screen-level list. The user did not ask to leave — they asked to see less. Don't autocomplete brand names; the user knows what they typed."
      />
    </Section>
  );
}
window.PListFilter = PListFilter;
