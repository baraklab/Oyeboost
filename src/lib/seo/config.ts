export const siteConfig = {
  name: "Amplibee",
  tagline: "Influencer marketing for apps, SaaS, products, startups",
  description:
    "Amplibee connects product owners with real influencers and creators on X, LinkedIn, YouTube, and Instagram — genuine posts and videos to their own audience that drive real GitHub stars, sign-ups, and downloads. No bots, no fake engagement.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://amplibee.com",
  locale: "en_US",
  twitterHandle: "@baraklabs",
  keywords: [
    "Amplibee",
    "influencer marketing platform",
    "GitHub stars",
    "open source promotion",
    "SaaS influencer marketing",
    "product launch marketing",
    "creator marketplace",
    "genuine engagement",
    "X and LinkedIn influencers",
    "YouTube product reviews",
    "AI campaign brief generator",
    "bring your own AI key",
  ],
  company: "Baraklabs",
  contactEmail: "info@amplibee.com",
  links: {
    x: "https://x.com/baraklabs",
    linkedin: "https://www.linkedin.com/company/baraklabs",
    youtube: "https://www.youtube.com/@baraklabs",
  },
  stats: {
    users: "10,000+",
    influencers: "1.2M+",
  },
} as const;

export type SiteConfig = typeof siteConfig;
