import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/data/blog-posts";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { FadeIn } from "@/components/animations/FadeIn";
import { GlowButton } from "@/components/ui/GlowButton";
import { SITE } from "@/lib/constants";
import { articleSchema, createSeoHead } from "@/lib/seo";

const ARTICLE_CONTENT: Record<
  string,
  { intro: string; sections: Array<{ title: string; body: string }> }
> = {
  "designing-cinematic-hero-sections": {
    intro:
      "A strong hero section earns attention in seconds. It should communicate what the company does, why it matters, and what the visitor should do next without making them work for the answer.",
    sections: [
      {
        title: "Lead with a clear promise",
        body: "The headline should frame the business value immediately. Strong hero sections avoid vague creative language and instead pair personality with a concrete outcome.",
      },
      {
        title: "Support the headline with proof",
        body: "Use a concise subheading, one primary call to action, and one visual that reinforces the product story. Too many competing elements weakens the first impression.",
      },
      {
        title: "Animate with restraint",
        body: "Motion should guide attention, not slow comprehension. Prioritize smooth entrance timing, gentle depth, and readable contrast over flashy effects.",
      },
    ],
  },
  "gsap-scrolltrigger-performance": {
    intro:
      "Animation quality is not only about aesthetics. On modern marketing sites, performance decides whether motion feels premium or frustrating.",
    sections: [
      {
        title: "Animate transform and opacity first",
        body: "Stick to GPU-friendly properties wherever possible. Layout-heavy animation on width, height, or top and left tends to create jank on weaker devices.",
      },
      {
        title: "Reduce work outside the viewport",
        body: "Use lazy loading, visibility checks, and shorter timelines for off-screen sections. The smoothest sites avoid doing full animation work before the user reaches it.",
      },
      {
        title: "Design for mobile constraints",
        body: "Scroll interactions that feel great on desktop can become heavy on small devices. Tune trigger distances, particle density, and blur intensity for lower-powered screens.",
      },
    ],
  },
  "typography-for-modern-saas": {
    intro:
      "Typography is one of the fastest ways to signal whether a product feels trustworthy, contemporary, and easy to use.",
    sections: [
      {
        title: "Choose a distinct display voice",
        body: "A product brand benefits from a heading font with enough personality to be memorable, but not so much that it fights readability or makes long pages tiring.",
      },
      {
        title: "Keep the body system calm",
        body: "Body copy should prioritize clarity, comfortable line height, and predictable spacing. When headings are expressive, body text should feel stable and quiet.",
      },
      {
        title: "Build a real type scale",
        body: "Consistent heading, paragraph, and caption sizes create rhythm across the site. Random jumps in size make even strong designs feel unfinished.",
      },
    ],
  },
  "tanstack-start-the-quiet-upgrade": {
    intro:
      "The best stack decisions support both launch speed and long-term maintainability. Founders often feel the cost of early technical choices much later.",
    sections: [
      {
        title: "Match the stack to the product",
        body: "A landing page, a content-heavy marketing site, and a dashboard all have different needs. Choose the framework that fits rendering, routing, and data complexity.",
      },
      {
        title: "Protect performance from day one",
        body: "Code splitting, image discipline, and stable metadata matter from the first release. Retrofitting performance after growth is usually more expensive.",
      },
      {
        title: "Optimize for iteration",
        body: "A startup website should be easy to update. Reusable components, clean routes, and consistent styling tokens make future changes much faster.",
      },
    ],
  },
  "the-five-second-rule": {
    intro:
      "Visitors decide quickly whether a site feels relevant. The first screen needs to answer who you are, what you offer, and whether the result is worth exploring.",
    sections: [
      {
        title: "Make the value obvious",
        body: "Visitors should not need to decode the business model. The combination of headline, supporting copy, and call to action should remove that friction immediately.",
      },
      {
        title: "Use proof near the fold",
        body: "A featured project, recognizable metric, testimonial, or trust marker helps users believe the promise before they scroll too far.",
      },
      {
        title: "Remove hesitation",
        body: "Weak contrast, vague CTAs, and cluttered visual layers add uncertainty. Clear decisions in layout and copy increase confidence fast.",
      },
    ],
  },
};

interface LoaderData {
  post: BlogPost;
  next: BlogPost;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): LoaderData => {
    const post = BLOG_POSTS.find((entry) => entry.slug === params.slug);
    if (!post) throw notFound();
    const index = BLOG_POSTS.findIndex((entry) => entry.slug === params.slug);
    const next = BLOG_POSTS[(index + 1) % BLOG_POSTS.length];
    return { post, next };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return createSeoHead({
        title: `Article | ${SITE.name}`,
        description: "Read website design and frontend development insights from ZORVIX STUDIO.",
        path: "/blog",
      });
    }

    const path = `/blog/${loaderData.post.slug}`;
    return createSeoHead({
      title: `${loaderData.post.title} | ${SITE.shortName}`,
      description: loaderData.post.excerpt,
      path,
      type: "article",
      jsonLd: [
        articleSchema({
          title: loaderData.post.title,
          description: loaderData.post.excerpt,
          path,
          datePublished: loaderData.post.date,
          author: loaderData.post.author,
        }),
      ],
    });
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const { post, next } = Route.useLoaderData();
  const article = ARTICLE_CONTENT[post.slug];

  return (
    <>
      <section className="bg-background pb-16 pt-32 md:pb-24">
        <div className="container-x">
          <Link
            to="/blog"
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={14} /> Back to journal
          </Link>
          <div className="mt-10 max-w-5xl">
            <SectionLabel label={`${post.category} · ${post.readTime}`} />
            <h1 className="mt-6 font-display text-[12vw] leading-[0.95] tracking-[-0.04em] md:text-[8vw] lg:text-[6.5rem]">
              <SplitText text={post.title} />
            </h1>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {post.author} · {post.date}
            </div>
            <p className="mt-8 max-w-3xl font-body text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionLabel number="01" label="Overview" />
          <FadeIn>
            <div className="space-y-8">
              <p className="max-w-3xl font-body text-lg leading-relaxed text-foreground/90">
                {article?.intro ?? post.excerpt}
              </p>
              {article?.sections.map((section, index) => (
                <div
                  key={section.title}
                  className="rounded-3xl border border-border bg-card p-8 md:p-10"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                    0{index + 1}
                  </div>
                  <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-bg-2 section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionLabel number="02" label="Key takeaway" />
          <p className="max-w-3xl font-display text-3xl leading-[1.15] tracking-tight md:text-4xl">
            Strong frontend work earns trust fast. Clear structure, careful motion, and deliberate
            performance choices make the whole brand feel more credible.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <Link
            to="/blog/$slug"
            params={{ slug: next.slug }}
            data-cursor="hover"
            className="group flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-10 transition-all hover:-translate-y-1 hover:border-primary/50 md:flex-row md:items-center"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Next article
              </div>
              <div className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
                {next.title}
              </div>
              <div className="mt-2 font-body text-sm text-muted-foreground">{next.excerpt}</div>
            </div>
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-border-strong text-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight size={22} />
            </div>
          </Link>

          <div className="mt-16 text-center">
            <GlowButton href="/contact" size="lg">
              Need this level of frontend polish?
            </GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}
