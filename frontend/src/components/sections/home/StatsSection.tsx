import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

const STATS = [
  { value: 3, suffix: "+", label: "Projects shipped" },
  { value: 1, suffix: "+", label: "Years of experience" },
  { value: 3, suffix: "+", label: "Happy clients" },
  { value: 99, suffix: "%", label: "Client satisfaction" },
];

export function StatsSection() {
  return (
    <section className="section-surface-hero relative section-pad">
      <div className="container-x">
        <SectionLabel number="06" label="By the numbers" />
        <StaggerChildren className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-[0_22px_60px_-40px_rgba(54,76,124,0.18)] sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="section-surface-neutral relative p-10">
              <div className="font-display text-6xl leading-none tracking-[-0.04em] text-foreground md:text-7xl">
                <AnimatedCounter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </div>
              <div className="pointer-events-none absolute right-6 top-6 h-1 w-12 bg-primary" />
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
