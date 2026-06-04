"use client";

type TwinRevealProps = {
  progress: number;
};

export function TwinReveal({ progress }: TwinRevealProps) {
  const reveal = Math.max(0, Math.min(1, (progress - 0.18) / 0.3));
  const split = Math.max(0, Math.min(1, (progress - 0.48) / 0.28));
  const glow = 0.18 + reveal * 0.3;

  return (
    <div
      className="absolute left-1/2 top-[42vh] z-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        opacity: reveal,
        transform: `translate(-50%, -50%) scale(${0.88 + reveal * 0.12})`,
        transition: "none",
      }}
      aria-hidden="true"
    >
      <div
        className="relative w-[min(76vw,430px)] aspect-[4/3] rounded-[22px] overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, rgba(245,230,200,0.1), rgba(12,18,40,0.72) 42%, rgba(8,11,26,0.92))",
          border: "1px solid rgba(240,201,122,0.28)",
          boxShadow: `0 0 ${44 + reveal * 70}px rgba(212,168,83,${glow}), inset 0 1px 0 rgba(245,230,200,0.12)`,
        }}
      >
        <svg viewBox="0 0 480 360" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="ultrasoundGlow" cx="50%" cy="50%" r="58%">
              <stop offset="0%" stopColor="rgba(245,230,200,0.48)" />
              <stop offset="48%" stopColor="rgba(212,168,83,0.14)" />
              <stop offset="100%" stopColor="rgba(5,6,15,0)" />
            </radialGradient>
            <filter id="softBlur">
              <feGaussianBlur stdDeviation="1.8" />
            </filter>
          </defs>

          <rect width="480" height="360" fill="rgba(5,6,15,0.42)" />
          <ellipse cx="240" cy="184" rx="172" ry="116" fill="url(#ultrasoundGlow)" />
          <path
            d="M94 190 C128 116 185 86 242 98 C301 111 357 144 392 206"
            stroke="rgba(245,230,200,0.16)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M98 222 C164 256 260 266 384 222"
            stroke="rgba(245,230,200,0.13)"
            strokeWidth="2"
            fill="none"
          />

          <g transform={`translate(${-42 * split} 0)`}>
            <ellipse
              cx="218"
              cy="183"
              rx="42"
              ry="52"
              fill="rgba(245,230,200,0.24)"
              filter="url(#softBlur)"
            />
            <circle cx="205" cy="172" r="20" fill="rgba(245,230,200,0.28)" />
            <path
              d="M230 190 C214 203 202 211 186 228"
              stroke="rgba(245,230,200,0.35)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>

          <g transform={`translate(${42 * split} 0)`}>
            <ellipse
              cx="262"
              cy="184"
              rx="42"
              ry="52"
              fill="rgba(245,230,200,0.22)"
              filter="url(#softBlur)"
            />
            <circle cx="276" cy="171" r="20" fill="rgba(245,230,200,0.27)" />
            <path
              d="M248 191 C264 202 276 213 292 229"
              stroke="rgba(245,230,200,0.34)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>

          <path
            d="M240 70 C242 118 242 202 240 294"
            stroke={`rgba(240,201,122,${split * 0.5})`}
            strokeWidth="1.5"
            strokeDasharray="4 9"
            fill="none"
          />
        </svg>

        <div
          className="absolute left-4 right-4 top-3 flex items-center justify-between font-jost uppercase"
          style={{
            color: "rgba(240,201,122,0.62)",
            fontSize: "0.55rem",
            letterSpacing: "0.28em",
          }}
        >
          <span>June 2026</span>
          <span>Two heartbeats</span>
        </div>
      </div>
    </div>
  );
}
