import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {/* Floating Capsule Bar (Closed State) */}
      <header className="fixed inset-x-0 top-6 z-50 pointer-events-none flex justify-center">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-8 rounded-[20px] border pl-6 pr-2 py-2 transition-all duration-500 backdrop-blur-md",
            scrolled
              ? "border-border-strong shadow-[0_18px_40px_rgba(50,76,126,0.18)]"
              : "border-border/80 shadow-[0_12px_28px_rgba(50,76,126,0.12)]",
          )}
          style={{ background: "var(--shell-surface)" }}
        >
          <Link to="/" className="inline-flex items-center gap-6" data-cursor="hover">
            <Logo />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold tracking-wide text-foreground">
                ZORVIX
              </span>
              <span className="font-display text-sm font-semibold tracking-wide text-foreground">
                STUDIO
              </span>
            </span>
          </Link>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-border/60 bg-[color:var(--nav-button)] text-foreground transition-all duration-300 hover:bg-[color:var(--nav-button-hover)] active:scale-95"
            data-cursor="hover"
          >
            {/* Hamburger Icon = */}
            <div className="flex flex-col gap-[5px]">
              <span className="h-[2px] w-5 bg-foreground rounded-full" />
              <span className="h-[2px] w-5 bg-foreground rounded-full" />
            </div>
          </button>
        </div>
      </header>

      {/* Expanded Menu Modal Overlay (Open State) */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 md:items-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/70 backdrop-blur-xl"
            />

            {/* Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
              className="relative z-10 max-h-[90dvh] w-full max-w-[760px] overflow-y-auto overflow-x-hidden rounded-[28px] border border-border-strong p-6 shadow-[0_24px_60px_rgba(36,58,102,0.18)] no-scrollbar md:p-10"
              style={{ background: "var(--shell-surface-strong)" }}
            >
              {/* Radial glow background effect */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -bottom-20 -z-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
                style={{ background: "var(--gradient-glow)" }}
              />

              {/* Grid overlay background */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-10"
              />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/20">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center"
                  data-cursor="hover"
                >
                  <Logo />
                </Link>

                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-border/60 bg-[color:var(--nav-button)] text-foreground transition-all duration-300 hover:bg-[color:var(--nav-button-hover)] active:scale-95"
                  data-cursor="hover"
                >
                  {/* Close Icon */}
                  <span className="h-[2px] w-4 bg-foreground rounded-full" />
                </button>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1px_1.3fr] gap-6 md:gap-10 items-stretch">
                {/* Left Column: Navigation Links */}
                <nav className="flex flex-col gap-3">
                  {NAV_LINKS.map((link, idx) => {
                    const active = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.04, duration: 0.4 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "group relative inline-flex items-center gap-3 font-display text-xl md:text-2xl tracking-tight transition-colors duration-300 text-left",
                            active
                              ? "text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                          data-cursor="hover"
                        >
                          {/* Active/Hover dot indicator */}
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100",
                              active && "scale-100 opacity-100",
                            )}
                          />
                          <span>{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Divider Line */}
                <div className="hidden md:block w-px bg-border/40 self-stretch my-2" />
                {/* Mobile horizontal divider */}
                <div className="block md:hidden h-px bg-border/40 w-full" />

                {/* Right Column: CTA Area */}
                <div className="flex flex-col items-start justify-center text-left pl-0 md:pl-4">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                    Let's work together!
                  </h3>
                  <p className="mt-2 md:mt-3 font-body text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                    Tell us about your goals and get a free consultation and project roadmap.
                  </p>

                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-5 md:mt-8 inline-flex w-full items-center justify-center rounded-[18px] bg-primary py-3.5 px-6 font-body text-sm font-semibold text-primary-foreground shadow-glow-soft hover:bg-primary-glow hover:scale-[1.02] active:scale-98 transition-all duration-300"
                    data-cursor="hover"
                  >
                    Start a Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
