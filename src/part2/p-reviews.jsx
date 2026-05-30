// ---------------------------------------------------------------
// P — Reviews & Ratings
// ---------------------------------------------------------------

// Star rating display — 5 stars, filled up to `value`, outlined after.
function RStars({ value = 0, max = 5, size = 14 }) {
  return (
    <div style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{
          fontSize: size, color: i < value ? "#f5b51c" : "#d8d8d8",
          lineHeight: 1,
        }}>{i < value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

// Country flag stub (small grey square with abbreviation).
function RFlag({ code = "FR" }) {
  return (
    <div style={{
      width: 16, height: 12, background: "#ececec", borderRadius: 2,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 7, color: "#6b6b6b", fontWeight: 600,
    }}>{code}</div>
  );
}

// Verified-purchase badge.
function RVerifiedBadge() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 10, color: "#ff5a1f", fontWeight: 600,
    }}>
      <span>✓</span>
      <span>Verified purchase</span>
    </div>
  );
}

// Single review row — placeholders for identity and body, the rating row
// stays real. The pattern is about structure, not about copy.
function RReviewRow({ rating = 5, bodyLines = ["88%", "72%"], withTranslation = false }) {
  return (
    <div style={{
      padding: "14px 16px", borderBottom: "1px solid #ececec",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RFlag code="" />
          <div className="skel-row" style={{ width: 50, height: 8, margin: 0 }}/>
        </div>
        <div className="skel-row" style={{ width: 50, height: 7, margin: 0 }}/>
      </div>
      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
        <RStars value={rating} size={11} />
        <RVerifiedBadge />
      </div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
        {bodyLines.map((w, i) => (
          <div key={i} className="skel-row" style={{ width: w, height: 8, margin: 0 }}/>
        ))}
      </div>
      {withTranslation && (
        <div style={{
          marginTop: 8, fontSize: 11, color: "#6b6b6b", fontWeight: 500,
        }}>See translation</div>
      )}
    </div>
  );
}

// Aggregate rating block — large stars + count + info icon.
function RAggregate({ value = 4, count = 41 }) {
  return (
    <div style={{
      padding: "14px 16px", background: "#f7f6f4",
      borderBottom: "1px solid #ececec",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <RStars value={value} size={18} />
        <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{value}</span>
        <div style={{
          width: 18, height: 18, borderRadius: "50%",
          border: "1.5px solid #ff5a1f",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: "#ff5a1f", fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}>i</div>
      </div>
      <div style={{ fontSize: 11, color: "#6b6b6b", marginTop: 4 }}>
        Based on over {count} customer ratings
      </div>
    </div>
  );
}

// Small rating preview that sits on PDP / PLP cards.
function RRatingInline({ value = 4, count = 63, size = 11 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <RStars value={value} size={size} />
      <span style={{ fontSize: 10, color: "#111", fontWeight: 500 }}>{count} Reviews</span>
    </div>
  );
}

// Reviews list corridor — header + aggregate + auto-scrolling list + sticky
// CTA. The list slowly scrolls upward and loops back to the top, demonstrating
// the corridor's scrollable nature.
function RReviewsList() {
  const reviews = [
    { rating: 5, bodyLines: ["88%", "72%"], withTranslation: true },
    { rating: 4, bodyLines: ["92%", "80%", "60%"] },
    { rating: 5, bodyLines: ["75%", "55%"], withTranslation: true },
    { rating: 3, bodyLines: ["86%", "70%"] },
    { rating: 5, bodyLines: ["80%", "62%"], withTranslation: true },
  ];
  const [offset, setOffset] = useState(0);
  React.useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;
      setOffset(o => (o + dt * 0.018) % 600); // 600 ≈ height of 5 review rows
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        padding: "44px 14px 12px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #ececec", background: "#fff",
      }}>
        <div style={{ width: 28, fontSize: 18, color: "#111" }}>‹</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Reviews</div>
        <div style={{ width: 28 }}/>
      </div>
      <RAggregate value={4} count={41} />
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0,
          transform: `translateY(${-offset}px)`,
        }}>
          {reviews.concat(reviews).map((r, i) => (
            <RReviewRow key={i} {...r} />
          ))}
        </div>
      </div>
      <div style={{
        padding: "12px 16px 22px", borderTop: "1px solid #ececec", background: "#fff",
      }}>
        <div style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
        }}>Write a review</div>
      </div>
    </div>
  );
}

// Info bottom sheet — verification + star calc.
function RInfoSheet() {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      height: "75%", background: "#fff",
      borderRadius: "16px 16px 0 0",
      boxShadow: "0 -8px 24px rgba(0,0,0,0.18)",
      zIndex: 5, display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        width: 36, height: 4, background: "#d8d8d8",
        borderRadius: 2, margin: "8px auto 6px",
      }}/>
      <div style={{
        padding: "8px 16px 12px", textAlign: "center",
        borderBottom: "1px solid #ececec",
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Info</div>
      </div>
      <div style={{ flex: 1, overflow: "hidden", padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 }}>How we verify reviews</div>
        <div style={{ fontSize: 11, color: "#2a2a2a", lineHeight: 1.5, marginBottom: 14 }}>
          The «Verified purchase» tag identifies reviews from customers who actually bought the item in this store. It doesn't apply to items obtained elsewhere.
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 }}>How the star rating is calculated</div>
        <div style={{ fontSize: 11, color: "#2a2a2a", lineHeight: 1.5 }}>
          The score weighs recency, verified-purchase status, and whether the item was kept or returned. The aggregate is shown alongside the count so the user reads both signal and sample size.
        </div>
      </div>
    </div>
  );
}

// Star input (interactive in real use — static here).
function RStarInput({ value = 0, size = 28 }) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", padding: "16px 0 22px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{
          fontSize: size, color: i < value ? "#f5b51c" : "#d8d8d8",
          lineHeight: 1,
        }}>{i < value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

// Combined reviews corridor animation. Cycles: list (auto-scrolls) →
// write idle → stars picked → typing → typing more → list. One continuous
// corridor — the user enters, browses, taps Write a review, fills out, loops.
function ReviewsCorridorAnimation() {
  const [phase, setPhase] = useState("list");
  const timer = React.useRef(null);
  React.useEffect(() => {
    const cycle = {
      list: 4500,
      writeIdle: 1400,
      starsPicked: 1300,
      typingStart: 1800,
      typingMore: 2200,
    };
    const next = {
      list: "writeIdle",
      writeIdle: "starsPicked",
      starsPicked: "typingStart",
      typingStart: "typingMore",
      typingMore: "list",
    };
    timer.current = setTimeout(() => setPhase(next[phase]), cycle[phase]);
    return () => clearTimeout(timer.current);
  }, [phase]);
  if (phase === "list") return <RReviewsList />;
  const stars = phase === "writeIdle" ? 0 : 3;
  const text = phase === "typingMore" ? "Good quality, fits as expected." : "";
  const focused = phase === "typingStart" || phase === "typingMore";
  const withKeyboard = phase === "typingStart" || phase === "typingMore";
  return <RWriteReview stars={stars} text={text} focused={focused} withKeyboard={withKeyboard} />;
}

// Write a review corridor — header + stars + text input + sticky Submit.
function RWriteReview({ stars = 0, text = "", focused = false, withKeyboard = false }) {
  const canSubmit = stars > 0 && text.length > 0;
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        padding: "44px 14px 12px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #ececec",
      }}>
        <div style={{ width: 28, fontSize: 18, color: "#111" }}>‹</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Write a review</div>
        <div style={{ width: 28 }}/>
      </div>
      <RStarInput value={stars} />
      <div style={{ padding: "0 16px" }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: "#6b6b6b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em",
        }}>Review</div>
        <div style={{
          minHeight: 40, padding: "8px 0",
          borderBottom: focused ? "1.5px solid #111" : "1px solid #ececec",
          fontSize: 13, color: text ? "#111" : "#9a9a9a",
        }}>
          {text ? <span>{text}{focused && <span style={{ color: "#111", fontWeight: 400 }}>|</span>}</span> : "Tell us what you think"}
        </div>
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{
        position: "absolute", left: 0, right: 0,
        bottom: withKeyboard ? 124 : 0,
        padding: withKeyboard ? "12px 16px 8px" : "12px 16px 22px",
        borderTop: "1px solid #ececec", background: "#fff",
      }}>
        <div style={{
          height: 44, background: canSubmit ? "#111" : "#d8d8d8",
          color: "#fff", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
          opacity: canSubmit ? 1 : 0.7,
        }}>Submit</div>
      </div>
      {withKeyboard && <RKeyboard />}
    </div>
  );
}

// PLP row-style card with rating inline. Everything except the rating is a
// placeholder — the pattern is about where ratings appear, not about copy.
function RPLPRowWithRating() {
  return (
    <div style={{
      border: "1px solid #ececec", borderRadius: 10, padding: 10,
      display: "flex", gap: 10, background: "#fff",
    }}>
      <div style={{ width: 64, height: 80, background: "#ececec", borderRadius: 6, flexShrink: 0 }}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <div className="skel-row" style={{ width: "40%", height: 6, margin: 0 }}/>
        <div className="skel-row" style={{ width: "75%", height: 9, margin: 0, background: "#b8b8b8", opacity: 0.85 }}/>
        <div className="skel-row" style={{ width: "55%", height: 7, margin: 0 }}/>
        <div style={{ marginTop: 2 }}>
          <RRatingInline value={5} count={63} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4, gap: 8 }}>
          <div className="skel-row" style={{ width: 50, height: 10, margin: 0, background: "#b8b8b8" }}/>
          <div style={{
            height: 26, width: 26, background: "#111", color: "#fff", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 600,
          }}>+</div>
        </div>
      </div>
    </div>
  );
}

// Single comment row inside a review-comments thread.
function RCommentRow({ country, initials, date, body }) {
  return (
    <div style={{ padding: "12px 16px", borderBottom: "1px solid #ececec" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RFlag code={country} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>{initials}</span>
        </div>
        <span style={{ fontSize: 10, color: "#9a9a9a" }}>{date}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: "#111", lineHeight: 1.5 }}>{body}</div>
    </div>
  );
}

// Compact keyboard stub for typing states.
function RKeyboard() {
  const row1 = ["q","w","e","r","t","y","u","i","o","p"];
  const row2 = ["a","s","d","f","g","h","j","k","l"];
  const row3 = ["z","x","c","v","b","n","m"];
  const key = (label, i) => (
    <div key={`${label}-${i}`} style={{
      flex: 1, height: 24, background: "#cfd2d6", borderRadius: 4,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, color: "#111", margin: "0 2px",
    }}>{label}</div>
  );
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      background: "#d3d6da", padding: "5px 4px 7px",
      borderTop: "1px solid #b8bbc0", zIndex: 6,
    }}>
      <div style={{ display: "flex", margin: "2px 0" }}>{row1.map(key)}</div>
      <div style={{ display: "flex", margin: "2px 0", padding: "0 14px" }}>{row2.map(key)}</div>
      <div style={{ display: "flex", margin: "2px 0", padding: "0 4px" }}>
        <div style={{ flex: 1.4 }}/>{row3.map(key)}<div style={{ flex: 1.4 }}/>
      </div>
      <div style={{ display: "flex", margin: "4px 0 0", gap: 4 }}>
        <div style={{ flex: 1.4, height: 24, background: "#b8bbc0", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#111" }}>123</div>
        <div style={{ flex: 4, height: 24, background: "#e9ecef", borderRadius: 4 }}/>
        <div style={{ flex: 1.6, height: 24, background: "#111", color: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600 }}>Send</div>
      </div>
    </div>
  );
}

// Comments-on-a-review bottom sheet — drag handle, context strip, thread, sticky compose.
function RCommentsSheet({ inputValue = "", inputFocused = false, withKeyboard = false }) {
  // No-op marker, just isolating original below to allow precise edits.
  const canSend = inputValue.length > 0;
  return (
    <div style={{
      position: "absolute", left: 0, right: 0,
      bottom: withKeyboard ? 124 : 0,
      top: withKeyboard ? 60 : "12%",
      background: "#fff",
      borderRadius: "16px 16px 0 0",
      boxShadow: "0 -8px 24px rgba(0,0,0,0.18)",
      zIndex: 5, display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        width: 36, height: 4, background: "#d8d8d8",
        borderRadius: 2, margin: "8px auto 6px",
      }}/>
      <div style={{
        padding: "4px 16px 12px",
        fontSize: 14, fontWeight: 600, color: "#111", textAlign: "center",
        borderBottom: "1px solid #ececec",
      }}>Comments</div>
      <div style={{
        padding: "10px 16px 8px", borderBottom: "1px solid #ececec",
        background: "#f7f6f4",
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.12em",
          marginBottom: 4,
        }}>On G. A.'s review</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RStars value={5} size={11} />
          <span style={{ fontSize: 11, color: "#111", lineHeight: 1.4 }}>«Bonne qualité, livraison rapide.»</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <RCommentRow
          country="DE" initials="M. S." date="02/03/2021"
          body="Did you have any issues with fitting on a 2018 BMW?"
        />
        <RCommentRow
          country="FR" initials="G. A." date="02/04/2021"
          body="Aucun problème, parfaitement compatible."
        />
      </div>
      <div style={{
        padding: "10px 16px", borderTop: "1px solid #ececec", background: "#fff",
      }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{
            flex: 1, height: 36, padding: "0 12px",
            border: inputFocused ? "1.5px solid #111" : "1px solid #ececec",
            borderRadius: 18,
            display: "flex", alignItems: "center",
            fontSize: 12, color: inputValue ? "#111" : "#9a9a9a",
          }}>{inputValue || "Write a comment…"}</div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: canSend ? "#111" : "#d8d8d8", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 600,
            opacity: canSend ? 1 : 0.7,
          }}>↑</div>
        </div>
      </div>
    </div>
  );
}

// PDP body with rating row in the place where it usually sits.
function RPDPWithRating() {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        padding: "44px 14px 12px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ width: 28, fontSize: 18, color: "#111" }}>‹</div>
        <div style={{ flex: 1 }}/>
        <div style={{ width: 28 }}/>
      </div>
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div style={{ height: 160, background: "#ececec", borderRadius: 10 }}/>
        <div className="skel-row" style={{ width: "70%", height: 12, margin: "4px 0 0", background: "#b8b8b8", opacity: 0.85 }}/>
        <div className="skel-row" style={{ width: "55%", height: 8, margin: 0 }}/>
        <div style={{ marginTop: 2 }}>
          <RRatingInline value={5} count={63} />
        </div>
        <div className="skel-row" style={{ width: "30%", height: 14, margin: "4px 0 0", background: "#b8b8b8" }}/>
      </div>
      <div style={{ padding: "12px 16px 22px", borderTop: "1px solid #ececec" }}>
        <div style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
        }}>Add to cart</div>
      </div>
    </div>
  );
}

function PReviews() {
  return (
    <Section id="p-reviews">
      <PatternHead num="04" title="Reviews & Ratings" category="Content"
        lede={<><span className="hl">Reviews and ratings</span> are how the user judges a part before buying. They live as a small badge on every product surface (PLP, PDP, mini cards) and expand into a full reviews corridor when the user wants to dig in. Writing a new review is its own corridor; commenting on someone else's review rises as a bottom sheet over the reviews list, so the user never loses the place they came from.</>} />


      <Callout label="Autodoc reading">
        Auto parts are bought on trust — the user can't inspect them physically before they ship. Ratings and reviews give them the social proof. Autodoc shows the aggregate everywhere a product is displayed; the reviews themselves live one tap away. The «Verified purchase» tag and a transparent explanation of how the rating is calculated (via the ⓘ info sheet) keep the system honest. Writing a review is a short corridor — pick stars, write a line, submit. Conversations between users happen in a separate comments corridor attached to each review.
      </Callout>

      <H3>Where ratings appear</H3>
      <p>Aggregate ratings travel with every product surface — same shape, same numbers. The user reads «5★ · 63 Reviews» wherever the product card appears.</p>

      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>PLP card with rating.</b> Each product row carries the rating between the parameters and the price. Tap the card body navigates to the PDP.">
          <Phone>
            <PhoneNavBar title={<div className="skel-row" style={{ width: 80, height: 8, margin: 0 }}/>} left="none" right="none" />
            <div style={{ padding: "84px 14px 0", display: "flex", flexDirection: "column", gap: 10 }}>
              <RPLPRowWithRating />
              <RPLPRowWithRating />
            </div>
            <BottomNav active="catalog"/>
          </Phone>
        </FrameCell>
        <FrameCell caption="<b>PDP rating row.</b> The aggregate sits as a small row under the title — five stars + the review count. Tap takes the user into the reviews corridor.">
          <Phone>
            <RPDPWithRating />
          </Phone>
        </FrameCell>
      </div>

      <H3>Reviews corridor — read and write</H3>
      <p>Tapping the rating opens a fullscreen corridor: header with ‹ back + «Reviews», an aggregate block at the top (large stars + numeric average + ⓘ info trigger + sample-size line), the list of individual reviews, and a sticky <b>Write a review</b> primary at the bottom. Tapping that primary keeps the user inside the same corridor and swaps the body to the writing screen: stars at the top, a «Review» text field, and a Submit primary that stays disabled until the user has both picked at least one star and typed at least one character. Tapping ‹ with unsaved input raises the discard sheet. The ⓘ behaves as a standard infoblock — see the Infoblocks pattern.</p>

      <FrameRow>
        <FrameCell caption="<b>Reviews corridor — full cycle.</b> Reviews list auto-scrolls → Write a review opens with empty stars and disabled Submit → user picks 3 stars → user taps the field, keyboard rises, Submit lifts above it → user finishes typing, Submit activates → back to the list. Loops.">
          <Phone size="lg">
            <ReviewsCorridorAnimation />
          </Phone>
        </FrameCell>
      </FrameRow>

      <H3>Edge cases</H3>
      <ul className="rules">
        <li><b>No reviews yet.</b> The aggregate shows «0 Reviews» (no stars filled). Tapping it still opens the corridor, where an empty state invites the user to be the first.</li>
        <li><b>One review.</b> Aggregate stars are the single review's rating. The list shows one row; Write-a-review CTA is at the bottom as usual.</li>
        <li><b>Writing without login.</b> Tapping Write a review while not signed in routes through the auth corridor first; on return the user lands back in the same compose state with their input preserved.</li>
        <li><b>Submit failure.</b> A Submit tap that doesn't reach the server surfaces a non-blocking snackbar — the user keeps their typed text in the field so they can try again without re-writing.</li>
      </ul>

      <Rules items={[
        "<b>Same rating shape everywhere.</b> The five-star + count row is identical on PLP cards, mini cards, the PDP and inside the reviews list aggregate. The user reads it without re-learning.",
        "<b>Reviews list is a corridor.</b> Full-screen, ‹ back to where the user came from (PDP, PLP, etc.), sticky Write-a-review at the bottom.",
        "<b>Verified purchase is the trust badge.</b> Accent colour, only shown when the reviewer bought the item through Autodoc.",
        "<b>Write a review needs stars and text.</b> Submit is disabled until both are present. Tapping ‹ with unsaved input raises the discard sheet.",
        "<b>See translation only when needed.</b> The link appears only on reviews written in a language different from the app's active language.",
      ]}/>

      <DoDont
        doItem="Show the aggregate rating on every product surface (PLP cards, PDP, mini cards) — same shape, same numbers. Let the user tap into the reviews corridor for the full list."
        dontItem="Don't surface reviews in the cart or checkout — those are commit surfaces, not browse surfaces. Don't gate the Reviews corridor behind login (only writing requires login). Don't auto-translate — let the user opt in with See translation."
      />
    </Section>
  );
}
window.PReviews = PReviews;
