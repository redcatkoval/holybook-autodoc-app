function Ch05Corridor() {
  return (
    <Section id="fullscreen">
      <ChapterHead num="05" title="The Corridor"
        lede="A corridor is a linear flow with a single forward direction to a result. It's a deliberate, single-purpose interruption of the layered world: My AUTODOC and nav are gone, the user has one job, one way back, and one way forward — but the corridor never ends in a dead end." />

      <Callout label="Corridor vs Wizard / Multi-step Flow">
        Corridor is Autodoc's name for a fullscreen, focused flow. Industry vocabulary calls similar things <b>Wizard</b>, <b>Multi-step Flow</b>, or <b>Funnel</b> — but in Autodoc the defining property isn't «multiple steps» or «conversion». It is that the <b>app shell — My AUTODOC and the nav — disappears entirely</b>. A Corridor can be one step or many; what makes it a Corridor is the missing shell, not the number of screens. <b>Why it exists:</b> e-commerce conversion is built on focus. My AUTODOC and the nav are great for browsing — they're <i>distractions</i> when the user has decided to act. The corridor is the surgical removal of distraction, by rule.
      </Callout>

      <H3>When to enter the corridor</H3>
      <Rules items={[
        "<b>Missing data on a money-moving step.</b> Committing requires input we don't have yet.",
        "<b>Identity changes.</b> Onboarding, identity verification, document upload.",
        "<b>Adding to a user profile.</b> Personal data the user is establishing or extending.",
        "<b>Focused input.</b> Anything that needs the full canvas. Usually multi-step, but a single screen qualifies when the task demands full attention. External-clock tasks (booking, insurance) usually qualify.",
      ]}/>

      <H3>Anatomy</H3>
      <FrameRow>
        <FrameCell caption="<b>Final step before the action.</b> The anatomy is identical at every step — only the title and the CTA change. Title carries the single job for this step; the primary CTA carries the verb that commits the corridor. A secondary text button offers a tiny way out — never a second equal-weight button.">
          <div className="annot-phone" style={{padding:"0 320px 0 0"}}>
            <Phone size="lg">
              <div className="layer-full">
                <div className="full-header">
                  <div className="close">‹</div>
                  <div className="title" style={{flex:1, display:"flex", justifyContent:"center"}}><div className="skel-row" style={{width:100, height:10, margin:0}}/></div>
                  <div style={{width:28}}/>
                </div>
                <div className="full-body">
                  <div className="skel-row med"/>
                  <div className="skel-card"><div className="skel-row med"/><div className="skel-row short"/></div>
                  <div className="skel-card"><div className="skel-row med"/><div className="skel-row short"/></div>
                  <div className="skel-card"><div className="skel-row med"/><div className="skel-row short"/></div>
                </div>
                <PrimaryCTA label="Primary action" subbutton="Secondary action"/>
              </div>
            </Phone>
            <div className="anno" style={{top:53,  left:340}}><span className="num">1</span><b>Header.</b> ‹ steps back; if there&apos;s unsaved input, the discard sheet appears first. The centred title names this step&apos;s single job — never a verb (the verb lives on the CTA).</div>
            <div className="anno" style={{top:211, left:340}}><span className="num">2</span><b>Body, single task.</b> One scrollable list of inputs, cards, or summaries. Errors are inline next to the field — never a sheet.</div>
            <div className="anno" style={{top:466, left:340}}><span className="num">3</span><b>CTA + text button.</b> The primary carries the verb that closes the flow. The secondary text button beneath offers a way out — visually subordinate, never an equal-weight button.</div>
          </div>
        </FrameCell>
      </FrameRow>

      <H3>Exit &amp; resume</H3>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Exit confirmation — ‹ <i>or</i> ✕ on the last step of a multi-step corridor.</b> Tapping ‹ with unsaved input, back-swiping, or tapping the optional ✕ on the right of the header opens an Action Sheet asking <i>Discard progress?</i> The destructive option sits last; Cancel keeps editing. ✕ is a deliberate exit affordance — on the right of the header, opposite ‹ — and is only present on the <i>last</i> step of a <i>multi-step</i> corridor. Earlier steps and single-step corridors carry only ‹.">
          <Phone>
            <div className="layer-full" style={{filter:"brightness(0.6)"}}>
              <div className="full-header"><div className="close">‹</div><div className="title" style={{flex:1, display:"flex", justifyContent:"center"}}><div className="skel-row" style={{width:100, height:10, margin:0}}/></div><div className="close" style={{justifyContent:"flex-end", width:28}}>✕</div></div>
              <div className="full-body"><div className="skel-row med"/><div className="skel-row short"/><div className="skel-card"><div className="skel-row med"/></div></div>
            </div>
            <ActionSheet
              prompt="Discard progress? You'll lose what you entered."
              actions={[{ label: "Discard", destructive: true }]}
              cancel="Cancel"
            />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Resume on relaunch.</b> If the user kills the app mid-flow, next launch shows a persistent <i>snackbar</i> at the bottom — never auto-resume into a corridor. Tap <i>View</i> to re-enter the corridor with draft data preserved; otherwise it stays until the user swipes it away.">
          <Phone>
            <GarageBase />
            <Curtain title="Home" showSearch={false}><HomeStub/></Curtain>
            <BottomNav active="home"/>
            <Snackbar
              text="You haven't finished — pick up where you left off."
              action="View"
              persistent
            />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Success exit — never a dead end.</b> Final step ends with a confirmation, plus a primary action that <i>continues the user&apos;s journey</i> — never a bare <i>Done</i> with nowhere to go. The space below the confirmation can surface subordinate content — seasonal categories, accessory shortcuts, offers — so long as the primary CTA stays the boss.">
          <Phone>
            <FinalScreenBody
              icon="✓"
              iconColor="#111"
              title="Done"
              message="Saved · you can continue anytime"
              primary="Primary action"
              secondary="Secondary action"
              marketing={{ kind: "cards", count: 3 }}
            />
          </Phone>
        </FrameCell>
      </div>

      <H3>Discipline</H3>
      <Rules items={[
        "<b>Never two equal-weight buttons.</b> One primary CTA, anchored bottom, carries the verb of the flow. The optional text button beneath is always subordinate — it can be a lateral fork, a defer, a way back to an earlier step, or a way out — never a second equal-weight button.",
        "<b>Always ‹ to step back.</b> The back chevron is present on every step of every regular corridor — single-step or multi-step. No ✕ in the header by default. Exit with unsaved input triggers the discard sheet — never silently drop user input. <i>Why on the left:</i> in LTR locales the direction of reading flows left-to-right, so «backward in time» reads naturally as «to the left». In RTL locales the chevron mirrors.",
        "<b>✕ only on the last step of a multi-step corridor.</b> When a regular corridor has more than one step, the <i>final</i> step may add a ✕ on the right of the header alongside the ‹ on the left, as a deliberate exit affordance for users who have invested fully and want a quick way out. ✕ triggers the same discard sheet as ‹ does; it is never silent. Earlier steps carry only ‹. Single-step corridors carry only ‹ — ✕ would be redundant.",
        "<b>Configurator corridor — ‹ + trailing text action.</b> When the corridor is a <i>configurator</i> (Filters, multi-select pickers, anything where the user composes a set then commits once) the header carries ‹ on the left + a trailing text action on the right — typically <i>Clear all</i> for wiping the in-progress configuration without leaving the corridor. The trailing text action is never a commit; the commit verb lives on the sticky CTA. This is the third header variant alongside ‹-only and ‹ + ✕; it never appears on regular task corridors.",
        "<b>Progress is monotonic.</b> Steps go forward. Edits to earlier input → navigate back to that step, not parallel forms.",
        "<b>Errors are inline.</b> Field-level red text + outline. No modal sheets in the corridor.",
        "<b>Resumability via snackbar, not auto-restore.</b> The user must consent to re-enter the corridor.",
      ]}/>

      <DoDont
        doItem="Make the corridor visibly different — typography sizes up, spacing breathes, the keyboard never overlaps the CTA."
        dontItem="Don't reuse curtain components verbatim. The corridor needs its own larger, more deliberate scale."
      />
    </Section>
  );
}
window.Ch05Corridor = Ch05Corridor;
