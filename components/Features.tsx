"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
  bgClass: string;
  iconColor: string;
  iconBg: string;
  titleColor: string;
  bodyColor: string;
  arrowBg: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}

function ZapIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function ActivityIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function ShieldIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
function CalendarIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function MapPinIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function ShareIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
function ArrowUpRightIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    bgClass: "#ff4d8b",
    iconBg: "rgba(255,255,255,0.2)",
    iconColor: "#fff",
    arrowBg: "rgba(255,255,255,0.18)",
    titleColor: "#fff",
    bodyColor: "rgba(255,255,255,0.75)",
    title: "Plain-English codes",
    body: 'P0420? We translate every diagnostic code into plain language: “your catalytic converter is wearing out”',
    icon: <ZapIcon color="#fff" />,
  },
  {
    bgClass: "#0a2020",
    iconBg: "rgba(255,255,255,0.08)",
    iconColor: "#4ea8e0",
    arrowBg: "rgba(255,255,255,0.08)",
    titleColor: "#fff",
    bodyColor: "rgba(255,255,255,0.55)",
    title: "Real-time vitals",
    body: "Watch RPM, coolant, voltage, and more real-time data live. Like a fitness tracker for your engine.",
    icon: <ActivityIcon color="#4ea8e0" />,
  },
  {
    bgClass: "#b8a4ed",
    iconBg: "rgba(255,255,255,0.35)",
    iconColor: "#0a0a0a",
    arrowBg: "rgba(255,255,255,0.35)",
    titleColor: "#0a0a0a",
    bodyColor: "rgba(10,10,10,0.65)",
    title: "Smart triage",
    body: "Safety first, cost second. When something's wrong, we rank it. No more guessing what's actually urgent.",
    icon: <ShieldIcon color="#0a0a0a" />,
  },
  {
    bgClass: "#ffb084",
    iconBg: "rgba(255,255,255,0.4)",
    iconColor: "#0a0a0a",
    arrowBg: "rgba(255,255,255,0.4)",
    titleColor: "#0a0a0a",
    bodyColor: "rgba(10,10,10,0.65)",
    title: "Maintenance memory",
    body: "Oil at 7,500. Tires at 25,000. Brakes when the pads talk back. Plover tracks it so you don't.",
    icon: <CalendarIcon color="#0a0a0a" />,
  },
  {
    bgClass: "#e8b94a",
    iconBg: "rgba(255,255,255,0.4)",
    iconColor: "#0a0a0a",
    arrowBg: "rgba(255,255,255,0.4)",
    titleColor: "#0a0a0a",
    bodyColor: "rgba(10,10,10,0.65)",
    title: "Trip log",
    body: "Every drive saved automatically. A backlog of data so Plover can detect patterns before your car even makes a sound.",
    icon: <MapPinIcon color="#0a0a0a" />,
  },
  {
    bgClass: "#f5f0e0",
    iconBg: "#ebe6d6",
    iconColor: "#0a0a0a",
    arrowBg: "#ebe6d6",
    titleColor: "#0a0a0a",
    bodyColor: "#3a3a3a",
    title: "Mechanic mode",
    body: "Level the playing field. Share a diagnostic report with your mechanic so you both know what needs fixing before the hood even opens.",
    icon: <ShareIcon color="#0a0a0a" />,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 85%",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".feat-card-item");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 56, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="feat-section"
      style={{
        background: "var(--color-surface-dark)",
        marginTop: 80,
        padding: "96px 32px",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        {/* Section header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: 52, opacity: 0 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 16,
            }}
          >
            What Plover does
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#fff",
              margin: 0,
            }}
          >
            Your car knows what&apos;s wrong,
            <br />
            now you can hear it
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.45)",
              margin: "16px auto 0",
              maxWidth: 480,
            }}
          >
            Everything on your dashboard and more, explained like a friend, not a service manual.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="feat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {FEATURE_CARDS.map((card, i) => (
            <div
              key={i}
              className="feat-card-item"
              style={{
                background: card.bgClass,
                borderRadius: "var(--radius-xl)",
                padding: 32,
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 200ms ease-out",
                border: card.bgClass === "#0a2020" ? "1px solid rgba(255,255,255,0.07)" : "none",
                opacity: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-sm)",
                    background: card.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.icon}
                </div>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: card.arrowBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowUpRightIcon color={card.bodyColor} />
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 26,
                    letterSpacing: "-0.5px",
                    lineHeight: 1.1,
                    color: card.titleColor,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    marginTop: 12,
                    color: card.bodyColor,
                  }}
                >
                  {card.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
