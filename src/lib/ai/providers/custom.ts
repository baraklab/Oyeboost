import type { AIProvider, CompletionRequest } from "../types";

/** Any OpenAI-compatible endpoint (Groq, Together, a local model server, ...) the user points at with a base URL. */
export function createCustomProvider(baseUrl: string): AIProvider {
  const base = baseUrl.replace(/\/+$/, "");

  return {
    definition: {
      id: "custom",
      name: "Custom",
      docsUrl: baseUrl,
      defaultModel: "",
      models: [],
      apiKeyPlaceholder: "sk-...",
    },

    async testConnection(apiKey, model) {
      try {
        const response = await fetch(`${base}/chat/completions`, {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: "Reply with the single word: ok" }],
            max_tokens: 5,
          }),
        });
        if (!response.ok) {
          const body = await response.text();
          return { ok: false, error: `Provider responded ${response.status}: ${body.slice(0, 200)}` };
        }
        return { ok: true };
      } catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : "Unknown error" };
      }
    },

    async complete({ apiKey, model, system, prompt, maxTokens = 1200 }: CompletionRequest) {
      const response = await fetch(`${base}/chat/completions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: system },
            { role: "user", content: prompt },
          ],
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Provider error (${response.status}): ${body.slice(0, 300)}`);
      }

      const data = (await response.json()) as { choices: { message: { content: string } }[] };
      return { text: data.choices[0]?.message.content ?? "" };
    },
  };
}
