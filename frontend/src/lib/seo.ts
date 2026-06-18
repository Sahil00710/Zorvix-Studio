import { SITE } from "@/lib/constants";

type JsonLd = Record<string, unknown>;

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  robots?: string;
  jsonLd?: JsonLd[];
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalizedPath}`;
}

export function createSeoHead({
  title,
  description,
  path,
  type = "website",
  image = SITE.ogImage,
  robots = "index, follow",
  jsonLd = [],
}: SeoOptions) {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:site_name", content: SITE.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: `${SITE.name} preview` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: jsonLd.map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  };
}

export function noIndexHead(title: string, description: string, path = "/admin/login") {
  return createSeoHead({
    title,
    description,
    path,
    robots: "noindex, nofollow, noarchive",
  });
}

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    logo: absoluteUrl(SITE.ogImage),
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.location,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      telephone: SITE.whatsapp,
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
  };
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE.ogImage),
      },
    },
  };
}

export function creativeWorkSchema({
  title,
  description,
  path,
  category,
}: {
  title: string;
  description: string;
  path: string;
  category: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: absoluteUrl(path),
    genre: category,
    creator: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}
