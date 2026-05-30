// ---------------------------------------------------------------
// P-Empty — Empty States
// ---------------------------------------------------------------

// Shared empty-state composition — content at top, primary CTA pinned at bottom full-width.
function EmptyComposition({ icon, title, body, cta }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100%", minHeight: 360, padding: "30px 0 76px",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 60, height: 60, border: "1.5px solid var(--line)", borderRadius: 14,
          margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, color: "var(--muted)",
        }}>{icon}</div>
        <div style={{ fontSize: 15, fontWeight: 600, marginTop: 14 }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, padding: "0 8px" }}>{body}</div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{
        height: 44, background: "var(--ink)", color: "#fff", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600,
      }}>{cta}</div>
    </div>
  );
}

function PEmpty() {
  const anatAnno = { left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45 };

  return (
    <Section id="p-empty">
      <PatternHead title="Empty States"
        lede={<>Every container in Autodoc has an <span className="hl">empty case</span> — empty cart, no garage yet, no search results, no saved addresses. Three triggers cover all of them: <b>first-time</b> (never had anything), <b>filtered</b> (results don't match), <b>after-action</b> (the user just emptied it). An empty state is not a blank screen — it is a deliberate composition: a small graphic that acknowledges absence, a human-language title, one short paragraph of context, and one primary CTA pointing at the most useful next action.</>} />


      <Callout label="Autodoc reading">
        Empty states are the moments where the app teaches the user. The user is not lost — the system is. The frame stays the same; only the body changes. One anatomy fits every trigger — icon, title, paragraph, primary CTA. The illustration is restrained, the copy is short, the CTA is one. Never a wall, never silence.
      </Callout>

      <H3>Three triggers</H3>
      <p>Same skeleton, different reason. The trigger decides the copy and the CTA — but never the structure.</p>
      <Rules items={[
        "<b>First-time.</b> The user has never had anything in this container. Encouraging copy that teaches what will live here once they act. CTA invites the first action — «Add your first car», «Open catalog», «Browse catalog».",
        "<b>Filtered.</b> The container is empty because of a filter or search query. The CTA removes the filter that caused the emptiness — «Clear filters», «Search all cars». Never broaden the search silently; let the user choose.",
        "<b>After-action.</b> The user just emptied the container themselves — cleared the cart, deleted the last item. Soft confirmation in the copy, CTA offers a useful follow-up — «Cart cleared — keep shopping».",
      ]}/>

      <H3>Variants in the wild</H3>
      <p>Same anatomy, dressed for each container. Five canonical empty states across the app — cart, My AUTODOC, search, orders, addresses. Icon and CTA change per container; the layout never does. The pattern follows the layer it lives on: containers on the white curtain keep the curtain chrome; containers on the dark layer live on the dark base.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Empty cart.</b> Curtain body. Subtle icon, fitment-flavoured copy, primary CTA into Catalog.">
          <Phone>
            <GarageBase />
            <Curtain position={1} title="Cart" showSearch={false}>
              <EmptyComposition icon="◰" title="Cart is empty" body="Browse parts that fit your car." cta="Open catalog" />
            </Curtain>
            <BottomNav active="cart"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Empty My AUTODOC (no car yet).</b> Dark base layer is the empty state itself — a single tap target inviting the first car. The right-side icons stay in the topbar so the user can still reach promos and profile. The curtain holds Home in peek so the bottom nav stays.">
          <Phone>
            <div className="layer-base">
              <StatusBar tone="dark"/>
              <div className="garage-topbar">
                <div />
                <div className="acts">
                  <span className="top-ico gift" title="Promos / referral">
                    <span className="gift-ribbon"/>
                    <span className="gift-box"/>
                    <span className="dot"/>
                  </span>
                  <span className="top-ico avatar" title="Profile">
                    <span className="head"/>
                    <span className="shoulders"/>
                    <span className="dot"/>
                  </span>
                </div>
              </div>
              <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"flex-start", flexDirection:"column", paddingTop: 60}}>
                <div style={{width:120, height:80, border:"1.5px dashed var(--muted-2)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, color:"var(--muted-2)"}}>+</div>
                <div style={{fontSize:14, fontWeight:600, marginTop:14, color:"#f5f3ee"}}>Add your car</div>
                <div className="mono" style={{fontSize:11, opacity:0.6, marginTop:4, maxWidth:200, textAlign:"center", color:"#f5f3ee"}}>VIN, plate or photo — 30 seconds</div>
              </div>
            </div>
            <Curtain position={0} title="Home" showSearch={false}/>
            <BottomNav active="home"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>Filtered: no matches.</b> Used both for search queries that return nothing and for filtered catalogs that match no rows. Title shows what the user searched for; the primary CTA «Search again» pinned above the tab bar removes the cause.">
          <Phone>
            <GarageBase />
            {/* Custom curtain matching the canonical CN Catalog shape, but with the
                search term as title (no search field below — empty state replaces it). */}
            <div className="layer-curtain" style={{ top: "14%", bottom: 72 }}>
              <div className="grabber" />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 16px 12px", overflow: "hidden" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "0 0 8px", minHeight: 28,
                }}>
                  <div style={{
                    width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, color: "#111", marginLeft: -4, flexShrink: 0, lineHeight: 1,
                  }}>‹</div>
                  <div style={{
                    flex: 1, minWidth: 0,
                    fontSize: 17, fontWeight: 600, color: "#111", letterSpacing: "-0.01em",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>brakekitt</div>
                  <div style={{
                    width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="#111" strokeWidth="1.6" strokeLinecap="round">
                      <circle cx="9" cy="9" r="6"/>
                      <line x1="13.5" y1="13.5" x2="18" y2="18"/>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px 8px" }}>
                  <div style={{
                    width: 56, height: 56, border: "1.5px solid #d8d8d8", borderRadius: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, color: "#9a9a9a", marginBottom: 14,
                  }}>⌕</div>
                  <div className="skel-row" style={{ width: "65%", height: 10, margin: "0 0 8px", background: "#b8b8b8", opacity: 0.85 }}/>
                  <div className="skel-row" style={{ width: "55%", height: 8, margin: 0 }}/>
                </div>
                <div style={{
                  height: 44, background: "#111", color: "#fff", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 600,
                }}>Search again</div>
              </div>
            </div>
            <BottomNav active="catalog"/>
          </Phone>
        </FrameCell>
      </div>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>No orders yet.</b> First-time on Orders — educational copy explaining what will appear once an order is placed. CTA returns to Catalog.">
          <Phone>
            <div className="layer-base" style={{display:"flex", flexDirection:"column"}}>
              <StatusBar tone="dark"/>
              <div style={{
                marginTop: -13,
                padding:"6px 14px",
                borderBottom:"1px solid rgba(245,243,238,0.12)",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                minHeight: 36,
              }}>
                <div style={{width:28, fontSize:18, color:"#f5f3ee"}}>‹</div>
                <div style={{fontSize:14, fontWeight:600, color:"#f5f3ee"}}>Orders</div>
                <div style={{width:28}}/>
              </div>
              <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px 0", textAlign:"center"}}>
                <div style={{width:60, height:60, border:"1.5px solid rgba(245,243,238,0.3)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:"rgba(245,243,238,0.55)"}}>▣</div>
                <div style={{fontSize:14, fontWeight:600, marginTop:14, color:"#f5f3ee"}}>No orders yet</div>
                <div className="mono" style={{fontSize:11, opacity:0.6, marginTop:4, maxWidth:220, color:"#f5f3ee"}}>Once you place your first order, it'll appear here with status updates.</div>
              </div>
              <div style={{padding:"0 16px 24px"}}>
                <div style={{height:44, background:"#fff", color:"var(--ink)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:600}}>Browse catalog</div>
              </div>
            </div>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>No saved addresses.</b> Same screen shape as the populated Addresses list (header + section + add card) but with an illustration and «No addresses yet» message centered, dark themed.">
          <Phone>
            <div className="layer-base" style={{display:"flex", flexDirection:"column"}}>
              <StatusBar tone="dark"/>
              <div style={{
                marginTop: -13,
                padding:"6px 14px",
                borderBottom:"1px solid rgba(245,243,238,0.12)",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                minHeight: 36,
              }}>
                <div style={{width:28, fontSize:18, color:"#f5f3ee"}}>‹</div>
                <div style={{fontSize:14, fontWeight:600, color:"#f5f3ee"}}>Addresses</div>
                <div style={{width:28}}/>
              </div>
              <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px 0", textAlign:"center"}}>
                <div style={{
                  width:60, height:60, border:"1.5px solid rgba(245,243,238,0.3)", borderRadius:14,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:22, color:"rgba(245,243,238,0.55)",
                }}>⌂</div>
                <div style={{fontSize:14, fontWeight:600, marginTop:14, color:"#f5f3ee"}}>No addresses yet</div>
                <div className="mono" style={{fontSize:11, opacity:0.6, marginTop:4, maxWidth:220, color:"#f5f3ee"}}>Add a delivery address to speed up future orders.</div>
              </div>
              <div style={{padding:"0 16px 24px"}}>
                <div style={{
                  height:44, background:"#fff", color:"var(--ink)", borderRadius:8,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:13, fontWeight:600,
                }}>Add address</div>
              </div>
            </div>
          </Phone>
        </FrameCell>
      </div>

      <Rules items={[
        "<b>Never blank.</b> Every container that can be empty has a designed empty state — icon, title, copy, CTA. No silent screens.",
        "<b>Title in human language.</b> «No orders yet», not «No data found». Copy explains why and what changes it — two lines, plain language. Empty is a state, not an error.",
        "<b>One CTA, pointing at the most useful next action.</b> If a secondary path is needed, it's a text button beneath. When the cause is a filter, the CTA removes that filter — never broaden the search silently.",
        "<b>Match the layer.</b> Containers on the white curtain (cart, catalog) keep the curtain chrome; containers on the dark layer (My AUTODOC, orders, addresses) live on the dark base.",
      ]}/>

      <DoDont
        doItem="Treat each empty state as a designed screen — quiet illustration, plain title, two-line context, one CTA. Pick the icon and CTA per container; keep the layout identical."
        dontItem="Don't show generic «No data found» blanks. Don't stack two equal CTAs. Don't broaden a search silently — let the user choose."
      />
    </Section>
  );
}
window.PEmpty = PEmpty;
