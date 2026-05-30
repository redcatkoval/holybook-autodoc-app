// ---------------------------------------------------------------
// P14 — Widgets
// ---------------------------------------------------------------
function P14Promo() {
  return (
    <Section id="p-promo">
      <PatternHead num="01" title="Widgets" category="Content"
        lede={<><span className="hl">Widgets</span> are the reusable content blocks the application is built from. The shape is canonical — eleven types in a fixed catalogue. The owner of the slot depends on the context: marketing fills some from a CMS, the product team renders others in place. Same blocks, different governance.</>} />


      <Callout label="Autodoc reading">
        Marketing needs slots it can fill without a release cycle. The product team needs a fixed palette so screens don't drift into one-off compositions. Users need the visual rhythm of the app to stay predictable. The widget catalogue solves all three problems at once: a closed set of layouts, used both for promotional content and for the structural blocks of the product. Outside the catalogue — nothing ships.
      </Callout>

      <H3>The catalogue — four families</H3>
      <p>Eleven types group naturally into four families by visual weight and intent. Within a family the widgets differ in composition; across families they differ in purpose.</p>

      <H4>Banner family — image-heavy, usually marketing-controlled</H4>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>1. Combined banner.</b> Image + title + subtitle. The simplest promo block — one feature, one tap, one destination.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBanner kind="combined" />
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>2. Product / feature widget.</b> Image + title + description + single CTA, contained as a card. Used to feature one specific product or a single new feature in detail.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBannerExt kind="product-widget" />
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>3. Banner slider — row of cells.</b> A row of compact cells, each with an image and a short label. Used for quick category navigation or a tile-row of related items.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBanner kind="text-icons-row" />
            </div>
          </Phone>
        </FrameCell>
      </div>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>4. Slider with pagination.</b> One large banner at a time, with dots underneath marking position. Multiple banners cycle through the same slot; the user can swipe through them.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBanner kind="slider" />
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>6. Video player.</b> Short product or brand video, plays in place. Used sparingly — video is heavy and demands attention the user did not promise.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBanner kind="video" />
            </div>
          </Phone>
        </FrameCell>
      </div>

      <H4>List with focus — peer-aware sequences</H4>
      <FrameRow>
        <FrameCell caption="<b>5. Stack with focus.</b> One element is in focus, two siblings peek behind it on either side hinting depth — a sequence the user can swipe through. Used wherever the screen offers several comparable options at once (service variants, garage cars, plan choices) and one of them is currently active.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBanner kind="stack" />
            </div>
          </Phone>
        </FrameCell>
      </FrameRow>

      <H4>Action card family — text-led, usually product-controlled</H4>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>7. Text + action block.</b> Title, subtitle, single primary button. No image — used when copy carries the message and an image would distract: legal opt-ins, account upgrades.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBannerExt kind="text-cta" />
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>8. Input + action.</b> Title, subtitle, input field, primary button. Used when the widget collects something specific (mileage, address fragment, email) before committing.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBanner kind="input" />
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>9. Input + icon actions.</b> Input with one or more icon buttons on the right (copy, paste, scan, share). Used for fields where the user might prefer a tap to typing — coupon codes, shared links.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBannerExt kind="input-icons" />
            </div>
          </Phone>
        </FrameCell>
      </div>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>10. Trailing icon block.</b> Compact card with image, title, subtitle, and a small trailing tag, icon, or disclosure arrow — no full button. Used for quiet shortcuts and nav-style rows that don't need to shout.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBannerExt kind="trailing-icon" />
            </div>
          </Phone>
        </FrameCell>
      </div>

      <H4>Textual contextual — info without transition</H4>
      <FrameRow>
        <FrameCell caption="<b>11. Contextual text block.</b> Inline informational text, no transition by tap, sometimes with an inline text button. Sits next to the content it refers to — disclaimers, fitment notes, soft hints. A sheet-version of this kind of content exists separately; this one is inline on the screen.">
          <Phone>
            <Stub note="screen body" />
            <div style={{ position: "absolute", left: 14, right: 14, top: 80 }}>
              <PromoBannerExt kind="contextual-text" />
            </div>
          </Phone>
        </FrameCell>
      </FrameRow>

      <H3>Composition rules</H3>
      <ul className="rules">
        <li><b>Action hierarchy holds.</b> If the screen carries a sticky-footer Primary CTA, widgets above it use Secondary or Tertiary actions inside their cards — not a second Primary at the screen level. A list of <i>identical</i> action cards (each with its own «Confirm») is the one exception — repeating isolated contexts read as one pattern, not as many primaries.</li>
        <li><b>One widget = one purpose.</b> A combined banner promotes; a slider rotates; a stack compares; a video plays; an action card asks for input. Marketing combines them; the widgets themselves don't bend their shape.</li>
      </ul>

      <Rules items={[
        "<b>Fixed catalogue.</b> Eleven widget types. No bespoke one-offs. Consistency over novelty.",
        "<b>Slot, not content.</b> Engineering reserves the placeholder; marketing or product fills it. Marketing iterates without a release cycle; product-controlled functional blocks are rendered in code. The shape is the contract — both sides use the same eleven types.",
        "<b>Action hierarchy still holds.</b> Widgets respect the screen-level rules — one Primary per screen, secondary inside blocks, repeating Primaries only in identical card lists.",
        "<b>Loading, empty, and error states are owned elsewhere.</b> A loading widget shows a skeleton or spinner; a widget without data falls back to an empty state; a failed widget shows an error. Each state is handled by its own pattern.",
      ]}/>

      <DoDont
        doItem="Reserve a banner slot at the top of the catalog and let marketing rotate three offers there. Reserve a stack-with-focus inside the garage so each car gets its own mileage-input card. Engineering ships once; the slot owner iterates."
        dontItem="Don't let marketing ship custom HTML banners as images. Don't put two equal-weight image banners back-to-back. Don't pretend an action card with a Primary CTA is harmless on a screen that already has a footer Primary — that's two competing verbs."
      />
    </Section>
  );
}
window.P14Promo = P14Promo;
