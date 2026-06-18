import { cn } from "@/lib/utils";
import logoImg from "@/assets/projects/icon-logo.webp";

/**
 * Wordmark — temporary until brand PNGs are uploaded.
 * Designed to look intentional, not placeholder-y.
 */
export function Logo({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "mark";
}) {
  if (variant === "mark") {
    return (
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary font-display text-base font-semibold tracking-tight text-primary-foreground",
          className,
        )}
        aria-label="Zorvix Studio"
      >
        Z
      </span>
    );
  }

  return (
    <img
      src={logoImg}
      alt="Zorvix Studio"
      className={cn("h-10 w-auto origin-left scale-[1.8] object-contain", className)}
      style={{
        filter:
          "drop-shadow(0 8px 20px rgba(45, 79, 148, 0.12)) drop-shadow(0 1px 0 rgba(255,255,255,0.65))",
      }}
    />
  );
}
