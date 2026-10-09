import { Component } from "@angular/core";
import { MnRadio, MnRadioGroup } from "../../components/radio";
import type { HookScenario } from "../types";

@Component({
  imports: [MnRadio, MnRadioGroup],
  template: `<mn-radio-group
    label="Payment"
    helperText="Pick one"
    direction="horizontal"
    size="small"
    color="success"
    required
    defaultValue="card"
  >
    <mn-radio value="card" label="Card" />
    <mn-radio value="cash" label="Cash" />
  </mn-radio-group>`,
})
class Labelled {}

@Component({
  imports: [MnRadio, MnRadioGroup],
  template: `<mn-radio-group aria-label="Payment" error disabled>
    <mn-radio value="card" label="Card" />
  </mn-radio-group>`,
})
class Invalid {}

export default [
  { name: "label, helper text, every key", component: Labelled },
  { name: "vertical, invalid, disabled", component: Invalid },
] satisfies HookScenario[];
