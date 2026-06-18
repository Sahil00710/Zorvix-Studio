import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * GSAP parallax wrapper — translates child Y based on scroll progress.
 */
export function ParallaxSection({
  children,
  className = "",
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelector<HTMLElement>("[data-parallax-inner]");
    if (!inner) return;
    const tween = gsap.to(inner, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div data-parallax-inner className="will-change-transform">
        {children}
      </div>
    </div>
  );
}

export { ScrollTrigger };
