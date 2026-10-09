import { Component } from "@angular/core";
import { MnRating } from "../../components/rating";
import type { HookScenario } from "../types";

@Component({
  imports: [MnRating],
  template: `<mn-rating
    [value]="7"
    showValue
    [ratingCount]="120"
    size="small"
  />`,
})
class Display {}

@Component({
  imports: [MnRating],
  template: `<mn-rating [value]="4" interactive />`,
})
class Interactive {}

export default [
  { name: "display-only, half star, value and count", component: Display },
  { name: "interactive", component: Interactive },
] satisfies HookScenario[];
