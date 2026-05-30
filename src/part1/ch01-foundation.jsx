function Ch01Foundation() {
  return (
    <Section id="foundation">
      <ChapterHead num="01" title="Foundation"
        lede={<>Autodoc is built on <span className="hl">two persistent layers</span>: <b>My AUTODOC</b> (internally <i>the garage</i>) at the base, and the <b>Application Curtain</b> on top. My AUTODOC holds your cars and everything that orbits them. The curtain holds the application — Home, Catalog, Cart.</>} />

      <Callout label="The mental model">
        Like Google Maps: the map (your <b>cars and everything that touches them</b> — orders, address, history) is the substrate. The catalog, search, sheets, and the transactional layer — that's the <b>curtain</b>. The map never disappears; the curtain just gets in the way more or less.
      </Callout>

      <H3>Two layers, two surfaces</H3>
      <p>My AUTODOC is the substrate, not a tab — it has its own dark, tonal background. Every screen about <i>your relationship with your cars</i> (vehicle details, order history, delivery address, saved items, rewards) lives on this dark layer. The Curtain is a single white sheet on top — it holds the rest of the application (Home, Catalog, Cart) and breathes between three positions; tabs swap the curtain's contents while My AUTODOC underneath stays put.</p>

      <p><i>Why dark for the Garage and white for the Curtain.</i> The contrast is a visual contract: <b>dark = personal and persistent</b> (your stuff, your cars, your history), <b>white = the app surface</b> (browsing, transactional, shared with every other user). The tonal gap makes the metaphor unmistakable at a glance — the user always knows, without looking, which world they&apos;re in.</p>

      <FrameRow>
        <FrameCell caption="<b>Two persistent layers, two backgrounds.</b> My AUTODOC is dark; Curtain is white. The visual contract makes the metaphor unmistakable.">
          <div className="annot-phone" style={{padding:"0 320px 0 0"}}>
            <CNCatalogProposed activeCategory={0} promoPosition="middle" />
            <div className="anno" style={{top:56, left:340}}>
              <span className="num">1</span>My AUTODOC (Garage) — dark base; holds the user's cars, history, addresses, saved items, rewards.
            </div>
            <div className="anno" style={{top:132, left:340}}>
              <span className="num">2</span>Search icon — tap opens the Search overlay. Filter icon hides on the catalog root (nothing to filter yet).
            </div>
            <div className="anno" style={{top:299, left:340}}>
              <span className="num">3</span>Curtain — white sheet, currently shows the Catalog root with its category strip and subcategory grid.
            </div>
            <div className="anno" style={{top:543, left:340}}>
              <span className="num">4</span>Bottom nav — switches what the Curtain contains.
            </div>
          </div>
        </FrameCell>
      </FrameRow>

      <H3>Three principles</H3>
      <Rules items={[
        "<b>Persistence over navigation.</b> The user never asks \"where am I?\" — My AUTODOC is the anchor. Tabs change content, not context.",
        "<b>Vehicle is sovereign.</b> The active car drives every list, price, recommendation. Switching cars re-renders the curtain content; it does not navigate.",
        "<b>The corridor is a deliberate exception.</b> Multi-step flows (filling missing data, identity verification, multi-screen input) hide both My AUTODOC and nav.",
      ]}/>

      <DoDont
        doItem="Treat My AUTODOC (Garage) as the home base. Anything about the user's cars (details, history, mileage, address) belongs on the dark layer."
        dontItem="Don't put My AUTODOC content (vehicle detail, order history) on the white curtain — that breaks the visual contract."
      />
    </Section>
  );
}
window.Ch01Foundation = Ch01Foundation;
