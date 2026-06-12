"use client";

import Image from "next/image";
import { useIsMobile } from "./use-is-mobile";
import { TwinsSVG } from "./twins-svg";

type TwinRevealProps = {
  progress: number;
};

export function TwinReveal({ progress }: TwinRevealProps) {
  const isMobile = useIsMobile();
  const reveal = Math.max(0, Math.min(1, (progress - 0.18) / 0.3));
  const split = Math.max(0, Math.min(1, (progress - 0.48) / 0.28));
  const glow = 0.18 + reveal * 0.3;
  const splitDistance = isMobile ? 30 : 42;

  return (
    <div
      className="absolute left-1/2 top-1/2 z-5 pointer-events-none md:top-[42vh]"
      style={{
        opacity: reveal,
        transform: "translate(-50%, -50%)",
        transition: "none",
      }}
      aria-hidden="true"
    >
      <div
        className="relative w-[min(94vw,720px)] overflow-hidden rounded-[20px] sci-panel md:w-[min(82vw,860px)] md:rounded-3xl"
        style={{
          height: isMobile ? "min(54vh, 340px)" : "min(54vh, 430px)",
          transform: `scale(${0.88 + reveal * 0.12})`,
          transformOrigin: "center",
          background:
            "linear-gradient(145deg, rgba(154,223,255,0.12), rgba(12,18,40,0.74) 42%, rgba(8,11,26,0.94))",
          border: "1px solid rgba(154,223,255,0.28)",
          boxShadow: `0 0 ${isMobile ? 28 + reveal * 42 : 44 + reveal * 70}px rgba(103,243,255,${
            glow * 0.72
          }), 0 0 ${24 + reveal * 46}px rgba(212,168,83,0.12), inset 0 1px 0 rgba(245,230,200,0.12)`,
        }}
      >
        <div className="grid h-full grid-cols-2">
          <div
            className="relative overflow-hidden"
            style={{
              borderRight: "1px solid rgba(154,223,255,0.18)",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(245,230,200,0.08), transparent 62%), rgba(5,6,15,0.34)",
            }}
          >
            {/* SVG Twin Reveal */}
            <TwinsSVG split={split} splitDistance={splitDistance} />
            <div
              className="absolute bottom-3 left-3 font-jost uppercase"
              style={{
                color: "rgba(154,223,255,0.62)",
                fontSize: isMobile ? "0.5rem" : "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              Symbolic scan
            </div>
          </div>

          <div
            className="relative overflow-hidden"
            style={{ background: "rgba(0,0,0,0.92)" }}
          >
            <Image
              src="/images/twins-ultrasound.jpeg"
              alt=""
              fill
              sizes={isMobile ? "47vw" : "430px"}
              className="object-cover"
              style={{
                opacity: 0.32 + reveal * 0.62,
                filter: `contrast(${1.02 + reveal * 0.08}) brightness(${0.82 + reveal * 0.1}) saturate(0.9)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 48%, transparent 38%, rgba(8,11,26,0.38) 82%), linear-gradient(180deg, rgba(154,223,255,0.08), transparent 34%, rgba(8,11,26,0.12))",
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute bottom-3 left-3 font-jost uppercase"
              style={{
                color: "rgba(240,201,122,0.7)",
                fontSize: isMobile ? "0.5rem" : "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              Real ultrasound
            </div>
          </div>
        </div>

        <div
          className="absolute left-3 right-3 top-3 flex items-center justify-between gap-3 font-jost uppercase md:left-4 md:right-4"
          style={{
            zIndex: 3,
            color: "rgba(154,223,255,0.68)",
            fontSize: isMobile ? "0.58rem" : "0.68rem",
            fontWeight: 700,
            letterSpacing: isMobile ? "0.16em" : "0.24em",
          }}
        >
          <span>June 2026</span>
          <span style={{ color: "rgba(240,201,122,0.76)", textAlign: "right" }}>
            Two heartbeats
          </span>
        </div>
      </div>
    </div>
  );
}
