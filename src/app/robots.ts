import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Wildcard already allows everyone, including AI crawlers — these are
// listed explicitly so it's unambiguous this site wants to be indexed
// and cited by AI assistants (ChatGPT, Claude, Perplexity, Google AI).
const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
