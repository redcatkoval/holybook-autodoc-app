function Ch03Garage() {
  return (
    <Section id="garage">
      <ChapterHead num="03" title="My AUTODOC (Garage)"
        lede="My AUTODOC — internally the garage layer — is screen, surface, and context at the same time. It's the base layer of the app — where the user's cars and their screens live, and where car-related corridors launch from. It owns every screen about the user's cars and history, and it has its own background so the metaphor is never in doubt." />

      <Callout label="My AUTODOC scope">
        Anything personal to the user and persistent — their cars, service history, addresses, saved items, rewards — lives on this dark layer. Active shopping happens on the curtain. The block composition shown below is the <i>current</i> canon, not a fixed schema: as features grow around the user and their cars (insurance, document storage, telemetry, multi-driver families), new blocks join this stack and existing ones get restructured. The rule is anchored in the metaphor, not in the layout — <b>everything about <i>your cars</i> lands on My AUTODOC; everything about parts and shopping stays on the curtain.</b>
      </Callout>

      <H3>Anatomy of the base layer</H3>
      <FrameRow>
        <FrameCell caption="<b>My AUTODOC (Garage) = the dark layer.</b> Top: the active car shown small + persistent entry points to Promos and Profile. Body: section header with car count + add; the active car card; recent orders for that car; wishlist; rewards (bonuses + coupons); quick links to Delivery Address & Support. The big title for the active car lives lower, on its own page.">
          <div className="annot-phone tall" style={{padding:"0 320px 0 0"}}>
            <Phone tall>
              <GarageBaseFull />
            </Phone>
            <div className="anno" style={{top:48,  left:340}}><span className="num">1</span>Topbar — active car (mini) on the left; gift / promos and profile glyphs are persistent entry points to two whole sub-areas.</div>
            <div className="anno" style={{top:119, left:340}}><span className="num">2</span>Section header: <i>Garage</i> label + car-count badge + circular <b>+</b> button to add a car.</div>
            <div className="anno" style={{top:202, left:340}}><span className="num">3</span>Active car card — photo, model, model meta, mileage, plate. Tap → fullscreen vehicle detail page.</div>
            <div className="anno" style={{top:334, left:340}}><span className="num">4</span>Recent orders — stack of 2–3 latest orders for the active car.</div>
            <div className="anno" style={{top:475, left:340}}><span className="num">5</span>Wishlist — saved items the user wants to revisit; discount tags surface deal items.</div>
            <div className="anno" style={{top:598, left:340}}><span className="num">6</span>Rewards — bonuses balance and coupons in a 2-column tile.</div>
            <div className="anno" style={{top:694, left:340}}><span className="num">7</span>Quick links — Delivery Address and Support entry points, 2-column tile at the bottom of the layer.</div>
          </div>
        </FrameCell>
      </FrameRow>

      <H3>Car selector — carousel or tabs</H3>
      <p>Two ways to surface the user's cars and pick the active one. The <b>carousel</b> (above) swipes one card at a time — compact, but the user only sees one car until they scroll. The <b>tabs</b> variant lays the cars out as a row of selectable tabs on top, with the selected car expanded into a detail panel beneath (photo + mini-specs) and a dashed «+ Add» tile at the end of the row. Everything below the selector — recent orders, wishlist, rewards, quick links — is identical; only the car-picker changes. Tabs make every car visible at once and give the active one a dedicated panel; the carousel saves vertical space. <i>Tabs are a candidate to replace the carousel.</i></p>

      <FrameRow>
        <FrameCell caption="<b>Tabs variant.</b> Cars become a horizontal tab row — selected outlined in accent, «+ Add» dashed tile at the end. Below, the selected car expands into a detail panel: «● SELECTED» badge, photo, model, plate, and a mileage line. The rest of the My AUTODOC stack is unchanged.">
          <Phone tall>
            <GarageBaseTabsFull />
          </Phone>
        </FrameCell>
      </FrameRow>

      <DoDont
        doItem="Use the dark My AUTODOC layer for everything about the user's cars and history — vehicle detail, order history, mileage updates, service schedule, addresses, saved items, and rewards. Anything about parts, prices, or shopping stays on the curtain. Multi-step car flows are corridors, not garage screens."
        dontItem="Don't borrow the curtain's visual code on My AUTODOC (white surface, product cards, search-as-hero). The metaphor falls apart the moment the dark layer starts looking like the curtain."
      />
    </Section>
  );
}
window.Ch03Garage = Ch03Garage;
