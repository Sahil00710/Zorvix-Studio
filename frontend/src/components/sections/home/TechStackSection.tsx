const STACK_A = [
  "Next.js",
  "React",
  "TypeScript",
  "GSAP",
  "Tailwind",
  "Three.js",
  "Framer Motion",
  "Lenis",
  "Vite",
  "TanStack",
];
const STACK_B = [
  "Figma",
  "Spline",
  "Rive",
  "Vercel",
  "Cloudflare",
  "Supabase",
  "Stripe",
  "Sanity",
  "Resend",
  "PostHog",
];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-16 pr-16 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-4xl tracking-tight text-foreground/70 md:text-6xl"
          >
            {t}
          </span>
        ))}
      </div>
      <div
        className={`flex shrink-0 items-center gap-16 pr-16 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        aria-hidden
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-4xl tracking-tight text-foreground/70 md:text-6xl"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStackSection() {
  return (
    <section className="section-surface-blue relative overflow-hidden border-y border-border py-20">
      <div className="container-x mb-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Our toolkit · Battle-tested across every engagement
      </div>
      <div className="space-y-4">
        <Row items={STACK_A} />
        <Row items={STACK_B} reverse />
      </div>
    </section>
  );
}
