import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms governing your use of Amplibee.",
  path: "/terms",
});

const sections = [
  {
    title: "Using Amplibee",
    body: "You're responsible for the accuracy of any campaign brief, product profile, or network profile you submit. Influencers are responsible for what they actually post, and for disclosing sponsored or promotional content as required by each platform they post on and by applicable law.",
  },
  {
    title: "AI-generated content",
    body: "A campaign brief generated using an AI provider you configure is a suggested starting point, not a guarantee of accuracy. It is meant to be adapted by the influencer into their own words before posting — never published verbatim as a script. Amplibee doesn't verify claims, facts, or figures produced by the AI provider.",
  },
  {
    title: "Bring Your Own Key",
    body: "When you use your own AI provider API key, usage and billing for that provider is between you and them, subject to their terms. We are not responsible for AI provider outages, rate limits, or costs.",
  },
  {
    title: "Genuine engagement only",
    body: "Amplibee is built on real influencers reaching their own real audiences. Buying followers, using bots, faking engagement, or otherwise manipulating a campaign's results is prohibited and grounds for removal from the network and account termination.",
  },
  {
    title: "Deliverables and review",
    body: "Deliverables submitted as proof of a post are reviewed before they count toward a campaign. Amplibee doesn't control what platforms show, remove, or how they rank content — a deliverable that later becomes unavailable on the platform it was posted to is outside our control.",
  },
  {
    title: "Account termination",
    body: "You may delete your account at any time. We may suspend accounts that violate these terms, including fraudulent campaigns, fake network profiles, or attempts to manipulate engagement.",
  },
  {
    title: "Changes",
    body: "We may update these terms as the product evolves. Material changes will be posted on this page.",
  },
];

export default function TermsPage() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-eyebrow">Legal</p>
        <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated September 2026</p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-lg font-semibold text-foreground">{section.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
