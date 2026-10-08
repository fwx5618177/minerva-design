import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A color palette switch (a group of toggle buttons), orthogonal to the light / dark mode",
  react: ["PaletteToggle"],
  wc: "minerva-palette-toggle",
  parts: {
    root: { description: "The role=group wrapper" },
    item: {
      description:
        "Every option button (aria-pressed on the selected one). Item state: active (the selected palette, aria-pressed) / inactive",
      itemStates: { state: ["active", "inactive"] },
    },
  },
  states: {},
});
