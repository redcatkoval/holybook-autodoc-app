
function TOC() {
  const partI = [
    ["01", "Foundation", "foundation"],
    ["02", "Layer hierarchy", "layers"],
    ["03", "My AUTODOC (Garage)", "garage"],
    ["04", "The Curtain", "curtain"],
    ["05", "The Corridor", "fullscreen"],
    ["06", "State principles", "states"],
    ["07", "Accessibility & touch", "accessibility"],
  ];
  const partII = [
    // Navigation and search
    ["", "Tab Bar & Nested Nav", "p-tabbar"],
    ["", "Search", "p-search"],
    ["", "Web View", "p-webview"],
    ["", "List Filtering", "p-listfilter"],
    // Presentation
    ["", "Modal Views", "p-modal"],
    ["", "Step Indicators", "p-multistep"],
    ["", "Final Flow Screens", "p-final"],
    ["", "Dialogs, Alerts & Action Sheets", "p-dialogs"],
    ["", "Snackbars", "p-snackbars"],
    ["", "Infoblocks", "p-infoblocks"],
    ["", "Accordion / Disclosure", "p-accordion"],
    // Selection
    ["", "Pop-up Buttons (Drop downs)", "p-dropdown"],
    ["", "Action hierarchy", "p-buttons"],
    ["", "Filters", "p-filters"],
    // Actions on items
    ["", "Context Menus", "p-contextmenu"],
    ["", "Swipe Actions", "p-swipe"],
    // Status
    ["", "Indeterminate indicators", "p-loading"],
    ["", "Empty States", "p-empty"],
    ["", "Errors", "p-errors"],
    ["", "Quantity Stepper", "p-stepper"],
    ["", "Optimistic UI / Undo", "p-optimistic"],
    // Promotion
    ["", "Widgets", "p-promo"],
    // System experiences
    ["", "Dynamic Island", "p-island"],
    // Catalog & product
    ["", "Reviews & Ratings", "p-reviews"],
    ["", "Image Gallery", "p-gallery"],
  ];
  const partIINotReady = [
    ["", "Product Card", "p-product-card"],
    ["", "Express Commit Sheet", "prop-pr23"],
    ["", "Map View", "prop-p-map"],
    ["", "Camera Scanner", "prop-p-scanner"],
  ];
  const partIII = [
    ["", "Authentication", "p-auth"],
    ["", "Add a Car", "p-addcar"],
    ["", "Checkout", "p-checkout"],
  ];

  const allIds = ["reading-guide", ...partI.map(x => x[2]), ...partII.map(x => x[2]), ...partIINotReady.map(x => x[2]), ...partIII.map(x => x[2])];
  const [active, setActive] = useState("reading-guide");
  useEffect(() => {
    const onScroll = () => {
      let cur = "reading-guide";
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const inReviewIds = new Set();
  const reworkRedIds = new Set();
  const renderItem = ([num, label, id]) => {
    const classes = [];
    if (active === id) classes.push("active");
    if (inReviewIds.has(id)) classes.push("toc-in-review");
    const style = reworkRedIds.has(id) ? {
      color: "#c62828",
      textDecoration: "underline",
      textDecorationColor: "#c62828",
      textDecorationThickness: "1.5px",
      textUnderlineOffset: "3px",
    } : undefined;
    return (
      <li key={id}>
        <a href={"#"+id} data-num={num} className={classes.join(" ")} style={style}>{label}</a>
      </li>
    );
  };
  return (
    <nav className="toc">
      <div className="toc-brand">Holy Book</div>
      <div className="toc-brand-sub mono">Autodoc</div>

      <ul className="toc-list" style={{ marginTop: 24 }}>
        {renderItem(["", "How to read this book", "reading-guide"])}
      </ul>

      <div style={{
        marginTop: 28, marginBottom: 8,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.16em",
      }}>Part I — Architecture</div>
      <ul className="toc-list">{partI.map(renderItem)}</ul>

      <div style={{
        marginTop: 28, marginBottom: 8,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.16em",
      }}>Part II — Pattern Library</div>
      <ul className="toc-list">
        {(() => {
          const groups = [
            ["Navigation", ["p-tabbar", "p-search", "p-listfilter"]],
            ["Surfaces", ["p-modal", "p-webview", "p-dialogs", "p-snackbars", "p-infoblocks", "p-final"]],
            ["Controls", ["p-buttons", "p-dropdown", "p-filters", "p-accordion", "p-stepper", "p-multistep"]],
            ["Actions on items", ["p-contextmenu", "p-swipe"]],
            ["Status", ["p-loading", "p-empty", "p-errors", "p-optimistic"]],
            ["Product", ["p-reviews", "p-gallery"]],
            ["Promotion", ["p-promo"]],
            ["System experiences", ["p-island"]],
          ];
          const out = [];
          for (const [groupTitle, ids] of groups) {
            out.push(
              <li key={groupTitle} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                color: "var(--muted-2)", textTransform: "uppercase",
                letterSpacing: "0.14em", padding: "10px 0 4px",
              }}>{groupTitle}</li>
            );
            ids.forEach((id, idx) => {
              const item = partII.find(x => x[2] === id);
              if (item) {
                const num = String(idx + 1).padStart(2, "0");
                out.push(renderItem([num, item[1], item[2]]));
              }
            });
          }
          return out;
        })()}
      </ul>

      <div style={{
        marginTop: 28, marginBottom: 8,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.16em",
      }}>Part III — Composed Flows</div>
      <ul className="toc-list">{partIII.map(renderItem)}</ul>

      <div style={{
        marginTop: 16, marginBottom: 6, paddingLeft: 0,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.14em",
      }}>Not ready</div>
      <ul className="toc-list">{partIINotReady.map(renderItem)}</ul>
    </nav>
  );
}

// Tweaks panel
