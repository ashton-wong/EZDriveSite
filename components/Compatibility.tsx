"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BRANDS = [
  "Toyota", "Honda", "Ford", "Chevrolet",
  "BMW", "Hyundai", "Nissan", "Kia",
  "Volkswagen", "Audi", "Subaru", "Dodge",
];

export default function Compatibility() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      const tiles = gridRef.current?.querySelectorAll(".brand-tile");
      if (tiles) {
        gsap.fromTo(
          tiles,
          { opacity: 0, scale: 0.82, y: 16 },
          {
            opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.4)", stagger: 0.045,
            scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stories"
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
        {/* Left: copy */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <div
            style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "1.5px",
              textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 16,
            }}
          >
            Universal compatibility
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)", fontWeight: 500,
              fontSize: "clamp(32px, 4vw, 40px)", lineHeight: 1.1,
              letterSpacing: "-1px", color: "var(--color-ink)", margin: 0,
            }}
          >
            Works with the car already in your driveway
          </h2>
          <p
            style={{
              fontSize: 16, lineHeight: 1.55, color: "var(--color-body)", marginTop: 16,
            }}
          >
            Any gas car built after 1996 has an OBD-II port. That&apos;s over 250 million vehicles
            on US roads. EZDrive plugs into all of them.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <a className="btn btn-primary" href="#preorder">
              Get EZDrive →
            </a>
          </div>
        </div>

        {/* Right: brand grid */}
        <div
          ref={gridRef}
          style={{
            background: "var(--color-surface-soft)",
            borderRadius: "var(--radius-xl)",
            padding: 32,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {BRANDS.map((brand) => (
            <div
              key={brand}
              className="brand-tile"
              style={{
                background: "var(--color-canvas)",
                border: "1px solid var(--color-hairline)",
                borderRadius: "var(--radius-md)",
                padding: "12px 8px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--color-ink)",
                textAlign: "center",
                whiteSpace: "nowrap",
                opacity: 0,
              }}
            >
              {brand}
            </div>
          ))}
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              fontSize: 13,
              color: "var(--color-muted)",
              marginTop: 8,
            }}
          >
            + Any vehicle with an OBD-II port
          </div>
        </div>
      </div>
    </section>
  );
}
