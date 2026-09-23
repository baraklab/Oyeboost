import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { DeliverablesManager } from "./deliverables-manager";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUserId } from "@/lib/auth/session";
import type { ChannelId, DeliverableStatus } from "@/types/database";

export const metadata: Metadata = { title: "Deliverables" };
export const dynamic = "force-dynamic";

export default async function DeliverablesPage() {
  const supabase = createAdminClient();
  const userId = (await getCurrentUserId())!;

  const { data: myCampaigns } = await supabase.from("campaigns").select("id, name").eq("user_id", userId);
  const myCampaignIds = (myCampaigns ?? []).map((c) => c.id);
  const campaignNameById = new Map((myCampaigns ?? []).map((c) => [c.id, c.name]));

  const { data: deliverableRows } = myCampaignIds.length
    ? await supabase
        .from("campaign_deliverables")
        .select("id, campaign_id, channel, content_url, notes, status, submitted_at, network_profile_id")
        .in("campaign_id", myCampaignIds)
        .order("submitted_at", { ascending: false })
        .limit(200)
    : { data: [] as never[] };

  const profileIds = [...new Set((deliverableRows ?? []).map((d) => d.network_profile_id))];
  const { data: profiles } = profileIds.length
    ? await supabase.from("network_profiles").select("id, display_name").in("id", profileIds)
    : { data: [] as { id: string; display_name: string }[] };
  const profileNameById = new Map((profiles ?? []).map((p) => [p.id, p.display_name]));

  const deliverables = (deliverableRows ?? []).map((d) => ({
    id: d.id,
    campaignId: d.campaign_id,
    campaignName: campaignNameById.get(d.campaign_id) ?? "Campaign",
    channel: d.channel as ChannelId,
    contentUrl: d.content_url,
    notes: d.notes,
    status: d.status as DeliverableStatus,
    submittedAt: d.submitted_at,
    submittedBy: profileNameById.get(d.network_profile_id) ?? "Someone",
  }));

  const { data: publicCampaignRows } = await supabase
    .from("campaigns")
    .select("id, name, target_channels")
    .eq("is_public", true)
    .eq("status", "active")
    .neq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: myNetworkProfile } = await supabase.from("network_profiles").select("id").eq("user_id", userId).maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Deliverables"
        description="Genuine proof — links to what was actually posted, on the influencer's own account. Never bots, never fake engagement."
      />
      <DeliverablesManager
        deliverables={deliverables}
        publicCampaigns={(publicCampaignRows ?? []).map((c) => ({
          id: c.id,
          name: c.name,
          targetChannels: c.target_channels as ChannelId[],
        }))}
        hasNetworkProfile={Boolean(myNetworkProfile)}
      />
    </div>
  );
}
