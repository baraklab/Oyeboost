"use client";

import * as React from "react";
import { Pencil, Trash2, Power, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { PlatformIcon } from "@/components/platform/platform-icon";
import { deleteCampaign, updateCampaignStatus } from "./actions";
import { campaignGoalLabels, budgetTypeLabels } from "@/lib/campaign-labels";
import type { CampaignStatus, CampaignGoal, BudgetType, ChannelId } from "@/types/database";

const statusVariant: Record<CampaignStatus, "success" | "outline" | "warning" | "default"> = {
  draft: "outline",
  active: "success",
  paused: "warning",
  completed: "default",
};

export function CampaignRow({
  id,
  name,
  status,
  goal,
  budgetType,
  isPublic,
  targetChannels,
}: {
  id: string;
  name: string;
  status: CampaignStatus;
  goal: CampaignGoal;
  budgetType: BudgetType;
  isPublic: boolean;
  targetChannels: ChannelId[];
}) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="flex flex-col gap-3 border-b border-border py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">{name}</p>
          <Badge variant={statusVariant[status]}>{status}</Badge>
          {isPublic && (
            <Badge variant="accent">
              <Globe className="size-3" />
              Public
            </Badge>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            {targetChannels.map((channel) => (
              <PlatformIcon key={channel} platform={channel} className="size-3.5" colored />
            ))}
          </div>
          <span aria-hidden="true">·</span>
          <span>{campaignGoalLabels[goal]}</span>
          <span aria-hidden="true">·</span>
          <span>{budgetTypeLabels[budgetType]}</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          icon={Power}
          label={status === "active" ? "Pause" : "Activate"}
          disabled={isPending}
          onClick={() =>
            startTransition(() => updateCampaignStatus(id, status === "active" ? "paused" : "active"))
          }
        />
        <IconButton icon={Pencil} label="Edit" href={`/dashboard/campaigns/${id}`} />
        <IconButton
          icon={Trash2}
          label="Delete"
          disabled={isPending}
          onClick={() => startTransition(() => deleteCampaign(id))}
        />
      </div>
    </div>
  );
}
