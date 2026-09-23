import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pricingJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { PricingPlans, type PricingPlan } from "./pricing-plans";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Free to join with 25 contact views a month. Plus gets you 10 active campaigns and 250 contact views for $49/month. Business gets 100 active campaigns and 1,000 contact views for $249/month.",
  path: "/pricing",
});

const plans: PricingPlan[] = [
  {
    name: "Free",
    monthly: 0,
    yearlyMonthly: null,
    yearlyBilled: null,
    description: "Join the marketplace and see who's out there.",
    features: [
      "Product and influencer profiles",
      "Browse and apply in the network",
      "1 active campaign",
      "25 contact views / month",
      "Manual deliverable review",
    ],
    cta: "Get started for free",
    href: "/login?mode=signup",
    highlighted: false,
  },
  {
    name: "Plus",
    monthly: 49,
    yearlyMonthly: 41,
    yearlyBilled: 490,
    description: "For founders running campaigns every week.",
    features: [
      "Everything in Free",
      "10 active campaigns",
      "250 contact views / month",
      "AI campaign brief generation",
      "Priority network placement",
      "Tracked links on every deliverable",
    ],
    cta: "Get started for free",
    href: "/login?mode=signup",
    highlighted: true,
  },
  {
    name: "Business",
    monthly: 249,
    yearlyMonthly: 208,
    yearlyBilled: 2490,
    description: "For agencies and teams running multiple brands.",
    features: [
      "Everything in Plus",
      "100 active campaigns",
      "1,000 contact views / month",
      "Multiple products and brands",
      "Team support with shared workspace access",
      "Dedicated support",
    ],
    cta: "Get started for free",
    href: "/login?mode=signup",
    highlighted: false,
  },
];

const plansForJsonLd = plans.map((plan) => ({
  name: plan.name,
  price: `$${plan.monthly}`,
  description: plan.description,
}));

const faqs = [
  {
    question: "What's a contact view?",
    answer:
      "It's what's spent when you open an influencer's direct contact details to reach out yourself. Browsing profiles, matching by niche, and running campaigns through the network don't use any — contact views only apply when you go around the campaign flow to contact someone directly. Your allowance refreshes every month.",
  },
  {
    question: "What counts as an active campaign?",
    answer:
      "Any campaign with status set to active and visible to the network. Draft, paused, and completed campaigns don't count against your plan's limit — only the ones currently open for influencers to discover and join.",
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, upgrade or downgrade at any time from Settings → Billing. Changes apply immediately, including your new campaign and contact-view limits.",
  },
  {
    question: "Does a higher plan mean more fake engagement or faster stars?",
    answer:
      "No. Every plan runs on the same rule: real influencers, real audiences, reviewed deliverables. Paid plans unlock more active campaigns, more contact views, and better placement in the network — never shortcuts around genuine engagement.",
  },
  {
    question: "Is there a limit on how many influencers can join a campaign?",
    answer:
      "No artificial cap on influencers per campaign. Plan limits are on how many active campaigns you can run at once, not on how much genuine reach a single campaign can attract.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          pricingJsonLd(plansForJsonLd),
          faqJsonLd(faqs),
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pb-6 pt-10 text-center sm:pb-8 sm:pt-12">
          <h1 className="font-heading mx-auto max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Simple plans that scale with your campaigns.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted-foreground">
            Every plan includes a monthly allowance of active campaigns and contact views — no
            per-post fees, no surprise charges.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:pb-20 sm:pt-8">
          <PricingPlans plans={plans} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Two things every plan is built around
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="font-heading text-[15px] font-semibold text-foreground">Active campaigns</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                How many campaigns you can have live and visible to the network at once. Draft,
                paused, and completed campaigns never count against the limit.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="font-heading text-[15px] font-semibold text-foreground">Contact views</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A monthly allowance for opening an influencer&apos;s direct contact details.
                Browsing the network and running campaigns through the normal flow never spends
                one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Pricing questions
          </h2>
          <div className="mt-8 divide-y divide-border">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <h3 className="font-heading text-[15px] font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <Button size="lg" asChild>
            <Link href="/login?mode=signup">
              Get started for free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
