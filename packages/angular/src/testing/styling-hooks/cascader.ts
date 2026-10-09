import { Component } from "@angular/core";
import { MnCascader, type CascaderOption } from "../../components/cascader";
import { settle } from "..";
import type { HookScenario } from "../types";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [{ value: "paris", label: "Paris" }],
  },
];

/** Item states: disabled and loading (children loading) options */
const stateOptions: CascaderOption[] = [
  ...options,
  { value: "de", label: "Germany", disabled: true },
  { value: "es", label: "Spain", isLeaf: false, loading: true },
];

@Component({
  imports: [MnCascader],
  template: `<mn-cascader
    name="city"
    label="City"
    [options]="options"
    [defaultValue]="['fr', 'paris']"
  />`,
})
class WithValue {
  options = options;
}

@Component({
  imports: [MnCascader],
  template: `<mn-cascader name="city" label="City" [options]="options" />`,
})
class States {
  options = stateOptions;
}

@Component({
  imports: [MnCascader],
  template: `<mn-cascader
    name="city"
    label="City"
    [options]="options"
    disabled
    invalid
  />`,
})
class DisabledInvalid {
  options = options;
}

@Component({
  imports: [MnCascader],
  template: `<mn-cascader
    name="city"
    label="City"
    [options]="options"
    readOnly
  />`,
})
class ReadOnly {
  options = options;
}

export default [
  { name: "closed, with a value", component: WithValue },
  {
    name: "open",
    component: WithValue,
    setup: async ({ user, fixture, root }) => {
      await user.click(root.querySelector('[data-part="control"]')!);
      await settle(fixture);
    },
  },
  {
    name: "keyboard: expanded, disabled and loading items",
    component: States,
    setup: async ({ user, fixture, root }) => {
      root.querySelector("input")!.focus();
      // opens on France, then shows its children
      await user.keyboard("{Enter}");
      await settle(fixture);
      await user.keyboard("{ArrowRight}");
      await settle(fixture);
    },
  },
  { name: "disabled, invalid", component: DisabledInvalid },
  { name: "read-only", component: ReadOnly },
] satisfies HookScenario[];
