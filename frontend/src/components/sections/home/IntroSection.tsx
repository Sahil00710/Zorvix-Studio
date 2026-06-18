import { Star } from "lucide-react";

const ITEMS = [
  "Frontend Development",
  "Custom Web Apps",
  "UI / UX Design",
  "Interactive Animation",
  "Speed Optimization",
  "SaaS Interfaces",
  "High-Converting Landing Pages",
  "Responsive Layouts",
  "SEO Optimization",
  "Design Systems",
];

export function IntroSection() {
  return (
    <section className="section-surface-blue relative overflow-hidden border-y border-border py-14">
      <div className="container-x mb-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Trusted by forward-thinking brands across SaaS, fintech, and creative
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 items-center gap-12 pr-12 animate-marquee">
          {[...ITEMS, ...ITEMS].map((t, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12">
              <Star size={14} className="text-primary" />
              <span className="whitespace-nowrap font-display text-2xl tracking-tight text-foreground/80 md:text-3xl">
                {t}
              </span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-12 pr-12 animate-marquee" aria-hidden>
          {[...ITEMS, ...ITEMS].map((t, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12">
              <Star size={14} className="text-primary" />
              <span className="whitespace-nowrap font-display text-2xl tracking-tight text-foreground/80 md:text-3xl">
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
