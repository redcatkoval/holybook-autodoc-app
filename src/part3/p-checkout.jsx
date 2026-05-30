// ---------------------------------------------------------------
// Part III — Checkout (composed flow)
// ---------------------------------------------------------------

const { useState: useCK, useEffect: useCKEffect } = React;

// ─── Block icons ─────────────────────────────────────────────────────────────
// Inline SVG icons used in the Checkout summary rows. Mono ink, 18×18.
const CkIcon = ({ d, extra }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
    {extra}
  </svg>
);
const IconBox = () => <CkIcon d="M3 7.5L12 3l9 4.5M3 7.5l9 4.5m-9-4.5v9l9 4.5m0-9v9m9-13.5l-9 4.5m9-4.5v9l-9 4.5" />;
const IconPin = () => (
  <CkIcon d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z"
    extra={<circle cx="12" cy="9" r="2.5" />} />
);
const IconTruck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/>
    <circle cx="7" cy="18" r="1.6"/>
    <circle cx="17" cy="18" r="1.6"/>
  </svg>
);
const IconTag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12l9-9 8 1 1 8-9 9-9-9z"/>
    <circle cx="14" cy="10" r="1.4" fill="currentColor"/>
  </svg>
);
const IconCard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="13" rx="2"/>
    <path d="M2 10.5h20M6 16h3"/>
  </svg>
);

// ─── Reusable cells inside the Checkout single-screen layout ────────────────

// Mono section label.
function CkLabel({ children }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
      color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.14em",
      padding: "12px 14px 6px",
    }}>{children}</div>
  );
}

// Nav cell — label + selected value + chevron, used for every editable block on
// the single-screen checkout. Tap opens the corresponding sheet or corridor.
function CkRow({ label, value, sub, highlighted = false, last = false, icon }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 14px",
      borderTop: highlighted ? "2px solid var(--accent)" : "none",
      borderBottom: highlighted
        ? "2px solid var(--accent)"
        : (last ? "none" : "1px solid #ececec"),
      gap: 10,
      background: highlighted ? "rgba(255,90,31,0.06)" : "#fff",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
        {icon && (
          <div style={{
            width: 22, height: 22, display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
            fontSize: 14, color: "#111",
          }}>{icon}</div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{label}</div>
          {value && <div style={{ fontSize: 11, color: "#6b6b6b", marginTop: 2 }}>{value}</div>}
          {sub && <div style={{ fontSize: 10, color: "#9a9a9a", marginTop: 2 }}>{sub}</div>}
        </div>
      </div>
      <div style={{ fontSize: 16, color: "#9a9a9a", flexShrink: 0 }}>›</div>
    </div>
  );
}

// Inline toggle row (Safe order, Expert check).
function CkToggle({ label, sub, on = false, value, last = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 14px",
      borderBottom: last ? "none" : "1px solid #ececec",
      gap: 10,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{label}</div>
        {sub && <div style={{ fontSize: 9, color: "#9a9a9a", marginTop: 2 }}>{sub}</div>}
      </div>
      {value && (
        <div style={{ fontSize: 11, color: "#111", fontWeight: 600, marginRight: 8 }}>{value}</div>
      )}
      <div style={{
        width: 32, height: 18, borderRadius: 9,
        background: on ? "#111" : "#d8d8d8",
        position: "relative", flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: 2, left: on ? 16 : 2,
          width: 14, height: 14, borderRadius: "50%", background: "#fff",
        }}/>
      </div>
    </div>
  );
}

// Order total breakdown — final summary right above the sticky Pay.
function CkTotalsBreakdown({
  items = "113.55", delivery = "5.00", discount = "−5.00",
  safeOrder = "2.99", expertCheck, total = "116.54",
}) {
  const row = (label, val, mute = false) => (
    <div style={{
      display: "flex", justifyContent: "space-between",
      padding: "4px 0", fontSize: 12,
      color: mute ? "#6b6b6b" : "#111",
    }}>
      <span>{label}</span>
      <span style={{ fontWeight: mute ? 400 : 500 }}>{val}</span>
    </div>
  );
  return (
    <div style={{ padding: "12px 14px", background: "#fff" }}>
      {row("Items", `€ ${items}`, true)}
      {row("Delivery · Standard", `€ ${delivery}`, true)}
      {row("Discount · YDR65A", `€ ${discount}`, true)}
      {safeOrder && row("Safe order", `€ ${safeOrder}`, true)}
      {expertCheck && row("Expert check", `€ ${expertCheck}`, true)}
      <div style={{ height: 1, background: "#ececec", margin: "6px 0" }}/>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: 14, fontWeight: 700, color: "#111", paddingTop: 2,
      }}>
        <span>Total · incl. VAT</span>
        <span>€ {total}</span>
      </div>
    </div>
  );
}

// Free-delivery progress bar with dynamic message.
function CkFreeDeliveryProgress() {
  return (
    <div style={{
      margin: "10px 14px", padding: "10px 12px",
      border: "1px solid #c8e6c9", background: "#e8f5e9",
      borderRadius: 8,
    }}>
      <div style={{ fontSize: 11, color: "#1b5e20", marginBottom: 6, fontWeight: 500 }}>
        Add € 12.40 more for free delivery
      </div>
      <div style={{ height: 4, background: "#c8e6c9", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: "75%", height: "100%", background: "#2e7d32" }}/>
      </div>
    </div>
  );
}

// ─── Full Checkout screen ───────────────────────────────────────────────────
// Single scrollable screen. `highlight` (optional) — which row to outline in
// accent, for «trigger frames» in Stage 2.
function CkCheckoutScreen({ highlight, scrollTop = 0 }) {
  const hi = (block) => highlight === block;
  return (
    <Phone size="lg">
      <PhoneNavBar title="Checkout" left="none" right="close" />
      <div style={{
        position: "absolute", top: 80, left: 0, right: 0, bottom: 70,
        overflow: "hidden",
      }}>
        <div style={{ transform: `translateY(-${scrollTop}px)` }}>
          <CkFreeDeliveryProgress />
          <div style={{ padding: "0 14px 8px", fontSize: 10, color: "#9a9a9a", lineHeight: 1.45 }}>
            Delivery dates may shift due to payment processing or public holidays.
          </div>

          <CkRow
            icon={<IconBox/>}
            label="Your Products"
            value="5 items · 2 cars"
            highlighted={hi("products")}
          />
          <CkRow
            icon={<IconPin/>}
            label="Your Address"
            value="Lisbon · Rua Garrett 38"
            sub="João Silva · +351 21 000 0000"
            highlighted={hi("address")}
          />
          <CkRow
            icon={<IconTruck/>}
            label="Delivery method"
            value="Home · Standard"
            sub="Delivery on 18.05 · € 5.00"
            highlighted={hi("delivery")}
          />
          <CkRow
            icon={<IconTag/>}
            label="Coupon / Bonus"
            value="YDR65A applied · −€ 5.00"
            highlighted={hi("coupon")}
          />
          <CkRow
            icon={<IconCard/>}
            label="Payment Method"
            value="Visa"
            highlighted={hi("payment")}
          />

          <CkLabel>Optional extras</CkLabel>
          <CkToggle label="Safe order" sub="200-day return, free return shipping" value="€ 2.99" on />
          <CkToggle label="Expert check" sub="Verify fitment before shipping" value="€ 0.00" last />

          <div style={{ height: 12, background: "#f7f6f4" }}/>
          <CkTotalsBreakdown />
        </div>
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "10px 14px 16px", background: "#fff",
        borderTop: "1px solid #ececec",
      }}>
        <div style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
          fontFamily: '-apple-system, "SF Pro Text", sans-serif',
        }}>Pay € 113.55</div>
      </div>
    </Phone>
  );
}

// ─── Full Checkout — tall phone, all content visible at once ────────────────
// Used in Stage 1 to show the whole single-screen checkout in one frame.
function CkCheckoutFullView() {
  return (
    <Phone tall>
      <PhoneNavBar title="Checkout" left="none" right="close" />
      <div style={{ paddingTop: 84, paddingBottom: 16 }}>
        <CkFreeDeliveryProgress />
        <div style={{ padding: "0 14px 8px", fontSize: 10, color: "#9a9a9a", lineHeight: 1.45 }}>
          Delivery dates may shift due to payment processing or public holidays.
        </div>
        <CkRow icon={<IconBox/>} label="Your Products" value="5 items · 2 cars" />
        <CkRow icon={<IconPin/>} label="Your Address" value="Lisbon · Rua Garrett 38" sub="João Silva · +351 21 000 0000" />
        <CkRow icon={<IconTruck/>} label="Delivery method" value="Home · Standard" sub="Delivery on 18.05 · € 5.00" />
        <CkRow icon={<IconTag/>} label="Coupon / Bonus" value="YDR65A applied · −€ 5.00" />
        <CkRow icon={<IconCard/>} label="Payment Method" value="Visa" />
        <CkLabel>Optional extras</CkLabel>
        <CkToggle label="Safe order" sub="200-day return, free return shipping" value="€ 2.99" on />
        <CkToggle label="Expert check" sub="Verify fitment before shipping" value="€ 0.00" last />
        <div style={{ height: 12, background: "#f7f6f4" }}/>
        <CkTotalsBreakdown />
        <div style={{ padding: "10px 14px 16px", background: "#fff", borderTop: "1px solid #ececec" }}>
          <div style={{
            height: 44, background: "#111", color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
            fontFamily: '-apple-system, "SF Pro Text", sans-serif',
          }}>Pay € 113.55</div>
        </div>
      </div>
    </Phone>
  );
}

// ─── Result screens for Stage 2 — sheets and corridors ─────────────────────

// Generic dim + sheet over a parent surface. `parent` lets the caller pick the
// navbar title shown behind the dim — Checkout (default), Shipping Address,
// etc. — so a sheet that rises from inside a deeper screen labels its dimmed
// parent correctly.
function CkOverScreen({ children, parent = "checkout" }) {
  return (
    <Phone size="lg">
      {parent === "shipping"
        ? <PhoneNavBar title="Shipping Address" left="back" right="none" />
        : <PhoneNavBar title="Checkout" left="none" right="close" />}
      <div style={{ paddingTop: 84, opacity: 0.4, pointerEvents: "none" }}>
        {parent === "checkout" ? (
          <>
            <CkFreeDeliveryProgress />
            <CkRow icon={<IconBox/>} label="Your Products" value="5 items · 2 cars" />
            <CkRow icon={<IconPin/>} label="Your Address" value="Lisbon · Rua Garrett 38" />
            <CkRow icon={<IconTruck/>} label="Delivery method" value="Home · Standard" />
          </>
        ) : (
          <div style={{ padding: "10px 14px", fontSize: 11, color: "#6b6b6b" }}>
            Shipping address form behind…
          </div>
        )}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 4 }}/>
      {children}
    </Phone>
  );
}

// Bottom sheet shell with title, optional save-and-continue CTA.
function CkSheet({ title, height = "60%", cta, children }) {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      height, background: "#fff",
      borderRadius: "16px 16px 0 0",
      boxShadow: "0 -8px 24px rgba(0,0,0,0.18)",
      zIndex: 5, display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{ width: 36, height: 4, background: "#d8d8d8", borderRadius: 2, margin: "8px auto 6px" }}/>
      <div style={{
        textAlign: "center", padding: "4px 14px 10px",
        borderBottom: "1px solid #ececec",
        fontSize: 13, fontWeight: 600, color: "#111",
      }}>{title}</div>
      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
      {cta && (
        <div style={{ padding: "10px 14px 14px", borderTop: "1px solid #ececec" }}>
          <div style={{
            height: 44, background: "#111", color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
          }}>{cta}</div>
        </div>
      )}
    </div>
  );
}

// Generic radio row used inside sheets.
function CkRadio({ label, sub, selected = false, last = false, right }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 14px", borderBottom: last ? "none" : "1px solid #ececec",
      gap: 10,
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        border: "1.5px solid " + (selected ? "#111" : "#c8c8c8"),
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111" }}/>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: "#9a9a9a", marginTop: 2 }}>{sub}</div>}
      </div>
      {right && <div style={{ fontSize: 11, fontWeight: 600, color: "#111" }}>{right}</div>}
    </div>
  );
}

// Address card — used inside the Shipping Address corridor. Selected card has
// an ink-outline border. The ⋮ (vertical more) icon in the top-right opens a
// small context menu with Delete and Edit. Shows either a single combined
// «Shipping and Billing address» or two stacked addresses with badges.
function CkAddressCard({ selected, shipping, billing, menuOpen }) {
  const badge = (txt) => (
    <span style={{
      display: "inline-block", padding: "3px 8px", borderRadius: 12,
      background: "#ececec", fontSize: 9, color: "#2a2a2a",
      letterSpacing: "0.04em", marginBottom: 4,
    }}>{txt}</span>
  );
  const addr = (a) => (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{a.name}</div>
      <div style={{ fontSize: 11, color: "#6b6b6b", marginTop: 2, lineHeight: 1.4 }}>
        {a.lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
  return (
    <div style={{
      border: selected ? "2px solid #111" : "1px solid #ececec",
      borderRadius: 10, marginBottom: 12, padding: "12px 14px",
      background: "#fff", position: "relative",
    }}>
      {badge(billing ? "Shipping address" : "Shipping and Billing address")}
      {addr(shipping)}
      {billing && (
        <>
          <div style={{ height: 8 }}/>
          {badge("Billing address")}
          {addr(billing)}
        </>
      )}
      <div style={{
        position: "absolute", top: 8, right: 6,
        width: 30, height: 30, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 18, color: "#6b6b6b", cursor: "pointer", userSelect: "none",
        fontWeight: 700,
      }}>⋮</div>
      {menuOpen && (
        <div style={{
          position: "absolute", top: 36, right: 10,
          background: "#fff", border: "1px solid #ececec", borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          minWidth: 140, zIndex: 10, overflow: "hidden",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 12px", fontSize: 12, color: "#111",
            borderBottom: "1px solid #ececec",
          }}>
            <span>Edit</span>
            <CkIcon d="M3 21l4-1 12-12-3-3-12 12-1 4z"/>
          </div>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 12px", fontSize: 12, color: "#c62828",
          }}>
            <span>Delete</span>
            <CkIcon d="M3 6h18M8 6v-2h8v2M6 6l1 14h10l1-14"/>
          </div>
        </div>
      )}
    </div>
  );
}

// Shipping Address — full corridor (NOT a bottom sheet). List of saved
// addresses as cards (⋮ context menu opens Edit/Delete), plus a dashed
// «Add a New Address» tile at the bottom. Sticky Save and Continue commits
// the chosen card and returns to Checkout.
function CkAddressSheet({ withMenu = true, withDeleteDialog = false, empty = false }) {
  if (empty) {
    return (
      <Phone size="lg">
        <PhoneNavBar title="Shipping Address" left="back" right="none" />
        <div style={{
          position: "absolute", top: 80, left: 0, right: 0, bottom: 80,
          padding: "32px 28px", textAlign: "center", background: "#f7f6f4",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 12,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#9a9a9a", border: "1px solid #ececec",
          }}>
            <IconPin/>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>No saved addresses</div>
          <div style={{ fontSize: 11, color: "#6b6b6b", lineHeight: 1.45, maxWidth: 240 }}>
            Add a delivery address to continue. You can save it for next time.
          </div>
        </div>
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          padding: "10px 14px 16px", background: "#fff",
          borderTop: "1px solid #ececec",
        }}>
          <div style={{
            height: 44, background: "#111", color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600, gap: 8,
            fontFamily: '-apple-system, "SF Pro Text", sans-serif',
          }}>
            <span style={{ fontSize: 16 }}>+</span>
            Add a New Address
          </div>
        </div>
      </Phone>
    );
  }
  return (
    <Phone size="lg">
      <PhoneNavBar title="Shipping Address" left="back" right="none" />
      <div style={{
        position: "absolute", top: 80, left: 0, right: 0, bottom: 80,
        overflow: "auto", padding: "10px 14px",
        background: "#f7f6f4",
        opacity: withDeleteDialog ? 0.55 : 1,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: "#6b6b6b", textTransform: "uppercase",
          letterSpacing: "0.14em", marginBottom: 8,
        }}>Choose shipping address</div>
        <CkAddressCard
          selected
          shipping={{ name: "Miroslav Klose", lines: ["Olympischer Platz 3", "14053 Berlin", "Germany"] }}
          billing={{ name: "Miroslav Klose", lines: ["Street Smth 888", "54022 Berlin", "Germany"] }}
          menuOpen={withMenu && !withDeleteDialog}
        />
        <CkAddressCard
          shipping={{ name: "Miroslav Klose", lines: ["Olympischer Platz 3", "14053 Berlin", "Germany"] }}
        />
        <div style={{
          border: "1.5px dashed #c8c8c8", borderRadius: 10,
          padding: "16px 0", textAlign: "center",
          fontSize: 13, fontWeight: 600, color: "#111",
          background: "#fff", marginBottom: 8,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <span style={{ fontSize: 18, color: "#9a9a9a" }}>+</span>
          Add a New Address
        </div>
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "10px 14px 16px", background: "#fff",
        borderTop: "1px solid #ececec",
        opacity: withDeleteDialog ? 0.55 : 1,
      }}>
        <div style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
          fontFamily: '-apple-system, "SF Pro Text", sans-serif',
        }}>Save and Continue</div>
      </div>
      {withDeleteDialog && (
        <ActionSheet
          prompt="Remove this address?"
          actions={[{ label: "Delete address", destructive: true }]}
          cancel="Cancel"
        />
      )}
    </Phone>
  );
}

// Single form field with floating-style label and optional error.
function CkFormField({ label, value, placeholder, error, prefix, suffix, required }) {
  const errored = !!error;
  return (
    <div style={{
      border: "1px solid " + (errored ? "#c62828" : "#d8d8d8"),
      borderRadius: 8, padding: "8px 12px", marginBottom: 10,
      position: "relative", background: "#fff",
    }}>
      <div style={{
        fontSize: 9, color: errored ? "#c62828" : "#9a9a9a",
        marginBottom: 2, letterSpacing: "0.02em",
      }}>{label}{required && "*"}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {prefix && <span style={{ fontSize: 12, color: "#111" }}>{prefix}</span>}
        <span style={{ fontSize: 13, color: value ? "#111" : "#c8c8c8", flex: 1 }}>
          {value || placeholder || ""}
        </span>
        {errored && <span style={{ color: "#c62828", fontSize: 14 }}>⚠</span>}
        {suffix && <span style={{ fontSize: 12, color: "#9a9a9a" }}>{suffix}</span>}
      </div>
      {errored && (
        <div style={{
          position: "absolute", top: "100%", left: 0,
          fontSize: 10, color: "#c62828", marginTop: 4, paddingLeft: 4,
        }}>{error}</div>
      )}
    </div>
  );
}

// Form section header.
function CkFormSection({ title, children }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #ececec",
      borderRadius: 10, padding: "12px 12px 4px", marginBottom: 14,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

// Switch inside a form section.
function CkFormSwitch({ label, sub, on = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "8px 2px 10px",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: "#9a9a9a", marginTop: 2, lineHeight: 1.4 }}>{sub}</div>}
      </div>
      <div style={{
        width: 32, height: 18, borderRadius: 9,
        background: on ? "#111" : "#d8d8d8",
        position: "relative", flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: 2, left: on ? 16 : 2,
          width: 14, height: 14, borderRadius: "50%", background: "#fff",
        }}/>
      </div>
    </div>
  );
}

// Add-new-address corridor — full form with Personal Info, Shipping, Billing
// sections. Pay-as-company toggle adds VAT + company-name fields. Use-same-as-
// shipping toggle hides / reveals the separate Billing section.
function CkAddAddressCorridor() {
  return (
    <Phone size="lg">
      <PhoneNavBar title="Shipping Address" left="back" right="none" />
      <div style={{
        position: "absolute", top: 80, left: 0, right: 0, bottom: 80,
        overflow: "auto", padding: "10px 14px 14px", background: "#f7f6f4",
      }}>
        <CkFormSection title="Personal Information">
          <CkFormField label="First name" required value="John" />
          <CkFormField label="Last name" required value="Doe" />
          <CkFormField label="Phone Number" required prefix="🇧🇪 +38" value="123 456 78" />
          <CkFormSwitch label="Pay as company" sub="You can not place the order as a company because of non-Autodoc products in your cart." on />
        </CkFormSection>

        <CkFormSection title="Shipping Address">
          <CkFormField label="Country" required value="Belgium" suffix="▾" />
          <CkFormField label="Your company name" required value="12345" />
          <CkFormField label="VAT" required prefix="+38" placeholder="VAT Ex: 1234567890" />
          <CkFormField label="Postcode" required value="asda" error="Postcode is invalid" />
          <CkFormField label="City / Town" required value="Acapulco" />
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 2 }}>
              <CkFormField label="Street address" required value="LalaStreet" />
            </div>
            <div style={{ flex: 1 }}>
              <CkFormField label="House #" required value="124" />
            </div>
          </div>
          <CkFormField label="Address extension" value="Enter via Solomon" />
        </CkFormSection>

        <CkFormSection title="Billing Address">
          <CkFormSwitch label="Use the same as shipping" />
          <CkFormField label="Country" required value="Belgium" suffix="▾" />
          <CkFormField label="Your company name" required value="12345" />
          <CkFormField label="VAT" required prefix="+38" placeholder="VAT Ex: 1234567890" />
          <CkFormField label="Postcode" required value="12345" />
          <CkFormField label="City / Town" required value="Acapulco" />
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 2 }}>
              <CkFormField label="Street address" required value="LalaStreet" />
            </div>
            <div style={{ flex: 1 }}>
              <CkFormField label="House #" required value="124" />
            </div>
          </div>
          <CkFormField label="Address extension" value="Enter via Solomon" />
        </CkFormSection>

        <div style={{ display: "flex", gap: 8, padding: "4px 0 12px", alignItems: "flex-start" }}>
          <div style={{
            width: 16, height: 16, border: "1.5px solid #c8c8c8",
            borderRadius: 3, flexShrink: 0, marginTop: 1,
          }}/>
          <div style={{ fontSize: 10, color: "#6b6b6b", lineHeight: 1.4 }}>
            Yes, I want to receive email newsletters with special promotions. I can unsubscribe at any time.
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "10px 14px 16px", background: "#fff",
        borderTop: "1px solid #ececec",
      }}>
        <div style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
          fontFamily: '-apple-system, "SF Pro Text", sans-serif',
        }}>Save and Continue</div>
      </div>
    </Phone>
  );
}

// Country picker sheet — opens from the Country field inside the address
// form. Search input at the top, list of countries with flag glyphs.
function CkCountrySheet() {
  const item = (flag, name, selected, last) => (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 14px", borderBottom: last ? "none" : "1px solid #ececec",
      background: "#fff",
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        background: flag, border: "1px solid #ececec", flexShrink: 0,
      }}/>
      <div style={{ flex: 1, fontSize: 13, color: "#111" }}>{name}</div>
      {selected && <span style={{ color: "#111", fontSize: 16 }}>✓</span>}
    </div>
  );
  return (
    <CkOverScreen parent="shipping">
      <CkSheet title="Choose country" height="82%">
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", borderBottom: "1px solid #ececec",
        }}>
          <span style={{ color: "var(--accent)", fontSize: 14 }}>⌕</span>
          <span style={{ fontSize: 12, color: "#c8c8c8" }}>Search</span>
        </div>
        <div style={{ overflow: "auto" }}>
          {item("linear-gradient(0deg, #ed2939 50%, #fff 50%)", "Austria")}
          {item("linear-gradient(90deg, #000 33%, #fae042 33% 66%, #ed2939 66%)", "Belgium", true)}
          {item("linear-gradient(0deg, #d62612 33%, #fff 33% 66%, #00966e 66%)", "Bulgaria")}
          {item("linear-gradient(135deg, #fff 50%, #d7141a 50%)", "Czech Republic")}
          {item("#c8102e", "Denmark")}
          {item("linear-gradient(0deg, #fff 33%, #000 33% 66%, #0072ce 66%)", "Estonia")}
          {item("#003580", "Finland")}
          {item("linear-gradient(90deg, #002395 33%, #fff 33% 66%, #ed2939 66%)", "France")}
          {item("linear-gradient(0deg, #ffce00 33%, #dd0000 33% 66%, #000 66%)", "Germany", false, true)}
        </div>
      </CkSheet>
    </CkOverScreen>
  );
}

// Edit-items corridor (after tap on «Your Products»). Essentially a mini-Cart.
function CkEditItemsCorridor() {
  return (
    <Phone size="lg">
      <PhoneNavBar title="Your Products" left="back" right="none" />
      <div style={{ paddingTop: 84 }}>
        <div style={{
          padding: "10px 14px 6px",
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.14em",
        }}>BMW 320d · 12-AB-34</div>
        <QSCartRow qty={2} />
        <QSCartRow qty={1} kind="trash" />
        <div style={{
          padding: "10px 14px 6px",
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.14em",
        }}>Ford Activa Mk4</div>
        <QSCartRow qty={1} kind="trash" />
        <QSCartRow qty={2} />
      </div>
    </Phone>
  );
}

// Delivery method sheet
function CkDeliverySheet() {
  return (
    <CkOverScreen>
      <CkSheet title="Delivery method" height="58%" cta="Save and Continue">
        <div style={{
          padding: "10px 14px 6px",
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.14em",
        }}>Pick-up</div>
        <CkRadio label="Pick-up · Store «Rue Demours #7»" sub="Delivery on 14.11" right="€ 0.00" />
        <div style={{
          padding: "10px 14px 6px",
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.14em",
        }}>Home delivery</div>
        <CkRadio label="Standard" sub="Delivery on 18.05" selected right="€ 5.00" />
        <CkRadio label="Express" sub="Delivery on 13.05" last right="€ 10.00" />
      </CkSheet>
    </CkOverScreen>
  );
}

// Payment method sheet — Deposit is a regular radio option (covers the full
// order from the user's deposit balance; partial cover isn't supported, which
// is why the row carries an explanatory sub-line).
function CkPaymentSheet() {
  return (
    <CkOverScreen>
      <CkSheet title="Payment method" height="62%" cta="Save and Continue">
        <CkRadio label="Visa" selected />
        <CkRadio label="Mastercard" />
        <CkRadio label="PayPal" />
        <CkRadio label="Apple Pay" />
        <CkRadio label="Klarna" />
        <CkRadio label="Deposit" sub="Pay in full from your deposit balance · partial cover not supported" last />
      </CkSheet>
    </CkOverScreen>
  );
}

// Coupon / Bonus sheet — Coupons / Bonuses tabs + radio list + plain input
// for a custom code + one Apply primary at the bottom. When there are no
// available coupons for the user, the radio list disappears and only the
// tabs + manual code input remain.
function CkCouponSheet({ empty = false }) {
  const couponRow = (name, code, sel, last) => (
    <div key={code} style={{
      display: "flex", alignItems: "flex-start", padding: "10px 14px", gap: 10,
      borderBottom: last ? "none" : "1px solid #ececec",
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        border: "1.5px solid " + (sel ? "#111" : "#c8c8c8"),
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: 2,
      }}>
        {sel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111" }}/>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{name}</div>
        <div style={{
          marginTop: 4, padding: "2px 8px", display: "inline-block",
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: "#111", border: "1px dashed #c8c8c8", borderRadius: 4,
          background: "#fff",
        }}>{code}</div>
      </div>
    </div>
  );
  return (
    <CkOverScreen>
      <CkSheet title="Coupon / Bonus" height={empty ? "52%" : "72%"} cta="Apply">
        <div style={{
          display: "flex", padding: "0 14px", borderBottom: "1px solid #ececec",
        }}>
          {["Coupons", "Bonuses"].map((t, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "10px 0", fontSize: 12, fontWeight: 600,
              color: i === 0 ? "#111" : "#9a9a9a",
              borderBottom: i === 0 ? "2px solid #111" : "2px solid transparent",
              marginBottom: -1,
            }}>{t}</div>
          ))}
        </div>
        {!empty && (
          <>
            {couponRow("Free delivery for the first buy", "DELIVERYFREE", false)}
            {couponRow("15% off this order", "YDR65A", true)}
            {couponRow("1 euro daily check-in", "SUMMER25", false, true)}
          </>
        )}
        {empty && (
          <div style={{
            padding: "24px 14px 12px", textAlign: "center",
            fontSize: 11, color: "#6b6b6b", lineHeight: 1.5,
          }}>
            No available coupons for this order. Have a code? Enter it below.
          </div>
        )}
        <div style={{
          margin: "12px 14px", padding: "10px 12px",
          border: "1px solid #d8d8d8", borderRadius: 8,
        }}>
          <div style={{ fontSize: 11, color: "#9a9a9a" }}>Enter coupon code</div>
        </div>
      </CkSheet>
    </CkOverScreen>
  );
}

// ─── Clickable prototype primitives ─────────────────────────────────────────

// Cart screen with a clickable Checkout commit bar. Pinned plate inside the
// curtain (no sheet over sheet). Inline «Order summary» card sits in the cart
// list above the bar.
function CkProtoCart({ onCheckout }) {
  return (
    <Phone size="lg">
      <GarageBase />
      <Curtain position={1} title="Cart" centered showSearch={false}>
        <div style={{ paddingTop: 4 }}>
          <div style={{
            padding: "10px 14px 6px",
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.14em",
          }}>BMW 320d · 12-AB-34</div>
          <QSCartRow qty={2} />
          <QSCartRow qty={1} kind="trash" />
          <QSCartSummary items="113.55" delivery="14.90" deliveryLabel="Standard" discountCode="YDR65A" discount="5.00" total="123.45" />
        </div>
      </Curtain>
      <div className="cart-cta">
        <div className="cart-cta-row">
          <div className="cart-total">
            <span className="cart-total-lbl">Total</span>
            <span className="cart-total-val">€ 123.45</span>
          </div>
          <div className="cart-buy" onClick={onCheckout} style={{ cursor: "pointer", userSelect: "none" }}>Checkout</div>
        </div>
      </div>
      <BottomNav active="cart" cartCount={3}/>
    </Phone>
  );
}

// Sign in or Sign up entry with «Continue as a guest» link.
function CkProtoAuthEntry({ onGuest, onSignIn, onBack }) {
  return (
    <Phone size="lg">
      <PhoneNavBar title="Sign in or Sign up" left="back" right="none" />
      {onBack && <div onClick={onBack} style={{
        position: "absolute", top: 40, left: 0, width: 64, height: 40,
        cursor: "pointer", zIndex: 10,
      }}/>}
      <div style={{ padding: "70px 16px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.2 }}>Sign in or Sign up</div>
        <div style={{ fontSize: 12, color: "#6b6b6b", marginBottom: 16, lineHeight: 1.5 }}>
          Enter your account or create a new one to continue.
        </div>
        <div style={{ marginBottom: 12, padding: "8px 12px 10px", border: "1px solid #d8d8d8", borderRadius: 10 }}>
          <div style={{ fontSize: 10, color: "#9a9a9a", marginBottom: 2 }}>Email</div>
          <div style={{ fontSize: 13, color: "#c8c8c8" }}>your@email.com</div>
        </div>
        <div style={{ marginBottom: 0, padding: "8px 12px 10px", border: "1px solid #d8d8d8", borderRadius: 10 }}>
          <div style={{ fontSize: 10, color: "#9a9a9a", marginBottom: 2 }}>Password</div>
          <div style={{ fontSize: 13, color: "#c8c8c8" }}>••••••••</div>
        </div>
        <div style={{ textAlign: "right", margin: "-2px 0 12px" }}>
          <span style={{ fontSize: 12, color: "#6b6b6b", fontWeight: 500 }}>Forgot password?</span>
        </div>
        <div onClick={onSignIn} style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, cursor: "pointer", userSelect: "none", marginTop: 4,
        }}>Continue</div>
        <div style={{ textAlign: "center", margin: "12px 0", fontSize: 11, color: "#9a9a9a" }}>or</div>
        <div style={{
          height: 44, color: "#111", borderRadius: 10, border: "1.5px solid #111", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
        }}>Continue with Google</div>
        <div onClick={onGuest} style={{
          textAlign: "center", fontSize: 12, fontWeight: 600, color: "#111",
          padding: "20px 0 10px", cursor: "pointer", userSelect: "none",
        }}>Continue as a guest</div>
      </div>
    </Phone>
  );
}

// Clickable Checkout single-screen. Tall phone (content-driven height) so the
// reader scrolls the doc page to see the whole screen. `state` carries the
// current selections; `on*` callbacks navigate to edit surfaces and to Pay.
function CkProtoCheckout({ state, onBlock, onPay }) {
  const click = (block) => () => onBlock(block);
  const ready = state.address && state.delivery && state.payment;
  return (
    <Phone size="lg">
      <PhoneNavBar title="Checkout" left="none" right="close" />
      <div style={{
        position: "absolute", top: 80, left: 0, right: 0, bottom: 80,
        overflow: "auto", paddingBottom: 16,
      }}>
        <CkFreeDeliveryProgress />
        <div style={{ padding: "0 14px 8px", fontSize: 10, color: "#9a9a9a", lineHeight: 1.45 }}>
          Delivery dates may shift due to payment processing or public holidays.
        </div>
        <div onClick={click("items")} style={{ cursor: "pointer" }}>
          <CkRow icon={<IconBox/>} label="Your Products" value="3 items · 1 car" />
        </div>
        <div onClick={click("address")} style={{ cursor: "pointer" }}>
          <CkRow icon={<IconPin/>} label="Your Address" value={state.address || "Add a delivery address"} sub={state.address ? "João Silva · +351 21 000 0000" : "Required to continue"} />
        </div>
        <div onClick={click("delivery")} style={{ cursor: "pointer" }}>
          <CkRow icon={<IconTruck/>} label="Delivery method" value={state.delivery || "Pick a method"} sub={state.delivery ? "Delivery on 18.05 · € 5.00" : "Required to continue"} />
        </div>
        <div onClick={click("coupon")} style={{ cursor: "pointer" }}>
          <CkRow icon={<IconTag/>} label="Coupon / Bonus" value={state.coupon || "Apply coupon"} />
        </div>
        <div onClick={click("payment")} style={{ cursor: "pointer" }}>
          <CkRow icon={<IconCard/>} label="Payment Method" value={state.payment || "Pick a method"} sub={state.payment ? "" : "Required to continue"} />
        </div>
        <CkLabel>Optional extras</CkLabel>
        <CkToggle label="Safe order" sub="200-day return, free return shipping" value="€ 2.99" on />
        <CkToggle label="Expert check" sub="Verify fitment before shipping" value="€ 0.00" last />
        <div style={{ height: 12, background: "#f7f6f4" }}/>
        <CkTotalsBreakdown />
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "10px 14px 16px", background: "#fff",
        borderTop: "1px solid #ececec",
      }}>
        <div
          onClick={ready ? onPay : undefined}
          style={{
            height: 44,
            background: ready ? "#111" : "#9a9a9a",
            color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
            fontFamily: '-apple-system, "SF Pro Text", sans-serif',
            cursor: ready ? "pointer" : "default",
            userSelect: "none",
            transition: "background 0.18s ease, color 0.18s ease",
          }}>Pay € 113.55</div>
      </div>
    </Phone>
  );
}

// Address picker — full corridor (not a sheet). Cards with ⋮ context menu
// (Edit / Delete). No radio buttons; ink outline marks the selected card.
function CkProtoAddressSheet({ onSelect, onAddNew, onClose }) {
  const [selected, setSelected] = useCK(0);
  const [menuFor, setMenuFor] = useCK(null);
  const card = (idx, opts) => (
    <div style={{ position: "relative" }}>
      <div onClick={() => { setSelected(idx); setMenuFor(null); }} style={{ cursor: "pointer" }}>
        <CkAddressCard selected={selected === idx} menuOpen={menuFor === idx} {...opts}/>
      </div>
      <div
        onClick={(e) => { e.stopPropagation(); setMenuFor(menuFor === idx ? null : idx); }}
        style={{
          position: "absolute", top: 8, right: 6,
          width: 30, height: 30, cursor: "pointer", zIndex: 12,
        }}
      />
    </div>
  );
  return (
    <Phone size="lg">
      <PhoneNavBar title="Shipping Address" left="back" right="none" />
      <div onClick={onClose} style={{
        position: "absolute", top: 40, left: 0, width: 64, height: 40,
        cursor: "pointer", zIndex: 10,
      }}/>
      <div style={{
        position: "absolute", top: 80, left: 0, right: 0, bottom: 80,
        overflow: "auto", padding: "10px 14px", background: "#f7f6f4",
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: "#6b6b6b", textTransform: "uppercase",
          letterSpacing: "0.14em", marginBottom: 8,
        }}>Choose shipping address</div>
        {card(0, {
          shipping: { name: "Miroslav Klose", lines: ["Olympischer Platz 3", "14053 Berlin", "Germany"] },
          billing: { name: "Miroslav Klose", lines: ["Street Smth 888", "54022 Berlin", "Germany"] },
        })}
        {card(1, {
          shipping: { name: "Miroslav Klose", lines: ["Olympischer Platz 3", "14053 Berlin", "Germany"] },
        })}
        <div onClick={onAddNew} style={{
          border: "1.5px dashed #c8c8c8", borderRadius: 10,
          padding: "16px 0", textAlign: "center",
          fontSize: 13, fontWeight: 600, color: "#111",
          background: "#fff", marginBottom: 8,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          cursor: "pointer", userSelect: "none",
        }}>
          <span style={{ fontSize: 18, color: "#9a9a9a" }}>+</span>
          Add a New Address
        </div>
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "10px 14px 16px", background: "#fff",
        borderTop: "1px solid #ececec",
      }}>
        <div
          onClick={() => onSelect("Berlin · Olympischer Platz 3")}
          style={{
            height: 44, background: "#111", color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600, cursor: "pointer", userSelect: "none",
            fontFamily: '-apple-system, "SF Pro Text", sans-serif',
          }}>Save and Continue</div>
      </div>
    </Phone>
  );
}

// Delivery method sheet. Picking Pick-up expands a list of nearby pickup
// stores in place — user selects the specific point. Picking Home Standard /
// Home Express commits and dismisses.
function CkProtoDeliverySheet({ onSelect, onClose }) {
  const [pickupOpen, setPickupOpen] = useCK(false);
  const homeOpt = (label, sub, price) => (
    <div onClick={() => onSelect(label)} style={{ cursor: "pointer" }}>
      <CkRadio label={label} sub={sub} right={price} />
    </div>
  );
  const pickupOpt = (name, addr) => (
    <div onClick={() => onSelect("Pick-up · " + name)} style={{
      cursor: "pointer", padding: "10px 32px", borderBottom: "1px solid #ececec",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <div style={{
        width: 14, height: 14, borderRadius: "50%",
        border: "1.5px solid #c8c8c8", flexShrink: 0,
      }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{name}</div>
        <div style={{ fontSize: 10, color: "#9a9a9a", marginTop: 2 }}>{addr}</div>
      </div>
    </div>
  );
  return (
    <Phone size="lg">
      <PhoneNavBar title="Checkout" left="none" right="close" />
      <div style={{ paddingTop: 84, opacity: 0.4, pointerEvents: "none" }}>
        <CkFreeDeliveryProgress />
        <CkRow icon={<IconBox/>} label="Your Products" value="3 items · 1 car" />
      </div>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 4 }}/>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "72%",
        background: "#fff", borderRadius: "16px 16px 0 0",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.18)", zIndex: 5,
        display: "flex", flexDirection: "column",
        fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      }}>
        <div style={{ width: 36, height: 4, background: "#d8d8d8", borderRadius: 2, margin: "8px auto 6px" }}/>
        <div style={{
          textAlign: "center", padding: "4px 14px 10px",
          borderBottom: "1px solid #ececec", fontSize: 13, fontWeight: 600, color: "#111",
        }}>Delivery method</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <div onClick={() => setPickupOpen(!pickupOpen)} style={{ cursor: "pointer" }}>
            <CkRadio label="Pick-up at a store" sub="Choose a nearby pick-up point" selected={pickupOpen} right="€ 0.00" />
          </div>
          {pickupOpen && (
            <div style={{ background: "#f7f6f4", padding: "4px 0" }}>
              {pickupOpt("Store «Rue Demours #7»", "Lisbon · 0.8 km · open until 20:00")}
              {pickupOpt("Store «Garrett 12»", "Lisbon · 1.4 km · open until 22:00")}
              {pickupOpt("Store «Aliados 88»", "Porto · 280 km · open until 19:00")}
            </div>
          )}
          {homeOpt("Home · Standard", "Delivery on 18.05", "€ 5.00")}
          {homeOpt("Home · Express", "Delivery on 13.05", "€ 10.00")}
        </div>
      </div>
    </Phone>
  );
}

// Payment sheet — Deposit is a regular radio option alongside the others.
function CkProtoPaymentSheet({ onSelect, onClose }) {
  const opt = (label, sub) => (
    <div onClick={() => onSelect(label)} style={{ cursor: "pointer" }}>
      <CkRadio label={label} sub={sub} />
    </div>
  );
  return (
    <Phone size="lg">
      <PhoneNavBar title="Checkout" left="none" right="close" />
      <div style={{ paddingTop: 84, opacity: 0.4, pointerEvents: "none" }}>
        <CkFreeDeliveryProgress />
        <CkRow icon={<IconBox/>} label="Your Products" value="3 items · 1 car" />
      </div>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 4 }}/>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "74%",
        background: "#fff", borderRadius: "16px 16px 0 0",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.18)", zIndex: 5,
        display: "flex", flexDirection: "column",
        fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      }}>
        <div style={{ width: 36, height: 4, background: "#d8d8d8", borderRadius: 2, margin: "8px auto 6px" }}/>
        <div style={{
          textAlign: "center", padding: "4px 14px 10px",
          borderBottom: "1px solid #ececec", fontSize: 13, fontWeight: 600, color: "#111",
        }}>Payment method</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          {opt("Visa")}
          {opt("Mastercard")}
          {opt("PayPal")}
          {opt("Apple Pay")}
          {opt("Klarna")}
          {opt("Deposit", "Pay in full from your deposit balance · partial cover not supported")}
        </div>
      </div>
    </Phone>
  );
}

// Coupon sheet — Coupons / Bonuses tabs, radio list, manual code input,
// and a single Apply primary at the bottom. Typing in the input deselects any
// radio coupon — only one source of truth at a time.
function CkProtoCouponSheet({ onSelect, onClose }) {
  const [tab, setTab] = useCK("coupons");
  const [code, setCode] = useCK("");
  const [picked, setPicked] = useCK(null); // string code from the radio list
  const typing = code.length > 0;
  // typing deselects radio; selecting radio clears input
  const pickRadio = (c) => () => { setPicked(c); setCode(""); };
  const apply = () => {
    const chosen = typing ? code.toUpperCase() : picked;
    if (!chosen) return;
    onSelect(chosen + " · −€ 5.00");
  };

  const couponRow = (name, c) => {
    const active = picked === c && !typing;
    return (
      <div key={c} onClick={pickRadio(c)} style={{
        cursor: "pointer", padding: "10px 14px",
        display: "flex", alignItems: "flex-start", gap: 10,
        borderBottom: "1px solid #ececec",
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          border: "1.5px solid " + (active ? "#111" : "#c8c8c8"),
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 2,
        }}>
          {active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111" }}/>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{name}</div>
          <div style={{
            marginTop: 4, padding: "2px 8px", display: "inline-block",
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            color: "#111", border: "1px dashed #c8c8c8", borderRadius: 4,
          }}>{c}</div>
        </div>
      </div>
    );
  };

  const bonusRow = (label, value) => (
    <div key={label} onClick={pickRadio(label)} style={{
      cursor: "pointer", padding: "10px 14px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid #ececec",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          border: "1.5px solid " + (picked === label && !typing ? "#111" : "#c8c8c8"),
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {picked === label && !typing && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111" }}/>}
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{label}</div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>{value}</div>
    </div>
  );

  return (
    <Phone size="lg">
      <PhoneNavBar title="Checkout" left="none" right="close" />
      <div style={{ paddingTop: 84, opacity: 0.4, pointerEvents: "none" }}>
        <CkFreeDeliveryProgress />
        <CkRow icon={<IconBox/>} label="Your Products" value="3 items · 1 car" />
      </div>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 4 }}/>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "72%",
        background: "#fff", borderRadius: "16px 16px 0 0",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.18)", zIndex: 5,
        display: "flex", flexDirection: "column",
        fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      }}>
        <div style={{ width: 36, height: 4, background: "#d8d8d8", borderRadius: 2, margin: "8px auto 6px" }}/>
        <div style={{
          textAlign: "center", padding: "4px 14px 10px",
          borderBottom: "1px solid #ececec", fontSize: 13, fontWeight: 600, color: "#111",
        }}>Coupon / Bonus</div>
        <div style={{
          display: "flex", padding: "0 14px", borderBottom: "1px solid #ececec",
        }}>
          {[["coupons", "Coupons"], ["bonuses", "Bonuses"]].map(([id, label]) => (
            <div key={id} onClick={() => { setTab(id); setPicked(null); }} style={{
              flex: 1, textAlign: "center", padding: "10px 0", cursor: "pointer",
              fontSize: 12, fontWeight: 600,
              color: tab === id ? "#111" : "#9a9a9a",
              borderBottom: tab === id ? "2px solid #111" : "2px solid transparent",
              marginBottom: -1, userSelect: "none",
            }}>{label}</div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: "auto", opacity: typing ? 0.4 : 1 }}>
          {tab === "coupons" ? (
            <>
              {couponRow("Free delivery for the first buy", "DELIVERYFREE")}
              {couponRow("15% off this order", "YDR65A")}
              {couponRow("1 euro daily check-in", "SUMMER25")}
            </>
          ) : (
            <>
              {bonusRow("Loyalty points", "120 pt · −€ 1.20")}
              {bonusRow("Birthday bonus", "−€ 3.00")}
              {bonusRow("Referral credit", "−€ 5.00")}
            </>
          )}
        </div>
        <div style={{
          padding: "10px 14px", borderTop: "1px solid #ececec",
        }}>
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); if (e.target.value) setPicked(null); }}
            placeholder="Enter coupon code"
            style={{
              width: "100%", height: 40, border: "1px solid #d8d8d8", borderRadius: 8,
              padding: "0 12px", fontSize: 12, color: "#111", outline: "none",
              fontFamily: '-apple-system, "SF Pro Text", sans-serif',
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ padding: "0 14px 14px" }}>
          <div onClick={apply} style={{
            height: 44, color: "#fff", borderRadius: 10,
            background: typing || picked ? "#111" : "#d8d8d8",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
            cursor: typing || picked ? "pointer" : "default", userSelect: "none",
          }}>Apply</div>
        </div>
      </div>
    </Phone>
  );
}

// Add-new-address corridor (clickable Save).
function CkProtoAddAddress({ onSave, onBack }) {
  return (
    <Phone size="lg">
      <PhoneNavBar title="Add address" left="back" right="none" />
      {onBack && <div onClick={onBack} style={{
        position: "absolute", top: 40, left: 0, width: 64, height: 40,
        cursor: "pointer", zIndex: 10,
      }}/>}
      <div style={{ paddingTop: 84, paddingBottom: 80 }}>
        {[
          ["Full name", "João Silva"],
          ["Country", "Portugal"],
          ["Street", "Rua Garrett 38"],
          ["City", "Lisbon"],
          ["Postal code", "1200-203"],
          ["Phone", "+351 21 000 0000"],
        ].map(([l, v], i, arr) => (
          <div key={l} style={{
            padding: "10px 14px 12px",
            borderBottom: i === arr.length - 1 ? "none" : "1px solid #ececec",
          }}>
            <div style={{ fontSize: 9, color: "#9a9a9a", marginBottom: 4 }}>{l}</div>
            <div style={{ fontSize: 12, color: "#111" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "10px 14px 16px", background: "#fff", borderTop: "1px solid #ececec",
      }}>
        <div onClick={onSave} style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, cursor: "pointer", userSelect: "none",
          fontFamily: '-apple-system, "SF Pro Text", sans-serif',
        }}>Save address</div>
      </div>
    </Phone>
  );
}

// Payment-processing screen.
function CkProtoPaying() {
  return (
    <Phone size="lg">
      <div style={{
        position: "absolute", inset: 0, background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 14,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          border: "3px solid #ececec", borderTopColor: "#111",
          animation: "ckspin 0.8s linear infinite",
        }}/>
        <div style={{ fontSize: 13, color: "#6b6b6b" }}>Processing your payment…</div>
        <style>{`@keyframes ckspin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Phone>
  );
}

// Block wrappers reused across the Thank-you screen.
function CkTYBlock({ title, sub, children }) {
  return (
    <div style={{
      margin: "0 14px 12px", padding: "12px 14px",
      background: "#fff", border: "1px solid #ececec", borderRadius: 10,
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: sub ? 4 : 8 }}>{title}</div>}
      {sub && <div style={{ fontSize: 11, color: "#6b6b6b", marginBottom: 8, lineHeight: 1.45 }}>{sub}</div>}
      {children}
    </div>
  );
}

// Thank-you screen with order info + after-sale doors + Restart button.
function CkProtoThankYou({ onRestart, asGuest, payment = "card" }) {
  const inkBtn = (label) => (
    <div style={{
      height: 44, background: "#111", color: "#fff", borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 600, marginTop: 4,
    }}>{label}</div>
  );
  return (
    <Phone size="lg">
      <PhoneNavBar title="Thank you" left="none" right="none" />
      <div style={{
        position: "absolute", top: 80, left: 0, right: 0, bottom: 0,
        overflow: "auto", paddingBottom: 24, background: "#f7f6f4",
      }}>
        {/* Order accepted */}
        <CkTYBlock>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 8 }}>
            Order №24-002145 is accepted.
          </div>
          <div style={{ fontSize: 11, color: "#6b6b6b", lineHeight: 1.55 }}>
            <div><b style={{color: "#111"}}>Total price:</b> € 113.55</div>
            <div style={{ marginTop: 6 }}><b style={{color: "#111"}}>Delivery info:</b></div>
            <div>Lisbon, Rua Garrett 38, 1200-203, Portugal</div>
          </div>
        </CkTYBlock>

        {/* Guest upsell — earn voucher for creating an account */}
        {asGuest && (
          <CkTYBlock>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "var(--accent-soft)", color: "var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 14, fontWeight: 700,
              }}>€</div>
              <div style={{ fontSize: 11, color: "#2a2a2a", lineHeight: 1.5 }}>
                You will earn <b>€ 1.85</b> with this purchase if you create an account in 7 days.
              </div>
            </div>
            {inkBtn("Create an Account")}
          </CkTYBlock>
        )}

        {/* Items in your order */}
        <CkTYBlock title="Items in your order">
          <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: 52, height: 52, background: "#ececec", borderRadius: 6,
              }}/>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#9a9a9a", marginTop: 10, lineHeight: 1.5 }}>
            As soon as the delivery date and courier are assigned, we'll send you email.
            Details will be sent to: <span style={{ color: "#111" }}>example@autodoc.com</span><br/>
            Track your order status: <span style={{
              color: "var(--accent)", textDecoration: "underline",
              textDecorationStyle: "dotted", textUnderlineOffset: 3,
            }}>My orders</span>
          </div>
        </CkTYBlock>

        {/* Push notifications */}
        <CkTYBlock title="Receive instant updates on your order"
          sub="Track delivery progress and never miss a status change.">
          {inkBtn("Activate push notifications")}
        </CkTYBlock>

        {/* Plus expert check */}
        <CkTYBlock>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2e7d32", marginBottom: 4 }}>
                AUTODOC PLUS+
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>Expert Check</div>
              <div style={{ fontSize: 10, color: "#6b6b6b", marginTop: 4, lineHeight: 1.4 }}>
                Provide your vehicle's VIN code and our experts will check compatibility.
              </div>
            </div>
            <div style={{ fontSize: 22, color: "#111" }}>+</div>
          </div>
        </CkTYBlock>

        {/* Newsletter — guest-only equivalent of «Create account» motivation */}
        {asGuest && (
          <CkTYBlock title="Join AUTODOC"
            sub="Sign up to view your order history and unlock extra benefits.">
            <div style={{
              border: "1px solid #d8d8d8", borderRadius: 8,
              padding: "8px 12px", fontSize: 9, color: "#9a9a9a", marginBottom: 8,
            }}>
              <div>E-mail</div>
              <div style={{ fontSize: 12, color: "#c8c8c8", marginTop: 2 }}>Mail@gmail.com</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{
                width: 16, height: 16, border: "1.5px solid #c8c8c8",
                borderRadius: 3, flexShrink: 0, marginTop: 1,
              }}/>
              <div style={{ fontSize: 10, color: "#6b6b6b", lineHeight: 1.4 }}>
                Yes, I want to receive email newsletters with special promotions. I can unsubscribe at any time.
              </div>
            </div>
            <div style={{
              height: 44, background: "#d8d8d8", color: "#fff", borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 600,
            }}>Subscribe</div>
          </CkTYBlock>
        )}

        {/* Bank details — conditional, only when payment is direct transfer */}
        {payment === "bank" && (
          <CkTYBlock title="Bank details"
            sub="Your order will be shipped once payment is transferred to our bank account.">
            <div style={{ fontSize: 10, color: "#6b6b6b" }}>
              <div style={{ paddingBottom: 6, borderBottom: "1px solid #ececec" }}>
                <div style={{ color: "#9a9a9a" }}>Inhaber</div>
                <div style={{ color: "#111", fontWeight: 500, marginTop: 2 }}>Autodoc GmbH</div>
              </div>
              <div style={{ padding: "6px 0", borderBottom: "1px solid #ececec" }}>
                <div style={{ color: "#9a9a9a" }}>IBAN</div>
                <div style={{
                  color: "#111", fontWeight: 500, marginTop: 2,
                  display: "flex", justifyContent: "space-between",
                }}>
                  <span>DE68 1002 0890 0025 6872 48</span>
                  <span style={{ color: "var(--accent)" }}>⎘</span>
                </div>
              </div>
              <div style={{ padding: "6px 0" }}>
                <div style={{ color: "#9a9a9a" }}>BIC / SWIFT</div>
                <div style={{
                  color: "#111", fontWeight: 500, marginTop: 2,
                  display: "flex", justifyContent: "space-between",
                }}>
                  <span>HYVEDEMM488</span>
                  <span style={{ color: "var(--accent)" }}>⎘</span>
                </div>
              </div>
            </div>
            {inkBtn("Place Order")}
          </CkTYBlock>
        )}

        {/* Download invoice */}
        <CkTYBlock>
          <CkRow icon={<CkIcon d="M12 4v12m-5-5l5 5 5-5M5 20h14"/>} label="Download invoice" />
        </CkTYBlock>

        {/* Invite & Earn */}
        <CkTYBlock title="Invite & Earn"
          sub="Send a friend a € 3 voucher and earn € 5.">
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            border: "1px solid #d8d8d8", borderRadius: 8, padding: "8px 12px",
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#111", letterSpacing: "0.02em" }}>
              ABCD-1234
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ color: "#6b6b6b", fontSize: 14 }}>⎘</span>
              <span style={{ color: "#6b6b6b", fontSize: 14 }}>↗</span>
            </div>
          </div>
        </CkTYBlock>

        {/* Help others to choose — per-item review */}
        <CkTYBlock title="Help others to choose"
          sub="Describe why you chose this product.">
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
          }}>
            <div style={{
              width: 36, height: 36, background: "#ececec", borderRadius: 6, flexShrink: 0,
            }}/>
            <div>
              <div style={{ fontSize: 10, color: "#9a9a9a" }}>Item № C3W010ABE</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#111" }}>BREMBO Brake Disc</div>
            </div>
          </div>
          <div style={{
            border: "1px solid #d8d8d8", borderRadius: 8,
            padding: "8px 12px", fontSize: 9, color: "#9a9a9a", marginBottom: 8,
          }}>
            <div>Your comment</div>
            <div style={{ fontSize: 12, color: "#c8c8c8", marginTop: 2 }}>Placeholder</div>
          </div>
          <div style={{
            height: 44, background: "#d8d8d8", color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
          }}>Submit</div>
        </CkTYBlock>

        {/* Rate the app */}
        <CkTYBlock>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6 }}>
            {[0,1,2,3,4].map(i => (
              <span key={i} style={{ color: "var(--accent)", fontSize: 22 }}>★</span>
            ))}
          </div>
          <div style={{
            textAlign: "center", fontSize: 12, fontWeight: 600, color: "#111", marginBottom: 8,
          }}>Your opinion is important to us!</div>
          {inkBtn("Rate the APP")}
        </CkTYBlock>

        <div style={{ padding: "0 14px 8px" }}>
          <div onClick={onRestart} style={{
            height: 44, color: "#111", border: "1px solid #111", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600, cursor: "pointer", userSelect: "none",
          }}>↺ Restart prototype</div>
        </div>
      </div>
    </Phone>
  );
}

// ─── State machines ────────────────────────────────────────────────────────

// Auto-loop animation through the full Guest journey.
function CheckoutGuestProto() {
  const [stage, setStage] = useCK("cart");
  const [state, setState] = useCK({ address: "", delivery: "", coupon: "", payment: "" });
  const noop = () => {};

  // Auto-advance through every stage; loop back to cart at the end.
  useCKEffect(() => {
    const cycle = {
      "cart": { next: "auth", t: 1500, after: null },
      "auth": { next: "checkout", t: 1500, after: null },
      "checkout": {
        next: state.address ? (state.delivery ? (state.payment ? "paying" : "edit-payment") : "edit-delivery") : "edit-address",
        t: 1300, after: null,
      },
      "edit-address": { next: "checkout", t: 1400, after: () => setState(s => ({ ...s, address: "Lisbon · Rua Garrett 38" })) },
      "edit-delivery": { next: "checkout", t: 1300, after: () => setState(s => ({ ...s, delivery: "Standard" })) },
      "edit-payment": { next: "checkout", t: 1500, after: () => setState(s => ({ ...s, payment: "Visa" })) },
      "paying": { next: "thankyou", t: 1400, after: null },
      "thankyou": { next: "cart", t: 1800, after: () => setState({ address: "", delivery: "", coupon: "", payment: "" }) },
    };
    const step = cycle[stage];
    if (!step) return;
    const t = setTimeout(() => {
      if (step.after) step.after();
      setStage(step.next);
    }, step.t);
    return () => clearTimeout(t);
  }, [stage, state]);

  if (stage === "cart") {
    return <CkProtoCart onCheckout={noop} />;
  }
  if (stage === "auth") {
    return <CkProtoAuthEntry onGuest={noop} onSignIn={noop} onBack={noop} />;
  }
  if (stage === "checkout") {
    return <CkProtoCheckout state={state} onBlock={noop} onPay={noop} />;
  }
  if (stage === "edit-address") {
    return <CkProtoAddressSheet onSelect={noop} onAddNew={noop} onClose={noop} />;
  }
  if (stage === "edit-delivery") {
    return <CkProtoDeliverySheet onSelect={noop} onClose={noop} />;
  }
  if (stage === "edit-payment") {
    return <CkProtoPaymentSheet onSelect={noop} onClose={noop} />;
  }
  if (stage === "paying") {
    return <CkProtoPaying />;
  }
  if (stage === "thankyou") {
    return <CkProtoThankYou onRestart={noop} asGuest />;
  }
  return null;
}

// Auto-loop animation through the Signed-in journey: cart → checkout
// (prefilled defaults) → paying → thankyou → cart.
function CheckoutSignedInProto() {
  const [stage, setStage] = useCK("cart");
  const state = {
    address: "Lisbon · Rua Garrett 38",
    delivery: "Home · Standard",
    coupon: "",
    payment: "Visa",
  };
  const noop = () => {};

  useCKEffect(() => {
    const cycle = {
      "cart": { next: "checkout", t: 1500 },
      "checkout": { next: "paying", t: 2200 },
      "paying": { next: "thankyou", t: 1400 },
      "thankyou": { next: "cart", t: 1800 },
    };
    const step = cycle[stage];
    if (!step) return;
    const t = setTimeout(() => setStage(step.next), step.t);
    return () => clearTimeout(t);
  }, [stage]);

  if (stage === "cart") {
    return <CkProtoCart onCheckout={noop} />;
  }
  if (stage === "checkout") {
    return <CkProtoCheckout state={state} onBlock={noop} onPay={noop} />;
  }
  if (stage === "paying") {
    return <CkProtoPaying />;
  }
  if (stage === "thankyou") {
    return <CkProtoThankYou onRestart={noop} />;
  }
  return null;
}

// ─── The flow ───────────────────────────────────────────────────────────────
function PCheckout() {
  return (
    <Section id="p-checkout">
      <FlowHead
        title="Checkout"
        journey={["Cart", "Checkout", "Pay", "Thank you"]}
        userTypes={["Guest", "Signed-in"]}
        lede={<>The flow that turns a Cart into a placed order. <b>Single-screen Checkout</b> with edit-in-place on every block — taps on Address, Delivery, Payment, Coupon or Items open a sheet (or a corridor) without leaving the page. Two user paths share the same Checkout surface: a signed-in user goes from Cart straight to Checkout, a Guest passes through Sign in or Sign up first.</>}
      />

      <FlowCallout>
        Checkout used to be two steps — «Shipping Address» then «Review and Payment». We're collapsing it into <b>one screen</b>. Every block is a summary row with a chevron; tapping the row opens the right surface to edit. Order total sits directly above the Pay button, so the user sees the final number where they commit. Items can come from <b>multiple cars</b> in the same order — the Cart and Edit-items corridor both group rows by car.
      </FlowCallout>

      {/* ───── Stage 1 ───────────────────────────────────────────────────── */}
      <FlowStage num={1} title="The screen"
        subtitle="One screen carries all of Checkout. Free-delivery progress at the top, five editable blocks in the middle, two optional toggles below them, the order total, and the sticky Pay primary at the bottom. Shown here as a single tall view so the whole flow is visible without scrolling." />

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>The full Checkout screen.</b> One tall view: free-delivery progress, five editable rows (Products, Address, Delivery, Coupon, Payment), two optional toggles, order-total breakdown, sticky Pay.">
          <CkCheckoutFullView />
        </FrameCell>
        <FrameCell caption="<b>Dismiss → Cart with Undo snackbar.</b> Tap ✕ — user lands on Cart, snackbar offers Undo. Tap Undo within the window and Checkout re-opens with every filled field still in place; let it auto-dismiss and the partial state is dropped.">
          <Phone size="lg">
            <CkProtoCart />
            <div style={{
              position: "absolute", left: 14, right: 14, bottom: 180,
              background: "#111", color: "#fff", borderRadius: 14,
              padding: "12px 16px", fontSize: 12, zIndex: 20,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            }}>
              <span>Checkout cancelled.</span>
              <span className="mono" style={{ fontSize: 11, opacity: 0.95, fontWeight: 600 }}>Undo</span>
            </div>
          </Phone>
        </FrameCell>
      </div>

      <p style={{ marginTop: 16 }}><b>Why ✕, not ‹.</b> Checkout is a commit corridor — the user came here to place an order, not to browse. ‹ reads «one step back»; leaving Checkout doesn't go back, it <i>abandons</i> the commit. ✕ reads «dismiss this task», the honest verb. Other commit corridors (Pay-now sheets, Place-order confirmations) inherit the same exception.</p>

      {/* ───── Stage 2 ───────────────────────────────────────────────────── */}
      <FlowStage num={2} title="Block-by-block — edit interactions"
        subtitle="Each editable block opens a different surface. Most edits are quick selections — a sheet. Two are heavier — a corridor. The pattern stays the same: the user never leaves the flow; they pick, confirm, return." />

      <FlowBlock
        num={1}
        title="Your Products"
        summary="Tap the row → corridor opens with a mini-Cart view, items grouped by car. Change quantities or remove items; Back returns to Checkout with updated totals."
      >
        <div className="frames-row" style={{ flexWrap: "nowrap" }}>
          <FrameCell caption="<b>Trigger — Your Products row highlighted.</b> Item count and how many cars they're for. Tap opens the editing corridor.">
            <CkCheckoutScreen highlight="products" />
          </FrameCell>
          <FrameCell caption="<b>Result — Edit-items corridor.</b> Mirrors the Cart layout: items grouped by car, each with its own stepper and trash variant at qty=1.">
            <CkEditItemsCorridor />
          </FrameCell>
        </div>
      </FlowBlock>

      <FlowBlock
        num={2}
        title="Your Address"
        summary="Tap the row → corridor with saved addresses as cards. Pick one, tap Save and Continue. First-time users land on an empty state with a single CTA to add the first address."
      >
        <div className="frames-row" style={{ flexWrap: "nowrap" }}>
          <FrameCell caption="<b>Trigger — Your Address row highlighted.</b> Shows the selected address and the recipient.">
            <CkCheckoutScreen highlight="address" />
          </FrameCell>
          <FrameCell caption="<b>Result — Shipping Address corridor.</b> Cards with combined shipping + billing labels; ink-outline marks the chosen one. ⋮ on each card opens Edit / Delete. Sticky Save and Continue at the bottom.">
            <CkAddressSheet />
          </FrameCell>
          <FrameCell caption="<b>Empty state — no saved addresses.</b> Nothing to pick from; the card list and Save-and-Continue primary disappear. A single CTA, «+ Add a New Address», takes the user into the address-form corridor.">
            <CkAddressSheet empty />
          </FrameCell>
        </div>
      </FlowBlock>

      <FlowBlock
        num={3}
        title="Delivery method"
        summary="Tap the row → bottom sheet with Pick-up and Home Delivery options, each with Standard / Express variants. Single selection; Save and Continue commits."
      >
        <div className="frames-row" style={{ flexWrap: "nowrap" }}>
          <FrameCell caption="<b>Trigger — Delivery method row highlighted.</b> Shows the active selection and the delivery date.">
            <CkCheckoutScreen highlight="delivery" />
          </FrameCell>
          <FrameCell caption="<b>Result — Delivery method sheet.</b> Pick-up at the top, Home delivery below; Standard / Express with dates and prices on the right.">
            <CkDeliverySheet />
          </FrameCell>
        </div>
      </FlowBlock>

      <FlowBlock
        num={4}
        title="Coupon / Bonus"
        summary="Tap the row → bottom sheet with two tabs (Coupons / Bonuses) and a radio list of available codes, plus an Enter Coupon Code field at the bottom. Apply commits the choice and updates the order total."
      >
        <div className="frames-row" style={{ flexWrap: "nowrap" }}>
          <FrameCell caption="<b>Trigger — Coupon row highlighted.</b> Shows the applied code and the discount amount.">
            <CkCheckoutScreen highlight="coupon" />
          </FrameCell>
          <FrameCell caption="<b>Result — Coupon sheet.</b> Coupons / Bonuses tabs, available codes as a radio list, a plain input for a custom code, one Apply primary. Radio and input are mutually exclusive — one source of truth.">
            <CkCouponSheet />
          </FrameCell>
          <FrameCell caption="<b>Empty state — no available coupons.</b> Radio list disappears; tabs + explainer + manual input remain. Apply lights up only after the user types a value.">
            <CkCouponSheet empty />
          </FrameCell>
        </div>
      </FlowBlock>

      <FlowBlock
        num={5}
        title="Payment method"
        summary="Tap the row → bottom sheet with the available payment methods. Pure method selection — pick one and Save and Continue commits."
      >
        <div className="frames-row" style={{ flexWrap: "nowrap" }}>
          <FrameCell caption="<b>Trigger — Payment method row highlighted.</b> Shows the active method.">
            <CkCheckoutScreen highlight="payment" />
          </FrameCell>
          <FrameCell caption="<b>Result — Payment sheet.</b> Radio list of available providers (Visa, Mastercard, PayPal, Apple Pay, Klarna, Deposit). Single selection, Save and Continue commits.">
            <CkPaymentSheet />
          </FrameCell>
        </div>
      </FlowBlock>

      <FlowStage num={3} title="Two journeys, one Checkout"
        subtitle="Same Checkout surface for both paths. The Guest path passes through Sign in / Sign up first and lands on Checkout with empty blocks; the Signed-in path goes straight from Cart to Checkout with Address, Delivery and Payment pre-filled from saved defaults. Pay is enabled the moment Address, Delivery and Payment are picked." />

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Guest journey.</b> Cart → Sign in / Sign up → Checkout (empty) → edit Address → edit Delivery → edit Payment → Pay → Thank you. Loops to show the full journey.">
          <CheckoutGuestProto />
        </FrameCell>
        <FrameCell caption="<b>Signed-in journey.</b> Cart → Checkout (defaults pre-filled, Pay enabled on arrival) → Pay → Thank you. Loops to show the full journey.">
          <CheckoutSignedInProto />
        </FrameCell>
      </div>

      <FlowStage num={4} title="Pattern dependencies"
        subtitle="What this flow stands on. Every block on Checkout reuses an existing Part II pattern; the flow doesn't invent surfaces — it composes them." />

      <FlowPatternList items={[
        ["Modal Views", "p-modal", "Address, Delivery, Payment, Coupon sheets"],
        ["Quantity Stepper", "p-stepper", "Cart rows, Edit items corridor"],
        ["Authentication", "p-auth", "Sign in / Sign up entry, Create account, Guest exit"],
        ["Add a Car", "p-addcar", "Address-entry corridor follows the same shape"],
        ["Snackbars", "p-snackbars", "Coupon applied, payment errors, success"],
        ["Dialogs, Alerts & Action Sheets", "p-dialogs", "Delete-item confirmation, session warnings"],
        ["Infoblocks", "p-infoblocks", "Order disclaimer, warning about Autodoc-only products"],
        ["The Corridor", "fullscreen", "Add-address corridor, Edit-items corridor, Auth corridor"],
      ]}/>

    </Section>
  );
}
window.PCheckout = PCheckout;
