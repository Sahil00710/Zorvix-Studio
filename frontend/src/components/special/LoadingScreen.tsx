import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { SITE } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/projects/icon-logo.webp";

/**
 * Cinematic intro loader. Shown on first load only.
 * Reveals the brand mark, runs a count-up, then curtain-wipes away.
 */
export function LoadingScreen() {
  const done = useAppStore((s) => s.loaderDone);
  const setDone = useAppStore((s) => s.setLoaderDone);
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("zorvix-loaded") === "1") {
      setDone(true);
      return;
    }
    let n = 0;
    const id = window.setInterval(() => {
      n += Math.max(1, Math.round((100 - n) / 4));
      if (n >= 100) {
        n = 100;
        setCount(100);
        window.clearInterval(id);
        window.setTimeout(() => setExiting(true), 250);
        window.setTimeout(() => {
          sessionStorage.setItem("zorvix-loaded", "1");
          setDone(true);
        }, 900);
      } else {
        setCount(n);
      }
    }, 20);
    return () => window.clearInterval(id);
  }, [setDone]);

  if (done) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      style={{
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 1000ms cubic-bezier(0.85, 0, 0.15, 1)",
      }}
      aria-hidden={exiting}
    >
      {/* Dynamic Grid Background with Glow */}
      <div className="absolute inset-0 grid-overlay opacity-15" />
      <div
        className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] rounded-full opacity-50 blur-[120px] transition-opacity duration-1000"
        style={{
          background: "var(--gradient-glow)",
          transform: `translate(-50%, -50%) scale(${0.8 + (count / 100) * 0.4})`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        {/* Animated Brand Mark / Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-border/60 bg-white/72 p-4 shadow-[0_24px_60px_rgba(39,61,104,0.14)] backdrop-blur-sm">
            {/* Outer ambient breathing ring */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-glow-pulse" />
            <img
              src={logoImg}
              alt="Zorvix Studio Logo"
              className="h-12 w-auto object-contain animate-float"
            />
          </div>

          {/* Typing/Glowing brand name */}
          <div className="mt-2 flex flex-col items-center">
            <span className="font-display text-3xl font-bold tracking-[0.15em] text-foreground uppercase sm:text-4xl md:text-5xl text-gradient">
              ZORVIX
            </span>
            <span className="mt-1 font-mono text-[9px] tracking-[0.4em] text-primary/80 uppercase">
              STUDIO
            </span>
          </div>
        </motion.div>

        {/* Progress & Console Stats Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col gap-3 w-[min(380px,85vw)]"
        >
          {/* Label and Percentage */}
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-primary animate-ping" />
              Initializing system
            </span>
            <span className="tabular-nums font-semibold text-foreground">
              {String(count).padStart(3, "0")}%
            </span>
          </div>

          {/* Premium Progress Bar */}
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-border/40 backdrop-blur-sm">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-100 ease-out"
              style={{
                width: `${count}%`,
                boxShadow: "0 0 14px var(--primary), 0 0 4px var(--primary)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
