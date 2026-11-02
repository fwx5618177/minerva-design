import {
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
} from "../../components/KanbanBoard";
import type { HookScenario } from "./types";

export default [
  {
    name: "cards of a draggable board",
    element: (
      <KanbanBoard aria-label="Sprint" draggable>
        <KanbanColumn title="To do" value="todo">
          <KanbanCard value="spec" label="Write spec">
            Write spec
          </KanbanCard>
        </KanbanColumn>
      </KanbanBoard>
    ),
  },
] satisfies HookScenario[];
