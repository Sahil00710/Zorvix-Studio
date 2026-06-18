import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
}

/**
 * Lightweight Canvas2D particle field for hero atmospherics.
 * No Three.js — keeps the bundle lean and avoids SSR pitfalls.
 */
export function ParticleField({
  density = 90,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection =
      "connection" in navigator
        ? (
            navigator as Navigator & {
              connection?: {
                saveData?: boolean;
              };
            }
          ).connection
        : undefined;
    const coarsePointer = window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;
    const lowPower =
      Boolean(connection?.saveData) || coarsePointer || (navigator.hardwareConcurrency ?? 8) <= 4;
    const animate = !reduce && !coarsePointer;
    const densityMultiplier = lowPower ? 0.45 : 1;
    const maxLinksPerParticle = lowPower ? 3 : 7;
    const linkDistance = lowPower ? 82 : 114;
    const linkDistanceSq = linkDistance * linkDistance;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;
    let lastTime = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let cachedW = 0;
    let cachedH = 0;
    let isVisible = document.visibilityState === "visible";

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;
      const oldW = cachedW;
      const oldH = cachedH;
      cachedW = w;
      cachedH = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(
        18,
        Math.floor(((w * h) / (18500 / (density / 90))) * densityMultiplier),
      );

      if (particles.length === 0 || oldW === 0 || oldH === 0) {
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.4,
          a: Math.random() * 0.5 + 0.3,
        }));
      } else {
        // Adjust existing particles to avoid pop-in/reset flashes on resize
        particles.forEach((p) => {
          p.x = (p.x / oldW) * w;
          p.y = (p.y / oldH) * h;
        });

        if (particles.length < count) {
          const diff = count - particles.length;
          for (let i = 0; i < diff; i++) {
            particles.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.25,
              vy: (Math.random() - 0.5) * 0.25,
              r: Math.random() * 1.6 + 0.4,
              a: Math.random() * 0.5 + 0.3,
            });
          }
        } else if (particles.length > count) {
          particles = particles.slice(0, count);
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const tick = (time: number) => {
      if (!isVisible) {
        if (animate) raf = requestAnimationFrame(tick);
        return;
      }

      const delta = lastTime ? Math.min(2, (time - lastTime) / 16.6667) : 1;
      lastTime = time;
      const w = cachedW;
      const h = cachedH;
      ctx.clearRect(0, 0, w, h);

      // Connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let drawnLinks = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (drawnLinks >= maxLinksPerParticle) break;
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistanceSq) {
            drawnLinks += 1;
            const alpha = (1 - d2 / linkDistanceSq) * (lowPower ? 0.08 : 0.12);
            ctx.strokeStyle = `rgba(88, 126, 220, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 22500) {
          const f = (1 - md2 / 22500) * 0.6;
          const force = f * 0.04 * delta;
          p.vx += (mdx / Math.sqrt(md2 + 0.001)) * force;
          p.vy += (mdy / Math.sqrt(md2 + 0.001)) * force;
        }

        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        if (!lowPower) {
          ctx.fillStyle = `rgba(120, 160, 255, ${p.a * 0.16})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(90, 118, 190, ${Math.min(0.75, p.a + 0.18)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (animate) raf = requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        lastTime = 0;
      }
    };

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(resize) : null;

    resize();
    if (animate) {
      raf = requestAnimationFrame(tick);
    } else {
      tick(0);
    }
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resizeObserver?.observe(canvas);
    if (animate) {
      canvas.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver?.disconnect();
      if (animate) {
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
