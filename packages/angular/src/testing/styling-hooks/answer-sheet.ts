import { Component } from "@angular/core";
import { MnAnswerSheet } from "../../components/data";
import type { HookScenario } from "../types";

@Component({
  imports: [MnAnswerSheet],
  template: `<mn-answer-sheet
      value="q2"
      [items]="items"
      [groups]="groups"
      showLegend
      showSummary
    /><mn-answer-sheet
      value="q1"
      [items]="items"
      layout="scroll"
      disabled
    /><mn-answer-sheet
      [items]="items"
      size="small"
      columns="3"
    /><mn-answer-sheet [items]="items" size="medium" />`,
})
class Fixture {
  items = [
    { key: "q1", status: "answered", group: "single" },
    { key: "q2", status: "correct", group: "single", flagged: true },
    { key: "q3", status: "wrong", group: "single" },
    { key: "q4", status: "skipped", group: "short" },
    { key: "q5", group: "short", disabled: true },
  ] as const;
  groups = [
    { key: "single", title: "Single choice" },
    { key: "short", title: "Short answer" },
  ];
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
