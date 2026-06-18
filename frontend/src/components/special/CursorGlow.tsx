import { useEffect, useRef } from "react";

/**
 * Soft cursor-follow glow for premium hero backgrounds.
 * Kept DOM-only so it stays light and avoids extra animation dependencies.
 */
export function CursorGlow({ className = "" }: { className?: string }) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      mx = event.clientX;
      my = event.clientY;
      glow.style.opacity = "1";
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    const tick = () => {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[1] h-72 w-72 rounded-full opacity-0 blur-3xl transition-opacity duration-500 ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(37, 99, 235, 0.055), rgba(59, 130, 246, 0.03) 38%, transparent 70%)",
      }}
    />
  );
}
