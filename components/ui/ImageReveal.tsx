"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGsap } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/data/images";

type Props = {
  image: SiteImage;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  quality?: number;
  /** Object position, e.g. "50% 20%". */
  position?: string;
  /** Reveal direction — which edge the image wipes in from. */
  from?: "bottom" | "top" | "left" | "right";
  /** Parallax travel in percent of the image height while scrolling through. */
  parallax?: number;
  /** Scale the image on hover (used in galleries). */
  hover?: boolean;
  cursor?: "view" | "drag";
  /** Skip the clip wipe (keeps LCP paint immediate); only the settle-scale runs. Use for the hero. */
  instant?: boolean;
  children?: React.ReactNode;
};

const CLIPS = {
  bottom: "inset(0 0 100% 0)",
  top: "inset(100% 0 0 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
};

/**
 * Photograph with a clip-path wipe + settle-scale on first view, and an
 * optional slow parallax while it is on screen. Uses next/image `fill` — the
 * wrapper must carry an aspect ratio or explicit height.
 */
export function ImageReveal({
  image,
  sizes,
  className,
  imgClassName,
  priority,
  quality,
  position = "50% 50%",
  from = "bottom",
  parallax = 0,
  hover,
  cursor,
  instant,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGsap(ref, ({ gsap, ScrollTrigger }, el) => {
    const inner = innerRef.current;
    if (!inner) return;
    if (instant) {
      gsap.set(el, { clipPath: "none" });
      gsap.fromTo(inner, { scale: 1.1 }, { scale: 1, duration: 2.4, ease: "expo.out" });
    } else {
      gsap.set(el, { clipPath: CLIPS[from] });
      gsap.set(inner, { scale: 1.18 });
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          defaults: { duration: 1.6, ease: "expo.out" },
        })
        .to(el, { clipPath: "inset(0 0 0% 0)" }, 0)
        .to(inner, { scale: 1, duration: 2 }, 0);
    }

    if (parallax) {
      const img = inner.firstElementChild as HTMLElement | null;
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    }
    ScrollTrigger.refresh();
  });

  return (
    <div
      ref={ref}
      data-reveal-clip={instant ? undefined : ""}
      className={cn("relative overflow-hidden", className)}
      data-cursor={cursor}
    >
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          style={{ objectFit: "cover", objectPosition: position, scale: parallax ? 1.12 : undefined }}
          className={cn(
            "transition-transform duration-[1.4s] ease-[var(--ease-expo)]",
            hover && "group-hover:scale-[1.04]",
            imgClassName,
          )}
        />
      </div>
      {children}
    </div>
  );
}
