import { Component } from "@angular/core";
import { MnKanbanBoard, MnKanbanColumn } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnKanbanBoard, MnKanbanColumn],
  template: `<mn-kanban-board aria-label="Sprint" fill [maxHeight]="320"
    ><mn-kanban-column title="To do" [count]="1"
      ><div>Card</div></mn-kanban-column
    ><mn-kanban-column title="Done"
  /></mn-kanban-board>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
