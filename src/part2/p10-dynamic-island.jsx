// ---------------------------------------------------------------
// P10 — Dynamic Island
// ---------------------------------------------------------------
function P10DynamicIsland() {
  return (
    <Section id="p-island">
      <PatternHead num="01" title="Dynamic Island" category="System experiences"
        lede={<>The <span className="hl">Dynamic Island</span> is a hub for ongoing background activity on iPhone — a live order, an active call, a music player, an in-progress upload. The pill sits at the top of the screen, stays small while the activity hums in the background, and expands on demand. Autodoc uses it sparingly: only for activities the user genuinely wants to keep an eye on.</>} />


      <Callout label="Autodoc reading">
        The Dynamic Island is Autodoc's most cautious surface. Apple invented it for live activities — calls, music, deliveries. We use it only for activities the user genuinely wants to track in the background: a delivery, a multi-step verification, a payment being processed. Never marketing, never onboarding prompts. The pill earns the user's attention by being silent when nothing is happening, and useful when something is.
      </Callout>

      <H3>Four states</H3>
      <p>The island operates in four states. <b>Compact</b> is the default — one background activity. <b>Minimal</b> appears when two activities run at once: pill on the left, a separate bubble on the right. <b>Expanded</b> grows the island into a banner on long-press, with title, description and a CTA. <b>Alert</b> is reserved for system-level events (battery low, AirDrop, ringer).</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Compact.</b> Default state. One background activity is acknowledged but does not interrupt the user.">
          <Phone>
            <DynamicIsland state="compact" />
            <Stub note="home screen" />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Minimal.</b> Two concurrent activities — primary stays on the left, secondary detaches into a small bubble on the right. Each can be tapped independently.">
          <Phone>
            <DynamicIsland state="minimal" />
            <Stub note="home screen" />
          </Phone>
        </FrameCell>
      </div>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Expanded.</b> Long press grows the island into a banner with title, description, and CTA. The user takes a quick action without leaving the current app.">
          <Phone>
            <DynamicIsland state="expanded" />
            <Stub note="home screen" />
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Alert / system status.</b> The island briefly stretches sideways with a coloured dot and a one-line message — for system-level alerts, not for app marketing.">
          <Phone>
            <DynamicIsland state="alert" />
            <Stub note="home screen" />
          </Phone>
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Background activity only.</b> The island is for things happening behind the scenes — a live delivery, a multi-step verification, a payment processing. Foreground tasks belong in the screen itself.",
        "<b>Two visible activities at most.</b> The OS shows two activities on the pill at once. If you have three things to surface, you have one too many.",
        "<b>Don't fight the OS for priority.</b> Calls and alarms outrank app activities; the system decides which sits on the left. Declare the activity correctly and let the OS place it — engineering around the priority loses the user's trust faster than any feature gains it.",
        "<b>Never marketing or onboarding.</b> The pill earns the user's attention by being silent when nothing is happening and useful when something is. The moment it nags, the user stops trusting it.",
      ]}/>

      <DoDont
        doItem="Show order delivery status in the island. The user sees a pill counting down minutes; a long-press surfaces the live map; one tap opens the order. They never have to switch apps unless they want to."
        dontItem="Don't use the island for promo banners, onboarding nudges, or non-urgent updates. It is a status surface, not a marketing surface — the moment it nags, the user stops trusting it."
      />
    </Section>
  );
}
window.P10DynamicIsland = P10DynamicIsland;
