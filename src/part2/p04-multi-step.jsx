// ---------------------------------------------------------------
// P04 — Multi-Step Task Flow
// ---------------------------------------------------------------

// Title-only fullscreen header (no progress bar, just current step name).
// ‹ on intermediate steps; ✕ allowed on the final / result step where stepping back is meaningless (Ch05 carve-out).
function FsStepName({ title, children }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      zIndex: 3, display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        padding: "44px 14px 10px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #ececec",
      }}>
        <div style={{ fontSize: 18, color: "#111", width: 28 }}>‹</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{title}</div>
        <div style={{ width: 28 }}/>
      </div>
      <div style={{ flex: 1, padding: "16px 14px", overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

// Fullscreen body with a thin progress bar flush under the header.
// Shows direction of travel without exposing the number of steps —
// the bar simply fills as the user advances. ‹ throughout intermediate steps.
function FsProgressBar({ progress = 0.5, children }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      zIndex: 3, display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        padding: "44px 14px 10px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontSize: 18, color: "#111", width: 28 }}>‹</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Title</div>
        <div style={{ width: 28 }}/>
      </div>
      <div style={{ height: 3, background: "#ececec", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${progress * 100}%`, background: "#111",
          transition: "width 0.25s ease-out",
        }}/>
      </div>
      <div style={{ flex: 1, padding: "16px 14px", overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

// Fullscreen body with stepper at top instead of progress bar.
// ‹ on intermediate steps; ✕ surfaces only on the final result screen.
function FsStepper({ active = 0, children }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      zIndex: 3, display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        padding: "44px 14px 10px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontSize: 18, color: "#111", width: 28 }}>‹</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Action Title</div>
        <div style={{ width: 28 }}/>
      </div>
      <div style={{ padding: "0 0 12px" }}>
        <Stepper steps={3} active={active} />
      </div>
      <div style={{ flex: 1, padding: "10px 14px", overflow: "hidden", position: "relative", borderTop: "1px solid #ececec" }}>
        {children}
      </div>
    </div>
  );
}

// Body placeholder with 4 stub list rows — used inside the step bodies.
function StepRows() {
  return (
    <div>
      {[0,1,2,3].map(i => (
        <div key={i} style={{
          height: 38, background: "#ececec", borderRadius: 6,
          marginBottom: 8,
        }}/>
      ))}
    </div>
  );
}

// Bottom-pinned single Continue button inside a fullscreen sheet.
function FsContinue({ label = "Continue" }) {
  return (
    <div style={{
      position: "absolute", left: 16, right: 16, bottom: 28,
      height: 44, background: "#111", color: "#fff", borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 600,
    }}>{label}</div>
  );
}

// Orange ↑ arrow annotation used on the bottom-sheet growth frame.
function GrowArrow({ dir = "up" }) {
  const isUp = dir === "up";
  return (
    <svg width="34" height="44" style={{
      position: "absolute", left: "50%", transform: "translateX(-50%)",
      top: -4, zIndex: 6, pointerEvents: "none",
    }}>
      <circle cx="17" cy="14" r="11" fill="#ff5a1f" />
      <path d={isUp ? "M 17 8 L 17 20 M 12 13 L 17 8 L 22 13" : "M 17 20 L 17 8 M 12 15 L 17 20 L 22 15"}
        stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Onboarding-style body — big image, title, body, primary + skip link, dots pagination.
function OnboardingBody() {
  const dots = 4;
  const active = 1;
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff", zIndex: 3,
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{ padding: "44px 14px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 18, color: "#111", width: 28 }}>‹</div>
        <div style={{ width: 28 }} />
      </div>
      <div style={{ flex: 1, padding: "16px 18px 0", display: "flex", flexDirection: "column" }}>
        <div style={{
          height: 180, background: "#ececec", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#9a9a9a", fontSize: 28, marginBottom: 18,
        }}>▱</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#111", marginBottom: 8 }}>Welcome aboard</div>
        <div style={{ fontSize: 13, color: "#6b6b6b", lineHeight: 1.5 }}>
          A short intro to one aspect of the app. The user reads, taps Continue, and lands on the next intro card. The dots below mark the position in the sequence without counting down loudly.
        </div>
        <div style={{ flex: 1 }}/>
      </div>
      <div style={{ display: "flex", gap: 7, justifyContent: "center", padding: "0 0 14px" }}>
        {Array.from({ length: dots }).map((_, i) => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: "50%",
            background: i === active ? "#111" : "#d8d8d8",
          }}/>
        ))}
      </div>
      <div style={{ padding: "0 0 24px" }}>
        <CTAStack primary="Continue" secondary="Skip" />
      </div>
    </div>
  );
}

// Simple input list for the "Continue" advance variant.
function InputStack() {
  return (
    <div>
      {["Full name", "Email", "Phone"].map((label, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: "#6b6b6b", fontFamily: '"JetBrains Mono", monospace', marginBottom: 4 }}>{label}</div>
          <div style={{ height: 38, background: "#f7f6f4", border: "1px solid #ececec", borderRadius: 8 }}/>
        </div>
      ))}
    </div>
  );
}

function P04MultiStep() {
  const anatAnno = { left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45 };

  return (
    <Section id="p-multistep">
      <PatternHead num="02" title="Step Indicators" category="Controls"
        lede={<>A <span className="hl">step indicator</span> shows the user where they are in a multi-step task. Four shapes exist — a step name in the header, a segmented stepper under it, a bottom sheet that grows per step, and pagination dots for onboarding-style sequences. The shape is picked by the host surface and the seriousness of the task; the rules around it (back is non-destructive, one question per step, advance via tap or Continue) are the same across all four.</>} />


      <Callout label="Autodoc reading">
        This is the visual vocabulary for «we are in a multi-step task and the user should see progress». It is not a flow itself — concrete flows (Add a Car, Authentication, Returns, Onboarding) live in Part IV and reference this pattern to pick the right indicator shape. A flow that is otherwise short and single-screen does not need a step indicator at all — the single-screen Checkout, for example, has no steps, so no indicator. Use the indicator when the task is genuinely split.
      </Callout>

      <H3>Three indicator shapes</H3>
      <p>Same fullscreen shell, different progress signal — pick by how loudly the step count should speak.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Step name in the header.</b> The title itself carries the identity of the current step — «Address», «Payment», «Review». Quietest. Good when each step has a memorable name and the user already understands they're inside a flow.">
          <Phone>
            <FsStepName title="Second Step">
              <StepRows />
              <FsContinue />
            </FsStepName>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Segmented stepper.</b> A short stepper pinned under the header makes the journey explicit when the steps are otherwise hard to name — «step 2 of 3». Honest about how much is left.">
          <Phone>
            <FsStepper active={1}>
              <StepRows />
              <FsContinue />
            </FsStepper>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Thin progress bar under the header.</b> A loader-style line flush against the bottom of the header, filling as the user advances. Shows direction of travel without exposing the number of steps. Used when the count is uneven, unknown, or not worth showing.">
          <Phone>
            <FsProgressBar progress={0.55}>
              <StepRows />
              <FsContinue />
            </FsProgressBar>
          </Phone>
        </FrameCell>
      </div>

      <H3>Onboarding — pagination dots</H3>
      <p>A different beast — onboarding cards, intro tours, first-launch tutorials are <i>reading sequences</i>, not goal-directed work. Showing «3 of 7» would count down the moment the user is allowed to leave; pagination dots mark position softly. Each screen carries its own content, a primary Continue, and a Skip text button as a clear way out.</p>

      <FrameRow>
        <FrameCell caption="<b>Onboarding screen with pagination dots.</b> Image, heading, body, a row of dots marking position (one filled, rest dimmed), primary Continue, Skip text button beneath.">
          <Phone size="lg">
            <OnboardingBody />
          </Phone>
        </FrameCell>
      </FrameRow>

      <H3>How a step advances</H3>
      <p>Inside a step, selector controls follow the canonical patterns. The multi-step flow adds one rule — when does the step commit?</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Tap to advance.</b> Single-tap selections — radio rows, single image cards — commit on tap and move to the next step. No bottom CTA. Used for low-stakes single choices where forcing a Continue tap would be friction.">
          <Phone>
            <FsStepName title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>}>
              <div style={{ margin: "-16px -14px 0" }}>
                {[78, 64, 82, 70, 58, 76].map((w, i) => (
                  <div key={i} style={{
                    padding: "14px 14px", display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #ececec",
                  }}>
                    <div className="skel-row" style={{ width: `${w}%`, height: 8, margin: 0, maxWidth: 140 }}/>
                    <span style={{ color: "#9a9a9a", fontSize: 14 }}>›</span>
                  </div>
                ))}
              </div>
            </FsStepName>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Continue button.</b> Multi-input steps (forms), multi-select choices, or commits that cost the user time. The user assembles the step, then taps Continue. A Skip-style alternative, if needed, is a text button beneath.">
          <Phone>
            <FsStepName title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>}>
              <InputStack />
              <FsContinue />
            </FsStepName>
          </Phone>
        </FrameCell>
      </div>

      <Rules items={[
        "<b>One question per step.</b> If a step asks for two unrelated things, it is two steps. The indicator only makes sense over a stack of single-question screens.",
        "<b>Pick one shape — never mix.</b> Step name in header, segmented stepper, progress bar, or pagination dots. Two indicators on the same surface compete and confuse.",
        "<b>Three or fewer steps for segmented and named shapes.</b> More than three is a form with sections, not a stepper. The progress-bar shape can carry more steps because it doesn't count them out loud.",
        "<b>Back is non-destructive, exit is deliberate.</b> ‹ on every intermediate step preserves what was entered in subsequent steps; an exit with unsaved input raises the discard sheet. The final / result step swaps ‹ for ✕ — the flow is complete, stepping back has nothing to revise.",
        "<b>Tap for single choices, Continue for multi-input.</b> Forcing a Continue tap on a one-tap decision is friction; committing a form silently on every field change is reckless.",
      ]}/>

      <DoDont
        doItem="Add a Car's manual selector uses a 3-step segmented stepper: Brand → Model → Modification. Each step is one decision, back is non-destructive, the final tap moves to a confirmation screen."
        dontItem="Don't add a step indicator to a single-screen task just to look thorough. If there is one screen, there are no steps; the indicator is decoration."
      />
    </Section>
  );
}
window.P04MultiStep = P04MultiStep;
window.PStepIndicators = P04MultiStep;
