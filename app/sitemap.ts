import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://research.datascienceclub.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/learning",
    "/research",
    "/resources",
    "/work",
    "/seminars",
    "/people",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
