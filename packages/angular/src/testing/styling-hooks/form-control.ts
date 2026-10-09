import { Component } from "@angular/core";
import {
  MnFormControl,
  MnFormErrorMessage,
  MnFormField,
  MnFormHelperText,
  MnFormLabel,
} from "../../components/form-control";
import type { HookScenario } from "../types";

@Component({
  imports: [MnFormControl, MnFormLabel, MnFormHelperText],
  template: `<mn-form-control required>
    <mn-form-label>Email</mn-form-label>
    <input />
    <mn-form-helper-text>We never share it</mn-form-helper-text>
  </mn-form-control>`,
})
class Required {}

@Component({
  imports: [MnFormField],
  template: `<mn-form-field label="Email" errorMessage="Invalid email">
    <input />
  </mn-form-field>`,
})
class Invalid {}

@Component({
  imports: [MnFormControl, MnFormLabel, MnFormErrorMessage],
  template: `<mn-form-control disabled readOnly>
    <mn-form-label>Email</mn-form-label>
    <input />
    <mn-form-error-message>Not shown</mn-form-error-message>
  </mn-form-control>`,
})
class DisabledReadOnly {}

export default [
  {
    name: "label, required indicator, helper text",
    component: Required,
  },
  { name: "invalid: error message", component: Invalid },
  { name: "disabled, read-only", component: DisabledReadOnly },
] satisfies HookScenario[];
