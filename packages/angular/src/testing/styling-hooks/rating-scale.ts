import { Component } from "@angular/core";
import { MnRatingScale } from "../../components/rating";
import type { HookScenario } from "../types";

const dimensions = [
  { key: "plot", label: "Plot", value: 8 },
  { key: "writing", label: "Writing", value: 6 },
];

@Component({
  imports: [MnRatingScale],
  template: `<mn-rating-scale [dimensions]="dimensions" size="large" />`,
})
class Display {
  dimensions = dimensions;
}

@Component({
  imports: [MnRatingScale],
  template: `<mn-rating-scale [dimensions]="dimensions" interactive />`,
})
class Interactive {
  dimensions = dimensions;
}

export default [
  { name: "display-only, every key", component: Display },
  { name: "interactive", component: Interactive },
] satisfies HookScenario[];
