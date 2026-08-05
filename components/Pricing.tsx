"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function setPlan(val: string) {
  const sel = document.getElementById("po-plan") as HTMLSelectElement | null;
  if (sel) sel.value = val;
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const topCardsRef = useRef<HTMLDivElement>(null);
  const wideRef = useRef<HTMLDivElement>(null);

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

      const cards = topCardsRef.current?.querySelectorAll(".pr-card-item");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 48, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.15,
            scrollTrigger: { trigger: topCardsRef.current, start: "top 82%" },
          }
        );
      }

      gsap.fromTo(
        wideRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: wideRef.current, start: "top 88%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const BULLETS_SOLO = [
    "Plover scanner included",
    "iOS & Android app",
    "Plain-English fault codes",
    "Maintenance reminders",
  ];
  const BULLETS_FAMILY = [
    "Everything in Solo",
    "Up to 4 vehicles",
    "Shared maintenance log",
    "Multi-driver trip log",
    "Priority support",
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
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
            Simple pricing
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

        {/* Top cards */}
        <div
          ref={topCardsRef}
          className="pr-top-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {/* Solo */}
          <div
            className="pr-card-item"
            style={{
              background: "#161616", borderRadius: "var(--radius-lg)",
              padding: 32, display: "flex", flexDirection: "column", gap: 32,
              position: "relative", opacity: 0,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: 28, letterSpacing: "-0.5px", color: "#fff",
                }}
              >
                Solo
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                Scanner + app for one car
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: 48, letterSpacing: "-1.5px", color: "#fff", marginTop: 16,
                }}
              >
                $14.99{" "}
                <span
                  style={{
                    fontFamily: "var(--font-body)", fontSize: 14,
                    fontWeight: 400, color: "rgba(255,255,255,0.4)",
                  }}
                >
                  per month
                </span>
              </div>
            </div>
            <ul
              style={{
                listStyle: "none", padding: 0, margin: 0,
                display: "flex", flexDirection: "column", gap: 10, flex: 1,
              }}
            >
              {BULLETS_SOLO.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.5,
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
              onClick={() => setPlan("Solo")}
              style={{ width: "100%" }}
            >
              Join waitlist — Solo
            </a>
          </div>

          {/* Family */}
          <div
            className="pr-card-item"
            style={{
              background: "var(--color-surface-dark-elev)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "var(--radius-lg)",
              padding: 32, display: "flex", flexDirection: "column", gap: 32,
              position: "relative", opacity: 0,
            }}
          >
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
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: 28, letterSpacing: "-0.5px", color: "#fff",
                }}
              >
                Family
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                Up to 4 cars on one account
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: 48, letterSpacing: "-1.5px", color: "#fff", marginTop: 16,
                }}
              >
                $34.99{" "}
                <span
                  style={{
                    fontFamily: "var(--font-body)", fontSize: 14,
                    fontWeight: 400, color: "rgba(255,255,255,0.4)",
                  }}
                >
                  per month
                </span>
              </div>
            </div>
            <ul
              style={{
                listStyle: "none", padding: 0, margin: 0,
                display: "flex", flexDirection: "column", gap: 10, flex: 1,
              }}
            >
              {BULLETS_FAMILY.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.5,
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
              onClick={() => setPlan("Family")}
              style={{ width: "100%" }}
            >
              Join waitlist — Family
            </a>
          </div>
        </div>

        {/* Fleets (wide) */}
        <div
          ref={wideRef}
          className="pr-fleet-row"
          style={{
            marginTop: 16,
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "var(--radius-lg)",
            padding: "32px 40px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 48,
            alignItems: "center",
            opacity: 0,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)", fontWeight: 500,
                fontSize: 24, letterSpacing: "-0.4px", color: "#fff",
              }}
            >
              Fleets
            </div>
            <div
              style={{
                fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6,
                marginTop: 8, maxWidth: 540,
              }}
            >
              A fleet manager in your pocket. Designed for SMB fleets. Keep your business on the road and avoid unnecessary vehicle downtime.
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32, flexShrink: 0 }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: 40, letterSpacing: "-1px", color: "#fff", lineHeight: 1.2,
                }}
              >
                $9.99
                <br />
                <span
                  style={{
                    fontFamily: "var(--font-body)", fontSize: 14,
                    fontWeight: 400, color: "rgba(255,255,255,0.4)", letterSpacing: 0,
                  }}
                >
                  per vehicle, per month
                </span>
              </div>
            </div>
            <a
              className="btn btn-on-color"
              href="/#waitlist"
              onClick={() => setPlan("Fleet")}
              style={{ whiteSpace: "nowrap" }}
            >
              Join waitlist — Fleet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
