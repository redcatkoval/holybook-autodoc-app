function Ch02Layers() {
  return (
    <Section id="layers">
      <ChapterHead num="02" title="Layer hierarchy"
        lede="The app has three structural elements: two persistent layers (Garage at the base, Curtain on top) and one fullscreen Corridor that temporarily replaces the shell. Knowing which of the three a screen belongs to is the first design decision." />

      <H3>The three structural elements</H3>
      <FrameRow>
        <FrameCell caption="<b>My AUTODOC (Garage) layer</b><br/>Dark background. Holds the user's cars, history, addresses, saved items, and rewards — everything personal and persistent.">
          <Phone size="lg">
            <GarageBase />
            <Curtain position={0} title="Home" showSearch={false}/>
            <BottomNav active="home"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Curtain</b><br/>White sheet. Owns Home, Catalog, Cart. Three positions; never fully closes; never reaches the absolute top. <i>This is the persistent modal of the app — always present, never opens and dismisses.</i>">
          <CNCatalogProposed activeCategory={0} promoPosition="middle" />
        </FrameCell>
        <FrameCell caption="<b>Corridor</b> — fullscreen flow. My AUTODOC and nav are gone. Centered title, ‹ to step back, single primary CTA at the bottom.">
          <Phone size="lg" statusBar statusTone="light">
            <div className="layer-full">
              <div className="full-header">
                <div className="close">‹</div>
                <div className="title" style={{flex:1, display:"flex", justifyContent:"center"}}><div className="skel-row" style={{width:100, height:10, margin:0}}/></div>
                <div style={{width:28}}/>
              </div>
              <div className="full-body">
                <div className="skel-row med" style={{height:14}}/>
                <div className="skel-row short"/>
                <div className="skel-card"><div className="skel-row med"/><div className="skel-row short"/></div>
                <div className="skel-card"><div className="skel-row med"/><div className="skel-row short"/></div>
              </div>
              <PrimaryCTA label="Primary action"/>
            </div>
          </Phone>
        </FrameCell>
      </FrameRow>

      <H3>Decision rule</H3>
      <Callout label="Pick a layer">
        <b>(1)</b> Is this a focused, multi-step task with a single forward direction? — <b>Corridor</b>. <b>(2)</b> Is this <i>about a car the user owns</i> or their personal history? — <b>Garage</b>. <b>(3)</b> Otherwise it goes in the <b>Curtain</b>.
      </Callout>

      <p>Temporary detail of what the user is doing (picker, product detail, alert, snackbar, infoblock, dialog, bottom sheet) is not a fourth layer — it is a <b>pattern</b> that lives inside one of the three layers. Pattern overlays live above the shell but below OS chrome; their priority and behaviour are defined per pattern, in Part II. Bottom sheets and action sheets are an exception — they belong to Corridors, not to the Curtain (one sheet at a time; Curtain is already a sheet).</p>

      <table className="spec">
        <thead>
          <tr><th>Element</th><th>Bottom nav</th><th>Typical content</th></tr>
        </thead>
        <tbody>
          <tr><td className="k">My AUTODOC (Garage)</td><td>Visible</td><td>The user's cars, history, addresses, saved items, rewards</td></tr>
          <tr><td className="k">Curtain</td><td>Visible</td><td>Home, Catalog, Cart, Search — active shopping</td></tr>
          <tr><td className="k">Corridor</td><td>Hidden</td><td>Multi-step input, identity verification, capturing missing facts — fullscreen work with one job and one path forward</td></tr>
        </tbody>
      </table>

      <H3>Z-stack</H3>
      <p>Bottom-up, the surfaces of the app stack in a fixed order. Knowing this order resolves most «which thing covers which thing» questions before they're asked.</p>
      <ol className="rules">
        <li><b>My AUTODOC (Garage).</b> The persistent base of the app.</li>
        <li><b>Curtain.</b> Sits over the Garage in its working position.</li>
        <li><b>Corridor.</b> Not «on top» of the stack — it <i>replaces</i> the stack. The shell disappears for the duration of the flow. When the corridor exits, the stack is restored as it was.</li>
        <li><b>Non-sheet overlays — above shell, below OS chrome.</b> Centered dialogs, alerts, snackbars and infoblocks may sit above the curtain in this band when active. Their priority among each other and dismiss rules are defined in their Part II patterns.</li>
        <li><b>No sheet over sheet.</b> Bottom sheets and action sheets <i>never</i> appear together with the Curtain — the Curtain is already a sheet, and stacking a second one would make the drag handles compete and the stack unreadable. Sheet-shaped patterns belong to <b>Corridors</b>, where there is no other sheet to stack against. Anything inside the Curtain that needs a permanent commit affordance is a <b>pinned bar</b> (Cart's Total + Checkout), not a second sheet on top of it.</li>
      </ol>

      <H3>Platform back semantics</H3>
      <ul className="rules">
        <li><b>Android hardware back</b> is the platform equivalent of the in-screen <code>‹</code>. It closes whatever overlay is on top first — alert, sheet, dialog — before stepping back in the navigation stack of the current tab. At the root of a tab it does not exit; the user explicitly exits via the OS gesture.</li>
        <li><b>iOS edge-swipe-from-left</b> is the platform equivalent of <code>‹</code>. In a regular corridor it steps back through the discard rules; in a commit corridor (Checkout, Pay-now) it triggers the same optimistic dismiss as the header <code>✕</code> — including the «… cancelled · Undo» snackbar.</li>
        <li><b>Dismiss gestures are equivalent.</b> Tap-outside on a scrim, swipe-down on a drag handle, and an explicit <code>Cancel</code> button all do the same thing — close the overlay without commit. They are not equivalent to <code>‹</code> or hardware back, which step backward in the flow.</li>
      </ul>

    </Section>
  );
}
window.Ch02Layers = Ch02Layers;
