import { Component } from "@angular/core";
import { MnNumberInput } from "../../components/number-input";
import type { HookScenario } from "../types";

@Component({
  imports: [MnNumberInput],
  template: `<mn-number-input
    aria-label="Qty"
    [defaultValue]="1"
    showStepper
    size="small"
    required
  />`,
})
class Stepper {}

@Component({
  imports: [MnNumberInput],
  template: `<mn-number-input aria-label="Qty" invalid readOnly />`,
})
class InvalidReadOnly {}

@Component({
  imports: [MnNumberInput],
  template: `<mn-number-input aria-label="Qty" disabled />`,
})
class Disabled {}

export default [
  { name: "stepper, every key, required", component: Stepper },
  { name: "invalid, read-only", component: InvalidReadOnly },
  { name: "disabled", component: Disabled },
] satisfies HookScenario[];
