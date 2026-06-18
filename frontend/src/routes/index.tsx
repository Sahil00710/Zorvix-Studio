import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { SITE } from "@/lib/constants";
import { createSeoHead } from "@/lib/seo";

// Lazy load below-the-fold sections for maximum initial load performance
const IntroSection = lazy(() =>
  import("@/components/sections/home/IntroSection").then((m) => ({ default: m.IntroSection })),
);
const ServicesPreview = lazy(() =>
  import("@/components/sections/home/ServicesPreview").then((m) => ({
    default: m.ServicesPreview,
  })),
);
const FeaturedProjects = lazy(() =>
  import("@/components/sections/home/FeaturedProjects").then((m) => ({
    default: m.FeaturedProjects,
  })),
);
const ProcessSection = lazy(() =>
  import("@/components/sections/home/ProcessSection").then((m) => ({ default: m.ProcessSection })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/home/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const StatsSection = lazy(() =>
  import("@/components/sections/home/StatsSection").then((m) => ({ default: m.StatsSection })),
);
const TechStackSection = lazy(() =>
  import("@/components/sections/home/TechStackSection").then((m) => ({
    default: m.TechStackSection,
  })),
);
const CTASection = lazy(() =>
  import("@/components/sections/home/CTASection").then((m) => ({ default: m.CTASection })),
);

// Minimal premium-themed skeleton loader placeholder
function SectionFallback() {
  return (
    <div className="relative flex min-h-[30vh] w-full items-center justify-center bg-background py-16">
      <div className="h-5 w-5 animate-pulse rounded-full bg-primary/30" />
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    createSeoHead({
      title: `${SITE.name} | Frontend Development Studio`,
      description:
        "High-performance frontend development, UI/UX design, and conversion-focused websites for startups, SaaS teams, and modern brands.",
      path: "/",
  }),
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <IntroSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicesPreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FeaturedProjects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TechStackSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTASection />
      </Suspense>
    </>
  );
}
