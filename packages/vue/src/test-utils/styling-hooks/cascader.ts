import { h } from "vue";
import { Cascader, type CascaderOption } from "../../components/Cascader";
import type { HookScenario } from "./types";

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

export default [
  {
    name: "closed, with a value",
    render: () =>
      h(Cascader, {
        name: "city",
        label: "City",
        options,
        defaultValue: ["fr", "paris"],
      }),
  },
  {
    name: "open",
    render: () =>
      h(Cascader, {
        name: "city",
        label: "City",
        options,
        defaultValue: ["fr", "paris"],
      }),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector('[data-part="control"]')!);
    },
  },
  {
    name: "keyboard: expanded, disabled and loading items",
    render: () =>
      h(Cascader, { name: "city", label: "City", options: stateOptions }),
    setup: async ({ user, container }) => {
      container.querySelector("input")!.focus();
      // opens on France, then shows its children
      await user.keyboard("{Enter}{ArrowRight}");
    },
  },
  {
    name: "disabled, invalid",
    render: () =>
      h(Cascader, {
        name: "city",
        label: "City",
        options,
        disabled: true,
        invalid: true,
      }),
  },
  {
    name: "read-only",
    render: () =>
      h(Cascader, { name: "city", label: "City", options, readOnly: true }),
  },
] satisfies HookScenario[];
