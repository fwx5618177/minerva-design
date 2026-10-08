import { h } from "vue";
import { Rating } from "../../components/Rating";
import type { HookScenario } from "./types";

export default [
  {
    name: "display-only, half star, value and count",
    render: () =>
      h(Rating, {
        modelValue: 7,
        showValue: true,
        ratingCount: 120,
        size: "small",
      }),
  },
  {
    name: "interactive",
    render: () => h(Rating, { modelValue: 4, onChange: () => {} }),
  },
] satisfies HookScenario[];
