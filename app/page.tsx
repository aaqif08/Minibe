import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileReserveBar } from "@/components/layout/MobileReserveBar";
import { ChapterProgress } from "@/components/layout/ChapterProgress";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { IslandsToCity } from "@/components/sections/IslandsToCity";
import { Story } from "@/components/sections/Story";
import { Chef } from "@/components/sections/Chef";
import { Experience } from "@/components/sections/Experience";
import { OpeningAct } from "@/components/sections/OpeningAct";
import { Mosaic } from "@/components/sections/Mosaic";
import { Ingredients } from "@/components/sections/Ingredients";
import { Respect } from "@/components/sections/Respect";
import { Space } from "@/components/sections/Space";
import { Social } from "@/components/sections/Social";
import { Reservation } from "@/components/sections/Reservation";
import { Location } from "@/components/sections/Location";

/**
 * MINIBÉ — one long evening, told in chapters.
 *
 * Cover · 01 Where it begins · 02 The islands · 03 Our story · 04 The chef ·
 * 05 The table (Opening Act, Mosaic) · 06 The ingredient · 07 The space ·
 * 08 The last bite · Visit · Footer
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Manifesto />
        <IslandsToCity />
        <Story />
        <Chef />
        <Experience />
        <OpeningAct />
        <Mosaic />
        <Ingredients />
        <Respect />
        <Space />
        <Social />
        <Reservation />
        <Location />
      </main>
      <Footer />
      <MobileReserveBar />
      <ChapterProgress />
    </>
  );
}
