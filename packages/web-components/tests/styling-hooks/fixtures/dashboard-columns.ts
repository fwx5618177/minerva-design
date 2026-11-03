import type { WcHookScenario } from "../types";

export default [
  {
    name: "board with columns",
    html: `<minerva-dashboard-columns aria-label="Sprint" fill max-height="320"><minerva-dashboard-column heading="To do" count="1"><div>Card</div></minerva-dashboard-column><minerva-dashboard-column heading="Done"></minerva-dashboard-column></minerva-dashboard-columns>`,
  },
] satisfies WcHookScenario[];
