"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PreorderForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [eyebrowRef.current, h2Ref.current, leadRef.current, formRef.current].filter(Boolean);
      gsap.fromTo(
        targets,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: innerRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.querySelector<HTMLInputElement>("#po-name");
    const email = form.querySelector<HTMLInputElement>("#po-email");
    const plan = form.querySelector<HTMLSelectElement>("#po-plan");
    const phone = form.querySelector<HTMLInputElement>("#po-phone");

    const newErrors: Record<string, boolean> = {};
    if (!name?.value.trim()) newErrors["name"] = true;
    if (!email?.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) newErrors["email"] = true;
    if (!plan?.value) newErrors["plan"] = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name!.value,
          email: email!.value,
          plan: plan!.value,
          phone: phone?.value || "",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setLoading(false);
      return;
    }

    setLoading(false);

    // Animate form out, success in
    gsap.to(formRef.current, {
      opacity: 0, y: -16, duration: 0.35, ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
        gsap.fromTo(
          successRef.current,
          { opacity: 0, scale: 0.94, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.5)" }
        );
      },
    });
  }

  const inputStyle = (errKey?: string): React.CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: 15,
    background: "rgba(255,255,255,0.07)",
    border: `1px solid ${errKey && errors[errKey] ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: "var(--radius-md)",
    color: "#fff",
    padding: "13px 16px",
    outline: "none",
    transition: "border-color 180ms ease-out, background 180ms ease-out",
    width: "100%",
  });

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="preorder-section"
      style={{
        background: "var(--color-surface-dark)",
        padding: "96px 32px",
        textAlign: "center",
      }}
    >
      <div ref={innerRef} style={{ maxWidth: 600, margin: "0 auto" }}>
        <div
          ref={eyebrowRef}
          style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "1.5px",
            textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
            marginBottom: 16, opacity: 0,
          }}
        >
          Join the waitlist
        </div>
        <h2
          ref={h2Ref}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 500,
            fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05,
            letterSpacing: "-2px", color: "#fff", margin: 0, opacity: 0,
          }}
        >
          Be first to know when we ship.
        </h2>
        <p
          ref={leadRef}
          style={{
            fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.45)",
            marginTop: 16, opacity: 0,
          }}
        >
          From guessing to knowing in minutes. Join the waitlist for early access.
        </p>

        {!submitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            style={{
              marginTop: 32,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
              opacity: 0,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="po-name"
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.4px",
                  color: "rgba(255,255,255,0.45)", textAlign: "left",
                }}
              >
                Full name
              </label>
              <input
                id="po-name"
                type="text"
                placeholder="Jane Smith"
                required
                autoComplete="name"
                style={inputStyle("name")}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.35)";
                  e.target.style.background = "rgba(255,255,255,0.10)";
                }}
                onBlur={(e) => {
                  if (!errors["name"]) {
                    e.target.style.borderColor = "rgba(255,255,255,0.12)";
                    e.target.style.background = "rgba(255,255,255,0.07)";
                  }
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="po-email"
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.4px",
                  color: "rgba(255,255,255,0.45)", textAlign: "left",
                }}
              >
                Email address
              </label>
              <input
                id="po-email"
                type="email"
                placeholder="jane@example.com"
                required
                autoComplete="email"
                style={inputStyle("email")}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.35)";
                  e.target.style.background = "rgba(255,255,255,0.10)";
                }}
                onBlur={(e) => {
                  if (!errors["email"]) {
                    e.target.style.borderColor = "rgba(255,255,255,0.12)";
                    e.target.style.background = "rgba(255,255,255,0.07)";
                  }
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="po-plan"
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.4px",
                  color: "rgba(255,255,255,0.45)", textAlign: "left",
                }}
              >
                I&apos;m interested in
              </label>
              <select
                id="po-plan"
                required
                defaultValue=""
                style={{
                  ...inputStyle("plan"),
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.35)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  backgroundBlendMode: "normal",
                  paddingRight: 40,
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Select a plan…
                </option>
                <option value="Solo" style={{ background: "#1a1a1a", color: "#fff" }}>Solo</option>
                <option value="Family" style={{ background: "#1a1a1a", color: "#fff" }}>Family</option>
                <option value="Fleet" style={{ background: "#1a1a1a", color: "#fff" }}>Fleet</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="po-phone"
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.4px",
                  color: "rgba(255,255,255,0.45)", textAlign: "left",
                }}
              >
                Phone number{" "}
                <span style={{ opacity: 0.45, fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                id="po-phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
                style={inputStyle()}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.35)";
                  e.target.style.background = "rgba(255,255,255,0.10)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.12)";
                  e.target.style.background = "rgba(255,255,255,0.07)";
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-on-color"
              style={{ marginTop: 4, width: "100%", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Submitting…" : "Join the waitlist →"}
            </button>
            {serverError && (
              <p style={{ fontSize: 13, color: "rgba(239,68,68,0.85)", marginTop: 4, textAlign: "center" }}>
                {serverError}
              </p>
            )}
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
              No payment, no commitment. We&apos;ll email you when your spot opens up.
            </p>
          </form>
        ) : null}

        <div
          ref={successRef}
          style={{
            display: submitted ? "block" : "none",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: "var(--radius-md)",
            padding: 32,
            textAlign: "center",
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            opacity: 0,
          }}
        >
          <div
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(34,197,94,0.18)", color: "#22c55e",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)", fontWeight: 500,
              fontSize: 22, letterSpacing: "-0.3px", color: "#fff", marginBottom: 6,
            }}
          >
            You&apos;re on the list.
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
            We&apos;ll email you as soon as MotorLink is ready for you.
          </div>
        </div>
      </div>
    </section>
  );
}
