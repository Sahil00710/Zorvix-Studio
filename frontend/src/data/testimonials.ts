export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ava Mehrotra",
    role: "Head of Product",
    company: "NexusAI Labs",
    quote:
      "Zorvix doesn't just ship designs - they ship intuition. Our marketing site converts 3x better and our team finally has a system they trust.",
    rating: 5,
  },
  {
    name: "Daniel Kerr",
    role: "Founder & CEO",
    company: "Velox Inc.",
    quote:
      "We had two weeks to launch. Zorvix delivered a page that earned 12,000 signups in seven days. The motion design alone closed our seed round.",
    rating: 5,
  },
  {
    name: "Priya Raman",
    role: "Design Director",
    company: "Luminary Studio",
    quote:
      "Working with Zorvix felt like adding a senior partner to the team. They pushed us harder than our own internal crit ever did.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "VP Engineering",
    company: "FinVault Capital",
    quote:
      "The cleanest frontend codebase we've ever inherited. Type-safe, tested, documented. Onboarding a new engineer takes a day, not a month.",
    rating: 5,
  },
  {
    name: "Elara Singh",
    role: "Brand Lead",
    company: "Grounds & Co.",
    quote:
      "They translated a coffee roaster's romanticism into a site that actually sells bags. The motion never overpowers the product.",
    rating: 5,
  },
];
