// ---------------------------------------------------------------
// P09 — Loading
// ---------------------------------------------------------------

const { useState: useLD, useEffect: useLDEffect, useRef: useLDRef } = React;

// Real content that appears after the skeleton — mixes a hero image, text bars
// and a list, so the skeleton ↔ content transition is visible at a glance.
function LoadedDetail() {
  return (
    <div style={{ padding: "120px 14px 14px", overflow: "hidden" }}>
      <div style={{
        height: 130, background: "#ececec", borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#9a9a9a", fontSize: 28,
      }}>▱</div>
      <div className="skel-row" style={{ width: "60%", height: 12, margin: "14px 0 0", background: "#b8b8b8", opacity: 0.85 }}/>
      <div className="skel-row" style={{ width: "90%", height: 8, margin: "10px 0 0" }}/>
      <div className="skel-row" style={{ width: "70%", height: 8, margin: "6px 0 0" }}/>
      <div style={{ marginTop: 14 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 0", borderBottom: "1px solid #ececec",
          }}>
            <div style={{ width: 28, height: 28, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div className="skel-row" style={{ width: "55%", height: 8, margin: 0 }}/>
            </div>
            <span style={{ color: "#9a9a9a", fontSize: 14 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton matching the loaded content: hero, title, two text bars, three rows.
function DetailSkeleton() {
  const Bar = ({ w = "100%", h = 10, mt = 8 }) => (
    <div style={{ width: w, height: h, background: "#ececec", borderRadius: 3, marginTop: mt }}/>
  );
  return (
    <div style={{ padding: "120px 14px 14px", overflow: "hidden" }}>
      <div style={{ height: 130, background: "#ececec", borderRadius: 8 }}/>
      <Bar w="70%" h={14} mt={14} />
      <Bar w="100%" />
      <Bar w="60%" />
      <div style={{ marginTop: 14 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 0", borderBottom: "1px solid #ececec",
          }}>
            <div style={{ width: 28, height: 28, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <Bar w="55%" h={9} mt={0} />
              <Bar w="40%" h={8} mt={6} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 1. Skeleton — static, just shows the placeholder state.
function SkeletonLoadingProto() {
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <DetailSkeleton />
    </Phone>
  );
}

// 2. Button preloader — auto-loop animation: idle → ripple → loading → idle.
function ButtonPreloaderProto() {
  const [state, setState] = useLD("idle");
  const timer = useLDRef(null);
  useLDEffect(() => {
    const cycle = { idle: 1200, ripple: 180, loading: 1800 };
    const next = { idle: "ripple", ripple: "loading", loading: "idle" };
    timer.current = setTimeout(() => setState(next[state]), cycle[state]);
    return () => clearTimeout(timer.current);
  }, [state]);
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ padding: "100px 16px 0" }}>
        <LoadingButton state={state} label="Confirm action" />
      </div>
    </Phone>
  );
}

// Shared bottom-anchored snackbar used by both Loading prototypes.
function BottomSnackbar({ text, action, onAction }) {
  return (
    <div style={{
      position: "absolute", left: 12, right: 12, bottom: 16,
      background: "#111", color: "#fff", borderRadius: 8,
      padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
      fontSize: 11, zIndex: 3,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    }}>
      <span style={{ flex: 1 }}>{text}</span>
      {action && (
        <span onClick={onAction} style={{ color: "#fff", fontWeight: 600, cursor: "pointer" }}>{action}</span>
      )}
    </div>
  );
}

// 3. In-place spinner — auto-loop animation: idle → row 1 loading → done +
// snackbar → snackbar dismisses → idle → loop. One row's lifecycle in
// isolation; other rows stay at chevron.
function SpinnerSnackbarProto() {
  const ROWS = 5;
  const widths = ["62%", "78%", "54%", "70%", "60%"];
  const target = 1;
  const [phase, setPhase] = useLD("idle"); // idle → loading → done → idle (loop)
  const timer = useLDRef(null);
  useLDEffect(() => {
    const cycle = { idle: 1000, loading: 1300, done: 2000 };
    const next = { idle: "loading", loading: "done", done: "idle" };
    timer.current = setTimeout(() => setPhase(next[phase]), cycle[phase]);
    return () => clearTimeout(timer.current);
  }, [phase]);
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      <div style={{ paddingTop: 76 }}>
        {Array.from({ length: ROWS }).map((_, i) => {
          const s = i === target ? phase : "idle";
          const active = s === "loading" || s === "done";
          return (
            <div key={i} style={{
              padding: "12px 14px", display: "flex", alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #ececec",
              background: active ? "#f7f6f4" : "transparent",
              transition: "background 0.2s ease-out",
            }}>
              <div style={{ flex: 1 }}>
                <div className="skel-row" style={{ width: widths[i], height: 8, margin: 0 }}/>
              </div>
              {s === "loading" && <Spinner size={12} color="#666" />}
              {s === "done" && <span style={{ color: "#111", fontSize: 14, fontWeight: 700 }}>✓</span>}
              {(s === "idle") && <span style={{ color: "#9a9a9a", fontSize: 14 }}>›</span>}
            </div>
          );
        })}
      </div>
    </Phone>
  );
}

// 4a. Non-blocking failure — content still visible + snackbar with optional Retry.
function NonBlockingFailureProto() {
  const [phase, setPhase] = useLD("loading"); // "loading" | "error"
  const timer = useLDRef(null);
  useLDEffect(() => {
    if (phase !== "loading") return;
    timer.current = setTimeout(() => setPhase("error"), 1500);
    return () => clearTimeout(timer.current);
  }, [phase]);
  const retry = () => setPhase("loading");
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      {phase === "loading"
        ? <DetailSkeleton />
        : <LoadedDetail />}
      {phase === "error" && (
        <BottomSnackbar text="Couldn't refresh prices." action="Retry" onAction={retry} />
      )}
    </Phone>
  );
}

// 4b. Hard container failure — full-container error replacing the body. Single Retry CTA.
function HardContainerFailureProto() {
  const [phase, setPhase] = useLD("loading"); // "loading" | "error"
  const timer = useLDRef(null);
  useLDEffect(() => {
    if (phase !== "loading") return;
    timer.current = setTimeout(() => setPhase("error"), 1500);
    return () => clearTimeout(timer.current);
  }, [phase]);
  const retry = () => setPhase("loading");
  return (
    <Phone>
      <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
      {phase === "loading" ? <DetailSkeleton /> : (
        <div style={{
          position: "absolute", top: 76, left: 0, right: 0, bottom: 0,
          display: "flex", flexDirection: "column", textAlign: "center",
          padding: "0 16px 24px",
        }}>
          <div style={{ paddingTop: 60 }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "#ececec", color: "#6b6b6b", fontSize: 26, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>!</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 6 }}>Couldn't load</div>
            <div style={{ fontSize: 12, color: "#6b6b6b", lineHeight: 1.5 }}>
              Check your connection and try again.
            </div>
          </div>
          <div style={{ flex: 1 }}/>
          <div onClick={retry} style={{
            height: 44, background: "#111", color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>Retry</div>
        </div>
      )}
    </Phone>
  );
}

function P09Loading() {
  return (
    <Section id="p-loading">
      <PatternHead num="01" title="Indeterminate indicators (Preloader)" category="Status"
        lede={<>Every wait is a question the user did not ask. <span className="hl">Indeterminate indicators</span> answer that question — yes, something is happening; no, the app is not broken; here is roughly how much patience you need. Three families cover almost every wait: <b>skeletons</b> for first loads, <b>button preloaders</b> for taps that talk to the server, and <b>in-place spinners</b> for activity that lives inside an existing row.</>} />


      <Callout label="Autodoc reading">
        Every wait is a question. Indicators answer it — yes, something is happening; no, the app is not broken. Autodoc's rule: <b>indeterminate by default</b>. Real progress is rarely knowable, and a fake progress bar that hangs at 90% is worse than an honest spinner. Determinate progress bars belong only where the work has a measurable end — file uploads, file downloads, and web view HTML loads where the page reports its own progress. Everything else is a spinner, a shimmer, or a skeleton: skeletons replace blank screens; button spinners live inside the button that triggered them; in-place spinners live in the row that is loading. When loading fails, the surface choice follows the canonical error taxonomy — non-blocking failures sit as a snackbar (with or without a quiet Retry), and a dead container is replaced by a hard error with its own Retry.
      </Callout>

      <H3>Three families</H3>
      <p>Each indicator lives at a different scope — the whole screen, the button that triggered the wait, or the row where the work is happening. Pick by where the activity is, not by how loud you want to be.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Skeleton — whole screen.</b> A low-fidelity outline of the page filled with grey placeholder shapes during the first load. Mimics the real structure so the eye has somewhere to land. First load only; refreshes use a spinner, never a flash of grey blocks.">
          <SkeletonLoadingProto />
        </FrameCell>
        <FrameCell caption="<b>Button preloader — inside the trigger.</b> The button that started the wait is the single point of feedback: idle → ripple → spinner replaces the label → idle. The rest of the screen stays interactive. Used for local commits (save, confirm, pay). Loops to show the full cycle.">
          <ButtonPreloaderProto />
        </FrameCell>
        <FrameCell caption="<b>In-place spinner — inside the row.</b> When the work belongs to a single row, the chevron is replaced by a spinner while other rows stay alive. A checkmark replaces the spinner on success. Loops to show the full cycle.">
          <SpinnerSnackbarProto />
        </FrameCell>
      </div>

      <H3>When loading fails</H3>
      <p>Loading sometimes doesn't arrive. Failure surfaces follow the canonical error taxonomy. Two cases come up most often during a load: when previous content is still on screen, a non-blocking snackbar acknowledges the failure (with or without a quiet Retry); when there's nothing to fall back on, a hard full-container error replaces the body with its own Retry CTA. The page keeps its title and back arrow either way — the user can always navigate away.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Non-blocking failure.</b> Previous content is still on screen. The skeleton finishes, content appears, then a snackbar at the bottom announces the refresh failed with a quiet Retry. The user can tap it, ignore it, or pull to refresh.">
          <NonBlockingFailureProto />
        </FrameCell>
        <FrameCell caption="<b>Hard container failure.</b> No content to fall back on. The skeleton is replaced by a centered error with a single Retry CTA. The header stays so the user can always navigate away.">
          <HardContainerFailureProto />
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Indeterminate by default.</b> A fake progress bar that hangs at 90% is worse than an honest spinner. Determinate progress only when the work has a measurable end (file uploads, file downloads, embedded HTML loads).",
        "<b>The indicator lives where the work lives.</b> Whole screen → skeleton. The button the user tapped → button preloader. A single row → in-place spinner. Don't move the feedback away from the thing the user is waiting on.",
        "<b>One indicator per surface.</b> A screen full of spinning circles reads as broken. If multiple rows are loading, one bar at the top or one skeleton, not five spinners stacked.",
        "<b>Failures don't strand the user.</b> A non-blocking failure during loading sits as a snackbar with a quiet Retry; a dead container is replaced by a hard error with its own Retry. The page keeps its header — the user can always navigate away.",
      ]}/>

      <DoDont
        doItem="Show a skeleton catalog while products load. The user sees the page structure immediately and the wait feels half as long."
        dontItem="Don't show a full-screen spinner over a screen that already has cached content. The cache is more useful than the wait indicator."
      />
    </Section>
  );
}
window.P09Loading = P09Loading;
