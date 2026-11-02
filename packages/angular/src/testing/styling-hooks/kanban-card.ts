import { Component } from "@angular/core";
import {
  MnKanbanBoard,
  MnKanbanCard,
  MnKanbanColumn,
} from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnKanbanBoard, MnKanbanCard, MnKanbanColumn],
  template: `<mn-kanban-board aria-label="Sprint" draggable
    ><mn-kanban-column title="To do" value="todo"
      ><mn-kanban-card value="spec" label="Write spec"
        >Write spec</mn-kanban-card
      ></mn-kanban-column
    ></mn-kanban-board
  >`,
})
class Fixture {}
export default [
  { name: "cards of a draggable board", component: Fixture },
] satisfies HookScenario[];
