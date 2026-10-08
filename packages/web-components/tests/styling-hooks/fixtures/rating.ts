import type { WcHookScenario } from "../types";

export default [
  {
    name: "display-only, half star, value and count",
    html: `<minerva-rating value="7" show-value rating-count="120" size="small"></minerva-rating>`,
  },
  {
    name: "interactive",
    html: `<minerva-rating value="4" interactive></minerva-rating>`,
  },
] satisfies WcHookScenario[];
