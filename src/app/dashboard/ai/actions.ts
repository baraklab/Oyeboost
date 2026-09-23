"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUserId } from "@/lib/auth/session";
import { encryptSecret, decryptSecret } from "@/lib/crypto";
import { aiProviderSchema } from "@/lib/validation/settings";
import { getAIProviderRuntime } from "@/lib/ai/registry";
import type { ActionState } from "@/lib/types/action-state";

export interface TestConnectionState {
  status: "idle" | "success" | "error";
  error?: string;
}

function parseProviderForm(formData: FormData) {
  return aiProviderSchema.safeParse({
    provider: formData.get("provider"),
    label: formData.get("label") ?? "",
    baseUrl: formData.get("baseUrl") ?? "",
    apiKey: formData.get("apiKey"),
    defaultModel: formData.get("defaultModel"),
    isDefault: formData.get("isDefault") === "on",
  });
}

export async function testAIProviderConnection(
  _prev: TestConnectionState,
  formData: FormData,
): Promise<TestConnectionState> {
  const parsed = parseProviderForm(formData);
  if (!parsed.success) {
    return { status: "error", error: parsed.error.issues[0]?.message };
  }

  const provider = getAIProviderRuntime(parsed.data.provider, parsed.data.baseUrl || null);
  const result = await provider.testConnection(parsed.data.apiKey, parsed.data.defaultModel);
  return result.ok ? { status: "success" } : { status: "error", error: result.error };
}

export async function saveAIProvider(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = parseProviderForm(formData);
  if (!parsed.success) {
    return { status: "error", error: parsed.error.issues[0]?.message };
  }

  const id = formData.get("id");
  const userId = await getCurrentUserId();
  if (!userId) return { status: "error", error: "Not authenticated." };
  const supabase = createAdminClient();

  const runtime = getAIProviderRuntime(parsed.data.provider, parsed.data.baseUrl || null);
  const test = await runtime.testConnection(parsed.data.apiKey, parsed.data.defaultModel);

  if (parsed.data.isDefault) {
    await supabase.from("ai_providers").update({ is_default: false }).eq("user_id", userId);
  }

  const fields = {
    label: parsed.data.label || null,
    base_url: parsed.data.provider === "custom" ? parsed.data.baseUrl || null : null,
    encrypted_api_key: encryptSecret(parsed.data.apiKey),
    default_model: parsed.data.defaultModel,
    is_default: parsed.data.isDefault ?? false,
    last_tested_at: new Date().toISOString(),
    last_test_status: (test.ok ? "success" : "failed") as "success" | "failed",
  };

  const { error } =
    typeof id === "string" && id
      ? await supabase.from("ai_providers").update(fields).eq("id", id).eq("user_id", userId)
      : await supabase.from("ai_providers").insert({ user_id: userId, provider: parsed.data.provider, ...fields });

  if (error) return { status: "error", error: "Could not save this provider." };
  if (!test.ok) {
    return { status: "error", error: `Saved, but the connection test failed: ${test.error}` };
  }

  revalidatePath("/dashboard/ai");
  return { status: "success" };
}

export async function deleteAIProvider(id: string) {
  const userId = await getCurrentUserId();
  if (!userId) return;
  const supabase = createAdminClient();

  await supabase.from("ai_providers").delete().eq("id", id).eq("user_id", userId);
  revalidatePath("/dashboard/ai");
}

export async function setDefaultAIProvider(id: string) {
  const userId = await getCurrentUserId();
  if (!userId) return;
  const supabase = createAdminClient();

  await supabase.from("ai_providers").update({ is_default: false }).eq("user_id", userId);
  await supabase.from("ai_providers").update({ is_default: true }).eq("id", id).eq("user_id", userId);
  revalidatePath("/dashboard/ai");
}

export async function testStoredAIProviderConnection(id: string): Promise<TestConnectionState> {
  const userId = await getCurrentUserId();
  if (!userId) return { status: "error", error: "Not authenticated." };
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("ai_providers")
    .select("provider, encrypted_api_key, default_model, base_url")
    .eq("id", id)
    .eq("user_id", userId)
    .single();
  if (!data) return { status: "error", error: "Provider not found." };

  const providerImpl = getAIProviderRuntime(data.provider, data.base_url);
  const apiKey = decryptSecret(data.encrypted_api_key);
  const result = await providerImpl.testConnection(apiKey, data.default_model);

  await supabase
    .from("ai_providers")
    .update({ last_tested_at: new Date().toISOString(), last_test_status: result.ok ? "success" : "failed" })
    .eq("id", id);

  revalidatePath("/dashboard/ai");
  return result.ok ? { status: "success" } : { status: "error", error: result.error };
}
