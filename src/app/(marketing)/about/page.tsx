import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

const title = "About";
const description =
  "Amplibee was built because growth shouldn't mean buying fake followers or bots. Here's why we bet on real influencers instead, and how we think about the product.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ title, description, path: "/about", type: "AboutPage" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <p className="text-eyebrow">About</p>
          <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            We got tired of watching good products lose to bought engagement.
          </h1>

          <div className="mt-8 flex flex-col gap-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Every product owner faces the same temptation eventually: a service offering a
              thousand GitHub stars overnight, a few hundred fake followers, an upvote bot for
              launch day. It works for about a week, until the stars get purged, the followers get
              detected, and the trust you actually needed is gone along with them.
            </p>
            <p>
              Amplibee exists because there&apos;s a better trade that most founders never get
              introduced to: real influencers and creators, with real audiences, who genuinely
              believe a product is worth telling people about. That kind of reach is slower to
              earn and impossible to fake — which is exactly why it still means something when a
              real person&apos;s audience responds to it.
            </p>
            <p>
              We built the product around three constraints we think matter: every profile in the
              network is a real, opted-in person, not an engagement farm; every deliverable an
              influencer submits gets reviewed before it counts toward your campaign; and AI helps
              draft talking points, but it never writes the final post — that&apos;s the influencer&apos;s
              own voice, always.
            </p>
            <p>
              Amplibee is built by a small team who ships in public. If you have feedback,{" "}
              <a href="/contact" className="font-medium text-foreground underline underline-offset-4">
                tell us
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
