"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  monthly: number;
  yearlyMonthly: number | null;
  yearlyBilled: number | null;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
}

export function PricingPlans({ plans }: { plans: PricingPlan[] }) {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("monthly");

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
          {(["monthly", "yearly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBilling(option)}
              aria-pressed={billing === option}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                billing === option
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option === "monthly" ? "Monthly" : "Yearly"}
              {option === "yearly" && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                    billing === "yearly" ? "bg-primary-foreground/20" : "bg-accent-soft text-accent",
                  )}
                >
                  Save 2 months
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const showYearly = billing === "yearly" && plan.yearlyMonthly !== null;
          const price = showYearly ? plan.yearlyMonthly : plan.monthly;

          return (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-lg border p-6",
                plan.highlighted ? "border-primary shadow-sm" : "border-border",
              )}
            >
              {plan.highlighted && (
                <span className="mb-3 inline-flex w-fit items-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                  Most popular
                </span>
              )}
              <h3 className="font-heading text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-heading text-3xl font-semibold text-foreground">
                  ${price}
                </span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {showYearly ? `Billed $${plan.yearlyBilled} yearly` : plan.monthly > 0 ? "Billed monthly" : "Forever"}
              </p>
              <Button className="mt-6" variant={plan.highlighted ? "primary" : "outline"} asChild>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
