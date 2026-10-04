import { blogPosts } from "../posts";

export function GET() {
  const items = blogPosts.map((post) => `\n    <item>\n      <title><![CDATA[${post.title}]]></title>\n      <link>https://eccoozs.com/blog/${post.slug}</link>\n      <guid>https://eccoozs.com/blog/${post.slug}</guid>\n      <pubDate>${new Date(`${post.published}T12:00:00Z`).toUTCString()}</pubDate>\n      <description><![CDATA[${post.description}]]></description>\n    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>ECCOOZS Journal</title><link>https://eccoozs.com/blog</link><description>Social media, community, business, creators, culture, and the future of online connection.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
