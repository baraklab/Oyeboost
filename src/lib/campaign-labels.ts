import type { PromotionType, CampaignGoal, BudgetType } from "@/types/database";

/** Shared display labels for campaign enums, used across create/campaigns/deliverables UI. */

export const promotionTypeLabels: Record<PromotionType, string> = {
  github_repo: "GitHub repo",
  saas_product: "SaaS product",
  mobile_app: "Mobile app",
  product_hunt_launch: "Product Hunt launch",
  blog_post: "Blog post",
  other: "Other",
};

export const campaignGoalLabels: Record<CampaignGoal, string> = {
  stars: "GitHub stars",
  signups: "Sign-ups",
  downloads: "Downloads",
  awareness: "Awareness",
  traffic: "Traffic",
};

export const budgetTypeLabels: Record<BudgetType, string> = {
  unpaid: "Unpaid",
  paid: "Paid",
  gifted: "Gifted",
};
