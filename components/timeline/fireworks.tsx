"use client";

import { useEffect, useRef } from "react";

// Fireworks renders a canvas burst animation when triggered.
// We keep it self-contained and only animate when `active` is true.

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  radius: number;
};

type FireworkProps = {
  active: boolean;
};

const COLORS = [
  "#ffd700", "#ff6b9d", "#64b5f6", "#f0c97a",
  "#ff8a65", "#ce93d8", "#ffffff", "#f5e6c8",
];

function burst(x: number, y: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1.5;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.008,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      radius: Math.random() * 2 + 1,
    };
  });
}

export function Fireworks({ active }: FireworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    particles: Particle[];
    frameId: number;
    lastBurst: number;
  }>({ particles: [], frameId: 0, lastBurst: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const state = stateRef.current;

    if (!active) {
      state.particles = [];
      return;
    }

    // Trigger initial bursts in various positions
    const spawnBursts = () => {
      const positions = [
        [0.2, 0.25], [0.5, 0.15], [0.8, 0.25],
        [0.35, 0.4], [0.65, 0.35],
      ];
      for (const [px, py] of positions) {
        const newParticles = burst(
          canvas.width * px,
          canvas.height * py,
          40
        );
        state.particles.push(...newParticles);
      }
    };

    spawnBursts();
    state.lastBurst = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Periodically spawn new bursts
      if (Date.now() - state.lastBurst > 1800) {
        spawnBursts();
        state.lastBurst = Date.now();
      }

      state.particles = state.particles.filter((p) => p.alpha > 0.01);

      for (const p of state.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.vx *= 0.99;
        p.alpha -= p.decay;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      state.frameId = requestAnimationFrame(animate);
    };

    state.frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(state.frameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 3,
        opacity: active ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    />
  );
}
