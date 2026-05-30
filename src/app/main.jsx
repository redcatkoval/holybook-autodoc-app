function App() {
  return (
    <div className="layout">
      <TOC />
      <main>
        <Cover />
        <ReadingGuide />
        <hr className="rule"/>
        <Ch01Foundation />
        <hr className="rule"/>
        <Ch02Layers />
        <hr className="rule"/>
        <Ch03Garage />
        <hr className="rule"/>
        <Ch04Curtain />
        <hr className="rule"/>
        <Ch05Corridor />
        <hr className="rule"/>
        <Ch06States />
        <hr className="rule"/>
        <Ch07Accessibility />

        <div style={{
          marginTop: 100, marginBottom: 40, paddingTop: 60,
          borderTop: "2px solid var(--ink)",
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
            color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.18em",
            marginBottom: 12,
          }}>Part II</div>
          <h1 className="title" style={{ fontSize: 48 }}>Pattern Library</h1>
          <p className="lede" style={{ maxWidth: "60ch", marginTop: 16 }}>
            The set of Autodoc app patterns. Each is a self-contained reference: the model, the rules, the variants, and the mistakes to avoid. Use Part I to learn how the app is structured; use Part II to look up a specific pattern when you build.
          </p>
        </div>
        <hr className="rule"/>

        {/* Navigation */}
        <P01TabBar />
        <hr className="rule"/>
        <P12Search />
        <hr className="rule"/>
        <PListFilter />
        <hr className="rule"/>

        {/* Surfaces */}
        <P02ModalViews />
        <hr className="rule"/>
        <P03WebView />
        <hr className="rule"/>
        <P06Dialogs />
        <hr className="rule"/>
        <P07Snackbars />
        <hr className="rule"/>
        <P08Infoblocks />
        <hr className="rule"/>
        <P05FinalScreens />
        <hr className="rule"/>

        {/* Controls */}
        <PButtons />
        <hr className="rule"/>
        <P11Dropdown />
        <hr className="rule"/>
        <PFilters />
        <hr className="rule"/>
        <PAccordion />
        <hr className="rule"/>
        <PStepper />
        <hr className="rule"/>
        <P04MultiStep />
        <hr className="rule"/>

        {/* Actions on items */}
        <P12ContextMenu />
        <hr className="rule"/>
        <P13Swipe />
        <hr className="rule"/>

        {/* Status */}
        <P09Loading />
        <hr className="rule"/>
        <PEmpty />
        <hr className="rule"/>
        <PErrors />
        <hr className="rule"/>
        <POptimistic />
        <hr className="rule"/>

        {/* Product */}
        <PReviews />
        <hr className="rule"/>
        <PGallery />
        <hr className="rule"/>

        {/* Promotion */}
        <P14Promo />
        <hr className="rule"/>

        {/* System experiences */}
        <P10DynamicIsland />

        <div style={{
          marginTop: 100, marginBottom: 40, paddingTop: 60,
          borderTop: "2px solid var(--ink)",
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
            color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.18em",
            marginBottom: 12,
          }}>Part III</div>
          <h1 className="title" style={{ fontSize: 48 }}>Composed Flows</h1>
          <p className="lede" style={{ maxWidth: "60ch", marginTop: 16 }}>
            End-to-end user journeys assembled from the Part II patterns. Part II patterns are the bricks; Part III is the houses built from them. Each flow walks screen by screen through a real user task, calls out which patterns power each step, and notes the seams between them. More flows will land here as they get mapped — returns, account recovery, subscription management.
          </p>
        </div>
        <hr className="rule"/>
        <PAuth />
        <hr className="rule"/>
        <PAddCar />
        <hr className="rule"/>
        <PCheckout />

        <div style={{
          marginTop: 60, marginBottom: 24, paddingTop: 24,
          borderTop: "1px dashed var(--line)",
        }}>
          <h2 className="chapter" style={{ fontSize: 32 }}>Not ready</h2>
        </div>
        <hr className="rule"/>

        <P15ProductCard />
        <hr className="rule"/>
        <Pr23ConfirmSheet />
        <hr className="rule"/>
        <PMap />
        <hr className="rule"/>
        <PScanner />

        <Tweaks />
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
