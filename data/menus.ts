/**
 * MINIBÉ menus — transcribed exactly from the client-supplied menu PDFs
 * ("Opening Act Tasting Menu" and "Mosaic"). Nothing here is invented.
 *
 * To update a menu, edit this file only. Prices are in INR.
 * Set `available: false` to hide an item without deleting it.
 * `image` is null until MINIBÉ supplies dish photography.
 */
import type { SiteImage } from "./images";

export type AllergenCode = "D" | "N" | "G" | "E" | "S";

export const allergenLegend: Record<AllergenCode, string> = {
  D: "Dairy",
  N: "Nut",
  G: "Gluten",
  E: "Egg",
  S: "Sesame",
};

export type Badge = "Personal Favorite" | "Highly Demanded" | "Signature Dessert";

export type MenuCategory = "Dessert" | "Savoury" | "Sips";

export type MenuItem = {
  id: string;
  name: string;
  /** Optional one-line description. Left empty where the menu has none. */
  description: string;
  price: number;
  category: MenuCategory;
  badge: Badge | null;
  ingredients: string[];
  allergens: AllergenCode[];
  addOns?: { name: string; price: number }[];
  image: SiteImage | null;
  available: boolean;
};

export type OpeningActMenu = {
  id: "opening-act";
  title: string;
  subtitle: string;
  categories: MenuCategory[];
  items: MenuItem[];
  footnote: string;
  currency: string;
};

export const openingActMenu: OpeningActMenu = {
  id: "opening-act",
  title: "Opening Act",
  subtitle: "A little something before the evening becomes a story.",
  currency: "₹",
  categories: ["Dessert", "Savoury", "Sips"],
  footnote: "If you crave for more, ask for today's specials.",
  items: [
    // ------------------------------------------------------------ DESSERT
    {
      id: "moelleux-au-chocolat",
      name: "Moelleux Au Chocolat",
      description: "",
      price: 550,
      category: "Dessert",
      badge: "Personal Favorite",
      ingredients: ["Moelleux", "Vanilla mousse", "Vanilla icecream", "Tuille"],
      allergens: ["G", "E", "D"],
      image: null,
      available: true,
    },
    {
      id: "sticky-toffee-madeleine",
      name: "Sticky Toffee Madeleine",
      description: "",
      price: 550,
      category: "Dessert",
      badge: null,
      ingredients: ["Sticky toffee madeleine", "Coffee toffee sauce", "Vanilla icecream", "Coffee tuille"],
      allergens: ["G", "E", "D"],
      image: null,
      available: true,
    },
    {
      id: "black-sesame-cheesecake",
      name: "Black Sesame Cheesecake",
      description: "",
      price: 550,
      category: "Dessert",
      badge: "Highly Demanded",
      ingredients: ["Black sesame cheesecake", "Berry coulis", "Vanilla icecream"],
      allergens: ["D", "E", "N"],
      image: null,
      available: true,
    },
    {
      id: "birthday-party",
      name: "Birthday Party",
      description: "",
      price: 550,
      category: "Dessert",
      badge: null,
      ingredients: ["Chocolate mousse", "Vanilla sponge", "Potato chips coated with chocolate", "Chocolate icecream"],
      allergens: ["D", "G"],
      image: null,
      available: true,
    },
    {
      id: "berries-and-barley",
      name: "Berries and Barley",
      description: "",
      price: 550,
      category: "Dessert",
      badge: "Signature Dessert",
      ingredients: ["Barley mousse", "Barley tuille", "Berry ice", "Berry tea", "Barley popcorn"],
      allergens: ["G", "E", "D"],
      image: {
        src: "/images/photos/berries-and-barley.jpg",
        alt: "Berries & Barley: barley mousse and tuile in a pool of vivid berry",
        width: 960,
        height: 1280,
      },
      available: true,
    },
    {
      id: "half-a-tart",
      name: "Half a Tart",
      description: "",
      price: 550,
      category: "Dessert",
      badge: null,
      ingredients: ["Chocolate tart", "Chocolate mousse", "Pomegranate jam", "Vanilla/chocolate icecream"],
      allergens: ["D", "G"],
      image: null,
      available: true,
    },
    {
      id: "lemon-no-bar",
      name: "Lemon No-Bar",
      description: "",
      price: 550,
      category: "Dessert",
      badge: null,
      ingredients: ["Lemon curd", "Shortbread", "Fromage ice cream", "Ginger meringue", "Almond sponge"],
      allergens: ["D", "E", "N", "G"],
      image: null,
      available: true,
    },
    // ------------------------------------------------------------ SAVOURY
    {
      id: "galette",
      name: "Galette",
      description: "",
      price: 450,
      category: "Savoury",
      badge: null,
      ingredients: ["Hand laminated puff pastry", "Sun dried tomato", "Onion jam", "Salad", "Cheese by Melchior"],
      allergens: ["D", "G"],
      addOns: [{ name: "Chicken", price: 100 }],
      image: null,
      available: true,
    },
    {
      id: "barley-risotto",
      name: "Barley Risotto",
      description: "",
      price: 450,
      category: "Savoury",
      badge: null,
      ingredients: ["Barley risotto", "Leek oil", "Chicken/mushroom"],
      allergens: ["D", "G"],
      image: null,
      available: true,
    },
    {
      id: "shikampuri-kebab",
      name: "Shikampuri Kebab",
      description: "",
      price: 450,
      category: "Savoury",
      badge: null,
      ingredients: ["Chicken/veg kebab", "Green chutney", "Pickled onion", "Onion tuille"],
      allergens: ["D"],
      image: null,
      available: true,
    },
    {
      id: "meatballs",
      name: "Meatballs",
      description: "",
      price: 450,
      category: "Savoury",
      badge: null,
      ingredients: ["Chicken meat balls", "Marinara", "Herbs"],
      allergens: ["D"],
      image: null,
      available: true,
    },
    // --------------------------------------------------------------- SIPS
    {
      id: "hot-chocolate",
      name: "Hot Chocolate",
      description: "",
      price: 350,
      category: "Sips",
      badge: null,
      ingredients: [],
      allergens: [],
      image: null,
      available: true,
    },
    {
      id: "hibiscus-rose-tea",
      name: "Hibiscus Rose Tea",
      description: "",
      price: 200,
      category: "Sips",
      badge: null,
      ingredients: [],
      allergens: [],
      image: null,
      available: true,
    },
    {
      id: "jamu",
      name: "Jamu",
      description: "",
      price: 200,
      category: "Sips",
      badge: null,
      ingredients: [],
      allergens: [],
      image: null,
      available: true,
    },
  ],
};

/* ------------------------------------------------------------------
   MOSAIC — tasting menu
------------------------------------------------------------------- */

export type MosaicCourse = {
  number: number;
  name: string;
  /** Components as printed on the menu, in order. */
  components: string[];
  /**
   * The two supplied Mosaic PDFs print different components for this course.
   * Both are kept here, unmerged. Set `activeVariant` to "a" or "b" once
   * MINIBÉ confirms which is current; while it is null the site shows both,
   * separated by "or". A non-empty `label` (e.g. "Vegetarian") is printed
   * above its list; leave it empty to print nothing.
   */
  variants?: {
    activeVariant: "a" | "b" | null;
    a: { label: string; components: string[] };
    b: { label: string; components: string[] };
  };
  allergens: AllergenCode[];
  /** Mosaic palette accent for this course — art direction only. */
  accent: "teal" | "blue" | "green" | "gold" | "pink";
  image: SiteImage | null;
};

export type MosaicMenu = {
  id: "mosaic";
  title: string;
  /** Editorial framing — website copy, not printed on the menu. */
  subtitle: string;
  courses: MosaicCourse[];
};

export const mosaicMenu: MosaicMenu = {
  id: "mosaic",
  title: "Mosaic",
  subtitle: "A tasting journey. One course at a time.",
  courses: [
    {
      number: 1,
      name: "Roots",
      components: ["Carrot cornette", "Tarte Tatin", "Goli Bajji", "Gnocchi"],
      allergens: ["G", "D", "E"],
      accent: "gold",
      image: null,
    },
    {
      number: 2,
      name: "Tile",
      components: ["Watermelon", "Beetroot", "Sesame"],
      allergens: ["S"],
      accent: "pink",
      image: null,
    },
    {
      number: 3,
      name: "Swiss Roll",
      // Wording differs between the two supplied PDFs — see `variants`.
      components: [],
      variants: {
        activeVariant: null, // TODO(MINIBÉ): confirm which version is current
        a: {
          label: "", // internal name: Version A (first supplied PDF)
          components: ["Chicken ballontine", "Banana", "Pomegranate", "Pistou", "Jus", "Risotto"],
        },
        b: {
          label: "", // internal name: Version B (second supplied PDF)
          components: ["Guess the veggie", "Banana chips", "Pomegranate", "Pistou", "Jus", "Risotto"],
        },
      },
      allergens: ["G", "D", "E"],
      accent: "green",
      image: null,
    },
    {
      number: 4,
      name: "Imposter",
      components: ["Sourdough icecream"],
      allergens: ["G", "D", "E"],
      accent: "teal",
      image: null,
    },
    {
      number: 5,
      name: "Trinity",
      components: ["Banana", "Mung beans", "Urad dal", "Jaggery", "Papad"],
      allergens: ["G", "D", "E"],
      accent: "gold",
      image: null,
    },
    {
      number: 6,
      name: "Pachadi",
      components: ["Yoghurt", "Pineapple", "Tepache"],
      allergens: ["D", "E"],
      accent: "blue",
      image: null,
    },
    {
      number: 7,
      name: "Ca-Cao",
      components: ["Chocolate", "Almond", "Mascarpone", "Secret ingredient"],
      allergens: ["G", "D", "E", "N"],
      accent: "pink",
      image: null,
    },
    {
      number: 8,
      name: "Petit Fours",
      components: ["Macaron", "Tart", "Twix", "Mathri"],
      allergens: ["G", "D", "E", "N"],
      accent: "teal",
      image: null,
    },
  ],
};

/** Resolve the component list(s) to display for a course, honouring unconfirmed variants. */
export function courseComponentSets(
  course: MosaicCourse,
): { label: string | null; components: string[] }[] {
  if (!course.variants) return [{ label: null, components: course.components }];
  const { activeVariant, a, b } = course.variants;
  if (activeVariant === "a") return [{ label: null, components: a.components }];
  if (activeVariant === "b") return [{ label: null, components: b.components }];
  return [
    { label: a.label, components: a.components },
    { label: b.label, components: b.components },
  ];
}

export function formatPrice(amount: number, currency = "₹") {
  return `${currency}${amount.toLocaleString("en-IN")}`;
}
