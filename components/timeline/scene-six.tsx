"use client";

import { useEffect, useRef, useState } from "react";
import { journeyToJanuaryMilestones } from "@/data/timeline-events";
import { useIsMobile } from "./use-is-mobile";

export function SceneSix() {
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

  const showOpening = progress < 0.12;
  const showMilestones = progress >= 0.1;
  const bgParallax = progress * -34;
  const midParallax = progress * -62;
  const activeIndex = Math.min(
    journeyToJanuaryMilestones.length - 1,
    Math.floor(Math.max(0, progress - 0.12) / 0.12)
  );

  return (
    <div ref={containerRef} style={{ height: "620vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: `hsl(${356 - progress * 36}, ${18 + progress * 5}%, ${12 + progress * 1.8}%)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${bgParallax}px)`, zIndex: 1 }}
        >
          <div
            className="absolute left-[-14%] top-[5%] h-[62vw] w-[62vw] rounded-[50%]"
            style={{
              background: "radial-gradient(circle, rgba(100,181,246,0.12) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute right-[-10%] top-[12%] h-[64vw] w-[64vw] rounded-[50%]"
            style={{
              background: "radial-gradient(circle, rgba(232,149,122,0.16) 0%, transparent 68%)",
              filter: "blur(92px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[54vh]"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, rgba(240,201,122,${
                0.1 + progress * 0.12
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
              d="M 160 760 C 380 620 545 530 720 455 C 900 380 1060 282 1280 130"
              stroke="rgba(232,149,122,0.22)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 160 760 C 390 720 560 675 735 615 C 910 555 1090 532 1300 480"
              stroke="rgba(100,181,246,0.2)"
              strokeWidth="2"
              fill="none"
            />
            {journeyToJanuaryMilestones.map((milestone, index) => {
              const t = index / (journeyToJanuaryMilestones.length - 1);
              const topY = 760 - t * 630 - Math.sin(t * Math.PI) * 60;
              const bottomY = 760 - t * 280 - Math.sin(t * Math.PI) * 76;
              const x = 160 + t * 1120;
              const visible = Math.max(0, Math.min(1, (progress - (0.14 + index * 0.105)) / 0.08));

              return (
                <g key={milestone.id} opacity={visible}>
                  <circle cx={x} cy={topY} r="5" fill="rgba(232,149,122,0.62)" />
                  <circle cx={x} cy={bottomY} r="5" fill="rgba(100,181,246,0.58)" />
                  <line
                    x1={x}
                    y1={topY}
                    x2={x}
                    y2={bottomY}
                    stroke="rgba(240,201,122,0.18)"
                    strokeDasharray="3 8"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
          style={{
            zIndex: 3,
            width: "2px",
            height: `${12 + progress * 24}vh`,
            background: "linear-gradient(to bottom, rgba(212,168,83,0.4), transparent)",
          }}
        />

        <div
          className="absolute left-1/2 top-[8vh] z-6 w-[min(620px,88vw)] -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: showOpening ? 1 : 0, transition: "opacity 0.9s ease" }}
        >
          <p className="chapter-kicker" style={{ color: "var(--warm-gold)", opacity: 0.72, marginBottom: 10 }}>
            Chapter VI
          </p>
          <h2 className="chapter-heading" style={{ color: "var(--champagne)" }}>
            Countdown To January
          </h2>
          <p className="chapter-date italic" style={{ color: "var(--champagne)", opacity: 0.42, marginTop: 12 }}>
            June 2026 to January 2027
          </p>
        </div>

        <div
          className="absolute left-1/2 top-[25vh] z-5 grid w-[min(90vw,410px)] -translate-x-1/2 gap-3 pointer-events-none md:top-[16vh] md:w-[min(94vw,1120px)] md:grid-cols-7"
          style={{ opacity: showMilestones ? 1 : 0, transition: "opacity 0.8s ease" }}
        >
          {journeyToJanuaryMilestones.map((milestone, index) => {
            const visible = Math.max(0, Math.min(1, (progress - (0.13 + index * 0.105)) / 0.08));
            const isActive = index === activeIndex;
            const cardVisible = isMobile ? (isActive ? 1 : 0) : visible;

            return (
              <article
                key={milestone.id}
                className="rounded-xl px-5 py-5 backdrop-blur-md md:px-4 md:py-4"
                style={{
                  display: isMobile && !isActive ? "none" : undefined,
                  opacity: cardVisible,
                  transform: `translateY(${18 - cardVisible * 18}px)`,
                  background: isActive ? "rgba(12,18,40,0.68)" : "rgba(12,18,40,0.46)",
                  border: `1px solid rgba(212,168,83,${isActive ? 0.34 : 0.16})`,
                  boxShadow: isActive ? "0 10px 36px rgba(0,0,0,0.28), 0 0 28px rgba(212,168,83,0.12)" : "none",
                  minHeight: isMobile ? "220px" : "190px",
                }}
              >
                <p className="font-jost uppercase" style={{ color: "var(--warm-gold)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", opacity: 0.82, marginBottom: 12 }}>
                  {milestone.month}
                </p>
                <h3 className="font-cormorant" style={{ color: "var(--champagne)", fontSize: "clamp(1.35rem, 4.8vw, 1.75rem)", fontWeight: 650, lineHeight: 1.08, marginBottom: 12 }}>
                  {milestone.title}
                </h3>
                <p className="font-cormorant italic" style={{ color: "rgba(245,230,200,0.64)", fontSize: "clamp(1rem, 3.8vw, 1.16rem)", fontWeight: 500, lineHeight: 1.36 }}>
                  {milestone.description}
                </p>
                {milestone.locked ? (
                  <div className="mt-3 h-px w-8" style={{ background: "rgba(212,168,83,0.32)" }} />
                ) : null}
              </article>
            );
          })}
        </div>

        <div
          className="absolute bottom-[8vh] left-1/2 z-6 hidden w-[min(720px,90vw)] -translate-x-1/2 text-center pointer-events-none md:block"
          style={{ opacity: progress > 0.82 ? 1 : 0, transform: `translateY(${progress > 0.82 ? 0 : 18}px)`, transition: "opacity 1s ease, transform 1s ease" }}
        >
          <p className="story-copy italic" style={{ color: "rgba(245,230,200,0.66)", letterSpacing: "0.03em" }}>
            The path kept moving, now with room for everything still waiting to be remembered.
          </p>
        </div>
      </div>
    </div>
  );
}
