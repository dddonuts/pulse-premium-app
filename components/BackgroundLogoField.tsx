"use client";

import { useEffect, useMemo, useRef } from "react";
import { frames, type FrameId } from "@/frames";

type Body = {
  id: string;
  src: string;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
};

function pickFrameSrc(i: number): string {
  const ids = Object.keys(frames) as FrameId[];
  return frames[ids[i % ids.length]].src;
}

export function BackgroundLogoField() {
  const bodies = useMemo<Body[]>(() => {
    // Génération pseudo-aléatoire déterministe (pas besoin de libs).
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const count = 32; // moins -> plus fluide
    return Array.from({ length: count }).map((_, i) => {
      const size = 110 + rnd() * 120; // 110..230
      const speed = 34 + rnd() * 46; // 34..80 px/s (plus vif)
      const angle = rnd() * Math.PI * 2;

      return {
        id: `bg-logo-${i}`,
        src: pickFrameSrc(i),
        r: size / 2,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: rnd() * 360,
        vrot: (rnd() * 2 - 1) * 14, // deg/s
      };
    });
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const lastTRef = useRef<number>(0);
  const lastDrawRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Hitbox plus petite que l'image (les PNG ont du "vide" autour du cercle).
    const HITBOX = 0.78;

    const init = () => {
      const rect = el.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };
      // placement initial non-chevauchant (best effort)
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const pad = 40;
        const hr = b.r * HITBOX;
        const maxX = Math.max(pad + hr, rect.width - pad - hr);
        const maxY = Math.max(pad + hr, rect.height - pad - hr);
        // deterministic-ish: on disperse sur une grille, puis léger jitter
        const cols = Math.ceil(Math.sqrt(bodies.length));
        const gx = (i % cols) / Math.max(1, cols - 1);
        const gy = Math.floor(i / cols) / Math.max(1, cols - 1);
        b.x = pad + hr + gx * (maxX - (pad + hr));
        b.y = pad + hr + gy * (maxY - (pad + hr));
      }
    };

    init();
    const ro = new ResizeObserver(() => init());
    ro.observe(el);

    const TARGET_FPS = 60;
    const FRAME_MS = 1000 / TARGET_FPS;

    // Interaction souris: les logos "fuient" le curseur
    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    const step = (t: number) => {
      const { w, h } = sizeRef.current;
      const dt = lastTRef.current ? Math.min(0.025, (t - lastTRef.current) / 1000) : 0.016;
      lastTRef.current = t;

      // Repulsion du curseur (si actif)
      const { x: mx, y: my, active } = mouseRef.current;
      if (active && w > 0 && h > 0) {
        const INFLUENCE_R = 420; // rayon d'influence (px)
        const STRENGTH = 5200; // accélération approx (px/s^2)
        for (const b of bodies) {
          const dx = b.x - mx;
          const dy = b.y - my;
          const dist2 = dx * dx + dy * dy;
          if (dist2 <= 1 || dist2 > INFLUENCE_R * INFLUENCE_R) continue;
          const dist = Math.sqrt(dist2);
          const nx = dx / dist;
          const ny = dy / dist;
          const falloff = 1 - dist / INFLUENCE_R; // 0..1
          const accel = STRENGTH * falloff * falloff; // plus doux, plus naturel
          b.vx += nx * accel * dt;
          b.vy += ny * accel * dt;
        }
      }

      // intégration + murs
      for (const b of bodies) {
        // limite vitesse pour rester smooth
        const MAX_SPEED = 140;
        const speed = Math.hypot(b.vx, b.vy);
        if (speed > MAX_SPEED) {
          const s = MAX_SPEED / speed;
          b.vx *= s;
          b.vy *= s;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.rot += b.vrot * dt;
        // damping très léger = plus smooth
        b.vx *= 0.999;
        b.vy *= 0.999;

        const hr = b.r * HITBOX;
        if (b.x - hr < 0) {
          b.x = hr;
          b.vx *= -1;
        } else if (b.x + hr > w) {
          b.x = w - hr;
          b.vx *= -1;
        }
        if (b.y - hr < 0) {
          b.y = hr;
          b.vy *= -1;
        } else if (b.y + hr > h) {
          b.y = h - hr;
          b.vy *= -1;
        }
      }

      // collisions (naïf, suffisant pour ~50)
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const b = bodies[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist2 = dx * dx + dy * dy;
          const minD = (a.r + b.r) * HITBOX;
          if (dist2 === 0 || dist2 >= minD * minD) continue;
          const dist = Math.sqrt(dist2);
          const nx = dx / dist;
          const ny = dy / dist;

          // séparation (push apart)
          const overlap = (minD - dist) * 0.5;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;

          // rebond élastique (composante normale)
          const dvx = b.vx - a.vx;
          const dvy = b.vy - a.vy;
          const rel = dvx * nx + dvy * ny;
          if (rel > 0) continue;
          const RESTITUTION = 0.92;
          const impulse = -(1.0 + RESTITUTION) * rel * 0.5; // masses égales
          a.vx -= impulse * nx;
          a.vy -= impulse * ny;
          b.vx += impulse * nx;
          b.vy += impulse * ny;
        }
      }

      // appliquer transforms DOM (cap FPS)
      if (t - lastDrawRef.current >= FRAME_MS) {
        lastDrawRef.current = t;
        for (const b of bodies) {
          const img = imgRefs.current[b.id];
          if (!img) continue;
          const x = b.x - b.r;
          const y = b.y - b.r;
          img.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${b.rot}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [bodies]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base gradient (cosmic) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(139,92,246,0.16),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.14),transparent_52%),radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-black/25" />

      {/* Animated logo field */}
      <div ref={containerRef} className="absolute inset-0 opacity-100">
        {bodies.map((b) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={b.id}
            src={b.src}
            alt=""
            className="absolute will-change-transform select-none"
            style={{
              width: `${b.r * 2}px`,
              height: `${b.r * 2}px`,
              opacity: 0.24,
              filter: "blur(0px) saturate(1.25) contrast(1.10)",
              mixBlendMode: "screen",
              transform: "translate3d(0,0,0)",
            }}
            ref={(el) => {
              imgRefs.current[b.id] = el;
            }}
          />
        ))}
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.58)_100%)]" />
    </div>
  );
}

