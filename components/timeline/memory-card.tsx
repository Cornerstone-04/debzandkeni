"use client";

// MemoryCard renders a single floating "memory" — a glassmorphic card
// that holds a date, label, and an icon. Cards drift in from different
// directions as scroll progress passes their threshold.
//
// Props:
//   label       — short memory text
//   date        — e.g. "January 4"
//   icon        — emoji or small SVG char
//   entryFrom   — which direction it enters from ("left" | "right" | "bottom")
//   threshold   — progress value at which this card starts appearing (0–1)
//   progress    — current scene progress (0–1)
//   style       — position overrides (top/left/right/bottom as CSS strings)

type MemoryCardProps = {
  label: string;
  date: string;
  icon: string;
  entryFrom: "left" | "right" | "bottom";
  threshold: number;
  exitThreshold?: number;
  progress: number;
  positionStyle: React.CSSProperties;
};

export function MemoryCard({
  label,
  date,
  icon,
  entryFrom,
  threshold,
  exitThreshold,
  progress,
  positionStyle,
}: MemoryCardProps) {
  // How far past this card's threshold we are (0 → 1)
  const cardProgress = Math.max(0, Math.min(1, (progress - threshold) / 0.18));
  const exitProgress =
    exitThreshold === undefined
      ? 1
      : Math.max(0, Math.min(1, (exitThreshold - progress) / 0.12));
  const { transform: positionTransform, ...positionRest } = positionStyle;

  // Entry translation: cards slide in from their direction
  const translateMap = {
    left: `translateX(${-40 + cardProgress * 40}px)`,
    right: `translateX(${40 - cardProgress * 40}px)`,
    bottom: `translateY(${30 - cardProgress * 30}px)`,
  };

  return (
    <div
      className="absolute z-5 transition-none rounded-xl backdrop-blur-md px-4.5 py-3.5 sci-panel"
      style={{
        opacity: cardProgress * exitProgress,
        transform: `${positionTransform ?? ""} ${translateMap[entryFrom]}`.trim(),
        zIndex: 5,
        background:
          "linear-gradient(145deg, rgba(8,13,30,0.78), rgba(12,18,40,0.58) 62%, rgba(13,28,46,0.5))",
        border: "1px solid rgba(154, 223, 255, 0.22)",
        padding: "18px 22px",
        minWidth: "180px",
        maxWidth: "240px",
        boxShadow:
          "0 8px 34px rgba(0,0,0,0.42), 0 0 24px rgba(103,243,255,0.08), inset 0 1px 0 rgba(245,230,200,0.12)",
        ...positionRest,
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="system-label">Memory node</p>
        <div
          style={{
            width: 28,
            height: 1,
            background: "linear-gradient(90deg, rgba(154,223,255,0.58), transparent)",
          }}
        />
      </div>

      {/* Icon */}
      <div style={{ fontSize: "1.7rem", marginBottom: "8px" }}>{icon}</div>

      {/* Date */}
      <p
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.66rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "rgba(240,201,122,0.88)",
          textTransform: "uppercase",
          opacity: 0.82,
          marginBottom: "6px",
        }}
      >
        {date}
      </p>

      {/* Label */}
      <p
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.12rem",
          fontWeight: 600,
          fontStyle: "italic",
          color: "var(--champagne)",
          lineHeight: 1.28,
          opacity: 0.94,
        }}
      >
        {label}
      </p>

      {/* Subtle top-left corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "20px",
          height: "20px",
          borderTop: "1px solid rgba(154,223,255,0.48)",
          borderLeft: "1px solid rgba(154,223,255,0.48)",
          borderTopLeftRadius: "12px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "34px",
          height: "22px",
          borderRight: "1px solid rgba(212,168,83,0.34)",
          borderBottom: "1px solid rgba(212,168,83,0.34)",
          borderBottomRightRadius: "12px",
        }}
      />
    </div>
  );
}
