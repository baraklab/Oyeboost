import type { Metadata } from "next";
import { PlatformIcon } from "@/components/platform/platform-icon";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import type { ReactNode } from "react";

export const metadata: Metadata = pageMetadata({
  title: "Channels",
  description:
    "Where genuine influencer content actually works — X, LinkedIn, YouTube, and Instagram — and what a real deliverable looks like on each.",
  path: "/channels",
});

const channels: { icon: ReactNode; name: string; description: string; goodFor: string }[] = [
  {
    icon: <PlatformIcon platform="x" className="size-8" />,
    name: "X",
    description:
      "A thread or a single post from a real developer or founder-adjacent account, in their own voice, reacting to something worth reacting to.",
    goodFor: "GitHub stars, dev-tool launches, build-in-public momentum",
  },
  {
    icon: <PlatformIcon platform="linkedin" className="size-8" />,
    name: "LinkedIn",
    description:
      "A longer post with context — why this product mattered to them, what problem it solved — from someone whose professional network trusts their opinion.",
    goodFor: "B2B SaaS, founder-led awareness, professional audiences",
  },
  {
    icon: <PlatformIcon platform="youtube" className="size-8" />,
    name: "YouTube",
    description:
      "A genuine mention, demo, or dedicated review inside a creator's regular content — not a disclosed-and-forgotten pre-roll ad.",
    goodFor: "App downloads, in-depth product reviews, tutorials",
  },
  {
    icon: <PlatformIcon platform="instagram" className="size-8" />,
    name: "Instagram",
    description:
      "A story, reel, or post that fits a creator's existing visual style and actually shows the product being used, not a stock ad slide.",
    goodFor: "Consumer apps, visual products, lifestyle-adjacent launches",
  },
];

export default function ChannelsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
        ])}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 pb-8 pt-10 text-center sm:pb-10 sm:pt-12">
          <h1 className="font-heading mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Genuine influencer content, shaped for where it&apos;s posted.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            A real influencer post looks different on every channel. Amplibee&apos;s AI drafts
            talking points that fit the channel — the influencer still makes it their own.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-8 sm:pb-20 sm:pt-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                  {channel.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading text-[15px] font-semibold text-foreground">
                      {channel.name}
                    </h2>
                    <Badge variant="success">Active in the network</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{channel.description}</p>
                  <p className="mt-2 text-xs font-medium text-muted-foreground">
                    Good for: {channel.goodFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
