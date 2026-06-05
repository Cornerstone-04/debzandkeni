"use client";

import { useId } from "react";

type CharacterSilhouetteProps = {
  gender: "female" | "male";
  size?: "large" | "medium";
  glowColor?: string;
};

export function CharacterSilhouette({
  gender,
  size = "large",
  glowColor,
}: CharacterSilhouetteProps) {
  const rawId = useId().replace(/:/g, "");
  const isFemale = gender === "female";
  const className =
    size === "large"
      ? "w-26 h-52 md:w-32 md:h-64"
      : "w-20 h-40 md:w-24 md:h-48";
  const glow = glowColor ?? (isFemale ? "rgba(232,149,122,0.38)" : "rgba(100,181,246,0.34)");

  return (
    <svg
      viewBox="0 0 120 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: `drop-shadow(0 0 12px ${glow})` }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${rawId}-dress`} x1="60" y1="88" x2="60" y2="184" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e1434a" />
          <stop offset="1" stopColor="#8f121b" />
        </linearGradient>
        <linearGradient id={`${rawId}-jacket`} x1="60" y1="88" x2="60" y2="164" gradientUnits="userSpaceOnUse">
          <stop stopColor="#171717" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id={`${rawId}-bottoms`} x1="60" y1="128" x2="60" y2="214" gradientUnits="userSpaceOnUse">
          <stop stopColor="#071c34" />
          <stop offset="1" stopColor="#061428" />
        </linearGradient>
        <radialGradient id={`${rawId}-aura`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 122) rotate(90) scale(105 50)">
          <stop stopColor={isFemale ? "rgba(232,149,122,0.14)" : "rgba(100,181,246,0.12)"} />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <ellipse cx="60" cy="128" rx="50" ry="104" fill={`url(#${rawId}-aura)`} />

      {isFemale ? <FemaleFigure idBase={rawId} /> : <MaleFigure idBase={rawId} />}
    </svg>
  );
}

function FemaleFigure({ idBase }: { idBase: string }) {
  const skin = "#b87345";
  const hair = "#21100a";
  const gold = "#f3a01f";

  return (
    <>
      <ellipse cx="60" cy="228" rx="36" ry="7" fill="rgba(0,0,0,0.22)" />

      {/* Hair and head */}
      <circle cx="47" cy="22" r="16" fill={hair} />
      <circle cx="35" cy="30" r="14" fill={hair} />
      <circle cx="57" cy="19" r="15" fill={hair} />
      <path d="M35 48 C35 28 47 19 62 20 C78 21 88 34 86 51 C84 68 73 80 61 80 C46 80 35 66 35 48Z" fill={skin} />
      <path d="M36 46 C42 31 58 25 80 31 C70 21 47 19 38 36 C36 39 35 42 36 46Z" fill={hair} />
      <path d="M37 42 C50 30 70 29 84 39" stroke={gold} strokeWidth="5" strokeLinecap="round" />
      <circle cx="35" cy="55" r="5" fill={skin} />
      <path d="M35 58 C31 61 31 67 36 70" stroke="rgba(245,230,200,0.75)" strokeWidth="2.4" strokeLinecap="round" />

      {/* Neck and dress */}
      <path d="M52 78 H68 L70 94 C64 99 56 99 50 94L52 78Z" fill={skin} />
      <path d="M34 96 C41 86 79 86 86 96 C89 118 84 145 80 164 L96 224 C77 232 43 232 24 224 L40 164 C36 144 31 118 34 96Z" fill={`url(#${idBase}-dress)`} />
      <path d="M43 96 C49 104 71 104 77 96 C72 111 49 111 43 96Z" fill="rgba(245,230,200,0.2)" />
      <path d="M35 168 C49 176 71 176 85 168" stroke="rgba(80,5,12,0.26)" strokeWidth="3" strokeLinecap="round" />
      <path d="M46 220 C54 224 66 224 74 220" stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeLinecap="round" />

      {/* Arms */}
      <path d="M34 101 C26 122 25 144 27 166" stroke={skin} strokeWidth="10" strokeLinecap="round" />
      <path d="M86 101 C94 122 95 144 93 166" stroke={skin} strokeWidth="10" strokeLinecap="round" />
      <circle cx="27" cy="166" r="5" fill={skin} />
      <circle cx="93" cy="166" r="5" fill={skin} />

      {/* Shoes peeking from beneath the long dress */}
      <path d="M29 227 C38 222 47 223 51 229 C45 234 32 235 24 232 C24 230 26 228 29 227Z" fill={gold} />
      <path d="M70 229 C78 223 88 222 96 227 C96 231 92 234 86 234 C78 234 72 232 70 229Z" fill={gold} />
    </>
  );
}

function MaleFigure({ idBase }: { idBase: string }) {
  const skin = "#b87345";
  const hair = "#211813";
  const jacket = "#0a0a0b";

  return (
    <>
      <ellipse cx="60" cy="228" rx="36" ry="7" fill="rgba(0,0,0,0.22)" />

      {/* Head and hair */}
      <path d="M35 47 C35 29 46 18 62 18 C79 18 89 31 87 49 C85 67 74 80 61 80 C47 80 35 66 35 47Z" fill={skin} />
      <path d="M34 43 C33 24 47 12 64 14 C77 15 87 23 88 39 C75 32 59 33 43 39 C40 40 37 41 34 43Z" fill={hair} />
      <path d="M43 32 C54 25 70 24 86 35 C77 19 53 14 40 25 C35 29 33 35 34 43 C37 39 40 35 43 32Z" fill={hair} />

      {/* Neck, plain white shirt, black long-sleeve jacket */}
      <path d="M52 78 H68 L70 94 C64 99 56 99 50 94L52 78Z" fill={skin} />
      <path d="M28 98 C35 88 85 88 92 98 C97 118 96 141 89 158 C72 165 48 165 31 158 C24 141 23 118 28 98Z" fill={`url(#${idBase}-jacket)`} />
      <path d="M43 92 C49 96 71 96 77 92 C80 112 79 138 75 158 C66 161 54 161 45 158 C41 138 40 112 43 92Z" fill="#f8f5ef" />
      <path d="M43 92 L60 110 L77 92" stroke={jacket} strokeWidth="4" strokeLinejoin="round" />
      <path d="M29 101 C22 122 22 144 25 164" stroke={jacket} strokeWidth="14" strokeLinecap="round" />
      <path d="M91 101 C98 122 98 144 95 164" stroke={jacket} strokeWidth="14" strokeLinecap="round" />

      {/* Arms */}
      <path d="M27 154 C25 160 25 166 27 171" stroke={skin} strokeWidth="10" strokeLinecap="round" />
      <path d="M93 154 C95 160 95 166 93 171" stroke={skin} strokeWidth="10" strokeLinecap="round" />

      {/* Trousers and shoes */}
      <path d="M34 157 C50 164 72 164 87 157 L84 225 H68 L61 167 L53 225 H37 L34 157Z" fill={`url(#${idBase}-bottoms)`} />
      <path d="M32 226 C42 218 52 221 56 228 C51 234 37 235 29 232 C29 229 30 227 32 226Z" fill="#7a4618" />
      <path d="M66 228 C73 220 84 219 92 226 C92 231 88 234 81 234 C73 234 68 232 66 228Z" fill="#7a4618" />
    </>
  );
}
