"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          logoRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          linksRef.current?.querySelectorAll("li") ?? [],
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.4 },
          "-=0.25"
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={navRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--color-canvas)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <nav
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          height: 64,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <a
          ref={logoRef}
          href="/"
          onClick={(e) => {
            // ponytail: same-page scroll; href="/" stays as the fallback
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0 });
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
            textDecoration: "none",
          }}
        >
          <Image
            src="/plover-logo.png"
            alt=""
            width={48}
            height={48}
            className="nav-logo-img"
            style={{ height: 48, width: "auto" }}
            priority
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--color-brand-blue)",
            }}
          >
            Plover
          </span>
        </a>

        <ul
          ref={linksRef}
          className="nav-links"
          style={{
            display: "flex",
            gap: 32,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {[
            { label: "Features", href: "/#features" },
            { label: "How it works", href: "/#how" },
            { label: "Plans", href: "/#plans" },
            { label: "Compatibility", href: "/#stories" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--color-ink)",
                  textDecoration: "none",
                  transition: "opacity 180ms ease-out",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.opacity = "0.5")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.opacity = "1")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div ref={ctaRef} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16, flex: 1 }}>
          <a className="btn btn-primary" href="/#waitlist">
            Join the waitlist →
          </a>
        </div>
      </nav>
    </div>
  );
}
