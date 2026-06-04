"use client";

import { useEffect, useRef, useState } from "react";
import { MemoryCard } from "./memory-card";
import { timelineEvents } from "@/data/timeline-events";

const event = timelineEvents.find((e) => e.id === "one-month")!;

// ──────────────────────────────────────────────────────────────────────────────
// SceneTwo — "One Month Later"
// Date: January 31, 2026
//
// Mood shift from Scene 1:
//   Scene 1 was cold midnight navy — two strangers in the dark.
//   Scene 2 warms progressively: deep navy → warm indigo → a soft amber dawn.
//   The couple now travels *together*. Memory cards float in from both sides.
//   A month counter animates from 0 → 31 days.
//   The scene ends with a quiet affirmation: "Still here."
//
// Architecture: same 400vh sticky-scroll pattern as SceneOne.
// All animation is driven by a single `progress` value (0 → 1).
// ──────────────────────────────────────────────────────────────────────────────

// The 5 memory cards that appear as the scene progresses
const MEMORIES = [
  {
    id: "first-call",
    label: "First phone call",
    date: "January 2",
    icon: "📞",
    entryFrom: "left" as const,
    threshold: 0.2,
    positionStyle: { top: "22vh", left: "6vw" },
  },
  {
    id: "first-date",
    label: "First proper date",
    date: "January 8",
    icon: "🌙",
    entryFrom: "right" as const,
    threshold: 0.32,
    positionStyle: { top: "16vh", right: "7vw" },
  },
  {
    id: "laughing",
    label: "They laughed until it hurt",
    date: "January 14",
    icon: "✨",
    entryFrom: "left" as const,
    threshold: 0.44,
    positionStyle: { top: "44vh", left: "5vw" },
  },
  {
    id: "voice-note",
    label: "Voice notes at 2am",
    date: "January 20",
    icon: "🎙",
    entryFrom: "right" as const,
    threshold: 0.56,
    positionStyle: { top: "52vh", right: "6vw" },
  },
  {
    id: "still-here",
    label: "31 days. Still here.",
    date: "January 31",
    icon: "🌟",
    entryFrom: "bottom" as const,
    threshold: 0.72,
    positionStyle: {
      bottom: "22vh",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
];

export function SceneTwo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = el.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, scrolled / scrollable)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Background: warms from midnight navy → indigo → soft amber-night ──
  // Scene 1 ends at roughly hsl(200, 50%, 7%).
  // We pick up from there and warm toward hsl(240, 35%, 8%) → hsl(260, 28%, 9%)
  const hue = 230 - progress * 15;        // 230 → 215 (shift toward warmer purple-blue)
  const sat = 50 - progress * 18;         // 50% → 32%
  const lit = 7 + progress * 2;           // 7% → 9%
  const bgColor = `hsl(${hue}, ${sat}%, ${lit}%)`;

  // Horizon warm glow strengthens as the month passes
  const horizonOpacity = 0.06 + progress * 0.18;

  // Day counter: 0 → 31 across progress 0.15 → 0.85
  const dayProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.7));
  const dayCount = Math.round(dayProgress * 31);

  // Couple walks together: start slightly apart, fully together by 0.4
  const coupleOffset = Math.max(0, (1 - progress / 0.4) * 6); // vw units

  // Text phases
  const showChapterLabel = progress < 0.12;
  const showDayCounter   = progress > 0.08 && progress < 0.78;
  const showClosingText  = progress >= 0.76;

  // Parallax offsets
  const bgParallax  = progress * -30;
  const midParallax = progress * -55;

  return (
    <div ref={containerRef} style={{ height: "400vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: bgColor,
        }}
      >

        {/* ── LAYER 1: Deep background nebula ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${bgParallax}px)`, zIndex: 1 }}
        >
          {/* Warm indigo cloud — left */}
          <div
            className="absolute"
            style={{
              top: "5%",
              left: "-5%",
              width: "55vw",
              height: "55vw",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(60,35,100,0.3) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
          {/* Warm amber glow — right horizon */}
          <div
            className="absolute"
            style={{
              top: "30%",
              right: "-10%",
              width: "50vw",
              height: "50vw",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(180,120,50,${0.05 + progress * 0.1}) 0%, transparent 65%)`,
              filter: "blur(80px)",
            }}
          />
          {/* Bottom horizon warmth */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "40vh",
              background: `radial-gradient(ellipse at 50% 100%, rgba(212,168,83,${horizonOpacity}) 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* ── LAYER 2: Floating constellation path ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${midParallax}px)`, zIndex: 2 }}
        >
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Gentle dotted path the couple walks along */}
            <path
              d="M 200 750 Q 400 600 720 500 Q 1040 400 1240 250"
              stroke="rgba(212,168,83,0.12)"
              strokeWidth="1.5"
              strokeDasharray="4 10"
              fill="none"
            />
            {/* Small star nodes on the path */}
            {[
              [200, 750], [360, 660], [520, 590],
              [720, 500], [920, 445], [1100, 345], [1240, 250],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={i === 0 || i === 6 ? 3 : 2}
                fill={`rgba(212,168,83,${0.15 + (i / 6) * 0.35 * progress})`}
              />
            ))}
          </svg>
        </div>

        {/* ── LAYER 3: Timeline vertical connector ── */}
        {/* Bridges Scene 1's timeline line into Scene 2 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            zIndex: 3,
            top: 0,
            width: "2px",
            height: `${12 + progress * 25}vh`,
            background: "linear-gradient(to bottom, rgba(212,168,83,0.5), transparent)",
          }}
        />

        {/* ── LAYER 4: Couple walking together ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            zIndex: 4,
            bottom: "14vh",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "flex-end",
            gap: `${coupleOffset}vw`,
            transition: "none",
          }}
        >
          {/* Debz — simplified walking figure */}
          <WalkingFigure gender="female" progress={progress} />
          {/* Keni */}
          <WalkingFigure gender="male" progress={progress} />
        </div>

        {/* ── LAYER 5: Memory cards ── */}
        {MEMORIES.map((m) => (
          <MemoryCard
            key={m.id}
            label={m.label}
            date={m.date}
            icon={m.icon}
            entryFrom={m.entryFrom}
            threshold={m.threshold}
            progress={progress}
            positionStyle={m.positionStyle}
          />
        ))}

        {/* ── TEXT: Chapter label ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{
            zIndex: 6,
            top: "10vh",
            width: "min(580px, 88vw)",
            opacity: showChapterLabel ? 1 : 0,
            transition: "opacity 0.9s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              color: "var(--warm-gold)",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: "10px",
            }}
          >
            Chapter II
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--champagne)",
              letterSpacing: "0.05em",
              lineHeight: 1.2,
            }}
          >
            {event.chapter}
          </h2>
          <div
            style={{
              width: "50px",
              height: "1px",
              background: "var(--warm-gold)",
              margin: "12px auto",
              opacity: 0.45,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              fontStyle: "italic",
              color: "var(--champagne)",
              opacity: 0.45,
              letterSpacing: "0.03em",
            }}
          >
            {event.date}
          </p>
        </div>

        {/* ── TEXT: Day counter ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{
            zIndex: 6,
            top: "12vh",
            opacity: showDayCounter ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: "var(--warm-gold)",
              textTransform: "uppercase",
              opacity: 0.65,
              marginBottom: "6px",
            }}
          >
            Days together
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(4rem, 10vw, 7rem)",
              fontWeight: 300,
              color: "var(--champagne)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              // Subtle glow grows as days accumulate
              textShadow: `0 0 ${dayCount * 1.2}px rgba(212,168,83,${
                0.05 + dayProgress * 0.3
              })`,
            }}
          >
            {String(dayCount).padStart(2, "0")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "var(--champagne)",
              textTransform: "uppercase",
              opacity: 0.35,
              marginTop: "4px",
            }}
          >
            {dayCount === 31 ? "One month" : dayCount === 1 ? "day" : "days"}
          </p>
        </div>

        {/* ── TEXT: Closing "Still here" ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{
            zIndex: 6,
            top: "10vh",
            width: "min(640px, 90vw)",
            opacity: showClosingText ? 1 : 0,
            transform: `translateY(${showClosingText ? 0 : 14}px)`,
            transition: "opacity 1.1s ease 0.1s, transform 1.1s ease 0.1s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.58rem",
              letterSpacing: "0.35em",
              color: "var(--warm-gold)",
              textTransform: "uppercase",
              opacity: 0.75,
              marginBottom: "16px",
            }}
          >
            {event.date}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.7rem, 3.5vw, 2.7rem)",
              fontWeight: 300,
              color: "var(--champagne)",
              letterSpacing: "0.04em",
              lineHeight: 1.35,
              marginBottom: "18px",
            }}
          >
            {event.title}.
            <br />
            <em>{event.description}</em>
          </h3>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontStyle: "italic",
              color: "var(--champagne)",
              opacity: 0.5,
              letterSpacing: "0.04em",
            }}
          >
            The story was still unfolding.
          </p>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--warm-gold)",
              margin: "18px auto 0",
              opacity: 0.5,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// WalkingFigure — compact SVG silhouette used in Scene 2's couple-walking moment.
// Slightly smaller than Scene 1's characters; their "walking" pose differs subtly.
// ──────────────────────────────────────────────────────────────────────────────
function WalkingFigure({
  gender,
  progress,
}: {
  gender: "male" | "female";
  progress: number;
}) {
  const opacity = Math.min(1, progress * 5);
  // Subtle bob: oscillates as if walking
  const bob = Math.sin(progress * Math.PI * 6) * 2;

  if (gender === "female") {
    return (
      <div
        style={{
          opacity,
          transform: `translateY(${bob}px)`,
          filter: `drop-shadow(0 0 8px rgba(232,149,122,0.35))`,
        }}
      >
        <svg viewBox="0 0 60 120" fill="none" className="w-12 h-24 md:w-14 md:h-28">
          <circle cx="30" cy="17" r="11" fill="#e8957a" />
          <path d="M19 15 Q21 5 30 4 Q39 5 41 15 Q38 10 30 10 Q22 10 19 15Z" fill="#7a3b1e" />
          <path d="M21 28 Q18 38 17 55 Q16 72 18 85 L42 85 Q44 72 43 55 Q42 38 39 28Z" fill="#d4a853" />
          <path d="M18 85 Q15 100 12 115 L48 115 Q45 100 42 85Z" fill="#c49040" />
          <path d="M21 33 Q13 44 12 55" stroke="#e8957a" strokeWidth="4" strokeLinecap="round" />
          <path d="M39 33 Q47 44 48 55" stroke="#e8957a" strokeWidth="4" strokeLinecap="round" />
          <rect x="27" y="26" width="6" height="6" rx="2" fill="#e8957a" />
        </svg>
      </div>
    );
  }

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${-bob}px)`,
        filter: `drop-shadow(0 0 8px rgba(100,181,246,0.3))`,
      }}
    >
      <svg viewBox="0 0 60 120" fill="none" className="w-12 h-24 md:w-14 md:h-28">
        <circle cx="30" cy="17" r="11" fill="#c8a882" />
        <path d="M19 13 Q21 4 30 3 Q39 4 41 13 Q38 7 30 7 Q22 7 19 13Z" fill="#2c1a0e" />
        <path d="M20 28 Q17 38 17 55 L17 87 L43 87 L43 55 Q43 38 40 28Z" fill="#1a2744" />
        <path d="M26 28 L30 40 L34 28 Q32 33 30 35 Q28 33 26 28Z" fill="#f5e6c8" />
        <rect x="18" y="85" width="10" height="30" rx="2" fill="#0f1829" />
        <rect x="32" y="85" width="10" height="30" rx="2" fill="#0f1829" />
        <path d="M20 33 Q12 44 10 56" stroke="#c8a882" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 33 Q48 44 50 56" stroke="#c8a882" strokeWidth="4" strokeLinecap="round" />
        <rect x="27" y="26" width="6" height="6" rx="2" fill="#c8a882" />
      </svg>
    </div>
  );
}
