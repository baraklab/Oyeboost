import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProfileForm } from "./profile-form";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUserId } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Influencer Profile" };
export const dynamic = "force-dynamic";

export default async function ChannelsPage() {
  const supabase = createAdminClient();
  const userId = (await getCurrentUserId())!;

  const { data: own } = await supabase
    .from("network_profiles")
    .select("display_name, category, platforms, niches, audience_size, bio, rate_info, portfolio_url, contact_url, is_visible")
    .eq("user_id", userId)
    .maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Influencer Profile"
        description="How you appear to product owners in the public network — real audience, real reach, no bots."
      />

      <div className="rounded-lg border border-border bg-card p-5 lg:max-w-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-[15px] font-semibold text-foreground">Your listing</h2>
          <Link
            href="/network"
            target="_blank"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            View public network <ArrowUpRight className="size-3" />
          </Link>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill this in and make it visible to be discoverable by campaign owners and eligible to apply to
          public campaigns.
        </p>
        <div className="mt-5">
          <ProfileForm
            profile={
              own
                ? {
                    displayName: own.display_name,
                    category: own.category,
                    platforms: own.platforms,
                    niches: own.niches,
                    audienceSize: own.audience_size,
                    bio: own.bio ?? "",
                    rateInfo: own.rate_info ?? "",
                    portfolioUrl: own.portfolio_url ?? "",
                    contactUrl: own.contact_url ?? "",
                    isVisible: own.is_visible,
                  }
                : null
            }
          />
        </div>
      </div>
    </div>
  );
}
