// ---------------------------------------------------------------
// P01 — Tab Bar & Nested Navigation
// ---------------------------------------------------------------
function P01TabBar() {
  const [rootTab, setRootTab] = useState("home");
  const timer = React.useRef(null);
  React.useEffect(() => {
    const cycle = { home: 2200, catalog: 2500, cart: 2200 };
    const next = { home: "catalog", catalog: "cart", cart: "home" };
    timer.current = setTimeout(() => setRootTab(next[rootTab]), cycle[rootTab]);
    return () => clearTimeout(timer.current);
  }, [rootTab]);

  const rootCurtain = (() => {
    if (rootTab === "home") {
      return (
        <Curtain position={1} title="Home" showSearch={false}><HomeStub/></Curtain>
      );
    }
    if (rootTab === "cart") {
      return (
        <Curtain position={1} title="Cart" filter="2 items" showSearch={false}><CartStub/></Curtain>
      );
    }
    return null; // catalog is rendered as a full CNCatalogProposed phone below
  })();

  return (
    <Section id="p-tabbar">
      <PatternHead num="01" title="Tab Bar & Nested Navigation" category="Navigation and search"
        lede={<>Top-level navigation lives in a <span className="hl">tab bar</span> at the bottom of the screen. Tabs swap the Curtain body; they never replace the root. Going deeper inside a tab is <b>nested navigation</b> — a stack of child views with a back button. Autodoc&apos;s <span className="hl">current</span> roots are Home, Catalog, and Cart; the set can grow as the product does.</>} />

      <Callout label="Autodoc reading">
        The tab bar holds the app&apos;s root sections — today Home, Catalog, Cart — and stacks let us drill into them. Architecturally, the bar is part of the <b>shell</b> chrome: it sits below the Curtain, above the home-indicator inset, and stays put while the Curtain moves. When the Curtain rises, the tab bar stays. When the Corridor opens, the shell goes away — and the bar with it. The presence or absence of this single strip is the most reliable signal in the app of where the user stands. <b>Horizontal</b> movement is between roots (tab to tab); <b>vertical</b> movement is into a tab (nested stack with a back arrow in the screen header — never in the bar itself). The <b>Cart badge</b> clears the moment Cart is the active root and reappears next time the user leaves Cart with items in it. My AUTODOC (Garage) is not a tab — it is the persistent base under the Curtain. Profile lives as an avatar inside Home; broad service groups live inside Catalog. Keeping Garage off the bar preserves the architectural split the rest of the system depends on; the exact number of root tabs may change as the ecosystem grows.
      </Callout>

      <div className="frames-row" style={{ alignItems: "flex-start" }}>
        <FrameCell>
          {rootTab === "catalog" ? (
            <CNCatalogProposed
              activeCategory={0}
              promoPosition="middle"
              size="lg"
              cartBadge
            />
          ) : (
            <Phone size="lg">
              <GarageBase />
              {rootCurtain}
              {rootTab === "cart" && <CartCheckoutBar />}
              <BottomNav active={rootTab} cartBadge={rootTab !== "cart"}/>
            </Phone>
          )}
        </FrameCell>
      </div>

      <div className="caption" style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
        color: "var(--muted)", letterSpacing: "0.04em",
        maxWidth: 904, marginTop: 12, lineHeight: 1.55,
      }}>
        Auto-loop through the three roots — Home → Catalog → Cart → Home. The Curtain body swaps but the tab strip stays put; My AUTODOC underneath never moves.
      </div>

      <H3>Variants — visual style</H3>
      <p>Two common renderings: <b>icons + labels</b> (default) and <b>icons only</b>. Pick one bar style for the whole app — do not mix them on the same surface.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Icons + labels</b> (default). The pairing teaches and reminds at the same time.">
          <CNCatalogProposed size="" navStyle="icons-labels" />
        </FrameCell>
        <FrameCell caption="<b>Icons only.</b> Cleaner, but harder for first-time users — they rely on memorised glyphs without text.">
          <CNCatalogProposed size="" navStyle="icons-only" />
        </FrameCell>
      </div>

      <H3>States</H3>
      <p>The bar has few states; the screens above change. Three behaviours: <b>active tab</b>, <b>nested navigation</b> (back appears, bar stays), and <b>badge</b> (dot for unseen or just-seen activity).</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Active tab.</b> One root is selected (here — Home); the others sit idle until tapped. Active state combines fill <i>and</i> label colour — never colour alone.">
          <Phone>
            <GarageBase />
            <Curtain position={1} title="Home" showSearch={false}><HomeStub/></Curtain>
            <BottomNav active="home"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Nested navigation.</b> Inside a tab, screens stack — list → subgroup → detail. ‹ and the screen title sit on the left of the screen header; the tab bar stays on the same root tab. Surface-level chrome (search/filter icons, fitment chip) follows the surface canon; the tab bar does not change.">
          <CNCatalogDrilled size="" />
        </FrameCell>
        <FrameCell caption="<b>Cart badge.</b> A red numeric badge on the cart icon shows the running item count; it clears the moment the user opens Cart.">
          <CNCatalogProposed activeCategory={0} promoPosition="middle" cartBadge size="" />
        </FrameCell>
      </div>

      <H3>The bar disappears in Corridors</H3>
      <p>The tab bar is <b>architecturally removed</b> only by the Corridor: when a Corridor opens, the shell disappears entirely — the bar isn&apos;t there at all. Modal bottom sheets and full-screen modals temporarily <b>occlude</b> the bar — they sit on top, but the bar stays in the layout; once the modal dismisses, the bar is in the same place on the same tab. <i>Hidden</i> and <i>gone</i> look the same in the moment, but only the Corridor changes the architecture.</p>

      <Rules items={[
        "<b>Root tabs swap the Curtain.</b> The current roots are Home, Catalog, Cart; more may ship later. My AUTODOC stays the floor, not a tab.",
        "<b>Tabs swap, don't stack at root.</b> A tab tap switches Curtain content; it does not push another root over the shell.",
        "<b>Back lives in the screen, not the bar.</b> The back affordance sits in the screen header for nested stacks. The tab bar has no back control.",
        "<b>Only Corridors remove the bar.</b> Corridors take the bar out of the layout architecturally; modal sheets just sit on top of it — the bar is still there underneath.",
        "<b>Badges are purposeful.</b> Use them when something unseen or time-sensitive warrants attention; clear them when the user lands in that destination.",
      ]}/>

      <DoDont
        doItem="Keep the tab bar visible whenever the user is browsing the Curtained shell. Roots should stay one tap apart."
        dontItem="Don't put My AUTODOC or profile on the bar as competing roots — Garage stays under the Curtain; profile stays reachable from Home. That architectural split matters more than a fixed tab count."
      />
    </Section>
  );
}
window.P01TabBar = P01TabBar;
