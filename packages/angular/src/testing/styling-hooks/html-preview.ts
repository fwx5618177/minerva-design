import { Component } from "@angular/core";
import { MnHtmlPreview } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnHtmlPreview],
  template: `<mn-html-preview html="&lt;h1&gt;Preview&lt;/h1&gt;" />`,
})
class Fixture {
  readonly date = new Date(2026, 9, 1);
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
