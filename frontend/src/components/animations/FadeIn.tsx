import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  triggerOnScroll?: boolean;
  threshold?: number;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 0.9,
  triggerOnScroll = true,
  threshold = 0.15,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { y, opacity: 0 });
    const play = () => gsap.to(el, { y: 0, opacity: 1, duration, delay, ease: "expo.out" });
    if (!triggerOnScroll) {
      play();
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            play();
            obs.disconnect();
          }
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, y, duration, triggerOnScroll, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
