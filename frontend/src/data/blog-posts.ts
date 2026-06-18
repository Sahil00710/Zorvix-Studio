export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "designing-cinematic-hero-sections",
    title: "How to Design Website Hero Sections That Captivate Visitors",
    excerpt:
      "A detailed guide on designing engaging header sections that capture attention instantly, including design examples and animation tips.",
    category: "Design",
    date: "May 14, 2026",
    readTime: "6 min",
    author: "Zorvix Studio",
    featured: true,
  },
  {
    slug: "gsap-scrolltrigger-performance",
    title: "How to Optimize Web Animations for Seamless Loading",
    excerpt:
      "Best practices and technical tips to ensure scroll animations load quickly and run smoothly on all desktop and mobile devices.",
    category: "Development",
    date: "May 02, 2026",
    readTime: "8 min",
    author: "Zorvix Studio",
  },
  {
    slug: "typography-for-modern-saas",
    title: "Choosing the Right Typography for Your Business Website",
    excerpt:
      "How to select and pair font styles that reflect your brand identity, improve readability, and keep visitors engaged.",
    category: "Branding",
    date: "Apr 21, 2026",
    readTime: "5 min",
    author: "Zorvix Studio",
  },
  {
    slug: "tanstack-start-the-quiet-upgrade",
    title: "Choosing the Right Tech Stack for Your Startup Website",
    excerpt:
      "A breakdown of modern web frameworks and why choosing the right technology is critical for your website speed and scale.",
    category: "Technology",
    date: "Apr 09, 2026",
    readTime: "7 min",
    author: "Zorvix Studio",
  },
  {
    slug: "the-five-second-rule",
    title: "The 5-Second Rule: How to Engage Website Visitors Instantly",
    excerpt:
      "A checklist of what visitors notice when they land on your website and how to design your homepage to reduce bounce rates.",
    category: "Marketing",
    date: "Mar 28, 2026",
    readTime: "4 min",
    author: "Zorvix Studio",
  },
];
