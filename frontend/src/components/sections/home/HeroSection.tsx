import { type CSSProperties, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GlowButton } from "@/components/ui/GlowButton";
import { SplitText } from "@/components/animations/SplitText";
import { ParticleField } from "@/components/special/ParticleField";
import { CursorGlow } from "@/components/special/CursorGlow";

import { NoiseTexture } from "@/components/special/NoiseTexture";
import { Sparkles } from "lucide-react";

/**
 * Cinematic hero with timeline-orchestrated reveal.
 */
export function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-eyebrow]", { y: 20, opacity: 0, duration: 0.9 }, 0.1)
        .from("[data-hero-subtitle]", { y: 30, opacity: 0, duration: 1.1 }, 0.7)
        .from("[data-hero-cta]", { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.9)
        .from("[data-hero-scroll]", { y: 20, opacity: 0, duration: 0.9 }, 1.1)
        .from("[data-hero-meta]", { opacity: 0, duration: 1, stagger: 0.1 }, 0.6);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-white pt-28"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #ffffff 0%, color-mix(in oklab, var(--background) 94%, white) 56%, color-mix(in oklab, var(--bg-2) 78%, white) 100%)",
      }}
    >
      <CursorGlow />

      {/* Tiny atmospheric particle layer */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <ParticleField density={32} />
      </div>

      {/* Gradient mesh + aurora glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-18%] -z-10 opacity-90 blur-3xl animate-aurora-drift"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.09), transparent 38%), radial-gradient(circle at 82% 58%, rgba(37, 99, 235, 0.08), transparent 40%), radial-gradient(circle at 52% 16%, rgba(125, 211, 252, 0.055), transparent 34%)",
        }}
      />

      {/* Animated grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-[0.035] animate-grid-drift"
      />

      {/* Floating geometric shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[7%] top-[26%] h-32 w-32 rounded-3xl border border-primary/15 bg-white/45 shadow-[0_24px_70px_rgba(80,110,175,0.1)] backdrop-blur-md animate-float-15"
          style={{ "--float-rotate": "12deg" } as CSSProperties}
        />
        <div
          className="absolute right-[10%] top-[20%] h-20 w-20 rounded-full border border-primary/20 bg-white/30 shadow-[0_22px_64px_rgba(80,110,175,0.08)] backdrop-blur-md animate-float-20"
          style={{ "--float-rotate": "-6deg" } as CSSProperties}
        />
        <div
          className="absolute bottom-[18%] left-[14%] h-24 w-24 border border-foreground/8 bg-white/20 backdrop-blur-sm animate-float-25"
          style={{ "--float-rotate": "45deg", animationDelay: "1.5s" } as CSSProperties}
        />
        <div
          className="absolute bottom-[22%] right-[16%] h-16 w-16 rounded-2xl bg-primary/7 shadow-[0_20px_62px_rgba(80,110,175,0.12)] backdrop-blur-sm animate-float-20"
          style={{ "--float-rotate": "8deg", animationDelay: "2.5s" } as CSSProperties}
        />
        <div
          className="absolute right-[28%] bottom-[12%] h-28 w-28 rounded-full border border-primary/12 bg-transparent animate-float-25"
          style={{ "--float-rotate": "0deg", animationDelay: "3.2s" } as CSSProperties}
        />
      </div>

      <NoiseTexture opacity={0.03} />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <div
            data-hero-eyebrow
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Accepting Projects · {new Date().getFullYear()}
            </span>
            <Sparkles size={12} className="text-primary" />
          </div>

          <h1 className="mt-8 font-display text-[10vw] font-medium leading-[1.10]  text-foreground sm:text-[9vw] md:text-[7.5vw] lg:text-[5.5rem] xl:text-[6.5rem]">
            <SplitText text="We build custom," stagger={0.05} delay={0.1} duration={1} />
            <br />
            <SplitText
              text="high-performance websites"
              stagger={0.05}
              delay={0.35}
              duration={1}
              wordClassName="text-gradient"
            />
            <br />
            <SplitText text="for ambitious brands." stagger={0.05} delay={0.6} duration={1} />
          </h1>

          <p
            data-hero-subtitle
            className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            We design and engineer lightning-fast websites and custom web applications for startups
            and modern businesses looking to stand out and scale.
          </p>

          <div
            data-hero-cta-wrap
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <div data-hero-cta>
              <GlowButton href="/projects" variant="primary" size="lg">
                View Our Work
              </GlowButton>
            </div>
            <div data-hero-cta>
              <GlowButton href="/contact" variant="outline" size="lg">
                Get In Touch
              </GlowButton>
            </div>
          </div>

          {/* Meta strip */}
          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-border py-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:grid-cols-4">
            {[
              ["Frontend", "Development"],
              ["SEO & Speed", "Optimized"],
              ["UI / UX", "Design"],
              ["Pixel-Perfect", "Guaranteed"],
            ].map(([a, b], i) => (
              <div key={i} data-hero-meta className="text-center">
                <div className="text-foreground">{a}</div>
                <div className="mt-1 text-muted-foreground/60">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-3">
          <span>Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-border">
            <span className="absolute inset-x-0 top-0 h-3 bg-primary animate-scroll-hint" />
          </span>
        </div>
      </div>
    </section>
  );
}
