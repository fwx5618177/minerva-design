import type { WcHookScenario } from "../types";

export default [
  {
    name: "standalone",
    html: `<minerva-badge><svg slot="icon"></svg>5</minerva-badge>`,
  },
  {
    name: "attached, every key",
    html: `<minerva-badge content="3" size="small" variant="outline" color="danger"><button type="button">Inbox</button></minerva-badge>`,
  },
] satisfies WcHookScenario[];
