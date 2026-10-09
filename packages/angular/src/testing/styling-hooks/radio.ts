import { Component } from "@angular/core";
import { MnRadio } from "../../components/radio";
import type { HookScenario } from "../types";

@Component({
  imports: [MnRadio],
  template: `<mn-radio
    label="Card"
    helperText="Visa, Mastercard"
    [checked]="true"
    size="small"
    color="success"
  />`,
})
class Labelled {}

@Component({
  imports: [MnRadio],
  template: `<mn-radio
    aria-label="Cash"
    [checked]="false"
    error
    errorMessage="Pick one"
  />`,
})
class Invalid {}

@Component({
  imports: [MnRadio],
  template: `<mn-radio aria-label="Cash" disabled />`,
})
class Disabled {}

export default [
  { name: "label, helper text, checked, every key", component: Labelled },
  { name: "unchecked, invalid", component: Invalid },
  { name: "disabled", component: Disabled },
] satisfies HookScenario[];
