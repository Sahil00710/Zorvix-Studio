import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "We discuss your business goals, target audience, and project requirements. We outline a clear, actionable roadmap before starting the project.",
  },
  {
    n: "02",
    title: "Design",
    body: "We create a customized visual style and layout in Figma, focusing on conversion, branding, and an exceptional user experience.",
  },
  {
    n: "03",
    title: "Develop",
    body: "We transform the designs into a clean, high-performance website, optimizing for speed, mobile devices, and search engines (SEO).",
  },
  {
    n: "04",
    title: "Deliver",
    body: "We launch your website and run exhaustive quality tests. We also provide post-launch support to ensure a seamless transition.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-surface-blue relative overflow-hidden section-pad">
      <div className="container-x">
        <SectionLabel number="04" label="How we work" />
        <FadeIn>
          <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Four steps. <span className="text-gradient">Zero complications.</span>
          </h2>
        </FadeIn>

        <div className="relative mt-20">
          {/* Connecting line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent md:block"
          />
          <StaggerChildren className="grid gap-12 md:grid-cols-4" stagger={0.15}>
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <div className="relative z-10 mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-sm tracking-widest text-primary shadow-glow-soft">
                  {s.n}
                </div>
                <h3 className="font-display text-2xl tracking-tight">{s.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
