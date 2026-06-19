// ---------------------------------------------------------------
// P — Product Card
// ---------------------------------------------------------------
// The single most-used pattern in Autodoc. One card represents one product —
// badges, image, brand/name, rating, price, delivery, action — and appears in
// catalog grids, search results and recommendation rails. Two layouts
// (vertical / horizontal) and two states (in-stock / out-of-stock).

// Promo badge — small pill that floats over the top-left of the image.
// «Best Budget» (ink), «Free Shipping» (green), or any promo tag.
function MiniBadge({ tone = "ink", label = "Best Budget" }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 7px", borderRadius: 4,
      background: tone === "good" ? "#2e7d32" : "#111",
      color: "#fff", fontSize: 8, fontWeight: 600,
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      whiteSpace: "nowrap",
    }}>{label}</div>
  );
}

// Save / compare icon stack.
// `bare` = plain icons (used inside a card, on the content area — horizontal).
// default = soft white circles (overlaid over a photo — vertical).
function MiniIconStack({ bare = false }) {
  const wrap = bare
    ? { width: 18, height: 18, color: "#6b6b6b",
        display: "flex", alignItems: "center", justifyContent: "center" }
    : { width: 22, height: 22, borderRadius: "50%",
        background: "rgba(255,255,255,0.9)", color: "#3a3a3a",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)" };
  const sz = bare ? 15 : 13;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={wrap}>
        <svg width={sz} height={sz} viewBox="0 0 22 22" fill="none"
          stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 18s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 18 8c0 5.5-7 10-7 10z"/>
        </svg>
      </div>
      <div style={wrap}>
        <svg width={sz} height={sz} viewBox="0 0 22 22" fill="none"
          stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <line x1="11" y1="3" x2="11" y2="19"/>
          <path d="M3 8l4-3 4 3-4 7-4-7zM11 8l4-3 4 3-4 7-4-7z"/>
        </svg>
      </div>
    </div>
  );
}

// Star rating row — single yellow ★, rating value, review count.
function MiniStars({ rating = "4.8", count = "127" }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 4,
      fontFamily: '-apple-system, "SF Pro Text", sans-serif', fontSize: 9,
    }}>
      <span style={{ color: "#f5b800", fontSize: 10, lineHeight: 1 }}>★</span>
      <span style={{ color: "#111", fontWeight: 700 }}>{rating}</span>
      <span style={{ color: "#9a9a9a" }}>({count})</span>
    </div>
  );
}

// Photo block. When in stock, promo badges float over the top-left.
// `overlayIcons` puts the save / compare stack over the top-right of the photo
// (vertical layout). Horizontal cards set overlayIcons=false and place the
// icons on the right of the card content instead. Out of stock: no badges,
// no icons, image dimmed.
function MiniPhoto({ height = 92, oos = false, overlayIcons = true }) {
  return (
    <div style={{
      position: "relative", height, borderRadius: 8,
      background: "#ececec", overflow: "hidden",
      opacity: oos ? 0.55 : 1,
    }}>
      {!oos && (
        <div style={{
          position: "absolute", top: 6, left: 6,
          display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start",
          maxWidth: "62%", zIndex: 2,
        }}>
          <MiniBadge tone="ink" label="Best Budget" />
          <MiniBadge tone="good" label="Free Shipping" />
        </div>
      )}
      {!oos && overlayIcons && (
        <div style={{ position: "absolute", top: 6, right: 6, zIndex: 2 }}>
          <MiniIconStack />
        </div>
      )}
    </div>
  );
}

// In-card action — filled «+ Add to cart» when in stock, secondary outlined
// «Notify me» when out of stock.
function MiniAction({ oos = false }) {
  if (oos) {
    return (
      <div style={{
        height: 32, background: "#fff", color: "#111",
        border: "1.5px solid #111", borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 600,
      }}>Notify me</div>
    );
  }
  return (
    <div style={{
      height: 32, background: "#111", color: "#fff", borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 6, fontSize: 12, fontWeight: 600,
    }}>
      <span style={{ fontSize: 13, lineHeight: 1 }}>+</span>
      <span>Add to cart</span>
    </div>
  );
}

// Delivery line — date when in stock, «Out of stock» when not.
function MiniDelivery({ oos = false, delivery = "Delivery Mon, May 19–21" }) {
  if (oos) {
    return (
      <div style={{ fontSize: 9, color: "#6b6b6b", fontWeight: 600 }}>Out of stock</div>
    );
  }
  return (
    <div style={{ fontSize: 9, color: "#6b6b6b" }}>{delivery}</div>
  );
}

// Vertical mini card — grid layout. Image with overlaid badges/icons on top,
// content stacked beneath, full-width action at the bottom.
function MiniVerticalCard({
  oos = false,
  name = "RIDEX PLUS Active Defense",
  spec = "10W-40 · 1L · Longlife-98",
  rating = "4.8", count = "127",
  price = "18.99 €", perUnit = "/ pc",
  delivery = "Delivery Mon, May 19–21",
}) {
  return (
    <div style={{
      background: "#f7f6f4", borderRadius: 10, padding: 8,
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <MiniPhoto height={92} oos={oos} />
      <div style={{ fontSize: 11, fontWeight: 700, color: "#111", lineHeight: 1.25, marginTop: 8 }}>{name}</div>
      <div style={{ fontSize: 9, color: "#6b6b6b", marginTop: 3 }}>{spec}</div>
      <div style={{ marginTop: 5 }}><MiniStars rating={rating} count={count}/></div>
      <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{price}</span>
        <span style={{ fontSize: 8, color: "#9a9a9a" }}>{perUnit}</span>
      </div>
      <div style={{ marginTop: 3, marginBottom: 8 }}><MiniDelivery oos={oos} delivery={delivery}/></div>
      <MiniAction oos={oos}/>
    </div>
  );
}

// Horizontal mini card — list layout. Image left with overlaid badges/icons,
// content middle, full-width action across the bottom.
function MiniHorizontalCard({
  oos = false,
  name = "RIDEX PLUS Active Defense",
  spec = "10W-40 · 1L · Longlife-98",
  rating = "4.8", count = "127",
  price = "18.99 €", perUnit = "/ pc",
  delivery = "Delivery Mon, May 19–21",
}) {
  return (
    <div style={{
      background: "#f7f6f4", borderRadius: 10, padding: 8,
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ width: 92, flexShrink: 0 }}>
          <MiniPhoto height={92} oos={oos} overlayIcons={false} />
        </div>
        <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 6 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#111", lineHeight: 1.25,
            }}>{name}</div>
            <div style={{ fontSize: 9, color: "#6b6b6b", marginTop: 3 }}>{spec}</div>
            <div style={{ marginTop: 5 }}><MiniStars rating={rating} count={count}/></div>
            <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 3 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{price}</span>
              <span style={{ fontSize: 8, color: "#9a9a9a" }}>{perUnit}</span>
            </div>
            <div style={{ marginTop: 3 }}><MiniDelivery oos={oos} delivery={delivery}/></div>
          </div>
          {!oos && (
            <div style={{ flexShrink: 0, paddingTop: 1 }}>
              <MiniIconStack bare />
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: 10 }}><MiniAction oos={oos}/></div>
    </div>
  );
}

function P15ProductCard() {
  return (
    <Section id="p-product-card">
      <PatternHead title="Product Card"
        lede={<>The single most-used pattern in Autodoc. One card represents one product — <b>promo badges</b>, image, name, rating, price, delivery, action. The same card appears in catalog grids, search results and recommendation rails, in two layouts (vertical / horizontal) and two states (in-stock / out-of-stock).</>} />

      <Callout label="Autodoc reading">
        A product card is what the user looks at fifty times a session — a single unit of trust: <i>what it is</i>, <i>what it costs</i>, <i>when it arrives</i>, and <i>what one tap does</i>. Promo badges (Best Budget, Free Shipping) float over the top-left of the image. The save / compare icons sit top-right — <b>over the photo on the vertical card</b>, and <b>on the right of the content on the horizontal card</b>. The trailing action is a full-width button at the bottom: filled <b>Add to cart</b> in stock, secondary <b>Notify me</b> when out of stock.
      </Callout>

      <H3>In stock — the default</H3>
      <p>Both layouts carry the same anatomy: image with overlaid badges and icons, name, spec, rating, price with per-unit, delivery date, and a filled Add to cart. Vertical is the grid card (catalog, search); horizontal is the rail card (recommendations, «people also bought»).</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Vertical (grid).</b> Two-up grid. Badges top-left of the image, save / compare top-right, full-width Add to cart at the bottom.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{
              position: "absolute", top: 88, left: 0, right: 0, padding: "0 8px",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
            }}>
              <MiniVerticalCard/>
              <MiniVerticalCard
                name="BOSCH 0 451 103 318"
                spec="Oil filter · BMW 3 · 2.0d"
                rating="4.7" count="89"
                price="9.40 €"
                delivery="Delivery Tue, May 20"
              />
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Horizontal (rail).</b> Same anatomy, list shape. Image left with overlaid badges / icons, content middle, full-width Add to cart across the bottom.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{
              position: "absolute", top: 88, left: 0, right: 0, padding: "0 8px",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <MiniHorizontalCard/>
              <MiniHorizontalCard
                name="BOSCH 0 451 103 318"
                spec="Oil filter · BMW 3 · 2.0d"
                rating="4.7" count="89"
                price="9.40 €"
                delivery="Delivery Tue, May 20"
              />
            </div>
          </Phone>
        </FrameCell>
      </div>

      <H3>Out of stock</H3>
      <p>When the product is unavailable the card strips back to the essentials: the delivery line becomes <b>Out of stock</b>, all promo badges drop (Best Budget, Free Shipping — nothing to promote), the save / compare icons drop, the image dims, and the Add to cart button is replaced by a secondary <b>Notify me</b>. Name, rating and price stay readable so the user can still decide to be notified.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Vertical — out of stock.</b> Image dimmed, no badges, no save / compare icons, delivery line reads «Out of stock», trailing action is the secondary «Notify me».">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{
              position: "absolute", top: 88, left: 0, right: 0, padding: "0 8px",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
            }}>
              <MiniVerticalCard oos/>
              <MiniVerticalCard
                oos
                name="BOSCH 0 451 103 318"
                spec="Oil filter · BMW 3 · 2.0d"
                rating="4.7" count="89"
                price="9.40 €"
              />
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Horizontal — out of stock.</b> Same treatment in the rail card: dimmed image, no badges, no icons, «Out of stock» delivery line, secondary «Notify me» across the bottom.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{
              position: "absolute", top: 88, left: 0, right: 0, padding: "0 8px",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <MiniHorizontalCard oos/>
              <MiniHorizontalCard
                oos
                name="BOSCH 0 451 103 318"
                spec="Oil filter · BMW 3 · 2.0d"
                rating="4.7" count="89"
                price="9.40 €"
              />
            </div>
          </Phone>
        </FrameCell>
      </div>

      <Rules items={[
        "<b>One card, every surface.</b> Same component, same proportions, same anatomy across catalog grid, search results and recommendation rails. Two layouts (vertical / horizontal), two states (in-stock / out-of-stock).",
        "<b>Badges float over the image, top-left.</b> Best Budget (ink), Free Shipping (green) and other promo tags overlay the top-left corner of the photo, stacked. They hug the corner — never cover the whole image.",
        "<b>Save / compare sit top-right.</b> On the vertical card the icon stack overlays the top-right of the photo in soft white circles; on the horizontal card it sits as plain icons on the right of the content, off the photo. Either way it never collides with the badges on the left.",
        "<b>Full-width action at the bottom.</b> Filled Add to cart in stock; secondary outlined Notify me out of stock. The action is always the loudest affordance on the card.",
        "<b>Out of stock strips back to essentials.</b> Name, rating and price stay; the delivery line reads Out of stock, every promo badge and the save / compare icons drop, the image dims, and the action becomes the secondary Notify me. Nothing on the card invites a purchase that can't happen.",
        "<b>Price with per-unit.</b> The price carries a small per-unit suffix (/ pc, / L) so the user compares like with like.",
        "<b>Truncate, don't shrink.</b> Long names truncate; never reduce the name's font size to fit more text.",
      ]}/>

      <DoDont
        doItem="Use the same card in catalog, search and recommendations. Float badges over the image top-left, icons top-right, and keep one full-width action at the bottom."
        dontItem="Don't let badges cover the photo or collide with the save / compare icons. Don't keep an active Add to cart on an out-of-stock card — swap it for the secondary Notify me."
      />
    </Section>
  );
}
window.P15ProductCard = P15ProductCard;
