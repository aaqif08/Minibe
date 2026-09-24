import { Hero } from "@/components/home/Hero";
import { BrandTeaser } from "@/components/home/BrandTeaser";
import { TwoWaysTeaser } from "@/components/home/TwoWaysTeaser";
import { VisitTeaser } from "@/components/home/VisitTeaser";

/**
 * Home — the cover, and nothing more.
 *
 * Hero · one-line brand statement · the two formats · two doors into the
 * story and the room. Everything else lives on its own route: /experience,
 * /menus, /story, /space, /contact. Do not grow this page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TwoWaysTeaser />
      <BrandTeaser />
      <VisitTeaser />
    </>
  );
}
