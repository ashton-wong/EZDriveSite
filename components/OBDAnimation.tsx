"use client";

import { useEffect, useRef } from "react";

interface OBDPair {
  codes: { key: string; val: string }[];
  plain: string;
  sub: string;
  badge: "watch" | "ok" | "warn";
  badgeText: string;
}

const PAIRS: OBDPair[] = [
  {
    codes: [
      { key: "P0300", val: "Cylinder misfire" },
      { key: "RPM:", val: "2,400" },
      { key: "O2 V:", val: "0.21 V" },
      { key: "LTFT:", val: "-12%" },
    ],
    plain: "Cylinder misfire detected",
    sub: "Likely your spark plugs — safe to drive, book soon",
    badge: "watch",
    badgeText: "● Watch this",
  },
  {
    codes: [
      { key: "P0420", val: "Cat efficiency" },
      { key: "O2B2S2:", val: "0.78 V" },
      { key: "CAT EFF:", val: "68%" },
      { key: "STFT:", val: "+2.3%" },
    ],
    plain: "Catalytic converter wearing out",
    sub: "No immediate risk — plan a repair in the next 1-2 months",
    badge: "watch",
    badgeText: "● Watch this",
  },
  {
    codes: [
      { key: "MAF:", val: "2.1 g/s" },
      { key: "P0101", val: "MAF circuit" },
      { key: "LOAD:", val: "23%" },
      { key: "STFT:", val: "+18%" },
    ],
    plain: "Air flow sensor reading low",
    sub: "Causes rough idle and poor fuel economy — fix soon",
    badge: "warn",
    badgeText: "● Book this week",
  },
  {
    codes: [
      { key: "BATT:", val: "12.6 V" },
      { key: "ALT:", val: "13.9 V" },
      { key: "SOC:", val: "94%" },
      { key: "CEL:", val: "None" },
    ],
    plain: "Battery and charging look healthy",
    sub: "No issues detected — your electrical system is in great shape",
    badge: "ok",
    badgeText: "● All clear",
  },
];

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export default function OBDAnimation() {
  const cardRef = useRef<HTMLDivElement>(null);
  const codesListRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const hubLabelRef = useRef<HTMLSpanElement>(null);
  const engMainRef = useRef<HTMLDivElement>(null);
  const engSubRef = useRef<HTMLDivElement>(null);
  const engBadgeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);
  const runningRef = useRef(true);

  useEffect(() => {
    runningRef.current = true;

    function spawnParticles(toRight: boolean) {
      const overlay = overlayRef.current;
      const card = cardRef.current;
      const hub = hubRef.current;
      if (!overlay || !card || !hub) return;

      const cr = card.getBoundingClientRect();
      const hr = hub.getBoundingClientRect();
      const hx = hr.left - cr.left + hr.width / 2;
      const hy = hr.top - cr.top + hr.height / 2;
      const n = 8;
      const isVertical = cr.height > cr.width;

      for (let i = 0; i < n; i++) {
        setTimeout(() => {
          const p = document.createElement("div");
          p.className = "hz-pt";
          let sx, sy, ex, ey;
          if (isVertical) {
            if (!toRight) {
              // top panel → hub: particles gather from across raw panel and flow down
              sx = cr.width * 0.1 + Math.random() * cr.width * 0.8;
              sy = cr.height * 0.04 + Math.random() * cr.height * 0.22;
              ex = hx + (Math.random() - 0.5) * 8;
              ey = hy - 26 + Math.random() * 8;
            } else {
              // hub → bottom panel: particles disperse downward into output panel
              sx = hx + (Math.random() - 0.5) * 8;
              sy = hy + 18 + Math.random() * 8;
              ex = cr.width * 0.1 + Math.random() * cr.width * 0.8;
              ey = cr.height * 0.72 + Math.random() * cr.height * 0.22;
            }
          } else if (!toRight) {
            sx = cr.width * 0.06 + Math.random() * cr.width * 0.32;
            sy = hy + (Math.random() - 0.5) * 90;
            ex = hx - 26 + Math.random() * 8;
            ey = hy + (Math.random() - 0.5) * 8;
          } else {
            sx = hx + 18 + Math.random() * 8;
            sy = hy + (Math.random() - 0.5) * 8;
            ex = cr.width * 0.68 + Math.random() * cr.width * 0.26;
            ey = hy + (Math.random() - 0.5) * 70;
          }
          p.style.left = sx + "px";
          p.style.top = sy + "px";
          p.style.opacity = "0";
          overlay.appendChild(p);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const dur = 460 + Math.random() * 80;
              p.style.transition = `left ${dur}ms ease-in-out, top ${dur}ms ease-in-out, opacity ${dur}ms ease-in-out`;
              p.style.left = ex + "px";
              p.style.top = ey + "px";
              p.style.opacity = "1";
              setTimeout(() => {
                p.style.opacity = "0";
                setTimeout(() => p.remove(), 220);
              }, dur - 120);
            });
          });
        }, i * 55);
      }
    }

    async function cycle() {
      while (runningRef.current) {
        const pair = PAIRS[idxRef.current];
        idxRef.current = (idxRef.current + 1) % PAIRS.length;

        const cList = codesListRef.current;
        const main = engMainRef.current;
        const sub = engSubRef.current;
        const badge = engBadgeRef.current;
        const hub = hubRef.current;
        const hlbl = hubLabelRef.current;
        if (!cList || !runningRef.current) {
          await wait(5000);
          continue;
        }

        // Reset
        cList.innerHTML = "";
        if (main) {
          main.className = "hz-eng-main";
          main.style.opacity = "";
          main.style.transition = "";
        }
        if (sub) {
          sub.className = "hz-eng-sub";
          sub.style.opacity = "";
          sub.style.transition = "";
        }
        if (badge) {
          badge.className = "hz-eng-badge";
          badge.style.opacity = "";
          badge.style.transition = "";
        }
        if (hub) hub.className = "hz-hub";
        if (hlbl) {
          hlbl.textContent = "Scanning";
          hlbl.className = "hz-hub-label";
        }

        // Phase 1: codes stagger in
        const rows = pair.codes.map((c) => {
          const row = document.createElement("div");
          row.className = "hz-code-row";
          const k = document.createElement("span");
          k.className = "hz-code-key";
          k.textContent = c.key;
          const v = document.createElement("span");
          v.className = "hz-code-val";
          v.textContent = c.val;
          row.appendChild(k);
          row.appendChild(v);
          cList.appendChild(row);
          return row;
        });
        for (let i = 0; i < rows.length; i++) {
          await wait(i === 0 ? 120 : 190);
          if (!runningRef.current) return;
          rows[i].classList.add("hz-vis");
        }

        await wait(380);
        if (!runningRef.current) return;

        // Phase 2: particles left → center, hub activates
        if (hub) hub.classList.add("hz-active");
        if (hlbl) {
          hlbl.textContent = "Translating";
          hlbl.classList.add("hz-active");
        }
        spawnParticles(false);
        await wait(720);
        if (!runningRef.current) return;

        // Phase 3: hub beats + particles center → right
        if (hub) hub.classList.add("hz-beating");
        spawnParticles(true);
        await wait(320);
        if (!runningRef.current) return;

        // Phase 4: output reveals
        if (main) {
          main.textContent = pair.plain;
          await wait(30);
          main.classList.add("hz-vis");
        }
        await wait(90);
        if (!runningRef.current) return;
        if (sub) {
          sub.textContent = pair.sub;
          sub.classList.add("hz-vis");
        }
        await wait(90);
        if (!runningRef.current) return;
        if (badge) {
          badge.textContent = pair.badgeText;
          badge.className = `hz-eng-badge hz-badge-${pair.badge} hz-vis`;
        }

        // Phase 5: hold for 4 seconds
        await wait(3000);
        if (!runningRef.current) return;

        // Fade out
        const fadeOut = "opacity 280ms ease-in";
        if (main) { main.style.transition = fadeOut; main.style.opacity = "0"; }
        if (sub) { sub.style.transition = fadeOut; sub.style.opacity = "0"; }
        if (badge) { badge.style.transition = fadeOut; badge.style.opacity = "0"; }
        rows.forEach((r) => {
          r.style.transition = "opacity 280ms ease-in";
          r.style.opacity = "0";
        });
        if (hub) hub.className = "hz-hub";
        if (hlbl) {
          hlbl.textContent = "Scanning";
          hlbl.className = "hz-hub-label";
        }
        await wait(360);
      }
    }

    const timeout = setTimeout(cycle, 600);
    return () => {
      runningRef.current = false;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={cardRef} className="hz-card" id="hzCard">
      {/* Left: Raw OBD stream */}
      <div className="hz-raw">
        <div className="hz-zone-label">Raw OBD data</div>
        <div ref={codesListRef} className="hz-codes-list" />
      </div>

      {/* Center: MotorLink hub */}
      <div className="hz-center-col">
        <div className="hz-vert-line" />
        <div ref={hubRef} className="hz-hub">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ea8e0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <div className="hz-vert-line" />
        <span ref={hubLabelRef} className="hz-hub-label">
          Scanning
        </span>
      </div>

      {/* Right: Plain English output */}
      <div className="hz-eng">
        <div className="hz-zone-label">MotorLink says</div>
        <div className="hz-eng-body">
          <div className="hz-eng-text">
            <div ref={engMainRef} className="hz-eng-main" />
            <div ref={engSubRef} className="hz-eng-sub" />
          </div>
          <div ref={engBadgeRef} className="hz-eng-badge" />
        </div>
      </div>

      {/* Particle overlay */}
      <div ref={overlayRef} className="hz-pt-overlay" />
    </div>
  );
}
