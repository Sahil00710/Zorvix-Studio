import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import logoImg from "@/assets/projects/icon-logo.webp";
import { LenisProvider } from "@/lib/lenis-provider";
import { LoadingScreen } from "@/components/special/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { SITE } from "@/lib/constants";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";

const GA_MEASUREMENT_ID = "G-BJRCF8XTKB";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative max-w-lg text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Error · 404
        </div>
        <h1 className="mt-6 font-display text-[18vw] leading-none tracking-[-0.06em] text-foreground md:text-[10rem]">
          Lost
        </h1>
        <p className="mt-6 font-body text-base text-muted-foreground">
          This page slipped through the timeline. Let&apos;s get you back to something real.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 font-body text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
          >
            Back to home -{">"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl tracking-tight text-foreground">Something broke.</h1>
        <p className="mt-3 font-body text-sm text-muted-foreground">
          Refresh to retry, or head back home.
        </p>
        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-left font-mono text-xs text-red-400">
            <p className="font-semibold">{error.message || String(error)}</p>
            {error.stack && (
              <pre className="mt-2 max-h-32 overflow-auto text-[10px] opacity-75">
                {error.stack}
              </pre>
            )}
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="h-11 rounded-full bg-primary px-5 font-body text-sm text-primary-foreground hover:bg-primary-glow"
          >
            Try again
          </button>
          <a
            href="/"
            className="h-11 rounded-full border border-border-strong px-5 font-body text-sm leading-[2.75rem] text-foreground hover:bg-surface"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f8f5ef" },
      { name: "author", content: SITE.name },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: logoImg, as: "image", type: "image/webp" },
      { rel: "icon", href: logoImg, type: "image/webp" },
      { rel: "apple-touch-icon", href: logoImg },
    ],
    scripts: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
        async: true,
      },
      {
        children: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteSchema()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>
        <GoogleAnalyticsPageTracker />
        <LoadingScreen />
        <ScrollIndicator />
        <ScrollToTopButton />
        <Navbar />
        <main className="relative">
          <Outlet />
        </main>
        <Footer />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            classNames: {
              toast: "!border-border-strong !bg-background !text-foreground",
              title: "!font-display !text-base !tracking-tight",
              description: "!font-body !text-sm !text-muted-foreground",
            },
          }}
        />
      </LenisProvider>
    </QueryClientProvider>
  );
}

function GoogleAnalyticsPageTracker() {
  const location = useRouterState({ select: (state) => state.location });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: `${location.pathname}${location.searchStr}`,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.searchStr]);

  return null;
}
