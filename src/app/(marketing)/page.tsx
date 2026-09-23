import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  Rocket,
  GitBranch,
  Megaphone,
  Smartphone,
  FileText,
  Users,
  FolderGit2,
  Play,
  ClipboardList,
  TrendingUp,
  Code2,
  Radar,
  Link as LinkIcon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowMap } from "@/components/marketing/workflow-map";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PromoCard } from "@/components/marketing/promo-card";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/config";
import { getBlockColor } from "@/lib/block-colors";
import { blogPosts } from "@/lib/blog/posts";
import { FEATURE_LIST } from "@/lib/features-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const useCases = [
  { icon: Rocket, label: "SaaS launches" },
  { icon: Smartphone, label: "App downloads" },
  { icon: Megaphone, label: "Product Hunt launches" },
  { icon: Users, label: "Founder-led awareness" },
  { icon: FileText, label: "Indie build-in-public" },
  { icon: GitBranch, label: "GitHub star growth" },
  { icon: FolderGit2, label: "Open-source projects" },
  { icon: Sparkles, label: "Blog post reach" },
];

const featureIcons: Record<string, typeof FileText> = {
  "campaign-brief-generator": Sparkles,
  "product-profile": ClipboardList,
  "influencer-network": Radar,
  "tracked-campaign-links": LinkIcon,
  campaigns: Megaphone,
  "review-every-deliverable": ShieldCheck,
};

const exploreFeatures = FEATURE_LIST.slice(0, 2).map((feature) => ({
  href: `/features/${feature.slug}`,
  color: feature.color,
  icon: featureIcons[feature.slug] ?? Megaphone,
  image: feature.thumbnail,
  eyebrow: "Feature",
  title: feature.title,
  description: feature.description,
}));

const blogCategoryIcons: Record<string, typeof FileText> = {
  Growth: TrendingUp,
  Product: Sparkles,
  Engineering: Code2,
  Marketing: Megaphone,
};

const howItWorks = [
  {
    title: "Brief your campaign",
    description:
      "Tell Amplibee what you're promoting — a SaaS product, a mobile app, a GitHub repo, a Product Hunt launch, or a blog post — and the goal: stars, sign-ups, downloads, awareness, or traffic.",
  },
  {
    title: "AI drafts the talking points, or you write it",
    description:
      "AI suggests angles and captions per channel from your product profile. Adapt them, rewrite them, or skip generation entirely and brief it yourself.",
  },
  {
    title: "Real influencers discover it and post genuinely",
    description:
      "Creators in the network whose niche matches your campaign pick it up, put it in their own voice, and post to their own real audience — not a script, not a bot.",
  },
  {
    title: "You review proof and track results",
    description:
      "Every deliverable is submitted as a link and reviewed before it counts. Tracked links show exactly what each influencer's post drove.",
  },
];

export default function HomePage() {
  // Same order as the /blog list and the features list — no date re-sorting here.
  const latestPosts = blogPosts.slice(0, 2);

  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-eyebrow">Influencer marketing for apps, SaaS, products, startups</p>
              <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Marketing muscle for your products.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Brief a campaign for your product, app, or GitHub repo. Genuine influencers and
                creators discover it and tell their own real audience about it on X, LinkedIn,
                YouTube, and Instagram — never bots, never fake followers, never bought stars.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/login?mode=signup">
                    Get started for free
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/features">
                    <Play className="size-4" />
                    See how it works
                  </Link>
                </Button>
              </div>

              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <dt className="text-eyebrow">Product owners</dt>
                  <dd className="font-heading mt-1 text-2xl font-semibold text-foreground">
                    {siteConfig.stats.users}{" "}
                    <span className="text-base font-normal text-muted-foreground">on Amplibee</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow">Real reach</dt>
                  <dd className="font-heading mt-1 text-2xl font-semibold text-foreground">
                    {siteConfig.stats.influencers}{" "}
                    <span className="text-base font-normal text-muted-foreground">influencers</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-blue-400/25 blur-3xl"
              />
              <div className="overflow-hidden rounded-lg border border-border">
                <Image
                  src="/hero-create-campaign.png"
                  alt="A campaign created in Amplibee flows out to LinkedIn, Instagram, X, and YouTube as posts ready for a real account to share"
                  width={1355}
                  height={1161}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Use cases"
            title="Get a product, app, or repo in front of the people who'd genuinely care."
            description="Amplibee works anywhere real word-of-mouth would move the needle — not just launch day."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {useCases.map(({ icon: Icon, label }, index) => {
              const color = getBlockColor(index);
              return (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-4 py-6 text-center"
                >
                  <div className={cn("flex size-16 items-center justify-center rounded-xl", color.bg)}>
                    <Icon className={cn("size-8", color.fg)} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="How it works"
            title="One campaign. Real people. Genuine reach."
            description="No bots, no fake followers, no platform manipulation — just real influencers talking to their real audience."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-border bg-card p-5">
                <span className="text-eyebrow">Step {index + 1}</span>
                <h3 className="font-heading mt-2 text-[15px] font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One campaign, many channels */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Real channels"
            title="One campaign reaches influencers across every channel that matters."
            description="Brief it once. Influencers on X, LinkedIn, YouTube, and Instagram pick it up and post it their own way."
          />
          <div className="mt-10">
            <WorkflowMap />
          </div>
        </div>
      </section>

      {/* Genuine reach, never bots */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-eyebrow">Genuine, always</p>
            <h2 className="font-heading mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Real people telling real audiences about work worth talking about.
            </h2>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
              {[
                "Every influencer profile is a real person with a real, opted-in audience",
                "Every deliverable is reviewed before it counts toward your campaign",
                "Tracked links show exactly what each real post drove",
                "Genuine engagement, earned the honest way — every time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="mt-7" asChild>
              <Link href="/login?mode=signup">
                Get started for free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-medium text-foreground">Campaign brief preview</span>
              <span className="text-xs text-muted-foreground">Draft</span>
            </div>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p className="text-foreground">
                &ldquo;Goal: GitHub stars for an open-source CLI tool. Angle: the exact workflow it
                replaces.&rdquo;
              </p>
              <div className="rounded-md bg-block-violet-bg p-3">
                <p className="text-xs font-medium text-block-violet-fg">→ X talking points</p>
                <p className="mt-1">A thread angle on the specific problem it solves for developers.</p>
              </div>
              <div className="rounded-md bg-block-emerald-bg p-3">
                <p className="text-xs font-medium text-block-emerald-fg">→ YouTube talking points</p>
                <p className="mt-1">A short demo outline for a creator to record in their own voice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <p className="text-eyebrow">The network</p>
          <h2 className="font-heading mx-auto mt-3 max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {siteConfig.stats.influencers} influencers are already discovering campaigns like yours.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-muted-foreground">
            Browse the network to see the creators who could genuinely tell their audience about
            your product — matched by niche and channel, not cold outreach.
          </p>
          <Button variant="outline" className="mt-7" asChild>
            <Link href="/network">
              Explore the network
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="border-b border-border bg-block-violet-fg/85">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center sm:py-16">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Your launch deserves real people talking about it.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-white/80">
            Brief a campaign, let real influencers discover it, and track exactly what genuine reach
            gets you.
          </p>
          <Button size="lg" variant="accent" className="mt-7" asChild>
            <Link href="/login?mode=signup">
              Get started for free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Explore more: features + blog */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading eyebrow="Explore more" title="Features and Blog" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latestPosts.flatMap((post, index) => [
              <PromoCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                color={post.color}
                icon={blogCategoryIcons[post.category] ?? FileText}
                image={post.thumbnail}
                eyebrow={post.category}
                title={post.title}
                description={post.description}
              />,
              exploreFeatures[index] && (
                <PromoCard key={exploreFeatures[index].title} {...exploreFeatures[index]} />
              ),
            ])}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Brief once. Reach real audiences. Grow genuinely.
          </h2>
          <Button size="lg" className="mt-7" asChild>
            <Link href="/login?mode=signup">
              Get started for free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
