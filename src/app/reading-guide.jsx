// ---------------------------------------------------------------
// Reading guide — preface for the book. Sits between Cover and Ch01.
// ---------------------------------------------------------------
function ReadingGuide() {
  return (
    <Section id="reading-guide">
      <header className="chapter-head">
        <div className="chapter-num">Preface</div>
        <h2 className="chapter">How to read this book</h2>
        <p className="lede">
          The minimum context the product team needs before opening the rest of the document.
        </p>
      </header>

      <H3>What this is and for whom</H3>
      <p>
        Holy Book is the documentation of the Autodoc application&apos;s architecture. It is structured in three large parts and is addressed to the <b>teams that build the product</b> — anyone who decides what goes on a screen and how the user moves between them. The book describes the <b>language</b> we use to talk about the application: what each of its elements is, where it lives, how it relates to the others, what states it carries.
      </p>

      <H3>What&apos;s not here</H3>
      <ul className="rules">
        <li><b>Visual specifications</b> (colours, sizes, fonts, weights, motion timings) — these live in the Constanta kit.</li>
        <li><b>Product decisions on specific screens</b> — these live in product specs and mockups.</li>
        <li><b>Concrete copy</b> — that is the content team&apos;s work.</li>
      </ul>

      <H3>Core vocabulary</H3>
      <p>The minimum of terms needed to read on comfortably. The first three are <b>structural</b> — the architecture of the app. The rest are <b>patterns</b> that live inside the structure; their full definitions live in Part II.</p>
      <ul className="rules">
        <li><b>My AUTODOC (Garage)</b> — the persistent dark base layer of the application. Holds the user&apos;s cars, history, addresses, saved items, rewards.</li>
        <li><b>Curtain</b> — the white layer on top of the Garage. Holds the application itself — Home, Catalog, Cart. Rises and falls between three positions, but never disappears entirely. <i>The persistent modal of the app — always present.</i></li>
        <li><b>Corridor</b> — a fullscreen focused flow. Temporarily removes the Garage and the Curtain so the user can do one specific task (onboarding, checkout, verification).</li>
        <li><b>Primary CTA / Secondary / Tertiary / Link</b> — four tiers of tappable elements on a screen, in strict order of weight. Pattern: Part II · Buttons &amp; Footers.</li>
        <li><b>Snackbar / System alert / Action sheet / Non-alerting dialog / Infoblock / Modal Views</b> — temporary overlay patterns. Each has its own anatomy and dismiss rules; pattern files in Part II.</li>
      </ul>

      <H3>Architectural laws</H3>
      <p>Seven rules that hold the entire application together.</p>
      <ol className="rules">
        <li><b>Persistence over navigation.</b> The Garage never disappears — the curtain just covers more or less of it. The user does not «enter the Garage» or «leave it» — it is always underneath them.</li>
        <li><b>Vehicle is sovereign.</b> The active car drives every list, every price, every recommendation. Switching cars re-renders the content; it does not navigate to another screen.</li>
        <li><b>Three structural elements stack in a fixed order.</b> The Garage at the base; the Curtain on top of it; the Corridor temporarily <b>replaces</b> the stack for the duration of a focused flow. Everything else — sheets, alerts, snackbars, dialogs, infoblocks — are <i>patterns</i> that live inside or above the shell, not architectural layers.</li>
        <li><b>The corridor is a deliberate exception.</b> When the user must do one focused task, the application shell goes away and only the task remains. When the corridor exits, the user returns exactly where they were.</li>
        <li><b>States are content.</b> An empty screen, an error, a loading state — these are designed states with copy, an icon, an action. Not «an absence of something», but a piece of product.</li>
        <li><b>Always offer the next step.</b> Every state, every screen, every error offers the user one clear door forward. A screen without an exit is a wall.</li>
        <li><b>One primary per screen.</b> One main verb per screen. The other actions live as Secondary inside a block, as Tertiary beneath the primary, or as a Link to content. Two equal-weight primaries compete — and neither reads as the one.</li>
      </ol>

      <H3>How the three parts relate</H3>
      <ul className="rules">
        <li><b>Part I — Architecture.</b> Tells you <b>where</b> in the application a thing lives, and how surfaces interact with each other. These are the rules of layout and the contracts between layers.</li>
        <li><b>Part II — Pattern Library.</b> Tells you <b>what</b> each specific entity does, what its states look like, and which rules govern it.</li>
        <li><b>Part III — Composed Flows.</b> Tells you <b>how</b> patterns assemble into end-to-end user journeys — Checkout, Authentication, Add a Car. Each flow walks screen by screen through a real user task and names which Part II patterns power each step.</li>
        <li><b>When you build a screen,</b> you take patterns from Part II and place them by the rules of Part I. Part I sets the stage, Part II is the cast, Part III is the play.</li>
      </ul>
    </Section>
  );
}
window.ReadingGuide = ReadingGuide;
