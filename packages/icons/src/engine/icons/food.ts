// Food icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Soda cup with straw */
export const cupSodaIcon: IconDefinition = {
  name: "cup-soda",
  category: "food",
  tags: ["soda", "drink", "straw", "fizzy"],
  paths: ["M6 9h12l-1.5 11h-9z", "M5 9h14", "M12 9l2-5h3"],
};

/** Wine glass */
export const wineIcon: IconDefinition = {
  name: "wine",
  category: "food",
  tags: ["glass", "drink", "alcohol", "red"],
  paths: ["M7 3h10l-1 7a4 4 0 0 1-8 0z", "M12 14v6", "M8 21h8"],
};

/** Beer mug with foam */
export const beerIcon: IconDefinition = {
  name: "beer",
  category: "food",
  tags: ["mug", "drink", "ale", "pub"],
  paths: [
    "M4 8h11v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
    "M15 11h2a2 2 0 0 1 0 4h-2",
    "M4 8q0-3 2-3h7q2 0 2 3",
  ],
  colors: [palette.amber, undefined, undefined],
};

/** Pizza slice with pepperoni */
export const pizzaIcon: IconDefinition = {
  name: "pizza",
  category: "food",
  tags: ["slice", "cheese", "fast-food", "italian"],
  paths: [
    "M3 4q9-2 18 0l-9 17z",
    "M5 7.5q7-1.5 14 0",
    "M9 11a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
    "M14 13a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  ],
  colors: [undefined, undefined, palette.red, palette.red],
};

/** Cherries with stems and leaf */
export const cherryIcon: IconDefinition = {
  name: "cherry",
  category: "food",
  tags: ["fruit", "berry", "sweet", "cherries"],
  paths: [
    "M6 15a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0",
    "M14 17a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0",
    "M9.5 11.5C10 8 12 5 15 3",
    "M17.5 13.5C16.5 9 15.5 6 15 3",
    "M15 3q3-2 6 0q-3 3-6 0",
  ],
  colors: [palette.red, palette.red, undefined, undefined, palette.green],
};

/** Carrot with leaves */
export const carrotIcon: IconDefinition = {
  name: "carrot",
  category: "food",
  tags: ["vegetable", "root", "orange", "garden"],
  paths: [
    "M5 19L9 9.5L16 6L18 8L14.5 15z",
    "M9 15l2 2",
    "M12 12l2 2",
    "M16 6l1-4",
    "M18 8l3.5-3.5",
  ],
  colors: [palette.orange, undefined, undefined, palette.green, palette.green],
};

/** Bread loaf with scoring */
export const breadIcon: IconDefinition = {
  name: "bread",
  category: "food",
  tags: ["loaf", "baguette", "bakery", "bake"],
  paths: ["M4 12a8 8 0 0 1 16 0v7H4z", "M9 9l2 2", "M13 8.5l2 2"],
};

/** Croissant */
export const croissantIcon: IconDefinition = {
  name: "croissant",
  category: "food",
  tags: ["pastry", "bakery", "french", "breakfast"],
  paths: [
    "M2.5 16C3 10 5 6.5 8 6.5C9.5 4 14.5 4 16 6.5C19 6.5 21 10 21.5 16C17 10 7 10 2.5 16Z",
    "M8 6.5Q9.5 9.5 8 12",
    "M16 6.5Q14.5 9.5 16 12",
  ],
  colors: [palette.amber, undefined, undefined],
};

/** Ice cream cone with two scoops */
export const iceCreamIcon: IconDefinition = {
  name: "ice-cream",
  category: "food",
  tags: ["cone", "scoop", "dessert", "frozen"],
  paths: [
    "M6 12a6 6 0 0 1 12 0",
    "M8 8.5a4 4 0 0 1 8 0",
    "M7 12l5 9 5-9",
    "M6 12h12",
  ],
};

/** Layered cake with candle */
export const cakeIcon: IconDefinition = {
  name: "cake",
  category: "food",
  tags: ["birthday", "dessert", "sweet", "celebrate"],
  paths: [
    "M4 13h16v7H4z",
    "M6 9h12v4H6z",
    "M12 9V5.5",
    "M12 2.5a1.5 2 0 0 1 0 3a1.5 2 0 0 1 0-3",
  ],
};

/** Cookie with chocolate chips */
export const cookieIcon: IconDefinition = {
  name: "cookie",
  category: "food",
  tags: ["biscuit", "chocolate", "snack", "dessert"],
  paths: [
    "M12 3a9 9 0 1 0 9 9a4 4 0 0 1-4-4a4 4 0 0 1-5-5",
    "M8 9.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
    "M13 14a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
    "M7.5 15a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  ],
};

/** Bucket of popcorn */
export const popcornIcon: IconDefinition = {
  name: "popcorn",
  category: "food",
  tags: ["corn", "movie", "snack", "cinema"],
  paths: [
    "M5 11l1.5 9h11l1.5-9z",
    "M4 11h16",
    "M6 11a2.5 2.5 0 0 1 1-4.5a3 3 0 0 1 5-1.5a3 3 0 0 1 5 1.5a2.5 2.5 0 0 1 1 4.5",
  ],
};

/** Hamburger */
export const burgerIcon: IconDefinition = {
  name: "burger",
  category: "food",
  tags: ["hamburger", "fast-food", "sandwich", "meal"],
  paths: [
    "M4 11a8 7 0 0 1 16 0z",
    "M3 14.5h18",
    "M4 17h16v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z",
  ],
};

/** Sandwich */
export const sandwichIcon: IconDefinition = {
  name: "sandwich",
  category: "food",
  tags: ["lunch", "bread", "meal", "deli"],
  paths: [
    "M3 9V7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2z",
    "M3 12l2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2",
    "M3 16h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  ],
};

/** Bowl of salad */
export const saladIcon: IconDefinition = {
  name: "salad",
  category: "food",
  tags: ["bowl", "greens", "healthy", "vegetable"],
  paths: [
    "M3 12h18a9 9 0 0 1-18 0z",
    "M8 12q0-5 4-7q0 5-4 7",
    "M16 12q0-4-3-6q0 4 3 6",
  ],
};

/** Chef toque */
export const chefHatIcon: IconDefinition = {
  name: "chef-hat",
  category: "food",
  tags: ["toque", "cook", "kitchen", "hat"],
  paths: [
    "M7 14a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 3.2A4 4 0 0 1 17 14",
    "M7 14v5h10v-5",
  ],
};

/** Cooking pot with steam */
export const cookingPotIcon: IconDefinition = {
  name: "cooking-pot",
  category: "food",
  tags: ["pot", "stew", "kitchen", "boil"],
  paths: [
    "M5 10h14v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z",
    "M4 10h16",
    "M5 13H2",
    "M19 13h3",
    "M9 7.5q-1-1.5 0-3",
    "M12 7.5q-1-1.5 0-3",
    "M15 7.5q-1-1.5 0-3",
  ],
};

/** Teapot */
export const teapotIcon: IconDefinition = {
  name: "teapot",
  category: "food",
  tags: ["kettle", "tea", "brew", "hot"],
  paths: [
    "M5 10h12v6a6 6 0 0 1-12 0z",
    "M8 10a4 4 0 0 1 8 0",
    "M10.5 4.5h3",
    "M5 12L2 6",
    "M17 12h1.5a3 3 0 0 1 0 6H17",
  ],
};

/** Milk carton with drop */
export const milkIcon: IconDefinition = {
  name: "milk",
  category: "food",
  tags: ["carton", "dairy", "drink", "cow"],
  paths: [
    "M6 8l3-4h6l3 4v13H6z",
    "M6 8h12",
    "M12 11.5c-1.5 2-2.5 3-2.5 4.5a2.5 2.5 0 0 0 5 0c0-1.5-1-2.5-2.5-4.5z",
  ],
};

/** Glazed donut with sprinkles */
export const donutIcon: IconDefinition = {
  name: "donut",
  category: "food",
  tags: ["doughnut", "dessert", "sweet", "pastry"],
  paths: [
    "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z",
    "M12 9.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z",
    "M6 11l2-1",
    "M15 6.5l2 .5",
    "M16 15l2 1.5",
    "M9 17l1.5 1.5",
  ],
};

/** Lollipop */
export const lollipopIcon: IconDefinition = {
  name: "lollipop",
  category: "food",
  tags: ["candy", "sweet", "sugar", "treat"],
  paths: [
    "M12 3a6 6 0 1 0 0 12a6 6 0 1 0 0-12z",
    "M12 6a3 3 0 0 1 3 3",
    "M12 12a3 3 0 0 1-3-3",
    "M12 15v6",
  ],
  colors: [palette.pink, undefined, undefined, undefined],
};

/** Banana */
export const bananaIcon: IconDefinition = {
  name: "banana",
  category: "food",
  tags: ["fruit", "yellow", "peel", "snack"],
  paths: ["M5 4c0 8 4 14 13 15c1-1 1.5-2 1-3c-6-1-9-6-9-12z", "M5 4l-2-2"],
  colors: [palette.yellow, undefined],
};

/** Fried egg with yolk */
export const eggIcon: IconDefinition = {
  name: "egg",
  category: "food",
  tags: ["breakfast", "yolk", "fried", "protein"],
  paths: [
    "M4 12C4 6.5 7.5 4.5 12 4.5S20 7 20 12.5S18.5 20 12 20S4 17.5 4 12Z",
    "M12 8.5a3 3 0 1 0 0 6a3 3 0 1 0 0-6z",
  ],
  colors: [undefined, palette.amber],
};

/** Red apple with leaf */
export const appleIcon: IconDefinition = {
  name: "apple",
  category: "food",
  tags: ["fruit", "red", "healthy", "snack"],
  paths: [
    "M12 7C10.5 5.5 7 5 5 6.5C2.5 8.5 2.5 13 4 16.5C5.5 20 8 22 9.5 21.5C10.5 21.2 11 20.8 12 20.8C13 20.8 13.5 21.2 14.5 21.5C16 22 18.5 20 20 16.5C21.5 13 21.5 8.5 19 6.5C17 5 13.5 5.5 12 7Z",
    "M12 7V3.5",
    "M12 3.5C13 1.5 15 1 17.5 1.8C17 4 15 4.5 12 3.5Z",
  ],
  colors: [palette.red, undefined, palette.green],
};

/** Steaming coffee cup */
export const coffeeIcon: IconDefinition = {
  name: "coffee",
  category: "food",
  tags: ["cup", "drink", "hot", "cafe"],
  paths: [
    "M4 9h13v6a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z",
    "M17 11.5h1.5a2.5 2.5 0 0 1 0 5H17",
    "M8 6.5q-1-1.5 0-3",
    "M12 6.5q-1-1.5 0-3",
  ],
  colors: [palette.brown, palette.brown, palette.gray, palette.gray],
};

/** Hot dog in a bun */
export const hotDogIcon: IconDefinition = {
  name: "hot-dog",
  category: "food",
  tags: ["sausage", "bun", "fast-food", "snack"],
  paths: [
    "M7.5 5.5h9a2.5 2.5 0 0 1 0 5h-9a2.5 2.5 0 0 1 0-5z",
    "M3.5 13.5h17V15a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 15z",
  ],
  colors: [palette.red, palette.amber],
};

/** Bunch of grapes on a vine */
export const grapesIcon: IconDefinition = {
  name: "grapes",
  category: "food",
  tags: ["fruit", "wine", "vine", "berry"],
  paths: [
    "M7.25 7a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 1 0-4.5 0M12.25 7a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 1 0-4.5 0M4.75 11.5a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 1 0-4.5 0M9.75 11.5a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 1 0-4.5 0M14.75 11.5a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 1 0-4.5 0M7.25 16a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 1 0-4.5 0M12.25 16a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 1 0-4.5 0",
    "M12 7V3",
    "M12 3C13 1.5 15 1 17.5 1.8C17 4 15 4.5 12 3Z",
  ],
  colors: [palette.violet, undefined, palette.green],
};

/** Watermelon slice with seeds */
export const watermelonIcon: IconDefinition = {
  name: "watermelon",
  category: "food",
  tags: ["fruit", "summer", "slice", "seeds"],
  paths: [
    "M2.5 9.5h19a9.5 9.5 0 0 1-19 0z",
    "M5.5 9.5h13a6.5 6.5 0 0 1-13 0",
    "M7.8 13.2l1.4-1.4M11.3 13.2l1.4-1.4M14.8 13.2l1.4-1.4",
  ],
  colors: [palette.green, palette.red, undefined],
};
