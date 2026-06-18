import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/constants";
import { GlowButton } from "@/components/ui/GlowButton";
import { CheckCircle2 } from "lucide-react";
import { ParticleField } from "@/components/special/ParticleField";
import { NoiseTexture } from "@/components/special/NoiseTexture";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () =>
    createSeoHead({
      title: `Web Development Services | ${SITE.shortName}`,
      description:
        "Frontend development, UI/UX design, SaaS websites, speed optimization, animations, and custom web applications by ZORVIX STUDIO.",
      path: "/services",
  }),
});

function ServicesPage() {
  return (
    <>
      <section className="section-surface-hero relative isolate overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
        {/* Particle field */}
        <div className="absolute inset-0 -z-10">
          <ParticleField density={56} />
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[80vw] w-[80vw] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-30" />

        <NoiseTexture opacity={0.05} />

        <div className="container-x">
          <SectionLabel number="01" label="Services" />
          <h1 className="mt-8 max-w-5xl font-display text-[14vw] leading-[0.95] tracking-[-0.04em] md:text-[8vw] lg:text-[7rem]">
            <SplitText text="Services we" />
            <br />
            <SplitText text="deliver" delay={0.2} />{" "}
            <SplitText text="exceptionally." delay={0.4} wordClassName="text-gradient" />
          </h1>
          <p className="mt-10 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            We focus on a curated set of development and design services where we excel. This
            ensures we deliver top-tier quality and real business results for every single project.
          </p>
        </div>
      </section>

      <section className="section-surface-neutral section-pad">
        <div className="container-x">
          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.slug}
                  className="card-premium group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at top right, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%)",
                    }}
                  />
                  <div className="relative flex items-start justify-between">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border-strong bg-surface text-primary transition-all duration-500 group-hover:scale-110 group-hover:border-primary/60 group-hover:rotate-[-6deg]">
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative mt-8 space-y-3">
                    <h3 className="font-display text-2xl tracking-tight">{s.title}</h3>
                    <p className="font-body text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                  <ul className="relative mt-6 space-y-2 border-t border-border pt-6">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2 font-body text-xs text-foreground/80"
                      >
                        <CheckCircle2 size={12} className="text-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-surface-blue section-pad text-center">
        <div className="container-x">
          <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
            Have a unique project?
            <br />
            <span className="text-gradient">Let's discuss details.</span>
          </h2>
          <div className="mt-10 flex justify-center">
            <GlowButton href="/contact" size="lg">
              Book a Consultation
            </GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}
