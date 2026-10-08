import { Cascader } from "../../components/Cascader";
import type { HookScenario } from "./types";

const options = [
  {
    value: "fr",
    label: "France",
    children: [{ value: "paris", label: "Paris" }],
  },
];

/** Item states: disabled and loading (children loading) options */
const stateOptions = [
  ...options,
  { value: "de", label: "Germany", disabled: true },
  { value: "es", label: "Spain", isLeaf: false, loading: true },
];

export default [
  {
    name: "closed, with a value",
    element: (
      <Cascader
        name="city"
        label="City"
        options={options}
        defaultValue={["fr", "paris"]}
      />
    ),
  },
  {
    name: "open",
    element: (
      <Cascader
        name="city"
        label="City"
        options={options}
        defaultValue={["fr", "paris"]}
      />
    ),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector('[data-part="control"]')!);
    },
  },
  {
    name: "keyboard: expanded, disabled and loading items",
    element: <Cascader name="city" label="City" options={stateOptions} />,
    setup: async ({ user, container }) => {
      container.querySelector("input")!.focus();
      // opens on France, then shows its children
      await user.keyboard("{Enter}{ArrowRight}");
    },
  },
  {
    name: "disabled, invalid",
    element: (
      <Cascader name="city" label="City" options={options} disabled invalid />
    ),
  },
  {
    name: "read-only",
    element: <Cascader name="city" label="City" options={options} readOnly />,
  },
] satisfies HookScenario[];
