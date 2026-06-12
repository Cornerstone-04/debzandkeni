export const TwinsSVG = ({
  split,
  splitDistance,
}: {
  split: number;
  splitDistance: number;
}) => {
  return (
    <svg
      viewBox="0 0 480 360"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
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

      <rect width="480" height="360" fill="rgba(5,6,15,0.2)" />
      <ellipse
        cx="240"
        cy="184"
        rx="172"
        ry="116"
        fill="url(#ultrasoundGlow)"
        opacity="0.65"
      />
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

      <g transform={`translate(${-splitDistance * split} 0)`}>
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

      <g transform={`translate(${splitDistance * split} 0)`}>
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
  );
};
