"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = {
  Product: ["How it works", "Pricing", "Compatible cars", "iOS app", "Android app"],
  Company: ["About", "Stories", "Press", "Careers", "Contact"],
  Support: ["Help center", "Setup guide", "Returns", "Privacy", "Terms"],
};

// ponytail: only the pages that exist get a real href
const HREFS: Record<string, string> = { Privacy: "/privacy" };

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.querySelectorAll(":scope > div") ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.4,
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const linkStyle: React.CSSProperties = {
    fontSize: 14,
    color: "var(--color-body-strong)",
    textDecoration: "none",
    transition: "opacity 180ms ease-out",
    display: "block",
  };

  return (
    <footer
      ref={footerRef}
      style={{
        background: "var(--color-surface-soft)",
        borderTop: "1px solid var(--color-hairline)",
        padding: "64px 32px 32px",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div
          ref={gridRef}
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 48,
            borderBottom: "1px solid var(--color-hairline)",
          }}
        >
          {/* Brand col */}
          <div style={{ opacity: 0 }}>
            <Image
              src="/plover-logo.png"
              alt="Plover"
              width={30}
              height={30}
              style={{ height: 30, width: "auto" }}
            />
            <p
              style={{
                fontSize: 14, color: "var(--color-muted)",
                marginTop: 16, maxWidth: 220, lineHeight: 1.55,
              }}
            >
              Your car, finally in English.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title} style={{ opacity: 0 }}>
              <div
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "1.5px",
                  textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 16,
                }}
              >
                {title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={HREFS[item] ?? "#"}
                      style={linkStyle}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.55")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            fontSize: 13,
            color: "var(--color-muted)",
            flexWrap: "wrap",
            gap: 16,
            opacity: 0,
          }}
        >
          <span>© 2026 Plover</span>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              {
                label: "X / Twitter",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4l16 16M4 20L20 4" />
                  </svg>
                ),
              },
              {
                label: "Instagram",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="3" />
                    <path d="M7 10v7M7 7.01v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: 32, height: 32, borderRadius: "var(--radius-sm)",
                  background: "var(--color-surface-strong)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--color-muted)", textDecoration: "none",
                  transition: "background 180ms ease-out",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--color-surface-card)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--color-surface-strong)")
                }
              >
                {icon}
              </a>
            ))}
          </div>

          <span>
            Terms &amp; Conditions ·{" "}
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
