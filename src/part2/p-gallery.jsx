// ---------------------------------------------------------------
// P — Image Gallery
// ---------------------------------------------------------------

// Single thumbnail tile with optional media-type indicator (video / 360 / fitment).
function IGThumb({ kind = "photo", selected = false, small = false }) {
  const size = small ? 38 : 48;
  const indicator =
    kind === "video"   ? "▶" :
    kind === "360"     ? "360°" :
    kind === "fitment" ? "⌗" :
    null;
  return (
    <div style={{
      width: size, height: size, background: "#ececec", borderRadius: 6,
      border: selected ? "1.5px solid #111" : "1.5px solid transparent",
      flexShrink: 0, position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {indicator && (
        <div style={{
          position: "absolute", bottom: 3, right: 3,
          minWidth: 14, height: 14, padding: "0 3px",
          background: "rgba(0,0,0,0.6)", color: "#fff",
          borderRadius: 3, fontSize: kind === "360" ? 7 : 9,
          fontWeight: 600,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{indicator}</div>
      )}
    </div>
  );
}

// Horizontal thumbnail strip — list of thumbs with one selected.
function IGThumbStrip({ items = ["photo", "photo", "video", "360", "fitment"], selected = 0 }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "10px 16px", overflow: "hidden" }}>
      {items.map((kind, i) => (
        <IGThumb key={i} kind={kind} selected={i === selected} />
      ))}
    </div>
  );
}

// Pagination dots indicator under the main media.
function IGDots({ count = 5, active = 0 }) {
  return (
    <div style={{ display: "flex", gap: 5, justifyContent: "center", padding: "8px 0 4px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: i === active ? "#111" : "#d8d8d8",
        }}/>
      ))}
    </div>
  );
}

// Main media area on the PDP — big image + media-type badge if applicable.
function IGMainPDP({ kind = "photo" }) {
  return (
    <div style={{
      height: 200, background: "#ececec", borderRadius: 10,
      margin: "0 16px", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#9a9a9a", fontSize: 36,
    }}>
      <span>▱</span>
      {kind === "video" && (
        <div style={{
          position: "absolute",
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,255,255,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, color: "#111", paddingLeft: 4,
        }}>▶</div>
      )}
      {kind === "360" && (
        <div style={{
          position: "absolute", bottom: 8, left: 8,
          padding: "4px 8px", background: "rgba(0,0,0,0.7)", color: "#fff",
          borderRadius: 12, fontSize: 10, fontWeight: 600,
        }}>360°</div>
      )}
      {kind === "fitment" && (
        <div style={{
          position: "absolute", bottom: 8, left: 8,
          padding: "4px 8px", background: "rgba(0,0,0,0.7)", color: "#fff",
          borderRadius: 12, fontSize: 10, fontWeight: 600,
        }}>Fitment</div>
      )}
    </div>
  );
}

// Full-screen viewer chrome — black surface, × close, content slot, optional thumb strip.
function IGViewer({ children, withThumbs = true, thumbSelected = 0 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#111",
      display: "flex", flexDirection: "column", zIndex: 5,
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        padding: "44px 14px 12px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ width: 28 }}/>
        <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
          {thumbSelected + 1} / 5
        </div>
        <div style={{ width: 28, fontSize: 18, color: "#fff", textAlign: "right" }}>✕</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
        {children}
      </div>
      {withThumbs && (
        <div style={{ padding: "10px 16px 24px", display: "flex", gap: 6, overflow: "hidden", justifyContent: "center" }}>
          {["photo", "photo", "video", "360", "fitment"].map((kind, i) => (
            <div key={i} style={{
              width: 40, height: 40, background: "#333", borderRadius: 6,
              border: i === thumbSelected ? "1.5px solid #fff" : "1.5px solid transparent",
              flexShrink: 0, position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {kind === "video" && (
                <div style={{ fontSize: 11, color: "#fff" }}>▶</div>
              )}
              {kind === "360" && (
                <div style={{ fontSize: 7, fontWeight: 600, color: "#fff" }}>360°</div>
              )}
              {kind === "fitment" && (
                <div style={{ fontSize: 11, color: "#fff" }}>⌗</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Video controls inside viewer — play button + scrubber.
function IGVideoControls() {
  return (
    <div style={{
      width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        background: "rgba(255,255,255,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, color: "#111", paddingLeft: 4,
      }}>▶</div>
      <div style={{
        width: "80%", height: 3, background: "rgba(255,255,255,0.3)", borderRadius: 2,
        position: "relative",
      }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: "30%", background: "#fff", borderRadius: 2,
        }}/>
        <div style={{
          position: "absolute", left: "30%", top: -4,
          width: 11, height: 11, borderRadius: "50%", background: "#fff",
          transform: "translateX(-50%)",
        }}/>
      </div>
    </div>
  );
}

// 360-view rotation indicator (drag-hint pill).
function IG360Indicator() {
  return (
    <div style={{
      padding: "8px 14px", background: "rgba(255,255,255,0.12)", color: "#fff",
      borderRadius: 18, fontSize: 11, fontWeight: 500,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span>↺</span>
      <span>Swipe to rotate</span>
    </div>
  );
}

// Auto-loop animation: cycles through the four media kinds on the PDP main
// media block. Each phase shows the corresponding badge + dot.
function PDPMediaAnimation() {
  const kinds = ["photo", "video", "360", "fitment"];
  const dotMap = { photo: 0, video: 2, "360": 3, fitment: 4 };
  const [phase, setPhase] = useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setPhase((phase + 1) % kinds.length), 2200);
    return () => clearTimeout(t);
  }, [phase]);
  const kind = kinds[phase];
  return (
    <Phone size="lg">
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ padding: "70px 0 0" }}>
        <IGMainPDP kind={kind} />
        <IGDots count={5} active={dotMap[kind]} />
      </div>
    </Phone>
  );
}

// Auto-loop animation: cycles through the four viewer states. Same chrome,
// content swaps — demonstrates the «one viewer for every media type» rule.
function ViewerAnimation() {
  const phases = ["photo", "video", "360", "fitment"];
  const thumbMap = { photo: 0, video: 2, "360": 3, fitment: 4 };
  const [phase, setPhase] = useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setPhase((phase + 1) % phases.length), 2400);
    return () => clearTimeout(t);
  }, [phase]);
  const kind = phases[phase];
  return (
    <Phone size="lg">
      <IGViewer thumbSelected={thumbMap[kind]}>
        {kind === "photo" && (
          <div style={{
            width: "100%", aspectRatio: "1", maxWidth: 280,
            background: "#333", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.4)", fontSize: 48,
          }}>▱</div>
        )}
        {kind === "video" && <IGVideoControls />}
        {kind === "360" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{
              width: "100%", aspectRatio: "1", maxWidth: 240,
              background: "#333", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.4)", fontSize: 48,
            }}>↺</div>
            <IG360Indicator />
          </div>
        )}
        {kind === "fitment" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{
              width: "100%", aspectRatio: "4/3", maxWidth: 280,
              background: "#333", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.4)", fontSize: 36,
            }}>⌗</div>
            <div style={{
              padding: "6px 12px", background: "rgba(255,255,255,0.12)", color: "#fff",
              borderRadius: 14, fontSize: 11, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>✓</span>
              <span>Fits your car</span>
            </div>
          </div>
        )}
      </IGViewer>
    </Phone>
  );
}

// Checkout-preview row — single thumbnail + line info, no gallery affordance.
function IGCheckoutRow() {
  return (
    <div style={{
      display: "flex", gap: 10, padding: "12px 14px",
      borderBottom: "1px solid #ececec", alignItems: "center",
    }}>
      <div style={{
        width: 56, height: 56, background: "#ececec", borderRadius: 6, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#9a9a9a", fontSize: 22,
      }}>▱</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="skel-row" style={{ width: "75%", height: 8, margin: 0, background: "#b8b8b8" }}/>
        <div className="skel-row" style={{ width: "55%", height: 6, margin: "6px 0 0" }}/>
        <div className="skel-row" style={{ width: "30%", height: 9, margin: "6px 0 0", background: "#b8b8b8" }}/>
      </div>
    </div>
  );
}

function PGallery() {
  return (
    <Section id="p-gallery">
      <PatternHead num="03" title="Image Gallery" category="Content"
        lede={<>The <span className="hl">image gallery</span> carries everything visual the product has — photos, video, 360-view, fitment diagrams. On the PDP it lives inline as the main media block; tapping any thumbnail opens a full-screen viewer where the user swipes between media. In the checkout preview the gallery collapses to a single thumbnail per line — the user is committing, not browsing.</>} />


      <Callout label="Autodoc reading">
        Auto parts come with more than one kind of image. A brake disc has product shots, but also an installation video, a 360 view of the part, and a fitment diagram showing where it sits on the car. Putting these into one gallery — with consistent media-type indicators on each thumbnail — gives the user one place to learn everything about a part. The full-screen viewer treats every kind of media uniformly: tap, swipe, close. No special photo screens vs video screens vs schematic screens.
      </Callout>

      <H3>Where the gallery lives</H3>
      <p>Two surfaces use the gallery, with different depths.</p>
      <ul className="rules">
        <li><b>PDP — main media + dots.</b> One large media block at the top of the screen, position dots below. Swipe horizontally to move between items; the active media's type (photo, video, 360, fitment) is signalled by a small badge in the corner of the main media itself. Tap the main media to open the full-screen viewer — that is where the thumbnail strip lives.</li>
        <li><b>Checkout preview — single thumbnail.</b> Each cart line shows just one thumbnail (the product's primary image), no carousel, no viewer. The user is reviewing the order, not the product. To see the full gallery the user returns to the PDP.</li>
        <li><b>PLP, cart row, wishlist — single thumbnail too.</b> Same logic — a thumbnail signals what the item is; tapping the card navigates to the PDP, which is the gallery's home.</li>
      </ul>

      <H3>PDP gallery and full-screen viewer</H3>
      <p>Four media types — photo, video, 360 view, fitment diagram — pass through one component. A small badge in the corner of the main media tells the user what tap will do; the same badge appears on the corresponding thumbnail inside the viewer. Architecturally the viewer is a <b>lightweight corridor</b>: the shell goes away, the ✕ exit is immediate (nothing is being committed), the user returns to the PDP exactly where they left.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>PDP main media.</b> Cycles through the four media types — photo, video, 360, fitment — each with its badge and dot position. Loops.">
          <PDPMediaAnimation />
        </FrameCell>
        <FrameCell caption="<b>Full-screen viewer.</b> Same chrome (dark surface, ✕ top-right, position counter, thumbnail strip); content swaps as the user moves between the four media types. Loops.">
          <ViewerAnimation />
        </FrameCell>
      </div>

      <H3>Checkout preview — gallery collapses</H3>
      <p>In the checkout the user is reviewing the order, not the product. The gallery component is not used — each line shows just one primary thumbnail. Tapping the thumbnail does <i>not</i> open the viewer; it does nothing, or at most navigates to the PDP. The point of the checkout is to commit, not to browse.</p>

      <FrameRow>
        <FrameCell caption="<b>Checkout preview.</b> Each line carries a single thumbnail of the product's primary image. No viewer, no thumbnail strip, no media-type badges. To see the full gallery the user returns to the PDP from the line — but the friction is deliberate.">
          <Phone size="lg">
            <div style={{
              position: "absolute", inset: 0, background: "#fff",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                padding: "44px 14px 12px", borderBottom: "1px solid #ececec",
                fontSize: 14, fontWeight: 600, textAlign: "center",
              }}>Checkout</div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <IGCheckoutRow />
                <IGCheckoutRow />
                <IGCheckoutRow />
              </div>
            </div>
          </Phone>
        </FrameCell>
      </FrameRow>

      <H3>Loading and error states</H3>
      <p>The gallery fetches media — so per the States canon it always carries loading and error. Loading: skeletons in the media slot and the thumb strip while images stream in. Error: a single broken-media tile with a quiet Retry; the rest of the PDP keeps rendering, the user is not blocked from reading specs and adding to cart.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Loading.</b> Skeleton block where the main media will land, skeleton strip beneath. No spinner — the container itself signals the wait.">
          <Phone>
            <div style={{ paddingTop: 44 }}>
              <div style={{
                height: 200, background: "#f1f0ed", borderRadius: 10,
                margin: "0 16px", position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                  animation: "shimmer 1.4s linear infinite",
                }}/>
              </div>
              <div style={{ display: "flex", gap: 6, padding: "12px 16px 0" }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{
                    width: 44, height: 44, borderRadius: 6,
                    background: "#f1f0ed",
                  }}/>
                ))}
              </div>
              <div style={{ padding: "20px 16px 0" }}>
                <div className="skel-row" style={{ width: "70%", height: 8, margin: 0, background: "#b8b8b8" }}/>
                <div className="skel-row" style={{ width: "45%", height: 6, margin: "8px 0 0" }}/>
              </div>
              <style>{`@keyframes shimmer { from { transform: translateX(-100%) } to { transform: translateX(100%) } }`}</style>
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Error.</b> Broken-media tile in place of the main slot, plain copy, quiet Retry. The PDP below continues to render — Add to cart is still reachable.">
          <Phone>
            <div style={{ paddingTop: 44 }}>
              <div style={{
                height: 200, background: "#f7f6f4", border: "1px solid #ececec",
                borderRadius: 10, margin: "0 16px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
                color: "#9a9a9a",
              }}>
                <div style={{ fontSize: 30 }}>▱</div>
                <div style={{ fontSize: 11, color: "#6b6b6b" }}>Couldn't load images</div>
                <div style={{
                  padding: "5px 14px", border: "1px solid #d8d8d8", borderRadius: 999,
                  fontSize: 11, fontWeight: 600, color: "#111", background: "#fff",
                }}>Retry</div>
              </div>
              <div style={{ padding: "20px 16px 0" }}>
                <div className="skel-row" style={{ width: "70%", height: 8, margin: 0, background: "#b8b8b8" }}/>
                <div className="skel-row" style={{ width: "45%", height: 6, margin: "8px 0 0" }}/>
                <div className="skel-row" style={{ width: "55%", height: 6, margin: "6px 0 0" }}/>
              </div>
            </div>
          </Phone>
        </FrameCell>
      </div>

      <H3>Edge cases</H3>
      <ul className="rules">
        <li><b>One image only.</b> No thumbnail strip, no dots. The main media alone fills the slot. Tapping still opens the viewer with a single item.</li>
        <li><b>No image at all.</b> A placeholder card with a product-glyph icon sits in the media slot. No viewer is reachable; the user can still read the rest of the PDP.</li>
      </ul>

      <Rules items={[
        "<b>One gallery, four media types.</b> Photos, video, 360 view, fitment diagrams — all enter through the same component. Indicators on the thumbnail and main media tell the user what's inside.",
        "<b>Tap to view.</b> Tapping any thumbnail swaps the main media. Tapping the main media opens the full-screen viewer.",
        "<b>The viewer is a lightweight corridor.</b> Shell goes away, ✕ exits immediately. No discard sheet, no confirmation — nothing is being committed.",
        "<b>Indicators are consistent across surfaces.</b> The video ▶ overlay, 360° badge, and Fitment badge use the same glyphs and positions on the thumbnail, the main media on the PDP, and inside the viewer.",
        "<b>Checkout collapses the gallery.</b> A single thumbnail per line, no viewer. The user is committing the order — browsing media belongs to the PDP.",
        "<b>PLP / cart / wishlist follow the same rule.</b> One thumbnail per item; tap navigates to the PDP, which holds the full gallery.",
        "<b>Fitment in the viewer shows the active-car answer.</b> When a fitment diagram is open and the user has an active car in the garage, the viewer surfaces a quiet line: «Fits / Doesn't fit your [car]» using the same ✓ / ✕ glyphs as elsewhere.",
      ]}/>

      <DoDont
        doItem="Show all four media types in a single thumbnail strip, with their indicators. Open the viewer on tap; let the user swipe between items there. In the checkout, collapse to a single thumbnail per line."
        dontItem="Don't open a separate viewer per media type — photos in one viewer, video in another, 360 in a third. The user moves between media types fluidly; the chrome stays the same. Don't show the full gallery in the checkout — it's a commit surface, not a browse surface."
      />
    </Section>
  );
}
window.PGallery = PGallery;
