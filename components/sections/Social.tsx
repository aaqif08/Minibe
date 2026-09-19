import Image from "next/image";
import { social } from "@/data/social";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

/** Follow the journey — an editorial tile strip fed from data/social.ts. */
export function Social() {
  return (
    <section id="social" className="wrap py-section-sm" aria-labelledby="social-title">
      <div className="hairline flex flex-col gap-8 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow rule className="text-ink/70">
            {social.title}
          </Eyebrow>
          <h2 id="social-title" className="mt-5">
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="t-hero link-underline inline-block text-indigo transition-colors duration-500 hover:text-orange"
            >
              {social.handle}
            </a>
          </h2>
        </div>
        <Button href={social.url} external variant="text" className="self-start md:self-auto">
          Open Instagram
        </Button>
      </div>

      <Reveal as="ul" stagger={0.06} className="mt-10 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3" aria-label="Recent posts">
        {social.tiles.map((t, i) => (
          <li key={t.id} className="group relative aspect-square overflow-hidden bg-paper-deep">
            {t.image ? (
              <a href={t.href ?? social.url} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block h-full w-full">
                <Image
                  src={t.image.src}
                  alt={t.image.alt}
                  fill
                  sizes="(min-width: 768px) 16vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-105"
                />
              </a>
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between p-3" aria-hidden>
                <span className="t-eyebrow text-ink/30">0{i + 1}</span>
                <Logo variant="monogram" tone="indigo" width={28} className="opacity-20" />
              </div>
            )}
          </li>
        ))}
      </Reveal>
    </section>
  );
}
