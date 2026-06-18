import { GlowButton } from "@/components/ui/GlowButton";
import { SplitText } from "@/components/animations/SplitText";
import { ParticleField } from "@/components/special/ParticleField";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SITE } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="section-surface-neutral relative isolate overflow-hidden section-pad">
      <div className="absolute inset-0 -z-10 opacity-28">
        <ParticleField density={48} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-10"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel number="07" label="Let's build" className="justify-center" />
          <h2 className="mt-8 font-display text-[12vw] leading-[0.95] tracking-[-0.04em] md:text-[7vw] lg:text-[6rem]">
            <SplitText text="Ready to build" stagger={0.05} triggerOnScroll />
            <br />
            <SplitText
              text="something extraordinary ?"
              stagger={0.05}
              triggerOnScroll
              wordClassName="text-gradient"
            />
          </h2>
          <p className="mx-auto mt-8 max-w-lg font-body text-base text-muted-foreground md:text-lg">
            Tell us about your brand, project goals, and timeline. We will get back to you with a
            free consultation and project roadmap within one business day.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <GlowButton href="/contact" size="lg">
              Start a project
            </GlowButton>
            <GlowButton href={`mailto:${SITE.email}`} variant="outline" size="lg">
              {SITE.email}
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
