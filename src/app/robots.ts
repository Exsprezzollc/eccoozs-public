import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://eccoozs.com/sitemap.xml", host: "https://eccoozs.com" };
}
