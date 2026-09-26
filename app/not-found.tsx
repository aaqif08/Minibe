import type { Metadata } from "next";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** On-brand 404 — also catches old links to routes that no longer exist. */
export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70svh] flex-col justify-center pb-section-sm pt-36" aria-labelledby="nf-title">
      <Eyebrow rule className="text-orange-deep">
        404
      </Eyebrow>
      <h1 id="nf-title" className="t-section mt-6 max-w-3xl text-indigo">
        This page isn&apos;t on the table.
      </h1>
      <p className="t-lead mt-6 max-w-lg text-ink-soft">
        It may have moved, or never existed. Everything MINIBÉ is lives on the pages below.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button href="/" variant="primary" size="lg">
          Back to the start
        </Button>
        {site.nav.map((item) => (
          <Button key={item.href} href={item.href} variant="text">
            {item.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
