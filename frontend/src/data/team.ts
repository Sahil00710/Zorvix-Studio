export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  socials: { label: string; href: string }[];
}

export const TEAM: TeamMember[] = [
  {
    name: "Sahil Talsaniya",
    role: "Founder & Full Stack Developer",
    initials: "ST",
    bio: "Full stack developer focused on modern websites and web applications, with a strong eye for UI, performance, and scalable product development.",
    socials: [
      { label: "Email", href: "mailto:sahiltalsaniya1@gmail.com" },
      { label: "WhatsApp", href: "https://wa.me/919173737131" },
    ],
  },
];
