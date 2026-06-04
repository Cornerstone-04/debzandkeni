"use client";

import { useEffect, useRef, useState } from "react";
import { CharacterPair } from "./character-pair";
import { CountdownClock } from "./countdown-clock";
import { Fireworks } from "./fireworks";
import { timelineEvents } from "@/data/timeline-events";

const event = timelineEvents.find((e) => e.id === "new-years-eve")!;

// SceneOne is the first chapter of the timeline.
// It uses a "scroll-to-progress" pattern:
//   - The outer wrapper is tall (400vh) to give scroll room.
//   - The inner content is `position: sticky` so it stays in view while the user scrolls.
//   - We read scrollY relative to the sticky container's top to derive a `progress` value (0→1).
//   - That single `progress` value drives ALL animations in the scene.
//
// This is the foundational pattern for every scene in the project.

export function SceneOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const containerHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far we've scrolled through this scene
      // rect.top goes from 0 (just entered view) to -(containerHeight - viewportHeight) (fully scrolled)
      const scrolled = -rect.top;
      const scrollable = containerHeight - viewportHeight;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));

      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derived values from progress
  // Cloud / atmosphere layer moves slower than the scene (parallax Layer 2)
  const cloudOffset = progress * -40; // px upward
  // Stars layer moves even slower (Layer 1)
  const starParallax = progress * -20;

  // Text phases
  const showOpeningText = progress < 0.15;
  const showCountdown = progress > 0.1 && progress < 0.75;
  const showMeetText = progress > 0.72 && progress < 0.88;
  const showRevealText = progress >= 0.88;
  const showFireworks = progress >= 0.88;

  // Character progress: ramp from 0.15 to 0.85 scroll range
  const charProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.7));

  // Clock progress: ramp 0.1 → 0.85
  const clockProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.75));

  // Background gradient shifts from deep navy to a warmer midnight as they meet
  const warmth = progress * 30;
  const bgColor = `hsl(${230 - warmth}, ${60 - progress * 10}%, ${4 + progress * 3}%)`;

  return (
    // Outer container: 400vh gives scroll travel room
    <div ref={containerRef} style={{ height: "400vh", position: "relative" }}>
      {/* Sticky inner: stays in viewport while user scrolls through the outer height */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: bgColor,
          transition: "background 0.3s ease",
        }}
      >
        {/* ── LAYER 1: Atmospheric nebula (slowest parallax) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${starParallax}px)`,
            zIndex: 1,
          }}
        >
          {/* Subtle nebula blobs */}
          <div
            className="absolute"
            style={{
              top: "10%",
              left: "5%",
              width: "40vw",
              height: "40vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(45,27,78,0.35) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute"
            style={{
              top: "20%",
              right: "8%",
              width: "35vw",
              height: "35vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(26,39,68,0.4) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          {/* Warm horizon glow — grows as progress increases */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "35vh",
              background: `radial-gradient(ellipse at 50% 100%, rgba(212,168,83,${
                0.04 + progress * 0.12
              }) 0%, transparent 70%)`,
              transition: "none",
            }}
          />
        </div>

        {/* ── LAYER 2: Cloud / particle atmosphere (medium parallax) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${cloudOffset}px)`,
            zIndex: 2,
          }}
        >
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Soft cloud wisps */}
            <ellipse
              cx="200"
              cy="200"
              rx="180"
              ry="40"
              fill="rgba(232,213,176,0.025)"
              filter="url(#blur1)"
            />
            <ellipse
              cx="1200"
              cy="160"
              rx="200"
              ry="35"
              fill="rgba(232,213,176,0.02)"
              filter="url(#blur1)"
            />
            <ellipse
              cx="720"
              cy="120"
              rx="300"
              ry="50"
              fill="rgba(232,213,176,0.015)"
              filter="url(#blur1)"
            />
            <defs>
              <filter id="blur1">
                <feGaussianBlur stdDeviation="18" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* ── LAYER 3: Timeline path line ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            zIndex: 3,
            bottom: 0,
            width: "2px",
            height: `${20 + progress * 30}vh`,
            background:
              "linear-gradient(to top, rgba(212,168,83,0.6), transparent)",
            transition: "none",
          }}
        />

        {/* ── LAYER 4: Characters ── */}
        <div
          className="absolute w-full pointer-events-none"
          style={{
            zIndex: 4,
            bottom: "12vh",
          }}
        >
          <CharacterPair progress={charProgress} />
        </div>

        {/* ── LAYER 5: Clock ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            zIndex: 5,
            top: "18vh",
            opacity: showCountdown ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <CountdownClock progress={clockProgress} />
        </div>

        {/* ── TEXT LAYERS ── */}

        {/* Opening chapter label */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{
            zIndex: 6,
            top: "10vh",
            opacity: showOpeningText ? 1 : 0,
            transition: "opacity 1s ease",
            width: "90vw",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              color: "var(--warm-gold)",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: "8px",
            }}
          >
            Chapter I
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
              width: "60px",
              height: "1px",
              background: "var(--warm-gold)",
              margin: "14px auto",
              opacity: 0.5,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              color: "var(--champagne)",
              opacity: 0.45,
              textTransform: "uppercase",
            }}
          >
            Scroll to begin
          </p>
        </div>

        {/* Meeting moment text */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{
            zIndex: 6,
            top: "10vh",
            width: "min(600px, 88vw)",
            opacity: showMeetText ? 1 : 0,
            transform: `translateY(${showMeetText ? 0 : 12}px)`,
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--champagne)",
              letterSpacing: "0.04em",
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            {event.title} — and of all the rooms in the city —
          </p>
        </div>

        {/* Midnight reveal text */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{
            zIndex: 6,
            top: "8vh",
            width: "min(700px, 90vw)",
            opacity: showRevealText ? 1 : 0,
            transform: `translateY(${showRevealText ? 0 : 16}px)`,
            transition: "opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              color: "var(--warm-gold)",
              textTransform: "uppercase",
              marginBottom: "16px",
              opacity: 0.8,
            }}
          >
            {event.date} — Midnight
          </p>
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 300,
              color: "var(--champagne)",
              letterSpacing: "0.04em",
              lineHeight: 1.3,
              marginBottom: "20px",
            }}
          >
            {event.description}
          </h3>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--warm-gold)",
              margin: "0 auto",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Fireworks canvas */}
        <Fireworks active={showFireworks} />

        {/* Scroll indicator — only at very start */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{
            zIndex: 7,
            opacity: progress < 0.05 ? 0.5 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, transparent, var(--warm-gold))",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes scrollPulse {
              0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
              50% { opacity: 0.8; transform: scaleY(1); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
