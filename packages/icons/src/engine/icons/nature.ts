// Nature icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Layered evergreen pine */
export const treePineIcon: IconDefinition = {
  name: "tree-pine",
  category: "nature",
  tags: ["evergreen", "conifer", "forest", "christmas"],
  paths: ["M12 2l-6 8h3l-5 6h14l-5-6h3z", "M12 16v5"],
};

/** Seedling with two leaves */
export const sproutIcon: IconDefinition = {
  name: "sprout",
  category: "nature",
  tags: ["seedling", "plant", "grow", "new"],
  paths: [
    "M12 21V13",
    "M12 13C8 13 6 11 6 7C10 7 12 9 12 13Z",
    "M12 11C12 7 14 5 18 5C18 9 16 11 12 11Z",
    "M8 21h8",
  ],
};

/** Four-petal flower on a stem */
export const flower2Icon: IconDefinition = {
  name: "flower-2",
  category: "nature",
  tags: ["bloom", "petals", "garden", "blossom"],
  paths: [
    "M12 3.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5",
    "M16 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5",
    "M12 11.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5",
    "M8 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5",
    "M12 16.5V22",
  ],
};

/** Mountain peak with snow cap */
export const mountainSnowIcon: IconDefinition = {
  name: "mountain-snow",
  category: "nature",
  tags: ["peak", "alpine", "ice", "winter"],
  paths: ["M2 20L9 8l4 6 3-4 6 10z", "M7 12l2-4 2 4"],
};

/** Saguaro cactus with two arms */
export const cactusIcon: IconDefinition = {
  name: "cactus",
  category: "nature",
  tags: ["desert", "succulent", "prickly", "plant"],
  paths: [
    "M9 21V8a3 3 0 0 1 6 0v13",
    "M9 14H6a2 2 0 0 1-2-2V9",
    "M15 17h3a2 2 0 0 0 2-2v-4",
    "M6 21h12",
  ],
};

/** Butterfly with spread wings */
export const butterflyIcon: IconDefinition = {
  name: "butterfly",
  category: "nature",
  tags: ["insect", "wings", "spring", "moth"],
  paths: [
    "M12 11C10 7 4 4 3 8C2 11 6 14 12 11Z",
    "M12 11C14 7 20 4 21 8C22 11 18 14 12 11Z",
    "M12 8v10",
    "M12 8L10 4",
    "M12 8l2-4",
  ],
  colors: [palette.violet, palette.violet, undefined, undefined, undefined],
};

/** Songbird in flight */
export const birdIcon: IconDefinition = {
  name: "bird",
  category: "nature",
  tags: ["sparrow", "flight", "wing", "animal"],
  paths: [
    "M15 10.5C11 10 7 12 5.5 14.5L2.5 12.5L3 18L6 16C9.5 18.5 14.5 18.5 17 15C17.5 14 17 12 15 10.5Z",
    "M13.5 8a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
    "M18.5 7.2L21 8.2L18.5 9.2",
    "M16 7.5h.01",
    "M7.5 15C9.5 12.8 12.5 12.8 14.5 14.5",
  ],
};

/** Swimming fish */
export const fishIcon: IconDefinition = {
  name: "fish",
  category: "nature",
  tags: ["aquatic", "sea", "swim", "ocean"],
  paths: [
    "M3 12C6 5 12 5 16 12C12 19 6 19 3 12Z",
    "M16 12L21.5 7.5L19.5 12L21.5 16.5Z",
    "M7 10.5h.01",
  ],
};

/** Feather quill */
export const featherIcon: IconDefinition = {
  name: "feather",
  category: "nature",
  tags: ["quill", "plume", "light", "writing"],
  paths: [
    "M20 4C13 4 7 9 6 17L4 20C9 20 14 19 17 16C21 12 21 7 20 4Z",
    "M20 4L4 20",
  ],
};

/** Mushroom with spotted cap */
export const mushroomIcon: IconDefinition = {
  name: "mushroom",
  category: "nature",
  tags: ["fungi", "forest", "toadstool", "spore"],
  paths: [
    "M3 12a9 8 0 0 1 18 0z",
    "M9 12v7a3 3 0 0 0 6 0v-7",
    "M7 8h2",
    "M15 6h2",
  ],
  colors: [palette.red, undefined, undefined, undefined],
};

/** Erupting volcano */
export const volcanoIcon: IconDefinition = {
  name: "volcano",
  category: "nature",
  tags: ["eruption", "lava", "mountain", "smoke"],
  paths: ["M2 21L9 10h6l7 11z", "M9 6.5c1-1 2-1 3 0s2 1 3 0"],
  colors: [undefined, palette.orange],
};

/** Pointed leaf with midrib */
export const leafIcon: IconDefinition = {
  name: "leaf",
  category: "nature",
  tags: ["foliage", "plant", "eco", "green"],
  paths: ["M5 19C5 10 10 5 19 5C19 14 14 19 5 19Z", "M5 19L13 11"],
  colors: [palette.green, undefined],
};

/** Acorn with cap */
export const acornIcon: IconDefinition = {
  name: "acorn",
  category: "nature",
  tags: ["nut", "oak", "seed", "autumn"],
  paths: ["M5 10a7 3 0 0 1 14 0z", "M7 10c0 6 2 11 5 11s5-5 5-11", "M12 7V4"],
  colors: [palette.brown, palette.brown, undefined],
};

/** Scallop seashell with ribs */
export const shellIcon: IconDefinition = {
  name: "shell",
  category: "nature",
  tags: ["seashell", "beach", "sea", "scallop"],
  paths: [
    "M2.5 15.5A3 3 0 0 1 6.5 11.5A3 3 0 0 1 12 10A3 3 0 0 1 17.5 11.5A3 3 0 0 1 21.5 15.5",
    "M2.5 15.5L12 21L21.5 15.5",
    "M12 21L6.5 11.5M12 21V10M12 21L17.5 11.5",
  ],
};

/** Animal paw print */
export const pawPrintIcon: IconDefinition = {
  name: "paw-print",
  category: "nature",
  tags: ["pet", "animal", "track", "dog"],
  paths: [
    "M8 14c0-2 2-4 4-4s4 2 4 4c0 2-1.5 4-4 4s-4-2-4-4z",
    "M3 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M7 5a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M13 5a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M17 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
  ],
};

/** Tulip bloom on a stem */
export const tulipIcon: IconDefinition = {
  name: "tulip",
  category: "nature",
  tags: ["flower", "bloom", "spring", "garden"],
  paths: [
    "M6 5l2 5 4-4 4 4 2-5v5a6 6 0 0 1-12 0z",
    "M12 16v5",
    "M12 18c-2.5 0-4.5-1.5-4.5-3.5 2.5 0 4.5 1.5 4.5 3.5z",
  ],
  colors: [palette.pink, undefined, palette.green],
};
