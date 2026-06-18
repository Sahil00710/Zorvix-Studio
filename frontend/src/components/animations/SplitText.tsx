import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: number;
  delay?: number;
  duration?: number;
  triggerOnScroll?: boolean;
  wordClassName?: string;
}

/**
 * GSAP word-level reveal. Each word slides up + fades in with a stagger.
 * No paid SplitText plugin required — we split with a deterministic regex.
 */
export function SplitText({
  text,
  className = "",
  as = "span",
  stagger = 0.06,
  delay = 0,
  duration = 0.9,
  triggerOnScroll = false,
  wordClassName,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-split-word]");
    if (!words.length) return;

    gsap.set(words, { yPercent: 110, opacity: 0 });

    const play = () =>
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: "expo.out",
      });

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
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted, stagger, delay, duration, triggerOnScroll, text]);

  const Tag = as as React.ElementType;
  const words = text.split(/(\s+)/);

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <span
              data-split-word
              className={`inline-block will-change-transform ${wordClassName ?? ""}`}
            >
              {w}
            </span>
          </span>
        ),
      )}
    </Tag>
  );
}
