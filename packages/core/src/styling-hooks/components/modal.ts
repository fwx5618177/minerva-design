import { defineHooks } from "../types";

export default defineHooks({
  description: "A modal dialog over an overlay",
  react: ["Modal", "ModalContent", "ModalHeader", "ModalBody", "ModalFooter"],
  wc: "minerva-modal",
  parts: {
    overlay: { description: "The backdrop", states: ["state"] },
    content: {
      description: "The dialog panel (role=dialog)",
      states: ["state", "size"],
    },
    header: { description: "The title (accessible name of the dialog)" },
    description: { description: "The description below the title" },
    body: { description: "The scrollable body" },
    footer: { description: "The actions row" },
    "close-button": { description: "The close (×) button" },
  },
  states: {
    state: ["open", "closed"],
    size: ["small", "medium", "large", "xlarge", "full"],
  },
});
