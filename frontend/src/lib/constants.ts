/**
 * ZORVIX STUDIO - site-wide constants.
 */

export const SITE = {
  name: "ZORVIX STUDIO",
  shortName: "ZORVIX",
  url: (import.meta.env.VITE_SITE_URL ?? "https://zorvixstudio.com").replace(/\/$/, ""),
  tagline: "High-Performance Websites for Ambitious Brands",
  description:
    "ZORVIX STUDIO is a premier frontend web development studio. We build stunning, fast, and high-converting websites that help startups and modern businesses stand out and grow.",
  ogImage: "/og-image.webp",
  email: "sahiltalsaniya1@gmail.com",
  whatsapp: "+91 9173737131",
  location: "India",
  calendly: "https://calendly.com/zorvix-studio",
} as const;

export const getWhatsAppHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Email", href: `mailto:${SITE.email}` },
  { label: "WhatsApp", href: getWhatsAppHref(SITE.whatsapp) },
  { label: "Schedule a Call", href: SITE.calendly },
] as const;
