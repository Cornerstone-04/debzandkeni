"use client";

// CountdownClock renders a New Year's Eve clock face.
// `progress` (0→1) drives the countdown: at 0 it shows 11:59, at 1 it shows 00:00.
// When progress hits 1 it shows "Happy New Year" with firework bursts.

type CountdownClockProps = {
  progress: number;
};

export function CountdownClock({ progress }: CountdownClockProps) {
  // Interpolate from 11:59:59 down to 00:00:00
  const totalSeconds = Math.floor((1 - progress) * 119); // 119s span
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const isStruck = progress >= 0.98;

  const timeString = isStruck
    ? "00:00"
    : `${String(11 - (1 - Math.ceil(mins / 60))).padStart(2, "0")}:${String(59 - (59 - mins % 60)).padStart(2, "0")}`;

  // Actually let's keep it simpler: just show 11:5x counting down
  const displayMins = isStruck ? "00" : String(Math.max(0, Math.floor(59 * (1 - progress)))).padStart(2, "0");
  const displaySecs = isStruck ? "00" : String(Math.max(0, Math.floor(59 * (1 - (progress % (1/60)) * 60)))).padStart(2, "0");

  const clockOpacity = Math.min(1, progress * 4);

  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{ opacity: clockOpacity }}
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
            fontSize: isStruck ? "3rem" : "2.5rem",
            fontWeight: 300,
            letterSpacing: "0.05em",
            color: isStruck ? "var(--soft-gold)" : "var(--champagne)",
            transition: "all 0.5s ease",
            lineHeight: 1,
          }}
        >
          {isStruck ? "00:00" : `11:${displayMins}`}
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
