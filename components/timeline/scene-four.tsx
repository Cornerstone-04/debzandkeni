"use client";

import { useEffect, useRef, useState } from "react";
import { timelineEvents } from "@/data/timeline-events";

const event = timelineEvents.find((e) => e.id === "pregnancy-test")!;

export function SceneFour() {
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

  const bgParallax = progress * -28;
  const midParallax = progress * -48;
  const pulse = 0.5 + Math.sin(progress * Math.PI * 14) * 0.5;
  const heartbeatOpacity = progress > 0.2 && progress < 0.82 ? 0.18 + pulse * 0.18 : 0;
  const testReveal = Math.max(0, Math.min(1, (progress - 0.38) / 0.28));
  const showOpening = progress < 0.16;
  const showAnticipation = progress >= 0.16 && progress < 0.58;
  const showReveal = progress >= 0.6;

  const hue = 330 + progress * 8;
  const bgColor = `hsl(${hue}, ${22 - progress * 4}%, ${10 + progress * 1.2}%)`;

  return (
    <div ref={containerRef} style={{ height: "420vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: bgColor,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${bgParallax}px)`, zIndex: 1 }}
        >
          <div
            className="absolute left-[-10%] top-[8%] h-[60vw] w-[60vw] rounded-[50%]"
            style={{
              background: "radial-gradient(circle, rgba(125,55,96,0.24) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute right-[-12%] top-[24%] h-[52vw] w-[52vw] rounded-[50%]"
            style={{
              background: `radial-gradient(circle, rgba(232,149,122,${0.08 + progress * 0.1}) 0%, transparent 68%)`,
              filter: "blur(78px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[46vh]"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, rgba(240,201,122,${
                0.07 + progress * 0.13
              }) 0%, transparent 72%)`,
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${midParallax}px)`, zIndex: 2 }}
        >
          <svg className="absolute h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <path
              d="M 130 760 C 330 610 510 565 690 520 C 850 482 1030 394 1260 220"
              stroke="rgba(212,168,83,0.16)"
              strokeWidth="2"
              strokeDasharray="5 12"
              fill="none"
            />
            <path
              d="M 620 512 L 650 512 L 664 486 L 695 560 L 716 512 L 748 512"
              stroke={`rgba(240,201,122,${heartbeatOpacity})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {[220, 420, 620, 820, 1020, 1220].map((cx, i) => (
              <circle
                key={cx}
                cx={cx}
                cy={720 - i * 90}
                r={2 + pulse * 1.5}
                fill={`rgba(240,201,122,${0.08 + progress * 0.2})`}
              />
            ))}
          </svg>
        </div>

        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
          style={{
            zIndex: 3,
            width: "2px",
            height: `${14 + progress * 28}vh`,
            background: `linear-gradient(to bottom, rgba(212,168,83,${0.36 + pulse * 0.24}), transparent)`,
          }}
        />

        <div
          className="absolute left-1/2 top-[48vh] z-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            opacity: testReveal,
            transform: `translate(-50%, -50%) scale(${0.86 + testReveal * 0.14}) rotate(${
              -4 + testReveal * 4
            }deg)`,
          }}
        >
          <div
            className="relative h-[74px] w-[min(76vw,360px)] rounded-full"
            style={{
              background: "linear-gradient(100deg, rgba(245,230,200,0.92), rgba(232,213,176,0.78))",
              border: "1px solid rgba(255,255,255,0.28)",
              boxShadow: `0 16px 70px rgba(0,0,0,0.42), 0 0 ${42 + pulse * 34}px rgba(232,149,122,0.28)`,
            }}
          >
            <div
              className="absolute left-7 top-1/2 h-9 w-20 -translate-y-1/2 rounded-full"
              style={{ background: "rgba(12,18,40,0.12)" }}
            />
            <div
              className="absolute right-10 top-1/2 h-9 w-28 -translate-y-1/2 rounded-full"
              style={{ background: "rgba(12,18,40,0.08)" }}
            >
              <div
                className="absolute left-8 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full"
                style={{ background: "rgba(232,149,122,0.78)" }}
              />
              <div
                className="absolute left-14 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full"
                style={{ background: "rgba(232,149,122,0.78)" }}
              />
            </div>
          </div>
        </div>

        <div
          className="absolute left-1/2 top-[10vh] z-6 w-[min(620px,88vw)] -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: showOpening ? 1 : 0, transition: "opacity 0.9s ease" }}
        >
          <p className="chapter-kicker" style={{ color: "var(--warm-gold)", opacity: 0.72, marginBottom: 10 }}>
            Chapter IV
          </p>
          <h2 className="chapter-heading" style={{ color: "var(--champagne)" }}>
            {event.chapter}
          </h2>
          <p className="chapter-date italic" style={{ color: "var(--champagne)", opacity: 0.42, marginTop: 12 }}>
            {event.date}
          </p>
        </div>

        <div
          className="absolute left-1/2 top-[13vh] z-6 w-[min(560px,88vw)] -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: showAnticipation ? 1 : 0, transform: `translateY(${showAnticipation ? 0 : 12}px)`, transition: "opacity 0.9s ease, transform 0.9s ease" }}
        >
          <p className="story-copy italic" style={{ color: "rgba(245,230,200,0.68)", letterSpacing: "0.04em" }}>
            Something in the timeline began to answer back.
          </p>
        </div>

        <div
          className="absolute left-1/2 top-[11vh] z-6 w-[min(680px,90vw)] -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: showReveal ? 1 : 0, transform: `translateY(${showReveal ? 0 : 16}px)`, transition: "opacity 1.1s ease, transform 1.1s ease" }}
        >
          <p className="reveal-kicker" style={{ color: "var(--warm-gold)", opacity: 0.8, marginBottom: 16 }}>
            {event.date}
          </p>
          <h3 className="reveal-heading" style={{ color: "var(--champagne)" }}>
            One small test changed the shape of the future.
          </h3>
        </div>
      </div>
    </div>
  );
}
