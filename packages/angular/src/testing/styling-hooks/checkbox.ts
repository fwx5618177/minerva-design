import { Component } from "@angular/core";
import { MnCheckbox } from "../../components/checkbox";
import { MnFormControl } from "../../components/form-control";
import type { HookScenario } from "../types";

@Component({
  imports: [MnCheckbox],
  template: `<mn-checkbox
    label="Accept"
    helperText="Required"
    defaultChecked
    required
    size="small"
    color="success"
    shape="rounded"
  />`,
})
class Labelled {}

@Component({
  imports: [MnCheckbox],
  template: `<mn-checkbox aria-label="All" indeterminate error />`,
})
class Indeterminate {}

@Component({
  imports: [MnCheckbox, MnFormControl],
  template: `<mn-form-control readOnly>
    <mn-checkbox aria-label="Accept" />
  </mn-form-control>`,
})
class ReadOnly {}

@Component({
  imports: [MnCheckbox],
  template: `<mn-checkbox aria-label="Accept" disabled />`,
})
class Disabled {}

export default [
  { name: "label, helper text, checked, every key", component: Labelled },
  { name: "indeterminate, invalid", component: Indeterminate },
  { name: "unchecked, read-only", component: ReadOnly },
  { name: "disabled", component: Disabled },
] satisfies HookScenario[];
