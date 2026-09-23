import { z } from "zod";

export const aiProviderSchema = z
  .object({
    provider: z.enum(["openai", "anthropic", "openrouter", "custom"]),
    label: z.string().trim().min(1, "Name is required").max(60),
    baseUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
    apiKey: z.string().trim().min(10, "Enter a valid API key"),
    defaultModel: z.string().trim().min(1, "Model is required"),
    isDefault: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.provider === "custom" && !data.baseUrl) {
      ctx.addIssue({ code: "custom", message: "Base URL is required for a custom provider.", path: ["baseUrl"] });
    }
  });
