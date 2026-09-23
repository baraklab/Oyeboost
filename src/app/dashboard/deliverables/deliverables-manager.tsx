"use client";

import * as React from "react";
import { Plus, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { DeliverableRow } from "./deliverable-row";
import { SubmitDeliverableDialog, type PublicCampaignOption } from "./submit-dialog";
import type { ChannelId, DeliverableStatus } from "@/types/database";

export interface DeliverableRowData {
  id: string;
  campaignId: string;
  campaignName: string;
  channel: ChannelId;
  contentUrl: string;
  notes: string | null;
  status: DeliverableStatus;
  submittedAt: string;
  submittedBy: string;
}

const tabs: { value: "all" | DeliverableStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "submitted", label: "Needs review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export function DeliverablesManager({
  deliverables,
  publicCampaigns,
  hasNetworkProfile,
}: {
  deliverables: DeliverableRowData[];
  publicCampaigns: PublicCampaignOption[];
  hasNetworkProfile: boolean;
}) {
  const [submitOpen, setSubmitOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Button size="sm" onClick={() => setSubmitOpen(true)}>
          <Plus className="size-3.5" />
          Submit proof
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => {
          const filtered = tab.value === "all" ? deliverables : deliverables.filter((d) => d.status === tab.value);
          return (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              {filtered.length > 0 ? (
                <div className="rounded-lg border border-border bg-card px-5">
                  <div className="flex flex-col">
                    {filtered.map((d) => (
                      <DeliverableRow key={d.id} {...d} />
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon={ClipboardCheck}
                  title="Nothing here yet"
                  description="Deliverables submitted against your campaigns will show up here for review."
                />
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <SubmitDeliverableDialog
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        campaigns={publicCampaigns}
        hasNetworkProfile={hasNetworkProfile}
      />
    </div>
  );
}
