"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/data/site";
import { ingredients, ingredientsCopy, type Ingredient } from "@/data/ingredients";
import { cn } from "@/lib/cn";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

const TONES: Record<Ingredient["tone"], string> = {
  wood: "bg-wood text-paper",
  orange: "bg-orange text-paper",
  sand: "bg-sand text-indigo",
  midnight: "bg-midnight text-paper",
  sea: "bg-sea text-paper",
};

/**
 * Chapter 06 — the ingredient index. Names run large down the page like an
 * index; hovering or focusing one fills the sticky tile with its origin and
 * story. Tapping expands it in place on small screens.
 */
export function Ingredients() {
  const chapter = site.chapters[5];
  const [activeId, setActiveId] = useState(ingredients[0]?.id);
  const [openId, setOpenId] = useState<string | null>(null);
  const active = ingredients.find((i) => i.id === activeId) ?? ingredients[0];

  return (
    <section
      id="ingredient"
      data-chapter="ingredient"
      className="wrap py-section-sm md:py-section"
      aria-labelledby="ingredient-title"
    >
      <ChapterMarker chapter={chapter} />

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-20">
        <div className="col-span-12 lg:col-span-8">
          <WordReveal as="h2" id="ingredient-title" text={ingredientsCopy.title} className="t-section text-indigo" />
        </div>
        <Reveal className="col-span-12 flex items-end md:col-span-8 lg:col-span-4 lg:col-start-9">
          <p className="t-lead text-ink">{ingredientsCopy.intro}</p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24">
        {/* Index */}
        <Reveal as="ul" stagger={0.08} className="col-span-12 lg:col-span-7" aria-label="Ingredients">
          {ingredients.map((ing, i) => {
            const isActive = ing.id === activeId;
            const isOpen = ing.id === openId;
            return (
              <li key={ing.id} className="hairline" onMouseEnter={() => setActiveId(ing.id)}>
                <button
                  type="button"
                  onFocus={() => setActiveId(ing.id)}
                  onClick={() => setOpenId((cur) => (cur === ing.id ? null : ing.id))}
                  aria-expanded={isOpen}
                  aria-controls={`ing-${ing.id}`}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 text-left md:grid-cols-[4rem_1fr_auto] md:py-8"
                >
                  <span className="t-eyebrow text-ink/40">0{i + 1}</span>
                  <span
                    className={cn(
                      "font-display text-[2rem] leading-none tracking-tight transition-[color,transform] duration-700 ease-[var(--ease-expo)] md:text-[3.25rem]",
                      isActive ? "translate-x-2 text-orange" : "text-indigo",
                    )}
                  >
                    {ing.name}
                  </span>
                  <span className="t-eyebrow text-right text-ink/55">{ing.origin}</span>
                </button>
                {/* In-place details (all sizes; primary on touch) */}
                <div
                  id={`ing-${ing.id}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-expo)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-3 pb-8 pl-[2.5rem] md:pl-[4rem] lg:hidden">
                      <p className="t-eyebrow text-orange-deep">{ing.source}</p>
                      <p className="t-body max-w-prose text-ink-soft">{ing.note}</p>
                    </div>
                    <div className="hidden pb-8 pl-[4rem] lg:block">
                      <p className="t-body max-w-prose text-ink-soft">{ing.note}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>

        {/* Sticky tile — desktop */}
        <div className="col-span-12 hidden lg:col-span-4 lg:col-start-9 lg:block lg:self-start lg:sticky lg:top-28">
          <Tile ing={active} />
        </div>
      </div>

      <Reveal className="hairline mt-16 grid grid-cols-12 gap-6 pt-8 md:mt-24">
        <p className="t-body-sm col-span-12 text-ink-soft md:col-span-5">{ingredientsCopy.aside}</p>
        <p className="t-body-sm col-span-12 text-ink-soft md:col-span-5 md:col-start-8">{ingredientsCopy.closing}</p>
      </Reveal>
    </section>
  );
}

function Tile({ ing }: { ing: Ingredient }) {
  return (
    <div key={ing.id} className="animate-fade-up" aria-live="polite">
      <div className={cn("relative aspect-[4/5] w-full overflow-hidden", !ing.image && TONES[ing.tone])}>
        {ing.image ? (
          <Image src={ing.image.src} alt={ing.image.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" style={{ objectFit: "cover" }} />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <span aria-hidden className="font-display text-[10rem] font-bold leading-[0.8] opacity-25">
              {ing.name.charAt(0)}
            </span>
            <div>
              <p className="t-eyebrow opacity-80">{ing.origin}</p>
              <p className="mt-2 font-display text-3xl leading-none">{ing.name}</p>
            </div>
          </div>
        )}
      </div>
      <p className="t-eyebrow mt-5 text-orange-deep">{ing.source}</p>
      <p className="t-body-sm mt-3 text-ink-soft">{ing.note}</p>
    </div>
  );
}
