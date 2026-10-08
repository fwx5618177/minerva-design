import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Application chrome: a collapsible sidebar, a header, the main landmark and a mobile navigation drawer",
  react: ["AppShell"],
  wc: "minerva-app-shell",
  parts: {
    root: {
      description:
        "The shell (`state`: whether the mobile navigation drawer is open)",
      states: ["state"],
    },
    "skip-link": { description: "The skip to content link" },
    sidebar: { description: "The desktop sidebar (<aside>)" },
    header: { description: "The header bar" },
    main: { description: "The <main> landmark" },
    overlay: {
      description: "The backdrop of the mobile drawer",
      states: ["state"],
    },
    content: {
      description: "The mobile navigation drawer (role=dialog)",
      states: ["state"],
    },
    "close-button": { description: "The close button of the mobile drawer" },
  },
  states: {
    state: ["open", "closed"],
  },
});
