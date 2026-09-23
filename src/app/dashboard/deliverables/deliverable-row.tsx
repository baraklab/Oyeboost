"use client";

import * as React from "react";
import { Check, X, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { PlatformIcon } from "@/components/platform/platform-icon";
import { formatDateTime, truncate } from "@/lib/utils";
import { updateDeliverableStatus } from "./actions";
import type { ChannelId, DeliverableStatus } from "@/types/database";

const statusVariant: Record<DeliverableStatus, "warning" | "success" | "destructive"> = {
  submitted: "warning",
  approved: "success",
  rejected: "destructive",
};

export function DeliverableRow({
  id,
  campaignId,
  campaignName,
  channel,
  contentUrl,
  notes,
  status,
  submittedAt,
  submittedBy,
}: {
  id: string;
  campaignId: string;
  campaignName: string;
  channel: ChannelId;
  contentUrl: string;
  notes: string | null;
  status: DeliverableStatus;
  submittedAt: string;
  submittedBy: string;
}) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="flex flex-col gap-3 border-b border-border py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <PlatformIcon platform={channel} className="size-4 shrink-0" colored />
          <p className="truncate text-sm font-medium text-foreground">{campaignName}</p>
          <Badge variant={statusVariant[status]}>{status}</Badge>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{submittedBy}</span>
          <span aria-hidden="true">·</span>
          <a
            href={contentUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-foreground hover:underline"
          >
            View post <ExternalLink className="size-3" />
          </a>
          <span aria-hidden="true">·</span>
          <span>{formatDateTime(submittedAt)}</span>
        </div>
        {notes && <p className="mt-1 text-xs text-muted-foreground">{truncate(notes, 140)}</p>}
      </div>

      {status === "submitted" && (
        <div className="flex items-center gap-1">
          <IconButton
            icon={Check}
            label="Approve"
            disabled={isPending}
            onClick={() => startTransition(() => updateDeliverableStatus(id, campaignId, "approved"))}
          />
          <IconButton
            icon={X}
            label="Reject"
            disabled={isPending}
            onClick={() => startTransition(() => updateDeliverableStatus(id, campaignId, "rejected"))}
          />
        </div>
      )}
    </div>
  );
}
