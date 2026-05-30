function Ch07Accessibility() {
  return (
    <Section id="accessibility">
      <ChapterHead num="07" title="Accessibility &amp; touch"
        lede="The Holy Book is meaningless if the app is unusable. Touch targets, contrast, copy, reach — the non-negotiables." />

      <H3>Touch targets &amp; reach</H3>
      <p>Functional accessibility minimums — sizing here is not visual design but the threshold below which the screen becomes unusable. The exact values come from platform guidelines; the kit codifies them as component defaults.</p>
      <ul className="rules">
        <li><b>Minimum tappable area</b> — the platform minimum (44 × 44 pt on iOS HIG). Anything smaller is unreliable for the thumb.</li>
        <li><b>Bottom-nav tab</b> — extra vertical headroom on top of the minimum, because the thumb reaches it without looking.</li>
        <li><b>Curtain drag handle</b> — the visible affordance can be small, but the hit area must extend well beyond it.</li>
        <li><b>Card tap area</b> — the whole card, not just the title.</li>
        <li><b>Spacing between adjacent targets</b> — enough to prevent mis-tap; the platform minimum is the floor, not the goal.</li>
        <li><b>One-handed reach.</b> Primary CTAs sit in the bottom 1/3 of the screen — within the thumb arc on a large phone.</li>
        <li><b>Keyboard never overlaps the primary CTA.</b> The corridor scrolls; the CTA floats above the keyboard.</li>
      </ul>

      <H3>Contrast, type &amp; non-visual access</H3>
      <Rules items={[
        "<b>WCAG AA at minimum.</b> Body text 4.5:1; large text 3:1; UI elements 3:1.",
        "<b>Readable body, restrained legalese.</b> Body copy uses the kit's body scale at minimum; small grey print (terms, disclaimers) belongs only inside disclosure-style sheets, never as primary content.",
        "<b>System text scaling respected.</b> Layouts reflow at the largest accessibility size; no text gets clipped or hidden.",
        "<b>Don't rely on colour or position alone.</b> Fitment status uses ✓/!/✗ glyphs <i>and</i> colour. Active tab uses fill <i>and</i> label colour. The screen reader has something to read on every focusable element — the Garage layer announces the active car (make, model, plate) on focus; the Curtain announces section + position.",
      ]}/>

      <H3>Copy</H3>
      <Rules items={[
        "<b>Plain over clever.</b> \"Front brake pads\" beats \"Stop in style\".",
        "<b>State the result, not the action.</b> Buttons name the outcome — <i>Send invite to Anna</i> beats <i>Send</i>; <i>Save changes</i> beats <i>OK</i>.",
        "<b>Localise units, not just words.</b> Currency, decimal separators, plate formats — all per locale.",
        "<b>Speak to the owner.</b> \"Your BMW\", not \"the vehicle\".",
      ]}/>

      <DoDont
        doItem="Audit every screen at 200% text size, with a screen reader, with reduced motion. If it breaks, it ships broken."
        dontItem="Don't sacrifice the metaphor for accessibility, or accessibility for the metaphor. They must coexist — the Garage announces itself, the Curtain announces its position."
      />
    </Section>
  );
}
window.Ch07Accessibility = Ch07Accessibility;
