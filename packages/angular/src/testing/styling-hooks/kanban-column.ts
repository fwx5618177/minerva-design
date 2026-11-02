import { Component } from "@angular/core";
import { MnKanbanColumn } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnKanbanColumn],
  template: `<mn-kanban-column
      title="Doing"
      [count]="2"
      color="primary"
      description="In progress"
      ><button type="button" mnKanbanActions>Add</button>
      <div>A</div>
      <div>B</div>
      <button type="button" mnKanbanFooter>Add card</button></mn-kanban-column
    >
    <mn-kanban-column title="Done" [count]="0" />
    @for (color of colors; track color) {
      <mn-kanban-column [title]="color" [color]="color"
        ><div>Card</div></mn-kanban-column
      >
    }`,
})
class Fixture {
  readonly colors = [
    "primary",
    "success",
    "warning",
    "danger",
    "info",
    "neutral",
  ];
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
