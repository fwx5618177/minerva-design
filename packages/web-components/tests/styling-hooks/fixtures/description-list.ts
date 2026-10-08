import type { WcHookScenario } from "../types";

export default [
  {
    name: "declarative rows",
    html: `<minerva-description-list>
      <minerva-description-item label="Status">Active</minerva-description-item>
      <minerva-description-item label="Owner">Ada</minerva-description-item>
    </minerva-description-list>`,
  },
] satisfies WcHookScenario[];
