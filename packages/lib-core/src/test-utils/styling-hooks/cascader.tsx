import { Cascader } from "../../components/Cascader";
import type { HookScenario } from "./types";

const options = [
  {
    value: "fr",
    label: "France",
    children: [{ value: "paris", label: "Paris" }],
  },
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
