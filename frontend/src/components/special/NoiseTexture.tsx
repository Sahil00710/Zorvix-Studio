/**
 * Subtle SVG noise overlay — gives every section a filmic grain.
 */
export function NoiseTexture({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 noise-overlay"
      style={{ opacity }}
    />
  );
}
