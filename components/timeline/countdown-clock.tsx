"use client";

// CountdownClock renders a New Year's Eve clock face.
// `progress` (0→1) drives a compressed final-minute countdown:
// at 0 it shows 11:59:59, at 1 it shows 00:00:00.

type CountdownClockProps = {
  progress: number;
};

function clampProgress(progress: number) {
  return Math.max(0, Math.min(1, progress));
}

function padTime(value: number) {
  return String(value).padStart(2, "0");
}

export function CountdownClock({ progress }: CountdownClockProps) {
  const clampedProgress = clampProgress(progress);
  const isStruck = clampedProgress >= 0.985;
  const remainingSeconds = isStruck ? 0 : Math.ceil((1 - clampedProgress) * 59);
  const timeString = isStruck ? "00:00:00" : `11:59:${padTime(remainingSeconds)}`;
  const clockOpacity = Math.min(1, clampedProgress * 4);

  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{ opacity: clockOpacity }}
      aria-label={`New Year's Eve countdown ${timeString}`}
    >
      {/* Date label */}
      <p
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          color: "var(--warm-gold)",
          textTransform: "uppercase",
          opacity: 0.7,
        }}
      >
        December 31, 2025
      </p>

      {/* Clock face */}
      <div
        style={{
          border: `1px solid rgba(212,168,83,${isStruck ? 0.9 : 0.35})`,
          borderRadius: "8px",
          padding: "10px 20px",
          background: isStruck
            ? "rgba(212,168,83,0.15)"
            : "rgba(8,11,26,0.7)",
          backdropFilter: "blur(8px)",
          transition: "all 0.5s ease",
          boxShadow: isStruck
            ? "0 0 30px rgba(212,168,83,0.4), 0 0 60px rgba(212,168,83,0.15)"
            : "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: isStruck ? "clamp(2.25rem, 8vw, 3rem)" : "clamp(2rem, 7vw, 2.5rem)",
            fontWeight: 300,
            letterSpacing: "0.05em",
            color: isStruck ? "var(--soft-gold)" : "var(--champagne)",
            transition: "all 0.5s ease",
            lineHeight: 1,
          }}
        >
          {timeString}
        </p>
      </div>

      {/* Midnight label */}
      {isStruck && (
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "var(--soft-gold)",
            letterSpacing: "0.1em",
            animation: "fadeInUp 0.8s ease forwards",
          }}
        >
          Midnight
        </p>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
