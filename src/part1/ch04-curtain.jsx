function Ch04Curtain() {
  return (
    <Section id="curtain">
      <ChapterHead num="04" title="The Curtain"
        lede={<>The curtain is a single white sheet on top of My AUTODOC. It carries the main application — Home, Catalog, Cart, and everything that shares that chrome. Within two hard limits it has <b>three positions</b>: closed (default), half-open, and lowered.</>} />

      <Callout label="The Curtain is the persistent modal of the app">
        The Curtain inherits the visual grammar of a Bottom Sheet — a white panel rising from below — but it is <b>always present</b>. It does not open and dismiss; it lives in three positions (closed, half-open, lowered) and never leaves the screen. The Curtain is the app's primary surface, not a thing the user summons. Because the Curtain is already a sheet, <b>bottom sheets and action sheets never rise over it</b> — those sheet-shaped patterns belong to Corridors. What can sit over the Curtain are non-sheet overlays: centered dialogs, alerts, snackbars. Rule of thumb: if it's a sheet (drag handle, rounded top, rises from the bottom), it lives in a Corridor. If it's a centered card or a chrome-zone strip, it can sit over the Curtain.
      </Callout>

      <H3>Three positions</H3>
      <FrameRow>
        <FrameCell>
          <Phone>
            <GarageBase />
            <Curtain title="Home" showSearch={false}><HomeStub/></Curtain>
            <BottomNav active="home"/>
          </Phone>
        </FrameCell>
        <FrameCell>
          <Phone>
            <GarageBase />
            <Curtain position={0.5} title="Home" showSearch={false}><HomeStub/></Curtain>
            <BottomNav active="home"/>
          </Phone>
        </FrameCell>
        <FrameCell>
          <Phone>
            <GarageBase />
            <Curtain position={0} title="Home" showSearch={false}/>
            <BottomNav active="home"/>
          </Phone>
        </FrameCell>
      </FrameRow>

      <div className="caption" style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
        color: "var(--muted)", letterSpacing: "0.04em",
        maxWidth: 904, marginTop: 12, lineHeight: 1.55,
      }}>
        <b style={{color:"var(--ink)"}}>Closed</b> — working state, where the curtain lives 90% of the time: feed on Home (curated scrollable stream — hero, recs, categories, widgets, deals), parts in Catalog, items in Cart. <b style={{color:"var(--ink)"}}>Half-open</b> — splits the screen with the Garage above. <b style={{color:"var(--ink)"}}>Lowered</b> — only the title row stays visible above the bottom nav. The curtain never leaves the screen and never takes it over: a sliver of Garage always shows on top, the title row and bottom nav always show below. Anything that needs the full screen is a corridor. <i>Three positions, not two or four: two collapse «peek» and lose half of what the curtain is for; four add a stop the thumb can&apos;t feel.</i>
      </div>

      <H3>How it moves</H3>
      <ul className="rules">
        <li><b>Drag handle + title row are the affordance for moving the curtain.</b> A vertical drag on the handle or anywhere in the title row changes the curtain&apos;s position (closed ↔ half-open ↔ lowered). The hit area extends well beyond the visible handle stripe.</li>
        <li><b>Inside the body — the content scrolls.</b> A vertical swipe in the curtain body scrolls the content; it does not move the curtain.</li>
        <li><b>One exception — half-open → closed via body scroll.</b> When the curtain sits in half-open and the user starts scrolling inside the body, the curtain snaps up to closed first; only after that does the body begin to scroll. This lets the user dive into content without an extra drag.</li>
        <li><b>No reverse gesture.</b> Scrolling the body up to the top and continuing to swipe down does <i>not</i> pull the curtain back to half-open. Lowering the curtain is always a deliberate drag on the handle or title row — never an overscroll side-effect.</li>
        <li><b>Snap rule between positions.</b> A drag that crosses more than half the distance to the next position — or carries enough velocity — snaps to that next position. Anything less returns to where the gesture started.</li>
        <li><b>Tap on the title row when the curtain is lowered</b> is a shortcut that raises the curtain back to closed — useful when the user wants to get back to work without a drag.</li>
      </ul>

      <DoDont
        doItem="Keep the curtain conceptually simple: one white layer, three positions between the two limits, shared chrome for the curtained application."
        dontItem="Don't treat fullscreen, single-job flows as curtain states — those are corridors, not a fourth curtain position."
      />
    </Section>
  );
}
window.Ch04Curtain = Ch04Curtain;
