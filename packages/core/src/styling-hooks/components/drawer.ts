import { defineHooks } from "../types";

export default defineHooks({
  description: "A side panel dialog sliding in from an edge over an overlay",
  react: [
    "Drawer",
    "DrawerContent",
    "DrawerHeader",
    "DrawerBody",
    "DrawerFooter",
  ],
  wc: "minerva-drawer",
  parts: {
    overlay: { description: "The backdrop", states: ["state"] },
    content: {
      description: "The dialog panel (role=dialog)",
      states: ["state", "side", "size"],
    },
    header: { description: "The title (accessible name of the dialog)" },
    description: {
      description:
        "The description below the title (visually hidden when no description is given)",
    },
    body: { description: "The scrollable body" },
    footer: { description: "The actions row" },
    "close-button": { description: "The close (×) button" },
  },
  states: {
    state: ["open", "closed"],
    side: ["left", "right", "top", "bottom"],
    size: ["small", "medium", "large", "full"],
  },
});
