// ---------------------------------------------------------------
// P — Add a Car
// ---------------------------------------------------------------

// Header for full-screen steps — back arrow + centred title.
function ACHeader({ title = "Add Car" }) {
  return (
    <div style={{
      padding: "44px 14px 12px",
      borderBottom: "1px solid #ececec",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "#fff",
    }}>
      <div style={{ width: 28, fontSize: 18, color: "#111" }}>‹</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{title}</div>
      <div style={{ width: 28 }}/>
    </div>
  );
}

// Sheet handle drag bar.
function ACSheetHandle() {
  return (
    <div style={{
      width: 36, height: 4, background: "#d8d8d8",
      borderRadius: 2, margin: "8px auto 6px",
    }}/>
  );
}

// Compact keyboard stub for the typing states.
function ACKeyboard({ doneActive = false }) {
  const row1 = ["q","w","e","r","t","y","u","i","o","p"];
  const row2 = ["a","s","d","f","g","h","j","k","l"];
  const row3 = ["z","x","c","v","b","n","m"];
  const key = (label, i) => (
    <div key={`${label}-${i}`} style={{
      flex: 1, height: 26, background: "#cfd2d6", borderRadius: 4,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, color: "#111", margin: "0 2px",
    }}>{label}</div>
  );
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      background: "#d3d6da", padding: "6px 4px 8px",
      zIndex: 6,
    }}>
      <div style={{ display: "flex", margin: "2px 0" }}>{row1.map(key)}</div>
      <div style={{ display: "flex", margin: "2px 0", padding: "0 14px" }}>{row2.map(key)}</div>
      <div style={{ display: "flex", margin: "2px 0", padding: "0 4px" }}>
        <div style={{ flex: 1.4 }}/>{row3.map(key)}<div style={{ flex: 1.4 }}/>
      </div>
      <div style={{ display: "flex", margin: "4px 0 0", gap: 4 }}>
        <div style={{ flex: 1.4, height: 26, background: "#b8bbc0", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#111" }}>123</div>
        <div style={{ flex: 4, height: 26, background: "#e9ecef", borderRadius: 4 }}/>
        <div style={{
          flex: 1.8, height: 26,
          background: doneActive ? "#111" : "#9a9a9a",
          color: "#fff", borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 600,
          opacity: doneActive ? 1 : 0.55,
        }}>Done</div>
      </div>
    </div>
  );
}

// Parent stub for the dimmed Garage behind the sheet.
function ACSheetBackdrop() {
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "#9a9a9a",
      }}/>
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.35)", zIndex: 1,
      }}/>
    </>
  );
}

// Entry corridor — single corridor screen that covers method choice AND
// KBA / Reg Number input. By Model is always a tappable row; KBA / Reg
// methods (when present) render their input fields inline on the same screen.
// The Continue CTA at the bottom appears only when the user has typed into
// one of the inputs — until then the screen carries no commit affordance,
// because nothing has been entered to commit. ‹ returns to the parent.
function ACEntryCorridor({ methods = ["model"], regValue = "", kbaValues = ["", ""], withKeyboard = false }) {
  const focusKBA = kbaValues.some(v => v !== "");
  const focusReg = regValue !== "";
  const showContinue = focusKBA || focusReg;
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <ACHeader title="Add Car" />
      <div style={{
        position: "absolute", top: 76, left: 0, right: 0,
        bottom: showContinue ? 76 : 0,
        padding: "16px 16px", overflow: "hidden",
      }}>
        <div style={{ fontSize: 12, color: "#6b6b6b", marginBottom: 14, lineHeight: 1.45 }}>
          Select your vehicle so every part on Autodoc is filtered to fit it.
        </div>

        {methods.includes("model") && (
          <div style={{
            border: "1px solid #ececec", borderRadius: 10,
            padding: "14px 14px", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: 13, color: "#111", fontWeight: 500,
            marginBottom: methods.length > 1 ? 18 : 0,
          }}>
            <span>By Model</span>
            <span style={{ color: "#9a9a9a" }}>›</span>
          </div>
        )}

        {methods.includes("kba") && (
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em",
              marginBottom: 8,
            }}>By KBA number</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{
                flex: 1, height: 40,
                border: focusKBA ? "1.5px solid #111" : "1px solid #d8d8d8",
                borderRadius: 8, padding: "0 12px",
                display: "flex", alignItems: "center",
                fontSize: 12, color: kbaValues[0] ? "#111" : "#c8c8c8",
              }}>{kbaValues[0] || "Placeholder"}</div>
              <div style={{
                flex: 1, height: 40,
                border: focusKBA ? "1.5px solid #111" : "1px solid #d8d8d8",
                borderRadius: 8, padding: "0 12px",
                display: "flex", alignItems: "center",
                fontSize: 12, color: kbaValues[1] ? "#111" : "#c8c8c8",
              }}>{kbaValues[1] || "Placeholder"}</div>
            </div>
          </div>
        )}

        {methods.includes("reg") && (
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em",
              marginBottom: 8,
            }}>By Reg Number</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, height: 40,
              border: focusReg ? "1.5px solid #111" : "1px solid #d8d8d8",
              borderRadius: 8, padding: "0 12px",
            }}>
              <div style={{
                width: 26, height: 16, background: "#ececec", borderRadius: 2,
                fontSize: 8, color: "#6b6b6b",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>Flag</div>
              <span style={{ flex: 1, fontSize: 12, color: regValue ? "#111" : "#c8c8c8" }}>
                {regValue || "Enter plate"}
              </span>
            </div>
          </div>
        )}
      </div>
      {showContinue && (
        <div style={{
          position: "absolute", left: 0, right: 0,
          bottom: withKeyboard ? 124 : 0,
          padding: "12px 16px 18px", background: "#fff",
          borderTop: "1px solid #ececec", zIndex: 6,
        }}>
          <div style={{
            height: 44, background: "#111", color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
          }}>Continue</div>
        </div>
      )}
    </div>
  );
}

// Stepper showing 1..N with current / completed / future states.
function ACStepper({ steps = 4, active = 0 }) {
  return (
    <div style={{ padding: "16px 16px 14px", display: "flex", alignItems: "center", gap: 6, background: "#fff" }}>
      {Array.from({ length: steps }).map((_, i) => {
        const completed = i < active;
        const current = i === active;
        return (
          <React.Fragment key={i}>
            <div style={{
              width: 24, height: 24, borderRadius: 4,
              background: completed || current ? "#111" : "#fff",
              border: completed || current ? "1px solid #111" : "1px solid #d8d8d8",
              color: completed || current ? "#fff" : "#9a9a9a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 600,
            }}>{completed ? "✓" : i + 1}</div>
            {i < steps - 1 && (
              <div style={{ flex: 1, height: 1, background: "#ececec" }}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Canonical search field — same shape as List Filtering / Search overlay
// (always-visible field, magnifier glyph, optional Cancel when focused).
function ACStepSearchField({ focused = false }) {
  return (
    <div style={{ padding: "10px 12px", background: "#fff", display: "flex", gap: 8, alignItems: "center" }}>
      <div style={{
        flex: 1, height: 36,
        background: focused ? "#fff" : "#f7f6f4",
        border: focused ? "1.5px solid #111" : "1px solid transparent",
        borderRadius: 10,
        display: "flex", alignItems: "center", padding: "0 12px", gap: 8,
      }}>
        <span style={{ position: "relative", width: 14, height: 14, flexShrink: 0 }}>
          <span style={{ position: "absolute", inset: 0, border: "1.5px solid #6b6b6b", borderRadius: "50%" }}/>
          <span style={{ position: "absolute", right: -3, bottom: -3, width: 6, height: 1.5, background: "#6b6b6b", transform: "rotate(45deg)" }}/>
        </span>
        <span style={{
          flex: 1, fontSize: 12, color: "#9a9a9a",
          fontFamily: '"JetBrains Mono", monospace',
        }}>Search</span>
      </div>
      {focused && (
        <span style={{ fontSize: 12, color: "#111" }}>Cancel</span>
      )}
    </div>
  );
}

function ACSectionTitle({ label }) {
  return (
    <div style={{
      padding: "12px 14px 6px", background: "#fff",
      fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
      color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em",
    }}>{label}</div>
  );
}

function ACPopularTiles({ items = ["AUDI", "BMW", "Brand", "Brand"] }) {
  return (
    <div style={{ padding: "0 14px", background: "#fff", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {items.map((label, i) => (
        <div key={i} style={{
          height: 36, border: "1px solid #ececec", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, color: "#111",
        }}>{label}</div>
      ))}
    </div>
  );
}

function ACPopularRows({ count = 3 }) {
  return (
    <div style={{ padding: "0 14px", background: "#fff", display: "flex", flexDirection: "column", gap: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          height: 44, border: "1px solid #ececec", borderRadius: 8,
          padding: "0 12px", display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontSize: 12, color: "#111" }}>Series, Model name</div>
            <div style={{ fontSize: 9, color: "#9a9a9a" }}>2010-2025</div>
          </div>
          <div style={{ width: 28, height: 28, background: "#ececec", borderRadius: 4 }}/>
        </div>
      ))}
    </div>
  );
}

function ACListRows({ count = 4, label = "Item" }) {
  return (
    <div style={{ background: "#fff" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          padding: "12px 14px", borderBottom: "1px solid #ececec",
          fontSize: 12, color: "#111",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span>{label} {i + 1}</span>
          <span style={{ color: "#9a9a9a", fontSize: 12 }}>›</span>
        </div>
      ))}
    </div>
  );
}

// One step inside the manual selector — header + search + popular + all.
// The step indicator is the title itself («Select Brand», «Select Model»,
// «Select Modification»); no separate stepper bar.
function ACManualStep({ active = 0, title = "Select Make", popularKind = "tiles" }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <ACHeader title={title} />
      <ACStepSearchField />
      <ACSectionTitle label={popularKind === "tiles" ? "Popular car makes" : "Popular models"} />
      {popularKind === "tiles"
        ? <ACPopularTiles />
        : <ACPopularRows />}
      <ACSectionTitle label={popularKind === "tiles" ? "All car makes" : "All models"} />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <ACListRows count={4} label="Item" />
      </div>
    </div>
  );
}

// KBA candidate list — up to 16 options after lookup.
function ACKbaList() {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <ACHeader />
      <div style={{ flex: 1, overflow: "hidden" }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            padding: "12px 14px", borderBottom: "1px solid #ececec",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ width: 36, height: 36, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#111" }}>MERCEDES-BENZ SPRINTER 4-t Pl…</div>
              <div style={{ fontSize: 9, color: "#6b6b6b" }}>414 (904.612, 904.613, 904.612…</div>
            </div>
            <div style={{
              width: 16, height: 16, borderRadius: "50%",
              border: "1.5px solid #d8d8d8", flexShrink: 0,
            }}/>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 16px 22px", borderTop: "1px solid #ececec", background: "#fff" }}>
        <div style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
        }}>Add Car</div>
      </div>
    </div>
  );
}

// Confirmation screen — image + vehicle summary card + Add Car primary.
function ACConfirm() {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <ACHeader />
      <div style={{ flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 140, height: 110, background: "#ececec", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#9a9a9a", fontSize: 28, marginBottom: 18,
        }}>▱</div>
        <div style={{
          width: "100%", border: "1px solid #ececec", borderRadius: 10,
          padding: "14px 14px",
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 6 }}>Volkswagen Golf 5</div>
          <div style={{ fontSize: 11, color: "#6b6b6b", marginBottom: 4 }}>Electro · 3.0 TDI quattro (155 kW / 211 hp)</div>
          <div style={{ fontSize: 11, color: "#6b6b6b" }}>08.2001 – 11.2009</div>
        </div>
      </div>
      <div style={{ padding: "12px 16px 22px", borderTop: "1px solid #ececec", background: "#fff" }}>
        <div style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
        }}>Add Car</div>
      </div>
    </div>
  );
}

function PAddCar() {
  return (
    <Section id="p-addcar">
      <FlowHead
        title="Add a Car"
        journey={["Entry point", "Method choice", "Input", "Lookup", "Confirm", "Saved"]}
        userTypes={["From Garage", "From PLP fitment", "From PDP fitment", "From Profile"]}
        lede={<>The central <span className="hl">identity flow</span> of Autodoc — it puts the user's vehicle in the garage so every list, price and recommendation downstream is filtered to fit it. The flow opens as a focused corridor — header «‹ + Add Car», method choice and KBA / Reg Number input on the same screen, confirmation as the next step. No modal, no sheet. Three lookup methods exist; the user's country decides which configuration appears.</>}
      />


      <FlowCallout>
        Three lookup methods exist: <b>By Model</b> (manual brand → model → modification selector), <b>By KBA number</b> (national identifier, multi-match resolves to a candidate list), <b>By Reg Number</b> (license plate, always single-match). Entry opens a <b>full corridor</b> right away — header «‹ + Add Car», By Model tappable + KBA / Reg inputs inline on the same screen, confirmation as the next step. No modal, no sheet — Ch02 and Ch05 reserve corridors for focused multi-step flows, and this is one. Country governs which methods appear: one slot is always By Model; the second slot is one of the other two, or absent entirely. The user never sees all three at once. All paths converge on one confirmation step except single-match KBA, which lands the car silently.
      </FlowCallout>

      <FlowStage num={1} title="Method choice — first corridor step"
        subtitle="Tap «+ Add Car» on the parent → corridor opens immediately, header carries ‹ + «Add Car». By Model is always a tappable row at the top; KBA or Reg Number (when present) render their input fields inline on the same screen. The Continue CTA at the bottom only appears once the user has typed something — until then the screen carries no commit affordance." />

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>By Model only.</b> Single-method configuration — the corridor body carries one row, By Model. Tapping it advances to the manual selector inside the same corridor.">
          <Phone>
            <ACEntryCorridor methods={["model"]} />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>By Model + By KBA number.</b> Two-method configuration. By Model is tappable (advances to the manual selector); the KBA inputs sit inline below — the user types directly into them.">
          <Phone>
            <ACEntryCorridor methods={["model", "kba"]} />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>By Model + By Reg Number.</b> Two-method configuration with Reg Number as the second slot. By Model is tappable; the Reg Number input sits inline below the row — flag-prefixed, ready for the plate.">
          <Phone>
            <ACEntryCorridor methods={["model", "reg"]} />
          </Phone>
        </FrameCell>
      </div>

      <FlowStage num={2} title="Method paths"
        subtitle="By Model advances to the manual selector. KBA and Reg Number accept their input right on the entry screen — once the user starts typing, a Continue CTA appears at the bottom. Single-match KBA skips the candidate list; ambiguous KBA shows it before confirmation. Reg Number always resolves to one match." />

      <FlowBlock num={1} title="By KBA number"
        summary="User taps a KBA input on the entry screen → keyboard rises → both fields filled → Continue appears at the bottom and commits the lookup. Ambiguous KBA shows the candidate list before confirmation. Single-match lands silently.">

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Typing.</b> Both KBA inputs hold typed values; the keyboard is up; Continue appears at the bottom now that there's something to commit. ‹ returns to the parent.">
          <Phone>
            <ACEntryCorridor methods={["model", "kba"]} kbaValues={["2432837", "2432837"]} withKeyboard />
            <ACKeyboard doneActive />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Candidate list.</b> KBA lookup returned several variants. Each row shows the model, the technical sub-codes, and a radio. The user picks one and taps Add Car at the bottom. A single-match KBA result skips this screen — the car lands in the garage immediately.">
          <Phone>
            <ACKbaList />
          </Phone>
        </FrameCell>
      </div>

      </FlowBlock>

      <FlowBlock num={2} title="By Reg Number"
        summary="User taps the Reg input on the entry screen → keyboard rises → types plate → Continue appears at the bottom. Plate lookup always resolves to a single match; confirmation always follows, no candidate list in between.">

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Typing.</b> The user has typed a plate; keyboard is up; Continue is active at the bottom. Tap Continue to advance to the confirmation step.">
          <Phone>
            <ACEntryCorridor methods={["model", "reg"]} regValue="2432837" withKeyboard />
            <ACKeyboard doneActive />
          </Phone>
        </FrameCell>
      </div>

      </FlowBlock>

      <FlowBlock num={3} title="By Model — manual selector"
        summary="A focused corridor: Brand → Model → Modification. Each step has a stepper, a filter field, a Popular shortlist, and the All long list. Tapping any option auto-advances; ‹ returns and clears the current step. Popular is 2-column tiles for short names, full-width rows for longer ones.">

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Step 1 — Brand.</b> First step. The title names where the user is. Popular brands render as 2-column tiles because the names are short. Tap a brand to advance.">
          <Phone>
            <ACManualStep active={0} title="Select Brand" popularKind="tiles" />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Step 2 — Model.</b> Title swaps to «Select Model». Popular models render as full-width rows with a thumbnail — the names carry a year range that wouldn't fit in a tile.">
          <Phone>
            <ACManualStep active={1} title="Select Model" popularKind="rows" />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Step 3 — Modification.</b> The user picks a specific modification (engine + variant); Popular leads with the common ones, All shows the full set. The final tap advances to the confirmation screen.">
          <Phone>
            <ACManualStep active={2} title="Select Modification" popularKind="rows" />
          </Phone>
        </FrameCell>
      </div>

      </FlowBlock>

      <FlowStage num={3} title="Confirmation — the shared exit"
        subtitle="All paths except a single-match KBA converge into one screen. The user verifies what the system found and taps Add Car to commit. The flow ends here." />

      <FrameRow>
        <FrameCell caption="<b>Confirmation — Add Car.</b> The shared exit. Image of the matched vehicle, model name, modification details. Primary CTA at the bottom commits the car to the garage. ‹ goes back to the previous step (the last step of the manual selector, the candidate list of a KBA lookup, or the Reg Number sheet).">
          <Phone>
            <ACConfirm />
          </Phone>
        </FrameCell>
      </FrameRow>

      <FlowStage num={4} title="Feedback after commit"
        subtitle="Tapping Add Car ends the flow. The corridor dismisses; the user lands on the parent (Garage, search, listing — wherever they came from). The system reports the result via a non-blocking snackbar on the parent." />

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Success — snackbar without action.</b> The car is in the garage; the parent screen has updated; the snackbar reports the result and auto-dismisses. Informational only — there is nothing for the user to confirm or do.">
          <Phone>
            <GarageBase />
            <Curtain position={1} title="Home" showSearch={false}><HomeStub/></Curtain>
            <BottomNav active="home"/>
            <div style={{
              position: "absolute", left: 12, right: 12, bottom: 80,
              background: "#111", color: "#fff", borderRadius: 8,
              padding: "10px 12px", fontSize: 11, zIndex: 5,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}>
              Car added to your garage.
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Failure — snackbar with quiet Retry.</b> The commit didn't go through (server rejected, network blinked between confirmation and save). The car is not in the garage; the snackbar reports the failure with an optional Retry. Non-blocking — the user can tap Retry, ignore it, or come back to it later.">
          <Phone>
            <GarageBase />
            <Curtain position={1} title="Home" showSearch={false}><HomeStub/></Curtain>
            <BottomNav active="home"/>
            <div style={{
              position: "absolute", left: 12, right: 12, bottom: 80,
              background: "#111", color: "#fff", borderRadius: 8,
              padding: "10px 12px", fontSize: 11, zIndex: 5,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span>Couldn't add the car.</span>
              <span style={{ fontWeight: 600 }}>Retry</span>
            </div>
          </Phone>
        </FrameCell>
      </div>

      <p style={{ marginTop: 8 }}>One nuance: this snackbar is for the <b>commit moment</b>, after the user tapped Add Car. A failure earlier in the flow (the lookup itself couldn't reach the server during KBA or Reg Number entry) belongs in the flow — a system alert blocks the next step until the user retries or cancels. Different moment, different surface.</p>

      <FlowStage num={5} title="Entry points — where this flow is invoked from"
        subtitle="Add a Car is reached from multiple surfaces across the app. Each entry opens the same corridor; the flow ends the same way — snackbar on the parent." />

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Empty My AUTODOC — no car yet.</b> Cold start. The dark base layer holds a single dashed «+» tile and «Add your car / VIN, plate or photo — 30 seconds». No other content on the base — the empty state itself is the only affordance. The curtain peeks at the bottom holding the bottom nav. Tap the tile → Add Car corridor opens.">
          <Phone>
            <div className="layer-base" style={{ position: "absolute", inset: 0, background: "#222" }}>
              <StatusBar tone="dark"/>
              <div className="garage-topbar" style={{ position: "absolute", left: 0, right: 0, top: 14 }}>
                <div className="mini-car" style={{ visibility: "hidden" }}>
                  <span className="glyph"/><span>placeholder</span>
                </div>
                <div className="acts">
                  <span className="top-ico gift"><span className="gift-ribbon"/><span className="gift-box"/><span className="dot"/></span>
                  <span className="top-ico avatar"><span className="head"/><span className="shoulders"/><span className="dot"/></span>
                </div>
              </div>
              <div style={{
                position: "absolute", left: 0, right: 0, top: "42%",
                transform: "translateY(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
              }}>
                <div style={{
                  width: 116, height: 80, border: "1.5px dashed #6b6b6b",
                  borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#bdbdbd", fontSize: 28, fontWeight: 300,
                }}>+</div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>Add your car</div>
                <div style={{
                  color: "#9a9a9a", fontSize: 11, textAlign: "center",
                  fontFamily: '"JetBrains Mono", monospace',
                }}>VIN, plate or photo — 30 seconds</div>
              </div>
            </div>
            <Curtain position={0} title="Home" showSearch={false}><HomeStub/></Curtain>
            <BottomNav active="home"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>My AUTODOC with cars — curtain open.</b> The user already has cars in the garage. The garage list shows them as cards; the «+» glyph in the Garage section header is the add-another-car affordance — same place the cars live. Tap → Add Car corridor opens.">
          <Phone>
            <GarageBase />
            <Curtain position={0} title="Home" showSearch={false}><HomeStub/></Curtain>
            <BottomNav active="home"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>From Search — soft warning banner.</b> The user opened search without a car attached to their garage. A non-blocking warning sits above the recent searches: «Be sure to choose a car…» with an inline «Add car» button. Tap the button → Add Car corridor opens over the search overlay. The user can still search — the warning is informational, not blocking.">
          <Phone>
            <div style={{
              position: "absolute", inset: 0, background: "#fff", zIndex: 3,
              display: "flex", flexDirection: "column",
              fontFamily: '-apple-system, "SF Pro Text", sans-serif',
            }}>
              <div style={{ padding: "44px 14px 10px", borderBottom: "1px solid #ececec", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  flex: 1, height: 32, border: "1.5px solid #111", borderRadius: 8,
                  display: "flex", alignItems: "center", padding: "0 10px", gap: 6,
                }}>
                  <div style={{ width: 10, height: 10, border: "1.5px solid #111", borderRadius: "50%", flexShrink: 0 }}/>
                  <span style={{ fontSize: 12, color: "#9a9a9a" }}>Search</span>
                </div>
                <span style={{ fontSize: 12, color: "#111" }}>Cancel</span>
              </div>
              <div style={{
                margin: "10px 14px 0", padding: "10px 12px",
                background: "#fff3e0", borderRadius: 8, display: "flex", gap: 10,
                alignItems: "flex-start",
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: "50%", background: "#ff9800",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>!</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#111", lineHeight: 1.4, marginBottom: 8 }}>
                    Be sure to choose a car, otherwise you risk to buy an item that does not fit your car.
                  </div>
                  <div style={{
                    display: "inline-block", padding: "6px 12px", background: "#111", color: "#fff",
                    borderRadius: 6, fontSize: 11, fontWeight: 600,
                  }}>Add car</div>
                </div>
              </div>
              <div style={{ padding: "16px 14px 4px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em" }}>Recent search</span>
                <span style={{ fontSize: 11, color: "#111" }}>Clear</span>
              </div>
              {["brake pads front", "oil filter"].map((t, i) => (
                <div key={i} style={{ padding: "10px 14px", borderBottom: "1px solid #ececec", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "#111" }}>{t}</span>
                  <span style={{ color: "#9a9a9a", fontSize: 12 }}>×</span>
                </div>
              ))}
            </div>
          </Phone>
        </FrameCell>
      </div>

      <FlowPatternList items={[
        ["My AUTODOC empty state", "garage", "Dark base layer with «+ Add your car» CTA — entry when the user has no cars yet"],
        ["Fitment check on PLP", "p-listfilter", "«Match to your car» chip triggers the sheet when there's no active car"],
        ["Fitment check on PDP", "p-stepper", "Product-detail page can't compute fitment without a car — opens the sheet"],
        ["Profile / Garage management", "garage", "User manually adds a second / third car from the Garage UI"],
      ]}/>

      <FlowStage num={6} title="Pattern dependencies"
        subtitle="What this flow stands on. Add a Car composes existing Part II patterns; the only Add-a-Car-specific pieces are the entry-sheet layout, the candidate-list, and the manual-selector stepper." />

      <FlowPatternList items={[
        ["Modal Views", "p-modal", "Confirmation result screen carries the same shape"],
        ["Step Indicators", "p-multistep", "3-step stepper in the manual selector corridor"],
        ["The Corridor", "fullscreen", "Manual selector is a corridor with no ✕"],
        ["Snackbars", "p-snackbars", "Success / Retry feedback on the parent"],
        ["Dialogs, Alerts & Action Sheets", "p-dialogs", "System alert for in-flow lookup failure"],
        ["Camera Scanner (proposed)", "prop-p-scanner", "Future: VIN scanning as a fourth method"],
      ]}/>
    </Section>
  );
}
window.PAddCar = PAddCar;
