import { KanbanBoard, KanbanColumn } from "../../components/KanbanBoard";
import type { HookScenario } from "./types";

export default [
  {
    name: "board with columns",
    element: (
      <KanbanBoard aria-label="Sprint" fill maxHeight={320}>
        <KanbanColumn title="To do" count={1}>
          <div>Card</div>
        </KanbanColumn>
        <KanbanColumn title="Done" />
      </KanbanBoard>
    ),
  },
] satisfies HookScenario[];
