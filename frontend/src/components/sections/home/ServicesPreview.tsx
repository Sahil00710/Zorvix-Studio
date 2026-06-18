import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { FadeIn } from "@/components/animations/FadeIn";
import { SERVICES } from "@/data/services";

export function ServicesPreview() {
  const featured = SERVICES.slice(0, 3);
  return (
    <section className="section-surface-neutral relative section-pad">
      <div className="container-x">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-6">
            <SectionLabel number="02" label="What we do" />
            <FadeIn>
              <h2 className="max-w-2xl font-display text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                Design <span className="text-gradient">and development</span>
                <br />
                under one roof.
              </h2>
            </FadeIn>
          </div>
          <Link
            to="/services"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-foreground"
          >
            See all services
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <StaggerChildren className="grid gap-6 md:grid-cols-3" stagger={0.12}>
          {featured.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to="/services"
                data-cursor="hover"
                className="card-premium group relative flex flex-col gap-8 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at top, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
                  }}
                />
                <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border-strong bg-surface transition-transform duration-500 group-hover:scale-110 group-hover:border-primary/60">
                  <Icon size={22} className="text-primary" />
                </div>
                <div className="relative space-y-3">
                  <h3 className="font-display text-2xl tracking-tight">{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
                <div className="relative mt-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-foreground">
                  Explore
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
