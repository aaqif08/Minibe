import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextPage } from "@/components/ui/NextPage";
import { TastingMenu } from "@/components/sections/TastingMenu";
import { ALaCarte } from "@/components/sections/ALaCarte";
import { MenuArchive } from "@/components/sections/MenuArchive";

export const metadata: Metadata = {
  title: "Menus",
  description:
    "MINIBÉ's menus: a seasonal tasting menu that begins a new chapter every few months, an à la carte of plated desserts, savoury plates and sips, and the archive of past chapters.",
  alternates: { canonical: "/menus" },
};

/**
 * /menus — the catalogue. Three standing blocks: the tasting menu (framed,
 * never listed), the à la carte (listed in full) and the archive. A new
 * tasting menu changes data only; this page's architecture stays put.
 */
export default function MenusPage() {
  const chapter = site.chapters[1];

  return (
    <>
      <PageHeader
        chapter={chapter}
        title={["Every chapter", "begins with a bite"]}
        lede="Two standing formats, and a menu that changes with the season."
        titleClassName="text-indigo"
      />

      <TastingMenu />

      <div className="bg-paper-deep">
        <ALaCarte />
      </div>

      <MenuArchive />

      <NextPage
        href="/story"
        label="Our story"
        note="From the Andamans to Bengaluru — and the two sisters who built MINIBÉ."
        className="py-section-sm"
      />
    </>
  );
}
