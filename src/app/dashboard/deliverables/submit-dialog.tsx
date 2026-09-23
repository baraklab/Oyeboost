"use client";

import * as React from "react";
import { useActionState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { PlatformIcon } from "@/components/platform/platform-icon";
import { idleActionState } from "@/lib/types/action-state";
import { submitDeliverable } from "./actions";
import type { ChannelId } from "@/types/database";

export interface PublicCampaignOption {
  id: string;
  name: string;
  targetChannels: ChannelId[];
}

export function SubmitDeliverableDialog({
  open,
  onClose,
  campaigns,
  hasNetworkProfile,
}: {
  open: boolean;
  onClose: () => void;
  campaigns: PublicCampaignOption[];
  hasNetworkProfile: boolean;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Submit proof"
      description="Link to what you genuinely posted on your own account — never a bot, never fake engagement."
    >
      {hasNetworkProfile ? (
        campaigns.length > 0 ? (
          <SubmitForm campaigns={campaigns} onClose={onClose} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No active public campaigns to submit against right now. Check back soon.
          </p>
        )
      ) : (
        <p className="text-sm text-muted-foreground">
          Set up your influencer profile first from{" "}
          <a href="/dashboard/channels" className="font-medium text-foreground underline">
            Influencer Profile
          </a>{" "}
          before submitting proof.
        </p>
      )}
    </Dialog>
  );
}

function SubmitForm({ campaigns, onClose }: { campaigns: PublicCampaignOption[]; onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(submitDeliverable, idleActionState);
  const [campaignId, setCampaignId] = React.useState(campaigns[0]?.id ?? "");
  const selected = campaigns.find((c) => c.id === campaignId);

  React.useEffect(() => {
    if (state.status === "success") onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="campaignId">Campaign</Label>
        <Select id="campaignId" name="campaignId" value={campaignId} onChange={(e) => setCampaignId(e.target.value)}>
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="channel">Channel you posted on</Label>
        <Select id="channel" name="channel" defaultValue={selected?.targetChannels[0]}>
          {(selected?.targetChannels ?? []).map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contentUrl">Link to your post</Label>
        <Input id="contentUrl" name="contentUrl" type="url" required placeholder="https://" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" name="notes" rows={3} maxLength={500} />
      </div>

      {state.status === "error" && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" loading={isPending} className="self-start">
        <PlatformIcon platform={(selected?.targetChannels[0] ?? "x") as ChannelId} className="size-4" />
        Submit
      </Button>
    </form>
  );
}
