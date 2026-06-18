import { useEffect, useRef } from "react";

/**
 * Right-side scroll progress bar.
 */
export function ScrollIndicator() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const progress = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
        if (barRef.current) {
          barRef.current.style.height = `${progress * 100}%`;
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-[40vh] w-px -translate-y-1/2 bg-border md:block"
    >
      <div
        ref={barRef}
        className="absolute left-0 top-0 w-px bg-primary"
        style={{
          height: "0%",
          boxShadow: "0 0 8px var(--primary)",
        }}
      />
    </div>
  );
}
