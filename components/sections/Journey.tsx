"use client";

import { useRef } from "react";
import { story } from "@/data/story";
import { images } from "@/data/images";
import { useGsap } from "@/lib/motion";
import { ImageReveal } from "@/components/ui/ImageReveal";

/**
 * Andaman → France → Bali → Bengaluru. The passage runs sideways on large
 * screens (pinned to the viewport) and stacks on small ones.
 */
export function Journey() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(pinRef, ({ gsap }, pin) => {
    const track = trackRef.current;
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={pinRef} className="relative overflow-hidden" aria-label="The journey">
      <div ref={trackRef} className="flex flex-col gap-14 lg:h-svh lg:w-max lg:flex-row lg:items-center lg:gap-0">
        {story.journey.map((step, i) => (
          <article key={step.id} className="wrap grid grid-cols-12 items-center gap-6 lg:w-[58vw] lg:py-0">
            <div className="col-span-12 lg:col-span-11">
              <p className="t-eyebrow text-orange">
                0{i + 1}
                <span className="mx-2 opacity-50">/</span>0{story.journey.length}
              </p>
              <h2 className="t-hero mt-5 uppercase text-paper">{step.place}</h2>
              <p className="t-quote mt-4 text-paper/80">{step.line}</p>
              <p className="t-body mt-7 max-w-lg text-paper/70">{step.note}</p>
            </div>
          </article>
        ))}

        <div className="wrap lg:w-[46vw]">
          <ImageReveal
            image={images.entranceBlue}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[3/4] max-h-[64svh] w-full"
            from="right"
          />
          <p className="t-caption mt-4 text-paper/70">The entrance — an island memory, painted in blue.</p>
        </div>
      </div>
    </div>
  );
}
