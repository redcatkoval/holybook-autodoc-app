
// Pattern primitives — building blocks for Part II (Pattern Library).
// All inline-styled to stay decoupled from template.html. Designed to be
// composed inside the existing <Phone> shell from phone-primitives.jsx.

const { useState: usePat } = React;

// One-time injection of shared keyframes used by primitives (spinner rotation).
(function () {
  if (typeof document === "undefined") return;
  if (document.getElementById("hb-anim-kf")) return;
  const s = document.createElement("style");
  s.id = "hb-anim-kf";
  s.textContent = "@keyframes hb-spin{to{transform:rotate(360deg)}}";
  document.head.appendChild(s);
})();

// ---------- shared internal helpers ----------
const PAL = {
  ink: "#111",
  ink2: "#2a2a2a",
  muted: "#6b6b6b",
  muted2: "#9a9a9a",
  line: "#d8d8d8",
  line2: "#ececec",
  paper: "#f7f6f4",
  card: "#ffffff",
  accent: "#ff5a1f",
  bad: "#c62828",
};
const FONT_MONO = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';

// Generic dimming scrim used by modals, dialogs, action sheets, tooltips.
function Scrim({ opacity = 0.45, onClick }) {
  return (
    <div onClick={onClick} style={{
      position: "absolute", inset: 0,
      background: `rgba(0,0,0,${opacity})`,
      zIndex: 4,
      cursor: onClick ? "pointer" : "default",
    }}/>
  );
}

// ---------- 1. NavBar — top bar inside a phone screen ----------
function PhoneNavBar({ title = "Title", left = "back", right = "close", onBg = "transparent" }) {
  const Btn = ({ kind }) => {
    if (!kind || kind === "none") return <div style={{ width: 28 }} />;
    if (kind === "back") return <div style={{ fontSize: 18, color: PAL.ink, width: 28, textAlign: "left" }}>‹</div>;
    if (kind === "close") return <div style={{ fontSize: 16, color: PAL.ink, width: 28, textAlign: "right" }}>×</div>;
    if (kind === "more") return <div style={{ fontSize: 14, color: PAL.ink, width: 28, textAlign: "right", letterSpacing: 1 }}>⋯</div>;
    if (kind === "vmore") return <div style={{ fontSize: 16, color: PAL.ink, width: 28, textAlign: "right", lineHeight: 1, fontWeight: 700 }}>⋮</div>;
    return <div style={{ width: 28 }} />;
  };
  return (
    <div style={{
      position: "absolute", top: 40, left: 0, right: 0,   // 40px reserves notch area
      height: 36, padding: "0 12px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: onBg, borderBottom: `1px solid ${PAL.line2}`,
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      zIndex: 1,
    }}>
      <Btn kind={left} />
      <div style={{ fontSize: 13, fontWeight: 600, color: PAL.ink }}>{title}</div>
      <Btn kind={right} />
    </div>
  );
}

// ---------- 2. TabBar — system tab bar with up to 5 tabs ----------
function PhoneTabBar({ active = 0, tabs = ["Home", "Catalog", "Garage", "Cart", "Profile"], badges = {} }) {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      height: 56, background: PAL.ink, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "space-around",
      padding: "0 4px 6px", zIndex: 3,
    }}>
      {tabs.map((label, i) => (
        <div key={i} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          fontSize: 9, color: i === active ? "#fff" : "rgba(255,255,255,0.55)",
          fontFamily: '-apple-system, sans-serif', position: "relative",
        }}>
          <div style={{
            width: 22, height: 22, border: "1.2px solid currentColor", borderRadius: 5,
            position: "relative",
          }}>
            {badges[i] && (
              <div style={{
                position: "absolute", top: -3, right: -3,
                width: 7, height: 7, borderRadius: "50%",
                background: "#fff", border: "1px solid " + PAL.ink,
              }}/>
            )}
          </div>
          <div>{label}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- 3. BottomSheet — modal sheet rising from bottom with handle ----------
function BottomSheet({ height = 0.55, dim = true, onDismiss, children, title, bodyOverflow = "hidden", back = false }) {
  return (
    <>
      {dim && <Scrim onClick={onDismiss} opacity={0.45} />}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: `${height * 100}%`, background: "#fff",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.18)",
        zIndex: 5, display: "flex", flexDirection: "column",
      }}>
        <div style={{
          width: 36, height: 4, background: PAL.line,
          borderRadius: 2, margin: "8px auto 6px",
        }}/>
        {title && (
          <div style={{
            position: "relative",
            textAlign: "center", padding: "4px 16px 12px",
            fontSize: 14, fontWeight: 600, color: PAL.ink,
            borderBottom: `1px solid ${PAL.line2}`,
          }}>
            {back && (
              <span style={{
                position: "absolute", left: 14, top: "50%",
                transform: "translateY(-60%)",
                fontSize: 18, color: PAL.ink, lineHeight: 1,
              }}>‹</span>
            )}
            {title}
          </div>
        )}
        <div style={{ flex: 1, overflow: bodyOverflow, padding: "8px 16px" }}>{children}</div>
      </div>
    </>
  );
}

// ---------- 4. FullscreenSheet — full-cover modal with close X ----------
function FullscreenSheet({ title, step, progress, children, close = true }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      zIndex: 3, display: "flex", flexDirection: "column",
    }}>
      <div style={{
        padding: "44px 14px 10px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${PAL.line2}`,
      }}>
        <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: PAL.muted, width: 26 }}>
          {step}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: PAL.ink }}>{title}</div>
        {close ? (
          <div style={{
            width: 26, height: 26, borderRadius: "50%", background: PAL.line2,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: PAL.ink2,
          }}>×</div>
        ) : (
          <div style={{ width: 26 }} />
        )}
      </div>
      {typeof progress === "number" && (
        <div style={{ height: 3, background: PAL.line2, margin: "6px 14px 0", borderRadius: 2 }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", background: PAL.ink, borderRadius: 2 }}/>
        </div>
      )}
      <div style={{ flex: 1, padding: "16px", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// ---------- 5. DialogModal — centered alert with title/buttons ----------
// System alert — centered card, modal scrim, app-initiated must-answer.
// `split` switches to iOS-style horizontal text-only buttons at the bottom
// (Cancel | Primary, with a vertical divider). `destructive` paints the primary
// text in the error red. Use split + destructive for simple yes/no confirms.
function DialogModal({ title = "Title", subtitle, primary = "Button", secondary = "Cancel", destructive = false, split = false }) {
  if (split) {
    return (
      <>
        <Scrim opacity={0.5} />
        <div style={{
          position: "absolute", left: 28, right: 28, top: "32%",
          background: "#fff", borderRadius: 14, zIndex: 4,
          overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          fontFamily: '-apple-system, "SF Pro Text", sans-serif',
        }}>
          <div style={{
            padding: "16px 18px 14px", textAlign: "center",
            borderBottom: `1px solid ${PAL.line2}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: PAL.ink, marginBottom: 6 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 11, color: PAL.muted, lineHeight: 1.45 }}>{subtitle}</div>}
          </div>
          <div style={{ display: "flex" }}>
            <div style={{
              flex: 1, padding: "11px 0", textAlign: "center",
              fontSize: 13, fontWeight: 500, color: PAL.ink,
              borderRight: `1px solid ${PAL.line2}`,
            }}>{secondary}</div>
            <div style={{
              flex: 1, padding: "11px 0", textAlign: "center",
              fontSize: 13, fontWeight: 700,
              color: destructive ? "#c62828" : PAL.ink,
            }}>{primary}</div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Scrim opacity={0.5} />
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: 220, background: "#fff", borderRadius: 12,
        zIndex: 4, padding: "20px 16px 14px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: PAL.ink, marginBottom: 6 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: PAL.muted, marginBottom: 14, lineHeight: 1.4 }}>{subtitle}</div>}
        <div style={{
          height: 36, background: destructive ? "#c62828" : PAL.ink, color: "#fff",
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, marginBottom: 6,
        }}>{primary}</div>
        {secondary && (
          <div style={{
            height: 32, background: PAL.line2, color: PAL.ink,
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13,
          }}>{secondary}</div>
        )}
      </div>
    </>
  );
}

// ---------- 6. ActionSheet — bottom list of actions, iOS style ----------
function ActionSheet({ prompt, actions = [], cancel = "Cancel" }) {
  return (
    <>
      <Scrim opacity={0.4} />
      <div style={{
        position: "absolute", left: 8, right: 8, bottom: 12,
        zIndex: 4, fontFamily: '-apple-system, sans-serif',
      }}>
        <div style={{
          background: "#fff", borderRadius: 12, overflow: "hidden",
          marginBottom: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}>
          {prompt && (
            <div style={{
              padding: "10px 14px", fontSize: 11, color: PAL.muted, textAlign: "center",
              borderBottom: `1px solid ${PAL.line2}`,
            }}>{prompt}</div>
          )}
          {actions.map((a, i) => {
            const lab = typeof a === "string" ? a : a.label;
            const dest = typeof a === "object" && a.destructive;
            return (
              <div key={i} style={{
                padding: "12px 14px", textAlign: "center", fontSize: 14,
                color: dest ? PAL.bad : PAL.ink, fontWeight: 400,
                borderBottom: i < actions.length - 1 ? `1px solid ${PAL.line2}` : "none",
              }}>{lab}</div>
            );
          })}
        </div>
        <div style={{
          background: "#fff", borderRadius: 12,
          padding: "12px 14px", textAlign: "center", fontSize: 14, fontWeight: 600,
          color: PAL.ink, boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}>{cancel}</div>
      </div>
    </>
  );
}

// ---------- 7. InfoTooltip — bottom sheet for ⓘ help, with optional image ----------
function InfoTooltip({ title = "Title", body, image = false, actionLink, height = 0.45 }) {
  return (
    <BottomSheet height={height} title={title}>
      {image && (
        <div style={{
          width: "100%", height: 90, background: PAL.line2,
          borderRadius: 6, marginBottom: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: PAL.muted2, fontSize: 18,
        }}>▱</div>
      )}
      <div style={{ fontSize: 11, color: PAL.ink2, lineHeight: 1.5 }}>
        {body || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        {actionLink && (
          <>
            {" "}
            <span style={{
              color: PAL.ink, textDecoration: "underline",
              textDecorationStyle: "dotted", textUnderlineOffset: 2,
              cursor: "pointer",
            }}>{actionLink}</span>
            .
          </>
        )}
      </div>
    </BottomSheet>
  );
}

// ---------- 8. Snackbar — bottom toast with optional action and close ----------
// Autodoc canon: snackbar sits at the bottom of the screen, 12 px above the
// tab bar (or above the bottom safe area if there is no tab bar). It never
// sits at the top — that strip belongs to the navigation bar.
// `action` — single short label (Undo / Retry / View). White-bold.
// `dismissable` — adds an explicit × button. Pair with `persistent`.
// `persistent` — disables auto-dismiss; the snackbar stays until the user
// taps the action, taps ×, or swipes it down. Persistence is a runtime
// hint — visually it adds nothing on its own.
function Snackbar({
  text = "Short notification description",
  action,
  dismissable = false,
  persistent = false,
}) {
  return (
    <div style={{
      position: "absolute", left: 12, right: 12, bottom: 80,
      background: PAL.ink, color: "#fff", borderRadius: 8,
      padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
      fontSize: 11, fontFamily: '-apple-system, sans-serif',
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)", zIndex: 3,
    }}>
      <span style={{ flex: 1 }}>{text}</span>
      {action && (
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 11 }}>{action}</span>
      )}
      {dismissable && (
        <span style={{ color: "#fff", fontSize: 13, opacity: 0.6, marginLeft: 2 }}>×</span>
      )}
      {persistent && null /* runtime hint; no visual diff */}
    </div>
  );
}

// ---------- 9. Skeleton — shimmer placeholders for Loading ----------
function Skeleton({ shape = "stack", withNavBar = false }) {
  const Bar = ({ w = "100%", h = 10, mt = 8 }) => (
    <div style={{
      width: w, height: h, background: PAL.line2,
      borderRadius: 3, marginTop: mt,
    }}/>
  );
  const topPad = withNavBar ? 76 : 40;
  if (shape === "stack") {
    return (
      <div style={{ padding: `${topPad}px 14px 12px` }}>
        <Bar w="80%" h={14} mt={4} />
        <Bar w="100%" />
        <Bar w="65%" />
        <div style={{
          height: 70, background: PAL.line2, borderRadius: 6, marginTop: 14,
        }}/>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <div style={{ flex: 1, height: 36, background: PAL.line2, borderRadius: 4 }}/>
          <div style={{ flex: 1, height: 36, background: PAL.line2, borderRadius: 4 }}/>
        </div>
        <Bar w="90%" mt={14} />
        <Bar w="55%" />
        <div style={{
          height: 50, background: PAL.line2, borderRadius: 6, marginTop: 14,
        }}/>
      </div>
    );
  }
  if (shape === "image") {
    return (
      <div style={{ padding: `${topPad}px 14px 12px` }}>
        <div style={{
          height: 150, background: PAL.line2, borderRadius: 8, marginBottom: 14,
        }}/>
        <Bar w="80%" h={14} mt={0} />
        <Bar w="100%" />
        <Bar w="65%" />
        <div style={{
          height: 38, background: PAL.line2, borderRadius: 6, marginTop: 18,
        }}/>
      </div>
    );
  }
  // simple list rows
  return (
    <div style={{ padding: `${topPad}px 14px 12px` }}>
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 0", borderBottom: `1px solid ${PAL.line2}`,
        }}>
          <div style={{ width: 32, height: 32, background: PAL.line2, borderRadius: 6 }}/>
          <div style={{ flex: 1 }}>
            <Bar w="60%" h={9} mt={0} />
            <Bar w="40%" h={8} mt={6} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- 10. Spinner / button loader ----------
function Spinner({ size = 14, color = "#fff" }) {
  return (
    <span style={{
      display: "inline-block", width: size, height: size,
      border: `2px solid ${color}`, borderTopColor: "transparent",
      borderRadius: "50%", verticalAlign: "middle",
      animation: "hb-spin 0.8s linear infinite",
    }}/>
  );
}

function LoadingButton({ label = "Confirm action", state = "idle" }) {
  return (
    <div style={{
      height: 44, background: PAL.ink, color: "#fff", borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      fontSize: 13, fontWeight: 600,
      fontFamily: '-apple-system, sans-serif',
      position: "relative", overflow: "hidden",
    }}>
      <span>{label}</span>
      {state === "loading" && <Spinner size={12} />}
      {state === "ripple" && (
        <span style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 60, height: 60, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
        }}/>
      )}
    </div>
  );
}

// ---------- 11. DropdownPicker — list of options, radio/check, with confirm ----------
function DropdownPicker({
  kind = "radio",
  options = ["Option","Option","Option","Option","Option","Option"],
  selected = [1],
  confirm = true,
  search = false,
  withIcons = false,
  iconSide = "left",
}) {
  return (
    <BottomSheet height={confirm ? 0.62 : 0.55} title="Title">
      {search && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          height: 30, padding: "0 10px", marginBottom: 8,
          background: PAL.paper, borderRadius: 8,
          fontSize: 11, color: PAL.muted, fontFamily: FONT_MONO,
        }}>
          <div style={{
            width: 12, height: 12, border: "1.2px solid currentColor",
            borderRadius: "50%", position: "relative",
          }}/>
          Search
        </div>
      )}
      {options.map((opt, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 4px", borderBottom: `1px solid ${PAL.line2}`,
          fontSize: 13, color: PAL.ink,
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
            {withIcons && iconSide === "left" && (
              <span style={{
                width: 16, height: 16, background: PAL.line2, borderRadius: 3,
                display: "inline-block", flexShrink: 0,
              }}/>
            )}
            <span>{opt}</span>
            {withIcons && iconSide === "right" && (
              <span style={{
                width: 16, height: 16, background: PAL.line2, borderRadius: 3,
                display: "inline-block", flexShrink: 0, marginLeft: "auto",
              }}/>
            )}
          </span>
          {kind === "radio" ? (
            <span style={{
              width: 16, height: 16, borderRadius: "50%",
              border: `1.5px solid ${selected.includes(i) ? PAL.ink : PAL.line}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {selected.includes(i) && (
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: PAL.ink }}/>
              )}
            </span>
          ) : (
            <span style={{
              width: 16, height: 16, borderRadius: 3,
              border: `1.5px solid ${selected.includes(i) ? PAL.ink : PAL.line}`,
              background: selected.includes(i) ? PAL.ink : "#fff",
              color: "#fff", fontSize: 11, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{selected.includes(i) ? "✓" : ""}</span>
          )}
        </div>
      ))}
      {confirm && (
        <div style={{ marginTop: 14 }}>
          <div style={{
            height: 44, background: PAL.ink, color: "#fff",
            borderRadius: 8, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 13, fontWeight: 600,
          }}>Confirm</div>
        </div>
      )}
    </BottomSheet>
  );
}

// Closed state: a small trigger row with chevron-down on the screen body.
// Used to depict the "before tap" state right next to an open Dropdown sheet.
function DropdownTrigger({ label = "Title", value = "Option" }) {
  return (
    <div style={{ paddingTop: 96, padding: "96px 16px 0 16px" }}>
      <div style={{ fontSize: 11, color: PAL.muted, marginBottom: 6 }}>{label}</div>
      <div style={{
        height: 44, background: PAL.paper, border: `1px solid ${PAL.line2}`,
        borderRadius: 10, padding: "0 12px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 13, color: PAL.ink,
      }}>
        <span>{value}</span>
        <span style={{ color: PAL.muted, fontSize: 12 }}>▾</span>
      </div>
    </div>
  );
}

// ---------- 12. SwipeRow — list with one row swiped, revealing actions ----------
function SwipeList({
  swipedIndex = 1,
  actions = ["Edit", { label: "Delete", destructive: true }],
  withNavBar = false,
  midSwipe = false,
}) {
  // midSwipe = peek state: card slid 40px, dark circular handle with ←
  // shows where the user's finger is. Action buttons are NOT yet revealed.
  const offset = midSwipe ? -40 : -90;
  return (
    <div style={{ paddingTop: withNavBar ? 76 : 40 }}>
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{
          height: 50, background: PAL.line2, borderRadius: 6,
          margin: "6px 12px", position: "relative", overflow: "visible",
          display: "flex", alignItems: "center", paddingLeft: 14,
          fontSize: 12, color: PAL.muted, fontFamily: FONT_MONO,
          transform: i === swipedIndex ? `translateX(${offset}px)` : "none",
          transition: "transform 0.3s",
        }}>
          Card
          {i === swipedIndex && midSwipe && (
            <div style={{
              position: "absolute", right: -28, top: "50%",
              transform: "translateY(-50%)",
              width: 32, height: 32, borderRadius: "50%",
              background: PAL.ink, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, lineHeight: 1,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}>←</div>
          )}
          {i === swipedIndex && !midSwipe && (
            <div style={{
              position: "absolute", right: -90, top: 0, height: "100%",
              display: "flex", alignItems: "center", gap: 0,
            }}>
              {actions.map((a, j) => {
                const lab = typeof a === "string" ? a : a.label;
                const dest = typeof a === "object" && a.destructive;
                return (
                  <div key={j} style={{
                    width: 44, height: "100%",
                    background: dest ? PAL.bad : PAL.ink2,
                    color: "#fff", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 11, fontWeight: 500,
                  }}>{lab}</div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------- 12b. InteractiveSwipeList — live drag prototype ----------
function InteractiveSwipeList({ withNavBar = false, rows = 5 }) {
  const COMMIT = 90;            // open offset
  const COMMIT_THRESHOLD = 45;  // past this on release → snap open
  const RESTORE_MS = 2500;

  const [openIndex, setOpenIndex] = usePat(-1);
  const [dragIndex, setDragIndex] = usePat(-1);
  const [dragX, setDragX] = usePat(0);
  const [deleted, setDeleted] = usePat({});

  const startXRef = React.useRef(0);
  const fromOpenRef = React.useRef(false);
  const movedRef = React.useRef(false);

  const onDown = (i) => (e) => {
    if (deleted[i]) return;
    if (e.target && e.target.closest && e.target.closest("[data-swipe-action]")) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    startXRef.current = e.clientX;
    fromOpenRef.current = (openIndex === i);
    movedRef.current = false;
    setDragIndex(i);
    setDragX(fromOpenRef.current ? -COMMIT : 0);
    if (openIndex !== -1 && openIndex !== i) setOpenIndex(-1);
  };
  const onMove = (i) => (e) => {
    if (dragIndex !== i) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 4) movedRef.current = true;
    const base = fromOpenRef.current ? -COMMIT : 0;
    setDragX(Math.max(-COMMIT, Math.min(0, base + dx)));
  };
  const onUp = (i) => () => {
    if (dragIndex !== i) return;
    setOpenIndex(dragX <= -COMMIT_THRESHOLD ? i : -1);
    setDragIndex(-1);
    setDragX(0);
  };

  const closeOpen = (e) => { e && e.stopPropagation && e.stopPropagation(); setOpenIndex(-1); };
  const onDelete = (i) => (e) => {
    e.stopPropagation();
    setDeleted(d => ({ ...d, [i]: true }));
    setOpenIndex(-1);
    setTimeout(() => setDeleted(d => { const c = { ...d }; delete c[i]; return c; }), RESTORE_MS);
  };

  return (
    <div style={{ paddingTop: withNavBar ? 76 : 40 }}>
      {Array.from({ length: rows }).map((_, i) => {
        const isOpen = openIndex === i;
        const isDragging = dragIndex === i;
        const collapsed = !!deleted[i];
        const offset = isDragging ? dragX : (isOpen ? -COMMIT : 0);
        return (
          <div key={i} style={{
            height: collapsed ? 0 : 54,
            opacity: collapsed ? 0 : 1,
            overflow: collapsed ? "hidden" : "visible",
            transition: "height 0.22s ease-out, opacity 0.22s ease-out",
          }}>
            <div
              onPointerDown={onDown(i)}
              onPointerMove={onMove(i)}
              onPointerUp={onUp(i)}
              onPointerCancel={onUp(i)}
              style={{
                height: 50, background: PAL.line2, borderRadius: 6,
                margin: "2px 12px", position: "relative",
                display: "flex", alignItems: "center", paddingLeft: 14,
                fontSize: 12, color: PAL.muted, fontFamily: FONT_MONO,
                transform: `translateX(${offset}px)`,
                transition: isDragging ? "none" : "transform 0.25s ease-out",
                touchAction: "pan-y",
                userSelect: "none",
                cursor: isOpen ? "default" : "grab",
              }}>
              Card
              <div style={{
                position: "absolute", right: -90, top: 0, height: "100%",
                display: "flex", alignItems: "center",
                pointerEvents: (isOpen && !isDragging) ? "auto" : "none",
                visibility: offset < 0 ? "visible" : "hidden",
              }}>
                <div data-swipe-action onClick={closeOpen} style={{
                  width: 44, height: "100%",
                  background: PAL.ink2, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 500, cursor: "pointer",
                }}>Edit</div>
                <div data-swipe-action onClick={onDelete(i)} style={{
                  width: 44, height: "100%",
                  background: PAL.bad, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 500, cursor: "pointer",
                }}>Delete</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- 13. ContextMenu — small menu attached to an item ----------
function ContextMenu({ items = ["Option 1", "Option 2", "Option 3"], anchor = "right" }) {
  return (
    <div style={{
      position: "absolute", top: 130, [anchor]: 16,
      background: "#fff", borderRadius: 10,
      boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
      border: `1px solid ${PAL.line2}`,
      minWidth: 110, zIndex: 4, overflow: "hidden",
    }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: "10px 14px", fontSize: 12, color: PAL.ink,
          borderBottom: i < items.length - 1 ? `1px solid ${PAL.line2}` : "none",
        }}>{it}</div>
      ))}
    </div>
  );
}

// ---------- 14. DynamicIsland — Apple pill at top ----------
function DynamicIsland({ state = "compact", appLabel, primary, secondary }) {
  if (state === "compact") {
    return (
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        width: 95, height: 26, background: PAL.ink, borderRadius: 13,
        zIndex: 6,
      }}/>
    );
  }
  if (state === "minimal") {
    return (
      <>
        <div style={{
          position: "absolute", top: 8, left: "50%",
          transform: "translateX(calc(-50% - 22px))",
          width: 70, height: 26, background: PAL.ink, borderRadius: 13,
          zIndex: 6,
        }}/>
        <div style={{
          position: "absolute", top: 8, left: "50%",
          transform: "translateX(calc(-50% + 32px))",
          width: 26, height: 26, background: PAL.ink, borderRadius: "50%",
          zIndex: 6,
        }}/>
      </>
    );
  }
  if (state === "expanded") {
    return (
      <div style={{
        position: "absolute", top: 8, left: 12, right: 12,
        background: PAL.ink, color: "#fff", borderRadius: 22,
        padding: "10px 14px 12px", zIndex: 6,
      }}>
        <div style={{
          width: 14, height: 14, background: "#fff", borderRadius: 3,
          marginBottom: 6,
        }}/>
        <div style={{ fontSize: 12, fontWeight: 600 }}>Title</div>
        <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 8 }}>Description text</div>
        <div style={{
          height: 26, background: "rgba(255,255,255,0.18)",
          borderRadius: 6, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 10, fontWeight: 500,
        }}>CTA button</div>
      </div>
    );
  }
  if (state === "branded") {
    return (
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        background: PAL.ink, color: "#fff", borderRadius: 13,
        padding: "5px 16px", fontSize: 9, fontWeight: 700, letterSpacing: 1,
        zIndex: 6,
      }}>{appLabel || "AUTODOC"}</div>
    );
  }
  // 4-th state — short alert banner emerging from the island.
  // Used by the OS for system messages (battery low, AirDrop, alerts).
  if (state === "alert") {
    return (
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        background: PAL.ink, color: "#fff", borderRadius: 16,
        minWidth: 200, padding: "6px 14px",
        display: "flex", alignItems: "center", gap: 8,
        zIndex: 6,
      }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%", background: PAL.bad,
          boxShadow: "0 0 0 2px rgba(255,255,255,0.15)",
        }}/>
        <div style={{ fontSize: 10, fontWeight: 600 }}>Alert · System status</div>
      </div>
    );
  }
  return null;
}

// ---------- 15. Webview — modal browser frame inside phone ----------
function Webview({ title = "Browser navigation" }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff", zIndex: 3,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{
        padding: "44px 12px 10px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        background: PAL.line2,
      }}>
        <div style={{ fontSize: 14, color: PAL.ink, width: 24 }}>‹</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: PAL.ink }}>{title}</div>
        <div style={{ fontSize: 14, color: PAL.ink, width: 24, textAlign: "right" }}>×</div>
      </div>
      <div style={{
        flex: 1, background: PAL.muted2,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 11, opacity: 0.85,
      }}>Web View</div>
    </div>
  );
}

// ---------- 16. PromoBanner / variations (used in P14) ----------
function PromoBanner({ kind = "combined" }) {
  if (kind === "combined") {
    return (
      <div style={{
        background: PAL.line2, height: 80, borderRadius: 10,
        display: "flex", alignItems: "center", padding: "0 14px", gap: 10,
      }}>
        <div style={{ width: 56, height: 56, background: PAL.muted2, borderRadius: 8 }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: PAL.ink, marginBottom: 4 }}>Title</div>
          <div style={{ fontSize: 10, color: PAL.muted }}>Subtitle / description</div>
        </div>
      </div>
    );
  }
  if (kind === "slider") {
    return (
      <div>
        <div style={{
          background: PAL.line2, height: 110, borderRadius: 10,
          marginBottom: 6, display: "flex", alignItems: "center",
          justifyContent: "center", color: PAL.muted, fontSize: 11,
        }}>Banner 1 / Banner 2 / Banner 3 →</div>
        <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width: i === 0 ? 16 : 5, height: 5, borderRadius: 3,
              background: i === 0 ? PAL.ink : PAL.line,
            }}/>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "stack") {
    // Three full-height cards side by side: focused element in the centre,
    // two siblings peek on the sides. Same height, no overlap. The focused
    // card carries content (title + a single action button at the bottom).
    return (
      <div style={{
        display: "flex", alignItems: "stretch", gap: 6, height: 200,
      }}>
        <div style={{
          width: 30, background: PAL.line, borderRadius: 8, opacity: 0.7,
        }}/>
        <div style={{
          flex: 1, background: "#fff", border: `1px solid ${PAL.line}`,
          borderRadius: 10, display: "flex", flexDirection: "column",
          padding: 12,
        }}>
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, color: PAL.ink,
          }}>Card 2</div>
          <div style={{
            height: 34, background: PAL.ink, color: "#fff", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 600,
          }}>Single Action Button</div>
        </div>
        <div style={{
          width: 30, background: PAL.line, borderRadius: 8, opacity: 0.7,
        }}/>
      </div>
    );
  }
  if (kind === "video") {
    return (
      <div style={{
        background: PAL.line2, height: 130, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, color: PAL.ink, paddingLeft: 3,
        }}>▶</div>
      </div>
    );
  }
  if (kind === "input") {
    return (
      <div style={{
        background: "#fff", border: `1px solid ${PAL.line}`, borderRadius: 10,
        padding: 12,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Title</div>
        <div style={{ fontSize: 10, color: PAL.muted, marginBottom: 8 }}>Subtitle</div>
        <div style={{
          height: 30, border: `1px solid ${PAL.line}`, borderRadius: 6,
          padding: "0 10px", display: "flex", alignItems: "center",
          fontSize: 10, color: PAL.muted2,
        }}>Coupon code</div>
        <div style={{
          height: 32, background: PAL.ink, color: "#fff", borderRadius: 6,
          marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 600,
        }}>Confirm</div>
      </div>
    );
  }
  // 3. Three equal cells with an icon-on-top + caption — quick category nav.
  if (kind === "text-icons-row") {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            flex: 1, height: 90, background: PAL.line2, borderRadius: 10,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 8,
          }}>
            <div style={{
              width: 24, height: 24, background: PAL.muted2, borderRadius: 5,
            }}/>
            <div style={{ fontSize: 10, color: PAL.ink }}>Option</div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// ---------- 17. ContentList — generic list of items with chevrons ----------
// Use `withNavBar` if you've placed a PhoneNavBar above; pads top to clear it.
function ContentList({ count = 5, withChevron = true, highlightedIndex = -1, withNavBar = false }) {
  return (
    <div style={{ paddingTop: withNavBar ? 76 : 40 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          padding: "12px 14px", display: "flex", alignItems: "center",
          justifyContent: "space-between", fontSize: 12, color: PAL.ink,
          borderBottom: `1px solid ${PAL.line2}`,
          background: i === highlightedIndex ? PAL.line2 : "transparent",
        }}>
          <span>Title</span>
          {withChevron && <span style={{ color: PAL.muted2, fontSize: 14 }}>›</span>}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  Scrim,
  PhoneNavBar, PhoneTabBar,
  BottomSheet, FullscreenSheet,
  DialogModal, ActionSheet,
  InfoTooltip,
  Snackbar,
  Skeleton, Spinner, LoadingButton,
  DropdownPicker, DropdownTrigger,
  SwipeList,
  InteractiveSwipeList,
  ContextMenu,
  DynamicIsland,
  Webview,
  PromoBanner,
  ContentList,
});

// ---------- 18. NavCellList — list of disclosure cells (P04 controls) ----------
function NavCellList({ items, withNavBar = false }) {
  return (
    <div style={{ paddingTop: withNavBar ? 76 : 40 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: "12px 14px", display: "flex", alignItems: "center",
          justifyContent: "space-between", fontSize: 12, color: PAL.ink,
          borderBottom: `1px solid ${PAL.line2}`,
        }}>
          <span>{it.label || "Title"}</span>
          <span style={{ color: PAL.muted2, fontSize: 14 }}>›</span>
        </div>
      ))}
    </div>
  );
}

// ---------- 19. ValueCellList — rows with trailing value/state (P04) ----------
function ValueCellList({ items, withNavBar = false, change = false }) {
  return (
    <div style={{ paddingTop: withNavBar ? 76 : 40 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: "12px 14px",
          borderBottom: `1px solid ${PAL.line2}`,
        }}>
          <div style={{ fontSize: 12, color: PAL.muted, marginBottom: 4 }}>{it.label || "Title"}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: PAL.ink }}>{it.value || "Value/status"}</span>
            {change && <span style={{ fontSize: 11, color: PAL.ink, textDecoration: "underline" }}>Change</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- 20. InputList — stack of text inputs (P04 controls) ----------
function InputList({ count = 4, withNavBar = false }) {
  return (
    <div style={{ paddingTop: withNavBar ? 76 : 40, padding: `${withNavBar ? 76 : 40}px 14px 0` }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: PAL.muted, marginBottom: 4 }}>Title</div>
          <div style={{
            height: 36, border: `1px solid ${PAL.line}`, borderRadius: 6,
            padding: "0 10px", display: "flex", alignItems: "center",
            fontSize: 11, color: PAL.muted2,
          }}>Text input</div>
        </div>
      ))}
    </div>
  );
}

// ---------- 21. ImageCards — selectable cards with image (P11 dropdown variant) ----------
function ImageCards({ multi = false, selected = [0], withNavBar = false, confirm = true, size = "normal" }) {
  const isSmall = size === "small";
  const cols = isSmall ? "1fr 1fr 1fr" : "1fr 1fr";
  const count = isSmall ? 6 : 4;
  const tileH = isSmall ? 36 : 50;
  return (
    <BottomSheet height={confirm ? 0.6 : 0.55} title="Title">
      <div style={{ padding: "8px 0 16px" }}>
        <div style={{ fontSize: 11, color: PAL.muted, marginBottom: 10 }}>Title</div>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 8 }}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} style={{
              border: selected.includes(i) ? `2px solid ${PAL.ink}` : `1px solid ${PAL.line}`,
              borderRadius: 8, padding: isSmall ? 6 : 10,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              background: "#fff", position: "relative",
            }}>
              <div style={{
                width: "100%", height: tileH, background: PAL.line2, borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: PAL.muted2, fontSize: isSmall ? 14 : 18,
              }}>▱</div>
              <div style={{ fontSize: isSmall ? 10 : 11, color: PAL.ink }}>Option</div>
              {selected.includes(i) && (
                <div style={{
                  position: "absolute", top: 4, right: 4,
                  width: 14, height: 14, borderRadius: "50%", background: PAL.ink,
                  color: "#fff", fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>✓</div>
              )}
            </div>
          ))}
        </div>
      </div>
      {confirm && (
        <div style={{ marginTop: 8 }}>
          <div style={{
            height: 44, background: PAL.ink, color: "#fff",
            borderRadius: 8, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 13, fontWeight: 600,
          }}>Confirm</div>
        </div>
      )}
    </BottomSheet>
  );
}

// ---------- 22. RetryError — error state with retry button (P09) ----------
function RetryError() {
  return (
    <div style={{
      padding: "60px 20px 20px", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", height: "100%",
    }}>
      <div style={{
        position: "absolute", top: 50, left: 14, right: 14,
        background: PAL.ink, color: "#fff", borderRadius: 8,
        padding: "10px 12px", fontSize: 11,
      }}>Error occurred</div>
      <div style={{
        width: 60, height: 50, background: PAL.muted2, borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 22, marginTop: 60, marginBottom: 12,
      }}>▲</div>
      <div style={{ fontSize: 12, color: PAL.muted, marginBottom: 30 }}>Error text</div>
      <div style={{
        position: "absolute", left: 14, right: 14, bottom: 30,
        height: 44, background: PAL.ink, color: "#fff", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600,
      }}>Retry</div>
    </div>
  );
}

// ---------- 23. Promo widget extras (P14 missing 6 of 11) ----------
function PromoBannerExt({ kind }) {
  if (kind === "product-widget") {
    // type 2: product/feature widget — image + title + description, full card
    return (
      <div style={{
        background: "#fff", border: `1px solid ${PAL.line}`, borderRadius: 10,
        padding: 12, display: "flex", gap: 10,
      }}>
        <div style={{ width: 50, height: 50, background: PAL.line2, borderRadius: 6 }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: PAL.ink, marginBottom: 4 }}>Title</div>
          <div style={{ fontSize: 10, color: PAL.muted, marginBottom: 8 }}>Subtitle / description</div>
          <div style={{
            height: 28, background: PAL.ink, color: "#fff", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 600,
          }}>Single Action Button</div>
        </div>
      </div>
    );
  }
  if (kind === "text-cta") {
    // type 7: block with text + action button
    return (
      <div style={{
        background: PAL.line2, borderRadius: 10, padding: 14,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: PAL.ink, marginBottom: 4 }}>Title</div>
        <div style={{ fontSize: 11, color: PAL.muted, marginBottom: 10 }}>Subtitle</div>
        <div style={{
          height: 32, background: PAL.ink, color: "#fff", borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 600,
        }}>Confirm/Continue</div>
      </div>
    );
  }
  if (kind === "input-icons") {
    // type 9: input + one or more action icons
    return (
      <div style={{
        background: PAL.line2, borderRadius: 10, padding: 14,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: PAL.ink, marginBottom: 4 }}>Title</div>
        <div style={{ fontSize: 11, color: PAL.muted, marginBottom: 8 }}>Subtitle</div>
        <div style={{
          display: "flex", gap: 6, alignItems: "center",
          height: 36, background: "#fff", border: `1px solid ${PAL.line}`,
          borderRadius: 6, padding: "0 10px",
        }}>
          <span style={{ flex: 1, fontSize: 11, color: PAL.muted2 }}>Coupon code</span>
          <span style={{ fontSize: 12, color: PAL.ink2 }}>⧉</span>
          <span style={{ fontSize: 12, color: PAL.ink2 }}>↗</span>
        </div>
      </div>
    );
  }
  if (kind === "trailing-icon") {
    // type 10: text + disclosure icon (no full button)
    return (
      <div style={{
        background: "#fff", border: `1px solid ${PAL.line}`, borderRadius: 10,
        padding: 12, display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ width: 40, height: 40, background: PAL.line2, borderRadius: 6 }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: PAL.ink }}>Title</div>
          <div style={{ fontSize: 10, color: PAL.muted }}>Subtitle</div>
        </div>
        <div style={{
          padding: "4px 10px", background: PAL.line2, borderRadius: 12,
          fontSize: 10, color: PAL.ink2,
        }}>Trailing</div>
      </div>
    );
  }
  if (kind === "contextual-text") {
    // type 11: contextual textual info, no transition
    return (
      <div style={{
        display: "flex", gap: 10, padding: "10px 12px", alignItems: "flex-start",
      }}>
        <div style={{ width: 24, height: 24, background: PAL.line2, borderRadius: 4, flexShrink: 0 }}/>
        <div style={{ fontSize: 11, color: PAL.muted, lineHeight: 1.4 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          <span style={{ color: PAL.ink, fontWeight: 600, marginLeft: 6 }}>Text button</span>
        </div>
      </div>
    );
  }
  return null;
}

// ---------- 24. SearchField — input field for ch07 frames ----------
function SearchField({ value, focused = false, hasClear = false, hasCancel = false }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "44px 12px 8px", alignItems: "center" }}>
      <div style={{
        flex: 1, height: 32, background: PAL.paper, borderRadius: 8,
        display: "flex", alignItems: "center", padding: "0 10px", gap: 6,
        border: focused ? `1px solid ${PAL.ink}` : "none",
      }}>
        <div style={{
          width: 12, height: 12, border: `1.5px solid ${PAL.muted}`,
          borderRadius: "50%", flexShrink: 0,
        }}/>
        <span style={{ flex: 1, fontSize: 12, color: value ? PAL.ink : PAL.muted2 }}>
          {value || "Search"}
        </span>
        {hasClear && (
          <span style={{
            width: 14, height: 14, borderRadius: "50%", background: PAL.muted2,
            color: "#fff", fontSize: 9, display: "flex", alignItems: "center",
            justifyContent: "center",
          }}>×</span>
        )}
      </div>
      {hasCancel && (
        <span style={{ fontSize: 12, color: PAL.ink }}>Cancel</span>
      )}
    </div>
  );
}

// ---------- 25. AddCarSheet — bottom sheet for "no car selected" edge case ----------
function AddCarSheet() {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      background: "#fff", borderRadius: "16px 16px 0 0",
      padding: "8px 16px 20px", zIndex: 5,
      boxShadow: "0 -8px 24px rgba(0,0,0,0.18)",
    }}>
      <div style={{
        width: 36, height: 4, background: PAL.line,
        borderRadius: 2, margin: "0 auto 12px",
      }}/>
      <div style={{
        fontSize: 11, fontFamily: FONT_MONO, color: PAL.muted,
        textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4,
      }}>ADD CAR</div>
      <div style={{ fontSize: 11, color: PAL.muted, marginBottom: 14 }}>
        Please, select your vehicle for perfect part compatibility
      </div>
      <div style={{
        height: 38, background: "#fff", border: `1px solid ${PAL.line}`,
        borderRadius: 8, padding: "0 12px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 12, marginBottom: 8,
      }}>
        <span>By Model</span>
        <span style={{ color: PAL.muted2 }}>›</span>
      </div>
      <div style={{
        height: 38, background: "#fff", border: `1px solid ${PAL.line}`,
        borderRadius: 8, padding: "0 12px",
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 12,
      }}>
        <span style={{
          padding: "2px 6px", background: PAL.line2, fontSize: 9,
          fontFamily: FONT_MONO, borderRadius: 2,
        }}>FLAG</span>
        <span>By Reg Number</span>
      </div>
    </div>
  );
}

// ---------- 26. CarWarning — orange callout strip for ch07 search ----------
function CarWarning() {
  return (
    <div style={{
      margin: "8px 12px", padding: "8px 10px",
      background: "#2a2a2a", borderRadius: 6,
      display: "flex", gap: 8, alignItems: "flex-start",
    }}>
      <span style={{
        width: 14, height: 14, borderRadius: "50%",
        background: PAL.accent, color: "#fff", fontSize: 9,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: 1, fontWeight: 700,
      }}>!</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: "#fff", lineHeight: 1.35 }}>
          Be sure to choose a car, otherwise you risk to buy an item that does not fit your car.
        </div>
        <div style={{ fontSize: 10, color: PAL.accent, marginTop: 4, textDecoration: "underline" }}>
          Add car button
        </div>
      </div>
    </div>
  );
}

// ---------- 27. Stepper — segmented step indicator (P04) ----------
function Stepper({ steps = 3, active = 0 }) {
  return (
    <div style={{
      display: "flex", gap: 6, padding: "0 14px",
    }}>
      {Array.from({ length: steps }).map((_, i) => {
        const isActive = i === active;
        const isPast = i < active;
        return (
          <div key={i} style={{
            flex: 1, height: 26, borderRadius: 4,
            border: `1.5px solid ${isActive ? PAL.ink : PAL.line}`,
            background: isPast ? PAL.line2 : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontFamily: FONT_MONO,
            color: isActive ? PAL.ink : PAL.muted,
            fontWeight: isActive ? 600 : 400,
          }}>Step {i + 1}</div>
        );
      })}
    </div>
  );
}

// ---------- 28a. DragHint — dark filled circle with downward arrow ----------
// Used on title rows of P02 dismiss-state mockups to indicate drag-down.
function DragHint({ top = 18, size = 24 }) {
  return (
    <div style={{
      position: "absolute", left: "50%", top, transform: "translateX(-50%)",
      width: size, height: size, borderRadius: "50%",
      background: PAL.ink, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, lineHeight: 1,
      boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
      pointerEvents: "none", zIndex: 6,
    }}>↓</div>
  );
}

// ---------- 28. CTAStack — Primary CTA + optional tertiary text button or link ----------
// `secondary` (legacy) renders as a text button — most existing call sites pass
//   an action verb ("Choose another option", "Skip"), which is a tertiary action.
// `link` renders as a real navigation link (dotted underline).
function CTAStack({ primary = "Continue", secondary, link }) {
  return (
    <div style={{ padding: "10px 16px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{
        height: 44, background: PAL.ink, color: "#fff", borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600,
      }}>{primary}</div>
      {secondary && (
        <div style={{
          textAlign: "center", fontSize: 12, color: PAL.muted,
          fontWeight: 500,
        }}>{secondary}</div>
      )}
      {link && (
        <div style={{
          textAlign: "center", fontSize: 12, color: PAL.muted,
          textDecoration: "underline", textDecorationStyle: "dotted",
          textUnderlineOffset: 3,
        }}>{link}</div>
      )}
    </div>
  );
}

Object.assign(window, {
  NavCellList, ValueCellList, InputList,
  ImageCards, RetryError,
  PromoBannerExt,
  SearchField, AddCarSheet, CarWarning,
  Stepper, CTAStack, DragHint,
});

// Part II — Pattern Library. 14 system UI patterns.
// Each pattern uses the same vocabulary as Part I chapters:
// PatternHead + Callout + H3 + p + FrameRow/FrameCell + Rules + DoDont.

// ---------------------------------------------------------------
