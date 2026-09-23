import { Star } from "lucide-react";
import { PlatformIcon } from "@/components/platform/platform-icon";
import { getBlockColorForLabel } from "@/lib/block-colors";
import { seedInfluencers, type SeedInfluencer } from "@/lib/seed-influencers";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  influencer: "Influencer",
  creator: "Creator",
  community: "Community",
};

function InfluencerCard({ profile }: { profile: SeedInfluencer }) {
  const color = getBlockColorForLabel(profile.category);
  return (
    <div className="w-72 shrink-0 rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- external stock portrait, not an optimizable local asset */}
          <img
            src={profile.photo}
            alt=""
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-full bg-muted object-cover"
          />
          <h3 className="font-heading text-[15px] font-semibold text-foreground">{profile.name}</h3>
        </div>
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

      <div className="mt-3 flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < Math.round(profile.rating) ? "fill-accent text-accent" : "fill-muted text-muted",
              )}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-foreground">{profile.rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">({profile.reviewCount})</span>
      </div>

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

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {profile.platforms.map((platform) => (
            <PlatformIcon key={platform} platform={platform} className="size-5" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">~{profile.audienceSize.toLocaleString()} audience</p>
      </div>
    </div>
  );
}

function MarqueeRow({ items, durationSeconds }: { items: SeedInfluencer[]; durationSeconds: number }) {
  const track = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="marquee-track flex w-max gap-4" style={{ animationDuration: `${durationSeconds}s` }}>
        {track.map((profile, i) => (
          <InfluencerCard key={`${profile.name}-${i}`} profile={profile} />
        ))}
      </div>
    </div>
  );
}

/**
 * Two right-to-left auto-scrolling rows of illustrative influencer profiles,
 * shown while the real network directory is still filling out. Each row's
 * content is duplicated once so the CSS loop is seamless, and the two rows
 * run at slightly different speeds so they don't look mechanically synced.
 */
export function InfluencerMarquee() {
  const mid = Math.ceil(seedInfluencers.length / 2);
  const rowA = seedInfluencers.slice(0, mid);
  const rowB = seedInfluencers.slice(mid);

  return (
    <div className="flex flex-col gap-4">
      <MarqueeRow items={rowA} durationSeconds={38} />
      <MarqueeRow items={rowB} durationSeconds={46} />
    </div>
  );
}
