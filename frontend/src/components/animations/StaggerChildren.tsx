import { Children, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  delay?: number;
  threshold?: number;
}

export function StaggerChildren({
  children,
  className = "",
  stagger = 0.1,
  y = 30,
  delay = 0,
  threshold = 0.15,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return;
    gsap.set(items, { y, opacity: 0 });
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger,
              delay,
              ease: "expo.out",
            });
            obs.disconnect();
          }
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stagger, y, delay, threshold]);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child) => child)}
    </div>
  );
}
