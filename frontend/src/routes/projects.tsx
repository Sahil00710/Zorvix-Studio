import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { PROJECT_IMAGES } from "@/data/project-images";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ParticleField } from "@/components/special/ParticleField";
import { NoiseTexture } from "@/components/special/NoiseTexture";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () =>
    createSeoHead({
      title: `Website Portfolio & Case Studies | ${SITE.shortName}`,
      description:
        "Explore ZORVIX STUDIO case studies for SaaS landing pages, e-commerce websites, creative portfolios, gaming launches, and brand websites.",
      path: "/projects",
  }),
});

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof PROJECT_CATEGORIES)[number]>("All");

  const list = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <section className="section-surface-hero relative isolate overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
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
          <SectionLabel number="01" label="Selected work" />
          <h1 className="mt-8 max-w-5xl font-display text-[14vw] leading-[0.95] tracking-[-0.04em] md:text-[8vw] lg:text-[7rem]">
            <SplitText text="The proof" />
            <br />
            <SplitText text="lives in" delay={0.2} />{" "}
            <SplitText text="the work." delay={0.4} wordClassName="text-gradient" />
          </h1>
        </div>
      </section>

      <section className="sticky top-24 z-30 border-y border-border bg-background/88 py-4 backdrop-blur-xl">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-2">
            {PROJECT_CATEGORIES.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  data-cursor="hover"
                  onClick={() => setFilter(c)}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors",
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-surface-neutral section-pad">
        <div className="container-x">
          <motion.div layout className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(i % 3 === 0 && "md:col-span-2")}
                >
                  <ProjectCard project={p} large={i % 3 === 0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, large }: { project: (typeof PROJECTS)[number]; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const onOpenNotice = () => {
    toast.info(`${project.title} is coming soon`, {
      description: "We’re still preparing this project preview. Please check back soon.",
    });
  };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${px * 4}deg) rotateX(${-py * 4}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
  };

  return (
    <button
      type="button"
      onClick={onOpenNotice}
      data-cursor="hover"
      className="block w-full text-left"
      aria-label={`${project.title} preview is coming soon`}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="card-premium group relative overflow-hidden rounded-3xl transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          clipPath: "inset(0 round 1.5rem)",
        }}
      >
        <div
          className={cn("relative overflow-hidden", large ? "aspect-[21/10]" : "aspect-[16/11]")}
        >
          <img
            src={PROJECT_IMAGES[project.slug]}
            alt={`${project.title} project mockup`}
            width={1920}
            height={1080}
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-55" />
          <div className="absolute right-5 top-5">
            <span className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-black">
              {project.category}
            </span>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex flex-col items-start gap-4 rounded-[1.5rem] bg-gradient-to-t from-white/84 via-white/60 to-white/16 p-3 backdrop-blur-[6px] sm:inset-x-6 sm:bottom-6 sm:rounded-[1.75rem] sm:p-4 md:flex-row md:items-end md:justify-between md:gap-6">
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/70">
                {project.year} · {project.role}
              </div>
              <div className="mt-2 font-display text-2xl tracking-tight text-black sm:text-3xl md:text-4xl">
                {project.title}
              </div>
              <div className="mt-1 max-w-md text-pretty font-body text-sm leading-relaxed text-black/75">
                {project.excerpt}
              </div>
            </div>
            <div className="inline-flex h-11 w-11 shrink-0 self-end items-center justify-center rounded-full border border-black/15 bg-white/35 text-black transition-all group-hover:border-black group-hover:bg-black group-hover:text-white md:h-12 md:w-12 md:self-auto">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
