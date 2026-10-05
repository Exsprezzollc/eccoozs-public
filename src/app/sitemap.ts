import type { MetadataRoute } from "next";
import { blogPosts } from "./blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://eccoozs.com";
  const staticPages = ["", "/welcome", "/blog", "/history", "/bellmont", "/house-of-eccoozs", "/learning", "/privacy", "/terms", "/conduct", "/support", "/press"];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "/blog" ? "daily" as const : "weekly" as const, priority: path === "" ? 1 : path === "/welcome" ? .95 : path === "/blog" ? .9 : .65 })),
    ...blogPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(`${post.updated}T12:00:00Z`), changeFrequency: "monthly" as const, priority: .8 })),
  ];
}
