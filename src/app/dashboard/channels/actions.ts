"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUserId } from "@/lib/auth/session";
import { networkProfileSchema } from "@/lib/validation/network";
import type { ActionState } from "@/lib/types/action-state";

export async function saveChannelProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const niches = String(formData.get("niches") ?? "")
    .split(",")
    .map((niche) => niche.trim())
    .filter(Boolean);

  const parsed = networkProfileSchema.safeParse({
    displayName: formData.get("displayName"),
    category: formData.get("category"),
    platforms: formData.getAll("platforms"),
    niches,
    audienceSize: formData.get("audienceSize") || undefined,
    bio: formData.get("bio") ?? "",
    rateInfo: formData.get("rateInfo") ?? "",
    portfolioUrl: formData.get("portfolioUrl") ?? "",
    contactUrl: formData.get("contactUrl") ?? "",
    isVisible: formData.get("isVisible") === "on",
  });

  if (!parsed.success) {
    return { status: "error", error: parsed.error.issues[0]?.message };
  }

  const userId = await getCurrentUserId();
  if (!userId) return { status: "error", error: "Not authenticated." };
  const supabase = createAdminClient();

  const { error } = await supabase.from("network_profiles").upsert(
    {
      user_id: userId,
      display_name: parsed.data.displayName,
      category: parsed.data.category,
      platforms: parsed.data.platforms,
      niches: parsed.data.niches,
      rate_info: parsed.data.rateInfo || null,
      portfolio_url: parsed.data.portfolioUrl || null,
      audience_size: parsed.data.audienceSize ?? null,
      bio: parsed.data.bio || null,
      contact_url: parsed.data.contactUrl || null,
      is_visible: parsed.data.isVisible ?? false,
    },
    { onConflict: "user_id" },
  );

  if (error) return { status: "error", error: "Could not save your influencer profile." };

  revalidatePath("/dashboard/channels");
  return { status: "success" };
}
