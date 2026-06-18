import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import { PROJECT_IMAGES } from "@/data/project-images";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { FadeIn } from "@/components/animations/FadeIn";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import { GlowButton } from "@/components/ui/GlowButton";
import { SITE } from "@/lib/constants";
import { createSeoHead, creativeWorkSchema } from "@/lib/seo";

interface LoaderData {
  project: Project;
  next: Project;
}

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): LoaderData => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    const idx = PROJECTS.findIndex((p) => p.slug === params.slug);
    const next = PROJECTS[(idx + 1) % PROJECTS.length];
    return { project, next };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return createSeoHead({
        title: `Project | ${SITE.name}`,
        description: "Explore a ZORVIX STUDIO website project case study.",
        path: "/projects",
      });
    }
    const { project } = loaderData;
    const path = `/projects/${project.slug}`;
    return createSeoHead({
      title: `${project.title} Case Study | ${SITE.shortName}`,
      description: project.excerpt,
      path,
      type: "article",
      jsonLd: [
        creativeWorkSchema({
          title: project.title,
          description: project.excerpt,
          path,
          category: project.category,
        }),
      ],
    });
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background pt-32">
      <div className="text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          404
        </div>
        <h1 className="mt-6 font-display text-6xl tracking-tight">Project not found</h1>
        <Link to="/projects" className="mt-8 inline-flex items-center gap-2 text-primary">
          <ArrowLeft size={16} /> Back to all projects
        </Link>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project, next } = Route.useLoaderData() as LoaderData;
  const img = PROJECT_IMAGES[project.slug];
  const hasLiveUrl = project.liveUrl && project.liveUrl !== "#";

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-background pt-32">
        <div className="container-x">
          <Link
            to="/projects"
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={14} /> All projects
          </Link>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel label={`${project.category} · ${project.year}`} />
              <h1 className="mt-6 max-w-4xl font-display text-[12vw] leading-[0.95] tracking-[-0.04em] md:text-[8vw] lg:text-[7rem]">
                <SplitText text={project.title} />
              </h1>
              <p className="mt-6 max-w-2xl font-body text-lg text-muted-foreground">
                {project.excerpt}
              </p>
            </div>
            {hasLiveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-primary"
                data-cursor="hover"
              >
                Visit live <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        <ParallaxSection speed={0.15} className="mt-16">
          <div className="container-x">
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={img}
                alt={`${project.title} hero mockup`}
                width={1920}
                height={1200}
                loading="eager"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* Overview */}
      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionLabel number="01" label="Overview" />
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {[
              ["Client", project.client],
              ["Role", project.role],
              ["Timeline", project.timeline],
              ["Year", project.year],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {k}
                </div>
                <div className="mt-2 font-display text-2xl tracking-tight">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="bg-bg-2 section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionLabel number="02" label="Challenge" />
          <div>
            <FadeIn>
              <p className="font-display text-3xl leading-[1.2] tracking-tight md:text-4xl">
                {project.challenge}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionLabel number="03" label="Approach" />
          <div>
            <FadeIn>
              <p className="font-body text-lg leading-relaxed text-foreground/90 md:text-xl">
                {project.solution}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Design tokens */}
      <section className="bg-bg-2 section-pad">
        <div className="container-x">
          <SectionLabel number="04" label="Design system" />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Palette
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.palette.map((c) => (
                  <div key={c.hex} className="overflow-hidden rounded-2xl border border-border">
                    <div className="h-24" style={{ background: c.hex }} />
                    <div className="px-4 py-3">
                      <div className="font-display text-sm tracking-tight">{c.name}</div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {c.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Typography
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Display
                  </div>
                  <div className="mt-3 font-display text-4xl tracking-tight">
                    {project.typography.display}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Body
                  </div>
                  <div className="mt-3 font-body text-3xl">{project.typography.body}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionLabel number="05" label="Technologies" />
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border-strong bg-surface px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-bg-2 section-pad">
        <div className="container-x">
          <SectionLabel number="06" label="Results" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {project.results.map((r) => (
              <div key={r.label} className="bg-background p-10">
                <div className="font-display text-5xl tracking-[-0.04em] text-foreground md:text-6xl">
                  {r.value}
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="section-pad">
        <div className="container-x">
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            data-cursor="hover"
            className="group flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-10 transition-all hover:-translate-y-1 hover:border-primary/50 md:flex-row md:items-center"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Next project
              </div>
              <div className="mt-4 font-display text-4xl tracking-tight md:text-6xl">
                {next.title}
              </div>
              <div className="mt-2 font-body text-sm text-muted-foreground">{next.excerpt}</div>
            </div>
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-border-strong text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
              <ArrowRight size={22} />
            </div>
          </Link>

          <div className="mt-16 text-center">
            <GlowButton href="/contact" size="lg">
              Want results like this?
            </GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}
