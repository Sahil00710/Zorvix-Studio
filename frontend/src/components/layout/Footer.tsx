import { Link } from "@tanstack/react-router";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { GlowButton } from "@/components/ui/GlowButton";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-2">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="container-x relative section-pad">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + tagline */}
          <div className="space-y-6">
            <Logo />
            <p className="max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
              {SITE.location} · Available worldwide
            </div>
          </div>

          {/* Navigate */}
          <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Navigate
            </div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    data-cursor="hover"
                    className="font-body text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Channels
            </div>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 font-body text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span>{s.label}</span>
                    <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Studio Dispatch
            </div>
            <p className="mb-5 font-body text-sm text-muted-foreground">
              Process notes, motion teardowns, and the occasional case study. One email a month.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="flex items-center gap-2 rounded-full border border-border-strong bg-white/75 p-1.5 shadow-[0_18px_36px_rgba(39,61,104,0.08)]"
            >
              <input
                type="email"
                required
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 appearance-none bg-transparent px-3 py-2 font-body text-sm text-foreground shadow-none outline-none placeholder:text-muted-foreground/60 ring-0 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-4 py-2 font-body text-xs font-medium tracking-tight text-primary-foreground transition-colors hover:bg-primary-glow"
                data-cursor="hover"
              >
                {sent ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="mt-24 select-none">
          <div
            aria-hidden
            className="font-display text-[18vw] leading-none tracking-[-0.06em] text-foreground/[0.05]"
          >
            ZORVIX
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-emerald-400" />
              Booking projects for Q3
            </span>
            <span className="hidden sm:inline">·</span>
            <a href={`mailto:${SITE.email}`} className="hover:text-foreground">
              {SITE.email}
            </a>
          </span>
        </div>

        <div className="mt-12 flex justify-center">
          <GlowButton href="/contact" size="lg">
            Let's build something extraordinary
          </GlowButton>
        </div>
      </div>
    </footer>
  );
}
