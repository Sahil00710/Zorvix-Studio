import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";
import type { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

/**
 * Premium CTA button with animated glow ring on hover.
 * Renders as a Link when href is provided, otherwise a button.
 */
export function GlowButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  arrow = true,
  onClick,
  type = "button",
  disabled = false,
}: GlowButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-body font-medium tracking-tight transition-colors duration-300",
    size === "lg" ? "h-14 px-8 text-base" : "h-12 px-6 text-sm",
    variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary-glow",
    variant === "outline" &&
      "border border-border-strong bg-transparent text-foreground hover:bg-surface",
    variant === "ghost" && "bg-transparent text-foreground hover:bg-surface",
    className,
  );

  const content = (
    <>
      {/* Glow ring on hover (primary only) */}
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: "var(--primary)" }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && (
          <ArrowUpRight
            size={size === "lg" ? 18 : 16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto");
    if (isExternal) {
      return (
        <MagneticButton
          className={base}
          onClick={() => window.open(href, "_blank", "noopener")}
          disabled={disabled}
        >
          {content}
        </MagneticButton>
      );
    }
    return (
      <Link to={href} className="inline-block">
        <MagneticButton className={base} onClick={onClick} type={type} disabled={disabled}>
          {content}
        </MagneticButton>
      </Link>
    );
  }

  return (
    <MagneticButton className={base} onClick={onClick} type={type} disabled={disabled}>
      {content}
    </MagneticButton>
  );
}
