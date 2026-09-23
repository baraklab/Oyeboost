import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { CampaignControls } from "./campaign-controls";
import { CampaignDetailsForm } from "./campaign-details-form";
import { BriefEditor } from "./brief-editor";
import { LinksManager } from "./links-manager";
import { ApplicationsList } from "./applications-list";
import { DeliverablesSection } from "./deliverables-section";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUserId } from "@/lib/auth/session";
import type { ChannelId } from "@/types/database";

export const metadata: Metadata = { title: "Campaign" };
export const dynamic = "force-dynamic";

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const userId = (await getCurrentUserId())!;

  const { data: campaign } = await supabase.from("campaigns").select("*").eq("id", id).eq("user_id", userId).single();
  if (!campaign) notFound();

  const [
    { data: briefs },
    { data: links },
    { data: applicationRows },
    { data: deliverableRows },
    { data: contentProfiles },
  ] = await Promise.all([
    supabase.from("campaign_briefs").select("id, channel, content, status").eq("campaign_id", id).order("channel"),
    supabase.from("campaign_links").select("id, destination_url, tracked_url, suggested_cta").eq("campaign_id", id),
    supabase
      .from("campaign_applications")
      .select("id, network_profile_id, channel, message, status")
      .eq("campaign_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("campaign_deliverables")
      .select("id, network_profile_id, channel, content_url, notes, status, submitted_at")
      .eq("campaign_id", id)
      .order("submitted_at", { ascending: false }),
    supabase.from("content_profiles").select("id, name").eq("user_id", userId).order("created_at"),
  ]);

  const profileIds = [
    ...new Set([...(applicationRows ?? []).map((a) => a.network_profile_id), ...(deliverableRows ?? []).map((d) => d.network_profile_id)]),
  ];
  const { data: profiles } = profileIds.length
    ? await supabase.from("network_profiles").select("id, display_name").in("id", profileIds)
    : { data: [] as { id: string; display_name: string }[] };
  const profileNameById = new Map((profiles ?? []).map((p) => [p.id, p.display_name]));

  const applications = (applicationRows ?? []).map((a) => ({
    id: a.id,
    displayName: profileNameById.get(a.network_profile_id) ?? "Someone",
    channel: a.channel as ChannelId,
    message: a.message,
    status: a.status,
  }));

  const deliverables = (deliverableRows ?? []).map((d) => ({
    id: d.id,
    campaignId: id,
    campaignName: campaign.name,
    channel: d.channel as ChannelId,
    contentUrl: d.content_url,
    notes: d.notes,
    status: d.status,
    submittedAt: d.submitted_at,
    submittedBy: profileNameById.get(d.network_profile_id) ?? "Someone",
  }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={campaign.name}
        description="Manage the brief, tracked links, applications, and deliverables for this campaign."
        action={<CampaignControls campaignId={campaign.id} status={campaign.status} isPublic={campaign.is_public} />}
      />

      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="font-heading text-[15px] font-semibold text-foreground">Campaign details</h2>
        <div className="mt-4">
          <CampaignDetailsForm
            campaignId={campaign.id}
            initial={{
              name: campaign.name,
              promotionType: campaign.promotion_type,
              productUrl: campaign.product_url ?? "",
              repoUrl: campaign.repo_url ?? "",
              goal: campaign.goal,
              brief: campaign.brief,
              budgetType: campaign.budget_type,
              targetChannels: campaign.target_channels as ChannelId[],
              contentProfileId: campaign.content_profile_id ?? "",
            }}
            contentProfiles={contentProfiles ?? []}
          />
        </div>
      </div>

      <div>
        <h2 className="font-heading mb-3 text-[15px] font-semibold text-foreground">Briefs per channel</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(briefs ?? []).map((brief) => (
            <BriefEditor
              key={brief.id}
              briefId={brief.id}
              channel={brief.channel}
              initialContent={brief.content}
              status={brief.status}
            />
          ))}
        </div>
      </div>

      <LinksManager
        campaignId={campaign.id}
        links={(links ?? []).map((link) => ({
          id: link.id,
          destinationUrl: link.destination_url,
          trackedUrl: link.tracked_url,
          suggestedCta: link.suggested_cta,
        }))}
      />

      <ApplicationsList campaignId={campaign.id} applications={applications} />

      <DeliverablesSection deliverables={deliverables} />
    </div>
  );
}
