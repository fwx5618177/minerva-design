import type { WcHookScenario } from "../types";

export default [
  {
    name: "cards of a draggable board",
    html: `<minerva-kanban-board aria-label="Sprint" draggable><minerva-kanban-column heading="To do" value="todo"><minerva-kanban-card value="spec" label="Write spec">Write spec</minerva-kanban-card></minerva-kanban-column></minerva-kanban-board>`,
  },
] satisfies WcHookScenario[];
