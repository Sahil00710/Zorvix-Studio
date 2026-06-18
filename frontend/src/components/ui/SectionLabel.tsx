import { cn } from "@/lib/utils";

export function SectionLabel({
  number,
  label,
  className,
}: {
  number?: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground",
        className,
      )}
    >
      {number && <span className="tabular-nums text-primary">{number}</span>}
      <span className="h-px w-8 bg-border-strong" />
      <span>{label}</span>
    </div>
  );
}
