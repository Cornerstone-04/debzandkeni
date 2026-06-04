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
      className="relative w-[min(88vw,520px)] rounded-[22px] px-6 py-7 text-center backdrop-blur-md"
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
          fontSize: "0.58rem",
          letterSpacing: "0.35em",
          opacity: 0.76,
          marginBottom: "18px",
        }}
      >
        Countdown to January
      </p>

      <div className="grid grid-cols-3 gap-3">
        {[
          { value: months, label: "months" },
          { value: weeks, label: "weeks" },
          { value: days, label: "days" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl px-3 py-4"
            style={{
              background: "rgba(245,230,200,0.055)",
              border: "1px solid rgba(245,230,200,0.08)",
            }}
          >
            <p
              className="font-cormorant"
              style={{
                color: "var(--champagne)",
                fontSize: "clamp(2rem, 8vw, 4.2rem)",
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              {String(item.value).padStart(2, "0")}
            </p>
            <p
              className="font-jost uppercase"
              style={{
                color: "rgba(245,230,200,0.5)",
                fontSize: "0.52rem",
                letterSpacing: "0.22em",
                marginTop: "8px",
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
          fontSize: "clamp(1rem, 2.4vw, 1.25rem)",
          letterSpacing: "0.03em",
          lineHeight: 1.55,
          margin: "20px auto 0",
          maxWidth: "360px",
        }}
      >
        Soon this space can hold names, photos, times, weights, and the first details of two new lives.
      </p>
    </div>
  );
}
