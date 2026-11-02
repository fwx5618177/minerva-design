import type { WcHookScenario } from "../types";

export default [
  {
    name: "board with columns",
    html: `<minerva-kanban-board aria-label="Sprint" fill max-height="320"><minerva-kanban-column heading="To do" count="1"><div>Card</div></minerva-kanban-column><minerva-kanban-column heading="Done"></minerva-kanban-column></minerva-kanban-board>`,
  },
] satisfies WcHookScenario[];
