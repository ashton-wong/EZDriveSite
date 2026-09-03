"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function setPlan(val: string) {
  const sel = document.getElementById("po-plan") as HTMLSelectElement | null;
  if (sel) sel.value = val;
}

const PLANS = [
  {
    name: "Solo",
    tagline: "Scanner + app for one car",
    popular: false,
    bullets: [
      "Plover scanner included",
      "iOS & Android app",
      "Plain-English fault codes",
      "Real-time vitals",
      "Maintenance reminders",
    ],
  },
  {
    name: "Family",
    tagline: "Up to 4 cars on one account",
    popular: true,
    bullets: [
      "Everything in Solo",
      "Up to 4 vehicles",
      "Shared maintenance log",
      "Multi-driver trip log",
      "Priority support",
    ],
  },
  {
    name: "Fleets",
    tagline: "Designed for SMB fleets",
    popular: false,
    bullets: [
      "Everything in Family",
      "A fleet manager in your pocket",
      "Every vehicle on one dashboard",
      "Keep your business on the road",
      "Avoid unnecessary downtime",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".pr-card-item") ?? [],
        { opacity: 0, y: 48, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="plans"
      className="pr-section"
      style={{
        background: "var(--color-ink)",
        padding: "96px 32px",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: 52, opacity: 0 }}>
          <div
            style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "1.5px",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16,
            }}
          >
            Plans
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)", fontWeight: 500,
              fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05,
              letterSpacing: "-2px", color: "#fff", margin: 0,
            }}
          >
            One scanner.
            <br />
            Your whole driveway.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 16 }}>
            Flexible plans for every kind of driver.
          </p>
        </div>

        {/* Plan cards */}
        <div
          ref={cardsRef}
          className="pr-top-grid"
          style={{
            display: "grid",
            // ponytail: auto-fit drops to 2-up then 1-up on its own, no extra breakpoint
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="pr-card-item"
              style={{
                background: plan.popular ? "var(--color-surface-dark-elev)" : "#161616",
                border: plan.popular
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(255,255,255,0.04)",
                borderRadius: "var(--radius-lg)",
                padding: "36px 32px 32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                opacity: 0,
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute", top: -12, left: 24,
                    background: "var(--color-brand-ochre)", color: "var(--color-ink)",
                    borderRadius: "var(--radius-pill)", padding: "4px 12px",
                    fontSize: 12, fontWeight: 600,
                  }}
                >
                  Most popular
                </div>
              )}

              <div
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: 28, letterSpacing: "-0.5px", color: "#fff",
                }}
              >
                {plan.name}
              </div>
              <div
                style={{
                  fontSize: 13, color: "rgba(255,255,255,0.45)",
                  marginTop: 6, marginBottom: 24,
                }}
              >
                {plan.tagline}
              </div>

              <ul
                style={{
                  listStyle: "none", padding: 0, margin: 0,
                  display: "flex", flexDirection: "column", flex: 1,
                }}
              >
                {plan.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.5,
                      padding: "14px 0",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, marginTop: 1 }}>→</span>
                    {b}
                  </li>
                ))}
              </ul>

              <a
                className="btn btn-on-color"
                href="/#waitlist"
                onClick={() => setPlan(plan.name === "Fleets" ? "Fleet" : plan.name)}
                style={{ width: "100%", marginTop: 28 }}
              >
                Join waitlist — {plan.name === "Fleets" ? "Fleet" : plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
