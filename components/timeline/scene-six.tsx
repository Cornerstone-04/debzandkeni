"use client";

import { useEffect, useRef, useState } from "react";
import { journeyToJanuaryMilestones } from "@/data/timeline-events";

export function SceneSix() {
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

  const showOpening = progress < 0.12;
  const showMilestones = progress >= 0.1;
  const bgParallax = progress * -34;
  const midParallax = progress * -62;
  const activeIndex = Math.min(
    journeyToJanuaryMilestones.length - 1,
    Math.floor(Math.max(0, progress - 0.12) / 0.12)
  );
  const activeMilestone = journeyToJanuaryMilestones[activeIndex];
  const activeVisible = Math.max(0, Math.min(1, (progress - 0.12) / 0.08));

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
          className="absolute inset-0 z-5 hidden pointer-events-none md:block"
          style={{ opacity: showMilestones ? 1 : 0, transition: "opacity 0.8s ease" }}
        >
          {journeyToJanuaryMilestones.map((milestone, index) => {
            const t = index / (journeyToJanuaryMilestones.length - 1);
            const reveal = Math.max(0, Math.min(1, (progress - (0.13 + index * 0.105)) / 0.08));
            const isActive = index === activeIndex;
            const pathY = index % 2 === 0 ? 68 - t * 36 - Math.sin(t * Math.PI) * 6 : 70 - t * 20;
            const left = 16 + t * 68;
            const opacity = isActive ? reveal : index < activeIndex ? 0.24 : 0;

            return (
              <article
                key={milestone.id}
                className="absolute rounded-[18px] px-5 py-4 text-left backdrop-blur-md sci-panel"
                style={{
                  left: `${left}%`,
                  top: `${pathY}%`,
                  width: "min(24vw, 250px)",
                  minWidth: "218px",
                  opacity,
                  transform: `translate(-50%, ${24 - reveal * 24}px) scale(${isActive ? 1 : 0.92})`,
                  background:
                    "linear-gradient(145deg, rgba(8,13,30,0.8), rgba(12,18,40,0.62), rgba(13,28,46,0.45))",
                  border: `1px solid rgba(154,223,255,${isActive ? 0.32 : 0.14})`,
                  boxShadow: isActive
                    ? "0 14px 48px rgba(0,0,0,0.34), 0 0 32px rgba(103,243,255,0.12), 0 0 28px rgba(212,168,83,0.1)"
                    : "0 8px 26px rgba(0,0,0,0.22)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="system-label">Checkpoint {String(index + 1).padStart(2, "0")}</span>
                  <span
                    style={{
                      height: 1,
                      width: 30,
                      background: "linear-gradient(90deg, rgba(154,223,255,0.56), transparent)",
                    }}
                  />
                </div>
                <p className="font-jost uppercase" style={{ color: "var(--warm-gold)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", opacity: 0.86, marginBottom: 10 }}>
                  {milestone.month}
                </p>
                <h3 className="font-cormorant" style={{ color: "var(--champagne)", fontSize: "clamp(1.25rem, 2.2vw, 1.58rem)", fontWeight: 650, lineHeight: 1.06, marginBottom: 10 }}>
                  {milestone.title}
                </h3>
                <p className="font-cormorant italic" style={{ color: "rgba(245,230,200,0.62)", fontSize: "1rem", fontWeight: 500, lineHeight: 1.34 }}>
                  {milestone.description}
                </p>
              </article>
            );
          })}
        </div>

        <div
          className="absolute left-1/2 top-[48vh] z-6 w-[min(88vw,390px)] -translate-x-1/2 -translate-y-1/2 pointer-events-none md:hidden"
          style={{ opacity: showMilestones ? activeVisible : 0, transition: "opacity 0.8s ease" }}
        >
          <article
            key={activeMilestone.id}
            className="rounded-[22px] px-5 py-5 text-left backdrop-blur-md sci-panel"
            style={{
              transform: `translateY(${18 - activeVisible * 18}px)`,
              background:
                "linear-gradient(145deg, rgba(8,13,30,0.84), rgba(12,18,40,0.68), rgba(13,28,46,0.54))",
              border: "1px solid rgba(154,223,255,0.3)",
              boxShadow: "0 14px 54px rgba(0,0,0,0.34), 0 0 34px rgba(103,243,255,0.12), 0 0 26px rgba(212,168,83,0.1)",
            }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="system-label">Checkpoint {String(activeIndex + 1).padStart(2, "0")}</span>
                <p className="font-jost uppercase" style={{ color: "var(--warm-gold)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", opacity: 0.86, marginTop: 8 }}>
                  {activeMilestone.month}
                </p>
              </div>
              <div className="flex gap-1.5 pt-1">
                {journeyToJanuaryMilestones.map((milestone, index) => (
                  <span
                    key={milestone.id}
                    className="block h-1.5 rounded-full"
                    style={{
                      width: index === activeIndex ? 18 : 6,
                      background:
                        index === activeIndex
                          ? "rgba(212,168,83,0.86)"
                          : index < activeIndex
                            ? "rgba(154,223,255,0.5)"
                            : "rgba(245,230,200,0.18)",
                      boxShadow: index === activeIndex ? "0 0 12px rgba(212,168,83,0.24)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
            <h3 className="font-cormorant" style={{ color: "var(--champagne)", fontSize: "clamp(1.62rem, 7vw, 2.05rem)", fontWeight: 650, lineHeight: 1.04, marginBottom: 12 }}>
              {activeMilestone.title}
            </h3>
            <p className="font-cormorant italic" style={{ color: "rgba(245,230,200,0.66)", fontSize: "clamp(1.04rem, 4vw, 1.16rem)", fontWeight: 500, lineHeight: 1.38 }}>
              {activeMilestone.description}
            </p>
          </article>
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
