"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUserId } from "@/lib/auth/session";
import type { ActionState } from "@/lib/types/action-state";
import type { ChannelId, DeliverableStatus } from "@/types/database";

const channels: ChannelId[] = ["x", "linkedin", "youtube", "instagram"];

/** Approve/reject a deliverable submitted against one of the signed-in user's own campaigns. */
export async function updateDeliverableStatus(deliverableId: string, campaignId: string, status: DeliverableStatus) {
  const userId = await getCurrentUserId();
  if (!userId) return;
  const supabase = createAdminClient();

  const { data: campaign } = await supabase.from("campaigns").select("id").eq("id", campaignId).eq("user_id", userId).single();
  if (!campaign) return;

  await supabase
    .from("campaign_deliverables")
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq("id", deliverableId)
    .eq("campaign_id", campaignId);

  revalidatePath("/dashboard/deliverables");
  revalidatePath(`/dashboard/campaigns/${campaignId}`);
}

/** The influencer side: submit proof of a genuine post against someone else's active public campaign. */
export async function submitDeliverable(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const campaignId = String(formData.get("campaignId") ?? "").trim();
  const channel = String(formData.get("channel") ?? "") as ChannelId;
  const contentUrl = String(formData.get("contentUrl") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!campaignId) return { status: "error", error: "Choose a campaign." };
  if (!channels.includes(channel)) return { status: "error", error: "Choose a channel." };

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(contentUrl);
  } catch {
    return { status: "error", error: "Enter a valid link to what you posted." };
  }

  const userId = await getCurrentUserId();
  if (!userId) return { status: "error", error: "Not authenticated." };
  const supabase = createAdminClient();

  const { data: campaign } = await supabase
    .from("campaigns")
    .select("id, target_channels, user_id")
    .eq("id", campaignId)
    .eq("is_public", true)
    .eq("status", "active")
    .single();
  if (!campaign) return { status: "error", error: "This campaign isn't accepting submissions right now." };
  if (campaign.user_id === userId) return { status: "error", error: "You can't submit a deliverable against your own campaign." };
  if (!campaign.target_channels.includes(channel)) {
    return { status: "error", error: "This campaign isn't looking for that channel." };
  }

  const { data: profile } = await supabase.from("network_profiles").select("id").eq("user_id", userId).maybeSingle();
  if (!profile) {
    return { status: "error", error: "Set up your influencer profile first, from Influencer Profile." };
  }

  const { error } = await supabase.from("campaign_deliverables").insert({
    campaign_id: campaignId,
    network_profile_id: profile.id,
    channel,
    content_url: parsedUrl.toString(),
    notes: notes || null,
    status: "submitted",
  });

  if (error) return { status: "error", error: "Could not submit this deliverable." };

  revalidatePath("/dashboard/deliverables");
  return { status: "success" };
}
