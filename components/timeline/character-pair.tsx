"use client";

// CharacterPair renders the two illustrated figures — Debz on the left, Keni on the right.
// As the user scrolls through Scene 1, the parent passes a `progress` value (0 → 1).
// At progress=0 they are far apart. At progress=1 they've met in the center.

type CharacterPairProps = {
  progress: number; // 0 = apart, 1 = together
};

// Simple SVG silhouettes. Warm gold tones, soft glow.
function FemaleCharacter() {
  return (
    <svg
      viewBox="0 0 80 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-32 md:w-20 md:h-40"
    >
      {/* Glow aura */}
      {/* <ellipse cx="40" cy="80" rx="32" ry="72" fill="rgba(232,149,122,0.08)" /> */}
      {/* Head */}
      <circle cx="40" cy="22" r="14" fill="#BD7356" />
      {/* Hair */}
      <path
        d="M26 20 Q28 8 40 6 Q52 8 54 20 Q50 14 40 13 Q30 14 26 20Z"
        fill="#26262C"
      />
      <path
        d="M26 20 Q22 30 24 40"
        stroke="#26262C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M54 20 Q58 30 56 40"
        stroke="#26262C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Body / dress */}
      <path
        d="M28 36 Q24 50 22 70 Q20 90 24 110 L56 110 Q60 90 58 70 Q56 50 52 36Z"
        fill="#d4a853"
      />
      {/* Dress flare */}
      <path d="M24 110 Q20 130 16 150 L64 150 Q60 130 56 110Z" fill="#c49040" />
      {/* Arms */}
      <path
        d="M28 42 Q18 55 16 68"
        stroke="#BD7356"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M52 42 Q62 55 64 68"
        stroke="#BD7356"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Neck */}
      <rect x="36" y="34" width="8" height="8" rx="3" fill="#BD7356" />
      {/* Star sparkle above head */}
      <path
        d="M40 3 L41 6 L44 6 L42 8 L43 11 L40 9 L37 11 L38 8 L36 6 L39 6Z"
        fill="#f0c97a"
        opacity="0.9"
      />
    </svg>
  );
}

function MaleCharacter() {
  return (
    <svg
      viewBox="0 0 80 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-32 md:w-20 md:h-40"
    >
      {/* Glow aura */}
      {/* <ellipse cx="40" cy="80" rx="32" ry="72" fill="rgba(100,181,246,0.07)" /> */}
      {/* Head */}
      <circle cx="40" cy="22" r="14" fill="#BD7356" />
      {/* Hair */}
      <path
        d="M26 18 Q28 6 40 5 Q52 6 54 18 Q50 10 40 10 Q30 10 26 18Z"
        fill="#26262C"
      />
      {/* Body / suit */}
      <path
        d="M26 36 Q22 50 22 70 L22 115 L58 115 L58 70 Q58 50 54 36Z"
        fill="#1a2744"
      />
      {/* Shirt / collar */}
      <path
        d="M34 36 L40 50 L46 36 Q43 42 40 44 Q37 42 34 36Z"
        fill="#f5e6c8"
      />
      {/* Legs */}
      <rect x="24" y="112" width="14" height="38" rx="3" fill="#0f1829" />
      <rect x="42" y="112" width="14" height="38" rx="3" fill="#0f1829" />
      {/* Arms */}
      <path
        d="M26 42 Q16 55 14 70"
        stroke="#BD7356"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M54 42 Q64 55 66 70"
        stroke="#BD7356"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Neck */}
      <rect x="36" y="34" width="8" height="8" rx="3" fill="#BD7356" />
      {/* Star sparkle above head */}
      <path
        d="M40 3 L41 6 L44 6 L42 8 L43 11 L40 9 L37 11 L38 8 L36 6 L39 6Z"
        fill="#64b5f6"
        opacity="0.9"
      />
    </svg>
  );
}

export function CharacterPair({ progress }: CharacterPairProps) {
  // Characters start 45% off-center and converge to 4% apart at center
  // progress 0 → 1: gap closes
  const debzOffset = -45 + progress * 41; // ends at -4%
  const keniOffset = 45 - progress * 41; // ends at +4%

  // Opacity: characters fade in from 0 as the scene starts
  const charOpacity = Math.min(1, progress * 3);

  return (
    <div className="relative w-full flex items-end justify-center gap-10 h-50">
      {/* Debz — left character */}
      <div
        className="absolute transition-none translate-x-[-65%] transition-all duration-500 ease-linear"
        style={{
          left: `calc(50% + ${debzOffset}%)`,
          opacity: charOpacity,
          filter:
            progress > 0.9
              ? `drop-shadow(0 0 12px rgba(232,149,122,0.6))`
              : "none",
        }}
      >
        <FemaleCharacter />
        <p
          className="text-center mt-1 font-bold font-cormorant text-rose-warm transition-all duration-500 ease-linear "
          style={{ opacity: progress > 0.85 ? 1 : 0 }}
        >
          Debz
        </p>
      </div>

      {/* Keni — right character */}
      <div
        className="absolute transition-none translate-x-[-35%] transition-all duration-500 ease-linear"
        style={{
          left: `calc(50% + ${keniOffset}%)`,
          opacity: charOpacity,
          filter:
            progress > 0.9
              ? `drop-shadow(0 0 12px rgba(100,181,246,0.5))`
              : "none",
        }}
      >
        <MaleCharacter />
        <p
          className="text-center mt-1 font-semibold font-cormorant text-[#64b5f6] transition-all duration-500 ease-linear"
          style={{ opacity: progress > 0.85 ? 1 : 0 }}
        >
          Keni
        </p>
      </div>
    </div>
  );
}
