import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, type = "button", ...props }, ref) => {
    return (
      <button ref={ref} type={type} className={cn(className)} {...props}>
        {children}
      </button>
    );
  },
);

MagneticButton.displayName = "MagneticButton";
