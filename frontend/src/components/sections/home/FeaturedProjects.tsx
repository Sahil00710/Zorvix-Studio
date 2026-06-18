import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/animations/FadeIn";
import { PROJECTS } from "@/data/projects";
import { PROJECT_IMAGES } from "@/data/project-images";
import { ArrowUpRight } from "lucide-react";

/**
 * Horizontally-scrolled project reel.
 * Uses ScrollTrigger pin: the section pins as the user scrolls vertically,
 * and the inner rail translates horizontally based on scroll progress.
 */
export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const featured = PROJECTS.slice(0, 4);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const rail = railRef.current!;
      const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + 64);
      const holdDistance = () => Math.min(220, Math.max(120, window.innerHeight * 0.2));

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + holdDistance()}`,
          pin: true,
          scrub: 0.45,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      timeline
        .to({}, { duration: holdDistance() })
        .to(rail, {
          x: () => -distance(),
          ease: "none",
          duration: distance(),
        });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      <section
        ref={sectionRef}
        className="section-surface-hero relative overflow-hidden pt-12 pb-8 md:pt-16 md:pb-10 lg:pt-16 lg:pb-12"
      >
        <div className="container-x mb-8 md:mb-10">
          <SectionLabel number="03" label="Featured work" />
          <div className="mt-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <FadeIn>
              <h2 className="max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                Selected <span className="text-gradient">case studies</span>
                <br />
                from the past 18 months.
              </h2>
            </FadeIn>
            <Link
              to="/projects"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-foreground"
            >
              All projects
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            ref={railRef}
            className="flex flex-col gap-8 px-5 md:flex-row md:items-start md:gap-8 md:px-16 md:will-change-transform"
          >
            {featured.map((p, i) => (
              <ProjectReelCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectReelCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
  };

  return (
    <Link
      ref={ref}
      to="/projects/$slug"
      params={{ slug: project.slug }}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="card-premium group relative flex w-full shrink-0 flex-col overflow-hidden rounded-3xl transition-transform duration-300 ease-out hover:transition-none md:h-[min(28rem,46svh)] md:w-[72vw] lg:h-[min(30rem,46svh)] lg:w-[56vw] xl:h-[min(32rem,46svh)] xl:w-[50vw]"
      style={{
        transformStyle: "preserve-3d",
        clipPath: "inset(0 round 1.5rem)",
      }}
    >
      <div className="relative min-h-0 flex-[1_1_70%] overflow-hidden">
        <img
          src={PROJECT_IMAGES[project.slug]}
          alt={`${project.title} - case study mockup`}
          width={1920}
          height={1080}
          loading={index === 0 ? "eager" : "lazy"}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-50" />
        <div className="absolute right-5 top-5">
          <span className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-black">
            {project.category}
          </span>
        </div>
      </div>
      <div className="flex flex-[0_0_auto] items-center justify-between gap-6 p-6 lg:p-7">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/70">
            {String(index + 1).padStart(2, "0")} · {project.year}
          </div>
          <div className="mt-2 font-display text-2xl tracking-tight text-black lg:text-3xl">
            {project.title}
          </div>
          <div className="mt-1 line-clamp-2 font-body text-sm text-black/75">
            {project.excerpt}
          </div>
        </div>
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/15 text-black transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
          <ArrowUpRight size={18} />
        </div>
      </div>
    </Link>
  );
}
