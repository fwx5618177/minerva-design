import type { WcHookScenario } from "../types";

export default [
  {
    name: "lines, avatar",
    html: `<minerva-skeleton lines="2" avatar></minerva-skeleton>`,
  },
  {
    name: "card",
    html: `<minerva-skeleton variant="card" avatar heading paragraph></minerva-skeleton>`,
  },
  {
    name: "decorative",
    html: `<minerva-skeleton decorative variant="circular"></minerva-skeleton>`,
  },
] satisfies WcHookScenario[];
