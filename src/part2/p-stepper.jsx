// ---------------------------------------------------------------
// P — Quantity Stepper
// ---------------------------------------------------------------

const { useState: useQP, useEffect: useQPEffect, useRef: useQPRef } = React;

// ─── Auto-loop animation 1: PDP add-to-cart → stepper swap ───
// idle → tap Add → stepper qty=1 + snackbar → qty=2 silently → idle (loop)
function QSPDPCommitProto() {
  const [phase, setPhase] = useQP("idle"); // idle → added → stepped
  const timer = useQPRef(null);
  useQPEffect(() => {
    const cycle = { idle: 1800, added: 2200, stepped: 1800 };
    const next = { idle: "added", added: "stepped", stepped: "idle" };
    timer.current = setTimeout(() => setPhase(next[phase]), cycle[phase]);
    return () => clearTimeout(timer.current);
  }, [phase]);
  const added = phase === "added" || phase === "stepped";
  const qty = phase === "stepped" ? 2 : 1;
  const minusDisabled = qty === 1;
  const snack = phase === "added";
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <QSPDPBody />
      {snack && <QSSnackbar text="Item added to cart." />}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "12px 16px 22px", background: "#fff",
        borderTop: "1px solid #ececec",
      }}>
        {!added ? (
          <div style={{
            height: 50, background: "#111", color: "#fff", borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 600,
            fontFamily: '-apple-system, "SF Pro Text", sans-serif',
          }}>Add to Cart</div>
        ) : (
          <div style={{
            height: 50, border: "1.5px solid #111", borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#fff",
            fontFamily: '-apple-system, "SF Pro Text", sans-serif',
          }}>
            <div style={{
              width: 56, height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 20, color: minusDisabled ? "#c8c8c8" : "#111",
              opacity: minusDisabled ? 0.5 : 1,
            }}>−</div>
            <div style={{
              flex: 1, textAlign: "center",
              fontSize: 17, fontWeight: 700, color: "#111",
            }}>{qty}</div>
            <div style={{
              width: 56, height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 20, color: "#111",
            }}>+</div>
          </div>
        )}
      </div>
    </Phone>
  );
}

// ─── Auto-loop animation 2: Cart delete flow ───
// idle (3 rows, target row qty=1 with trash) → confirm dialog rises →
// row removed + snackbar with Undo → idle (loop).
function QSCartDeleteProto() {
  const [phase, setPhase] = useQP("idle");
  const timer = useQPRef(null);
  useQPEffect(() => {
    const cycle = { idle: 2000, sheet: 1800, removed: 2200 };
    const next = { idle: "sheet", sheet: "removed", removed: "idle" };
    timer.current = setTimeout(() => setPhase(next[phase]), cycle[phase]);
    return () => clearTimeout(timer.current);
  }, [phase]);
  const rows = phase === "removed"
    ? [{ id: 1, qty: 5 }, { id: 3, qty: 3 }]
    : [{ id: 1, qty: 5 }, { id: 2, qty: 1 }, { id: 3, qty: 3 }];
  return (
    <Phone>
      <GarageBase />
      <Curtain position={1} title="Cart" centered showSearch={false}>
        <div style={{ paddingTop: 4 }}>
          {rows.map((r) => (
            <div key={r.id} style={{
              padding: "12px 14px", borderBottom: "1px solid #ececec",
              display: "flex", gap: 10, alignItems: "center",
            }}>
              <div style={{ width: 44, height: 44, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                <div className="skel-row" style={{ width: "70%", height: 8, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
                <div className="skel-row" style={{ width: "45%", height: 7, margin: 0 }}/>
                <div className="skel-row" style={{ width: "30%", height: 9, margin: 0, background: "#b8b8b8" }}/>
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center",
                border: "1px solid #d8d8d8", borderRadius: 8, height: 32,
              }}>
                <div style={{
                  width: 32, textAlign: "center", fontSize: 14, color: "#111",
                }}>{r.qty === 1 ? "🗑" : "−"}</div>
                <div style={{
                  minWidth: 28, padding: "0 4px",
                  textAlign: "center", fontSize: 13, fontWeight: 600, color: "#111",
                  borderLeft: "1px solid #ececec", borderRight: "1px solid #ececec",
                  height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                }}>{r.qty}</div>
                <div style={{
                  width: 32, textAlign: "center", fontSize: 14, color: "#111",
                }}>+</div>
              </div>
            </div>
          ))}
        </div>
      </Curtain>
      <QSCartTotalBar />
      <BottomNav active="cart" cartBadge cartCount={3}/>

      {phase === "sheet" && (
        <DialogModal
          title="Remove from cart?"
          subtitle="The item leaves your cart immediately. A snackbar with Undo gives you a few seconds to bring it back."
          primary="Remove"
          secondary="Cancel"
          destructive
          split
        />
      )}

      {phase === "removed" && (
        <div style={{
          position: "absolute", left: 12, right: 12, bottom: 170,
          background: "#111", color: "#fff", borderRadius: 8,
          padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 11, zIndex: 5, boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}>
          <span>Item removed.</span>
          <span style={{ fontWeight: 600 }}>Undo</span>
        </div>
      )}
    </Phone>
  );
}

// Generic stepper widget: minus / number / plus.
// `kind` is one of: "default" (− N +), "trash" (cart, qty=1), "disabled" (checkout / sheet, qty=1).
// `max` disables plus at the stock limit.
// `focused` adds a small caret next to the number to indicate keyboard input — no other visual change.
function QStepper({ qty = 2, kind = "default", max = false, focused = false }) {
  const minusContent =
    kind === "trash" ? "🗑" :
    "−";
  const minusDisabled = kind === "disabled";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center",
      border: "1px solid #d8d8d8", borderRadius: 8, height: 32,
    }}>
      <div style={{
        width: 32, textAlign: "center", fontSize: 14,
        color: minusDisabled ? "#d8d8d8" : "#111",
        opacity: minusDisabled ? 0.5 : 1,
      }}>{minusContent}</div>
      <div style={{
        minWidth: 36, padding: "0 4px",
        textAlign: "center", fontSize: 13, fontWeight: 600, color: "#111",
        borderLeft: "1px solid #ececec",
        borderRight: "1px solid #ececec",
        height: 32, display: "flex", alignItems: "center", justifyContent: "center",
        gap: 1,
      }}>
        <span>{qty}</span>
        {focused && <span style={{ color: "#111", fontWeight: 400 }}>|</span>}
      </div>
      <div style={{
        width: 32, textAlign: "center", fontSize: 14,
        color: max ? "#d8d8d8" : "#111",
        opacity: max ? 0.5 : 1,
      }}>+</div>
    </div>
  );
}

// Car-group header inside Cart — items belonging to one of the user's cars are
// stacked under their car's name. When the order spans multiple cars, the Cart
// shows several of these section headers in sequence.
function QSCarGroupHeader({ name = "", plate = "" }) {
  return (
    <div style={{
      padding: "10px 14px 6px",
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <span style={{
        width: 14, height: 10, background: "#111",
        clipPath: "polygon(0% 60%, 12% 0%, 88% 0%, 100% 60%, 100% 100%, 0% 100%)",
      }}/>
      {name ? (
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.14em",
        }}>{name}{plate ? ` · ${plate}` : ""}</span>
      ) : (
        <div className="skel-row" style={{ width: 110, height: 7, margin: 0 }}/>
      )}
    </div>
  );
}

// Collapsed coupon row in Cart — single tappable line «Apply coupon →». The full
// coupon picker (tabs + radio list + code field) lives in a sheet that rises on
// tap. Reuses the same control the Checkout flow shows in its Coupon sheet.
function QSCouponRow({ applied }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 14px", borderTop: "1px solid #ececec", borderBottom: "1px solid #ececec",
      gap: 10, background: "#fff",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
        <div style={{
          width: 22, height: 22, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 14, color: "#111", flexShrink: 0,
        }}>◎</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>
            {applied ? "Coupon applied" : "Apply coupon or bonus"}
          </div>
          {applied && (
            <div style={{ fontSize: 11, color: "#6b6b6b", marginTop: 2 }}>{applied}</div>
          )}
        </div>
      </div>
      <div style={{ fontSize: 16, color: "#9a9a9a", flexShrink: 0 }}>›</div>
    </div>
  );
}

// Cart-style row: image, title+meta, price, stepper aligned right.
// `hint` renders as a small line under the stepper area (e.g. "Only 5 left").
function QSCartRow({ qty = 2, kind = "default", max = false, showOverflow = false, hint }) {
  return (
    <div style={{
      padding: "12px 14px", borderBottom: "1px solid #ececec",
    }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 44, height: 44, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
          <div className="skel-row" style={{ width: "70%", height: 8, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
          <div className="skel-row" style={{ width: "45%", height: 7, margin: 0 }}/>
          <div className="skel-row" style={{ width: "30%", height: 9, margin: 0, background: "#b8b8b8" }}/>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {showOverflow && (
              <div style={{
                width: 24, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: "#9a9a9a",
              }}>⋮</div>
            )}
            <QStepper qty={qty} kind={kind} max={max} />
          </div>
          {hint && (
            <div style={{ fontSize: 9, color: "#9a9a9a", whiteSpace: "nowrap" }}>{hint}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Cart commit bar — flat plate pinned to the top edge of the bottom tab bar,
// inside the curtain. NOT a sheet: no drag handle, no top corner radius, no
// shadow. Price breakdown lives inline above the bar in the cart list, not
// in a popout. Canon: «No sheet over sheet» — the curtain itself is a sheet,
// so its commit affordance is a pinned bar, not a second sheet stacked on it.
function QSCartTotalBar({ total = "123.45", label = "Checkout" }) {
  return (
    <div className="cart-cta">
      <div className="cart-cta-row">
        <div className="cart-total">
          <span className="cart-total-lbl">Total</span>
          <span className="cart-total-val">€ {total}</span>
        </div>
        <div className="cart-buy">{label}</div>
      </div>
    </div>
  );
}

// Inline price breakdown card — lives in the cart list above the commit bar.
// Replaces the old drag-to-expand sheet behaviour.
function QSCartSummary({ total = "123.45" }) {
  return (
    <div className="cart-summary">
      <div className="skel-row" style={{ width: "40%", height: 10, margin: "0 0 10px", background: "#b8b8b8", opacity: 0.85 }}/>
      {[0, 1, 2].map(i => (
        <div key={i} className="cart-summary-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="skel-row" style={{ width: ["50%", "60%", "55%"][i], height: 8, margin: 0 }}/>
          <div className="skel-row" style={{ width: 36, height: 8, margin: 0 }}/>
        </div>
      ))}
      <div className="cart-summary-total"><span>Total</span><span>€ {total}</span></div>
    </div>
  );
}

// Sticky bottom area used in PDP. `withKeyboard` pushes it above the rising keyboard.
function QSStickyBottom({ children, withKeyboard = false }) {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0,
      bottom: withKeyboard ? 142 : 0,
      padding: "12px 16px 22px", background: "#fff",
      borderTop: "1px solid #ececec",
    }}>
      {children}
    </div>
  );
}

// Row-style product card on a PLP — image on the left, info + action on the right.
function QSPLPRow({ action }) {
  return (
    <div style={{
      border: "1px solid #ececec", borderRadius: 10, padding: 12,
      display: "flex", gap: 12, background: "#fff",
    }}>
      <div style={{ width: 84, height: 100, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
        <div className="skel-row" style={{ width: "85%", height: 9, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
        <div className="skel-row" style={{ width: "55%", height: 7, margin: 0 }}/>
        <div className="skel-row" style={{ width: "70%", height: 7, margin: 0 }}/>
        <div className="skel-row" style={{ width: "35%", height: 11, margin: "4px 0 0", background: "#b8b8b8" }}/>
        <div style={{ marginTop: 6 }}>{action}</div>
      </div>
    </div>
  );
}

// Mini card (used in widgets, recommendations, related items).
function QSMiniCard({ action }) {
  return (
    <div style={{
      width: 120, border: "1px solid #ececec", borderRadius: 10, padding: 8,
      display: "flex", flexDirection: "column", gap: 5,
      background: "#fff", flexShrink: 0,
    }}>
      <div style={{ height: 70, background: "#ececec", borderRadius: 6 }}/>
      <div className="skel-row" style={{ width: "75%", height: 7, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
      <div className="skel-row" style={{ width: "45%", height: 10, margin: "2px 0 0", background: "#b8b8b8" }}/>
      <div style={{ marginTop: 2 }}>{action}</div>
    </div>
  );
}

// Standard Add-to-cart button (full-width inside card).
function QSAddBtn() {
  return (
    <div style={{
      height: 32, background: "#111", color: "#fff", borderRadius: 6,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 600,
    }}>Add to Cart</div>
  );
}

// Compact Add-to-cart for mini card.
function QSMiniAddBtn() {
  return (
    <div style={{
      height: 26, background: "#111", color: "#fff", borderRadius: 5,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 600,
    }}>Add</div>
  );
}

// Compact inline stepper for after-add state on cards.
// At qty=1, the left button becomes a trash icon (same rule as cart row).
function QSCardStepper({ qty = 2, compact = false }) {
  const h = compact ? 26 : 32;
  const leftContent = qty === 1 ? "🗑" : "−";
  return (
    <div style={{
      display: "flex", alignItems: "center",
      border: "1px solid #d8d8d8", borderRadius: compact ? 5 : 6, height: h,
    }}>
      <div style={{
        flex: 1, textAlign: "center", fontSize: compact ? 12 : 14, color: "#111",
      }}>{leftContent}</div>
      <div style={{
        minWidth: 24, padding: "0 4px",
        textAlign: "center", fontSize: compact ? 11 : 13, fontWeight: 600, color: "#111",
        borderLeft: "1px solid #ececec", borderRight: "1px solid #ececec",
        height: h, display: "flex", alignItems: "center", justifyContent: "center",
      }}>{qty}</div>
      <div style={{
        flex: 1, textAlign: "center", fontSize: compact ? 12 : 14, color: "#111",
      }}>+</div>
    </div>
  );
}

// Compact numeric keyboard stub.
function QSNumericKeyboard() {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "⌫"],
  ];
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      background: "#d3d6da", padding: "8px 4px 12px",
      borderTop: "1px solid #b8bbc0", zIndex: 6,
    }}>
      {keys.map((row, ri) => (
        <div key={ri} style={{ display: "flex", margin: "3px 0" }}>
          {row.map((k, ki) => (
            <div key={ki} style={{
              flex: 1, height: 30, margin: "0 3px",
              background: k ? "#fff" : "transparent",
              borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: "#111", fontWeight: 500,
            }}>{k}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// PDP add-to-cart button variants: default, success, failed.
function QSPDPAddBtn({ price = 46.20, state = "default" }) {
  const labels = {
    default: `Add to Cart`,
    success: "✓ Added",
    failed: "Couldn't add",
  };
  return (
    <div style={{
      height: 50, background: "#111", color: "#fff", borderRadius: 14,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 15, fontWeight: 600,
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>{labels[state]}</div>
  );
}

// PDP stepper that takes the full primary-button slot — minus, number, plus across
// the whole width. Used after Add to Cart has been tapped and the button has swapped
// into the stepper.
function QSPDPFullStepper({ qty = 1, max = false, focused = false }) {
  const minusDisabled = qty === 1;
  return (
    <div style={{
      height: 50, border: "1.5px solid #111", borderRadius: 14,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      background: "#fff",
    }}>
      <div style={{
        width: 56, height: "100%", display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 20, color: minusDisabled ? "#c8c8c8" : "#111",
        opacity: minusDisabled ? 0.5 : 1,
      }}>−</div>
      <div style={{
        flex: 1, textAlign: "center", fontSize: 17, fontWeight: 700, color: "#111",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 2,
      }}>
        <span>{qty}</span>
        {focused && <span style={{ color: "#111", fontWeight: 400 }}>|</span>}
      </div>
      <div style={{
        width: 56, height: "100%", display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 20, color: max ? "#c8c8c8" : "#111",
        opacity: max ? 0.5 : 1,
      }}>+</div>
    </div>
  );
}

// Snackbar at the bottom of the parent screen.
// `bottom` lets callers raise the snackbar above floating elements (e.g. Cart's
// Total + Checkout sheet) so it never sits behind the primary commit affordance.
function QSSnackbar({ text, action, bottom = 80 }) {
  return (
    <div style={{
      position: "absolute", left: 14, right: 14, bottom,
      background: "#111", color: "#fff", borderRadius: 14,
      padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
      fontSize: 13, zIndex: 5,
    }}>
      <span>{text}</span>
      {action && <span className="mono" style={{ fontSize: 11, opacity: 0.85 }}>{action}</span>}
    </div>
  );
}

// PDP body — image, title, description, price. Shared across PDP frames.
function QSPDPBody() {
  return (
    <div style={{ padding: "84px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ height: 180, background: "#ececec", borderRadius: 10 }}/>
      <div className="skel-row" style={{ width: "75%", height: 14, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
      <div className="skel-row" style={{ width: "92%", height: 8, margin: 0 }}/>
      <div className="skel-row" style={{ width: "70%", height: 8, margin: 0 }}/>
      <div className="skel-row" style={{ width: "30%", height: 14, margin: "4px 0 0", background: "#b8b8b8" }}/>
    </div>
  );
}

function PStepper() {
  return (
    <Section id="p-stepper">
      <PatternHead title="Quantity Stepper"
        lede={<>The <span className="hl">quantity stepper</span> is one small control with three behaviours at the lower boundary — picked by where it sits. The shape stays the same — minus, number, plus. On PLP the main cards swap their Add button for an inline stepper after the first tap; mini cards shown alongside them carry Add only. On PDP the bottom Add to Cart primary swaps for a full-width stepper on first tap. Cart and Checkout rows host the stepper directly on each row — Cart deletes through the trash variant; Checkout disables the minus at 1 (deletion is a separate, confirmed action to protect the session).</>} />


      <H3>PLP</H3>
      <p>The catalogue list shows two flavours of card on the same screen: <b>full PLP rows</b> with an <b>Add to Cart</b> button, and a <b>Recommended carousel</b> of mini cards with a smaller Add. Full PLP cards swap Add for an inline stepper on first tap; mini cards never swap. Both flavours raise the same snackbar «Item added to cart» on the first add.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Idle.</b> Full PLP rows with Add to Cart, Recommended carousel below with mini Add buttons.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "84px 14px 0", display: "flex", flexDirection: "column", gap: 10 }}>
              <QSPLPRow action={<QSAddBtn />} />
              <QSPLPRow action={<QSAddBtn />} />
              <div style={{ marginTop: 4 }}>
                <div className="skel-row" style={{ width: "45%", height: 10, margin: "0 0 8px", background: "#b8b8b8", opacity: 0.85 }}/>
                <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
                  <QSMiniCard action={<QSMiniAddBtn />} />
                  <QSMiniCard action={<QSMiniAddBtn />} />
                  <QSMiniCard action={<QSMiniAddBtn />} />
                </div>
              </div>
            </div>
            <BottomNav active="catalog"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>After tap — card swap + snackbar.</b> The tapped PLP card swaps to a stepper at qty=1; mini cards stay as Add. Snackbar acknowledges «Item added to cart» (first add only).">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "84px 14px 0", display: "flex", flexDirection: "column", gap: 10 }}>
              <QSPLPRow action={<QSCardStepper qty={1} />} />
              <QSPLPRow action={<QSAddBtn />} />
              <div style={{ marginTop: 4 }}>
                <div className="skel-row" style={{ width: "45%", height: 10, margin: "0 0 8px", background: "#b8b8b8", opacity: 0.85 }}/>
                <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
                  <QSMiniCard action={<QSMiniAddBtn />} />
                  <QSMiniCard action={<QSMiniAddBtn />} />
                  <QSMiniCard action={<QSMiniAddBtn />} />
                </div>
              </div>
            </div>
            <BottomNav active="catalog"/>
            <QSSnackbar text="Item added to cart." />
          </Phone>
        </FrameCell>
      </div>

      <H3>PDP</H3>
      <p>The product detail page carries a single primary at the bottom: <b>Add to Cart</b>. First tap commits one unit and the button itself becomes the stepper — same slot, same shape. The PDP hides the tab bar; it is the entry to the linear purchase corridor (PDP → Cart → Checkout → Pay).</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Idle — Add to Cart.</b> Primary button full-width at the bottom, no stepper yet.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <QSPDPBody />
            <QSStickyBottom>
              <QSPDPAddBtn state="default" />
            </QSStickyBottom>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Just tapped — stepper.</b> The button has swapped to a full-width stepper at qty=1. Snackbar acknowledges «Item added to cart» (first add only).">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <QSPDPBody />
            <QSStickyBottom>
              <QSPDPFullStepper qty={1} />
            </QSStickyBottom>
            <QSSnackbar text="Item added to cart." />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Direct entry — tap the number.</b> The numeric keyboard rises; the sticky bottom lifts above it. Done commits; tap-outside dismisses without committing. Empty reverts to 1; over-stock clamps to max.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <QSPDPBody />
            <QSStickyBottom withKeyboard>
              <QSPDPFullStepper qty={12} focused />
            </QSStickyBottom>
            <QSNumericKeyboard />
          </Phone>
        </FrameCell>
      </div>

      <H3>Cart row</H3>
      <p>Cart is where editing happens. The stepper is inline on each row; at qty=1 the minus turns into a trash icon. Tapping the trash raises a centred confirm dialog «Remove from cart?» — only confirmation removes the row, with a snackbar offering Undo. At stock limit the plus is disabled. The Cart carries a pinned commit bar (Total + Checkout) inside the Curtain — a flat plate, not a sheet (no sheet over sheet). Price breakdown is an inline «Order summary» card in the list, not a popout.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Cart rows + summary + commit bar.</b> First row at qty=2, second at qty=1 (trash), third at stock limit (plus disabled). Order summary inline above the bar; Total + Checkout pinned at the bottom.">
          <Phone>
            <GarageBase />
            <Curtain position={1} title="Cart" centered showSearch={false}>
              <div style={{ paddingTop: 4 }}>
                <QSCartRow qty={2} />
                <QSCartRow qty={1} kind="trash" />
                <QSCartRow qty={5} max />
                <QSCartSummary />
              </div>
            </Curtain>
            <QSCartTotalBar />
            <BottomNav active="cart" cartBadge cartCount={3}/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Stock-limit feedback.</b> Tap on the disabled plus surfaces a non-blocking snackbar «Only 5 left in stock» above the commit bar. The quantity stays put.">
          <Phone>
            <GarageBase />
            <Curtain position={1} title="Cart" centered showSearch={false}>
              <div style={{ paddingTop: 4 }}>
                <QSCartRow qty={2} />
                <QSCartRow qty={1} kind="trash" />
                <QSCartRow qty={5} max />
                <QSCartSummary />
              </div>
            </Curtain>
            <QSCartTotalBar />
            <QSSnackbar text="Only 5 left in stock." bottom={148} />
            <BottomNav active="cart" cartBadge cartCount={3}/>
          </Phone>
        </FrameCell>
      </div>

      <H3>Checkout row</H3>
      <p>Checkout is where the cost of a wrong delete is the whole session (address, recipient, delivery, payment). The pattern protects it: at qty=1 the minus is just <b>disabled</b>, not a trash icon. Deletion happens through a separate affordance — the row's overflow ⋮ — and raises a confirmation dialog. The Edit-items corridor mirrors the Cart layout with items grouped by car.</p>

      <FrameRow>
        <FrameCell caption="<b>Edit-items corridor.</b> A fullscreen corridor that mirrors the Cart layout: items grouped by car, each with its own stepper and trash variant at qty=1. Back returns to Checkout.">
          <Phone>
            <div style={{
              position: "absolute", inset: 0, background: "#fff",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                padding: "44px 14px 12px", borderBottom: "1px solid #ececec",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ fontSize: 18, color: "#111", width: 28 }}>‹</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Your Products</div>
                <div style={{ width: 28 }}/>
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <QSCarGroupHeader />
                <QSCartRow qty={2} />
                <QSCartRow qty={1} kind="trash" />
                <QSCarGroupHeader />
                <QSCartRow qty={1} kind="trash" />
                <QSCartRow qty={2} />
              </div>
            </div>
          </Phone>
        </FrameCell>
      </FrameRow>

      <H3>Failure and delete feedback</H3>
      <p>Three feedback events round out the success flow shown in PDP above.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Failure.</b> Server didn't accept the add. Non-blocking snackbar with a quiet Retry — the user can tap to try again or ignore. The stepper keeps the selection.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <QSPDPBody />
            <QSSnackbar text="Couldn't add to cart." action="Retry" />
            <QSStickyBottom>
              <QSPDPFullStepper qty={2} />
            </QSStickyBottom>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Delete — confirmation.</b> Trash tap raises a centred system alert «Remove from cart?» with a destructive Remove and Cancel. Tap-outside acts as Cancel. <i>A confirm dialog, not an action sheet — the Cart curtain is already a sheet; raising another sheet on top would violate the no-sheet-over-sheet rule.</i>">
          <Phone>
            <GarageBase />
            <Curtain position={1} title="Cart" centered showSearch={false}>
              <div style={{ paddingTop: 4 }}>
                <QSCartRow qty={2} />
                <QSCartRow qty={1} kind="trash" />
                <QSCartRow qty={3} />
              </div>
            </Curtain>
            <QSCartTotalBar />
            <BottomNav active="cart" cartBadge cartCount={3}/>
            <DialogModal
              title="Remove from cart?"
              subtitle="The item leaves your cart immediately. A snackbar with Undo gives you a few seconds to bring it back."
              primary="Remove"
              secondary="Cancel"
              destructive
              split
            />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Cart delete — Undo.</b> The row is gone; a snackbar invites a reversal for a few seconds before the delete commits.">
          <Phone>
            <GarageBase />
            <Curtain position={1} title="Cart" centered showSearch={false}>
              <div style={{ paddingTop: 4 }}>
                <QSCartRow qty={2} />
                <QSCartRow qty={3} />
              </div>
            </Curtain>
            <QSCartTotalBar />
            <BottomNav active="cart" cartBadge cartCount={3}/>
            <QSSnackbar text="Item removed." action="Undo" bottom={170} />
          </Phone>
        </FrameCell>
      </div>

      <H3>Two flows in motion</H3>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>PDP add and adjust.</b> Add to Cart swaps into a full-width stepper at qty=1, snackbar acknowledges «Item added to cart» (only the first time), plus increments silently. Loops to show the full cycle.">
          <QSPDPCommitProto />
        </FrameCell>
        <FrameCell caption="<b>Cart delete flow.</b> Row at qty=1 with trash → confirm dialog «Remove from cart?» → row disappears, snackbar with Undo. Loops to show the full cycle.">
          <QSCartDeleteProto />
        </FrameCell>
      </div>

      <Rules items={[
        "<b>One control, four surfaces.</b> Same visual minus / number / plus on PLP, PDP, Cart, Checkout. What changes is the boundary at qty=1: trash on Cart, disabled on PDP and Checkout (with a separate Delete affordance), disabled on PLP after first add.",
        "<b>PDP: Add to Cart becomes the stepper.</b> First tap commits one unit and the button itself swaps into a full-width stepper in the same slot. The PDP hides the tab bar — it is the entry to the linear purchase corridor.",
        "<b>First-add snackbar only.</b> «Item added to cart» appears once — when an Add swaps into a stepper. Subsequent plus / minus taps update the cart silently; the cart-tab badge tracks the running total.",
        "<b>Cart delete: trash → confirm dialog → snackbar with Undo.</b> At qty=1 the minus visually becomes a trash. Tap raises a centred «Remove from cart?» dialog (not an action sheet — the Cart curtain is already a sheet); confirmation removes the row; snackbar offers Undo within a short reversible window.",
        "<b>Checkout delete: disabled minus + separate confirmed action.</b> The minus at qty=1 greys out; deletion happens through the row's overflow ⋮ and raises a confirmation dialog. The cost of a wrong delete in Checkout is the whole session, so the path is deliberately longer than in Cart.",
        "<b>Stock limit: plus disabled, snackbar explains.</b> Tap on the disabled plus surfaces «Only N left in stock». No inline hint on the row — the snackbar is the feedback channel. Same rule everywhere the stepper appears.",
        "<b>Number is a tap target.</b> Tap opens the numeric keyboard, Done commits, tap-outside dismisses. Empty reverts to 1 (zero is a delete, only reachable through the dedicated delete path). Input above stock auto-clamps to the maximum.",
        "<b>Cart commit bar is a pinned plate, not a sheet.</b> Total + Checkout sit at the top edge of the tab bar, inside the Curtain — no drag handle, no rounded top, no shadow. Price breakdown is an inline «Order summary» card at the end of the list. <b>No sheet over sheet.</b>",
        "<b>Snackbars never sit behind the commit.</b> When a snackbar appears over Cart, it floats above the Total + Checkout bar — never beneath it.",
      ]}/>

      <DoDont
        doItem="Use the same stepper visual on every surface; let the context decide what minimum-1 means. On PDP, let the Add to Cart button itself swap into the stepper — same slot, no extra row. On Checkout, keep the minus at qty=1 just disabled and put deletion behind its own affordance plus a dialog."
        dontItem="Don't show an «Item quantity» row on PDP next to the Add to Cart button — the button is the stepper. Don't allow delete-through-minus in checkout — losing the session is worse than a disabled button. Don't put an inline stepper on a mini card; mini cards never swap. Don't let snackbars overlap the Cart's Checkout sheet — they sit above it."
      />
    </Section>
  );
}
window.PStepper = PStepper;
