"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Triage mock slides in from left
      gsap.fromTo(
        mockRef.current,
        { opacity: 0, x: -48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Triage cards stagger up
      const cards = cardsContainerRef.current?.querySelectorAll(".tm-card-item");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      }

      // Right column slides in from right
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Benefit items stagger in
      const items = itemsRef.current?.querySelectorAll("li");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how"
      style={{ padding: "96px 32px" }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Left: Smart Triage Mock */}
        <div ref={mockRef} style={{ opacity: 0 }}>
          <div
            style={{
              background: "var(--color-surface-card)",
              borderRadius: "var(--radius-xl)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                }}
              >
                Smart triage
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "var(--color-muted)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--color-success)",
                    animation: "livepulse 2.4s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />
                Live scan
              </div>
            </div>

            {/* Triage cards */}
            <div ref={cardsContainerRef}>
              {[
                {
                  rank: 1,
                  rankBg: "rgba(239,68,68,0.1)",
                  rankColor: "#ef4444",
                  code: "P0217",
                  badge: "Pull over now",
                  badgeBg: "rgba(239,68,68,0.1)",
                  badgeColor: "#ef4444",
                  plain: "Engine is overheating",
                  action: "Stop driving — risk of permanent engine damage",
                },
                {
                  rank: 2,
                  rankBg: "rgba(245,158,11,0.1)",
                  rankColor: "#f59e0b",
                  code: "P0420",
                  badge: "Worth a look",
                  badgeBg: "rgba(245,158,11,0.1)",
                  badgeColor: "#f59e0b",
                  plain: "Catalytic converter wearing out",
                  action: "Safe to drive — schedule service within 2 weeks",
                },
                {
                  rank: 3,
                  rankBg: "rgba(34,197,94,0.1)",
                  rankColor: "#22c55e",
                  code: "O2 sensors",
                  badge: "All clear",
                  badgeBg: "rgba(34,197,94,0.1)",
                  badgeColor: "#22c55e",
                  plain: "Oxygen sensors reading normal",
                  action: "No action needed — next check in 3,000 mi",
                },
              ].map((item) => (
                <div
                  key={item.rank}
                  className="tm-card-item"
                  style={{
                    background: "var(--color-canvas)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-hairline)",
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    marginBottom: 8,
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: item.rankBg,
                          color: item.rankColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {item.rank}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 12,
                          color: "var(--color-muted)",
                        }}
                      >
                        {item.code}
                      </span>
                    </div>
                    <span
                      style={{
                        background: item.badgeBg,
                        color: item.badgeColor,
                        borderRadius: "var(--radius-pill)",
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--color-ink)",
                      lineHeight: 1.25,
                      paddingLeft: 32,
                    }}
                  >
                    {item.plain}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--color-muted)",
                      lineHeight: 1.45,
                      paddingLeft: 32,
                    }}
                  >
                    {item.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Benefit copy */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              marginBottom: 16,
            }}
          >
            Why it works
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(32px, 4vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            Key benefits of knowing your car
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--color-body)",
              marginTop: 16,
            }}
          >
            Our system turns raw OBD-II data into a calm, clear action plan. No jargon. No panic. Just what you need to know.
          </p>

          <ul
            ref={itemsRef}
            style={{
              listStyle: "none",
              padding: 0,
              margin: "32px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {[
              {
                title: "No more guessing",
                body: "Know exactly what's wrong, how serious it is, and what to do next before you ever call a shop.",
              },
              {
                title: "No more overpaying",
                body: "Walk into any repair shop already knowing what your car needs. Pay for the fix, not the diagnosis.",
              },
              {
                title: "No more panic",
                body: 'Every alert is ranked by real urgency. "Pull over now" means pull over. "Watch this" means you\'re fine to drive home.',
              },
            ].map((item) => (
              <li
                key={item.title}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--color-ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <CheckIcon />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--color-ink)",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--color-body)",
                      marginTop: 4,
                    }}
                  >
                    {item.body}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
