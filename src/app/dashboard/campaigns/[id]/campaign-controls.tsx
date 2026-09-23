"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { IconButton } from "@/components/ui/icon-button";
import { useToast } from "@/components/ui/toast";
import { updateCampaignStatus, setCampaignPublic, publishCampaignToNetwork, deleteCampaign } from "../actions";
import type { CampaignStatus } from "@/types/database";

export function CampaignControls({
  campaignId,
  status: initialStatus,
  isPublic: initialIsPublic,
}: {
  campaignId: string;
  status: CampaignStatus;
  isPublic: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = React.useState(initialStatus);
  const [isPublic, setIsPublic] = React.useState(initialIsPublic);
  const [isPending, startTransition] = React.useTransition();
  const [isDeleting, setIsDeleting] = React.useState(false);

  function handleStatusChange(next: CampaignStatus) {
    setStatus(next);
    startTransition(() => updateCampaignStatus(campaignId, next));
  }

  function handlePublicChange(next: boolean) {
    setIsPublic(next);
    startTransition(() => setCampaignPublic(campaignId, next));
  }

  function handlePublish() {
    startTransition(async () => {
      const result = await publishCampaignToNetwork(campaignId);
      if (result.status === "success") {
        setStatus("active");
        setIsPublic(true);
        toast({ title: "Campaign published", description: "It's now visible to influencers in the network.", variant: "success" });
      } else {
        toast({ title: "Couldn't publish", description: result.error, variant: "destructive" });
      }
    });
  }

  async function handleDelete() {
    setIsDeleting(true);
    await deleteCampaign(campaignId);
    router.push("/dashboard/campaigns");
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        aria-label="Status"
        className="h-8 w-32"
        value={status}
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value as CampaignStatus)}
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="completed">Completed</option>
      </Select>

      <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Switch checked={isPublic} onCheckedChange={handlePublicChange} disabled={isPending} label="Public in network" />
        Public
      </label>

      {!(status === "active" && isPublic) && (
        <Button size="sm" variant="accent" loading={isPending} onClick={handlePublish}>
          <Globe className="size-3.5" />
          Publish to network
        </Button>
      )}

      <IconButton icon={Trash2} label="Delete campaign" disabled={isDeleting} onClick={handleDelete} />
    </div>
  );
}
