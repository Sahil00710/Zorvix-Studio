# ZORVIX STUDIO — Full Build Plan

Adapting the uploaded `implementation_plan.md` from Next.js 15 to this project's stack (TanStack Start v1 + React 19 + Vite + Tailwind v4). All design intent, sections, animations, typography, and color tokens are preserved. Three.js is replaced with a Canvas2D particle field for the hero (lighter, no SSR pitfalls). Awaiting re-uploaded logos before wiring brand marks.

---

## Stack mapping (Next.js → TanStack Start)

| Plan says                               | We use                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `next` 15 App Router                    | TanStack Start v1 (already installed)                                           |
| `app/layout.tsx`                        | `src/routes/__root.tsx`                                                         |
| `app/page.tsx`, `app/about/page.tsx`, … | `src/routes/index.tsx`, `src/routes/about.tsx`, …                               |
| `app/projects/[slug]/page.tsx`          | `src/routes/projects.$slug.tsx`                                                 |
| `next/font`                             | `@fontsource-variable/*` packages                                               |
| `next/image`                            | native `<img>` with width/height + `loading="lazy"`                             |
| `app/sitemap.ts`, `app/robots.ts`       | `src/routes/sitemap[.]xml.tsx`, `src/routes/robots[.]txt.tsx` (server handlers) |
| Three.js + R3F particle field           | Canvas2D particle field (client-only)                                           |

Everything else (GSAP, ScrollTrigger, SplitText, Lenis, Framer Motion, Zustand, lucide-react, clsx, tailwind-merge) is added as-is.

---

## Design system (verbatim from plan)

Tokens defined in `src/styles.css` as `oklch` (converted from the plan's hex) and exposed via Tailwind v4 `@theme inline`:

- `--background` `#050505` → near-black
- `--bg-2` `#0A0A0F`, `--card` `#0F0F18`, `--surface` `#111128`
- `--primary` `#2563FF` (blue), `--primary-glow` `#3B82F6`
- `--foreground` `#F5F7FA`, `--muted-foreground` `#A1A1AA`, `--border` `#1A1A2E`
- Gradients: `--gradient-glow` radial blue, `--gradient-hero` layered
- Shadows: `--shadow-glow`, `--shadow-elevated`

Typography (variable fonts via fontsource):

- Display → **Clash Display** (self-hosted woff2 in `public/fonts/`, `@font-face`)
- Heading → **Sora**, Body → **Space Grotesk**, Mono/Numbers → **Outfit**

Spacing, radius, animation easings (`expo`, `cinematic` 800ms) added as Tailwind tokens.

---

## Build phases (single pass, in order)

### Phase 1 — Foundation

- Install deps: `gsap`, `lenis`, `framer-motion`, `zustand`, `clsx`, `tailwind-merge`, `lucide-react`, `react-icons`, `@fontsource-variable/sora`, `@fontsource-variable/space-grotesk`, `@fontsource-variable/outfit`.
- Add Clash Display via self-host (`public/fonts/`) with `@font-face` in `styles.css`.
- Rewrite `src/styles.css`: tokens, keyframes (`float`, `glow-pulse`, `marquee`, `reveal-mask`, `gradient-flow`), utility classes (`.glass`, `.noise`, `.text-gradient`, `.glow-ring`).
- `src/lib/utils.ts` keeps `cn()`. Add `src/lib/gsap.ts` (registers ScrollTrigger, SplitText fallback) and `src/lib/lenis.tsx` (provider + RAF).
- `src/store/useAppStore.ts` (Zustand): cursor hovered state, loader done.
- `src/lib/constants.ts`: nav links, social links, site meta.

### Phase 2 — Shell components

- `src/components/special/CustomCursor.tsx` — glowing dot + trailing ring, scale on `[data-cursor="hover"]`.
- `src/components/special/LoadingScreen.tsx` — GSAP timeline reveal of Zorvix mark, exits to store flag.
- `src/components/special/NoiseTexture.tsx`, `src/components/special/ParticleField.tsx` (Canvas2D, client-only via `useEffect`).
- `src/components/layout/Navbar.tsx` — transparent → frosted on scroll, magnetic CTA, mobile drawer (Framer Motion).
- `src/components/layout/Footer.tsx` — logo, link grid, newsletter, socials.
- `src/components/layout/PageTransition.tsx` — `AnimatePresence` curtain wipe keyed on route pathname.
- `src/components/ui/ScrollIndicator.tsx` — fixed right-side progress bar.
- Wire all of the above into `__root.tsx` inside `<QueryClientProvider>` + `<LenisProvider>`.

### Phase 3 — Reusable primitives

`MagneticButton`, `GlowButton`, `SplitText` (GSAP-based, no paid plugin — char-split via Intl.Segmenter), `AnimatedCounter`, `FadeIn`, `StaggerChildren`, `ParallaxSection`, `RevealMask`, `GradientText`, `SectionLabel`, `Badge`. All client-rendered.

### Phase 4 — Home page (`src/routes/index.tsx`)

All 9 sections from the plan, in order: `HeroSection`, `IntroSection` (marquee), `ServicesPreview` (3 glass cards), `FeaturedProjects` (GSAP horizontal scroll with `pin`), `ProcessSection` (4-step timeline), `TestimonialsSection` (Framer Motion drag carousel), `StatsSection` (counters), `TechStackSection` (dual marquee), `CTASection`. Per-route `head()` metadata.

### Phase 5 — About (`src/routes/about.tsx`)

`AboutHero`, `MissionVision`, `WhyUs` (6 hover-reveal cards), `Timeline`, `TeamSection` (flip cards), `SkillsSection`.

### Phase 6 — Services (`src/routes/services.tsx`)

9-card responsive grid (3×3 / 2×2 / 1×1) with the exact list from the plan, lucide icons, hover lift + border glow.

### Phase 7 — Projects (`src/routes/projects.tsx` + `src/routes/projects.$slug.tsx`)

- `data/projects.ts` with the 8 demo projects (slugs, titles, categories, tech, copy).
- Filter bar (All · SaaS · Agency · Finance · Food · Portfolio · Landing Page), animated layout swap.
- Project card: grayscale→color, mouse-tilt, "View Case Study" overlay.
- Detail page: hero parallax, overview, challenge, solution, design tokens, gallery, tech badges, results, next-project nav.
- Mockup images: generated via `imagegen` (premium quality), saved to `src/assets/projects/` and imported as ES modules.

### Phase 8 — Blog (`src/routes/blog.tsx`)

`BlogHero`, `FeaturedPost`, `PostCard` grid using `data/blog-posts.ts` (5 sample posts).

### Phase 9 — Contact (`src/routes/contact.tsx`)

Hero + animated form (float labels, real-time validation, success checkmark — local state, no backend), contact info, Calendly placeholder link.

### Phase 10 — Careers (`src/routes/careers.tsx`)

`CareersHero`, `OpenRoles` accordion, `ApplicationForm`.

### Phase 11 — SEO & polish

- Per-route `head()` with unique title/description/og.
- `src/routes/sitemap[.]xml.tsx` + `src/routes/robots[.]txt.tsx` server handlers.
- 404 (`__root` `notFoundComponent`) restyled to brand.
- Responsive QA at 360 / 768 / 1280 / 1920.
- Reduced-motion fallbacks (`prefers-reduced-motion`).

---

## Logo handling

Plan is paused at brand mark wiring until you re-upload `Full logo.png`, `Horizontal logo.png`, `Icon Logo.png`, `logo.png`. I'll proceed building everything else using a temporary CSS wordmark in the Navbar/Footer/Loader, then swap in the real PNGs (Icon for favicon + loader, Horizontal for navbar, Full for footer) as the final step.

---

## Technical notes (for the curious)

- Three.js dropped per your choice → Canvas2D particles (~3KB, no SSR concerns, no WASM bundling).
- SplitText uses a free char-splitter (the GSAP paid plugin is not bundled).
- Lenis is wrapped in a client-only provider; SSR renders static HTML, smooth scroll attaches on hydration.
- All animation-heavy components are leaf components marked client-only via `useEffect` mounts so the SSR pass stays clean.
- No `src/pages/`, no `_app/` — TanStack file-based routes in `src/routes/` only.
- Strict TypeScript; every import resolves before build.

---

## Out of scope (call out if you want them)

- Actual CMS or backend (forms log to console + show success state).
- Real testimonials/team — placeholder copy + generated avatars.
- Lovable Cloud / auth (not requested).
- Calendly integration beyond a link.

After you re-upload the logos, I'll start with Phase 1 and run straight through.
