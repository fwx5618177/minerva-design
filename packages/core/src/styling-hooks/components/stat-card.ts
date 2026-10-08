import { defineHooks } from "../types";

export default defineHooks({
  description: "A labelled metric with an optional icon and description",
  react: ["StatCard"],
  wc: "minerva-stat-card",
  parts: {
    root: { description: "The card" },
    icon: { description: "The decorative icon wrapper" },
    label: { description: "The metric name (<dt>)" },
    value: { description: "The metric value (<dd>)" },
    description: { description: "The description paragraph" },
  },
  states: {},
});
