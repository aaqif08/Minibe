/**
 * "Our Story" — MINIBÉ's journey.
 * The journey waypoints and the Andamans → France → Bali → Bengaluru framing
 * are MINIBÉ's approved copy; the longer passages are from the brand portfolio.
 */

export const story = {
  title: ["From the Andamans", "to Bengaluru"],
  lede: "MINIBÉ began with Chef Jenny's childhood in the Andaman Islands, continued through pastry school in Bengaluru and took her to France and Bali, where she explored different ways of approaching pastry and the table.",

  /** The four places, in order. Rendered as a horizontal passage on desktop. */
  journey: [
    {
      id: "andaman",
      place: "Andaman",
      line: "Where it began.",
      note: "Fresh produce arrived only when the cargo ships came in from Chennai and Kolkata. Weather and shipping schedules decided what was available — seasonality as a way of life, not a culinary trend.",
    },
    {
      id: "france",
      place: "France",
      line: "Where technique deepened.",
      note: "The vocabulary of French pastry — moelleux, madeleine, tarte tatin, petit fours — learned at the source.",
    },
    {
      id: "bali",
      place: "Bali",
      line: "Where convention was challenged.",
      note: "A different way of approaching pastry, and a different way of thinking about the table.",
    },
    {
      id: "bengaluru",
      place: "Bengaluru",
      line: "Where it all comes together.",
      note: "Pastry school, then supper clubs, and now a permanent room given entirely to dessert dining.",
    },
  ],

  /** "Meet Chef Jenny" — the longer read, from the portfolio. */
  chef: {
    title: "Meet Chef Jenny",
    lede: "Growing up in the Andaman Islands shaped Chef Jenny's relationship with food in profound ways.",
    paragraphs: [
      "That upbringing taught her to cook with what nature provided, to value every ingredient, and to embrace change instead of resisting it. That philosophy continues at MINIBÉ today — the menu evolves with the seasons, allowing ingredients to dictate what is served rather than forcing recipes through the year.",
      "MINIBÉ is a journey built by two sisters — Jenny and Steffi. While Chef Jenny leads the culinary vision, Steffi stepped away from her corporate career to build this dream alongside her sister. Together, they transformed their passion into reality, growing from intimate supper clubs under Sakaré for over 1.5 years into a permanent space dedicated entirely to dessert dining.",
      "MINIBÉ reimagines the world of desserts through immersive tasting experiences inspired by memories, travels, and the incredible diversity of India's produce. Each menu is thoughtfully crafted to celebrate ingredients at their finest, transforming them into experiences that linger long after the final course.",
    ],
    facts: [
      { label: "Built by", value: "Two sisters — Jenny & Steffi" },
      { label: "Began as", value: "Supper clubs under Sakaré, for over 1.5 years" },
      { label: "Now", value: "A permanent space dedicated entirely to dessert dining" },
    ],
  },

  belief:
    "MINIBÉ was born from a simple belief — that desserts can be the centrepiece of an experience, where creativity, technique, and storytelling come together on the plate.",
};
