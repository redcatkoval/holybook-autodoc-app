// ---------------------------------------------------------------
// P11 — Dropdown / Pop-up Buttons
// ---------------------------------------------------------------

const { useState: useDD, useEffect: useDDEffect, useRef: useDDRef } = React;

// Generic phase machine for the dropdown animations. Cycles through the
// provided phases on a timer; returns the current phase.
function useDDPhase(phases) {
  const [i, setI] = useDD(0);
  const t = useDDRef(null);
  useDDEffect(() => {
    t.current = setTimeout(() => setI((i + 1) % phases.length), phases[i].t);
    return () => clearTimeout(t.current);
  }, [i]);
  return phases[i].name;
}

const DD_OPTIONS = [
  "Option 1", "Option 2", "Option 3", "Option 4",
  "Option 5", "Option 6", "Option 7", "Option 8",
];
const DD_CARDS = ["Option A", "Option B", "Option C", "Option D"];
const DD_WHEEL = ["XS", "S", "M", "L", "XL"];

// Closed trigger — full width inside its container, no label, no chevron.
function ClosedTrigger({ value, onClick }) {
  return (
    <div onClick={onClick} style={{
      height: 44, background: "#f7f6f4", border: "1px solid #ececec",
      borderRadius: 10, padding: "0 14px",
      display: "flex", alignItems: "center",
      fontSize: 13, color: "#111",
      cursor: "pointer", userSelect: "none",
    }}>{value}</div>
  );
}

// In-sheet search field (real text input).
function SheetSearch({ value, onChange }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      height: 30, padding: "0 10px", marginBottom: 8,
      background: "#f7f6f4", borderRadius: 8,
    }}>
      <div style={{
        width: 12, height: 12, border: "1.2px solid #6b6b6b",
        borderRadius: "50%", flexShrink: 0,
      }}/>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Search" style={{
          border: "none", outline: "none", background: "transparent",
          flex: 1, fontSize: 11, color: "#111",
          fontFamily: '"JetBrains Mono", monospace',
        }}/>
    </div>
  );
}

// Single-row option (radio or checkbox), clickable.
function OptionRow({ kind, label, selected, withIcon, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 4px", borderBottom: "1px solid #ececec",
      fontSize: 13, color: "#111", cursor: "pointer", userSelect: "none",
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
        {withIcon && (
          <span style={{
            width: 16, height: 16, background: "#ececec", borderRadius: 3,
            display: "inline-block", flexShrink: 0,
          }}/>
        )}
        <span>{label}</span>
      </span>
      {kind === "radio" ? (
        <span style={{
          width: 16, height: 16, borderRadius: "50%",
          border: `1.5px solid ${selected ? "#111" : "#d8d8d8"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {selected && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#111" }}/>}
        </span>
      ) : (
        <span style={{
          width: 16, height: 16, borderRadius: 3,
          border: `1.5px solid ${selected ? "#111" : "#d8d8d8"}`,
          background: selected ? "#111" : "#fff",
          color: "#fff", fontSize: 11, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{selected ? "✓" : ""}</span>
      )}
    </div>
  );
}

// Image card (clickable).
function CardOption({ selected, onClick }) {
  return (
    <div onClick={onClick} style={{
      border: selected ? `2px solid #111` : `1px solid #d8d8d8`,
      borderRadius: 8, padding: 10,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      background: "#fff", position: "relative", cursor: "pointer", userSelect: "none",
    }}>
      <div style={{
        width: "100%", height: 50, background: "#ececec", borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#9a9a9a", fontSize: 18,
      }}>▱</div>
      <div style={{ fontSize: 11, color: "#111" }}>Option</div>
      {selected && (
        <div style={{
          position: "absolute", top: 4, right: 4,
          width: 14, height: 14, borderRadius: "50%", background: "#111",
          color: "#fff", fontSize: 9, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✓</div>
      )}
    </div>
  );
}

// Full-width primary Confirm button.
function ConfirmButton({ onClick }) {
  return (
    <div onClick={onClick} style={{
      height: 44, background: "#111", color: "#fff",
      borderRadius: 8, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 13, fontWeight: 600,
      cursor: "pointer", marginTop: 12,
    }}>Confirm</div>
  );
}

// 1. Single-select list — auto-loop: closed → open → highlight new → commit.
function P1ListSingleProto() {
  const phase = useDDPhase([
    { name: "closed",  t: 1200 },
    { name: "open",    t: 1400 },
    { name: "preview", t: 1100 },
    { name: "applied", t: 1400 },
  ]);
  const committed = phase === "applied" ? "Option 5" : "Option 2";
  const preview = phase === "preview" ? "Option 5" : committed;
  const sheetOpen = phase === "open" || phase === "preview";
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ position: "absolute", top: 88, left: 14, right: 14 }}>
        <ClosedTrigger value={committed} />
      </div>
      {sheetOpen && (
        <BottomSheet height={0.7} title="Title" bodyOverflow="auto">
          <SheetSearch value="" onChange={() => {}} />
          {DD_OPTIONS.map((opt) => (
            <OptionRow key={opt} kind="radio" label={opt} selected={opt === preview} />
          ))}
        </BottomSheet>
      )}
    </Phone>
  );
}

// 2. Multi-select list — auto-loop: closed → open → toggle → confirm → updated.
function P2ListMultiProto() {
  const phase = useDDPhase([
    { name: "closed",   t: 1200 },
    { name: "open",     t: 1100 },
    { name: "toggled1", t: 900  },
    { name: "toggled2", t: 1100 },
    { name: "applied",  t: 1500 },
  ]);
  const initial = ["Option 2", "Option 4"];
  const after = ["Option 2", "Option 4", "Option 6"];
  const committed = phase === "applied" ? after : initial;
  let pending = initial;
  if (phase === "toggled1") pending = ["Option 2", "Option 4"];
  if (phase === "toggled2" || phase === "applied") pending = after;
  const sheetOpen = phase === "open" || phase === "toggled1" || phase === "toggled2";
  const triggerLabel = committed.length === 1 ? committed[0] : `${committed.length} selected`;
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ position: "absolute", top: 88, left: 14, right: 14 }}>
        <ClosedTrigger value={triggerLabel} />
      </div>
      {sheetOpen && (
        <BottomSheet height={0.78} title="Title" bodyOverflow="auto">
          <SheetSearch value="" onChange={() => {}} />
          {DD_OPTIONS.map((opt) => (
            <OptionRow key={opt} kind="checkbox" label={opt} selected={pending.includes(opt)} withIcon />
          ))}
          <ConfirmButton />
        </BottomSheet>
      )}
    </Phone>
  );
}

// 3. Single image cards — auto-loop.
function P3CardsSingleProto() {
  const phase = useDDPhase([
    { name: "closed",  t: 1200 },
    { name: "open",    t: 1400 },
    { name: "preview", t: 1000 },
    { name: "applied", t: 1300 },
  ]);
  const committed = phase === "applied" ? 2 : 0;
  const preview = phase === "preview" ? 2 : committed;
  const sheetOpen = phase === "open" || phase === "preview";
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ position: "absolute", top: 88, left: 14, right: 14 }}>
        <ClosedTrigger value={DD_CARDS[committed]} />
      </div>
      {sheetOpen && (
        <BottomSheet height={0.55} title="Title">
          <div style={{ paddingTop: 4 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {DD_CARDS.map((_, i) => (
                <CardOption key={i} selected={preview === i} />
              ))}
            </div>
          </div>
        </BottomSheet>
      )}
    </Phone>
  );
}

// 4. Multi image cards — auto-loop.
function P4CardsMultiProto() {
  const phase = useDDPhase([
    { name: "closed",   t: 1200 },
    { name: "open",     t: 1000 },
    { name: "toggle",   t: 1200 },
    { name: "applied",  t: 1500 },
  ]);
  const initial = [0, 2];
  const after = [0, 2, 3];
  const committed = phase === "applied" ? after : initial;
  const pending = phase === "toggle" || phase === "applied" ? after : initial;
  const sheetOpen = phase === "open" || phase === "toggle";
  const triggerLabel = `${committed.length} selected`;
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ position: "absolute", top: 88, left: 14, right: 14 }}>
        <ClosedTrigger value={triggerLabel} />
      </div>
      {sheetOpen && (
        <BottomSheet height={0.62} title="Title">
          <div style={{ paddingTop: 4 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {DD_CARDS.map((_, i) => (
                <CardOption key={i} selected={pending.includes(i)} />
              ))}
            </div>
          </div>
          <ConfirmButton />
        </BottomSheet>
      )}
    </Phone>
  );
}

// 5. Wheel picker. Spin → Confirm to commit.
function WheelPicker({ options, value, onChange }) {
  const ROW_H = 32;
  const ref = React.useRef(null);
  const settling = React.useRef(null);
  const [scrolled, setScrolled] = useDD(false);
  React.useEffect(() => {
    if (ref.current && !scrolled) {
      const idx = Math.max(0, options.indexOf(value));
      ref.current.scrollTop = idx * ROW_H;
      setScrolled(true);
    }
  }, [scrolled]);
  const onScroll = (e) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollTop / ROW_H);
    const opt = options[Math.max(0, Math.min(options.length - 1, idx))];
    if (opt !== value) onChange(opt);
    if (settling.current) clearTimeout(settling.current);
    settling.current = setTimeout(() => {
      const snapTo = Math.round(el.scrollTop / ROW_H) * ROW_H;
      if (Math.abs(el.scrollTop - snapTo) > 0.5) {
        el.scrollTo({ top: snapTo, behavior: "smooth" });
      }
    }, 120);
  };
  return (
    <div style={{ position: "relative", padding: "10px 0" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 10 + ROW_H, height: ROW_H,
        background: "#ececec", borderRadius: 8, pointerEvents: "none", zIndex: 0,
      }}/>
      <div ref={ref} onScroll={onScroll} style={{
        height: ROW_H * 3, overflow: "auto",
        scrollSnapType: "y mandatory",
        position: "relative", zIndex: 1,
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 32%, #000 68%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0, #000 32%, #000 68%, transparent 100%)",
      }} className="wheel-scroll">
        <div style={{ height: ROW_H }}/>
        {options.map((opt) => (
          <div key={opt} style={{
            height: ROW_H, display: "flex", alignItems: "center", justifyContent: "center",
            scrollSnapAlign: "center",
            fontSize: 14, color: opt === value ? "#111" : "#6b6b6b",
            fontWeight: opt === value ? 600 : 400,
          }}>{opt}</div>
        ))}
        <div style={{ height: ROW_H }}/>
      </div>
    </div>
  );
}

// Static wheel render (no real scroll for animation — just shows the selected
// value highlighted at centre).
function WheelStatic({ options, value }) {
  const ROW_H = 32;
  const idx = Math.max(0, options.indexOf(value));
  return (
    <div style={{ position: "relative", padding: "10px 0" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 10 + ROW_H, height: ROW_H,
        background: "#ececec", borderRadius: 8, pointerEvents: "none", zIndex: 0,
      }}/>
      <div style={{
        height: ROW_H * 3, overflow: "hidden",
        position: "relative", zIndex: 1,
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 32%, #000 68%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0, #000 32%, #000 68%, transparent 100%)",
      }}>
        <div style={{
          transform: `translateY(${-idx * ROW_H}px)`,
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        }}>
          <div style={{ height: ROW_H }}/>
          {options.map((opt) => (
            <div key={opt} style={{
              height: ROW_H, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: opt === value ? "#111" : "#6b6b6b",
              fontWeight: opt === value ? 600 : 400,
            }}>{opt}</div>
          ))}
          <div style={{ height: ROW_H }}/>
        </div>
      </div>
    </div>
  );
}

// 5. Wheel picker — auto-loop.
function P5WheelProto() {
  const phase = useDDPhase([
    { name: "closed",  t: 1200 },
    { name: "open",    t: 1000 },
    { name: "spin1",   t: 700  },
    { name: "spin2",   t: 700  },
    { name: "applied", t: 1500 },
  ]);
  const committed = phase === "applied" ? "L" : "M";
  let pending = "M";
  if (phase === "spin1") pending = "S";
  else if (phase === "spin2" || phase === "applied") pending = "L";
  const sheetOpen = phase === "open" || phase === "spin1" || phase === "spin2";
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ position: "absolute", top: 88, left: 14, right: 14 }}>
        <ClosedTrigger value={committed} />
      </div>
      {sheetOpen && (
        <BottomSheet height={0.42} title="Title">
          <WheelStatic options={DD_WHEEL} value={pending} />
          <ConfirmButton />
        </BottomSheet>
      )}
    </Phone>
  );
}

function P11Dropdown() {
  return (
    <Section id="p-dropdown">
      <PatternHead num="01" title="Pop-up Buttons (Drop downs)" category="Selection"
        lede={<>A <span className="hl">drop down</span> presents a list of options as a sheet rising from the bottom of the screen. The user taps a closed trigger row, the sheet rises, the user picks one (or several) from a known set. Drop downs replace the desktop notion of a select menu — the same job, in a form that fits a thumb.</>} />


      <Callout label="Autodoc reading">
        Autodoc uses a bottom sheet for every drop down. Consistency: the sheet always opens the same way — same drag handle, same dismiss. The only variable is how the user commits — <b>instant selection</b> for single choices (tap, sheet closes, applied) and <b>explicit confirmation</b> for multi-select (compose a set, tap Confirm). One primary button — no Cancel; the secondary action can be a text button if needed.
      </Callout>

      <H3>Five variants</H3>
      <p>Same sheet shell, different bodies — pick by the shape of the choice.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Single-select list.</b> Radio rows + optional search. Tapping an option applies it and closes the sheet. Search appears at 20+ items; icons are optional.">
          <P1ListSingleProto />
        </FrameCell>
        <FrameCell caption="<b>Multi-select list.</b> Same shape, checkboxes instead of radios. Every tap toggles without committing; one primary Confirm at the bottom submits the set.">
          <P2ListMultiProto />
        </FrameCell>
        <FrameCell caption="<b>Cards with image — single.</b> When an image distinguishes the options (flags, logos, slots), switch the list for a card grid. Tapping a card applies and closes — same instant-tap rule as the single list.">
          <P3CardsSingleProto />
        </FrameCell>
      </div>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Cards with image — multi.</b> Same card grid, multiple selections allowed. Toggle cards, then submit with Confirm. Used for opt-ins, multi-vehicle filters, stacked options.">
          <P4CardsMultiProto />
        </FrameCell>
        <FrameCell caption="<b>Wheel.</b> For short ordered ranges (up to five values) — sizes, durations, date parts. Spin to land on a value; Confirm commits. For longer or unordered options use a list with search.">
          <P5WheelProto />
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Bottom sheet, always.</b> Dropdowns are sheets, not popovers. They rise from the bottom and dismiss the same way.",
        "<b>Search at 20+.</b> If the list of options exceeds twenty items, add a search field at the top of the sheet.",
        "<b>Single = instant. Multi = Confirm.</b> Single-select sheets autoclose on tap. Multi-select keeps one primary Confirm; tapping outside the sheet dismisses without applying.",
        "<b>One primary button.</b> The footer carries one Confirm. If a secondary action is needed, render it as a text button.",
        "<b>Cards when images matter.</b> If the user needs an image to choose, switch from list to card grid. Single card grids autoclose; multi card grids keep one Confirm.",
        "<b>Wheel only for short ordered ranges.</b> Up to five values, ordered. For more or unordered options, use a list.",
      ]}/>

      <DoDont
        doItem="Use instant-tap radio for sorting a product list. The user taps Newest, the sheet closes, the list re-sorts. One tap, done."
        dontItem="Don't use instant-tap for choosing multiple filter values. Without Confirm, every tap re-runs the query — slow, expensive, and ten taps means ten reloads."
      />
    </Section>
  );
}
window.P11Dropdown = P11Dropdown;
