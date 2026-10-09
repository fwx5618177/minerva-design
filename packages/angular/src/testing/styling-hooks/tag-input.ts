import { Component } from "@angular/core";
import { MnTagInput } from "../../components/tag-input";
import type { HookScenario } from "../types";

@Component({
  imports: [MnTagInput],
  template: `<mn-tag-input
    aria-label="Tags"
    [defaultValue]="['react']"
    [options]="['vue', 'svelte']"
    size="small"
  />`,
})
class WithSuggestions {}

@Component({
  imports: [MnTagInput],
  template: `<mn-tag-input aria-label="Tags" [options]="['vue', 'svelte']" />`,
})
class Highlighted {}

// React wraps this one in <FormControl required>: the own `required` input
// renders the same states.
@Component({
  imports: [MnTagInput],
  template: `<mn-tag-input
    aria-label="Tags"
    [defaultValue]="['vue']"
    [options]="['vue']"
    required
  />`,
})
class NothingLeft {}

@Component({
  imports: [MnTagInput],
  template: `<mn-tag-input
    aria-label="Tags"
    [defaultValue]="['react']"
    invalid
    readOnly
  />`,
})
class ReadOnlyInvalid {}

@Component({
  imports: [MnTagInput],
  template: `<mn-tag-input aria-label="Tags" disabled />`,
})
class Disabled {}

const openList: HookScenario["setup"] = async ({ user, root }) => {
  await user.click(root.querySelector("input")!);
};

export default [
  {
    name: "tags, open with suggestions, every key",
    component: WithSuggestions,
    setup: openList,
  },
  {
    name: "keyboard: highlighted suggestion",
    component: Highlighted,
    setup: async ({ user, root }) => {
      await user.click(root.querySelector("input")!);
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "open, no suggestion left, required",
    component: NothingLeft,
    setup: openList,
  },
  { name: "closed, invalid, read-only", component: ReadOnlyInvalid },
  { name: "disabled", component: Disabled },
] satisfies HookScenario[];
