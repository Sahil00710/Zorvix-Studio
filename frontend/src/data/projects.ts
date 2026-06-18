export type ProjectCategory =
  | "SaaS"
  | "Agency"
  | "Studio"
  | "Fashion"
  | "Food & Beverage"
  | "Portfolio"
  | "Gaming"
  | "E-commerce";

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  role: string;
  timeline: string;
  liveUrl: string;
  excerpt: string;
  challenge: string;
  solution: string;
  tech: string[];
  palette: { name: string; hex: string }[];
  typography: { display: string; body: string };
  results: { label: string; value: string }[];
  imagePrompt: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "ai-saas",
    title: "AIStarterKit",
    client: "AIStarterKit",
    category: "SaaS",
    year: "2025",
    role: "SaaS Landing Page & Product UI",
    timeline: "6 weeks",
    liveUrl: "#",
    excerpt: "An AI tools platform landing page with a polished dark interface and built-in product preview.",
    challenge:
      "The product needed to explain multiple AI tools at a glance while still feeling premium, modern, and easy to explore on first visit.",
    solution:
      "We created a cinematic landing page with clear product messaging, category callouts, and an embedded app preview that makes the platform feel real immediately.",
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind", "GSAP"],
    palette: [
      { name: "Midnight", hex: "#0B1020" },
      { name: "Violet", hex: "#7C3AED" },
      { name: "Indigo", hex: "#2563EB" },
      { name: "Cloud", hex: "#F4F7FB" },
    ],
    typography: { display: "Sora", body: "Space Grotesk" },
    results: [
      { label: "Free Trial Clicks", value: "+162%" },
      { label: "Product Page Engagement", value: "+74%" },
      { label: "Waitlist Sign-ups", value: "2.9x" },
    ],
    imagePrompt:
      "Premium AI SaaS landing page on a laptop, dark navy interface with violet and blue accents, clear product categories, built-in chat preview, cinematic studio lighting, ultra-detailed",
  },
  {
    slug: "gym-ui",
    title: "Lunara",
    client: "Lunara Fashion",
    category: "Fashion",
    year: "2025",
    role: "Mobile Commerce UI & Brand Experience",
    timeline: "5 weeks",
    liveUrl: "#",
    excerpt: "A luxury fashion mobile storefront focused on bold typography and premium editorial presentation.",
    challenge:
      "Lunara needed a mobile-first experience that felt premium enough for a fashion label while keeping shopping paths clear and conversion-friendly.",
    solution:
      "We used a dark editorial interface, oversized headlines, and strong CTA placement to make the collection feel exclusive and easy to shop.",
    tech: ["React", "TypeScript", "GSAP", "Tailwind"],
    palette: [
      { name: "Noir", hex: "#0B0B0D" },
      { name: "Copper", hex: "#C96A3B" },
      { name: "Ivory", hex: "#F5F1EA" },
      { name: "Smoke", hex: "#8B8B8F" },
    ],
    typography: { display: "Outfit", body: "Sora" },
    results: [
      { label: "Mobile Conversion Rate", value: "+38%" },
      { label: "Collection Page CTR", value: "+57%" },
      { label: "Avg Session Duration", value: "+41%" },
    ],
    imagePrompt:
      "Luxury fashion mobile landing page on a smartphone, black editorial UI with warm amber lighting, bold typography, premium CTA buttons, cinematic product-brand presentation",
  },
  {
    slug: "creative-agency",
    title: "Lume Studio",
    client: "Lume Studio",
    category: "Agency",
    year: "2025",
    role: "Creative Agency Website & Motion Direction",
    timeline: "4 weeks",
    liveUrl: "#",
    excerpt: "A dark agency homepage designed to spotlight brand work, services, and a polished visual identity.",
    challenge:
      "The studio needed a homepage that felt elevated and design-led without relying on cluttered layouts or heavy effects.",
    solution:
      "We built a minimal but dramatic presentation with cinematic lighting, strong headline hierarchy, and focused calls to action.",
    tech: ["React", "GSAP", "Tailwind", "Lenis"],
    palette: [
      { name: "Espresso", hex: "#1A120B" },
      { name: "Amber Glow", hex: "#A16207" },
      { name: "Ivory", hex: "#F8F6F1" },
      { name: "Mocha", hex: "#4B3326" },
    ],
    typography: { display: "Sora", body: "Outfit" },
    results: [
      { label: "Qualified Leads", value: "+49%" },
      { label: "Portfolio Click-throughs", value: "+63%" },
      { label: "Avg Time on Page", value: "+52%" },
    ],
    imagePrompt:
      "Creative agency website on a laptop, dark warm-toned background, oversized typography, premium studio aesthetic, elegant lighting, refined portfolio presentation",
  },
  {
    slug: "finance-dashboard",
    title: "Zorvix Services",
    client: "Zorvix",
    category: "Studio",
    year: "2025",
    role: "Service Showcase & Web Studio Positioning",
    timeline: "3 weeks",
    liveUrl: "#",
    excerpt: "A service overview page that turns a full-stack offer into a clear, colorful, high-impact presentation.",
    challenge:
      "The studio needed a concise way to explain development, design, integrations, animation, and performance without a wall of text.",
    solution:
      "We designed a card-based layout with distinct service pillars, strong color separation, and fast scanning for potential clients.",
    tech: ["React", "TypeScript", "Tailwind", "GSAP"],
    palette: [
      { name: "Paper", hex: "#F6F0E8" },
      { name: "Mint", hex: "#0F7A5C" },
      { name: "Tangerine", hex: "#F97316" },
      { name: "Rose", hex: "#BE185D" },
    ],
    typography: { display: "Outfit", body: "Space Grotesk" },
    results: [
      { label: "Service Page Engagement", value: "+66%" },
      { label: "Inquiry Rate", value: "+34%" },
      { label: "Bounce Rate", value: "-27%" },
    ],
    imagePrompt:
      "Creative studio services page on a laptop, colorful stacked cards, editorial layout on light background, clear service categories, playful premium branding",
  },
  {
    slug: "restaurant",
    title: "Harbor Haven",
    client: "Harbor Haven",
    category: "Food & Beverage",
    year: "2024",
    role: "Beverage Brand Website Design",
    timeline: "5 weeks",
    liveUrl: "#",
    excerpt: "A moody beverage landing page that combines editorial type, product storytelling, and hospitality branding.",
    challenge:
      "The brand needed a launch page that felt upscale and atmospheric while making the menu and signature drinks feel central.",
    solution:
      "We used oversized serif typography, dramatic product framing, and a dark luxury palette to turn the beverage offer into an experience.",
    tech: ["React", "GSAP", "Tailwind", "Framer Motion"],
    palette: [
      { name: "Ink", hex: "#0C0C0F" },
      { name: "Leaf", hex: "#2F855A" },
      { name: "Lime", hex: "#C7D92F" },
      { name: "Pearl", hex: "#F5F3EE" },
    ],
    typography: { display: "Playfair Display", body: "Outfit" },
    results: [
      { label: "Menu Page Visits", value: "+71%" },
      { label: "Campaign Shares", value: "+44%" },
      { label: "Brand Recall", value: "High" },
    ],
    imagePrompt:
      "Luxury beverage brand website on a laptop, dark editorial interface, giant serif headline, cocktail hero image, tropical accents, cinematic premium lighting",
  },
  {
    slug: "coffee-brand",
    title: "Lume Portfolio",
    client: "Lume Studio",
    category: "Portfolio",
    year: "2024",
    role: "Portfolio Website Refinement",
    timeline: "4 weeks",
    liveUrl: "#",
    excerpt: "A clean creative portfolio homepage focused on headline clarity, atmosphere, and strong first-screen storytelling.",
    challenge:
      "The studio wanted a more polished portfolio presentation that could highlight its visual taste before users even started scrolling.",
    solution:
      "We refined the hero composition, tightened the navigation, and used warmth and contrast to make the brand feel both creative and premium.",
    tech: ["React", "Tailwind", "GSAP", "Lenis"],
    palette: [
      { name: "Walnut", hex: "#2A1C13" },
      { name: "Gold Smoke", hex: "#8B5A1E" },
      { name: "Cream", hex: "#FAF7F1" },
      { name: "Cocoa", hex: "#4A3426" },
    ],
    typography: { display: "Sora", body: "Outfit" },
    results: [
      { label: "Portfolio Inquiries", value: "+36%" },
      { label: "Hero CTA Clicks", value: "+58%" },
      { label: "Scroll Depth", value: "+47%" },
    ],
    imagePrompt:
      "Creative portfolio homepage on a laptop, warm dark background, oversized typography, refined navigation, elegant studio atmosphere, premium editorial presentation",
  },
  {
    slug: "portfolio",
    title: "Redefine Gaming",
    client: "Nexus Interactive",
    category: "Gaming",
    year: "2025",
    role: "Game Launch Landing Page",
    timeline: "5 weeks",
    liveUrl: "#",
    excerpt: "A bold gaming landing page built around character art, launch hype, and high-contrast action-driven messaging.",
    challenge:
      "The release campaign needed a homepage that captured energy instantly and pushed trailer views and early player interest.",
    solution:
      "We centered the hero around a striking character visual, oversized type, and a bright CTA to make the launch feel urgent and memorable.",
    tech: ["React", "GSAP", "Framer Motion", "Tailwind"],
    palette: [
      { name: "Midnight", hex: "#0D0C10" },
      { name: "Acid", hex: "#E8FF3C" },
      { name: "Inferno", hex: "#D62828" },
      { name: "Fog", hex: "#F2F2F2" },
    ],
    typography: { display: "Anton", body: "Outfit" },
    results: [
      { label: "Trailer Clicks", value: "+83%" },
      { label: "Wishlist Sign-ups", value: "3.4x" },
      { label: "Social Shares", value: "+61%" },
    ],
    imagePrompt:
      "Gaming launch website on a laptop, anime-style hero character, bold condensed typography, neon accent lighting, cinematic action-focused composition",
  },
  {
    slug: "startup-landing",
    title: "Nimbus Vapor75",
    client: "Nimbus",
    category: "E-commerce",
    year: "2025",
    role: "Product Landing Page & E-commerce UI",
    timeline: "4 weeks",
    liveUrl: "#",
    excerpt: "A hardware product page for a mechanical keyboard brand with a strong hero, specs, and buy-focused layout.",
    challenge:
      "Nimbus needed a product page that balanced enthusiast-grade detail with a clean buying experience for a broader audience.",
    solution:
      "We paired a large product render with strong commerce CTAs, feature highlights, and a crisp layout that keeps the keyboard as the star.",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    palette: [
      { name: "Navy", hex: "#08111F" },
      { name: "Sky", hex: "#3B82F6" },
      { name: "Coral", hex: "#F97316" },
      { name: "Frost", hex: "#F8FAFC" },
    ],
    typography: { display: "Anton", body: "Sora" },
    results: [
      { label: "Add-to-Cart Rate", value: "+42%" },
      { label: "Product Detail Views", value: "+68%" },
      { label: "Revenue per Visitor", value: "+29%" },
    ],
    imagePrompt:
      "Mechanical keyboard e-commerce landing page, dark navy UI, floating hardware render, bold condensed headline, bright commerce buttons, premium product marketing aesthetic",
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  "SaaS",
  "Fashion",
  "Agency",
  "Studio",
  "Food & Beverage",
  "Portfolio",
  "Gaming",
  "E-commerce",
] as const;
