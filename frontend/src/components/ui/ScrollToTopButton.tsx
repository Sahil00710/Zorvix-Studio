import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

/**
 * Global floating action button that returns the user to the top of the page.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    let lastVisible = false;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const nextVisible = window.scrollY > 320;
        if (nextVisible !== lastVisible) {
          lastVisible = nextVisible;
          setVisible(nextVisible);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      data-cursor="hover"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-card/90 text-foreground shadow-[0_18px_40px_rgba(39,61,104,0.14)] backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card md:bottom-8 md:right-8 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChevronUp
        size={22}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
