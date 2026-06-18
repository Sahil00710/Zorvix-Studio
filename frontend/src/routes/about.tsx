import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { TEAM } from "@/data/team";
import { GlowButton } from "@/components/ui/GlowButton";
import { SITE } from "@/lib/constants";
import { Target, Eye, Award, Zap, Heart, Layers } from "lucide-react";
import { ParticleField } from "@/components/special/ParticleField";
import { NoiseTexture } from "@/components/special/NoiseTexture";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    createSeoHead({
      title: `About ${SITE.shortName} | Frontend Web Studio`,
      description:
        "Meet ZORVIX STUDIO, a frontend and creative web studio building fast, cinematic websites and custom web applications for ambitious brands.",
      path: "/about",
  }),
});

const WHY = [
  {
    icon: Award,
    title: "Design-First",
    body: "Every project starts with custom designs in Figma. We ensure your website looks spectacular before writing code.",
  },
  {
    icon: Zap,
    title: "Interactive & Smooth",
    body: "We craft elegant animations and interactive transitions to make your site feel premium and responsive.",
  },
  {
    icon: Layers,
    title: "Modern Technology",
    body: "We build using robust frameworks like React and Next.js so your site is fast, secure, and easy to maintain.",
  },
  {
    icon: Heart,
    title: "Direct Collaboration",
    body: "You work directly with our core team. No middlemen, ensuring faster updates and zero miscommunication.",
  },
  {
    icon: Target,
    title: "Transparent Pricing",
    body: "We quote fixed prices based on your project deliverables. No hidden fees or unexpected hourly billing.",
  },
  {
    icon: Eye,
    title: "Obsessive Quality",
    body: "We rigorously test every pixel, page speed, link, and button to ensure your launch is completely flawless.",
  },
];

const TIMELINE = [
  {
    year: "Late 2025",
    title: "The idea took shape",
    body: "ZORVIX STUDIO started at the end of 2025 with a clear goal: build modern websites and products with a sharper eye for quality.",
  },
  {
    year: "Early 2026",
    title: "Studio buildout",
    body: "The studio identity, workflows, and service foundation were fully implemented in 2026 to turn the idea into a real operating studio.",
  },
  {
    year: "2026",
    title: "Today",
    body: "Today, ZORVIX STUDIO runs as a focused solo practice led by Sahil Talsaniya, delivering full stack development with direct collaboration and no layers in between.",
  },
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-surface-hero relative isolate overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
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
          <SectionLabel number="01" label="About the studio" />
          <h1 className="mt-8 max-w-5xl font-display text-[14vw] leading-[0.95] tracking-[-0.04em] md:text-[8vw] lg:text-[7rem]">
            <SplitText text="A small studio" />
            <br />
            <SplitText text="for ambitious" delay={0.2} />{" "}
            <SplitText text="brands." delay={0.4} wordClassName="text-gradient" />
          </h1>
          <p className="mt-10 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            ZORVIX STUDIO is a specialized frontend web development and UI/UX design studio. We
            design and develop high-performance websites and custom web applications for startups,
            SaaS products, and modern brands worldwide — out of {SITE.location}.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-surface-neutral section-pad">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionLabel number="02" label="Mission" />
            <FadeIn>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Make your digital brand <span className="text-gradient">unforgettable.</span>
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
                Most websites online look like they were built from the same generic template. We
                build fully custom web experiences that capture your unique brand identity and drive
                business growth.
              </p>
            </FadeIn>
          </div>
          <div className="space-y-6">
            <SectionLabel number="03" label="Vision" />
            <FadeIn delay={0.15}>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Set a new standard for <span className="text-gradient">web performance</span> and
                design.
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
                Whether we are launching a marketing page or building a complex application
                dashboard, we maintain the highest standards of code cleanliness, speed, and visual
                layouts.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-surface-blue section-pad">
        <div className="container-x">
          <SectionLabel number="04" label="Why teams pick us" />
          <FadeIn>
            <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
              Six reasons we earn the work.
            </h2>
          </FadeIn>
          <StaggerChildren className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="card-premium group relative rounded-3xl p-8 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 hover:shadow-glow-soft"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border-strong bg-surface text-primary transition-transform group-hover:scale-110">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-tight">{w.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                    {w.body}
                  </p>
                </div>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-surface-neutral section-pad">
        <div className="container-x">
          <SectionLabel number="05" label="The road so far" />
          <FadeIn>
            <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
              Built from late 2025. <span className="text-gradient">Shaped in 2026.</span>
            </h2>
          </FadeIn>
          <ol className="relative mt-16 space-y-12 border-l border-border-strong pl-8 md:pl-12">
            {TIMELINE.map((t, index) => (
              <FadeIn
                key={`${t.year}-${t.title}`}
                delay={index * 0.12}
                duration={1.15}
                y={36}
                threshold={0.2}
              >
                <li className="relative">
                  <span className="absolute -left-[2.4rem] top-1 h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_var(--primary)] md:-left-[3.4rem]" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    {t.year}
                  </div>
                  <h3 className="mt-2 font-display text-3xl tracking-tight">{t.title}</h3>
                  <p className="mt-2 max-w-2xl font-body text-base text-muted-foreground">
                    {t.body}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="section-surface-blue section-pad">
        <div className="container-x">
          <SectionLabel number="06" label="The team" />
          <FadeIn>
            <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
              One builder. <span className="text-gradient">Direct collaboration.</span>
            </h2>
          </FadeIn>
          <StaggerChildren className="mt-16 grid gap-6 lg:grid-cols-[1fr_minmax(320px,440px)_1fr] lg:items-center">
            <div className="card-premium rounded-3xl p-8 lg:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                What you get
              </div>
              <h3 className="mt-4 font-display text-3xl tracking-tight">One point of contact.</h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                Every conversation, decision, and revision happens directly with the person building
                the product. That keeps communication faster, clearer, and more useful.
              </p>
            </div>

            {TEAM[0] && <SoloTeamCard member={TEAM[0]} />}

            <div className="card-premium rounded-3xl p-8 lg:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                How I work
              </div>
              <h3 className="mt-4 font-display text-3xl tracking-tight">Design, build, refine.</h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                From UI direction to frontend architecture and backend implementation, the process
                stays tight and hands-on so the final product feels cohesive from end to end.
              </p>
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* Skills */}
      <section className="section-surface-neutral section-pad">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionLabel number="07" label="Capability stack" />
            <FadeIn>
              <h2 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
                Deep where it counts.
              </h2>
            </FadeIn>
          </div>
          <div className="space-y-6">
            {[
              ["Frontend Development", 96],
              ["Interactive Animation", 94],
              ["Product Design", 88],
              ["Performance & SEO", 92],
              ["Design Systems", 95],
            ].map(([label, pct]) => (
              <div key={String(label)}>
                <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
                  <span className="text-foreground">{label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    <AnimatedCounter to={Number(pct)} suffix="%" />
                  </span>
                </div>
                <div className="mt-3 h-px w-full overflow-hidden bg-border">
                  <div
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: `${pct}%`, boxShadow: "0 0 8px var(--primary)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-surface-hero section-pad text-center">
        <div className="container-x">
          <FadeIn>
            <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
              Ready to start? <br />
              <span className="text-gradient">Let's discuss your next project.</span>
            </h2>
          </FadeIn>
          <div className="mt-10 flex justify-center">
            <GlowButton href="/contact" size="lg">
              Start a conversation
            </GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}

function SoloTeamCard({ member }: { member: (typeof TEAM)[number] }) {
  return (
    <div data-cursor="hover" className="group relative h-[29rem] [perspective:1000px]">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="card-premium absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 text-center [backface-visibility:hidden] lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-32 rounded-b-[2rem] opacity-50 blur-2xl"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="relative flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/15 font-display text-3xl text-primary-glow ring-1 ring-primary/30">
              {member.initials}
            </div>
            <div className="mt-6 font-display text-2xl tracking-tight">{member.name}</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {member.role}
            </div>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
              Building thoughtful, fast, and scalable digital products with direct founder-led
              execution.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-primary/40 bg-surface p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-glow-soft lg:p-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              About Sahil
            </div>
            <p className="mt-5 font-body text-sm leading-relaxed text-foreground/90">
              {member.bio}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {member.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
