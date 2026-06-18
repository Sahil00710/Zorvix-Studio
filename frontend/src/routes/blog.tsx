import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { BLOG_POSTS } from "@/data/blog-posts";
import { SITE } from "@/lib/constants";
import { ParticleField } from "@/components/special/ParticleField";
import { NoiseTexture } from "@/components/special/NoiseTexture";
import { createSeoHead } from "@/lib/seo";
import blogFeaturedImage from "@/assets/projects/Blog.png";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () =>
    createSeoHead({
      title: `Web Design & Development Blog | ${SITE.shortName}`,
      description:
        "Read practical guides on web design, frontend development, animation performance, typography, conversion, and website strategy.",
      path: "/blog",
  }),
});

function BlogPage() {
  const featured = BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0];
  const rest = BLOG_POSTS.filter((post) => post.slug !== featured.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-background pb-16 pt-40 md:pb-24 md:pt-48">
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
          <SectionLabel number="01" label="Journal" />
          <h1 className="mt-8 max-w-5xl font-display text-[14vw] leading-[0.95] tracking-[-0.04em] md:text-[8vw] lg:text-[7rem]">
            <SplitText text="Insights and" />
            <br />
            <SplitText text="ideas from our" delay={0.2} />{" "}
            <SplitText text="team." delay={0.4} wordClassName="text-gradient" />
          </h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            data-cursor="hover"
            className="group relative grid gap-10 overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50 lg:grid-cols-[1.2fr_1fr] lg:p-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-primary-glow ring-1 ring-primary/30">
                  Featured
                </span>
                <span>{featured.category}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                {featured.title}
              </h2>
              <p className="max-w-xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {featured.author} · {featured.date}
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-strong transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-surface to-background">
              <img
                src={blogFeaturedImage}
                alt={featured.title}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/28 via-transparent to-transparent" />
              <div className="absolute inset-0 grid-overlay opacity-25" />
            </div>
          </Link>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-x">
          <div className="mb-10 flex items-end justify-between border-b border-border pb-6">
            <SectionLabel number="02" label="Recent essays" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {rest.length} posts
            </span>
          </div>
          <StaggerChildren className="grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                data-cursor="hover"
                className="group flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="text-primary">{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-2xl leading-[1.1] tracking-tight md:text-3xl">
                  {post.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span>{post.date}</span>
                  <ArrowUpRight
                    size={14}
                    className="text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
