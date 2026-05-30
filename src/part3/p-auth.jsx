// ---------------------------------------------------------------
// P-Auth — Authentication
// ---------------------------------------------------------------

const { useState: useAuth, useEffect: useAuthEffect, useRef: useAuthRef } = React;

// Shared input field with floating label, optional inline error.
function AuthField({ label, value, onChange, type = "text", placeholder, error }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{
        background: "#fff",
        border: `1px solid ${error ? "#c62828" : "#d8d8d8"}`, borderRadius: 10,
        padding: "8px 12px 10px",
      }}>
        <div style={{ fontSize: 10, color: error ? "#c62828" : "#9a9a9a", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 13, color: "#111", minHeight: 16 }}>
          {value
            ? (type === "password" ? "•".repeat(Math.min(value.length, 12)) : value)
            : <span style={{ color: "#c8c8c8" }}>{placeholder || ""}</span>}
        </div>
      </div>
      {error && (
        <div style={{ fontSize: 11, color: "#c62828", marginTop: 6 }}>{error}</div>
      )}
    </div>
  );
}

// Body H1 — repeats the corridor title in heavy weight at the top of the body.
// Same string as the nav-bar title, by design: the nav title labels the
// corridor; the body H1 labels the task. Consistent across all auth screens.
function AuthH1({ children }) {
  return (
    <div style={{
      fontSize: 22, fontWeight: 700, color: "#111",
      marginBottom: 8, lineHeight: 1.2,
    }}>{children}</div>
  );
}

// Forgot password? — tertiary text link, right-aligned, sits directly under
// the Password field. One canonical shape used everywhere it appears.
function AuthForgotLink() {
  return (
    <div style={{ textAlign: "right", margin: "-2px 0 12px" }}>
      <span style={{ fontSize: 12, color: "#6b6b6b", fontWeight: 500 }}>Forgot password?</span>
    </div>
  );
}

// Full-screen auth body wrapper. Title centered in header, optional back arrow.
function AuthFs({ title, back = true, children }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      zIndex: 3, display: "flex", flexDirection: "column",
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
    }}>
      <div style={{
        padding: "44px 14px 10px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #ececec",
      }}>
        <div style={{ fontSize: 18, color: "#111", width: 28 }}>
          {back ? "‹" : ""}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{title}</div>
        <div style={{ width: 28 }} />
      </div>
      <div style={{ flex: 1, padding: "20px 16px 16px", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

// Primary CTA pinned at the bottom + optional subordinate text button.
// `subbutton` = action (no underline, medium weight). `link` = real link (dotted underline).
function AuthCta({ label, subbutton, link, onPrimary }) {
  return (
    <div style={{ position: "absolute", left: 16, right: 16, bottom: 24 }}>
      <div onClick={onPrimary} style={{
        height: 44, background: "#111", color: "#fff", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600, cursor: "pointer",
      }}>{label}</div>
      {subbutton && (
        <div style={{
          marginTop: 12, textAlign: "center", fontSize: 12, color: "#6b6b6b",
          fontWeight: 500,
        }}>{subbutton}</div>
      )}
      {link && (
        <div style={{
          marginTop: 12, textAlign: "center", fontSize: 12, color: "#6b6b6b",
          textDecoration: "underline", textDecorationStyle: "dotted",
          textUnderlineOffset: 3,
        }}>{link}</div>
      )}
    </div>
  );
}

// Compact body intro for auth screens.
function AuthIntro({ subtitle }) {
  return (
    <div style={{ fontSize: 12, color: "#6b6b6b", marginBottom: 16, lineHeight: 1.5 }}>
      {subtitle}
    </div>
  );
}

// 4-digit OTP boxes.
function OtpBoxes({ digits = [], error = false }) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "8px 0 14px" }}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{
          width: 48, height: 48, borderRadius: 10,
          border: `1px solid ${error ? "#c62828" : "#d8d8d8"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 600, color: "#111",
          background: "#fff",
        }}>{digits[i] || ""}</div>
      ))}
    </div>
  );
}

// Google full-width SSO button — outlined Secondary shape so it reads as a
// parallel alternative to the filled Continue primary, not a second primary.
function SsoButtons() {
  return (
    <div style={{
      height: 44, background: "#fff", color: "#111",
      border: "1.5px solid #111", borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      fontSize: 13, fontWeight: 600, cursor: "pointer",
    }}>
      <span style={{
        width: 16, height: 16, borderRadius: "50%", background: "#fff",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, color: "#4285F4",
        border: "1px solid #ececec",
      }}>G</span>
      Continue with Google
    </div>
  );
}

// Entry / Sign in / Sign up — interactive shared body.
function CredentialsForm({ title, subtitle, primary, guestLink, legal, showForgot = false, showSso = true }) {
  const [email, setEmail] = useAuth("");
  const [password, setPassword] = useAuth("");
  const [err, setErr] = useAuth(false);
  const submit = () => {
    if (!email || !password) {
      setErr(true);
      return;
    }
    setErr(false);
  };
  return (
    <AuthFs title={title}>
      <AuthH1>{title}</AuthH1>
      <AuthIntro subtitle={subtitle} />
      <AuthField
        label="Email" value={email}
        onChange={setEmail} placeholder="your@email.com"
        error={err && !email ? "Enter your email" : undefined}
      />
      <AuthField
        label="Password" type="password" value={password}
        onChange={setPassword} placeholder="••••••••"
        error={err && !password ? "Enter your password" : undefined}
      />
      {showForgot && <AuthForgotLink />}
      <div onClick={submit} style={{
        height: 44, background: "#111", color: "#fff", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 4,
      }}>{primary}</div>
      {showSso && (
        <>
          <div style={{ textAlign: "center", fontSize: 11, color: "#9a9a9a", margin: "12px 0" }}>or</div>
          <SsoButtons />
        </>
      )}
      {guestLink && (
        <div style={{
          textAlign: "center", fontSize: 12, color: "#111",
          fontWeight: 600, cursor: "pointer", marginTop: 20,
        }}>{guestLink}</div>
      )}
      {legal && (
        <div style={{
          position: "absolute", left: 16, right: 16, bottom: 18,
          fontSize: 10, color: "#9a9a9a", textAlign: "center", lineHeight: 1.4,
        }}>
          {legal}
        </div>
      )}
    </AuthFs>
  );
}

// Recovery auto-loop animation: sign-in (with Forgot password?) → email → OTP
// empty → OTP filled → new password idle → new password filled → loop.
function RecoveryProto() {
  const [phase, setPhase] = useAuth("signin");
  const timer = useAuthRef(null);
  useAuthEffect(() => {
    const cycle = {
      signin: 2500,
      email: 2000,
      otpEmpty: 1500,
      otpFilled: 2000,
      pwdIdle: 1500,
      pwdFilled: 2000,
    };
    const next = {
      signin: "email",
      email: "otpEmpty",
      otpEmpty: "otpFilled",
      otpFilled: "pwdIdle",
      pwdIdle: "pwdFilled",
      pwdFilled: "signin",
    };
    timer.current = setTimeout(() => setPhase(next[phase]), cycle[phase]);
    return () => clearTimeout(timer.current);
  }, [phase]);

  if (phase === "signin") {
    return (
      <AuthFs title="Sign in or Sign up">
        <AuthH1>Sign in or Sign up</AuthH1>
        <AuthIntro subtitle="Enter your account or create a new one to continue." />
        <AuthField label="Email" value="you@example.com" placeholder="your@email.com" />
        <AuthField label="Password" type="password" value="" placeholder="••••••••" />
        <AuthForgotLink />
        <div style={{
          height: 44, background: "#111", color: "#fff", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, marginTop: 4,
        }}>Continue</div>
      </AuthFs>
    );
  }
  if (phase === "email") {
    return (
      <AuthFs title="Forgot your password?">
        <AuthH1>Forgot your password?</AuthH1>
        <AuthIntro subtitle="Enter your email address and we'll send you a 4-digit verification code to reset your password." />
        <AuthField label="Email" value="you@example.com" placeholder="your@email.com" />
        <AuthCta label="Send code" />
      </AuthFs>
    );
  }
  if (phase === "otpEmpty" || phase === "otpFilled") {
    const digits = phase === "otpFilled" ? [1, 2, 3, 4] : [];
    return (
      <AuthFs title="Enter Code">
        <AuthH1>Enter Code</AuthH1>
        <AuthIntro subtitle="The verification code was sent to your e-mail. Type the 4-digit code below." />
        <OtpBoxes digits={digits} />
        <div style={{
          position: "absolute", left: 16, right: 16, bottom: 24,
        }}>
          <div style={{
            height: 44,
            background: phase === "otpFilled" ? "#111" : "#9a9a9a",
            color: "#fff", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
            opacity: phase === "otpFilled" ? 1 : 0.7,
          }}>Verify</div>
          <div style={{
            marginTop: 12, textAlign: "center", fontSize: 12, color: "#6b6b6b",
            fontWeight: 500, opacity: 0.5,
          }}>Resend code (45s)</div>
        </div>
      </AuthFs>
    );
  }
  // pwdIdle or pwdFilled
  const filled = phase === "pwdFilled";
  return (
    <AuthFs title="Enter new password">
      <AuthH1>Enter new password</AuthH1>
      <AuthIntro subtitle="Enter a new password to access your account." />
      <AuthField label="New password" type="password" value={filled ? "12345678" : ""} placeholder="••••••••" />
      <AuthField label="Confirm new password" type="password" value={filled ? "12345678" : ""} placeholder="••••••••" />
      <AuthCta label="Save password" />
    </AuthFs>
  );
}

function PAuth() {
  const anatAnno = { left: 340, maxWidth: 440, fontSize: 10, lineHeight: 1.45 };

  return (
    <Section id="p-auth">
      <FlowHead
        title="Authentication"
        journey={["Entry", "Sign in / Sign up", "Done"]}
        userTypes={["From Cart", "From Profile", "From deep link", "From cold start"]}
        lede={<>The <span className="hl">authentication</span> flow lets the user identify themselves — sign in to an existing account, create a new one, sign in via Google (SSO), or continue as a guest. Authentication lives in a fullscreen corridor: the app shell is gone, the user has one task per step. The flow ends once credentials are collected; everything after — name, address, payment — is the Checkout flow's job.</>}
      />

      <FlowCallout>
        Autodoc's authentication is a corridor flow. The app shell disappears; the user identifies themselves (or skips as guest) and exits into the rest of the app. One primary CTA per screen, with the verb of the action — «Sign in», «Create account», «Send code», «Save password». Form errors that block submission live <b>inline</b> below the field — never in a system alert. The secondary path (continue as a guest, forgot password) is a text button, not a second equal-weight button. SSO sits next to the email form as a deliberate exception: two equal-weight buttons are allowed here because they represent two genuinely parallel auth paths, not a choice the user is meant to weigh. The flow is small on purpose: only credentials and recovery; identity-and-address collection belongs to Checkout.
      </FlowCallout>

      <FlowStage num={1} title="Sign in or Sign up — combined entry"
        subtitle="One entry screen serves both paths and all auth methods. The user types email and password; the system routes — if the email exists it's sign-in, if not it offers to create an account. Below the primary CTA an «or» divider separates Continue with Google. «Continue as a guest» beneath exits the corridor entirely; «Forgot password?» jumps into the recovery sub-flow." />

      <FrameRow>
        <FrameCell caption="<b>Combined entry.</b> Email + password + primary CTA + SSO row + guest link. Empty fields raise inline errors below the field; Continue with Google opens the system SSO chooser; «Continue as a guest» exits the corridor toward checkout.">
          <Phone>
            <CredentialsForm
              title="Sign in or Sign up"
              subtitle="Enter your account or create a new one to continue."
              primary="Continue"
              guestLink="Continue as a guest"
              legal="Please note our Privacy Policy."
              showForgot
            />
          </Phone>
        </FrameCell>
      </FrameRow>

      <FlowStage num={2} title="SSO sign-in"
        subtitle="Tapping Continue with Google opens a system chooser listing Google accounts on the device. Mostly system-provided; Autodoc only owns the disclosure block at the bottom that names what we transfer and links to Terms and Privacy." />

      <FrameRow>
        <FrameCell caption="<b>SSO chooser.</b> System-provided list of accounts. Autodoc adds a disclosure block at the bottom: what data is transferred, plus links to Privacy Policy and Terms.">
          <Phone>
            <div style={{
              position: "absolute", inset: 0, background: "#fff",
              zIndex: 3, display: "flex", flexDirection: "column",
              fontFamily: '-apple-system, "SF Pro Text", sans-serif',
            }}>
              <div style={{
                padding: "44px 14px 14px", textAlign: "center",
                borderBottom: "1px solid #ececec",
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>Choose an account</div>
                <div style={{ fontSize: 11, color: "#6b6b6b", marginTop: 4 }}>to use the Autodoc app</div>
              </div>
              <div style={{ flex: 1, padding: "12px 16px" }}>
                {[0, 1].map(i => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 0", borderBottom: "1px solid #ececec",
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%", background: "#ececec",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 600, color: "#6b6b6b",
                    }}>N</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>Name Surname</div>
                      <div style={{ fontSize: 11, color: "#6b6b6b" }}>youremail@example.com</div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", color: "#6b6b6b", fontSize: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", border: "1px dashed #d8d8d8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>+</div>
                  Add an account
                </div>
              </div>
              <div style={{ padding: "14px 16px 24px", borderTop: "1px solid #ececec", fontSize: 10, color: "#6b6b6b", lineHeight: 1.5 }}>
                In order for you to continue, we'll transfer your name, email address, and profile image to the application. Please review the <span style={{ textDecoration: "underline" }}>Privacy Policy</span> and <span style={{ textDecoration: "underline" }}>Terms and Conditions</span> before using this application.
              </div>
            </div>
          </Phone>
        </FrameCell>
      </FrameRow>

      <FlowStage num={3} title="Guest mode"
        subtitle="«Continue as a guest» exits the auth corridor without collecting credentials. The user lands directly in the next surface — typically the checkout corridor, which captures the minimum personal info inline. The auth pattern's job ends here." />

      <FlowStage num={4} title="Password recovery"
        subtitle="Sub-corridor branching from the entry screen via «Forgot password?». Three steps: email → OTP → new password → return to sign-in. ‹ back preserves forward state; wrong inputs surface as inline errors, never as system alerts." />

      <FrameRow>
        <FrameCell caption="<b>Password recovery.</b> Step 1 — email + Send code → Step 2 — OTP with countdown Resend → Step 3 — new password and confirm. Loops to show the full cycle.">
          <Phone>
            <RecoveryProto />
          </Phone>
        </FrameCell>
      </FrameRow>

      <FlowStage num={5} title="Verification code input"
        subtitle="A 4-digit one-time code, grouped into four boxes. Numeric keyboard, auto-advance between boxes, auto-paste from clipboard. The Resend link counts down from 60 seconds before becoming active — surfacing the cost of a re-send without forbidding it. Wrong code shows a single inline error below the boxes." />

      <FrameRow>
        <FrameCell caption="<b>Verification code — wrong-code state.</b> Four equal boxes, the inline error sits below; Resend is a text button with a countdown.">
          <Phone>
            <AuthFs title="Enter Code">
              <AuthH1>Enter Code</AuthH1>
              <AuthIntro subtitle="The verification code was sent to your e-mail. Type the 4-digit code below." />
              <OtpBoxes digits={[1, 2, 3, 4]} error />
              <div style={{ fontSize: 11, color: "#c62828", textAlign: "center", marginBottom: 8 }}>
                You entered the wrong code
              </div>
              <div style={{
                position: "absolute", left: 16, right: 16, bottom: 24,
              }}>
                <div style={{
                  height: 44, background: "#111", color: "#fff", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 600,
                }}>Verify</div>
                <div style={{
                  marginTop: 12, textAlign: "center", fontSize: 12, color: "#6b6b6b",
                  fontWeight: 500,
                }}>Resend code</div>
              </div>
            </AuthFs>
          </Phone>
        </FrameCell>
      </FrameRow>

      <FlowStage num={6} title="Entry points — where this flow is invoked from"
        subtitle="Authentication is reached from a handful of places. Each entry leads to the same Sign in / Sign up screen; the flow exits where the user came from." />

      <FlowPatternList items={[
        ["Checkout gate", "p-checkout", "Cart → Checkout button triggers Auth for non-signed-in users"],
        ["Profile entry", "ch03-garage", "Profile / Garage area requires identity for some features"],
        ["Deep link", null, "An email or push deep-link lands on a protected screen → Auth opens first"],
        ["Cold start", null, "First app launch optionally invites sign-in; can be skipped to guest"],
      ]}/>

      <FlowStage num={7} title="Pattern dependencies"
        subtitle="What this flow stands on. Authentication composes existing Part II patterns; the only auth-specific pieces are the OTP slot layout and the SSO chooser disclosure block." />

      <FlowPatternList items={[
        ["The Corridor", "fullscreen", "Auth lives in a corridor with no ✕; back arrow only"],
        ["Step Indicators", "p-multistep", "Used inside Password recovery (Email → OTP → New password)"],
        ["Modal Views", "p-modal", "SSO chooser sheet"],
        ["Snackbars", "p-snackbars", "Inline-field errors stay inline; commit-failures use snackbars"],
        ["Dialogs, Alerts & Action Sheets", "p-dialogs", "System alerts for blocking server errors"],
      ]}/>

    </Section>
  );
}
window.PAuth = PAuth;
