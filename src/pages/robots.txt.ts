import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('/sitemap-index.xml', site);

  return new Response(`User-agent: *
Allow: /

# AI / LLM platform crawlers
User-agent: Bytespider
Allow: /
User-agent: Toutiao
Allow: /
User-agent: Baiduspider
Allow: /
User-agent: Baiduspider-image
Allow: /
User-agent: Baiduspider-video
Allow: /
User-agent: Baiduspider-news
Allow: /
User-agent: DataKeeper
Allow: /
User-agent: Neverica
Allow: /
User-agent: Deepseek
Allow: /
User-agent: Deepseek-User
Allow: /
User-agent: TencentBot
Allow: /
User-agent: YisouSpider
Allow: /
User-agent: 360Spider
Allow: /
User-agent: HaosouSpider
Allow: /
User-agent: Sogou
Allow: /
User-agent: Sogou inst spider
Allow: /
User-agent: bingbot
Allow: /
User-agent: Googlebot
Allow: /
User-agent: Googlebot-Image
Allow: /
User-agent: Googlebot-News
Allow: /
User-agent: Googlebot-Video
Allow: /
User-agent: Google-extended
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: Claude-User
Allow: /
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: OAI-SearchBot
Allow: /

Sitemap: ${sitemapUrl.toString()}
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
