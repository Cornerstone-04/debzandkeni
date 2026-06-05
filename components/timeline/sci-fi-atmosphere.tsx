"use client";

export function SciFiAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(154,223,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(154,223,255,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)",
          opacity: 0.42,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(154,223,255,0.09), transparent)",
          opacity: 0.7,
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path
          d="M -80 740 C 280 620 472 552 720 514 C 980 474 1130 370 1520 230"
          stroke="rgba(154,223,255,0.09)"
          strokeWidth="1"
          strokeDasharray="8 16"
          fill="none"
        />
        <path
          d="M 120 820 C 372 682 576 610 820 570 C 1058 530 1190 454 1390 334"
          stroke="rgba(212,168,83,0.08)"
          strokeWidth="1"
          strokeDasharray="3 18"
          fill="none"
        />
        {[210, 480, 760, 1030, 1230].map((cx, index) => (
          <g key={cx} opacity={0.42 - index * 0.04}>
            <circle cx={cx} cy={210 + index * 68} r="22" fill="none" stroke="rgba(154,223,255,0.16)" strokeWidth="1" />
            <path d={`M ${cx - 34} ${210 + index * 68} H ${cx - 16} M ${cx + 16} ${210 + index * 68} H ${cx + 34}`} stroke="rgba(154,223,255,0.18)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
