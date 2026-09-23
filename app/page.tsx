import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileReserveBar } from "@/components/layout/MobileReserveBar";
import { ChapterProgress } from "@/components/layout/ChapterProgress";
import { Hero } from "@/components/sections/Hero";
import { TwoWays } from "@/components/sections/TwoWays";
import { Experience } from "@/components/sections/Experience";
import { Menus } from "@/components/sections/Menus";
import { MenuArchive } from "@/components/sections/MenuArchive";
import { Ingredients } from "@/components/sections/Ingredients";
import { Respect } from "@/components/sections/Respect";
import { Story } from "@/components/sections/Story";
import { Space } from "@/components/sections/Space";
import { Social } from "@/components/sections/Social";
import { Contact } from "@/components/sections/Contact";

/**
 * MINIBÉ — home.
 *
 * Cover · Two ways to experience MINIBÉ · 01 The experience ·
 * 02 The menus (tasting menu, à la carte) · 03 The archive ·
 * 04 The ingredient · 05 Our story · 06 The space · 07 Let's talk dessert
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <TwoWays />
        <Experience />
        <Menus />
        <MenuArchive />
        <Ingredients />
        <Respect />
        <Story />
        <Space />
        <Social />
        <Contact />
      </main>
      <Footer />
      <MobileReserveBar />
      <ChapterProgress />
    </>
  );
}
