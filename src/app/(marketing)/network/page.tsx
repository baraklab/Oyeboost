import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { InfluencerMarquee } from "@/components/marketing/influencer-marquee";
import { createAdminClient } from "@/lib/supabase/admin";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/config";
import { getBlockColorForLabel } from "@/lib/block-colors";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Network",
  description: `The Amplibee network — ${siteConfig.stats.influencers} real influencers and creators who discover campaigns by niche and post genuinely to their own audience.`,
  path: "/network",
});

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, string> = {
  influencer: "Influencer",
  creator: "Creator",
  community: "Community",
};

export default async function NetworkPage() {
  const supabase = createAdminClient();
  const { data: profiles } = await supabase
    .from("network_profiles")
    .select("id, display_name, category, platforms, audience_size, bio, niches")
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .limit(24);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Network", path: "/network" },
        ])}
      />
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-16 sm:pb-10 sm:pt-20">
          <h1 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Where {siteConfig.stats.influencers} real influencers discover campaigns worth
            posting about.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            This is the marketplace where product owners and genuine influencers find each other —
            matched by niche and channel, not cold outreach. Browse who&apos;s here, or list your
            own campaign and let the right creators discover it.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/login?mode=signup">
                Get started for free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Apply to be listed</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-8 sm:pb-20 sm:pt-10">
          <SectionHeading
            eyebrow="Directory"
            title="Influencers, creators, and communities"
            description="Every profile here is opted in, and every deliverable they post gets reviewed — genuine reach only."
          />

          <div className="mt-10">
            {profiles && profiles.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((profile) => {
                  const color = getBlockColorForLabel(profile.category);
                  return (
                  <div key={profile.id} className="rounded-lg border border-border bg-card p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading text-[15px] font-semibold text-foreground">
                        {profile.display_name}
                      </h3>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium",
                          color.bg,
                          color.fg,
                        )}
                      >
                        {categoryLabels[profile.category]}
                      </span>
                    </div>
                    {profile.bio && (
                      <p className="mt-2 text-sm text-muted-foreground">{profile.bio}</p>
                    )}
                    {profile.niches && profile.niches.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {profile.niches.map((niche) => (
                          <span
                            key={niche}
                            className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {niche}
                          </span>
                        ))}
                      </div>
                    )}
                    {profile.audience_size && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        ~{profile.audience_size.toLocaleString()} audience
                      </p>
                    )}
                  </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <InfluencerMarquee />
                <div className="mt-8 flex flex-col items-center gap-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Illustrative profiles — the real directory is just getting started. Be one of
                    the first creators or communities listed.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Apply to be listed</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
