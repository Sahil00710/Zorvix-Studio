import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/animations/FadeIn";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const next = () => setI((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="section-surface-neutral relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-10" />
      <div className="container-x relative">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-6">
            <SectionLabel number="05" label="What clients say" />
            <FadeIn>
              <h2 className="max-w-2xl font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
                Trusted by founders
                <br />
                <span className="text-gradient">and product leaders.</span>
              </h2>
            </FadeIn>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              data-cursor="hover"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-strong text-foreground transition hover:bg-surface"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              data-cursor="hover"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-strong text-foreground transition hover:bg-surface"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative min-h-[28rem] overflow-hidden rounded-3xl border border-border glass-strong p-8 md:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mt-8 font-display text-3xl leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 font-display text-lg text-primary-glow ring-1 ring-primary/30">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-body text-base text-foreground">{t.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-1.5">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show testimonial ${k + 1}`}
                className={`h-1 rounded-full transition-all ${k === i ? "w-10 bg-primary" : "w-5 bg-border-strong"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
