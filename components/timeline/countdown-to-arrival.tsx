"use client";

import { useEffect, useState } from "react";

type CountdownToArrivalProps = {
  targetDate?: string;
  progress?: number;
};

type RemainingTime = {
  days: number;
  months: number;
  weeks: number;
};

const DEFAULT_TARGET = "2027-01-01T00:00:00";

function getRemainingTime(targetDate: string, nowMs: number): RemainingTime {
  const target = new Date(targetDate);
  const diff = Math.max(0, target.getTime() - nowMs);
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    weeks: Math.ceil(days / 7),
    months: Math.max(0, Math.ceil(days / 30.44)),
  };
}

export function CountdownToArrival({
  targetDate = DEFAULT_TARGET,
  progress = 1,
}: CountdownToArrivalProps) {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const glowProgress = Math.max(0, Math.min(1, progress));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNowMs(Date.now());
    }, 60 * 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  const remaining = getRemainingTime(targetDate, nowMs);
  const months = remaining.months;
  const weeks = remaining.weeks;
  const days = remaining.days;

  return (
    <div
      className="relative w-[min(92vw,620px)] rounded-[24px] px-6 py-8 text-center backdrop-blur-md md:px-8 md:py-9"
      style={{
        background: "rgba(12,18,40,0.56)",
        border: "1px solid rgba(212,168,83,0.24)",
        boxShadow: `0 12px 60px rgba(0,0,0,0.35), 0 0 ${
          36 + glowProgress * 60
        }px rgba(212,168,83,${0.08 + glowProgress * 0.14})`,
      }}
    >
      <p
        className="font-jost uppercase"
        style={{
          color: "var(--warm-gold)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.28em",
          opacity: 0.82,
          marginBottom: "22px",
        }}
      >
        Countdown to January
      </p>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { value: months, label: "months" },
          { value: weeks, label: "weeks" },
          { value: days, label: "days" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl px-3 py-5 md:px-4 md:py-6"
            style={{
              background: "rgba(245,230,200,0.055)",
              border: "1px solid rgba(245,230,200,0.08)",
            }}
          >
            <p
              className="font-cormorant"
              style={{
                color: "var(--champagne)",
                fontSize: "clamp(2.25rem, 10vw, 5rem)",
                fontWeight: 650,
                lineHeight: 1,
              }}
            >
              {String(item.value).padStart(2, "0")}
            </p>
            <p
              className="font-jost uppercase"
              style={{
                color: "rgba(245,230,200,0.5)",
                fontSize: "0.64rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                marginTop: "10px",
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <p
        className="font-cormorant italic"
        style={{
          color: "rgba(245,230,200,0.6)",
          fontSize: "clamp(1.12rem, 4.2vw, 1.45rem)",
          fontWeight: 500,
          letterSpacing: "0.03em",
          lineHeight: 1.45,
          margin: "24px auto 0",
          maxWidth: "460px",
        }}
      >
        Soon this space can hold names, photos, times, weights, and the first details of two new lives.
      </p>
    </div>
  );
}
