import type { AIProvider, AIProviderId } from "./types";
import { openaiProvider } from "./providers/openai";
import { anthropicProvider } from "./providers/anthropic";
import { openrouterProvider } from "./providers/openrouter";
import { createCustomProvider } from "./providers/custom";

export type FixedAIProviderId = Exclude<AIProviderId, "custom">;

export const aiProviderRegistry: Record<FixedAIProviderId, AIProvider> = {
  openai: openaiProvider,
  anthropic: anthropicProvider,
  openrouter: openrouterProvider,
};

export const aiProviderList = Object.values(aiProviderRegistry);

export function getAIProvider(id: FixedAIProviderId): AIProvider {
  const provider = aiProviderRegistry[id];
  if (!provider) throw new Error(`Unknown AI provider: ${id}`);
  return provider;
}

/** Resolves a provider at call time, including a per-row custom (OpenAI-compatible) base URL. */
export function getAIProviderRuntime(id: AIProviderId, baseUrl?: string | null): AIProvider {
  if (id === "custom") {
    if (!baseUrl) throw new Error("Custom provider requires a base URL.");
    return createCustomProvider(baseUrl);
  }
  return getAIProvider(id);
}
