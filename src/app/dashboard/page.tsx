import Link from "next/link";
import type { Metadata } from "next";
import { Megaphone, ClipboardCheck, Users, FolderKanban, PenSquare, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/platform/platform-icon";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUserId } from "@/lib/auth/session";
import { formatDate } from "@/lib/utils";
import type { ChannelId, CampaignStatus } from "@/types/database";

export const metadata: Metadata = { title: "Overview" };
export const dynamic = "force-dynamic";

const statusVariant: Record<CampaignStatus, "outline" | "success" | "warning" | "default"> = {
  draft: "outline",
  active: "success",
  paused: "warning",
  completed: "default",
};

export default async function DashboardOverviewPage() {
  const supabase = createAdminClient();
  const userId = (await getCurrentUserId())!;

  const { data: myCampaigns } = await supabase
    .from("campaigns")
    .select("id, name, status, target_channels, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const campaigns = myCampaigns ?? [];
  const campaignIds = campaigns.map((c) => c.id);
  const activeCampaignsCount = campaigns.filter((c) => c.status === "active").length;

  const [{ count: pendingDeliverablesCount }, { count: pendingApplicationsCount }] = await Promise.all([
    campaignIds.length
      ? supabase
          .from("campaign_deliverables")
          .select("id", { count: "exact", head: true })
          .in("campaign_id", campaignIds)
          .eq("status", "submitted")
      : Promise.resolve({ count: 0 }),
    campaignIds.length
      ? supabase
          .from("campaign_applications")
          .select("id", { count: "exact", head: true })
          .in("campaign_id", campaignIds)
          .eq("status", "pending")
      : Promise.resolve({ count: 0 }),
  ]);

  const recentCampaigns = campaigns.slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Overview"
        description="Genuine reach, not manufactured — where your campaigns stand right now."
        action={
          <Button asChild>
            <Link href="/dashboard/create">
              <PenSquare className="size-4" />
              New campaign
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Active campaigns" value={activeCampaignsCount} icon={Megaphone} colorIndex={0} />
        <StatCard label="Deliverables to review" value={pendingDeliverablesCount ?? 0} icon={ClipboardCheck} colorIndex={1} />
        <StatCard label="Applications pending" value={pendingApplicationsCount ?? 0} icon={Users} colorIndex={2} />
        <StatCard label="Total campaigns" value={campaigns.length} icon={FolderKanban} colorIndex={3} />
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-[15px] font-semibold text-foreground">Recent campaigns</h2>
          <Link
            href="/dashboard/campaigns"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            View all <ArrowUpRight className="size-3" />
          </Link>
        </div>

        <div className="mt-4">
          {recentCampaigns.length > 0 ? (
            <ul className="flex flex-col divide-y divide-border">
              {recentCampaigns.map((campaign) => (
                <li key={campaign.id} className="flex items-center gap-3 py-3">
                  <div className="flex items-center gap-1">
                    {(campaign.target_channels as ChannelId[]).map((channel) => (
                      <PlatformIcon key={channel} platform={channel} className="size-4 shrink-0" colored />
                    ))}
                  </div>
                  <Link
                    href={`/dashboard/campaigns/${campaign.id}`}
                    className="flex-1 truncate text-sm text-foreground hover:underline"
                  >
                    {campaign.name}
                  </Link>
                  <Badge variant={statusVariant[campaign.status]}>{campaign.status}</Badge>
                  <span className="hidden text-xs text-muted-foreground sm:inline">{formatDate(campaign.created_at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={Megaphone}
              title="No campaigns yet"
              description="Brief what you're promoting and let real influencers discover it in the network."
              action={
                <Button size="sm" asChild>
                  <Link href="/dashboard/create">New campaign</Link>
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
