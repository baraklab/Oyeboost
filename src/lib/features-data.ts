export interface FeatureFaqItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  slug: string;
  title: string;
  description: string;
  color: string;
  body: string[];
  faq?: FeatureFaqItem[];
  thumbnail?: string;
}

export const FEATURE_LIST: FeatureItem[] = [
  {
    slug: "campaign-brief-generator",
    title: "Campaign brief generator",
    description:
      "Describe your product, app, or GitHub repo and the goal you're chasing. Amplibee drafts suggested talking points and captions per channel that a real influencer can adapt in their own voice — never a script.",
    color: "#4f46e5",
    thumbnail: "/images/features/campaign-brief-generator/one-brief-every-channel-og.png",
    body: [
      "A campaign starts with a brief: what you're promoting (a SaaS product, a mobile app, a GitHub repo, a Product Hunt launch, or a blog post) and what you want out of it — GitHub stars, sign-ups, downloads, awareness, or traffic. The generator takes that and drafts a starting point for each channel: a thread-shaped angle for X, a story-with-context angle for LinkedIn, a talking-point outline for a YouTube mention, a visual-first caption for Instagram.",
      "None of this is meant to be posted as-is. It's a set of talking points and angles an influencer reads, adapts into their own voice, and records or writes themselves — see [why fake engagement kills your launch and what to do instead](/blog/why-fake-engagement-kills-your-launch-and-what-to-do-instead) for why that distinction matters. A brief that reads like a corporate ad gets ignored by the network; one that gives a creator something true and specific to react to gets picked up.",
      "The brief pulls from your [product profile](/features/product-profile) — the same voice, audience, and product facts every time — so you're not re-explaining what you're promoting on every new campaign. Every draft is fully editable before it's published to the network.",
    ],
    faq: [
      {
        question: "Does Amplibee write the influencer's post for them?",
        answer:
          "No. The generator drafts suggested talking points and captions per channel as a starting point. Influencers adapt them into their own words and voice before posting — a script read verbatim isn't genuine, and genuine is the entire point.",
      },
      {
        question: "What can I brief a campaign around?",
        answer:
          "A SaaS product, a mobile app, a GitHub or open-source repo, a Product Hunt launch, or a blog post — plus a goal: GitHub stars, sign-ups, downloads, awareness, or traffic. That goal shapes the angle the generator suggests.",
      },
      {
        question: "Do I need to write the brief myself?",
        answer:
          "No — describe your product and goal and the AI drafts the first version per channel. You can also write it entirely yourself if you'd rather skip generation altogether.",
      },
      {
        question: "Can I edit the generated talking points before a campaign goes live?",
        answer:
          "Yes. Every generated brief is an editable draft — nothing goes out to the network until you've reviewed and, if needed, changed it.",
      },
    ],
  },
  {
    slug: "product-profile",
    title: "Product profile",
    description:
      "Save your product's voice, audience, and key facts once. Every campaign brief you generate afterward reuses it, instead of you re-explaining what you're promoting each time.",
    color: "#0284c7",
    thumbnail: "/images/features/product-profile/a-profile-every-brief-reuses-og.png",
    body: [
      "A product profile is a saved description of what you're promoting: the product or repo, who it's for, what makes it worth a genuine mention, tone, and any facts or numbers that should stay consistent across campaigns — star count, user count, pricing, launch date.",
      "Set it up once under your product's settings, then every campaign brief the AI drafts pulls from it automatically. You can run a GitHub-stars campaign for a repo and a sign-ups campaign for the SaaS product it powers, each with its own profile, without cross-contaminating the voice or facts between them.",
      "This is also where you keep the specific angle that makes your product worth an influencer's time — the actual problem it solves, who it's genuinely useful for — so every generated brief leads with something real instead of generic marketing language.",
    ],
    faq: [
      {
        question: "What is a product profile used for?",
        answer:
          "It's a saved description of your product, audience, tone, and key facts that every campaign brief you generate reuses, so you don't re-explain what you're promoting on every new campaign.",
      },
      {
        question: "Can I run campaigns for more than one product?",
        answer:
          "Yes — create a separate product profile per product, app, or repo, and pick which one a campaign brief pulls from.",
      },
      {
        question: "Does the profile keep facts like star count or pricing accurate?",
        answer:
          "You keep it accurate by updating the profile when facts change — the AI uses whatever is currently saved there, so a stale profile produces a stale brief. Update it before a new campaign if numbers have moved.",
      },
    ],
  },
  {
    slug: "influencer-network",
    title: "Influencer network",
    description:
      "Browse real influencers and creators on X, LinkedIn, YouTube, and Instagram by niche and audience size. Every profile is opted in and posts to their own genuine audience.",
    color: "#059669",
    thumbnail: "/images/features/influencer-network/match-by-niche-and-channel-og.png",
    body: [
      "The [network](/network) is a directory of influencers, creators, and communities who've opted in to discover campaigns. Each profile lists the channels they're active on, their niches, roughly how large their audience is, and — where they've shared it — rate information and a portfolio link.",
      "Product owners browse or get matched by niche; influencers browse or get matched by the campaigns that fit what they already talk about. A developer-tools creator sees GitHub-star campaigns for repos in their niche; a productivity-app reviewer sees SaaS launches in theirs. Nobody is pushed a campaign that doesn't fit their actual audience.",
      "This only works because it's opt-in and niche-matched — an influencer's value is their genuine audience, and a mismatched campaign burns that trust fast. The network is built to protect the fit, not just maximize the number of matches.",
    ],
    faq: [
      {
        question: "How does Amplibee match influencers to campaigns?",
        answer:
          "By niche and channel — an influencer's network profile lists what they cover and where, and campaigns matching that niche surface to them. Product owners can also browse the directory directly by category and audience size.",
      },
      {
        question: "Which channels does the network cover?",
        answer:
          "X, LinkedIn, YouTube, and Instagram — wherever an influencer already has a genuine, engaged audience.",
      },
      {
        question: "Do I have to accept every campaign that matches my niche?",
        answer:
          "No. Matching just means a campaign is surfaced to you as relevant — you choose which ones you actually want to post about.",
      },
      {
        question: "How do I get listed in the network as an influencer?",
        answer:
          "Create a network profile with your niches, channels, and audience size, and opt in to being visible. Product owners then discover you the same way you discover campaigns — by fit, not by cold outreach.",
      },
    ],
  },
  {
    slug: "tracked-campaign-links",
    title: "Tracked campaign links",
    description:
      "Every influencer gets a unique tracked link with UTM parameters, so you can see exactly what each deliverable drove — clicks, sign-ups, or stars — instead of guessing which post worked.",
    color: "#db2777",
    thumbnail: "/images/features/tracked-campaign-links/see-what-each-deliverable-drove-og.png",
    body: [
      "When an influencer joins a campaign, they get their own tracked link back to your product, launch page, or GitHub repo. It's unique to them, carries UTM parameters you control, and lets you see what that specific post, video, or story actually drove.",
      "This is what makes it possible to tell genuine influence apart from noise: instead of one campaign-wide number, you get per-influencer data — which creator's audience actually clicked through, signed up, starred the repo, or downloaded the app. That's useful for the current campaign and for deciding who to work with again.",
      "Influencers submit their deliverable link as proof once they've posted, and the campaign metrics roll up from there — see [reviewing every deliverable](/features/review-every-deliverable) for how that submission gets checked before it counts.",
    ],
    faq: [
      {
        question: "How do I know which influencer actually drove results?",
        answer:
          "Each influencer gets a unique tracked link with UTM parameters, so clicks, sign-ups, downloads, or stars attributed to their link are visible per-influencer, not just as one campaign-wide total.",
      },
      {
        question: "Do influencers need to set up their own tracking?",
        answer:
          "No — the tracked link is generated for them when they join a campaign. They just use that link instead of a plain one when they post.",
      },
      {
        question: "Can I see results per channel, not just per influencer?",
        answer:
          "Yes — since each deliverable is tied to a specific influencer and channel, you can see whether your best results are coming from X threads, LinkedIn posts, YouTube mentions, or Instagram stories.",
      },
    ],
  },
  {
    slug: "campaigns",
    title: "Campaigns",
    description:
      "Brief once, set a goal and a budget type, and reuse the same campaign across every influencer who joins — instead of negotiating and briefing each creator separately.",
    color: "#9333ea",
    thumbnail: "/images/features/campaigns/brief-once-reuse-across-influencers-og.png",
    body: [
      "A campaign is the unit of work in Amplibee: what you're promoting, the goal (GitHub stars, sign-ups, downloads, awareness, or traffic), a budget type (paid, product-only, or revenue-share, depending on what you offer), and the generated or hand-written brief influencers see when they discover it.",
      "Once a campaign is live, any influencer in the network whose niche matches can apply or join, pick up the brief, adapt it in their own voice, and post. You don't re-brief each one individually — the campaign is the single source of truth every participant works from.",
      "You can run more than one campaign at a time — a GitHub-stars campaign for a repo and a separate sign-ups campaign for the product built on it, each with its own goal, brief, and tracked links. See [pricing](/pricing) for plan limits on active campaigns.",
    ],
    faq: [
      {
        question: "What's the difference between a campaign and just messaging influencers directly?",
        answer:
          "A campaign is a saved brief and goal that any matching influencer in the network can discover and join on their own — you're not negotiating and re-briefing each creator individually.",
      },
      {
        question: "Can I run more than one campaign at once?",
        answer:
          "Yes, depending on your plan — for example a GitHub-stars campaign for a repo and a separate sign-ups campaign for the product it powers, each with its own goal and brief.",
      },
      {
        question: "What goals can a campaign target?",
        answer:
          "GitHub stars, sign-ups, downloads, awareness, or traffic. The goal shapes both the AI-generated talking points and what the tracked links measure.",
      },
      {
        question: "Do all influencers on a campaign see the same brief?",
        answer:
          "They see the same starting brief, but each adapts it into their own voice before posting — the brief is a shared starting point, not a script everyone repeats verbatim.",
      },
    ],
  },
  {
    slug: "review-every-deliverable",
    title: "Review every deliverable",
    description:
      "Every submitted post, video, or story is reviewed before it counts toward a campaign — genuine engagement only, never bots, never fake followers, never manipulated numbers.",
    color: "#4f46e5",
    thumbnail: "/images/features/review-every-deliverable/genuine-engagement-only-og.png",
    body: [
      "When an influencer posts about your campaign, they submit the link as proof — a deliverable. Nothing counts toward your campaign's results until that deliverable has been reviewed: is it live, does it genuinely reflect the brief, does it look like a real post to a real audience.",
      "This is a deliberate constraint, not friction for its own sake. The entire value of Amplibee is genuine reach — real people telling their real audience about something worth telling them about. Review is what keeps that promise honest: it's how bought engagement, fake followers, and templated spam get filtered out before they ever show up in your results.",
      "Every deliverable shows its status — submitted, under review, approved, or rejected — so both sides know where a campaign stands. Approved deliverables roll into your campaign metrics via their [tracked link](/features/tracked-campaign-links).",
    ],
    faq: [
      {
        question: "Does every influencer post automatically count toward my campaign?",
        answer:
          "No. Every submitted deliverable is reviewed before it counts — checking that it's live, genuinely reflects the brief, and reads like a real post to a real audience, not a bot or templated spam.",
      },
      {
        question: "How does Amplibee prevent fake engagement or bought followers?",
        answer:
          "By reviewing every deliverable before it counts, and by only working with network profiles that represent genuine audiences. There's no mechanism in the product for buying stars, followers, or engagement directly — the entire model runs through real influencers posting to real audiences.",
      },
      {
        question: "What happens if a deliverable gets rejected?",
        answer:
          "It doesn't count toward the campaign's results, and the influencer can see why so they can fix and resubmit if the issue is fixable — for example, a link that didn't go live yet.",
      },
    ],
  },
];

export function getFeature(slug: string): FeatureItem | undefined {
  return FEATURE_LIST.find((f) => f.slug === slug);
}
