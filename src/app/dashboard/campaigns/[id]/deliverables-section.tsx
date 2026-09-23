"use client";

import { ClipboardCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { DeliverableRow } from "../../deliverables/deliverable-row";
import type { DeliverableRowData } from "../../deliverables/deliverables-manager";

export function DeliverablesSection({ deliverables }: { deliverables: DeliverableRowData[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-heading text-[15px] font-semibold text-foreground">Deliverables</h2>
      <p className="mt-1 text-xs text-muted-foreground">Genuine proof influencers submitted for this campaign.</p>

      {deliverables.length > 0 ? (
        <div className="mt-4 flex flex-col">
          {deliverables.map((d) => (
            <DeliverableRow key={d.id} {...d} />
          ))}
        </div>
      ) : (
        <EmptyState icon={ClipboardCheck} title="No deliverables yet" className="mt-4 border-0 py-8" />
      )}
    </div>
  );
}
