import { h } from "vue";
import { RatingScale } from "../../components/Rating";
import type { HookScenario } from "./types";

const dimensions = [
  { key: "plot", label: "Plot", value: 8 },
  { key: "writing", label: "Writing", value: 6 },
];

export default [
  {
    name: "display-only, every key",
    render: () => h(RatingScale, { dimensions, size: "large" }),
  },
  {
    name: "interactive",
    render: () => h(RatingScale, { dimensions, onChange: () => {} }),
  },
] satisfies HookScenario[];
