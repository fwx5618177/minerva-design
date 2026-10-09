import { Component } from "@angular/core";
import { MnMonacoCodeEditor, type MonacoLoader } from "../../../monaco";
import type { HookScenario } from "../types";
@Component({
  imports: [MnMonacoCodeEditor],
  template: `<mn-monaco-code-editor
    [loader]="loader"
    [disabled]="true"
    value="const n = 1;"
  />`,
})
class Loading {
  readonly loader: MonacoLoader = () => new Promise(() => {});
}
@Component({
  imports: [MnMonacoCodeEditor],
  template: `<mn-monaco-code-editor [loader]="loader" />`,
})
class Failed {
  readonly loader: MonacoLoader = () =>
    Promise.reject(new Error("Editor unavailable"));
}
export default [
  { name: "loading", component: Loading },
  { name: "failed", component: Failed },
] satisfies HookScenario[];
