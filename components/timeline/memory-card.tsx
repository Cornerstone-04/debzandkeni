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
  progress: number;
  positionStyle: React.CSSProperties;
};

export function MemoryCard({
  label,
  date,
  icon,
  entryFrom,
  threshold,
  progress,
  positionStyle,
}: MemoryCardProps) {
  // How far past this card's threshold we are (0 → 1)
  const cardProgress = Math.max(0, Math.min(1, (progress - threshold) / 0.18));

  // Entry translation: cards slide in from their direction
  const translateMap = {
    left: `translateX(${-40 + cardProgress * 40}px)`,
    right: `translateX(${40 - cardProgress * 40}px)`,
    bottom: `translateY(${30 - cardProgress * 30}px)`,
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyle,
        opacity: cardProgress,
        transform: translateMap[entryFrom],
        transition: "none", // driven entirely by scroll, not CSS transitions
        zIndex: 5,
        // Glassmorphism card
        background: "rgba(12, 18, 40, 0.55)",
        border: "1px solid rgba(212, 168, 83, 0.2)",
        borderRadius: "12px",
        backdropFilter: "blur(12px)",
        padding: "14px 18px",
        minWidth: "140px",
        maxWidth: "180px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.08)",
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{icon}</div>

      {/* Date */}
      <p
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.55rem",
          letterSpacing: "0.25em",
          color: "var(--warm-gold)",
          textTransform: "uppercase",
          opacity: 0.75,
          marginBottom: "4px",
        }}
      >
        {date}
      </p>

      {/* Label */}
      <p
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.9rem",
          fontStyle: "italic",
          color: "var(--champagne)",
          lineHeight: 1.35,
          opacity: 0.9,
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
          borderTop: "1px solid rgba(212,168,83,0.4)",
          borderLeft: "1px solid rgba(212,168,83,0.4)",
          borderTopLeftRadius: "12px",
        }}
      />
    </div>
  );
}
