"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import OBDAnimation from "./OBDAnimation";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          h1Ref.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.35"
        )
        .fromTo(
          leadRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          ctasRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        )
        .fromTo(
          trustRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          cardWrapRef.current,
          { opacity: 0, y: 48, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power2.out" },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "80px 32px 0",
        textAlign: "center",
      }}
    >
      {/* Eyebrow */}
      <div
        ref={eyebrowRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          marginBottom: 24,
          opacity: 0,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--color-brand-sky)",
            boxShadow: "0 0 0 4px rgba(78,168,224,0.2)",
            animation: "livepulse 2.4s ease-in-out infinite",
            display: "inline-block",
          }}
        />
        OBD-II Scanner &amp; App
      </div>

      {/* H1 */}
      <h1
        ref={h1Ref}
        className="hero-h1"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(52px, 7.5vw, 84px)",
          lineHeight: 1.0,
          letterSpacing: "-3px",
          color: "var(--color-ink)",
          margin: 0,
          opacity: 0,
        }}
      >
        Your car,
        <br />
        finally in English.
      </h1>

      {/* Lead */}
      <p
        ref={leadRef}
        style={{
          fontSize: 19,
          lineHeight: 1.55,
          color: "var(--color-body)",
          margin: "24px auto 0",
          maxWidth: 560,
          opacity: 0,
        }}
      >
        Plug in, drive easy. We translate every warning light, beep, and cryptic
        fault code into something a human can actually act on.
      </p>

      {/* CTAs */}
      <div
        ref={ctasRef}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: 32,
          flexWrap: "wrap",
          opacity: 0,
        }}
      >
        <a className="btn btn-primary" href="#preorder">
          Join the waitlist →
        </a>
        <a className="btn btn-secondary" href="#features">
          See how it works
        </a>
      </div>

      {/* Trust strip */}
      <div
        ref={trustRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          marginTop: 24,
          fontSize: 13,
          color: "var(--color-muted)",
          opacity: 0,
        }}
      >
        <span>Works with any car after 1996</span>
        <span style={{ color: "var(--color-hairline)" }}>·</span>
        <span>iOS &amp; Android</span>
      </div>

      {/* OBD Animation card */}
      <div
        ref={cardWrapRef}
        style={{
          position: "relative",
          margin: "52px 0 0",
          padding: "24px 0",
          opacity: 0,
        }}
      >
        <OBDAnimation />
      </div>
    </section>
  );
}
