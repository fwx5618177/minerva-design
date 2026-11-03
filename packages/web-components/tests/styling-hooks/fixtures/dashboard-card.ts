import type { WcHookScenario } from "../types";

export default [
  {
    name: "cards of a draggable board",
    html: `<minerva-dashboard-columns aria-label="Sprint" draggable><minerva-dashboard-column heading="To do" value="todo"><minerva-dashboard-card value="spec" label="Write spec">Write spec</minerva-dashboard-card></minerva-dashboard-column></minerva-dashboard-columns>`,
  },
] satisfies WcHookScenario[];
