import { Component } from "@angular/core";
import {
  MnAutoComplete,
  type AutoCompleteOption,
} from "../../components/auto-complete";
import type { HookScenario } from "../types";

const options: AutoCompleteOption[] = [
  { label: "Apple", value: "apple", group: "Fruits" },
  { label: "Carrot", value: "carrot", group: "" },
];

const open: HookScenario["setup"] = async ({ user, root }) => {
  await user.click(root.querySelector("input")!);
};

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete label="Food" [options]="options" />`,
})
class Closed {
  options = options;
}

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete
    label="Food"
    [options]="options"
    [groupBy]="groupBy"
  />`,
})
class Grouped {
  options = options;
  groupBy = (option: AutoCompleteOption) => option.group ?? "";
}

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete label="Food" [options]="options" />`,
})
class Keyboard {
  options: AutoCompleteOption[] = [
    { label: "Apple", value: "apple" },
    { label: "Apricot", value: "apricot", disabled: true },
  ];
}

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete
    label="Food"
    [options]="options"
    defaultValue="zzz"
  />`,
})
class Empty {
  options = options;
}

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete label="Food" [options]="options" loading />`,
})
class Loading {
  options = options;
}

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete label="Food" [options]="options" disabled />`,
})
class Disabled {
  options = options;
}

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete label="Food" [options]="options" readOnly />`,
})
class ReadOnly {
  options = options;
}

export default [
  { name: "closed, label", component: Closed },
  { name: "open, grouped", component: Grouped, setup: open },
  {
    name: "keyboard: highlighted item, disabled item",
    component: Keyboard,
    setup: async ({ user, root }) => {
      await user.click(root.querySelector("input")!);
      await user.keyboard("{ArrowDown}");
    },
  },
  { name: "open, empty", component: Empty, setup: open },
  { name: "open, loading", component: Loading, setup: open },
  { name: "disabled", component: Disabled },
  { name: "read-only", component: ReadOnly },
] satisfies HookScenario[];
