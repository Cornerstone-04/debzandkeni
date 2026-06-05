"use client";

import { CharacterSilhouette } from "./character-silhouette";

// CharacterPair renders the two illustrated figures — Debz on the left, Keni on the right.
// As the user scrolls through Scene 1, the parent passes a `progress` value (0 → 1).
// At progress=0 they are far apart. At progress=1 they've met in the center.

type CharacterPairProps = {
  progress: number; // 0 = apart, 1 = together
};

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
        <CharacterSilhouette gender="female" size="large" />
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
        <CharacterSilhouette gender="male" size="large" />
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
