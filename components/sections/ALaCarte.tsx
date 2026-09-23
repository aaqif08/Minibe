"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { aLaCarteMenu, formatPrice, type MenuItem, type AllergenCode } from "@/data/menus";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AllergenChips, AllergenLegend } from "@/components/ui/AllergenChips";
import { Button } from "@/components/ui/Button";

/**
 * The à la carte. An editorial list, not a card grid: hairlines, serif names,
 * tracked badges, tabular prices. Hovering a dish (desktop) fills the sticky
 * panel on the left; on small screens a tap expands it in place.
 */
export function ALaCarte() {
  const menu = aLaCarteMenu;
  const items = useMemo(() => menu.items.filter((i) => i.available), [menu.items]);
  const firstWithImage = items.find((i) => i.image) ?? items[0];
  const [activeId, setActiveId] = useState<string>(firstWithImage?.id ?? "");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const active = items.find((i) => i.id === activeId) ?? firstWithImage;

  const legendCodes = useMemo(() => {
    const set = new Set<AllergenCode>();
    items.forEach((i) => i.allergens.forEach((a) => set.add(a)));
    return (["D", "N", "G", "E", "S"] as AllergenCode[]).filter((c) => set.has(c));
  }, [items]);

  return (
    <div id="a-la-carte" className="scroll-mt-20">
      <header className="grid grid-cols-12 gap-x-6 gap-y-6">
        <div className="col-span-12 lg:col-span-6">
          <Eyebrow rule className="text-orange-deep">
            Plated desserts · Savoury · Bakes · Beverages
          </Eyebrow>
          <WordReveal as="h3" id="a-la-carte-title" text={menu.title} className="t-section mt-6 text-indigo" />
        </div>
        <Reveal className="col-span-12 flex items-end lg:col-span-5 lg:col-start-8">
          <p className="t-quote text-ink-soft">{menu.subtitle}</p>
        </Reveal>
      </header>

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-20">
        {/* Sticky preview — desktop */}
        <aside className="col-span-12 hidden lg:col-span-4 lg:block lg:self-start lg:sticky lg:top-28" aria-live="polite">
          {active ? <Preview item={active} currency={menu.currency} /> : null}
        </aside>

        {/* The list */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          {menu.categories.map((cat) => {
            const rows = items.filter((i) => i.category === cat);
            if (!rows.length) return null;
            return (
              <Reveal key={cat} className="mb-14 last:mb-0">
                <h3 className="t-eyebrow flex items-center justify-between border-b border-ink pb-3 text-ink">
                  <span>{cat}</span>
                  <span className="tabular-nums text-ink/50">
                    {String(rows.length).padStart(2, "0")}
                  </span>
                </h3>
                <ul>
                  {rows.map((item) => (
                    <MenuRow
                      key={item.id}
                      item={item}
                      currency={menu.currency}
                      expanded={expandedId === item.id}
                      active={activeId === item.id}
                      onToggle={() => setExpandedId((cur) => (cur === item.id ? null : item.id))}
                      onHover={() => setActiveId(item.id)}
                    />
                  ))}
                </ul>
              </Reveal>
            );
          })}

          <Reveal className="hairline mt-4 flex flex-col gap-6 pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-display text-lg font-light italic text-ink-soft">{menu.footnote}</p>
              <AllergenLegend codes={legendCodes} />
            </div>
            <Button href={site.links.menu} external variant="outline" className="self-start">
              {site.cta.aLaCarte}
            </Button>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function MenuRow({
  item,
  currency,
  expanded,
  active,
  onToggle,
  onHover,
}: {
  item: MenuItem;
  currency: string;
  expanded: boolean;
  active: boolean;
  onToggle: () => void;
  onHover: () => void;
}) {
  const hasDetails = item.ingredients.length > 0 || item.allergens.length > 0 || (item.addOns?.length ?? 0) > 0;
  const panelId = `alc-${item.id}`;
  const nameClass = cn(
    "font-display text-[1.5rem] leading-tight text-ink transition-colors duration-500 md:text-[1.75rem]",
    (active || expanded) && "text-orange",
  );
  const summary = item.ingredients.join("  ·  ");

  return (
    <li className={cn("hairline transition-colors duration-500", active && "lg:bg-paper-deep/60")} onMouseEnter={onHover}>
      {/* Desktop row — everything inline, hover fills the side panel */}
      <div className="hidden grid-cols-[1fr_auto] items-baseline gap-x-8 gap-y-2 py-6 lg:grid lg:px-3">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className={nameClass}>{item.name}</span>
          {item.badge ? <span className="t-eyebrow text-orange-deep">{item.badge}</span> : null}
        </span>
        <span className="font-display text-lg tabular-nums text-ink/80">{formatPrice(item.price, currency)}</span>
        {item.description ? <span className="t-body-sm col-span-2 text-ink-soft">{item.description}</span> : null}
        {summary ? <span className="col-span-2 font-display text-base font-light italic text-ink-soft">{summary}</span> : null}
        {item.addOns?.length ? (
          <span className="t-caption col-span-2 text-ink/60">
            {item.addOns.map((a) => `Add on: ${a.name} · ${formatPrice(a.price, currency)}`).join("  ·  ")}
          </span>
        ) : null}
        <AllergenChips codes={item.allergens} className="col-span-2" />
      </div>

      {/* Small screens — tap to expand */}
      <button
        type="button"
        onClick={hasDetails ? onToggle : undefined}
        aria-expanded={hasDetails ? expanded : undefined}
        aria-controls={hasDetails ? panelId : undefined}
        className={cn("grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 text-left lg:hidden", !hasDetails && "cursor-default")}
      >
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className={nameClass}>{item.name}</span>
          {item.badge ? <span className="t-eyebrow text-orange-deep">{item.badge}</span> : null}
        </span>
        <span className="font-display text-lg tabular-nums text-ink/80">{formatPrice(item.price, currency)}</span>
        {item.description ? <span className="t-body-sm col-span-2 text-ink-soft">{item.description}</span> : null}
        {hasDetails ? (
          <span className="t-caption col-span-2 flex items-center gap-2 text-ink/45">
            <span
              aria-hidden
              className={cn("inline-block h-px bg-current transition-[width] duration-500 ease-[var(--ease-expo)]", expanded ? "w-8" : "w-5")}
            />
            {expanded ? "Close" : "Details"}
          </span>
        ) : null}
      </button>

      {hasDetails ? (
        <div
          id={panelId}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-expo)] lg:hidden",
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
          aria-hidden={!expanded}
        >
          <div className="overflow-hidden">
            <div className="grid gap-5 pb-6">
              <ul className="grid gap-1 font-display text-lg leading-snug text-ink-soft">
                {item.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
                {item.addOns?.map((a) => (
                  <li key={a.name} className="t-caption mt-2 text-ink/60">
                    Add on: {a.name} · {formatPrice(a.price, currency)}
                  </li>
                ))}
              </ul>
              <AllergenChips codes={item.allergens} />
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}

function Preview({ item, currency }: { item: MenuItem; currency: string }) {
  return (
    <div key={item.id} className="animate-fade-up">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-deep">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <span aria-hidden className="font-display text-[9rem] font-bold leading-none text-indigo/10">
              {item.name.charAt(0)}
            </span>
            <ul className="grid gap-1 font-display text-xl leading-snug text-indigo">
              {item.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <p className="font-display text-xl text-ink">{item.name}</p>
          {item.badge ? <p className="t-eyebrow mt-1 text-orange-deep">{item.badge}</p> : null}
        </div>
        <p className="font-display text-lg tabular-nums text-ink/70">{formatPrice(item.price, currency)}</p>
      </div>
      <AllergenChips codes={item.allergens} className="mt-3" />
    </div>
  );
}
