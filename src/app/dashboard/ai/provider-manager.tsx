"use client";

import * as React from "react";
import { Star, Trash2, KeyRound, Loader2, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ProviderDialog } from "./provider-dialog";
import { deleteAIProvider, setDefaultAIProvider, testStoredAIProviderConnection, type TestConnectionState } from "./actions";
import type { AIProviderDefinition, AIProviderId } from "@/lib/ai/types";

export interface ConfiguredProviderRow {
  id: string;
  provider: AIProviderId;
  definition: AIProviderDefinition | null; // null for a custom provider
  label: string | null;
  baseUrl: string | null;
  defaultModel: string;
  isDefault: boolean;
  lastTestStatus: "success" | "failed" | null;
  maskedKey: string;
}

const testInitial: TestConnectionState = { status: "idle" };

function ProviderRow({ row, availableFixed }: { row: ConfiguredProviderRow; availableFixed: AIProviderDefinition[] }) {
  const [editing, setEditing] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [testState, setTestState] = React.useState<TestConnectionState>(testInitial);
  const [isTesting, startTest] = React.useTransition();
  const name = row.label || row.definition?.name || "Custom provider";

  return (
    <>
      <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <KeyRound className="size-4 shrink-0 text-muted-foreground" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-foreground">{name}</span>
              <Badge variant="outline">BYOK</Badge>
              {!row.definition && <Badge variant="outline">Custom</Badge>}
              {row.isDefault && <Badge variant="accent">Default</Badge>}
              {row.lastTestStatus === "success" && <Badge variant="success">Verified</Badge>}
              {row.lastTestStatus === "failed" && <Badge variant="destructive">Failing</Badge>}
            </div>
            <p className="mt-0.5 font-mono-tech text-xs text-muted-foreground">
              {row.maskedKey} · {row.defaultModel}
            </p>
            {testState.status === "error" && <p className="mt-1 text-xs text-destructive">{testState.error}</p>}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={isTesting}
            onClick={() =>
              startTest(async () => {
                setTestState(await testStoredAIProviderConnection(row.id));
              })
            }
          >
            {isTesting ? <Loader2 className="size-3.5 animate-spin" /> : null}
            Test
          </Button>
          {!row.isDefault && (
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={() => startTransition(() => setDefaultAIProvider(row.id))}
            >
              <Star className="size-3.5" />
              Make default
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:bg-destructive-soft"
            disabled={isPending}
            onClick={() => startTransition(() => deleteAIProvider(row.id))}
          >
            <Trash2 className="size-3.5" />
            Remove
          </Button>
        </div>
      </div>

      <ProviderDialog
        open={editing}
        onClose={() => setEditing(false)}
        availableFixed={availableFixed}
        editing={{
          id: row.id,
          provider: row.provider,
          definition: row.definition,
          label: row.label,
          baseUrl: row.baseUrl,
          defaultModel: row.defaultModel,
          isDefault: row.isDefault,
        }}
      />
    </>
  );
}

export function ProviderManager({
  configured,
  availableFixed,
}: {
  configured: ConfiguredProviderRow[];
  /** Fixed provider definitions not yet configured — always addable alongside "Custom". */
  availableFixed: AIProviderDefinition[];
}) {
  const [adding, setAdding] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Button size="sm" onClick={() => setAdding(true)}>
          <Plus className="size-3.5" />
          Add provider
        </Button>
      </div>

      {configured.length > 0 ? (
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {configured.map((row) => (
            <ProviderRow key={row.id} row={row} availableFixed={availableFixed} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={KeyRound}
          title="No providers connected"
          description="Add an OpenAI, Anthropic, OpenRouter, or any OpenAI-compatible key to start generating content."
          action={
            <Button size="sm" onClick={() => setAdding(true)}>
              <Plus className="size-3.5" />
              Add provider
            </Button>
          }
        />
      )}

      <ProviderDialog open={adding} onClose={() => setAdding(false)} availableFixed={availableFixed} editing={null} />
    </div>
  );
}
