import {
  Code2,
  LayoutDashboard,
  Palette,
  Zap,
  RefreshCw,
  Sparkles,
  BarChart2,
  Smartphone,
  Gauge,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "frontend-development",
    title: "Frontend Development",
    short: "React, Next.js, TypeScript",
    description:
      "Custom, high-quality frontend development for modern web platforms. We build fast, reliable, and secure React and Next.js applications tailored to your business needs.",
    icon: Code2,
    deliverables: [
      "Clean & scalable code",
      "API & database integration",
      "State management",
      "Unit & functional testing",
    ],
  },
  {
    slug: "saas-websites",
    title: "SaaS Marketing Sites",
    short: "Marketing sites that convert",
    description:
      "Stunning marketing websites for your SaaS product, complete with pricing pages, product showcases, and CMS setup, optimized to convert visitors into sign-ups.",
    icon: LayoutDashboard,
    deliverables: [
      "Pricing plans & integrations",
      "Easy-to-use CMS editor",
      "Analytics setup",
      "High-converting layouts",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    short: "Figma, design systems",
    description:
      "Modern UI/UX design focusing on conversion, usability, and visual appeal. We design detailed Figma mockups and interactive prototypes before coding begins.",
    icon: Palette,
    deliverables: [
      "Figma design system",
      "Interactive prototypes",
      "User experience research",
      "Dev-ready layout designs",
    ],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    short: "High-converting pages",
    description:
      "High-impact, single-page landing pages optimized to generate leads, capture emails, or promote product launches. Shipped fast, optimized to sell.",
    icon: Zap,
    deliverables: [
      "Engaging sales copy",
      "Captivating visual elements",
      "Call-to-action optimization",
      "Fully responsive design",
    ],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    short: "Modernize existing sites",
    description:
      "Upgrade your website with a fresh, modern layout and updated technology. We migrate your old content while preserving and improving your search engine rankings (SEO).",
    icon: RefreshCw,
    deliverables: [
      "User experience audit",
      "Platform upgrades",
      "SEO & link preservation",
      "Seamless launch transition",
    ],
  },
  {
    slug: "gsap-animation",
    title: "Interactive & Motion Sites",
    short: "Engaging scroll & hover animations",
    description:
      "Stand out with elegant, scroll-driven animations and interactive elements. We create immersive storytelling experiences that keep visitors engaged longer.",
    icon: Sparkles,
    deliverables: [
      "Custom scroll animations",
      "Smooth page transitions",
      "Engaging hover interactions",
      "High performance & loading speed",
    ],
  },
  {
    slug: "dashboard-ui",
    title: "Dashboard UI",
    short: "Data-rich interfaces",
    description:
      "Beautiful and clean administration portals, dashboards, and internal platforms. We organize complex data into intuitive, easy-to-use charts and tables.",
    icon: BarChart2,
    deliverables: [
      "Interactive chart systems",
      "Data tables with filtering",
      "User access controls",
      "Clean layout grids",
    ],
  },
  {
    slug: "responsive-development",
    title: "Responsive Development",
    short: "Mobile-first builds",
    description:
      "Websites that look and perform flawlessly on mobile, tablet, laptop, and desktop screens. We design for thumbs and touch screens, not just mice.",
    icon: Smartphone,
    deliverables: [
      "Mobile-first layout design",
      "Touch-friendly interfaces",
      "Cross-browser testing",
      "Fluid responsive grids",
    ],
  },
  {
    slug: "performance-optimization",
    title: "Speed Optimization",
    short: "Core Web Vitals",
    description:
      "Slow websites lose customers. We audit, clean up, and optimize your website code, images, and server configurations to make it load instantly.",
    icon: Gauge,
    deliverables: [
      "Code & package pruning",
      "Image size compression",
      "Global speed delivery (CDN)",
      "Google Core Web Vitals audit",
    ],
  },
];
