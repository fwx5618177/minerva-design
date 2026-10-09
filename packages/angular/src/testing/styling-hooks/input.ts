import { Component } from "@angular/core";
import { MnInput } from "../../components/input";
import type { HookScenario } from "../types";

@Component({
  imports: [MnInput],
  template: `<mn-input
    aria-label="Name"
    prefix="@"
    suffix="kg"
    clearable
    defaultValue="Ada"
    showCharCount
    [maxLength]="10"
    size="small"
    variant="filled"
    required
  />`,
})
class Addons {}

@Component({
  imports: [MnInput],
  template: `<mn-input
    aria-label="Password"
    type="password"
    invalid
    readOnly
  />`,
})
class Password {}

@Component({
  imports: [MnInput],
  template: `<mn-input aria-label="Name" disabled />`,
})
class Disabled {}

export default [
  { name: "addons, clear button, counter, every key", component: Addons },
  { name: "password, invalid, read-only", component: Password },
  { name: "disabled", component: Disabled },
] satisfies HookScenario[];
