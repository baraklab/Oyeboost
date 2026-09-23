"use client";

import * as React from "react";
import { useActionState } from "react";
import { Plus, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconButton } from "@/components/ui/icon-button";
import { idleActionState } from "@/lib/types/action-state";
import { addCampaignLink, deleteCampaignLink } from "../actions";

export interface CampaignLinkData {
  id: string;
  destinationUrl: string;
  trackedUrl: string;
  suggestedCta: string | null;
}

export function LinksManager({ campaignId, links }: { campaignId: string; links: CampaignLinkData[] }) {
  const action = addCampaignLink.bind(null, campaignId);
  const [state, formAction, isPending] = useActionState(action, idleActionState);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [isDeleting, startTransition] = React.useTransition();
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  async function copy(id: string, url: string) {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-heading text-[15px] font-semibold text-foreground">Tracked links</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Hand these to influencers so clicks are attributable — never touching the anchor text they write themselves.
      </p>

      {links.length > 0 && (
        <div className="mt-4 flex flex-col divide-y divide-border">
          {links.map((link) => (
            <div key={link.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">{link.trackedUrl}</p>
                {link.suggestedCta && <p className="mt-0.5 text-xs text-muted-foreground">CTA: {link.suggestedCta}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <IconButton
                  icon={copiedId === link.id ? Check : Copy}
                  label="Copy tracked link"
                  onClick={() => copy(link.id, link.trackedUrl)}
                />
                <IconButton
                  icon={Trash2}
                  label="Delete link"
                  disabled={isDeleting}
                  onClick={() => startTransition(() => deleteCampaignLink(link.id, campaignId))}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <form ref={formRef} action={formAction} className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="destinationUrl">Destination URL</Label>
          <Input id="destinationUrl" name="destinationUrl" type="url" required placeholder="https://yourproduct.com" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="suggestedCta">Suggested CTA text</Label>
          <Input id="suggestedCta" name="suggestedCta" placeholder="Check it out" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Input name="utmSource" placeholder="utm_source" />
          <Input name="utmMedium" placeholder="utm_medium" />
          <Input name="utmCampaign" placeholder="utm_campaign" />
        </div>
        {state.status === "error" && <p className="text-sm text-destructive">{state.error}</p>}
        <Button type="submit" size="sm" variant="outline" loading={isPending} className="self-start">
          <Plus className="size-3.5" />
          Add link
        </Button>
      </form>
    </div>
  );
}
