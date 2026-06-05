"use client";

import { useEffect, useRef, useState } from "react";
import { timelineEvents } from "@/data/timeline-events";
import { CountdownToArrival } from "./countdown-to-arrival";

const event = timelineEvents.find((e) => e.id === "january-edd")!;

export function SceneSeven() {
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

  const bgParallax = progress * -26;
  const midParallax = progress * -48;
  const arrivalGlow = Math.max(0, Math.min(1, (progress - 0.2) / 0.42));
  const showOpening = progress < 0.18;
  const showCountdown = progress >= 0.28;
  const showFinal = progress >= 0.72;

  return (
    <div ref={containerRef} style={{ height: "440vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: `hsl(${320 - progress * 52}, ${20 + progress * 8}%, ${12 + progress * 3}%)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${bgParallax}px)`, zIndex: 1 }}
        >
          <div
            className="absolute left-1/2 top-[36%] h-[70vw] w-[70vw] -translate-x-1/2 rounded-[50%]"
            style={{
              background: `radial-gradient(circle, rgba(240,201,122,${0.08 + arrivalGlow * 0.2}) 0%, transparent 64%)`,
              filter: "blur(84px)",
            }}
          />
          <div
            className="absolute left-[-12%] top-[8%] h-[52vw] w-[52vw] rounded-[50%]"
            style={{
              background: "radial-gradient(circle, rgba(232,149,122,0.13) 0%, transparent 68%)",
              filter: "blur(86px)",
            }}
          />
          <div
            className="absolute right-[-12%] top-[10%] h-[52vw] w-[52vw] rounded-[50%]"
            style={{
              background: "radial-gradient(circle, rgba(100,181,246,0.12) 0%, transparent 68%)",
              filter: "blur(86px)",
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${midParallax}px)`, zIndex: 2 }}
        >
          <svg className="absolute h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <path
              d="M 130 760 C 360 590 520 470 720 380 C 930 286 1110 226 1320 110"
              stroke={`rgba(232,149,122,${0.16 + arrivalGlow * 0.22})`}
              strokeWidth="2.4"
              fill="none"
            />
            <path
              d="M 130 760 C 380 700 530 625 730 585 C 940 542 1130 520 1320 455"
              stroke={`rgba(100,181,246,${0.15 + arrivalGlow * 0.2})`}
              strokeWidth="2.4"
              fill="none"
            />
            <path
              d="M 720 380 C 766 428 766 540 730 585"
              stroke={`rgba(240,201,122,${arrivalGlow * 0.26})`}
              strokeWidth="1.5"
              strokeDasharray="4 10"
              fill="none"
            />
            {[0, 1].map((i) => (
              <g key={i} transform={`translate(${690 + i * 78} ${466 + i * 8})`}>
                <circle r={34 + arrivalGlow * 10} fill={`rgba(${i === 0 ? "232,149,122" : "100,181,246"},${0.08 + arrivalGlow * 0.12})`} />
                <circle r={8 + arrivalGlow * 4} fill={`rgba(${i === 0 ? "232,149,122" : "100,181,246"},${0.32 + arrivalGlow * 0.28})`} />
              </g>
            ))}
          </svg>
        </div>

        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
          style={{
            zIndex: 3,
            width: "2px",
            height: `${14 + progress * 34}vh`,
            background: `linear-gradient(to bottom, rgba(212,168,83,${0.38 + arrivalGlow * 0.28}), transparent)`,
          }}
        />

        <div
          className="absolute left-1/2 top-[9vh] z-6 w-[min(660px,88vw)] -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: showOpening ? 1 : 0, transition: "opacity 0.9s ease" }}
        >
          <p className="chapter-kicker" style={{ color: "var(--warm-gold)", opacity: 0.72, marginBottom: 10 }}>
            Chapter VII
          </p>
          <h2 className="chapter-heading" style={{ color: "var(--champagne)" }}>
            {event.date}
          </h2>
          <p className="chapter-date italic" style={{ color: "rgba(245,230,200,0.58)", marginTop: 12 }}>
            The beginning of everything.
          </p>
        </div>

        <div
          className="absolute left-1/2 top-1/2 z-5 pointer-events-none"
          style={{ opacity: showCountdown ? 1 : 0, transform: "translate(-50%, -50%)", transition: "opacity 1s ease" }}
        >
          <div
            style={{
              transform: `scale(${showCountdown ? 1 : 0.94})`,
              transformOrigin: "center",
              transition: "transform 1s ease",
            }}
          >
            <CountdownToArrival progress={arrivalGlow} />
          </div>
        </div>

        <div
          className="absolute bottom-[8vh] left-1/2 z-6 w-[min(720px,90vw)] -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: showFinal ? 1 : 0, transform: `translateY(${showFinal ? 0 : 18}px)`, transition: "opacity 1.1s ease, transform 1.1s ease" }}
        >
          <p className="reveal-kicker" style={{ color: "var(--warm-gold)", opacity: 0.78, marginBottom: 16 }}>
            {event.title}
          </p>
          <h3 className="reveal-heading" style={{ color: "var(--champagne)" }}>
            The beginning of everything.
          </h3>
          <p className="story-copy italic" style={{ color: "rgba(245,230,200,0.62)", margin: "14px auto 0", maxWidth: 560 }}>
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}
