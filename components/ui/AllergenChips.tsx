import { allergenLegend, type AllergenCode } from "@/data/menus";
import { cn } from "@/lib/cn";

type Props = {
  codes: AllergenCode[];
  className?: string;
  light?: boolean;
};

/** Allergen codes as small tabular chips; the full word is exposed to assistive tech. */
export function AllergenChips({ codes, className, light }: Props) {
  if (!codes.length) return null;
  return (
    <ul className={cn("flex flex-wrap items-center gap-1.5", className)} aria-label="Allergens">
      {codes.map((c) => (
        <li
          key={c}
          className={cn(
            "grid h-6 w-6 place-items-center rounded-full border font-sans text-[0.625rem] font-semibold tracking-wider",
            light ? "border-paper/30 text-paper/80" : "border-ink/25 text-ink/70",
          )}
          title={allergenLegend[c]}
        >
          <span aria-hidden>{c}</span>
          <span className="sr-only">{allergenLegend[c]}</span>
        </li>
      ))}
    </ul>
  );
}

export function AllergenLegend({ codes, light, className }: { codes: AllergenCode[]; light?: boolean; className?: string }) {
  return (
    <p className={cn("t-caption", light ? "text-paper/60" : "text-ink/55", className)}>
      <span className="t-eyebrow mr-3">Allergens</span>
      {codes.map((c, i) => (
        <span key={c}>
          {c} — {allergenLegend[c]}
          {i < codes.length - 1 ? <span className="mx-2 opacity-50">·</span> : null}
        </span>
      ))}
    </p>
  );
}
