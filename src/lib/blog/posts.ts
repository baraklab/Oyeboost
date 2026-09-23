import { circularRelated } from "@/lib/related";

export type BlogBlock =
  | { type: "heading"; content: string }
  | { type: "subheading"; content: string }
  | { type: "text"; content: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; content: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "newsletter" };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  updatedAt?: string;
  color: string;
  category: string;
  tags: string[];
  readingTime: string;
  thumbnail?: string;
  videoId?: string;
  body: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-fake-engagement-kills-your-launch-and-what-to-do-instead",
    title: "Why Fake Engagement Kills Your Launch (and What to Do Instead)",
    description:
      "Bought followers, vote manipulation, and bot engagement get detected, erode trust, and trigger algorithmic penalties. Here's what genuine influencer marketing does differently.",
    author: "Amplibee Team",
    date: "2026-09-21",
    color: "#059669",
    category: "Marketing",
    tags: ["fake engagement", "genuine marketing", "trust", "platform detection"],
    readingTime: "11 min read",
    thumbnail: "/images/blog/why-fake-engagement-kills-your-launch-and-what-to-do-instead/bots-out-genuine-reach-in-og.png",
    body: [
      {
        type: "text",
        content:
          "**The short answer:** fake engagement — bought followers, upvote rings, bot comments, purchased stars — gets detected by the platforms hosting it, gets purged after the fact rather than before, and permanently damages the trust of the real audience who eventually notices. Genuine influencer marketing avoids all three failure modes because there's no manufactured number to detect or purge — just real people telling their real audience about something worth telling them about, which is the entire model [Amplibee](/) is built around.",
      },
      {
        type: "text",
        content:
          "Every founder under launch pressure has seen the ad: a few hundred dollars for a thousand followers, upvotes, or stars, delivered within 24 hours. It's tempting precisely because the pressure is real and the offer looks like a shortcut through it. This is a breakdown of why that shortcut fails on every axis that actually matters, and what to do with the same budget and urgency instead.",
      },
      {
        type: "heading",
        content: "Failure mode 1: platform detection",
      },
      {
        type: "text",
        content:
          "Every major platform — X, LinkedIn, YouTube, Instagram, GitHub, Product Hunt — runs abuse detection specifically built to catch inorganic engagement patterns: accounts created in bulk, engagement spiking in a tight time window, follower graphs with no organic structure, comment text that repeats across unrelated posts. This isn't a hypothetical risk; it's a standing, adversarial system actively looking for exactly what a bought-engagement service produces.",
      },
      {
        type: "text",
        content:
          "The failure isn't always immediate. Bulk purges often happen weeks or months later, which means the damage lands at the worst possible time — after you've built plans, reporting, or investor updates around a number that's about to disappear.",
      },
      {
        type: "list",
        items: [
          "**X/Twitter** actively removes bot and spam accounts in periodic sweeps, which can visibly drop a follower count overnight.",
          "**GitHub** flags and removes inorganic stars from accounts showing bulk-creation and no-activity patterns — sometimes well after the fact.",
          "**Product Hunt** has a well-documented history of removing manipulated votes and penalizing products caught coordinating them, including removal from leaderboards.",
          "**YouTube and Instagram** both algorithmically deprioritize accounts with engagement-to-follower ratios that don't match organic patterns, which can suppress reach even without an explicit ban.",
        ],
      },
      {
        type: "heading",
        content: "Failure mode 2: audience trust erosion",
      },
      {
        type: "text",
        content:
          "Detection is a platform problem. Trust erosion is a people problem, and it's worse, because it doesn't reverse when you stop. Audiences — developers evaluating a library, consumers reading reviews, investors looking at traction — have gotten good at spotting the signature of manufactured engagement: round numbers, engagement that doesn't match comment quality, a launch with thousands of upvotes and zero substantive discussion.",
      },
      {
        type: "text",
        content:
          "Once a specific instance of fake engagement gets called out publicly — and in tight-knit communities like open source or indie SaaS, it usually does — it doesn't just cost that number. It recolors every other number the project has ever shown, retroactively. A skeptical audience doesn't say \"well, most of it was real\" — they assume the worst about everything else too.",
      },
      {
        type: "quote",
        content:
          "The reason bought engagement feels like a shortcut is the same reason it's not one: it skips the part where a real person decides your product was worth telling someone about. That decision is the entire value. There's no way to fake it that doesn't also fake the reason it mattered.",
      },
      {
        type: "heading",
        content: "Failure mode 3: algorithmic penalties",
      },
      {
        type: "text",
        content:
          "Beyond outright detection and removal, most platform algorithms use engagement-quality signals — not just engagement volume — to decide what to amplify further. Content that gets a burst of low-quality engagement (bot likes, template comments, follows from accounts with no history) often gets throttled rather than boosted, because the platform's own model reads the pattern as spam regardless of intent.",
      },
      {
        type: "text",
        content:
          "This means fake engagement doesn't just risk a future purge — it can actively suppress the real reach you'd otherwise have gotten from the launch, at the exact moment reach matters most.",
      },
      {
        type: "heading",
        content: "Failure mode 4: brand damage that outlasts the campaign",
      },
      {
        type: "text",
        content:
          "The first three failure modes are mostly reversible in the sense that a project can recover technically — a purged follower count can be rebuilt, an algorithmic penalty can lift. Brand damage is the one that lingers, because it lives in people's memory of your name, not in a platform's database. A founder or maintainer caught buying engagement once carries that association into their next product, their next repo, their next launch — long after the specific numbers in question have been forgotten.",
      },
      {
        type: "heading",
        content: "What genuine influencer marketing does instead",
      },
      {
        type: "text",
        content:
          "The alternative isn't \"do nothing and hope for organic reach.\" It's routing the same budget and urgency toward real people with real audiences who choose, genuinely, to tell their followers about your product — see [how to run an influencer campaign for a SaaS launch](/blog/how-to-run-an-influencer-marketing-campaign-for-your-saas-launch) for the practical steps. The mechanism looks similar on the surface (someone posts about your product, people see it, some of them act) but every property that made bought engagement fail is the exact property genuine influencer marketing gets right.",
      },
      {
        type: "table",
        caption: "Bought engagement vs. genuine influencer marketing",
        headers: ["", "Bought engagement", "Genuine influencer marketing"],
        rows: [
          ["Platform detection risk", "High — actively targeted by abuse systems", "None — every action is a real account, real activity"],
          ["Audience trust if discovered", "Destroyed, retroactively", "N/A — nothing to discover, it's genuinely their opinion"],
          ["Algorithmic treatment", "Often throttled as spam", "Treated as normal organic engagement"],
          ["Durability", "Purged eventually, often without warning", "Persists — a real post stays real"],
          ["Attribution", "None — a number with no source", "Per-influencer tracked links show what worked"],
        ],
      },
      {
        type: "text",
        content:
          "This is the core design decision behind Amplibee: every profile in the [network](/network) is a real, opted-in influencer or creator, every campaign is matched by genuine niche fit, the AI [drafts talking points, never a script](/features/campaign-brief-generator) so what gets posted stays in the influencer's real voice, and [every deliverable is reviewed](/features/review-every-deliverable) before it counts — the same discipline that keeps bots and templated spam out is what keeps the resulting engagement genuinely worth having.",
      },
      {
        type: "heading",
        content: "If you've already used bought engagement",
      },
      {
        type: "text",
        content:
          "If a past launch leaned on a star-farm, a follower package, or an upvote ring, the fix isn't panic — it's redirecting forward. Stop adding to the inflated number, let organic and genuine activity become a larger share of the total over time, and be straightforward if anyone asks rather than compounding the original mistake with a defensive explanation. The audience you actually want going forward cares far more about what you do next than about a number from a launch they've already forgotten.",
      },
      { type: "newsletter" },
      {
        type: "heading",
        content: "Frequently asked questions",
      },
      {
        type: "faq",
        items: [
          {
            question: "Do platforms actually detect bought followers or engagement?",
            answer:
              "Yes. X, GitHub, Product Hunt, YouTube, and Instagram all run abuse-detection systems that flag inorganic patterns — bulk account creation, engagement spikes in tight time windows, follower graphs with no organic structure — and remove the resulting engagement, sometimes in delayed bulk purges.",
          },
          {
            question: "Can bought engagement hurt my reach even if it isn't removed?",
            answer:
              "Yes. Many platform algorithms weigh engagement quality, not just volume, when deciding what to amplify. A burst of low-quality engagement can get content throttled as suspected spam rather than boosted, suppressing the real reach a launch would otherwise have gotten.",
          },
          {
            question: "Is it worth the risk to buy engagement just for a launch day boost?",
            answer:
              "No — the risk isn't limited to launch day. Purges often happen weeks or months later, and if discovered, the trust damage extends backward to every other number the project has shown, not just the inflated one.",
          },
          {
            question: "What's the genuine alternative to buying followers or stars?",
            answer:
              "Influencer marketing matched by real niche fit — real creators with real audiences who genuinely choose to post about your product in their own voice, with every deliverable reviewed before it counts toward results.",
          },
          {
            question: "How is Amplibee different from a service that sells followers or stars?",
            answer:
              "Amplibee has no mechanism to sell engagement directly — it matches product owners with real, opted-in influencers whose audience fits the campaign's niche, and reviews every submitted deliverable before it counts, so results reflect genuine posts to genuine audiences.",
          },
          {
            question: "What should I do if a past launch already used bought engagement?",
            answer:
              "Stop adding to it, let genuine activity become a larger share of your numbers going forward, and be straightforward if asked rather than compounding it with a defensive explanation — audiences care more about what you do next than a number from a launch they've likely already forgotten.",
          },
        ],
      },
    ],
  },
  {
    slug: "how-to-get-genuine-github-stars-through-influencer-marketing",
    title: "How to Get Genuine GitHub Stars Through Influencer Marketing (Not Bots)",
    description:
      "Bought stars get purged and erode trust the moment anyone checks. Here's the real playbook for earning GitHub stars that actually mean something.",
    author: "Amplibee Team",
    date: "2026-09-15",
    color: "#4f46e5",
    category: "Growth",
    tags: ["github stars", "open source", "influencer marketing", "developer marketing"],
    readingTime: "13 min read",
    thumbnail: "/images/blog/how-to-get-genuine-github-stars-through-influencer-marketing/real-developers-real-stars-og.png",
    body: [
      {
        type: "text",
        content:
          "**The short answer:** the fastest reliable way to grow GitHub stars that don't get purged, don't get flagged, and actually correlate with real usage is to get real developers with real audiences to genuinely try your repo and tell their followers about it — not to buy stars from a star-farm service. [Amplibee](/) does this by matching your repo with influencers and creators on X, LinkedIn, and YouTube whose audience already cares about the exact problem your project solves.",
      },
      {
        type: "text",
        content:
          "If you've ever searched \"buy GitHub stars\" at 1am before a launch, you're not alone — and you're also about to read why that search is the wrong one. This guide covers why bought stars actively hurt you, how GitHub and the wider ecosystem detect them, and a real, repeatable playbook for earning stars that reflect actual interest in what you built.",
      },
      {
        type: "heading",
        content: "Why bought GitHub stars don't work anymore (if they ever really did)",
      },
      {
        type: "text",
        content:
          "A star-farm sells you a number. It does not sell you users, contributors, issues filed by people who hit a real bug, or the kind of organic discovery that gets a repo onto a trending page for the right reasons. The number is the entire product — and numbers without behavior behind them are exactly what gets flagged.",
      },
      {
        type: "list",
        items: [
          "**GitHub actively detects and removes inorganic stars.** Accounts created in bulk, with no commit history, no followed repos, and a starring pattern that spikes in a tight time window get caught by abuse detection — sometimes immediately, sometimes months later in a bulk purge. When that happens, your count drops publicly, which reads worse than never having inflated it.",
          "**Developers check.** Anyone seriously evaluating a library looks past the star count — recent commits, issue response time, who's starring it (are they real accounts with real projects?), and whether the README reads like it was written by someone who ships. A high star count with a thin commit history and generic-looking stargazers is a red flag experienced developers recognize instantly.",
          "**It doesn't compound.** A genuine star from a developer who actually uses your tool often comes with a follow, a mention in their own project's README, a conference talk reference, or a PR down the line. A bought star is a dead end — it never becomes anything else.",
          "**It actively damages trust once discovered.** Nothing torches credibility with an open-source audience faster than the community discovering a project bought its numbers. It's the kind of story that gets its own thread, and it follows the maintainer to their next project too.",
        ],
      },
      {
        type: "text",
        content:
          "None of this is about GitHub stars being unimportant — they're a real, useful signal, which is exactly why faking them is such a bad trade. You're spending real money to manufacture a number that becomes a liability instead of an asset.",
      },
      {
        type: "heading",
        content: "What actually drives genuine GitHub star growth",
      },
      {
        type: "text",
        content:
          "Real star growth almost always traces back to a person with an audience trying your project and telling people about it — a maintainer posting a demo, a YouTuber covering a new tool in their niche, a newsletter writer including it in a roundup, a conference speaker mentioning it live. The mechanism is word of mouth, just distributed through people who already have reach.",
      },
      {
        type: "text",
        content:
          "That's the entire premise behind influencer marketing for open source: instead of hoping the right person organically finds your repo, you brief a campaign, and creators whose audience already cares about your exact category discover it and post about it genuinely — see [how the network match works](/features/influencer-network) for how that discovery happens.",
      },
      {
        type: "subheading",
        content: "The developer-audience creators worth reaching",
      },
      {
        type: "list",
        items: [
          "**X/Twitter developers who post build-in-public content** — they're already primed to try new tools and share honest reactions with a technically literate audience.",
          "**YouTube channels covering dev tools, frameworks, or your specific stack** — a real walkthrough video does more for adoption than almost any other content format, because viewers see the tool actually working.",
          "**LinkedIn voices in your category** — especially for developer tools with a business-adjacent angle (DevOps, data infrastructure, internal tooling), where a technical leader's post reaches people with budget and influence over adoption, not just individual contributors.",
          "**Newsletter and roundup writers** — inclusion in a well-read weekly roundup is slower than a single viral post, but the traffic is durable and the stars trickle in for weeks.",
        ],
      },
      {
        type: "heading",
        content: "The playbook: running a genuine GitHub star campaign",
      },
      {
        type: "subheading",
        content: "1. Get the repo itself ready for a first impression",
      },
      {
        type: "text",
        content:
          "Before you brief anyone, make sure the thing they'll actually look at earns the star. A clear README with a real problem statement in the first three lines, a working quickstart that doesn't require reading the whole codebase first, and a couple of screenshots or a short GIF if it's visual. Influencers won't manufacture credibility your repo doesn't have — they amplify what's actually there.",
      },
      {
        type: "text",
        content:
          "**Action:** Read your own README as if you'd never seen the project. If it takes more than thirty seconds to understand what problem it solves, fix that first.",
      },
      {
        type: "subheading",
        content: "2. Set up a product profile and brief the campaign",
      },
      {
        type: "text",
        content:
          "Create a [product profile](/features/product-profile) for the repo — what it does, who it's for, what makes it worth a genuine mention, and any facts that should stay consistent (star count, license, notable users). Then brief a campaign with the goal set to GitHub stars. The [campaign brief generator](/features/campaign-brief-generator) drafts suggested talking points per channel from that profile — a thread angle for X, a demo outline for YouTube — as a starting point influencers adapt into their own voice.",
      },
      {
        type: "text",
        content:
          "**Action:** Be specific in the brief about the actual problem the repo solves and who feels that problem most acutely — vague briefs produce vague, easy-to-ignore talking points.",
      },
      {
        type: "subheading",
        content: "3. Let the network match you with the right influencers",
      },
      {
        type: "text",
        content:
          "A GitHub-stars campaign should reach developer-audience creators specifically, not a broad, undifferentiated influencer list. In the [network](/network), influencers list their niches — this is what makes matching work: a campaign for a Rust CLI tool should surface to systems-programming creators, not lifestyle influencers, and a campaign for a no-code integration should surface to a very different set of accounts.",
      },
      {
        type: "text",
        content:
          "**Action:** Check who's applying to or matched with your campaign before assuming reach equals fit — a smaller creator whose audience is exactly your target user is worth more than a large one whose audience isn't.",
      },
      {
        type: "subheading",
        content: "4. Review every deliverable before it counts",
      },
      {
        type: "text",
        content:
          "When an influencer posts, they submit their deliverable link as proof. [Every submission gets reviewed](/features/review-every-deliverable) — is it live, does it genuinely engage with the project, does it read like a real developer's take rather than a copy-pasted script. This is the step that keeps a genuine campaign genuine: it's the same discipline that keeps bots and templated spam out of your results.",
      },
      {
        type: "text",
        content:
          "**Action:** Actually read what influencers post, not just whether they posted. A short, honest reaction from a relevant developer often drives more real interest than a longer, generic mention.",
      },
      {
        type: "subheading",
        content: "5. Track what each deliverable actually drove",
      },
      {
        type: "text",
        content:
          "Every influencer gets a [tracked link](/features/tracked-campaign-links) with UTM parameters, so you can see which specific post, video, or thread drove clicks back to your repo — and correlate that with your actual star growth over the following days. This is the data bought stars can never give you: a real signal about which creators, angles, and channels actually move a technical audience.",
      },
      {
        type: "text",
        content:
          "**Action:** After a campaign, look at which influencer's link drove the most qualified traffic (not just clicks) and consider working with them again on your next release.",
      },
      {
        type: "heading",
        content: "Manufactured stars vs. genuine influencer-driven stars",
      },
      {
        type: "table",
        caption: "What you're actually buying",
        headers: ["", "Bought stars", "Genuine influencer campaign"],
        rows: [
          ["Risk of removal", "High — bulk purges happen without warning", "None — stars come from real accounts acting genuinely"],
          ["Correlates with real usage", "No", "Yes — driven by developers who actually looked at the repo"],
          ["Compounds over time", "No — a dead-end number", "Often — follows, mentions, contributors, talk references"],
          ["Reputational risk if discovered", "Severe — damages trust in the maintainer", "None — it's how open source has always grown"],
          ["Attribution and learning", "None", "Per-influencer tracked links show what actually worked"],
        ],
      },
      {
        type: "quote",
        content:
          "A star count is supposed to be a proxy for real interest. The moment you fake the proxy, you've thrown away the only reason it was ever worth having.",
      },
      {
        type: "heading",
        content: "What good looks like: a realistic campaign shape",
      },
      {
        type: "text",
        content:
          "A well-run GitHub-stars campaign for a mid-sized open-source project typically involves a handful of relevant creators rather than dozens of generic ones. One or two X developers posting an honest first-impressions thread, a YouTube walkthrough from a channel already covering your category, and a mention in a relevant newsletter roundup can meaningfully move a repo's visibility — and every star that follows is tied to someone who actually looked at what you built.",
      },
      {
        type: "text",
        content:
          "This is slower than a star-farm's overnight number, and that's the point — it's the same reason a launch built on [genuine influencer marketing for a SaaS product](/blog/how-to-run-an-influencer-marketing-campaign-for-your-saas-launch) outperforms one built on bought engagement over any timeframe longer than a week. For more on why the bought version collapses under scrutiny, see [why fake engagement kills your launch and what to do instead](/blog/why-fake-engagement-kills-your-launch-and-what-to-do-instead).",
      },
      { type: "newsletter" },
      {
        type: "heading",
        content: "Frequently asked questions",
      },
      {
        type: "faq",
        items: [
          {
            question: "Can you buy GitHub stars safely?",
            answer:
              "Not reliably. GitHub's abuse detection identifies inorganic starring patterns — bulk-created accounts, tight time windows, no real activity — and removes them, sometimes in delayed bulk purges that make your count drop publicly. There's no safe version of manufacturing a number GitHub is actively built to detect.",
          },
          {
            question: "Does GitHub remove fake or bought stars?",
            answer:
              "Yes. GitHub's platform-abuse systems flag and remove stars from accounts that show inorganic patterns, and purges can happen well after the stars were added — which is often worse for a maintainer than never having them, since the drop is visible.",
          },
          {
            question: "What's the fastest genuine way to grow GitHub stars?",
            answer:
              "Get real developers with relevant audiences to actually try your project and share their honest reaction — through a demo video, a build-in-public thread, or a newsletter mention. Influencer marketing matched by developer niche is how this happens reliably instead of by chance.",
          },
          {
            question: "How is influencer marketing for GitHub repos different from buying stars?",
            answer:
              "Buying stars manufactures a number with no one behind it. Influencer marketing gets a real person with a real, relevant audience to genuinely try your project and tell people about it in their own words — the resulting stars reflect actual interest and often bring follow-on engagement like contributors or mentions.",
          },
          {
            question: "Do I need a huge budget to run a GitHub star campaign?",
            answer:
              "No — Amplibee's Starter plan lets you list a product profile and run one active campaign for free, and campaigns can run on a product-only or revenue-share basis, not just paid sponsorship, depending on what you can offer influencers.",
          },
          {
            question: "Will influencers post generic ads for my repo?",
            answer:
              "No — the AI-generated brief is a starting point of talking points and angles, not a script. Genuine influencers adapt it into their own voice and post their own honest take, which is what makes the resulting engagement mean something to their audience.",
          },
        ],
      },
    ],
  },
  {
    slug: "how-to-get-your-first-10-paying-users",
    title:
      "How to Get Your First 10 Paying Users: A Step-by-Step Playbook for B2B and B2C SaaS Founders",
    description:
      "Why the first ten matter more than the next ten thousand - and exactly how to find them.",
    author: "Amplibee Team",
    date: "2026-09-11",
    color: "#1d4ed8",
    category: "Growth",
    tags: ["first customers", "b2b", "b2c", "growth"],
    readingTime: "20 min read",
    thumbnail: "/images/blog/how-to-get-your-first-10-paying-users/first-10-paying-users-og.png",
    videoId: "",
    body: [
      {
        type: "heading",
        content: "Introduction: The Loneliest, Most Painful Milestone in SaaS",
      },
      {
        type: "text",
        content:
          "We’re building products in a strange, lucky moment. Thanks to AI coding assistants, no-code tools, and one-click deployment, a solo developer can go from a blank page to a working prototype over a single weekend — something that used to take a funded team months. Describe the idea, generate the scaffolding, wire up a database, ship a landing page, and by Sunday night there’s a live URL. The barrier to _building_ has nearly disappeared.",
      },
      {
        type: "text",
        content:
          "But here’s what AI hasn’t made easier: getting a total stranger to trust you enough to actually pull out their card and pay. That part is still slow, personal, and often a little uncomfortable — and it hasn’t changed at all in the AI era. If anything, it’s gotten harder, because now _everyone_ can spin up a prototype, which means more products are competing for the same sliver of attention, while people’s trust and wallets haven’t grown to match. This is exactly why the first 10 paying customers matter more than ever: in a world where building is cheap, they’re your proof that you found something real.",
      },
      {
        type: "text",
        content: "Every founder remembers the day they shipped their product.",
      },
      {
        type: "text",
        content:
          "That gap — between “I built something” and “someone trusted me with their money” — is where most indie **SaaS projects quietly die**. Not because the idea was bad, and not because the code was buggy, but because founders treat the first ten paying customers like a marketing problem when it’s actually a _conversation_ problem.",
      },
      {
        type: "text",
        content:
          "Here’s the uncomfortable truth: your first 10 paid users will almost never come from a landing page sitting quietly on the internet, a Product Hunt launch you forgot to follow up on, or a “wait and see” ad campaign with a $20 budget. They come from you, personally, doing things that feel small, slow, and slightly embarrassing — DMing strangers, asking friends-of-friends for fifteen minutes, and chasing down every “maybe” until it becomes a “yes” or a clear “no.”",
      },
      {
        type: "text",
        content:
          "The good news? Ten is a small number. You don’t need a funnel. You don’t need virality. You need a repeatable process, applied with discipline for a few weeks.",
      },
      {
        type: "text",
        content:
          "But the _process_ looks different depending on what you’re selling. A tool sold to a business (B2B) and a tool sold to an individual consumer (B2C) live in completely different worlds — different buyers, different trust triggers, different sales cycles. This guide breaks down a step-by-step approach for each, using two relatable example products that any solo founder or indie developer will recognize immediately.",
      },
      {
        type: "text",
        content: "Let’s meet our two example founders.",
      },
      {
        type: "list",
        items: [
          "**Riya**, an indie developer, built **Swift**— a simple staff-scheduling and shift-swapping tool for small restaurants and retail stores. This is our **B2B SaaS** example.",
          "**Dev**, a solo founder, built **FocusJar** — a lightweight focus-timer and habit-tracking app for individuals who struggle with procrastination. This is our **B2C SaaS** example.",
        ],
      },
      {
        type: "text",
        content:
          "Neither of them had an audience, an investor, or a marketing budget. Both got to 10 paying customers within about a month. Here’s exactly how.",
      },
      { type: "newsletter" },
      {
        type: "heading",
        content: "Part 1: Why B2B and B2C Are Different Games",
      },
      {
        type: "text",
        content:
          "Before the step-by-step, it’s worth understanding _why_ the playbooks diverge, so you’re not copy-pasting B2C tactics onto a B2B product (or vice versa) and wondering why nothing works.",
      },
      {
        type: "text",
        content:
          "**B2B buyers** are rational, risk-averse, and slow. They’re spending someone else’s money (even if it’s their own small business), they need to justify the purchase, and they care most about reliability, time saved, and risk reduction. Trust is built through direct relationships, demos, and social proof from similar businesses. Sales cycles are longer, but once a B2B customer pays, they tend to stick around and pay more.",
      },
      {
        type: "text",
        content:
          "**B2C buyers** are emotional, fast, and self-funded. They decide in minutes, not weeks. They care about immediate personal benefit — feeling better, saving time, looking good, solving a nagging personal frustration. Trust is built through social proof at scale (reviews, word of mouth, content, community), not a phone call. Individual transactions are smaller, so volume and virality matter more than white-glove service.",
      },
      {
        type: "text",
        content:
          "This single distinction — _one relationship at a time_ versus _many small conversions at scale_ — is the thread running through everything below.",
      },
      {
        type: "heading",
        content: "Part 2: Getting Your First 10 Paid B2B Users",
      },
      {
        type: "subheading",
        content: "The example: Swift, staff-scheduling software for small restaurants and retail shops",
      },
      {
        type: "text",
        content:
          "Riya built Swift because her cousin, who manages a small café, complained constantly about juggling shift swaps over WhatsApp. It’s the classic indie B2B SaaS origin story: solve a painfully specific operational headache for a specific type of small business.",
      },
      {
        type: "subheading",
        content: "Step 1: Pick a Narrow, Painful, Specific Niche — Not “Small Businesses”",
      },
      {
        type: "text",
        content:
          "The single biggest mistake new B2B founders make is defining their customer too broadly. “Small businesses” is not a customer. “Independent coffee shop owners with 5–15 hourly staff who currently schedule shifts over WhatsApp or paper” is a customer.",
      },
      {
        type: "text",
        content:
          "Riya didn’t market Swift to “restaurants.” She picked **independent coffee shops with 3–4 locations**, because that’s the segment she understood best through her cousin. A narrow niche means:",
      },
      {
        type: "list",
        items: [
          "You can find these people in the same three or four places (local business groups, industry Facebook groups, trade associations).",
          "Your messaging can speak directly to their exact pain, which dramatically increases response rates.",
          "Word of mouth travels faster in a tight community than a broad one.",
        ],
      },
      {
        type: "text",
        content:
          "**Action:** Write down your customer in one sentence so specific that a stranger could immediately picture the exact business and person. If you can’t, you’re not ready to start outreach.",
      },
      {
        type: "subheading",
        content: "Step 2: Make a List of 100 Real Businesses (Not Leads — Businesses You Could Actually Call)",
      },
      {
        type: "text",
        content:
          "Before writing a single line of outreach, Riya built a spreadsheet with 100 independent coffee shops pulled from Google Maps, Instagram, and a local restaurant owners’ Facebook group. Each row had: business name, owner’s name (if findable), city, Instagram handle, and a “status” column (Not Contacted / Contacted / Demo Booked / Trial / Paid / Not Interested).",
      },
      {
        type: "text",
        content:
          "This spreadsheet _is_ your CRM for the first 10 customers. You don’t need HubSpot. You need a list and the discipline to update it daily.",
      },
      {
        type: "text",
        content:
          "**Action:** Build a list of 100 real, named businesses that match your niche from Step 1. Not a market size estimate — actual names.",
      },
      {
        type: "subheading",
        content: "Step 3: Reach Out Personally, Not with a Generic Pitch",
      },
      {
        type: "text",
        content: "Riya didn’t send “Hi, I built a scheduling app, check it out!” She sent messages like:",
      },
      {
        type: "quote",
        content:
          "“Hey [Name], I’m building a shift-scheduling tool specifically for small coffee shop teams — no more WhatsApp chaos for swaps. I built it after watching my cousin struggle with exactly this at her café. Would you be open to a 10-minute call so I can show you and get your honest opinion?”",
      },
      {
        type: "text",
        content:
          "This message works because it does three things: shows specific empathy for the exact pain, establishes a personal reason for building it (credibility), and lowers the ask (10 minutes, honest opinion — not “buy my product”).",
      },
      {
        type: "text",
        content: "**Channels that work for B2B outreach at this stage:**",
      },
      {
        type: "list",
        items: [
          "Direct message on Instagram/LinkedIn (most small business owners run their own social accounts)",
          "Warm intros through friends, family, or existing contacts in the industry",
          "Local business associations, Slack/Discord communities, or Facebook groups for that specific trade",
          "Cold email, if you can find a real email address (avoid generic “info@” addresses)",
        ],
      },
      {
        type: "text",
        content:
          "**Action:** Send 10–15 personalized messages per day. Expect a 10–20% response rate. That means you’ll need to contact roughly 50–100 businesses to book your first 10–15 real conversations.",
      },
      {
        type: "subheading",
        content: "Step 4: Do Things That Don’t Scale — Personal Demos, Not Self-Serve Signups",
      },
      {
        type: "text",
        content:
          "At this stage, resist the urge to build a polished self-serve onboarding flow. Every one of your first 10 customers should get a live, personal demo — over a call or even in person if they’re local. Riya did most of her first demos via a 15-minute video call, sharing her screen and actually setting up the business’s first schedule _with them_, live.",
      },
      {
        type: "text",
        content:
          "Why this matters: B2B buyers don’t just want software, they want confidence that if something breaks, a real person will help them. That confidence, at this stage, has to come from you personally.",
      },
      {
        type: "text",
        content:
          "**Action:** Offer a live demo to everyone who responds. During the demo, actually configure their first week’s schedule together. Don’t just show slides — solve their real problem in real time.",
      },
      {
        type: "subheading",
        content: "Step 5: Charge From Day One (Even If It’s a Small, Founding-Customer Price)",
      },
      {
        type: "text",
        content:
          "This is the step most indie founders skip, and it’s the one that actually validates whether you have a business. Free trials are fine, but “free forever” or endless unpaid pilots teach you nothing about whether people will actually pay.",
      },
      {
        type: "text",
        content:
          "Riya offered a **“Founding Café” rate**: $19/month for life (instead of the eventual $49/month), in exchange for two things — an honest weekly feedback call for the first month, and permission to use them as a case study/reference. This did double duty: it created urgency (“this price won’t last”), and it filtered out people who were never going to pay from people with real intent.",
      },
      {
        type: "text",
        content:
          "**Action:** Set a real price, even if discounted, from your very first customer. A founding-member discount is fine. Free-forever is not.",
      },
      {
        type: "subheading",
        content: "Step 6: Ask for a Referral the Moment They See Value",
      },
      {
        type: "text",
        content:
          "The moment a customer has their first “aha” moment — for Riya, that was the first successful shift swap through the app — that’s the highest-trust moment you’ll ever have with them. That’s when you ask:",
      },
      {
        type: "quote",
        content:
          "“Glad this is already saving you time! Do you know one or two other shop owners who deal with the same scheduling headache? I’d love an intro.”",
      },
      {
        type: "text",
        content:
          "B2B referrals inside a niche are gold because the next prospect already trusts the person referring them, and they’re in the exact same situation.",
      },
      {
        type: "text",
        content:
          "**Action:** Build a referral ask into your onboarding checklist. Ask every single paying customer, without exception, once they’ve had a clear win.",
      },
      {
        type: "subheading",
        content: "Step 7: Track Every “No” and Follow Up Later",
      },
      {
        type: "text",
        content:
          "Not everyone says yes on the first conversation. Many will say “interesting, check back with me in a month” — and most founders never do. Riya set a simple rule: every “not now” got a calendar reminder for 3–4 weeks later.",
      },
      {
        type: "text",
        content:
          "**Action:** Follow up with every warm “no” at least once. A meaningful percentage of your first 10 customers will come from second or third touches, not first contact.",
      },
      {
        type: "subheading",
        content: "The Swift Recap",
      },
      {
        type: "text",
        content:
          "Riya’s path to 10 paying café owners looked like this: define a narrow niche → build a list of 100 real businesses → personalized outreach → live personal demos → founding-member pricing → referral asks at the moment of value → disciplined follow-up. No ads. No landing page traffic. Just about four weeks of consistent, unglamorous, one-to-one work.",
      },
      {
        type: "heading",
        content: "Part 3: Getting Your First 10 Paid B2C Users",
      },
      {
        type: "subheading",
        content: "The example: FocusJar, a focus-timer and habit app for individuals",
      },
      {
        type: "text",
        content:
          "Dev built FocusJar after failing, for the hundredth time, to stick to a habit tracker that felt like a chore. It’s a classic indie B2C product: a personal pain point, solved simply, sold directly to individuals who feel that same pain.",
      },
      {
        type: "subheading",
        content: "Step 1: Find a “Bleeding Neck” Personal Problem, Not a “Nice to Have”",
      },
      {
        type: "text",
        content:
          "B2C users won’t pay for mild inconveniences — they’ll pay to fix something that frustrates them regularly and personally. Dev didn’t build “another productivity app.” He built something specifically for people who _know_ they procrastinate, have tried five other apps, and feel guilty about it. That specificity in the pitch matters as much as the specificity of the product.",
      },
      {
        type: "text",
        content:
          "**Action:** Write your product’s value proposition as a sentence a real person would say about their own frustration, not a feature list. “I keep starting tasks and losing focus after ten minutes” is a bleeding-neck problem. “I’d like better analytics on my time” is not.",
      },
      {
        type: "subheading",
        content: "Step 2: Launch Small and Fast, With a Waitlist or Early-Access Angle",
      },
      {
        type: "text",
        content:
          "Dev didn’t wait for a perfect app. He built a minimum version in three weeks — a timer, a simple streak tracker, and one core “focus jar” visual (each completed session drops a marble into a jar) — and opened it to a small early-access group before it was fully polished.",
      },
      {
        type: "text",
        content:
          "Early access creates two things that matter for first users: exclusivity (“you’re one of the first to try this”) and a built-in excuse for rough edges, since early users expect imperfection in exchange for input and special pricing.",
      },
      {
        type: "text",
        content:
          "**Action:** Ship your MVP with a clear “early access” framing rather than waiting for a “finished” product.",
      },
      {
        type: "subheading",
        content: "Step 3: Go to Where Your Specific Audience Already Gathers",
      },
      {
        type: "text",
        content:
          "Unlike B2B, you’re not calling 100 named businesses — you’re showing up in communities where your exact type of user already hangs out and talks about this exact problem.",
      },
      {
        type: "text",
        content: "For Dev, that meant:",
      },
      {
        type: "list",
        items: [
          "**Reddit communities** focused on productivity, ADHD, and studying (e.g., communities where people already post “what app do you use to focus?”)",
          "**Indie Hackers and Product Hunt’s “upcoming” pages**, where early adopters specifically look for new tools",
          "**Twitter/X, building in public** — posting the actual struggle of building FocusJar, the screenshots, the small wins, and the setbacks",
          "**Personal network first** — friends, ex-coworkers, and people from communities Dev was already part of, who fit the “chronic procrastinator” profile",
        ],
      },
      {
        type: "text",
        content:
          "The key move: instead of posting “check out my app,” Dev posted about the _problem_ first — “Why I built a focus timer after failing every other habit app” — and let the product be the natural answer inside the story, not the headline.",
      },
      {
        type: "text",
        content:
          "**Action:** Identify the 2–3 specific online communities where your target user already discusses this exact problem, and participate as a person, not an advertiser, before you ever mention your product.",
      },
      {
        type: "subheading",
        content: "Step 4: Convert Interest Into Payment With a Founding-Member Offer",
      },
      {
        type: "text",
        content:
          "Just like in B2B, “free” doesn’t validate anything. Dev offered a **lifetime deal for the first 50 sign-ups**: a one-time $15 payment instead of the planned $5/month subscription. This did three jobs at once: created urgency (limited spots), lowered the friction of a first purchase (one-time, low dollar amount), and gave Dev fast cash-flow proof that strangers would actually pay.",
      },
      {
        type: "text",
        content:
          "**Action:** Offer an early-bird or founding-member price with a real (not fake) scarcity element — a number of spots, a deadline, or both.",
      },
      {
        type: "subheading",
        content: "Step 5: Make the First 10 Minutes of Product Use Feel Like a Win",
      },
      {
        type: "text",
        content:
          "In B2C, you don’t get a sales call to build trust — the product itself has to earn it in the first few minutes. Dev obsessed over making the very first focus session feel satisfying: a visible marble dropping into the jar, a small congratulatory message, and an immediate visual sense of progress.",
      },
      {
        type: "text",
        content:
          "**Action:** Map out exactly what a brand-new user experiences in their first five minutes, and remove every point of friction or confusion between signup and their first “aha” moment.",
      },
      {
        type: "subheading",
        content: "Step 6: Personally Talk to Your Early Users — Even Though It’s a Consumer App",
      },
      {
        type: "text",
        content:
          "It’s tempting to think B2C means no direct conversations. Wrong, especially at the first-10-customers stage. Dev personally DM’d every early paying user within 48 hours of their purchase, asking one simple question: “What almost stopped you from buying?” That single question surfaced pricing confusion and onboarding friction that Dev fixed before customer 11 showed up.",
      },
      {
        type: "text",
        content:
          "**Action:** Personally reach out to every one of your first 10–20 paying users. At this scale, you have time, and the insight is worth more than the awkwardness.",
      },
      {
        type: "subheading",
        content: "Step 7: Turn Happy Users Into Public Proof",
      },
      {
        type: "text",
        content:
          "Dev asked his first happy customers for a short testimonial or a public post — not a formal review, just a screenshot of their streak with a comment about how it helped. Each one was reposted, turning ten individual purchases into visible social proof for the eleventh, twelfth, and hundredth buyer.",
      },
      {
        type: "text",
        content:
          "**Action:** After a user has a genuine win, ask for a simple, low-effort piece of public proof (a tweet, a screenshot, a one-line quote) rather than a formal review, which most people won’t bother writing.",
      },
      {
        type: "subheading",
        content: "The FocusJar Recap",
      },
      {
        type: "text",
        content:
          "Dev’s path to 10 paying users looked like this: identify a specific emotional pain point → ship a small early-access MVP → show up authentically in 2–3 communities where the target user already lives → offer a low-friction founding-member deal → obsess over the first-five-minutes experience → personally message every buyer → turn wins into public, shareable proof. Again — no ad spend, no growth hacks, just direct, personal hustle aimed at the right small audience.",
      },
      {
        type: "heading",
        content: "Part 4: Mistakes That Quietly Kill the First-10-Users Journey",
      },
      {
        type: "text",
        content:
          "A few patterns show up again and again in founders who stall out before reaching 10 paying customers, in both B2B and B2C:",
      },
      {
        type: "list",
        items: [
          "**Chasing free users instead of paying ones.** A hundred free sign-ups tell you far less than ten dollars from a stranger. Free signals curiosity; payment signals a real problem worth solving.",
          "**Building for months before talking to anyone.** The earlier you start conversations — even before the product is finished — the faster you learn what’s actually worth building.",
          "**Treating “interested” as “converted.”** A “this looks cool!” comment is not a customer. Only a completed payment counts toward your first 10.",
          "**Discounting so deeply that early customers churn later.** A founding-member price should be generous but not so extreme that the eventual “real” price feels like a betrayal.",
          "**Giving up after one round of outreach.** Both Riya and Dev’s real conversion numbers came from second and third touches, not the first message.",
          "**Skipping the personal follow-up.** At 10 customers, you have the time to talk to every one of them individually. That window closes fast — use it while it’s open.",
        ],
      },
      {
        type: "heading",
        content: "Part 5: If Your First 10 Churn, the Follow-Up Is Worth More Than the Revenue Was",
      },
      {
        type: "text",
        content:
          "Here’s something almost nobody tells new founders: some of your first 10 paying customers will probably leave. Maybe two. Maybe five. It stings every time, especially when the whole first month felt like a personal win against the odds. But this moment is also one of the highest-leverage learning opportunities you will ever get in the life of your company — if you don’t let it pass by in silence.",
      },
      {
        type: "text",
        content:
          "Think about what a churned early customer actually represents: they were a real person or business, in your exact niche, who cared enough about the problem to pay you money — and then something about the experience wasn’t enough to keep them. That’s not just a lost dollar. That’s a direct, first-hand explanation of the exact obstacle standing between you and your next 990 customers, handed to you for free, if you’re willing to ask for it.",
      },
      {
        type: "text",
        content:
          "Most solo founders do one of two things when an early customer cancels: they quietly let it go (too painful to face), or they send a generic auto-generated cancellation survey that gets ignored. Neither gets you the real answer.",
      },
      {
        type: "text",
        content:
          "**How this played out for Swift (B2B):** When Riya’s third café canceled after five weeks, she didn’t let it slide. She personally messaged the owner: “No hard feelings at all — I’d genuinely love ten minutes to understand what didn’t work, so I can fix it for the next café like yours.” That one short call revealed the app didn’t yet support multi-location scheduling, something that specific owner needed. That single insight reshaped Riya’s roadmap — and became the single most common feature request from her next twenty prospects.",
      },
      {
        type: "text",
        content:
          "**How this played out for FocusJar (B2C):** Two of Dev’s first ten lifetime-deal buyers quietly stopped opening the app within two weeks. Instead of writing them off, he sent a short, no-pressure DM: “Totally understand if it’s not for you — just curious, what made you stop using it?” One reply — “Honestly I just forgot it existed, there was no reminder” — led directly to a daily notification feature that measurably improved retention for every user who joined after.",
      },
      {
        type: "subheading",
        content: "Why this step is non-negotiable at the 10-customer stage",
      },
      {
        type: "list",
        items: [
          "**You still have direct access.** At 10 customers, you can personally message every single one who leaves. At 990, you’ll mostly be reading aggregate churn dashboards instead of hearing an actual voice explain what went wrong. Use this window while it’s open — it closes fast.",
          "**Early churn reasons tend to repeat.** The reason your 3rd customer left is very often the exact same reason your 30th, 300th, and 3,000th customer will eventually leave too — you’re just lucky enough to be hearing it early, while it’s still cheap to fix.",
          "**It separates “wrong product” from “wrong customer.”** Sometimes churn is telling you a feature is missing — that’s fixable. Sometimes it’s telling you that particular customer was never the right fit to begin with — that’s a targeting signal, not a product flaw. You can only tell the difference by actually asking.",
          "**It keeps the relationship alive.** A respectful, curious follow-up — instead of silence — often turns a churned customer into a future win-back once you’ve shipped the fix, or at minimum, into a warm reference who respects that you genuinely cared about getting it right.",
        ],
      },
      {
        type: "text",
        content:
          "**Action:** Build a simple, personal habit: any time one of your first 10–20 customers cancels or quietly goes dark, send a short, non-defensive message within 48 hours asking one direct question — “What didn’t work for you?” or “What almost made this worth keeping?” Log every single answer in the same spreadsheet you used to track outreach. Patterns will emerge fast, and they will shape your product roadmap far more reliably than any brainstorm ever could — turning the pain of your first churned customers into the clearest map you’ll have for keeping the next 990.",
      },
      {
        type: "heading",
        content: "Part 6: What Y Combinator Founders Actually Learned Getting Their First 10 Customers",
      },
      {
        type: "text",
        content:
          "Everything above is a distilled playbook built around two example founders. But it’s worth backing it up with real-world patterns. Y Combinator recently ran an internal survey on Bookface (YC’s founder network) asking dozens of founders how they actually landed their first 10 customers, and compiled the responses into a set of tactical findings. Here’s what stood out, and how it reinforces (and sharpens) everything Riya and Dev did above.",
      },
      {
        type: "subheading",
        content: "Finding 1: Match the channel to where your buyer actually lives, not to what’s easiest for you",
      },
      {
        type: "text",
        content:
          "Cold email and LinkedIn outreach are popular because they’re comfortable — you can do them from a laptop and they feel like productive work. But they only work if your buyer’s inbox is genuinely central to their day, which is true for something like a sales leader, but far less true for a school administrator, a property manager, an insurance agent, or a truck dispatcher. One founder in a legacy industry spent months cold-emailing with almost no response, then walked the floor of a single industry trade show and closed more deals in three days than in three months of email. The exercise worth doing before any outreach: write down, concretely, how your buyer spends their day — email habits, whether they attend conferences, whether they’re active on Reddit, whether they take phone calls, and where they’d naturally ask for recommendations.",
      },
      {
        type: "subheading",
        content: "Finding 2: Your first 2–3 customers will almost always come from your existing network",
      },
      {
        type: "text",
        content:
          "Across nearly every founder story shared, the earliest customers weren’t cold leads — they were former colleagues, classmates, friends in the industry, or people one introduction away. Early buyers aren’t just betting on the product; they’re betting on trusting _you_ as the founder, and your warm network is the group most predisposed to extend that trust. The suggested order of operations: work your first-degree personal network first, then your second-degree LinkedIn connections (asking for specific, easy-to-forward intros), and only then reach for AI-powered network search tools that can surface relevant people across your extended graph. Outbound prospecting tools, multiple founders agreed, only start to earn their keep once you already have 10–20 quality customers — many founders were investing in automation before exhausting the free, warm leads sitting in their own network.",
      },
      {
        type: "subheading",
        content: "Finding 3: Showing up in person outperforms almost every digital channel for early deals",
      },
      {
        type: "text",
        content:
          "A recurring, almost uncomfortable pattern in the founder stories was persistence in person. One founder flew out to meet the same executive buyer four weeks in a row before finally closing them. Another regularly showed up at customer offices uninvited, was turned away most of the time, and once flew to meet a prospect who ended the meeting after eight minutes — yet that same account eventually became one of his largest. Small, industry-specific conferences converted especially well, using a simple mini-playbook: set up back-to-back 15-minute meeting slots for the event, email the attendee list before it starts to fill the calendar, and follow up again mid-event to catch anyone who missed the first email. Several founders also ran small founder dinners for 6–10 ideal customers, costing roughly $50–100, which consistently converted better than large sponsored events — once someone’s shared a meal with you, ignoring your follow-up email becomes much harder.",
      },
      {
        type: "subheading",
        content: "Finding 4: Find where your future customers are already complaining, and respond as a real person",
      },
      {
        type: "text",
        content:
          "For consumer and small-business products, there’s often a specific online place where people are already venting about the exact problem being solved — and Reddit came up constantly. The approach: search old threads where people describe the exact pain point, then message each commenter individually rather than posting once and hoping. One founder made this his full-time job for a couple of months, posting several times a day across Reddit and Facebook groups, occasionally getting shadowbanned, but still generating steady customers. The same principle extends to Discord servers, YouTube comments, and niche industry forums — wherever the complaint is public, that’s where to show up. A nice side effect specific to Reddit: threads get indexed by Google and keep surfacing for years, so early effort keeps compounding.",
      },
      {
        type: "subheading",
        content: "Finding 5: When you do need to go fully cold, a small toolkit does most of the work",
      },
      {
        type: "text",
        content:
          "Once warm leads and community outreach are exhausted, a few tools came up repeatedly: a lead-database tool with built-in email finding and a basic outreach sequencer (with a free tier generous enough for a first list), an AI-powered enrichment tool for qualifying leads against specific criteria (like tech stack or recent hiring), and LinkedIn Premium — often used by sending a bare connection request first, then a short direct message once it’s accepted.",
      },
      {
        type: "subheading",
        content: "Finding 6: Reframe the ask — advice and feedback often open doors that a pitch can’t",
      },
      {
        type: "text",
        content:
          "One of the more counterintuitive findings was that outreach framed as a request for mentorship, advice, a product review, or a working session tended to convert better than a straightforward sales pitch — provided the request was genuine, not a disguised pitch. Examples ranged from a founder who asked dozens of category CEOs to mentor him (a few became customers), to a founder who spoke with 200 salespeople before her product even existed, testing a new hypothesis over LinkedIn each week and converting roughly a fifth of accepted connections into calls, to a developer-tools founder who offered free architecture whiteboarding sessions that happened to require his own product, to a founder selling to lawyers who paid them directly for their time and feedback — an approach that looked expensive on paper but produced a very reasonable cost per customer given the high value of each account.",
      },
      {
        type: "subheading",
        content: "Finding 7: Give value before asking for anything",
      },
      {
        type: "text",
        content:
          "Several of the highest-converting outreach messages led with something useful and specific rather than an ask — a free scan of the prospect’s public-facing setup, a short walkthrough of their product with concrete suggestions, or a tailored one-page note relevant to their exact situation. This kind of effort doesn’t scale, and it isn’t meant to — it only needs to work for the first 10.",
      },
      {
        type: "subheading",
        content: "Finding 8: Outreach copy matters less than people assume — clarity and a human tone matter more",
      },
      {
        type: "text",
        content:
          "A few tactical rules held up across founder stories: keep outreach messages short (well under 100 words), make the single call to action unmistakable so the recipient knows exactly what’s being asked of them, and read the message out loud before sending it — anything that wouldn’t naturally be said to a real person should be rewritten. Following up three to four times over a couple of weeks was described as standard practice, not pushy.",
      },
      {
        type: "subheading",
        content: "Finding 9: A simple three-phase framework for the whole journey",
      },
      {
        type: "text",
        content:
          "The clearest mental model that emerged: customers 1–3 come almost exclusively from a founder’s personal network; customers 4–10 come from unscalable, manual effort — flights, Reddit DMs, small dinners, personalized outreach, free consulting; and only around customer 10–50 does it make sense to lean on scalable tools and sequences, once there’s a refined pitch and real case studies to back it up. The reason the messy middle phase works at all is that the founder is doing it personally — showing up, researching, and reaching out in a way no automated tool can fake. That personal effort _is_ the early-stage advantage over every larger, better-resourced competitor.",
      },
      {
        type: "heading",
        content: "Conclusion: Ten Is a People Problem, Not a Marketing Problem",
      },
      {
        type: "text",
        content:
          "Whether you’re building the next Swift for small business owners or the next FocusJar for individual users, the path to your first 10 paying customers looks less like a funnel and more like a series of honest, direct conversations, repeated with discipline until a few of them turn into “yes.”",
      },
      {
        type: "text",
        content:
          "B2B rewards founders who go narrow, personal, and patient — one relationship, one demo, one referral at a time. B2C rewards founders who go where their exact audience already gathers, remove friction ruthlessly, and turn early buyers into visible proof for the next wave.",
      },
      {
        type: "text",
        content:
          "But underneath both playbooks is the same principle: your first 10 paying customers aren’t a growth metric, they’re a validation signal — proof that a real person, with a real problem, was willing to trust you with their money. Treat each one of those ten conversations as precious, because in a very real sense, they are the whole business, before the business exists anywhere else.",
      },
      {
        type: "text",
        content:
          "And if a few of them don’t stick around, don’t treat it as failure — treat it as the cheapest, most honest research you’ll ever get. In an era where AI can help you build almost anything in a weekend, the founders who win won’t be the ones who prototype fastest. They’ll be the ones who listen hardest to their first ten — especially the ones who left — and use it to make sure customer 990 never has a reason to.",
      },
      {
        type: "text",
        content: "Get to ten. Then figure out how to get to a hundred.",
      },
    ],
  },
  {
    slug: "how-to-run-an-influencer-marketing-campaign-for-your-saas-launch",
    title: "How to Run an Influencer Marketing Campaign for Your SaaS Launch",
    description:
      "A practical, step-by-step guide to briefing a campaign, matching with real influencers, reviewing deliverables, and tracking results on Amplibee.",
    author: "Amplibee Team",
    date: "2026-09-18",
    color: "#0284c7",
    category: "Product",
    tags: ["saas launch", "influencer marketing", "product hunt", "campaigns"],
    readingTime: "12 min read",
    thumbnail: "/images/blog/how-to-run-an-influencer-marketing-campaign-for-your-saas-launch/campaign-step-by-step-og.png",
    body: [
      {
        type: "text",
        content:
          "**The short answer:** you run an influencer marketing campaign for a SaaS launch by briefing what you're promoting and your goal, letting AI draft channel-specific talking points from your product profile, matching with real influencers in the network whose niche fits your product, reviewing what they submit as proof before it counts, and tracking results through each influencer's unique link. [Amplibee](/) is built around exactly this flow, end to end.",
      },
      {
        type: "text",
        content:
          "This guide walks through the whole process in order, with the decisions that actually matter at each step — what makes a brief work, how matching actually happens, what to look for when reviewing a deliverable, and how to read the results afterward.",
      },
      {
        type: "heading",
        content: "Before you brief anything: get your product profile right",
      },
      {
        type: "text",
        content:
          "A [product profile](/features/product-profile) is the foundation every campaign brief pulls from — your product's voice, audience, and the specific facts that should stay consistent (pricing, user count, what makes it different from the obvious alternative). Get this right once and every campaign after it starts from a stronger place.",
      },
      {
        type: "text",
        content:
          "The single most common mistake here is describing the product the way you'd describe it to an investor instead of the way a real user would describe it to a friend. \"An AI-powered workflow orchestration platform\" doesn't give an influencer anything to say. \"It replaces the six-tab spreadsheet mess our users were using to track deploys\" does.",
      },
      {
        type: "text",
        content:
          "**Action:** Write your product profile in the voice of a user explaining it to a friend, not a pitch deck explaining it to an investor.",
      },
      {
        type: "heading",
        content: "Step 1: Brief the campaign — what you're promoting and what success means",
      },
      {
        type: "text",
        content:
          "A campaign starts with two decisions: what you're promoting (the SaaS product itself, a specific feature, or a Product Hunt launch moment) and the goal — sign-ups, awareness, traffic, or downloads if there's a companion app. The goal shapes everything downstream: the angle the AI suggests, which influencers are a good match, and what the tracked links measure.",
      },
      {
        type: "text",
        content:
          "A launch-day campaign and an ongoing awareness campaign look different even for the same product. Launch day rewards urgency and a specific moment to react to (\"we're live on Product Hunt today\"); an ongoing campaign rewards a durable angle that doesn't go stale after 48 hours (\"here's the actual workflow this replaces\").",
      },
      {
        type: "text",
        content:
          "**Action:** Pick one primary goal per campaign rather than a vague mix of everything. A campaign optimized for sign-ups reads differently than one optimized for awareness, and mixing goals produces a brief that's mediocre at both.",
      },
      {
        type: "heading",
        content: "Step 2: Let AI draft talking points, or write the brief yourself",
      },
      {
        type: "text",
        content:
          "The [campaign brief generator](/features/campaign-brief-generator) takes your product profile and goal and drafts suggested talking points per channel — a hook-driven angle for X, a longer story-with-context angle for LinkedIn, a demo-shaped outline for YouTube, a visual-first caption idea for Instagram. This is meant to save an influencer the work of figuring out an angle from scratch, not to hand them a script.",
      },
      {
        type: "text",
        content:
          "If you'd rather skip generation, you can write the brief entirely yourself — the important part is that whatever ends up in front of an influencer gives them something true and specific to react to, not generic marketing copy that could describe any product in the category.",
      },
      {
        type: "list",
        items: [
          "Good brief material: a specific before/after (\"used to take four tools, now takes one\"), a real number if you have one, the exact type of user it's built for.",
          "Bad brief material: adjectives without evidence (\"powerful,\" \"seamless,\" \"revolutionary\") — influencers can't do anything genuine with these, and their audience can smell them from a distance.",
        ],
      },
      {
        type: "text",
        content:
          "**Action:** Revise the generated draft directly in the [campaign brief generator](/features/campaign-brief-generator) — tighten the hook, add a concrete number, or shift the tone per channel without losing what's already working.",
      },
      {
        type: "heading",
        content: "Step 3: Get matched with real influencers in the network",
      },
      {
        type: "text",
        content:
          "Once a campaign is live, influencers whose niche matches discover it in the [network](/network) — a SaaS product for engineering teams surfaces to developer-tools creators, a consumer productivity app surfaces to productivity and self-improvement creators. You can also browse the directory directly and see who's active in your category, their channels, and roughly how large their audience is.",
      },
      {
        type: "text",
        content:
          "Resist the urge to chase the single largest account available. A mid-sized creator whose audience is precisely your target user typically drives more qualified sign-ups than a much larger account with a loosely related audience — and their post is more likely to read as genuine because the product actually fits what they normally talk about.",
      },
      {
        type: "text",
        content:
          "**Action:** Look at niche fit and engagement quality before audience size when deciding which influencers to prioritize for a launch.",
      },
      {
        type: "heading",
        content: "Step 4: Review every deliverable before it counts",
      },
      {
        type: "text",
        content:
          "When an influencer posts, they submit the link as their deliverable. [Every deliverable is reviewed](/features/review-every-deliverable) before it counts toward your campaign — this is what keeps a campaign's results honest and is a deliberate part of the product, not an afterthought.",
      },
      {
        type: "text",
        content:
          "When reviewing, look for whether the post genuinely reflects the brief in the influencer's own voice, whether it's actually live and visible (not deleted or set to a limited audience), and whether it reads like something their followers would actually engage with rather than an obvious paid placement with no real opinion attached.",
      },
      {
        type: "list",
        items: [
          "Deliverable statuses move through: submitted → under review → approved or rejected.",
          "A rejected deliverable doesn't count toward results — the influencer sees why so they can fix it and resubmit if it's fixable (for example, a link that hadn't gone live yet).",
          "Approved deliverables roll into your campaign metrics automatically via their tracked link.",
        ],
      },
      {
        type: "text",
        content:
          "**Action:** Set aside a specific time within 24–48 hours of a deliverable being submitted to review it — fast review keeps the campaign moving and gives influencers quick feedback while their post is still fresh.",
      },
      {
        type: "heading",
        content: "Step 5: Track results through tracked links",
      },
      {
        type: "text",
        content:
          "Every influencer's deliverable is tied to a [tracked link](/features/tracked-campaign-links) with UTM parameters, so you see exactly what each individual post drove — clicks, sign-ups, or whatever your campaign's goal is measuring. This is the data that tells you which creators, channels, and angles are actually working, instead of one undifferentiated campaign-wide number.",
      },
      {
        type: "table",
        caption: "A typical SaaS launch campaign timeline",
        headers: ["Phase", "What happens", "Typical duration"],
        rows: [
          ["Setup", "Product profile written, campaign briefed, AI drafts talking points", "1–2 days"],
          ["Matching", "Network influencers discover and apply to the campaign", "3–7 days"],
          ["Posting", "Influencers adapt the brief and post to their audience", "1–2 weeks"],
          ["Review", "Each deliverable submitted and reviewed before counting", "Ongoing, within 24–48h per submission"],
          ["Tracking", "Results roll up per influencer via tracked links", "Ongoing through and after launch"],
        ],
      },
      {
        type: "text",
        content:
          "**Action:** After the campaign, compare which influencers' tracked links drove the highest-quality traffic (sign-ups, not just clicks) — that's the list to prioritize inviting back for your next release.",
      },
      {
        type: "heading",
        content: "Combining this with your Product Hunt launch day",
      },
      {
        type: "text",
        content:
          "A SaaS launch campaign pairs naturally with a Product Hunt launch: brief the campaign with your Product Hunt page as the goal-relevant link, and time the network match so influencer posts land the same day, giving your launch a wave of genuine, independent voices rather than relying only on your own audience and the Product Hunt community itself.",
      },
      {
        type: "text",
        content:
          "This works because it's additive to good fundamentals, not a substitute for them — the same first-principles most founders already know about getting their [first 10 paying customers](/blog/how-to-get-your-first-10-paying-users) still apply; influencer marketing widens the number of people who ever hear about the product in the first place.",
      },
      { type: "newsletter" },
      {
        type: "heading",
        content: "Frequently asked questions",
      },
      {
        type: "faq",
        items: [
          {
            question: "How long does it take to run an influencer campaign for a SaaS launch?",
            answer:
              "Setup and briefing typically takes one to two days. Matching with relevant influencers in the network usually takes three to seven days depending on your niche, and posting activity often continues for one to two weeks around a launch, with review happening continuously as deliverables come in.",
          },
          {
            question: "Do I need a big budget to run a campaign?",
            answer:
              "No — campaigns can run as product-only or revenue-share arrangements, not just paid sponsorship, and Amplibee's free Starter plan lets you list a product profile and run one active campaign to see how the network responds before committing budget.",
          },
          {
            question: "How do I pick the right influencers for my SaaS launch?",
            answer:
              "Prioritize niche fit and audience relevance over raw follower count — a mid-sized creator whose audience is exactly your target user usually drives more qualified sign-ups than a larger, loosely related account, and their post is more likely to read as genuine.",
          },
          {
            question: "What happens if an influencer's post doesn't reflect my brief well?",
            answer:
              "Every deliverable is reviewed before it counts toward your campaign. If it doesn't genuinely reflect the brief or isn't live, it can be rejected, and the influencer sees why so they can fix and resubmit if the issue is fixable.",
          },
          {
            question: "Can I run a campaign alongside a Product Hunt launch?",
            answer:
              "Yes — brief the campaign with your Product Hunt page as the destination and time the network match so influencer posts land around your launch day, adding independent voices on top of the Product Hunt community itself.",
          },
          {
            question: "How do I know which influencer actually drove sign-ups?",
            answer:
              "Each influencer gets a unique tracked link with UTM parameters, so sign-ups, clicks, or downloads attributed to their specific post are visible per-influencer rather than as one combined campaign total.",
          },
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  return circularRelated(blogPosts, currentIndex, limit);
}

export function getLatestPosts(limit = 2): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
