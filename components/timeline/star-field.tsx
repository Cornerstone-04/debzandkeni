"use client";

import { useEffect, useRef } from "react";

// StarField renders a canvas with procedurally generated stars.
// We generate them once on mount, then animate a slow twinkle with requestAnimationFrame.
// Each star has a random position, size, opacity, and twinkle speed.

type Star = {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
};

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to the full viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars once
    const STAR_COUNT = 280;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // Most stars are tiny; a few are slightly larger
      radius: Math.random() < 0.85 ? Math.random() * 0.8 + 0.2 : Math.random() * 1.5 + 0.8,
      baseOpacity: Math.random() * 0.6 + 0.2,
      opacity: 0,
      twinkleSpeed: Math.random() * 0.005 + 0.002,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let frameId: number;
    let t = 0;

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        // Sine wave twinkle per star
        star.opacity =
          star.baseOpacity +
          Math.sin(t * star.twinkleSpeed + star.twinkleOffset) * 0.25;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 213, 176, ${Math.max(0, Math.min(1, star.opacity))})`;
        ctx.fill();
      }

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
