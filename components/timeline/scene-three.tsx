"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MemoryCard } from "./memory-card";
import { timelineEvents } from "@/data/timeline-events";
import { useIsMobile } from "./use-is-mobile";
import { CharacterSilhouette } from "./character-silhouette";

// ──────────────────────────────────────────────────────────────────────────────
// SceneThree — "Love In Motion"
// Date: February–May 2026
//
// This is the richest, most expansive scene so far — four months of shared life.
// The mood finishes warming: we move from the indigo-amber of Scene 2 into a deep
// burgundy-rose night. The background palette actively shifts through 4 phases,
// one per month, as the user scrolls.
//
// Visual story beats:
//   0.00–0.15  Chapter label appears. Two figures visible below.
//   0.15–0.45  "February" phase — 3 memory cards drift in. Soft rose nebula.
//   0.45–0.60  "March/April" phase — 3 more cards. Palette deepens.
//   0.60–0.80  "May" phase — final 2 cards. The path behind them glows warmest.
//   0.80–1.00  Closing text: event.title + event.description.
//
// The month label in the top-left cycles through Feb → Mar → Apr → May
// as scroll progress advances — a subtle orientation device.
// ──────────────────────────────────────────────────────────────────────────────

const event = timelineEvents.find((e) => e.id === "love-in-motion")!;

// 8 memory moments spread across the four months
const MEMORIES = [
  {
    id: "feb-walks",
    label: "Long walks that went nowhere",
    date: "February",
    icon: "🌧",
    entryFrom: "left" as const,
    threshold: 0.17,
    positionStyle: { top: "16vh", left: "3vw" },
  },
  {
    id: "feb-cook",
    label: "First time cooking together",
    date: "February",
    icon: "🍳",
    entryFrom: "right" as const,
    threshold: 0.24,
    positionStyle: { top: "36vh", right: "3vw" },
  },
  {
    id: "mar-trip",
    label: "Their first trip away",
    date: "March",
    icon: "✈️",
    entryFrom: "left" as const,
    threshold: 0.34,
    positionStyle: { top: "58vh", left: "4vw" },
  },
  {
    id: "mar-late",
    label: "Staying up until sunrise",
    date: "March",
    icon: "🌅",
    entryFrom: "right" as const,
    threshold: 0.42,
    positionStyle: { top: "18vh", right: "4vw" },
  },
  {
    id: "apr-fight",
    label: "Their first argument — resolved",
    date: "April",
    icon: "🤝",
    entryFrom: "bottom" as const,
    threshold: 0.50,
    positionStyle: { top: "40vh", left: "50%", transform: "translateX(-50%)" },
  },
  {
    id: "apr-family",
    label: "Meeting each other's people",
    date: "April",
    icon: "🏡",
    entryFrom: "left" as const,
    threshold: 0.58,
    positionStyle: { top: "70vh", left: "5vw" },
  },
  {
    id: "may-plans",
    label: "Making plans for the future",
    date: "May",
    icon: "🗺",
    entryFrom: "right" as const,
    threshold: 0.66,
    positionStyle: { top: "56vh", right: "5vw" },
  },
  {
    id: "may-quiet",
    label: "Comfortable in the silence",
    date: "May",
    icon: "🕯",
    entryFrom: "left" as const,
    threshold: 0.73,
    positionStyle: { top: "28vh", left: "4vw" },
  },
];

// The month names that cycle in the top-left as you scroll
const MONTHS = ["February", "March", "April", "May"];

export function SceneThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

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

  // ── Background palette: deep warm indigo → burgundy-rose night ──
  // Each of the 4 months has its own hue stop; we interpolate across them.
  // Feb: hsl(250, 28%, 9%)  — cool indigo
  // Mar: hsl(270, 26%, 10%) — deep violet
  // Apr: hsl(300, 22%, 10%) — warm plum
  // May: hsl(330, 22%, 10%) — dark rose
  const palProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.8));
  const hue = 250 + palProgress * 80;       // 250 → 330
  const sat = 28 - palProgress * 6;         // 28% → 22%
  const lit = 9 + palProgress * 1.5;        // 9% → 10.5%
  const bgColor = `hsl(${hue}, ${sat}%, ${lit}%)`;

  // Horizon glow: shifts from warm-gold → rose as month advances
  const glowR = Math.round(212 + palProgress * 40);   // 212 → 252
  const glowG = Math.round(168 - palProgress * 60);   // 168 → 108
  const glowB = Math.round(83 + palProgress * 40);    // 83  → 123
  const horizonOpacity = 0.07 + progress * 0.16;

  // Which month label to show (top-left corner)
  const monthIndex = Math.min(3, Math.floor(palProgress * 4));
  const currentMonth = MONTHS[monthIndex];

  // Text phases
  const showChapterLabel = progress < 0.12;
  const showMonthLabel   = progress >= 0.12 && progress < 0.82;
  const showClosingText  = progress >= 0.80;

  // Parallax
  const bgParallax  = progress * -35;
  const midParallax = progress * -60;

  // Path draw progress: the golden trail behind the couple grows as they journey
  // We represent this as a strokeDashoffset on an SVG path
  const pathLength = 900; // approx SVG units
  const pathDrawn = Math.max(0, Math.min(pathLength, pathLength * (progress - 0.1) / 0.8));
  const photoReveal = Math.max(0, Math.min(1, (progress - 0.68) / 0.14));
  const photoHold = Math.max(0, Math.min(1, (0.9 - progress) / 0.1));
  const photoOpacity = photoReveal * photoHold;

  return (
    <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      {/* Scene 3 gets 500vh — it covers 4 months, more scroll = more story room */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: bgColor,
        }}
      >

        {/* ── LAYER 1: Deep nebula atmosphere ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${bgParallax}px)`, zIndex: 1 }}
        >
          {/* Left plum cloud */}
          <div
            className="absolute"
            style={{
              top: "0%",
              left: "-8%",
              width: "60vw",
              height: "60vw",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(80,30,80,${0.2 + palProgress * 0.15}) 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
          {/* Right rose cloud */}
          <div
            className="absolute"
            style={{
              top: "15%",
              right: "-12%",
              width: "55vw",
              height: "55vw",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${glowR - 40},50,60,${0.1 + palProgress * 0.12}) 0%, transparent 68%)`,
              filter: "blur(70px)",
            }}
          />
          {/* Horizon warm glow */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "40vh",
              background: `radial-gradient(ellipse at 50% 100%, rgba(${glowR},${glowG},${glowB},${horizonOpacity}) 0%, transparent 70%)`,
            }}
          />
          {/* Extra top atmospheric haze */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "30vh",
              background: `radial-gradient(ellipse at 50% 0%, rgba(${glowR - 20},${glowG},${glowB + 20},0.06) 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* ── LAYER 2: Growing trail path ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${midParallax}px)`, zIndex: 2 }}
        >
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`rgba(212,168,83,0.08)`} />
                <stop offset="60%" stopColor={`rgba(${glowR},${glowG},${glowB},0.25)`} />
                <stop offset="100%" stopColor={`rgba(${glowR},${glowG},${glowB},0.05)`} />
              </linearGradient>
            </defs>

            {/* The couple's journey path — a long winding arc */}
            <path
              id="journeyPath"
              d="M 100 800 C 300 700 450 600 600 520 S 900 400 1100 300 S 1300 200 1380 150"
              stroke="url(#trailGrad)"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${pathDrawn} ${pathLength}`}
            />

            {/* Milestone dots along the path — one per month */}
            {[
              { cx: 320, cy: 665, month: "Feb" },
              { cx: 600, cy: 520, month: "Mar" },
              { cx: 880, cy: 395, month: "Apr" },
              { cx: 1160, cy: 272, month: "May" },
            ].map(({ cx, cy, month }, i) => {
              const dotProgress = Math.max(0, Math.min(1, (palProgress - i * 0.22) / 0.15));
              return (
                <g key={month}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={`rgba(${glowR},${glowG},${glowB},${dotProgress * 0.8})`}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={10}
                    fill="none"
                    stroke={`rgba(${glowR},${glowG},${glowB},${dotProgress * 0.3})`}
                    strokeWidth="1"
                  />
                  <text
                    x={cx}
                    y={cy - 16}
                    textAnchor="middle"
                    fill={`rgba(240,201,122,${dotProgress * 0.65})`}
                    fontSize="11"
                    fontFamily="var(--font-jost)"
                    letterSpacing="2"
                  >
                    {month.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── LAYER 3: Timeline connector from scene 2 ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            zIndex: 3,
            top: 0,
            width: "2px",
            height: `${10 + progress * 20}vh`,
            background: "linear-gradient(to bottom, rgba(212,168,83,0.45), transparent)",
          }}
        />

        {/* ── LAYER 4: Characters together, drifting slightly ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            zIndex: 4,
            bottom: "10vh",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "flex-end",
            gap: "4px",
          }}
        >
          <JourneyFigure gender="female" progress={progress} palette={{ r: glowR, g: glowG, b: glowB }} />
          <JourneyFigure gender="male" progress={progress} palette={{ r: glowR, g: glowG, b: glowB }} />
        </div>

        {/* ── LAYER 5: Memory cards ── */}
        {MEMORIES.map((m, index) => {
          const mobilePosition: React.CSSProperties = {
            top: index % 2 === 0 ? "28vh" : "56vh",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(86vw, 320px)",
            maxWidth: "320px",
          };

          return (
            <MemoryCard
              key={m.id}
              label={m.label}
              date={m.date}
              icon={m.icon}
              entryFrom={isMobile ? "bottom" : m.entryFrom}
              threshold={m.threshold}
              exitThreshold={m.threshold + (isMobile ? 0.18 : 0.36)}
              progress={progress}
              positionStyle={isMobile ? mobilePosition : m.positionStyle}
            />
          );
        })}

        {/* ── LAYER 5B: Real memory photograph ── */}
        <div
          className="absolute z-5 pointer-events-none"
          style={{
            top: isMobile ? "52vh" : "41vh",
            left: isMobile ? "50%" : "66vw",
            opacity: photoOpacity,
            transform: `translate(-50%, ${22 - photoReveal * 22}px) rotate(${isMobile ? -1 : 2}deg)`,
            transition: "none",
          }}
          aria-hidden="true"
        >
          <div
            className="relative overflow-hidden rounded-[22px] backdrop-blur-md sci-panel"
            style={{
              width: isMobile ? "min(82vw, 310px)" : "min(28vw, 340px)",
              aspectRatio: "0.78",
              background:
                "linear-gradient(145deg, rgba(8,13,30,0.78), rgba(12,18,40,0.6), rgba(13,28,46,0.44))",
              border: "1px solid rgba(154,223,255,0.24)",
              boxShadow:
                "0 18px 58px rgba(0,0,0,0.38), 0 0 34px rgba(103,243,255,0.1), 0 0 26px rgba(212,168,83,0.12)",
            }}
          >
            <Image
              src="/images/debz-and-keni.jpeg"
              alt=""
              fill
              sizes={isMobile ? "82vw" : "28vw"}
              className="object-cover"
              style={{
                objectPosition: "48% 50%",
                filter: "saturate(0.96) contrast(1.04)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,13,30,0.05), transparent 45%, rgba(5,6,15,0.28))",
                mixBlendMode: "multiply",
              }}
            />
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
              <span className="system-label">Memory captured</span>
              <span
                style={{
                  height: 1,
                  width: 34,
                  background: "linear-gradient(90deg, rgba(154,223,255,0.56), transparent)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── TEXT: Chapter opening label ── */}
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
            className="chapter-kicker"
            style={{
              color: "var(--warm-gold)",
              opacity: 0.7,
              marginBottom: "10px",
            }}
          >
            Chapter III
          </p>
          <h2
            className="chapter-heading"
            style={{
              color: "var(--champagne)",
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
              opacity: 0.4,
            }}
          />
          <p
            className="chapter-date"
            style={{
              fontStyle: "italic",
              color: "var(--champagne)",
              opacity: 0.4,
            }}
          >
            {event.date}
          </p>
        </div>

        {/* ── TEXT: Floating month label (top-left, cycles as you scroll) ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            zIndex: 6,
            top: "6vh",
            left: "5vw",
            opacity: showMonthLabel ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: `rgba(${glowR},${glowG},${glowB},0.7)`,
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            {currentMonth} 2026
          </p>
          <div
            style={{
              width: "30px",
              height: "1px",
              background: `rgba(${glowR},${glowG},${glowB},0.4)`,
            }}
          />
        </div>

        {/* ── TEXT: Closing reveal ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{
            zIndex: 6,
            top: "9vh",
            width: "min(660px, 90vw)",
            opacity: showClosingText ? 1 : 0,
            transform: `translateY(${showClosingText ? 0 : 16}px)`,
            transition: "opacity 1.1s ease 0.1s, transform 1.1s ease 0.1s",
          }}
        >
          <p
            className="reveal-kicker"
            style={{
              color: `rgba(${glowR},${glowG},${glowB},0.85)`,
              marginBottom: "16px",
            }}
          >
            {event.date}
          </p>
          <h3
            className="reveal-heading"
            style={{
              color: "var(--champagne)",
              marginBottom: "18px",
            }}
          >
            {event.title}.
          </h3>
          <p
            className="story-copy"
            style={{
              fontStyle: "italic",
              color: "var(--champagne)",
              opacity: 0.6,
              letterSpacing: "0.04em",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            {event.description}
          </p>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: `rgba(${glowR},${glowG},${glowB},0.6)`,
              margin: "20px auto 0",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// JourneyFigure — the characters in Scene 3 have a warmer, softer rendering.
// Their glow colour shifts with the palette so they feel part of the same world.
// ──────────────────────────────────────────────────────────────────────────────
function JourneyFigure({
  gender,
  progress,
  palette,
}: {
  gender: "male" | "female";
  progress: number;
  palette: { r: number; g: number; b: number };
}) {
  const opacity = Math.min(1, progress * 6);
  // Gentler bob than scene 2 — they've settled into each other's rhythm
  const bob = Math.sin(progress * Math.PI * 5) * 1.5;
  const glowColor = `rgba(${palette.r},${palette.g},${palette.b},0.4)`;

  return (
    <div style={{ opacity, transform: `translateY(${gender === "female" ? bob : -bob}px)` }}>
      <CharacterSilhouette
        gender={gender}
        size="medium"
        glowColor={glowColor}
      />
    </div>
  );
}
