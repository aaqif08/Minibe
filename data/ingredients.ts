/**
 * "Celebrating Local" — sourcing details from the portfolio, page 03.
 * `image` is null until MINIBÉ supplies ingredient photography; the section
 * renders a tonal typographic tile in its place.
 */
import type { SiteImage } from "./images";

export type Ingredient = {
  id: string;
  name: string;
  origin: string;
  source: string;
  note: string;
  tone: "wood" | "orange" | "sand" | "midnight" | "sea";
  image: SiteImage | null;
};

export const ingredients: Ingredient[] = [
  {
    id: "cinnamon",
    name: "Cinnamon",
    origin: "Andaman Islands",
    source: "Agricultural Department, Andaman Islands",
    note: "From the islands Chef Jenny grew up on — the same place that taught her to cook with what arrives.",
    tone: "wood",
    image: null,
  },
  {
    id: "honey",
    name: "Honey",
    origin: "Marthandam",
    source: "Marthandam Cooperative Society",
    note: "Cooperative honey, bought from the people who keep the bees.",
    tone: "orange",
    image: null,
  },
  {
    id: "cane-sugar",
    name: "Cane sugar",
    origin: "Karnataka",
    source: "A local farmer in Karnataka",
    note: "Every dessert at MINIBÉ has completely transitioned to cane sugar sourced directly from a local farmer.",
    tone: "sand",
    image: null,
  },
  {
    id: "chocolate",
    name: "Chocolate",
    origin: "Idukki, Kerala",
    source: "Rakkaudella, bean-to-bar",
    note: "A homegrown bean-to-bar maker in Idukki, where locally grown cacao is transformed into chocolate with exceptional care and craftsmanship.",
    tone: "midnight",
    image: null,
  },
  {
    id: "produce",
    name: "Seasonal produce",
    origin: "Across India",
    source: "Local growers and homegrown brands",
    note: "Many of our ingredients come directly from the communities that cultivate them. Every plate becomes a celebration of the people behind the produce.",
    tone: "sea",
    image: null,
  },
];

export const ingredientsCopy = {
  title: ["What grows here", "becomes part", "of the story."],
  intro:
    "India is home to extraordinary farmers, artisans, and producers. At MINIBÉ, we consciously choose to work with locally grown produce and homegrown brands wherever possible.",
  aside:
    "By sourcing closer to home, we not only showcase the incredible diversity of Indian ingredients but also help reduce the environmental impact associated with long-distance transportation.",
  closing:
    "Supporting local growers allows us to build meaningful relationships with producers while ensuring that every ingredient reaches our kitchen at its freshest.",
};
