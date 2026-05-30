// ---------------------------------------------------------------
// P — Search (Full-screen Overlay)
// ---------------------------------------------------------------

// Magnifier icon matching the Catalog Curtain search field — circle + handle stub.
function MagnifierIcon({ color = "#6b6b6b" }) {
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

// Top bar of the overlay: search field on the left, Cancel button on the right.
// Field matches the Catalog Curtain search field exactly — same height, background,
// magnifier glyph — so opening the overlay reads as «the same field, now active».
function SearchTopBar({ value = "", showClear = false, onClickField, onClickClear, onClickCancel }) {
  return (
    <div style={{
      display: "flex", gap: 8, padding: "44px 12px 10px", alignItems: "center",
      borderBottom: "1px solid #ececec", background: "#fff",
    }}>
      <div
        onClick={onClickField}
        style={{
          flex: 1, height: 36, background: "#f7f6f4", borderRadius: 10,
          display: "flex", alignItems: "center", padding: "0 12px", gap: 8,
          cursor: onClickField ? "pointer" : "default",
        }}
      >
        <MagnifierIcon />
        <span style={{ flex: 1, fontSize: 12, color: value ? "#111" : "#9a9a9a", fontFamily: '"JetBrains Mono", monospace' }}>
          {value || "Search"}
        </span>
        {showClear && (
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
      <span
        onClick={onClickCancel}
        style={{ fontSize: 12, color: "#111", cursor: onClickCancel ? "pointer" : "default" }}
      >Cancel</span>
    </div>
  );
}

// Recent search rows: clock icon, query text, ×.
function RecentSearch({ items = ["brake pads front", "oil filter", "spark plug 0.9"], showClear = true }) {
  return (
    <div style={{ padding: "12px 14px 4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em" }}>Recent search</div>
        {showClear && <div style={{ fontSize: 11, color: "#6b6b6b", fontWeight: 500 }}>Clear</div>}
      </div>
      {items.map((q, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
          borderBottom: i < items.length - 1 ? "1px solid #ececec" : "none",
        }}>
          <span style={{ fontSize: 10, color: "#9a9a9a" }}>◷</span>
          <span style={{ flex: 1, fontSize: 12, color: "#111" }}>{q}</span>
          <span style={{ fontSize: 10, color: "#9a9a9a" }}>×</span>
        </div>
      ))}
    </div>
  );
}

// Search history — chips with × (dismissable). Used in the modern idle state.
function SearchHistoryChips({ items = ["brake pads", "5W-30 oil", "wiper blade", "cabin air filter", "ngk spark plug"], onRemove, onClearAll }) {
  if (!items.length) return null;
  return (
    <div style={{ padding: "12px 14px 8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>Search history</div>
        <div
          onClick={onClearAll}
          style={{ fontSize: 11, color: "#111", fontWeight: 500, cursor: onClearAll ? "pointer" : "default" }}
        >Clear all</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((q, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 10px", border: "1px solid #ececec", borderRadius: 14,
            background: "#fff", fontSize: 11, color: "#111",
          }}>
            {q}
            <span
              onClick={() => onRemove && onRemove(i)}
              style={{ color: "#9a9a9a", fontSize: 10, cursor: onRemove ? "pointer" : "default" }}
            >×</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Recommended — horizontal marketing slider laid out in TWO rows. ‹ › chevrons
// scroll both rows together. Cards are tappable in the prototype (any tap on a
// card resets the search to the idle state).
function RecommendedSlider({
  items = ["Engine", "Motor mounts", "Pistons", "Oil filters", "Radiators", "Wipers", "Wheels", "Batteries", "Spark plugs", "Air filters"],
  page = 0,
  pageSize = 8,
  onPrev,
  onNext,
  onClickCard,
}) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = page * pageSize;
  const visible = items.slice(start, start + pageSize);
  const row1 = visible.slice(0, 4);
  const row2 = visible.slice(4, 8);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;
  const Card = (label, i) => (
    <div
      key={i + label}
      onClick={onClickCard}
      style={{
        flex: 1, minWidth: 0,
        background: "#f7f6f4", borderRadius: 8, padding: 6,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        cursor: onClickCard ? "pointer" : "default",
      }}
    >
      <div style={{ width: "100%", height: 36, background: "#ececec", borderRadius: 4 }}/>
      <div style={{ fontSize: 8, color: "#111", textAlign: "center", lineHeight: 1.15, fontWeight: 500 }}>{label}</div>
    </div>
  );
  return (
    <div style={{ padding: "10px 0 12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 14px", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>Recommended</div>
        <div style={{ display: "flex", gap: 4 }}>
          <span
            onClick={canPrev ? onPrev : null}
            style={{
              width: 18, height: 18, borderRadius: "50%",
              border: "1px solid #ececec",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: canPrev ? "#111" : "#cfcfcf",
              cursor: canPrev && onPrev ? "pointer" : "default",
            }}
          >‹</span>
          <span
            onClick={canNext ? onNext : null}
            style={{
              width: 18, height: 18, borderRadius: "50%",
              border: "1px solid #ececec",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: canNext ? "#111" : "#cfcfcf",
              cursor: canNext && onNext ? "pointer" : "default",
            }}
          >›</span>
        </div>
      </div>
      <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 6 }}>{row1.map(Card)}</div>
        {row2.length > 0 && <div style={{ display: "flex", gap: 6 }}>{row2.map(Card)}</div>}
      </div>
    </div>
  );
}

// Discover more — vertical list of quick-link categories. Lives below Recommended in idle.
function DiscoverMore({ items = ["Brake discs", "Oil filter", "Wiper blades", "Spark plugs", "Shock absorbers"] }) {
  return (
    <div style={{ padding: "8px 14px 8px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 6 }}>Discover more</div>
      <div>
        {items.map((c, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: i < items.length - 1 ? "1px solid #ececec" : "none",
          }}>
            <span style={{ fontSize: 12, color: "#111" }}>{c}</span>
            <span style={{ fontSize: 12, color: "#9a9a9a" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Top action row in typing state — commits the typed string to the full result
// page. Wording carries fitment context — the search is matched to the user's
// selected car (active car drives every list, every price, every match).
function SearchAllProductsRow({ query = "brake" }) {
  return (
    <div style={{
      margin: "10px 14px 6px", padding: "10px 12px",
      background: "#f7f6f4", borderRadius: 8,
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ fontSize: 12, color: "#111", fontWeight: 600 }}>
        Search «{query}» — matched to your selected car
      </span>
    </div>
  );
}

// Section divider (PARTS / KITS) — small uppercase mono label between groups of results.
function TypingSectionDivider({ label }) {
  return (
    <div style={{
      padding: "10px 14px 4px",
      fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
      color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.14em",
      fontWeight: 600,
    }}>{label}</div>
  );
}

// Suggestion row with thumb, bold-prefix text, and right-side category tag.
function TypingSuggestionRow({ thumb = "filled", prefix = "brake", rest = " pads", tag = "Brakes", kit = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 14px",
      borderBottom: "1px solid #ececec",
    }}>
      {kit ? (
        <div style={{
          width: 26, height: 26, background: "#f7f6f4", borderRadius: 5, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: 14, height: 14 }}>
            <div style={{ background: "#9a9a9a", borderRadius: 1 }}/>
            <div style={{ background: "#9a9a9a", borderRadius: 1 }}/>
            <div style={{ background: "#9a9a9a", borderRadius: 1 }}/>
            <div style={{ background: "#9a9a9a", borderRadius: 1 }}/>
          </div>
        </div>
      ) : (
        <div style={{ width: 26, height: 26, background: "#ececec", borderRadius: 5, flexShrink: 0 }}/>
      )}
      <span style={{ flex: 1, fontSize: 12, color: "#111" }}>
        <span style={{ background: "#ffe9df", borderRadius: 2, padding: "0 1px", fontWeight: 600 }}>{prefix}</span>
        {rest}
      </span>
      <span style={{
        fontSize: 9, color: "#6b6b6b",
        padding: "2px 8px", border: "1px solid #ececec", borderRadius: 10,
        background: "#fff",
      }}>{tag}</span>
    </div>
  );
}

// Categories grid — clickable chips for quick filters.
function CategoriesGrid() {
  const cats = ["Tyres", "Oils", "Brakes", "Batteries", "Filters", "Spark plugs"];
  return (
    <div style={{ padding: "10px 14px 8px" }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Categories</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {cats.map((c, i) => (
          <span key={i} style={{
            padding: "6px 10px", border: "1px solid #d8d8d8", borderRadius: 14,
            fontSize: 11, color: "#111", background: "#fff",
          }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

// Query suggestions — autocomplete rows with the typed prefix bold.
function QuerySuggestions({ prefix = "brak", items = ["e pads front", "e fluid DOT 4", "e disc rear", "e cleaner spray"] }) {
  return (
    <div style={{ padding: "10px 14px 4px" }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Suggestions</div>
      {items.map((rest, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
          borderBottom: "1px solid #ececec",
          fontSize: 12, color: "#111",
        }}>
          <span style={{ fontSize: 10, color: "#9a9a9a" }}>↗</span>
          <span><b>{prefix}</b>{rest}</span>
        </div>
      ))}
    </div>
  );
}

// Instant results — top product matches surfaced directly in the suggestions.
function InstantResults() {
  return (
    <div style={{ padding: "10px 14px 8px" }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Top results</div>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          display: "flex", gap: 10, padding: "8px 0",
          borderBottom: i < 2 ? "1px solid #ececec" : "none",
        }}>
          <div style={{ width: 34, height: 34, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#111" }}>Brake pads · front · BMW</div>
            <div style={{ fontSize: 10, color: "#6b6b6b", marginTop: 2 }}>OEM 34116858046</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Bottom-anchored keyboard stub. `active` darkens the Search action key.
function KeyboardStub({ active = false }) {
  const row1 = ["q","w","e","r","t","y","u","i","o","p"];
  const row2 = ["a","s","d","f","g","h","j","k","l"];
  const row3 = ["z","x","c","v","b","n","m"];
  const key = (label, extra) => (
    <div key={label + Math.random()} style={{
      flex: extra?.flex ?? 1, height: 28, background: "#cfd2d6", borderRadius: 4,
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
      <div style={{ display: "flex", margin: "2px 0" }}>{row1.map(k => key(k))}</div>
      <div style={{ display: "flex", margin: "2px 0", padding: "0 14px" }}>{row2.map(k => key(k))}</div>
      <div style={{ display: "flex", margin: "2px 0", padding: "0 4px" }}>
        <div style={{ flex: 1.4 }}/>{row3.map(k => key(k))}<div style={{ flex: 1.4 }}/>
      </div>
      <div style={{ display: "flex", margin: "4px 0 0", gap: 4 }}>
        <div style={{ flex: 1.4, height: 28, background: "#b8bbc0", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#111" }}>123</div>
        <div style={{ flex: 4, height: 28, background: "#e9ecef", borderRadius: 4 }}/>
        <div style={{
          flex: 1.8, height: 28,
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

// Soft inline warning that hangs above suggestions when the user has no car selected.
function NoCarWarning() {
  return (
    <div style={{
      margin: "10px 14px 0", padding: "10px 12px",
      background: "#fff3e0", borderRadius: 8, display: "flex", gap: 10,
      alignItems: "flex-start",
    }}>
      <span style={{
        width: 16, height: 16, borderRadius: "50%", background: "#ff9800",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, flexShrink: 0,
      }}>!</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: "#111", lineHeight: 1.4, marginBottom: 8 }}>
          Be sure to choose a car, otherwise you risk to buy an item that does not fit your car.
        </div>
        <div style={{
          display: "inline-block", padding: "6px 12px", background: "#111", color: "#fff",
          borderRadius: 6, fontSize: 11, fontWeight: 600,
        }}>Add car</div>
      </div>
    </div>
  );
}

// Search overlay container — the Corridor surface that replaces the shell.
function SearchOverlay({ children }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      zIndex: 3, display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      {children}
    </div>
  );
}

// Interactive prototype — full search flow in one phone.
// States: parent (Catalog with search icon) → before (overlay with history /
// Recommended / Discover, no keyboard) → focused (input tapped, keyboard rises,
// no text yet — browse blocks still visible) → typing (input tapped again,
// query «brake» fills in, suggestions replace browse blocks). Try:
// — tap the search icon on Catalog to open the overlay (no keyboard)
// — tap the input to raise the keyboard (still browse blocks)
// — tap the input again to start typing (suggestions appear)
// — tap × in the field to clear back to focused (keyboard stays up)
// — tap a chip × to remove a history item; tap Clear all to wipe history
// — tap ‹ › on Recommended to scroll the marketing slider
// — tap any recommendation card to return to the before state
// — tap Cancel to close the overlay and return to Catalog
// Auto-loop animation: parent (Catalog) → before (overlay opens, no keyboard) →
// focused (input tapped, keyboard rises, no text) → typing (text appears,
// suggestions replace browse blocks) → parent.
function SearchPrototype() {
  const [view, setView] = useState("parent");
  const timer = React.useRef(null);
  React.useEffect(() => {
    const cycle = { parent: 2200, before: 2200, focused: 1500, typing: 2500 };
    const next = { parent: "before", before: "focused", focused: "typing", typing: "parent" };
    timer.current = setTimeout(() => setView(next[view]), cycle[view]);
    return () => clearTimeout(timer.current);
  }, [view]);
  const recoItems = [
    "Engine", "Motor mounts", "Pistons", "Oil filters",
    "Radiators", "Wipers", "Wheels", "Batteries",
  ];
  const history = ["brake pads", "5W-30 oil", "wiper blade", "cabin air filter", "ngk spark plug"];
  const query = view === "typing" ? "brake" : "";

  if (view === "parent") {
    return (
      <CNCatalogProposed
        activeCategory={0}
        promoPosition="middle"
        size="lg"
      />
    );
  }
  return (
    <Phone size="lg">
      <SearchOverlay>
        <SearchTopBar
          value={query}
          showClear={query.length > 0}
        />
        <div style={{ flex: 1, overflow: "hidden" }}>
          {view === "before" || view === "focused" ? (
            <>
              <SearchHistoryChips items={history} />
              <RecommendedSlider items={recoItems} page={0} pageSize={8} />
              <DiscoverMore />
            </>
          ) : (
            <>
              <SearchAllProductsRow query={query} />
              <TypingSectionDivider label="Parts" />
              <TypingSuggestionRow prefix="Brake" rest=" fluids & lubricants" tag="Oils, Fluids" />
              <TypingSuggestionRow prefix="Brake" rest=" rotors" tag="Brakes" />
              <TypingSuggestionRow prefix="Brake" rest=" pads" tag="Brakes" />
              <TypingSuggestionRow prefix="Brake" rest=" calipers" tag="Brakes" />
              <TypingSectionDivider label="Kits" />
              <TypingSuggestionRow prefix="Brake" rest=" rotors service kit" tag="Kit" kit />
            </>
          )}
        </div>
        {(view === "focused" || view === "typing") && <KeyboardStub active={query.length > 0} />}
      </SearchOverlay>
    </Phone>
  );
}

function P12Search() {
  const anatAnno = { left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45 };

  return (
    <Section id="p-search">
      <PatternHead num="02" title="Search" category="Navigation and search"
        lede={<>A <span className="hl">full-screen search overlay</span> is the user's main navigation tool through a large catalogue. Triggered by tapping the search field in the Catalog Curtain, the overlay replaces the shell entirely — My AUTODOC, the Curtain header, and the tab bar all disappear — and gives the user one focused job: find what they came for. <i>Search lives on Catalog, never on Home.</i> Suggestions and history seed the screen so the user is never staring at a blank page.</>} />


      <Callout label="Autodoc reading">
        Autodoc's catalogue is large and lives behind technical names — OEM codes, part categories, brand-specific terms. The search overlay turns that scale into something approachable: history, marketing slider and quick-link discovery before the user types a single letter; live grouped suggestions with fitment scoping once they do. Architecturally the overlay is a <b>Corridor</b> — the shell goes away, one task in focus. Search is a <i>read-only</i> corridor: nothing is committed inside it, so it uses <b>Cancel</b> in the header instead of <code>‹</code>, exit is immediate and unconfirmed, and the scroll position on the parent screen is preserved.
      </Callout>

      <H3>Anatomy</H3>
      <FrameRow>
        <FrameCell caption="<b>Anatomy of the search overlay.</b> Five pieces every search overlay carries: top bar with field + Cancel, Search history chips, Recommended slider (marketing block), Discover more quick-links, and the primary Search action on the system keyboard.">
          <div className="annot-phone" style={{ padding: "0 460px 0 0" }}>
            <Phone size="lg">
              <SearchOverlay>
                <SearchTopBar />
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <SearchHistoryChips />
                  <RecommendedSlider />
                  <DiscoverMore items={["Brake discs", "Oil filter", "Wiper blades"]} />
                </div>
                <KeyboardStub active={false} />
              </SearchOverlay>
            </Phone>
            <div className="anno" style={{ top: 53, ...anatAnno }}>
              <span className="num">1</span><b>Top bar.</b> Search field on the left, Cancel on the right. <b>No auto-focus on open</b> — overlay opens from a tap on the search icon (not the input), so the keyboard stays down until the user explicitly taps the input. Once typing starts, a clear (×) appears inside the field. Cancel exits the overlay and returns the user to the parent screen with scroll preserved.
            </div>
            <div className="anno" style={{ top: 132, ...anatAnno }}>
              <span className="num">2</span><b>Search history — chips.</b> The user&apos;s past queries as compact dismissable pills with × inside each. <b>Clear all</b> on the right wipes the whole history.
            </div>
            <div className="anno" style={{ top: 228, ...anatAnno }}>
              <span className="num">3</span><b>Recommended — marketing slider.</b> A horizontal scroll of seasonal categories, popular shortcuts, or curated offers. Card peeks from the right edge to signal scrollability; ‹ › chevrons mirror that affordance. This is where the catalogue gets to <i>show what&apos;s interesting</i> to a user who arrived without a query.
            </div>
            <div className="anno" style={{ top: 352, ...anatAnno }}>
              <span className="num">4</span><b>Discover more — quick-links.</b> A vertical list of category landing pages the user might want to browse without typing. Familiar shape — list rows with ›.
            </div>
            <div className="anno" style={{ top: 492, ...anatAnno }}>
              <span className="num">5</span><b>Primary Search action.</b> The keyboard&apos;s Search key is the commit affordance — but the keyboard only appears <i>after</i> the user taps the input (this anatomy frame shows the inactive shape; in the «before-typing» state of the prototype the keyboard isn&apos;t rendered at all). Inactive while the field is empty; active and dark from the first character. Tap submits the query and opens the results page.
            </div>
          </div>
        </FrameCell>
      </FrameRow>

      <H3>Suggestion logic</H3>
      <p>The overlay never shows a blank page. What fills the body depends on whether the user has typed anything.</p>

      <ul className="rules">
        <li><b>Before typing.</b> Three blocks seed the screen: <b>Search history</b> (the user&apos;s past queries as dismissable chips with Clear all), <b>Recommended</b> (a two-row marketing slider — seasonal categories, popular shortcuts, curated offers — gives users without a specific query something to discover), and <b>Discover more</b> (a vertical list of category landing pages for quick browse without typing).</li>
        <li><b>From the first character.</b> Seed blocks are replaced by live results. The body opens with a <b>Search «query» — matched to your selected car</b> shortcut at the top (commits the typed string to the full result page, scoped by fitment to the active car). Below it, matches are grouped under <b>section dividers</b> (Parts, Kits, Brands when relevant) — each row carries a thumb, the typed prefix highlighted, and a <b>category tag</b> on the trailing edge so the user sees not just the term but where it lives in the catalogue.</li>
        <li><b>Debounce.</b> Suggestions refresh shortly after each keystroke, not on every individual key — the list shouldn&apos;t flicker as the user types.</li>
      </ul>

      <div className="frames-row" style={{ alignItems: "flex-start" }}>
        <FrameCell>
          <SearchPrototype />
        </FrameCell>
      </div>

      <div className="caption" style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
        color: "var(--muted)", letterSpacing: "0.04em",
        maxWidth: 904, marginTop: 12, lineHeight: 1.55,
      }}>
        Four view-states on one phone, looping. <b style={{color:"var(--ink)"}}>Idle</b> — Catalog with the search icon. <b style={{color:"var(--ink)"}}>Before typing</b> — overlay opens, body filled with history / Recommended / Discover, keyboard stays down. <b style={{color:"var(--ink)"}}>Focused</b> — input «tapped», keyboard rises, body still shows browse blocks (the user committed to typing but hasn't typed yet). <b style={{color:"var(--ink)"}}>Typing</b> — query «brake» fills in, suggestions replace the browse blocks. → back to Idle.
      </div>

      <H3>Keyboard &amp; primary action</H3>
      <p>The primary Search action lives on the <b>system keyboard</b>, not on the overlay screen. This is the one place in the app where the canonical bottom-anchored CTA doesn't apply — the user types, so the keyboard is the natural place for the commit affordance.</p>
      <ul className="rules">
        <li><b>No auto-focus on open — tap-icon ≠ tap-input.</b> Tap on the Catalog search icon opens the overlay <i>without</i> raising the keyboard; the body is visible from the first second so the user can browse history, recommendations and discover-links. To start typing, the user taps the input — only then the keyboard rises. The intent (browse vs type) is declared by the action, not assumed.</li>
        <li><b>The Search key is the commit.</b> Inactive while the field is empty; active and dark from the first character. Tap submits the query, the overlay transitions to the results page, the keyboard hides.</li>
        <li><b>Tap outside the field and the keyboard hides.</b> The overlay stays; tapping the field again brings the keyboard back.</li>
        <li><b>Tapping a suggestion or a top-result row commits the query directly</b> — no need to also press the keyboard Search key.</li>
      </ul>

      <H3>Edge case — no car selected</H3>
      <p>If the user opens search without a car attached to their Garage, a soft inline warning hangs above the suggestions: <i>«Be sure to choose a car, otherwise you risk to buy an item that does not fit your car.»</i> An <b>Add car</b> button sits inside the warning block. The user can still search — the warning is informational, not blocking — but it persists across all overlay states until a car is added.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Warning before typing.</b> No active car. Warning sits above the idle blocks; the user can still tap a chip, scroll Recommended, or pick a category.">
          <Phone>
            <SearchOverlay>
              <SearchTopBar />
              <div style={{ flex: 1, overflow: "hidden" }}>
                <NoCarWarning />
                <SearchHistoryChips items={["brake pads", "5W-30 oil", "wiper blade"]} />
                <RecommendedSlider items={["Engine", "Motor mounts", "Pistons", "Oil filters", "Radiators", "Wipers", "Wheels", "Batteries"]} />
              </div>
              <KeyboardStub active={false} />
            </SearchOverlay>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Warning while typing.</b> Same warning carries over. Suggestions and section dividers render below; the «matched to your selected car» phrasing on the shortcut row softens to a generic search without fitment until a car is added.">
          <Phone>
            <SearchOverlay>
              <SearchTopBar value="brake" showClear />
              <div style={{ flex: 1, overflow: "hidden" }}>
                <NoCarWarning />
                <TypingSectionDivider label="Parts" />
                <TypingSuggestionRow prefix="Brake" rest=" rotors" tag="Brakes" />
                <TypingSuggestionRow prefix="Brake" rest=" pads" tag="Brakes" />
                <TypingSectionDivider label="Kits" />
                <TypingSuggestionRow prefix="Brake" rest=" rotors service kit" tag="Kit" kit />
              </div>
              <KeyboardStub active={true} />
            </SearchOverlay>
          </Phone>
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Search is a Corridor.</b> Tapping the search field replaces the shell entirely — My AUTODOC, the Curtain header, and the tab bar — with the overlay. One task, one focus.",
        "<b>Cancel exits, scroll is preserved.</b> The header carries <b>Cancel</b> instead of `‹` because Search is read-only — nothing is committed to lose inside it. Tap Cancel (or the back gesture) and the user returns to the parent screen exactly where they left it, no discard sheet needed.",
        "<b>No auto-focus on open.</b> Tap the search icon on Catalog → overlay opens with body filled (history / Recommended / Discover); keyboard stays down. Tap the input → keyboard rises. Two distinct actions for two distinct intents (browse vs type).",
        "<b>Never blank.</b> Before typing — Search history, Recommended slider, Discover more. From the first character — Search-all shortcut, grouped suggestions with category tags. The body always has content.",
        "<b>Primary action lives on the system keyboard.</b> Inactive when the field is empty, active when there is at least one character. The screen has no bottom CTA — the keyboard is the canvas for the commit.",
        "<b>No-car warning is soft.</b> It informs, it does not block. The user can still search; fitment is reconciled on the product page.",
      ]}/>

      <DoDont
        doItem="Seed the empty overlay with Search history (chips), Recommended (marketing slider) and Discover more (quick-link list). Three reasons the user has to tap something before they type anything; one of them is a chance for the catalogue to show what's interesting."
        dontItem="Don't open the overlay onto an empty body and a blinking cursor. The user without a query in their head will turn around and leave."
      />
    </Section>
  );
}
window.P12Search = P12Search;
