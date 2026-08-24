import type { MetadataRoute } from "next";

const SITE = "https://rumplabs.xyz";

/**
 * Open to search crawlers and to answer engines alike. The AI user agents are
 * listed explicitly so the policy is a deliberate decision on the record
 * rather than an accident of the wildcard.
 */
const ANSWER_ENGINES = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "DuckAssistBot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...ANSWER_ENGINES.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
