import { Component } from "@angular/core";
import {
  MnSelect,
  MnSelectGroup,
  MnSelectItem,
  MnSelectLabel,
  MnSelectSeparator,
} from "../../components/select";
import type { HookScenario } from "../types";

const OPTIONS = `
  <mn-select-group>
    <mn-select-label>Fruits</mn-select-label>
    <mn-select-item value="apple">Apple</mn-select-item>
    <mn-select-item value="pear" disabled>Pear</mn-select-item>
  </mn-select-group>
  <mn-select-separator />
  <mn-select-item value="carrot">Carrot</mn-select-item>
`;

const imports = [
  MnSelect,
  MnSelectGroup,
  MnSelectItem,
  MnSelectLabel,
  MnSelectSeparator,
];

@Component({
  imports,
  template: `<mn-select aria-label="Food" placeholder="Pick one"
    >${OPTIONS}</mn-select
  >`,
})
class Closed {}

/** Shared by the option, option-group, select-label and select-separator fixtures */
@Component({
  imports,
  template: `<mn-select aria-label="Food" defaultOpen defaultValue="apple"
    >${OPTIONS}</mn-select
  >`,
})
export class OpenSelect {}

@Component({
  imports,
  template: `<mn-select aria-label="Food" disabled invalid required size="small"
    >${OPTIONS}</mn-select
  >`,
})
class Disabled {}

export default [
  { name: "closed, placeholder", component: Closed },
  { name: "open", component: OpenSelect },
  { name: "disabled, invalid, required, small", component: Disabled },
] satisfies HookScenario[];
