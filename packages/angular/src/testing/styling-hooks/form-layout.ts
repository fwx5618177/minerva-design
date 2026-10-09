import { Component } from "@angular/core";
import { MnFormLayout } from "../../components/form-layout";
import type { HookScenario } from "../types";

@Component({
  imports: [MnFormLayout],
  template: `<form mnFormLayout [columns]="{ base: 1, md: 2 }">
    <input aria-label="Name" />
  </form>`,
})
class Default {}

export default [
  { name: "default", component: Default },
] satisfies HookScenario[];
