import { Component } from "@angular/core";
import { MnFlashcard } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnFlashcard],
  template: `<mn-flashcard front="Capital of France?" back="Paris" showHint
      ><button mnFooter type="button">Good</button></mn-flashcard
    ><mn-flashcard
      front="Q"
      back="A"
      [flipped]="true"
      variant="outline"
      size="small"
    /><mn-flashcard
      front="Q"
      back="A"
      variant="filled"
      size="large"
      disabled
    /><mn-flashcard front="Q" back="A" variant="elevated" size="medium" />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
