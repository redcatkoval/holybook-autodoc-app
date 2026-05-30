function Ch06States() {
  return (
    <Section id="states">
      <ChapterHead num="06" title="State principles"
        lede="Most apps treat states as afterthoughts. Autodoc treats them as content. These are the principles that govern every empty, loading, error and optimistic state in the book — the moments that earn trust. Visual treatments for each live in their Part II patterns; what follows is the canon they all answer to." />

      <H3>Six principles</H3>
      <Rules items={[
        "<b>States are content.</b> An empty cart, a loading catalog, an outage card — each is a designed screen, with copy, an icon, and one CTA. Not an absence; a piece of product.",
        "<b>Never silent.</b> Every failure or wait produces a visible state — snackbar, inline message, full-card. The user always knows what's happening and what they can do next.",
        "<b>Always offer the next step.</b> Empty states have one CTA; errors have one Retry; loading has a clear path to «keep using cached content». A state without an exit is a wall.",
        "<b>Don't blame the user.</b> No «Invalid input», no «Something went wrong». Say what's expected, what failed, and what the user can try.",
        "<b>Network errors get a clear answer.</b> Pick the surface by where the failure invalidates the screen. An inline message at the field for form validation, a non-blocking snackbar when content is still on screen, a system alert with Retry / Cancel when the user must answer to continue, a hard container error when the container itself can't render. Cached lists keep rendering until the user opts to reload.",
        "<b>Match the layer.</b> Car-related emptiness (no car yet, no orders, no addresses) lives on the dark My AUTODOC layer — the metaphor stays consistent. Browsing emptiness (empty cart, no search results, filtered catalog) lives on the white curtain. Errors stay where the failing container lives; the error pattern covers the four surfaces in detail.",
      ]}/>

      <DoDont
        doItem="Treat each state as a designed screen with copy, restraint, and one clear next step. Pick the lightest surface that fits the failure or absence."
        dontItem="Don't show generic spinners, blank screens, or «No data found» strings. Don't escalate every failure to a full-screen card."
      />

    </Section>
  );
}
window.Ch06States = Ch06States;
