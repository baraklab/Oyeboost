"use client";

import * as React from "react";
import { Check, X, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { EmptyState } from "@/components/ui/empty-state";
import { PlatformIcon } from "@/components/platform/platform-icon";
import { updateApplicationStatus } from "../actions";
import type { ChannelId, ApplicationStatus } from "@/types/database";

export interface ApplicationData {
  id: string;
  displayName: string;
  channel: ChannelId;
  message: string | null;
  status: ApplicationStatus;
}

const statusVariant: Record<ApplicationStatus, "warning" | "success" | "destructive"> = {
  pending: "warning",
  accepted: "success",
  declined: "destructive",
};

export function ApplicationsList({ campaignId, applications }: { campaignId: string; applications: ApplicationData[] }) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-heading text-[15px] font-semibold text-foreground">Applications</h2>
      <p className="mt-1 text-xs text-muted-foreground">Influencers who opted in before posting anything.</p>

      {applications.length > 0 ? (
        <div className="mt-4 flex flex-col divide-y divide-border">
          {applications.map((application) => (
            <div key={application.id} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={application.channel} className="size-3.5" colored />
                  <p className="text-sm font-medium text-foreground">{application.displayName}</p>
                  <Badge variant={statusVariant[application.status]}>{application.status}</Badge>
                </div>
                {application.message && <p className="mt-1 text-xs text-muted-foreground">{application.message}</p>}
              </div>
              {application.status === "pending" && (
                <div className="flex shrink-0 items-center gap-1">
                  <IconButton
                    icon={Check}
                    label="Accept"
                    disabled={isPending}
                    onClick={() => startTransition(() => updateApplicationStatus(application.id, campaignId, "accepted"))}
                  />
                  <IconButton
                    icon={X}
                    label="Decline"
                    disabled={isPending}
                    onClick={() => startTransition(() => updateApplicationStatus(application.id, campaignId, "declined"))}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={Users} title="No applications yet" className="mt-4 border-0 py-8" />
      )}
    </div>
  );
}
