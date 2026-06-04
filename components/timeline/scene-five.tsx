"use client";

import { useEffect, useRef, useState } from "react";
import { timelineEvents } from "@/data/timeline-events";
import { TwinReveal } from "./twin-reveal";

const event = timelineEvents.find((e) => e.id === "twins")!;

export function SceneFive() {
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

  const bgParallax = progress * -32;
  const midParallax = progress * -56;
  const splitProgress = Math.max(0, Math.min(1, (progress - 0.48) / 0.34));
  const showOpening = progress < 0.14;
  const showRevealText = progress >= 0.58;

  return (
    <div ref={containerRef} style={{ height: "460vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: `hsl(${338 + progress * 18}, ${20 - progress * 2}%, ${11 + progress * 1.5}%)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${bgParallax}px)`, zIndex: 1 }}
        >
          <div
            className="absolute left-[-8%] top-[-6%] h-[62vw] w-[62vw] rounded-[50%]"
            style={{
              background: `radial-gradient(circle, rgba(232,149,122,${0.14 + progress * 0.14}) 0%, transparent 70%)`,
              filter: "blur(84px)",
            }}
          />
          <div
            className="absolute right-[-10%] top-[18%] h-[58vw] w-[58vw] rounded-[50%]"
            style={{
              background: `radial-gradient(circle, rgba(100,181,246,${0.06 + splitProgress * 0.12}) 0%, transparent 68%)`,
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[52vh]"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, rgba(240,201,122,${
                0.1 + splitProgress * 0.16
              }) 0%, transparent 72%)`,
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${midParallax}px)`, zIndex: 2 }}
        >
          <svg className="absolute h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="singleToTwin" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(212,168,83,0.12)" />
                <stop offset="48%" stopColor="rgba(240,201,122,0.38)" />
                <stop offset="100%" stopColor="rgba(100,181,246,0.12)" />
              </linearGradient>
            </defs>
            <path
              d="M 120 760 C 360 640 520 580 720 500"
              stroke="url(#singleToTwin)"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 720 500 C 860 418 970 344 1230 205"
              stroke={`rgba(232,149,122,${0.08 + splitProgress * 0.38})`}
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={`${splitProgress * 620} 620`}
            />
            <path
              d="M 720 500 C 870 555 1010 610 1290 680"
              stroke={`rgba(100,181,246,${0.08 + splitProgress * 0.36})`}
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={`${splitProgress * 640} 640`}
            />
            <circle cx="720" cy="500" r={6 + splitProgress * 7} fill={`rgba(240,201,122,${0.35 + splitProgress * 0.45})`} />
            <circle cx="720" cy="500" r={18 + splitProgress * 20} fill="none" stroke={`rgba(240,201,122,${splitProgress * 0.2})`} />
            {[
              { cx: 990, cy: 333, color: "232,149,122" },
              { cx: 1030, cy: 615, color: "100,181,246" },
              { cx: 1210, cy: 215, color: "232,149,122" },
              { cx: 1260, cy: 672, color: "100,181,246" },
            ].map((dot, index) => (
              <circle
                key={`${dot.cx}-${dot.cy}`}
                cx={dot.cx}
                cy={dot.cy}
                r={3 + index}
                fill={`rgba(${dot.color},${splitProgress * 0.55})`}
              />
            ))}
          </svg>
        </div>

        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
          style={{
            zIndex: 3,
            width: "2px",
            height: `${12 + progress * 22}vh`,
            background: "linear-gradient(to bottom, rgba(212,168,83,0.42), transparent)",
          }}
        />

        <TwinReveal progress={progress} />

        <div
          className="absolute left-1/2 top-[10vh] z-6 w-[min(620px,88vw)] -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: showOpening ? 1 : 0, transition: "opacity 0.9s ease" }}
        >
          <p className="font-jost uppercase" style={{ color: "var(--warm-gold)", fontSize: "0.6rem", letterSpacing: "0.4em", opacity: 0.72, marginBottom: 10 }}>
            Chapter V
          </p>
          <h2 className="font-cormorant" style={{ color: "var(--champagne)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "0.05em", lineHeight: 1.2 }}>
            {event.chapter}
          </h2>
          <p className="font-cormorant italic" style={{ color: "var(--champagne)", opacity: 0.42, fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", marginTop: 12 }}>
            {event.date}
          </p>
        </div>

        <div
          className="absolute left-1/2 top-[74vh] z-6 w-[min(700px,90vw)] -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: showRevealText ? 1 : 0, transform: `translateY(${showRevealText ? 0 : 18}px)`, transition: "opacity 1.1s ease, transform 1.1s ease" }}
        >
          <p className="font-jost uppercase" style={{ color: "var(--warm-gold)", fontSize: "0.58rem", letterSpacing: "0.35em", opacity: 0.8, marginBottom: 12 }}>
            {event.date}
          </p>
          <h3 className="font-cormorant" style={{ color: "var(--champagne)", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 300, lineHeight: 1.2, letterSpacing: "0.05em" }}>
            The future doubled.
          </h3>
          <p className="font-cormorant italic" style={{ color: "rgba(245,230,200,0.62)", fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.55, margin: "14px auto 0", maxWidth: 520 }}>
            One journey became two new paths.
          </p>
        </div>
      </div>
    </div>
  );
}
