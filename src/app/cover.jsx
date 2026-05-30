// Tweaks panel + app shell (cover, TOC, all chapters).

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "curtainPos": 0.5,
  "navStyle": "icons-labels",
  "garageStyle": "carousel",
  "activeCar": "BMW 3-series"
}/*EDITMODE-END*/;

function Cover() {
  return (
    <header className="cover">
      <div>
        <Eyebrow>Holy Book</Eyebrow>
        <h1 className="title">The rules that make<br/>Autodoc feel like Autodoc.</h1>
        <p className="lede" style={{maxWidth:"54ch", marginTop:24}}>
          Three parts. Architecture, then patterns, then composed flows. Where things live, how they relate,
          what they do in every state, and how they assemble into end-to-end user journeys. Not the colours,
          not the components — those live in the Constanta kit. This is the language.
        </p>
        <p className="lede" style={{maxWidth:"54ch", marginTop:18, fontStyle:"italic", color:"var(--ink-2)"}}>
          The Holy Book is a constraint. It is also a promise. Every Autodoc surface should feel like a
          continuation of the same idea: <span className="hl">your car at the centre, the world of parts
          and services laid out around it</span>. When in doubt, return to the garage.
        </p>
      </div>
      <div className="cover-foot">
        <div className="cover-meta">
          <div>Audience<span>Teams that build the product</span></div>
          <div>Format<span>Architecture &amp; patterns</span></div>
          <div>Scope<span>Mobile app</span></div>
        </div>
      </div>
    </header>
  );
}
