// ---------------------------------------------------------------
// P28 — Product Card
// ---------------------------------------------------------------

// Local helpers used only inside this chapter.
//
// VerticalCard — the grid layout: image on top, brand + name + fitment + price
// + add stacked beneath. Used in catalog grid, search results, recommendations.
function VerticalCard({
  brand = "Bosch", name = "Brake pad set front",
  fitment = "fits", price = "€46.20", was, addStyle = "icon",
}) {
  const fit = fitment === "fits"
    ? { color: "var(--good)", label: "✓ Fits your BMW" }
    : fitment === "check"
    ? { color: "var(--warn)", label: "⚠ Check fitment" }
    : fitment === "doesnt"
    ? { color: "var(--bad)", label: "✕ Doesn't fit" }
    : null;
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--line)",
      borderRadius: 8, padding: 8, display: "flex", flexDirection: "column",
    }}>
      <div style={{
        height: 70, background: "var(--line-2)", borderRadius: 4,
        marginBottom: 6, position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 4, right: 4,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8, color: "var(--muted)",
          padding: "2px 4px", background: "#fff", borderRadius: 2,
        }}>{brand}</div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{name}</div>
      {fit && (
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9, color: fit.color, marginTop: 4,
        }}>{fit.label}</div>
      )}
      <div style={{
        marginTop: "auto", paddingTop: 6, display: "flex",
        alignItems: "center", justifyContent: "space-between", gap: 6,
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{price}</div>
          {was && <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9, color: "var(--muted)",
            textDecoration: "line-through",
          }}>{was}</div>}
        </div>
        {addStyle === "icon" ? (
          <div style={{
            width: 26, height: 26, borderRadius: 13,
            background: "var(--ink)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, lineHeight: 1,
          }}>+</div>
        ) : (
          <div style={{
            height: 26, padding: "0 10px", borderRadius: 13,
            background: "var(--ink)", color: "#fff",
            display: "flex", alignItems: "center",
            fontSize: 10, fontWeight: 600,
          }}>Add</div>
        )}
      </div>
    </div>
  );
}

// HorizontalCard — list layout. Image left, content right, tight stepper or +
// on the right edge. Used in cart, wishlist, "saved for later".
function HorizontalCard({
  brand = "Bosch", name = "Brake pad set front",
  fitment = "fits", price = "€46.20", was,
  trailing = "add", // "add" | "stepper" | "checkbox"
  qty = 2,
}) {
  const fit = fitment === "fits"
    ? { color: "var(--good)", label: "✓ Fits your BMW" }
    : fitment === "check"
    ? { color: "var(--warn)", label: "⚠ Check fitment" }
    : fitment === "doesnt"
    ? { color: "var(--bad)", label: "✕ Doesn't fit" }
    : null;
  return (
    <div style={{
      display: "flex", gap: 10, padding: "10px 0",
      borderBottom: "1px solid var(--line)", alignItems: "center",
    }}>
      <div style={{
        width: 44, height: 44, background: "var(--line-2)",
        borderRadius: 6, flex: "0 0 44px",
      }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9, color: "var(--muted)",
        }}>{brand}</div>
        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>{name}</div>
        {fit && (
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9, color: fit.color, marginTop: 3,
          }}>{fit.label}</div>
        )}
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 12, fontWeight: 700 }}>{price}</div>
        {was && <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9, color: "var(--muted)",
          textDecoration: "line-through",
        }}>{was}</div>}
      </div>
      {trailing === "add" && (
        <div style={{
          width: 28, height: 28, borderRadius: 14,
          background: "var(--ink)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, lineHeight: 1,
        }}>+</div>
      )}
      {trailing === "stepper" && (
        <div style={{
          display: "flex", alignItems: "center",
          border: "1px solid var(--line)", borderRadius: 16, height: 28,
          fontFamily: '-apple-system, "SF Pro Text", sans-serif',
        }}>
          <div style={{ width: 26, textAlign: "center", fontSize: 14 }}>−</div>
          <div style={{ width: 22, textAlign: "center", fontSize: 11, fontWeight: 600 }}>{qty}</div>
          <div style={{ width: 26, textAlign: "center", fontSize: 14 }}>+</div>
        </div>
      )}
    </div>
  );
}

function P15ProductCard() {
  return (
    <Section id="p-product-card">
      <PatternHead title="Product Card"
        lede={<>The single most-used pattern in Autodoc. A unified card that represents one product — image, brand, name, fitment, price, action. The same card appears in catalog, search results, recommendations, cart, and wishlist. <b>One card, eight contexts.</b></>} />

      <Callout label="Autodoc reading">
        Autodoc is a parts e-commerce — a product card is what the user looks at fifty times per session. The card is a single unit of trust: it tells the user <i>what it is</i>, <i>whether it fits their car</i>, <i>what it costs</i>, and <i>what one tap will do</i>. Same component across catalog grid, search results, recommendations, wishlist, cart, saved-for-later, order history — two layouts (vertical / horizontal) and four trailing actions (icon-add, labelled-add, stepper, checkbox).
      </Callout>

      <H3>Two layouts</H3>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Vertical (grid).</b> Catalog grid, search results, recommendations strip. Image on top, action bottom-right.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{
              position: "absolute", top: 90, left: 0, right: 0, padding: "0 14px",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
            }}>
              <VerticalCard fitment="fits" was="€58.00"/>
              <VerticalCard fitment="fits"/>
              <VerticalCard fitment="check"/>
              <VerticalCard fitment="fits"/>
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Horizontal (list).</b> Cart, wishlist, saved-for-later, order details. Image left, content middle, action far right.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{ position: "absolute", top: 90, left: 0, right: 0, padding: "0 14px" }}>
              <HorizontalCard fitment="fits" trailing="stepper" qty={2}/>
              <HorizontalCard fitment="fits" trailing="stepper" qty={1}/>
            </div>
          </Phone>
        </FrameCell>
      </div>

      <H3>Fitment states</H3>
      <p>Fitment answers the question the user is actually asking — «Will this fit my car?». Three states, each with colour <b>and</b> icon — never colour alone, so the meaning survives colour-blindness, screenshots, and dark mode.</p>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>✓ Fits</b> (green). System matched the part to the active car. The user can add with confidence.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{
              position: "absolute", top: 90, left: 0, right: 0, padding: "0 14px",
              display: "grid", gridTemplateColumns: "1fr", gap: 10,
            }}>
              <VerticalCard fitment="fits" addStyle="label"/>
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>⚠ Check fitment</b> (amber). System cannot fully match — usually a generic part across platforms. Tap reveals the compatibility table; user confirms before adding.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{
              position: "absolute", top: 90, left: 0, right: 0, padding: "0 14px",
              display: "grid", gridTemplateColumns: "1fr", gap: 10,
            }}>
              <VerticalCard fitment="check" addStyle="label"/>
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>✕ Doesn't fit</b> (red). System matched the part as incompatible. Add button is disabled — never silently allow a wrong-fit purchase.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none"/>
            <div style={{
              position: "absolute", top: 90, left: 0, right: 0, padding: "0 14px",
              display: "grid", gridTemplateColumns: "1fr", gap: 10,
            }}>
              <VerticalCard fitment="doesnt" addStyle="label"/>
            </div>
          </Phone>
        </FrameCell>
      </div>

      <H3>Trailing action — four shapes</H3>
      <p>The card's trailing action is what the user taps to act on this product without leaving the surface. Four shapes, picked by context.</p>
      <Rules items={[
        "<b>Icon «+».</b> Catalog grid, search results — when space is tight. One tap adds 1 to cart.",
        "<b>Labelled «Add».</b> Recommendation strips, single-column lists — when there is room. Same behaviour as icon, just more legible.",
        "<b>Stepper («− 2 +»).</b> Cart, wishlist — once the item is in cart, the trailing action becomes a stepper for inline quantity edits. No second visit to a detail screen needed.",
        "<b>Checkbox.</b> Multi-select contexts (compare, bulk add). Same card chrome, trailing replaced by a checkbox; tapping the card body still opens detail.",
      ]}/>

      <Rules items={[
        "<b>One card, eight contexts.</b> Same component, same proportions, same anatomy across catalog, search, recommendations, cart, wishlist, saved-for-later, order history, cross-sell.",
        "<b>Fitment is colour AND icon.</b> Never colour alone — accessibility and screenshots both lose meaning otherwise.",
        "<b>Trailing action is bounded.</b> The card body navigates; only the trailing button performs the inline action. Never overload the card body with two destinations.",
        "<b>Truncate, don't shrink.</b> Long product names truncate to 2 lines with an ellipsis. Never reduce font size to fit more text.",
        "<b>Strikethrough above the active price.</b> Old price sits above the current price when discounted, smaller and crossed out. The eye reads top-down — current price wins.",
        "<b>Disabled means «doesn't fit», not «out of stock».</b> Out-of-stock is a separate label («Notify me») — different recovery path.",
        "<b>Fitment re-evaluates locally on car switch.</b> When the active car changes, every visible card re-renders its badge without a re-fetch — the visible payoff of the Garage architecture.",
      ]}/>

      <DoDont
        doItem="Use the same card in catalog, search, recommendations, cart, and wishlist. The user reads it in the same place every time, and the team ships once."
        dontItem="Don't ship a separate «cart card» that hides the brand or the fitment badge. The user needs the same context to make the same decision they made when adding it."
      />
    </Section>
  );
}
window.P15ProductCard = P15ProductCard;
