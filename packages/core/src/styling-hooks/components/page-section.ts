import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A page region named by its h2 title, with optional description, icon and actions",
  react: ["PageSection"],
  wc: "minerva-page-section",
  parts: {
    root: { description: "The <section>" },
    header: { description: "The title row (title, description and actions)" },
    title: { description: "The <h2>" },
    icon: { description: "The decorative icon wrapper, inside the title" },
    description: { description: "The description paragraph" },
    actions: { description: "The actions wrapper" },
  },
  states: {},
});
