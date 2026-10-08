import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A small modal alertdialog asking to confirm an action (Cancel / Confirm)",
  react: ["ConfirmDialog"],
  wc: "minerva-confirm-dialog",
  parts: {
    overlay: { description: "The backdrop", states: ["state"] },
    content: {
      description: "The dialog panel (role=alertdialog)",
      states: ["state", "color", "loading"],
    },
    header: { description: "The title (accessible name of the dialog)" },
    description: { description: "The description below the title" },
    body: { description: "The optional extra content" },
    footer: { description: "The actions row (Cancel and Confirm buttons)" },
    "cancel-button": {
      description:
        "The Cancel <minerva-button> (web components only: in React it is a Button with its own hooks, [data-minerva=button] in the footer)",
      only: "wc",
    },
    "confirm-button": {
      description:
        "The Confirm <minerva-button> (web components only: in React it is a Button with its own hooks, [data-minerva=button] in the footer)",
      only: "wc",
    },
    "close-button": { description: "The close (×) button" },
  },
  states: {
    state: ["open", "closed"],
    color: ["primary", "danger", "warning"],
    loading: true,
  },
});
