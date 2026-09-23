import { blogPosts } from "@/lib/blog/posts";
import { FEATURE_LIST } from "@/lib/features-data";
import { siteConfig } from "@/lib/seo/config";

/**
 * llms.txt (llmstxt.org convention): a plain-text map of the site for AI
 * crawlers and answer engines, generated from the same data as the sitemap
 * and RSS feed so it never drifts out of sync.
 */
export async function GET() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} is built by ${siteConfig.company} for SaaS founders, indie hackers, and open-source maintainers who want real influencers to genuinely promote their product — never bots, never fake followers, never bought stars. AI campaign briefs run on the customer's own OpenAI, Anthropic, or OpenRouter API key (no AI token markup). Full plain-text content: ${siteConfig.url}/llms-full.txt`,
    "",
    "## Product",
    `- [Features](${siteConfig.url}/features): Every feature in Amplibee — campaign brief generator, product profile, bring-your-own-AI-key, influencer network, tracked campaign links, campaigns, deliverable review, and quick edits.`,
    `- [Channels](${siteConfig.url}/channels): Where genuine influencer content works — X, LinkedIn, YouTube, and Instagram.`,
    `- [Pricing](${siteConfig.url}/pricing): Plans and limits.`,
    `- [Network](${siteConfig.url}/network): Directory of real influencers and creators who discover and join campaigns.`,
    "",
    "## Features",
    ...FEATURE_LIST.map(
      (feature) => `- [${feature.title}](${siteConfig.url}/features/${feature.slug}): ${feature.description}`,
    ),
    "",
    "## Blog",
    ...sortedPosts.map(
      (post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`,
    ),
    "",
    "## Company",
    `- [About](${siteConfig.url}/about)`,
    `- [FAQ](${siteConfig.url}/faq)`,
    `- [Contact](${siteConfig.url}/contact)`,
    `- [Privacy](${siteConfig.url}/privacy)`,
    `- [Terms](${siteConfig.url}/terms)`,
    "",
    "## Feeds",
    `- [RSS feed](${siteConfig.url}/feed.xml)`,
    `- [Sitemap](${siteConfig.url}/sitemap.xml)`,
    `- [Full content for LLMs](${siteConfig.url}/llms-full.txt)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
