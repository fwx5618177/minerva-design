import { defineHooks } from "../types";

export default defineHooks({
  description: "A searchable command palette in a modal dialog",
  react: ["CommandDialog"],
  wc: "minerva-command-dialog",
  parts: {
    overlay: { description: "The backdrop", states: ["state"] },
    content: {
      description: "The dialog panel (role=dialog)",
      states: ["state"],
    },
    header: { description: "The title row (accessible name of the dialog)" },
    description: { description: "The description below the title" },
    search: { description: "The search field (icon, input and Enter hint)" },
    input: { description: "The search input (role=combobox)" },
    list: { description: "The results list (role=listbox)" },
    item: { description: "A result (role=option)" },
    empty: { description: "The text shown when no command matches" },
  },
  states: {
    state: ["open", "closed"],
  },
});
